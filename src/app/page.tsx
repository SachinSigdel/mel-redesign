import Hero from "@/components/home/Hero";
import Steps from "@/components/home/Steps";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import CtaPanel from "@/components/home/CtaPanel";
import Partners from "@/components/home/Partners";
import Testimonials from "@/components/home/Testimonials";
import BlogSection from "@/components/home/BlogSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Steps />
      <About />
      <Services />
      <CtaPanel />
      <Testimonials />
      <BlogSection />
      <Partners />
    </>
  );
}
