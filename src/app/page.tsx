import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { Capabilities } from "@/components/Capabilities/Capabilities";
import { Process } from "@/components/Process/Process";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <Process />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
