import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Menu } from "@/components/Menu";
import { Gallery } from "@/components/Gallery";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Location />
      </main>
      <Footer />
    </>
  );
}
