import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import Showcase from '@/sections/Showcase';
import Stats from '@/sections/Stats';
import Download from '@/sections/Download';
import FAQ from '@/sections/FAQ';
import Footer from '@/sections/Footer';

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Showcase />
      <Stats />
      <Download />
      <FAQ />
      <Footer />
    </main>
  );
}
