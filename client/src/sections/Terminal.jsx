import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../utils/portfolioData';

const COMMANDS = {
  // Core commands
  whoami: `${PERSONAL_INFO.name} — CS student & game developer based in Mysuru.`,
  skills: 'Unity, C#, Unreal Engine, Java, C++, C, Python, JavaScript, HTML, CSS',
  projects: 'NetAssure, Bovine Rush, Dr. Bharathi P Clinic, Cafe Tracker, Run n Gun',
  education: 'KG-1st: St. Xavier’s Kamagere | 1st-4th: Sri Vasavi Vidyalaya Kollegal | 5th-8th: De Paul Int (ICSE) | 9th-10th: NPS Mysuru (CBSE) | +1/+2: BASE PU | Current: JSSSTU Mysuru',
  status: PERSONAL_INFO.status,
  contact: `Email: ${PERSONAL_INFO.email} | GitHub: ${PERSONAL_INFO.github} | Instagram: @purushotham0307`,

  // Fun commands
  '/favmusicartist': 'Kendrick Lamar. Favorite projects: Good Kid, M.A.A.D City, To Pimp a Butterfly, DAMN., and GNX. Masterclass in lyricism and concept storytelling.',
  '/favgame': 'Red Dead Redemption 2 & GTA 5 for world-building and simulation; Minecraft for endless sandbox creativity; NFS Payback for arcade racing handling.',
  '/hello': 'hey! welcome to my corner of the web. feel free to explore my projects, play the descent mini-game via "press start", or shoot me a message.',
  '/golf': 'golf is about precision, trajectory, and mental calm—reading green slopes and executing clean swing mechanics under pressure.',
  '/easteregg': 'psst: press the "PRESS START" button in the hero section to unlock the 3-map descent arcade runner on the right!',
  '/coffee': 'caffeine powered. built Cafe Tracker just to log every single cafe spot visited with map markers.',
  
  // Aliases without slash
  favmusicartist: 'Kendrick Lamar. Favorite projects: Good Kid, M.A.A.D City, To Pimp a Butterfly, DAMN., and GNX. Masterclass in lyricism and concept storytelling.',
  favgame: 'Red Dead Redemption 2 & GTA 5 for world-building and simulation; Minecraft for endless sandbox creativity; NFS Payback for arcade racing handling.',
  hello: 'hey! welcome to my corner of the web. feel free to explore my projects, play the descent mini-game via "press start", or shoot me a message.',
  golf: 'golf is about precision, trajectory, and mental calm—reading green slopes and executing clean swing mechanics under pressure.',
  easteregg: 'psst: press the "PRESS START" button in the hero section to unlock the 3-map descent arcade runner on the right!',

  // Help menu listing all commands clearly
  '/help': `Available Commands:
  /whoami          — about puru
  /skills          — technical matrix overview
  /projects        — list of highlighted software & games
  /education       — school & university journey
  /status          — current focus & building status
  /contact         — email, github, linkedin, instagram
  /favmusicartist  — favorite artist & albums (Kendrick Lamar)
  /favgame         — favorite games & childhood influences
  /hello           — say hello
  /golf            — thoughts on golf & precision
  /easteregg       — secret arcade game hint
  clear            — clear terminal screen`,

  help: `Available Commands:
  /whoami          — about puru
  /skills          — technical matrix overview
  /projects        — list of highlighted software & games
  /education       — school & university journey
  /status          — current focus & building status
  /contact         — email, github, linkedin, instagram
  /favmusicartist  — favorite artist & albums (Kendrick Lamar)
  /favgame         — favorite games & childhood influences
  /hello           — say hello
  /golf            — thoughts on golf & precision
  /easteregg       — secret arcade game hint
  clear            — clear terminal screen`
};

export const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'cmd', text: 'whoami' },
    { type: 'output', text: PERSONAL_INFO.name },
    { type: 'cmd', text: '/favmusicartist' },
    { type: 'output', text: 'Kendrick Lamar — storytelling & lyricism.' },
    { type: 'cmd', text: '/favgame' },
    { type: 'output', text: 'RDR2, GTA 5, Minecraft, NFS Payback.' },
    { type: 'cmd', text: '/help' },
    { type: 'output', text: 'type "/help" to view all available commands.' },
  ]);

  const [inputVal, setInputVal] = useState('');

  const handleCommand = (e) => {
    e.preventDefault();
    const raw = inputVal.trim();
    if (!raw) return;

    const lower = raw.toLowerCase();

    if (lower === 'clear' || lower === '/clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const output = COMMANDS[lower] || COMMANDS['/' + lower] || `command not found: "${raw}". Type "/help" for available commands.`;

    setHistory((prev) => [
      ...prev,
      { type: 'cmd', text: raw },
      { type: 'output', text: output }
    ]);
    setInputVal('');
  };

  const handleQuickCmd = (cmd) => {
    if (cmd === 'clear') {
      setHistory([]);
      return;
    }
    const output = COMMANDS[cmd] || COMMANDS['/' + cmd];
    setHistory((prev) => [
      ...prev,
      { type: 'cmd', text: cmd },
      { type: 'output', text: output }
    ]);
  };

  return (
    <section id="terminal" className="py-20 sm:py-24 relative border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Section Header in lowercase */}
        <div className="flex items-center gap-3 mb-10 sm:mb-12">
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-cyan-400">
            03 /
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display lowercase tracking-wider text-zinc-100">
            whoami // terminal
          </h2>
          <div className="flex-1 h-[1px] bg-white/[0.08] ml-4" />
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-xl border border-white/[0.12] bg-[#05070e] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
          <div className="px-4 py-3 bg-[#0a0f1d] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 text-zinc-400 text-[11px] tracking-wider lowercase">
                puru@jssstu-dev:~
              </span>
            </div>
            <div className="text-[10px] text-zinc-500 lowercase tracking-widest">
              bash // tty-1
            </div>
          </div>

          {/* Quick command shortcuts */}
          <div className="px-4 sm:px-5 pt-3 pb-2 border-b border-white/[0.04] bg-white/[0.01] flex flex-wrap gap-1.5 sm:gap-2 items-center text-[11px]">
            <span className="text-zinc-500 text-[10px] lowercase tracking-wider mr-1">quick:</span>
            {['/help', '/favmusicartist', '/favgame', '/hello', '/skills', '/projects', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleQuickCmd(cmd)}
                data-cursor="hover"
                className="px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors lowercase text-[10px] sm:text-xs"
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 space-y-3.5 max-h-[440px] overflow-y-auto">
            {history.map((item, index) => (
              <div key={index} className="leading-relaxed">
                {item.type === 'cmd' ? (
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="text-cyan-400 font-semibold">$</span>
                    <span className="text-zinc-200">{item.text}</span>
                  </div>
                ) : (
                  <div className="pl-4 text-emerald-400/90 whitespace-pre-wrap break-words text-xs sm:text-sm font-light">
                    {item.text}
                  </div>
                )}
              </div>
            ))}

            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 text-zinc-300">
              <span className="text-cyan-400 font-semibold">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type /help, /favmusicartist, /favgame, /hello..."
                className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-600 font-mono text-xs sm:text-sm"
                aria-label="Interactive Terminal Command Input"
              />
              <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
