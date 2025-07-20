import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { AllProducts, Trendings, AboutSection } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <AllProducts />
        <Trendings />
        <AboutSection />
      </main>
    </>
  );
}
