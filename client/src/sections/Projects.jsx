import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../utils/portfolioData';

export const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="work" className="py-28 relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Header in lowercase */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-cyan-400">
            02 /
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display lowercase tracking-wider text-zinc-100">
            selected work
          </h2>
          <div className="flex-1 h-[1px] bg-white/[0.08] ml-4" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              onClick={() => setActiveProject(project)}
              data-cursor="card"
              data-cursor-text="EXPLORE"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', damping: 20, stiffness: 240 }}
              className="group relative rounded-2xl border border-white/[0.1] bg-[#0c0e14]/90 p-7 flex flex-col justify-between cursor-pointer overflow-hidden backdrop-blur-md hover:border-cyan-400/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
                  <span className="font-display text-2xl font-bold text-zinc-600 group-hover:text-cyan-400 transition-colors">
                    {project.number}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 border border-white/[0.08] px-2 py-0.5 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {project.year}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-zinc-100 mb-2.5 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-light line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-white/[0.03] border border-white/[0.06] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-cyan-300 transition-colors">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {project.status}
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  specs <span>→</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl rounded-2xl border border-white/[0.15] bg-[#0a0c10] p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveProject(null)}
                data-cursor="hover"
                className="absolute top-6 right-6 p-2 rounded-full border border-white/[0.1] bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                aria-label="Close project modal"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 mb-2">
                <span className="text-cyan-400 font-bold font-display text-base">{activeProject.number}</span>
                <span>/</span>
                <span className="lowercase">{activeProject.category}</span>
                <span>/</span>
                <span>{activeProject.year}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
                {activeProject.title}
              </h3>

              <p className="text-base text-zinc-300 leading-relaxed mb-6 font-light">
                {activeProject.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                  SYSTEM BREAKDOWN
                </h4>
                <ul className="space-y-2">
                  {activeProject.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-cyan-400 font-mono mt-0.5">▹</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2.5">
                  STACK & ARCHITECTURE
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-mono rounded border border-white/[0.1] bg-white/[0.04] text-zinc-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/[0.08] text-xs font-mono mb-8">
                <div>
                  <span className="text-zinc-500 block mb-0.5">ROLE</span>
                  <span className="text-zinc-200">{activeProject.role}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">STATUS</span>
                  <span className="text-emerald-400">{activeProject.status}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {activeProject.githubUrl ? (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black font-mono text-xs font-semibold uppercase hover:bg-zinc-200 transition-colors"
                  >
                    <span>View Repository</span>
                    <span>↗</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/[0.1] bg-white/[0.03] text-zinc-500 font-mono text-xs uppercase cursor-not-allowed"
                  >
                    <span>Repository (Coming Soon)</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
