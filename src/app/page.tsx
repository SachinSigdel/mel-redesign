import Hero from "@/components/home/Hero";
import Steps from "@/components/home/Steps";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import CtaPanel from "@/components/home/CtaPanel";
import BlogSection from "@/components/home/BlogSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Steps />
      <About />
      <Services />
      <CtaPanel />
      <BlogSection />
    </>
  );
}
