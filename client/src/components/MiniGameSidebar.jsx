import React, { useEffect, useRef, useState } from 'react';

// 3 Challenging Maps with unique platform architectures, moving hazards, and tight jumps
const MAPS = [
  {
    name: "MAP 01: THE VERTICAL SHAFT",
    hazardColor: "#f43f5e",
    gravity: 0.44,
    jumpPower: -7.8,
    platforms: [
      { x: 10, y: 70, w: 90, h: 8 },
      { x: 170, y: 110, w: 90, h: 8 },
      { x: 25, y: 160, w: 75, h: 8 },
      { x: 180, y: 205, w: 80, h: 8 },
      { x: 60, y: 255, w: 70, h: 8 },
      { x: 190, y: 300, w: 75, h: 8 },
      { x: 20, y: 350, w: 75, h: 8 },
      { x: 160, y: 400, w: 80, h: 8 },
      { x: 40, y: 445, w: 70, h: 8 },
      { x: 10, y: 495, w: 280, h: 10 }, // Goal floor
    ],
    // Dynamic moving hazards (red laser bars that sweep horizontally)
    hazards: [
      { x: 90, y: 155, w: 35, h: 6, vx: 1.8, minX: 90, maxX: 180 },
      { x: 50, y: 295, w: 40, h: 6, vx: -2.2, minX: 40, maxX: 160 },
      { x: 100, y: 395, w: 45, h: 6, vx: 2.0, minX: 70, maxX: 170 },
    ],
    stars: [
      { x: 45, y: 50, collected: false },
      { x: 215, y: 90, collected: false },
      { x: 60, y: 140, collected: false },
      { x: 220, y: 185, collected: false },
      { x: 95, y: 235, collected: false },
      { x: 230, y: 280, collected: false },
      { x: 55, y: 330, collected: false },
      { x: 200, y: 380, collected: false },
      { x: 75, y: 425, collected: false },
      { x: 250, y: 475, collected: false },
    ],
    goal: { x: 250, y: 465, w: 25, h: 30 }
  },
  {
    name: "MAP 02: CYBER GAP FALL",
    hazardColor: "#fb923c",
    gravity: 0.46,
    jumpPower: -8.0,
    platforms: [
      { x: 10, y: 65, w: 70, h: 8 },
      { x: 220, y: 105, w: 60, h: 8 },
      { x: 70, y: 155, w: 55, h: 8 },
      { x: 190, y: 200, w: 50, h: 8 },
      { x: 30, y: 245, w: 55, h: 8 },
      { x: 210, y: 290, w: 60, h: 8 },
      { x: 80, y: 340, w: 50, h: 8 },
      { x: 180, y: 390, w: 55, h: 8 },
      { x: 25, y: 440, w: 60, h: 8 },
      { x: 10, y: 495, w: 280, h: 10 },
    ],
    hazards: [
      { x: 120, y: 100, w: 45, h: 6, vx: 2.4, minX: 70, maxX: 210 },
      { x: 90, y: 195, w: 50, h: 6, vx: -2.8, minX: 40, maxX: 180 },
      { x: 130, y: 285, w: 45, h: 6, vx: 2.6, minX: 80, maxX: 200 },
      { x: 90, y: 385, w: 50, h: 6, vx: -3.0, minX: 30, maxX: 170 },
    ],
    stars: [
      { x: 40, y: 45, collected: false },
      { x: 250, y: 85, collected: false },
      { x: 95, y: 135, collected: false },
      { x: 215, y: 180, collected: false },
      { x: 55, y: 225, collected: false },
      { x: 240, y: 270, collected: false },
      { x: 105, y: 320, collected: false },
      { x: 205, y: 370, collected: false },
      { x: 55, y: 420, collected: false },
      { x: 240, y: 475, collected: false },
    ],
    goal: { x: 250, y: 465, w: 25, h: 30 }
  },
  {
    name: "MAP 03: THE GAUNTLET [HARD]",
    hazardColor: "#a855f7",
    gravity: 0.48,
    jumpPower: -8.1,
    platforms: [
      { x: 10, y: 65, w: 50, h: 8 },
      { x: 190, y: 105, w: 45, h: 8 },
      { x: 50, y: 150, w: 45, h: 8 },
      { x: 215, y: 195, w: 45, h: 8 },
      { x: 35, y: 240, w: 45, h: 8 },
      { x: 180, y: 285, w: 45, h: 8 },
      { x: 60, y: 335, w: 45, h: 8 },
      { x: 205, y: 380, w: 45, h: 8 },
      { x: 40, y: 430, w: 45, h: 8 },
      { x: 10, y: 495, w: 280, h: 10 },
    ],
    hazards: [
      { x: 80, y: 100, w: 50, h: 6, vx: 3.2, minX: 50, maxX: 185 },
      { x: 110, y: 190, w: 55, h: 6, vx: -3.5, minX: 40, maxX: 210 },
      { x: 90, y: 280, w: 50, h: 6, vx: 3.4, minX: 40, maxX: 175 },
      { x: 120, y: 375, w: 55, h: 6, vx: -3.8, minX: 50, maxX: 200 },
      { x: 90, y: 425, w: 45, h: 6, vx: 3.2, minX: 40, maxX: 190 },
    ],
    stars: [
      { x: 35, y: 45, collected: false },
      { x: 210, y: 85, collected: false },
      { x: 70, y: 130, collected: false },
      { x: 235, y: 175, collected: false },
      { x: 55, y: 220, collected: false },
      { x: 200, y: 265, collected: false },
      { x: 80, y: 315, collected: false },
      { x: 225, y: 360, collected: false },
      { x: 60, y: 410, collected: false },
      { x: 250, y: 475, collected: false },
    ],
    goal: { x: 250, y: 465, w: 25, h: 30 }
  }
];

