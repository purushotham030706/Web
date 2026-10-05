import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../utils/portfolioData';

export const Skills = () => {
  return (
    <section id="skills" className="py-20 sm:py-24 relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header in lowercase without redundant filter tabs */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-cyan-400">
            04 /
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display lowercase tracking-wider text-zinc-100">
            technical matrix
          </h2>
          <div className="flex-1 h-[1px] bg-white/[0.08] ml-4" />
        </div>

        {/* All Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.code}
              className="rounded-xl border border-white/[0.08] bg-[#0b1120]/70 p-6 flex flex-col justify-between backdrop-blur-sm hover:border-cyan-400/30 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                  <h3 className="font-mono text-xs lowercase tracking-wider text-cyan-400 font-semibold">
                    {cat.category}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500 lowercase">
                    [{cat.skills.length} modules]
                  </span>
                </div>

                <p className="text-xs text-zinc-400 mb-6 font-light">
                  {cat.description}
                </p>

                <div className="space-y-3.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-zinc-100 group-hover:text-white">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono lowercase tracking-wider text-zinc-400 border border-white/[0.08] px-2 py-0.5 rounded-full">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 font-mono">
                        {skill.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-zinc-600 lowercase">
                <span>sec_{cat.code}</span>
                <span>verified // active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
