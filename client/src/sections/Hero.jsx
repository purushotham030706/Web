import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InteractiveFace } from '../components/InteractiveFace';
import { PERSONAL_INFO } from '../utils/portfolioData';

export const Hero = ({ onContactClick, onToggleGameMode, isGameMode }) => {
  const handlePressStart = () => {
    document.body.classList.add('glitch-active');
    setTimeout(() => {
      document.body.classList.remove('glitch-active');
    }, 350);
    onToggleGameMode();
  };

  return (
    <section className="relative min-h-[92vh] pt-28 sm:pt-32 pb-16 flex flex-col justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Editorial Hero Identity */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Primary Editorial Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-zinc-100 leading-[1.08] mb-5 sm:mb-6"
          >
            hi, i'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              puru
            </span>
            <span className="text-cyan-400">.</span>
          </motion.h1>

          {/* Secondary Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mb-8 max-w-xl"
          >
            <p className="text-base sm:text-xl font-mono text-zinc-300 font-normal mb-3">
              {PERSONAL_INFO.tagline}
            </p>
            <p className="text-xs sm:text-base text-zinc-400 leading-relaxed font-light">
              {PERSONAL_INFO.subTagline}
            </p>
          </motion.div>

          {/* Actions & Game Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 sm:gap-6"
          >
            <button
              onClick={onContactClick}
              data-cursor="hover"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-md bg-zinc-100 text-zinc-950 font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-200"
            >
              Contact Me
            </button>

            <a
              href="#work"
              data-cursor="hover"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-md border border-white/[0.12] bg-white/[0.03] text-zinc-300 font-mono text-xs tracking-wider uppercase hover:border-white/[0.3] hover:text-white transition-all duration-200"
            >
              Selected Work ↓
            </a>

            <button
              onClick={handlePressStart}
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors uppercase select-none group"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isGameMode ? 'bg-cyan-400 animate-ping' : 'bg-zinc-600'} group-hover:bg-cyan-400 transition-colors`} />
              <span>{isGameMode ? 'GAME DEV MODE ACTIVE [OPEN]' : 'PRESS START'}</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Interactive Dot Matrix Face */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <InteractiveFace imageSrc="/puru.jpg" />
        </motion.div>
      </div>

      {/* Dynamic Animated Scroll Indicator: glowing, moving down */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none"
      >
        <motion.span
          animate={{
            opacity: [0.4, 1, 0.4],
            textShadow: [
              '0 0 0px rgba(56,189,248,0)',
              '0 0 10px rgba(56,189,248,0.8)',
              '0 0 0px rgba(56,189,248,0)'
            ]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="text-[10px] font-mono tracking-widest uppercase text-cyan-300"
        >
          SCROLL
        </motion.span>

        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="flex flex-col items-center"
        >
          <div className="w-[1.5px] h-6 bg-gradient-to-b from-cyan-400 via-cyan-300 to-transparent shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          <div className="w-1.5 h-1.5 border-b border-r border-cyan-400 rotate-45 -mt-1.5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
