import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Event delegation for cursor interactions
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        const text = target.getAttribute('data-cursor-text') || '';
        setCursorVariant(type);
        setCursorText(text);
        return;
      }

      const isInteractive = e.target.closest('a, button, input, textarea, [role="button"]');
      if (isInteractive) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  // Variants for cursor
  const variants = {
    default: {
      width: 28,
      height: 28,
      borderColor: 'rgba(255, 255, 255, 0.45)',
      backgroundColor: 'rgba(255, 255, 255, 0)',
      scale: 1,
    },
    hover: {
      width: 48,
      height: 48,
      borderColor: 'rgba(255, 255, 255, 0.9)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      scale: 1.15,
    },
    card: {
      width: 76,
      height: 76,
      borderColor: 'rgba(56, 189, 248, 0.8)',
      backgroundColor: 'rgba(8, 9, 12, 0.85)',
      scale: 1.1,
    },
    focus: {
      width: 52,
      height: 52,
      borderColor: 'rgba(56, 189, 248, 0.8)',
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
      scale: 1.2,
    }
  };

  return (
    <>
      {/* Outer Interpolated Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-dashed flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (variants[cursorVariant]?.width || 28) / 2,
          y: mousePosition.y - (variants[cursorVariant]?.height || 28) / 2,
          ...variants[cursorVariant],
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 320,
          mass: 0.35,
        }}
      >
        {cursorText && (
          <span className="text-[9px] uppercase tracking-widest font-mono text-cyan-300 font-semibold text-center px-1">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Precise Dot & Crosshair */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: cursorVariant === 'hover' ? 1.4 : cursorVariant === 'card' ? 0 : 1,
          opacity: cursorVariant === 'card' ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="relative flex items-center justify-center">
          {/* Central Point */}
          <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
          
          {/* Subtle Crosshairs (Technical Aesthetic) */}
          <div className="absolute w-3.5 h-[1px] bg-white/40 pointer-events-none" />
          <div className="absolute h-3.5 w-[1px] bg-white/40 pointer-events-none" />
        </div>
      </motion.div>
    </>
  );
};
