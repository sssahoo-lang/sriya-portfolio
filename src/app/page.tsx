import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function Home() {
  // File-based storage can't write on Vercel's serverless filesystem, so the
  // submission form is hidden there until it's backed by a real database. The
  // board itself still renders normally.
  const guestbookEnabled = process.env.VERCEL !== "1";

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer guestbookEnabled={guestbookEnabled} />
    </>
  );
}