export const MiniGameSidebar = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [starsCollected, setStarsCollected] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [levelWon, setLevelWon] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const width = (canvas.width = 300);
    const height = (canvas.height = 540);

    const keys = { a: false, d: false, space: false };

    const mapData = MAPS[currentLevelIndex];
    // Deep copy stars & hazards so they reset properly per map
    const levelStars = mapData.stars.map((s) => ({ ...s }));
    const levelHazards = mapData.hazards.map((h) => ({ ...h }));

    // Player state with tight responsive jumping
    const player = {
      x: 25,
      y: 40,
      w: 16,
      h: 22,
      vx: 0,
      vy: 0,
      speed: 3.6,
      jumpPower: mapData.jumpPower,
      grounded: false,
    };

    const gravity = mapData.gravity;
    const friction = 0.82;

    const resetPlayer = () => {
      player.x = 25;
      player.y = 40;
      player.vx = 0;
      player.vy = 0;
      setDeaths((d) => d + 1);
    };

    const handleKeyDown = (e) => {
      const k = e.key.toLowerCase();
      if (k === 'a' || k === 'arrowleft') keys.a = true;
      if (k === 'd' || k === 'arrowright') keys.d = true;
      if (k === ' ' || k === 'w' || k === 'arrowup') {
        keys.space = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      const k = e.key.toLowerCase();
      if (k === 'a' || k === 'arrowleft') keys.a = false;
      if (k === 'd' || k === 'arrowright') keys.d = false;
      if (k === ' ' || k === 'w' || k === 'arrowup') keys.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const update = () => {
      // Horizontal control
      if (keys.a) player.vx = -player.speed;
      else if (keys.d) player.vx = player.speed;
      else player.vx *= friction;

      // Jump control
      if (keys.space && player.grounded) {
        player.vy = player.jumpPower;
        player.grounded = false;
      }

      player.vy += gravity;
      player.x += player.vx;
      player.y += player.vy;

      // Wall boundaries
      if (player.x < 5) player.x = 5;
      if (player.x + player.w > width - 5) player.x = width - 5 - player.w;

      // Fall off pit safety
      if (player.y > height + 20) {
        resetPlayer();
      }

      // Platform collisions
      player.grounded = false;
      for (const p of mapData.platforms) {
        if (
          player.x + player.w > p.x &&
          player.x < p.x + p.w &&
          player.y + player.h >= p.y &&
          player.y + player.h <= p.y + p.h + player.vy + 1.5 &&
          player.vy >= 0
        ) {
          player.grounded = true;
          player.vy = 0;
          player.y = p.y - player.h;
        }
      }

      // Hazard updates & collision
      for (const h of levelHazards) {
        h.x += h.vx;
        if (h.x <= h.minX || h.x + h.w >= h.maxX) {
          h.vx *= -1;
        }

        // AABB Collision with player
        if (
          player.x + player.w > h.x &&
          player.x < h.x + h.w &&
          player.y + player.h > h.y &&
          player.y < h.y + h.h
        ) {
          resetPlayer();
        }
      }

      // Star collection (10 stars)
      let count = 0;
      for (const s of levelStars) {
        if (!s.collected) {
          const dx = player.x + player.w / 2 - s.x;
          const dy = player.y + player.h / 2 - s.y;
          if (Math.sqrt(dx * dx + dy * dy) < 17) {
            s.collected = true;
          }
        } else {
          count++;
        }
      }
      setStarsCollected(count);

      // Level Clear check (must collect all 10 stars and reach the bottom goal flag)
      if (count === 10 && player.y >= 450 && player.x >= 220) {
        if (currentLevelIndex < MAPS.length - 1) {
          setLevelWon(true);
        } else {
          setGameWon(true);
        }
      }

      // Draw Viewport
      ctx.clearRect(0, 0, width, height);

      // Background grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Platforms
      for (const p of mapData.platforms) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(p.x, p.y, p.w, 2);
      }

      // Draw Moving Hazards
      for (const h of levelHazards) {
        ctx.fillStyle = mapData.hazardColor;
        ctx.shadowColor = mapData.hazardColor;
        ctx.shadowBlur = 10;
        ctx.fillRect(h.x, h.y, h.w, h.h);
        ctx.shadowBlur = 0;
      }

      // Draw Stars
      for (const s of levelStars) {
        if (!s.collected) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#facc15';
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw Player Character (Cyan runner with glow and visor)
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(player.x, player.y, player.w, player.h);
      ctx.fillStyle = '#ffffff';
      const lookDir = player.vx >= 0 ? player.x + 8 : player.x + 2;
      ctx.fillRect(lookDir, player.y + 4, 6, 4);

      // Draw Goal Flag
      ctx.fillStyle = count === 10 ? '#10b981' : '#64748b';
      ctx.fillRect(260, 460, 3, 30);
      ctx.beginPath();
      ctx.moveTo(263, 462);
      ctx.lineTo(276, 470);
      ctx.lineTo(263, 478);
      ctx.fillStyle = count === 10 ? '#34d399' : '#475569';
      ctx.fill();

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, currentLevelIndex]);

  const handleNextMap = () => {
    setLevelWon(false);
    setStarsCollected(0);
    setCurrentLevelIndex((prev) => Math.min(MAPS.length - 1, prev + 1));
  };

  const handleRestart = () => {
    setGameWon(false);
    setLevelWon(false);
    setStarsCollected(0);
    setDeaths(0);
    setCurrentLevelIndex(0);
  };

  if (!isOpen) return null;

  const currentMap = MAPS[currentLevelIndex];

  return (
    <div className="fixed right-4 sm:right-6 bottom-6 z-50 w-[310px] rounded-2xl border border-cyan-400/40 bg-[#060913]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden font-mono">
      {/* Game Window Header */}
      <div className="px-3.5 py-2.5 bg-[#0b1120] border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
            {currentMap.name}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-zinc-400 hover:text-white px-1.5 py-0.5 rounded border border-white/[0.08]"
          aria-label="Close Mini Game"
        >
          ✕
        </button>
      </div>

      {/* Canvas Viewport */}
      <div className="p-2 flex justify-center bg-[#05070d]">
        <canvas ref={canvasRef} className="rounded-lg border border-white/[0.06]" />
      </div>

      {/* Status Bar */}
      <div className="px-3.5 py-2.5 bg-[#0b1120] border-t border-white/[0.08] flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-3">
          <div>
            <span className="text-zinc-500">STARS: </span>
            <span className="text-yellow-400 font-bold">{starsCollected}/10</span>
          </div>
          <div>
            <span className="text-zinc-500">DEATHS: </span>
            <span className="text-rose-400 font-bold">{deaths}</span>
          </div>
        </div>
        <div className="text-zinc-400 text-[10px]">
          [A/D] Move • [SPACE] Jump
        </div>
      </div>

      {/* Level Complete / Next Map Modal Overlay */}
      {levelWon && (
        <div className="p-3 bg-emerald-500/15 border-t border-emerald-500/40 text-center flex flex-col gap-2">
          <p className="text-xs text-emerald-300 font-bold">
            ★ MAP CLEARED! READY FOR NEXT SECTOR?
          </p>
          <button
            onClick={handleNextMap}
            className="w-full py-1.5 rounded bg-emerald-400 text-black font-bold text-xs uppercase hover:bg-emerald-300 transition-colors"
          >
            Advance to Next Map →
          </button>
        </div>
      )}

      {/* Complete Victory Screen */}
      {gameWon && (
        <div className="p-3 bg-cyan-500/15 border-t border-cyan-500/40 text-center flex flex-col gap-2">
          <p className="text-xs text-cyan-300 font-bold">
            🏆 MASTER RUNNER! ALL 3 MAPS CONQUERED!
          </p>
          <button
            onClick={handleRestart}
            className="w-full py-1.5 rounded bg-cyan-400 text-black font-bold text-xs uppercase hover:bg-cyan-300 transition-colors"
          >
            Play Again ↺
          </button>
        </div>
      )}
    </div>
  );
};
