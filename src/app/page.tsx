import Hero from '@/components/sections/Hero';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SelectedWork from '@/components/sections/SelectedWork';
import Experience from '@/components/sections/Experience';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <SelectedWork />
        <Experience />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}