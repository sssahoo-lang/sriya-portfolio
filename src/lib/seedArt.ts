/**
 * Deterministic generative art: the same word always produces the same picture.
 *
 * A word is hashed into a seed, the seed drives a PRNG, and the PRNG picks one of
 * three composition families plus all of its parameters. Output is a flat list of
 * strokes so the canvas layer can reveal them progressively without re-deriving
 * anything.
 */

// Mirrors the palette in globals.css. Hardcoded on purpose: this gets baked into a
// PNG, which can't react to CSS variables later.
export const ART_BG = "#f7f6f3";
const INK = "#2b2b29";
const BLUE_GRAY = "#7c8b99";
const CLAY = "#ad8868";
const FAINT = "#c9d0d4";

export type Point = { x: number; y: number };

export type Stroke = {
  points: Point[];
  color: string;
  width: number;
  alpha: number;
};

export type ArtFamily = "current" | "orbit" | "strata";

export type SeedArt = {
  strokes: Stroke[];
  family: ArtFamily;
  segmentCount: number;
};

function cyrb128(str: string): [number, number, number, number] {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;

  for (let i = 0; i < str.length; i++) {
    const k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }

  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);

  return [
    (h1 ^ h2 ^ h3 ^ h4) >>> 0,
    (h2 ^ h1) >>> 0,
    (h3 ^ h1) >>> 0,
    (h4 ^ h1) >>> 0,
  ];
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const NOISE_SIZE = 128;
const NOISE_MASK = NOISE_SIZE - 1;

function makeNoise(rand: () => number): (x: number, y: number) => number {
  const table = new Float32Array(NOISE_SIZE * NOISE_SIZE);
  for (let i = 0; i < table.length; i++) table[i] = rand();

  const at = (x: number, y: number) => table[(y & NOISE_MASK) * NOISE_SIZE + (x & NOISE_MASK)];
  const smooth = (t: number) => t * t * (3 - 2 * t);

  return (x, y) => {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const fx = smooth(x - x0);
    const fy = smooth(y - y0);

    const top = at(x0, y0) * (1 - fx) + at(x0 + 1, y0) * fx;
    const bottom = at(x0, y0 + 1) * (1 - fx) + at(x0 + 1, y0 + 1) * fx;
    return top * (1 - fy) + bottom * fy;
  };
}

function pickPalette(rand: () => number): { lead: string; support: string; whisper: string } {
  const arrangements = [
    { lead: INK, support: BLUE_GRAY, whisper: FAINT },
    { lead: BLUE_GRAY, support: CLAY, whisper: FAINT },
    { lead: INK, support: CLAY, whisper: BLUE_GRAY },
    { lead: CLAY, support: INK, whisper: FAINT },
  ];
  return arrangements[Math.floor(rand() * arrangements.length)];
}

/** Particles released into a noise field: soft, drifting, organic. */
function currentFamily(
  rand: () => number,
  width: number,
  height: number,
): Stroke[] {
  const noise = makeNoise(rand);
  const palette = pickPalette(rand);
  const strokes: Stroke[] = [];

  const particles = 90 + Math.floor(rand() * 70);
  const steps = 60 + Math.floor(rand() * 70);
  const stepLength = 1.6 + rand() * 1.4;
  // One noise cell every ~100–250px, so the field varies smoothly across the canvas
  // rather than flipping direction pixel to pixel.
  const fieldScale = 0.004 + rand() * 0.006;
  const turns = 1 + rand();

  for (let i = 0; i < particles; i++) {
    let x = rand() * width;
    let y = rand() * height;
    const points: Point[] = [{ x, y }];

    for (let s = 0; s < steps; s++) {
      const angle = noise(x * fieldScale, y * fieldScale) * Math.PI * 2 * turns;
      x += Math.cos(angle) * stepLength;
      y += Math.sin(angle) * stepLength;
      if (x < -20 || x > width + 20 || y < -20 || y > height + 20) break;
      points.push({ x, y });
    }

    if (points.length < 3) continue;

    const roll = rand();
    const color = roll > 0.86 ? palette.support : roll > 0.72 ? palette.whisper : palette.lead;
    strokes.push({
      points,
      color,
      width: 0.55 + rand() * 0.85,
      alpha: 0.3 + rand() * 0.4,
    });
  }

  return strokes;
}

