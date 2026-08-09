import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";

// Footer (copyright bar + the seed-art guestbook) is pulled off the page for
// now, since the guestbook's storage isn't production-ready yet. Re-add
// `<Footer guestbookEnabled={...} />` beneath <Contact /> to bring it back —
// the component itself is untouched, just not rendered.

export default function Home() {
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
    </>
  );
}
