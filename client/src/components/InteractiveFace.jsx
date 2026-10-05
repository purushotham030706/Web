import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const InteractiveFace = ({ imageSrc = '/puru.jpg' }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    // Finer resolution for clean photographic likeness
    const step = 3; // Fine 3px grid density
    const mouseRadius = 65; // Smaller localized ripple radius
    const returnSpeed = 0.12; // Snappy return
    const friction = 0.82; // Controlled dampening

    let mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
    };

    class Dot {
      constructor(originX, originY, color, radius) {
        this.originX = originX;
        this.originY = originY;
        this.x = originX;
        this.y = originY;
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.baseRadius = radius;
        this.currentRadius = radius;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius && mouse.isHovered && !prefersReducedMotion) {
          // Gentle, subtle ripple (reduced intensity)
          const force = (1 - distance / mouseRadius);
          const angle = Math.atan2(dy, dx);
          const repelStrength = force * 4.5; // Reduced from 16 to 4.5

          this.vx -= Math.cos(angle) * repelStrength;
          this.vy -= Math.sin(angle) * repelStrength;

          this.currentRadius = this.baseRadius + force * 0.6;
        } else {
          this.currentRadius += (this.baseRadius - this.currentRadius) * 0.15;
        }

        const springDx = this.originX - this.x;
        const springDy = this.originY - this.y;
        this.vx += springDx * returnSpeed;
        this.vy += springDy * returnSpeed;

        this.vx *= friction;
        this.vy *= friction;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, Math.max(0.4, this.currentRadius), 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
      }
    }

    const initPoints = () => {
      const naturalW = img.naturalWidth || 600;
      const naturalH = img.naturalHeight || 800;
      const targetW = 320;
      const targetH = Math.round(targetW * (naturalH / naturalW));

      canvas.width = targetW;
      canvas.height = targetH;

      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      offCanvas.width = targetW;
      offCanvas.height = targetH;

      offCtx.drawImage(img, 0, 0, targetW, targetH);
      const imgData = offCtx.getImageData(0, 0, targetW, targetH).data;

      particles = [];

      for (let y = 0; y < targetH; y += step) {
        for (let x = 0; x < targetW; x += step) {
          const index = (y * targetW + x) * 4;
          const r = imgData[index];
          const g = imgData[index + 1];
          const b = imgData[index + 2];
          const a = imgData[index + 3];

          if (a > 30) {
            const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            // Render crisp, consistent dot matrix
            if (brightness > 0.06) {
              // Unified 2-tone palette: Crisp off-white & subtle cyan-tinted highlight
              let dotColor;
              if (brightness > 0.6) {
                dotColor = `rgba(240, 246, 255, ${0.75 + brightness * 0.25})`;
              } else if (brightness > 0.3) {
                dotColor = `rgba(186, 230, 253, ${0.45 + brightness * 0.4})`;
              } else {
                dotColor = `rgba(125, 160, 185, ${0.25 + brightness * 0.35})`;
              }

              // Fine dot size (1.1px to 1.7px) for high fidelity
              const dotRadius = Math.max(0.6, 1.1 + brightness * 0.6);
              particles.push(new Dot(x, y, dotColor, dotRadius));
            }
          }
        }
      }
    };

    img.onload = () => {
      initPoints();
    };

    if (img.complete && img.naturalWidth > 0) {
      initPoints();
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouse.targetX = (e.clientX - rect.left) * scaleX;
      mouse.targetY = (e.clientY - rect.top) * scaleY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.3;
      mouse.y += (mouse.targetY - mouse.y) * 0.3;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [imageSrc, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center select-none"
    >
      <div className="relative rounded-2xl overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          data-cursor="hover"
          className="cursor-pointer max-w-full drop-shadow-[0_10px_35px_rgba(56,189,248,0.12)]"
          aria-label="Interactive Dot Matrix Portrait"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#08090c] via-transparent to-transparent opacity-30" />
      </div>
    </div>
  );
};