/** Concentric arc segments around an off-centre origin: precise, architectural. */
function orbitFamily(rand: () => number, width: number, height: number): Stroke[] {
  const palette = pickPalette(rand);
  const strokes: Stroke[] = [];

  const cx = width * (0.3 + rand() * 0.4);
  const cy = height * (0.35 + rand() * 0.3);
  const maxRadius = Math.min(width, height) * (0.55 + rand() * 0.35);
  const rings = 16 + Math.floor(rand() * 16);
  // Outer rings drift off-centre and stretch slightly, so the set reads as nested
  // orbits rather than a bullseye.
  const driftX = (rand() - 0.5) * maxRadius * 0.5;
  const driftY = (rand() - 0.5) * maxRadius * 0.3;
  const stretch = 1.1 + rand() * 0.7;

  for (let i = 0; i < rings; i++) {
    const t = (i + 1) / rings;
    const radius = maxRadius * t * (0.9 + rand() * 0.2);
    const ringX = cx + driftX * t;
    const ringY = cy + driftY * t;
    const arcs = 1 + Math.floor(rand() * 3);

    for (let a = 0; a < arcs; a++) {
      const start = rand() * Math.PI * 2;
      const sweep = (0.35 + rand() * 1.5) * Math.PI;
      const segments = Math.max(10, Math.floor(sweep * 14));
      const points: Point[] = [];

      for (let s = 0; s <= segments; s++) {
        const angle = start + (sweep * s) / segments;
        points.push({
          x: ringX + Math.cos(angle) * radius * stretch,
          y: ringY + Math.sin(angle) * radius,
        });
      }

      const roll = rand();
      strokes.push({
        points,
        color: roll > 0.82 ? palette.support : roll > 0.6 ? palette.whisper : palette.lead,
        width: 0.6 + rand() * 1.5,
        alpha: 0.35 + rand() * 0.45,
      });
    }
  }

  // A few punctuation dots sitting on the rings.
  const dots = 3 + Math.floor(rand() * 5);
  for (let i = 0; i < dots; i++) {
    const angle = rand() * Math.PI * 2;
    const t = 0.2 + rand() * 0.8;
    const radius = maxRadius * t;
    const px = cx + driftX * t + Math.cos(angle) * radius * stretch;
    const py = cy + driftY * t + Math.sin(angle) * radius;
    strokes.push({
      points: [
        { x: px, y: py },
        { x: px + 0.1, y: py },
      ],
      color: palette.support,
      width: 2.5 + rand() * 2.5,
      alpha: 0.85,
    });
  }

  return strokes;
}

/** Horizontal contour bands: calm, sedimentary, editorial. */
function strataFamily(rand: () => number, width: number, height: number): Stroke[] {
  const noise = makeNoise(rand);
  const palette = pickPalette(rand);
  const strokes: Stroke[] = [];

  const bands = 22 + Math.floor(rand() * 22);
  const amplitude = height * (0.06 + rand() * 0.14);
  // How many noise cells span the canvas width. Low numbers give long, lazy waves.
  const cellsAcross = 2.5 + rand() * 5;
  const drift = rand() * 40;
  // Adjacent bands sample nearby noise rows so layers follow each other like
  // sediment instead of crossing at random.
  const bandCorrelation = 0.28 + rand() * 0.2;

  for (let b = 0; b < bands; b++) {
    const baseY = ((b + 0.5) / bands) * height;
    const points: Point[] = [];
    const resolution = 56;

    for (let s = 0; s <= resolution; s++) {
      const t = s / resolution;
      const x = t * width;
      const wobble = (noise(t * cellsAcross + drift, b * bandCorrelation) - 0.5) * amplitude;
      points.push({ x, y: baseY + wobble });
    }

    const roll = rand();
    strokes.push({
      points,
      color: roll > 0.88 ? palette.support : roll > 0.66 ? palette.whisper : palette.lead,
      width: 0.5 + rand() * 1.2,
      alpha: 0.28 + rand() * 0.45,
    });
  }

  return strokes;
}

export function generateSeedArt(seedWord: string, width: number, height: number): SeedArt {
  const [s1] = cyrb128(seedWord.trim().toLowerCase() || "untitled");
  const rand = mulberry32(s1);

  const families: ArtFamily[] = ["current", "orbit", "strata"];
  const family = families[Math.floor(rand() * families.length)];

  const strokes =
    family === "current"
      ? currentFamily(rand, width, height)
      : family === "orbit"
        ? orbitFamily(rand, width, height)
        : strataFamily(rand, width, height);

  const segmentCount = strokes.reduce((sum, stroke) => sum + stroke.points.length - 1, 0);

  return { strokes, family, segmentCount };
}

/**
 * Draws segments [from, to) of the artwork. Callers advance `to` frame by frame to
 * animate the trace; passing the full segment count renders the finished piece.
 */
export function drawSegments(
  ctx: CanvasRenderingContext2D,
  art: SeedArt,
  from: number,
  to: number,
): void {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  let cursor = 0;

  for (const stroke of art.strokes) {
    const segments = stroke.points.length - 1;
    if (cursor + segments <= from) {
      cursor += segments;
      continue;
    }
    if (cursor >= to) break;

    const localFrom = Math.max(0, from - cursor);
    const localTo = Math.min(segments, to - cursor);

    ctx.strokeStyle = stroke.color;
    ctx.globalAlpha = stroke.alpha;
    ctx.lineWidth = stroke.width;
    ctx.beginPath();
    ctx.moveTo(stroke.points[localFrom].x, stroke.points[localFrom].y);
    for (let i = localFrom + 1; i <= localTo; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }
    ctx.stroke();

    cursor += segments;
  }

  ctx.globalAlpha = 1;
}
