import React from 'react';
import { motion } from 'framer-motion';

export const Footer = () => {
  const letters = "purushotham 2026".split("");

  return (
    <footer className="py-12 border-t border-white/[0.06] bg-[#060913] font-mono text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-center">
        {/* Lando Norris style interactive twisting typographic hover */}
        <div className="relative group inline-flex items-center gap-2 cursor-pointer select-none py-2 px-4">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          
          <div className="flex items-center">
            {letters.map((char, index) => (
              <motion.span
                key={index}
                className="inline-block lowercase tracking-wider font-semibold text-zinc-300 group-hover:text-cyan-300 transition-colors"
                whileHover={{
                  rotateY: 180,
                  rotateX: 25,
                  scale: 1.25,
                  y: -4,
                  color: "#38bdf8",
                  transition: { type: "spring", stiffness: 450, damping: 12 }
                }}
                style={{
                  display: char === " " ? "inline" : "inline-block",
                  width: char === " " ? "6px" : "auto",
                  transformStyle: "preserve-3d"
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
