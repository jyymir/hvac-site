import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Appointment } from "@/components/sections/Appointment";
import { Contact } from "@/components/sections/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      {/* Skip link: first focusable element, lets keyboard users bypass the
          nav and jump straight to page content. Visually hidden until focused. */}
      <a href="#main-content" className="sr-only sr-only-focusable">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Services />
        {/* <Reviews /> */}
        <Gallery />
        <Appointment />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
