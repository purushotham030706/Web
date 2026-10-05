import React from 'react';
import { motion } from 'framer-motion';

export const Interests = () => {
  const categories = [
    {
      id: "gaming",
      badge: "gaming",
      title: "games that shaped my journey",
      desc: "Grew up immersed in open worlds and competitive loops that sparked my passion for game dev.",
      items: [
        { name: "Minecraft", detail: "Early creativity, procedural generation & endless sandbox building" },
        { name: "Grand Theft Auto V", detail: "World design, open-ended physics & vehicle mechanics" },
        { name: "NFS Payback", detail: "High-speed arcade handling, drift physics & customization loops" },
        { name: "Red Dead Redemption 2", detail: "Unmatched environmental storytelling, attention to detail & tactile simulation" },
      ]
    },
    {
      id: "golf",
      badge: "golf",
      title: "golf & spatial focus",
      desc: "Appreciation for precision, trajectory analysis, mental calm, and the discipline of swing mechanics.",
      items: [
        { name: "Precision & Trajectory", detail: "Reading terrain, wind calculations, and consistent shot execution" },
        { name: "Mental Discipline", detail: "Focusing on one shot at a time—similar to debugging complex game systems" },
      ]
    },
    {
      id: "music",
      badge: "music",
      title: "soundtracks & rap culture",
      desc: "Deep appreciation for lyricism, concept storytelling, and sonic production.",
      items: [
        { name: "Kendrick Lamar", detail: "Storytelling, poetic complexity & conceptual album mastery (GKMC, TPAB, DAMN, GNX)" },
        { name: "Game OSTs", detail: "Atmospheric, dynamic audio scoring that amplifies gameplay immersion" },
      ]
    }
  ];

  return (
    <section id="interests" className="py-28 relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Header in lowercase */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-cyan-400">
            05 /
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display lowercase tracking-wider text-zinc-100">
            personal interests
          </h2>
          <div className="flex-1 h-[1px] bg-white/[0.08] ml-4" />
        </div>

        {/* 3 Interactive Sub-sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl border border-white/[0.08] bg-[#0c0e14]/90 p-7 flex flex-col justify-between backdrop-blur-md hover:border-cyan-400/30 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                  <span className="font-mono text-xs text-cyan-400 font-semibold lowercase tracking-wider">
                    {cat.badge}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400/60" />
                </div>

                <h3 className="text-xl font-bold font-display text-zinc-100 lowercase mb-2.5">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                  {cat.desc}
                </p>

                <div className="space-y-3">
                  {cat.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="text-sm font-medium text-zinc-200 lowercase mb-0.5">
                        {item.name}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500 leading-snug">
                        {item.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.04] text-[10px] font-mono text-zinc-600 lowercase">
                category // {cat.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
