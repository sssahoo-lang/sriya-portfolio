import { projects, type Project } from "./data";

function words(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/\.js\b/gi, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

const projectPools = projects.map((project) => ({
  project,
  pool: new Set(
    words([project.name, project.tagline, project.narrative, ...project.tags].join(" ")),
  ),
}));

const cache = new Map<string, Project[]>();

/**
 * A skill links to a project only if every word of the skill appears verbatim
 * in that project's copy (name/tagline/narrative/tags). Exact whole-word match,
 * not substring, so e.g. "scikit-learn" never matches on the word "learning".
 */
export function projectsForSkill(skill: string): Project[] {
  const cached = cache.get(skill);
  if (cached) return cached;

  const skillWords = words(skill);
  const found = projectPools
    .filter(({ pool }) => skillWords.length > 0 && skillWords.every((w) => pool.has(w)))
    .map(({ project }) => project);

  cache.set(skill, found);
  return found;
}
