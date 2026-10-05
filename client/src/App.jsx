import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ParticleBackground } from './components/ParticleBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Terminal } from './sections/Terminal';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { MiniGameSidebar } from './components/MiniGameSidebar';
import { useReducedMotion } from './hooks/useReducedMotion';

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGameMode, setIsGameMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 250);

    let lenis;
    if (!prefersReducedMotion) {
      // Enhanced animated smooth scrolling with momentum & bounce
      lenis = new Lenis({
        duration: 1.45,
        // Fluid, bouncy cubic bezier easing curve
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.5,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    return () => {
      clearTimeout(timer);
      if (lenis) lenis.destroy();
    };
  }, [prefersReducedMotion]);

  const handleContactClick = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#060913] text-[#f1f3f7] bg-grain selection:bg-cyan-500/20 selection:text-white overflow-x-hidden">
      {/* Interactive Background Particle Canvas */}
      <ParticleBackground />

      {/* Crosshair Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Minimal Header Navigation */}
      <Navbar />

      {/* Mini-Game Window Triggered in Game Mode */}
      <MiniGameSidebar
        isOpen={isGameMode}
        onClose={() => setIsGameMode(false)}
      />

      {/* Main Content Sections (Interests removed per request) */}
      <main className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Hero
          onContactClick={handleContactClick}
          onToggleGameMode={() => setIsGameMode((prev) => !prev)}
          isGameMode={isGameMode}
        />
        <About />
        <Projects />
        <Terminal />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
