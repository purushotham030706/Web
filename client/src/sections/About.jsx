import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../utils/portfolioData';

export const About = () => {
  return (
    <section id="about" className="py-20 sm:py-28 relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Editorial Section Header in lowercase */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-cyan-400">
            01 /
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display lowercase tracking-wider text-zinc-100">
            about
          </h2>
          <div className="flex-1 h-[1px] bg-white/[0.08] ml-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Story Narrative integrating full educational journey directly into prose */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
            <p>
              I’m an aspiring game developer focused on crafting responsive player physics, tactile game loops, and real-time interactive systems.
            </p>
            <p>
              My primary engine focus is <strong className="text-white font-medium">Unity with C#</strong>, where I develop gameplay mechanics, while also actively exploring <span className="text-white font-normal">Unreal Engine</span> blueprints and low-level computing concepts.
            </p>
            <p>
              My schooling started with KG to 1st at <span className="text-zinc-200">St. Xavier’s School, Kamagere (State Board)</span>, followed by 1st to 4th at <span className="text-zinc-200">Sri Vasavi Vidyalaya Kendriya, Kollegal (State Board)</span>. I completed middle school (5th–8th) at <span className="text-zinc-200">De Paul International Residential School, Mysuru (ICSE)</span>, high school (9th & 10th) at <span className="text-zinc-200">National Public School (NPS), Mysuru (CBSE)</span>, and pre-university (+1 & +2) at <span className="text-zinc-200">BASE PU College, Mysuru</span>.
            </p>
            <p>
              Currently, I am pursuing my Bachelor’s degree in Computer Science and Engineering at <strong className="text-white font-medium">JSS Science and Technology University (JSSSTU), Mysuru</strong>, merging core computer science with modern interactive software engineering.
            </p>
          </div>

          {/* Current Trajectory Card (Removed Academic Path module as requested) */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-white/[0.08] bg-[#0b1120]/70 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                <span className="font-mono text-xs lowercase tracking-wider text-zinc-400">
                  current focus
                </span>
                <span className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  active
                </span>
              </div>

              <div className="space-y-3">
                {PERSONAL_INFO.currently.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:border-white/[0.1] transition-colors"
                  >
                    <div className="text-[10px] font-mono lowercase tracking-widest text-zinc-500 mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-zinc-200">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-zinc-500 flex justify-between">
                <span>JSSSTU, MYSURU</span>
                <span>STATUS: 2026 ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
