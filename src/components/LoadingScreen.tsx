import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { getCharacterIdByPath } from '@/data/characters';
import type { ColorTheme } from '@/types/theme';

interface LoadingScreenProps {
  theme: ColorTheme;
  isLoading: boolean;
}

interface ConstellationNode {
  x: number; // percentage 0 to 100
  y: number; // percentage 0 to 100
  size: number;
  color?: string;
  isSpecial?: boolean; // red eyes
}

interface ConstellationLine {
  from: number;
  to: number;
}

const CONSTELLATIONS: Record<string, { nodes: ConstellationNode[]; lines: ConstellationLine[]; title: string; subtitle: string; color: string }> = {
  valery: {
    title: "Валерий Даркбейн",
    subtitle: "Созвездие Паладина: Двуручный Меч Памяти и Очертания Мертвецов",
    color: "#e6e6fa",
    nodes: [
      // Sword Pommel & Grip
      { x: 50, y: 15, size: 4.5 },
      { x: 50, y: 24, size: 3 },
      // Crossguard
      { x: 34, y: 28, size: 4 },
      { x: 50, y: 28, size: 3.5 },
      { x: 66, y: 28, size: 4 },
      // Blade
      { x: 50, y: 44, size: 3.5 },
      { x: 50, y: 62, size: 3.5 },
      { x: 50, y: 78, size: 5 }, // Sword tip in ground
      // Ground lines
      { x: 28, y: 78, size: 3 },
      { x: 72, y: 78, size: 3 },
      // Dead eyes in background (red glowing stars)
      { x: 30, y: 38, size: 4.5, color: "#ff4444", isSpecial: true },
      { x: 42, y: 37, size: 4.5, color: "#ff4444", isSpecial: true },
      { x: 58, y: 37, size: 4.5, color: "#ff4444", isSpecial: true },
      { x: 70, y: 38, size: 4.5, color: "#ff4444", isSpecial: true },
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 5 },
      { from: 5, to: 6 },
      { from: 6, to: 7 },
      { from: 7, to: 8 },
      { from: 7, to: 9 },
      // Eye links (very faint/flickering)
      { from: 10, to: 11 },
      { from: 12, to: 13 },
    ]
  },
  brin: {
    title: "Брин дель Хессен",
    subtitle: "Созвездие Чародея: Венец Тёмного Льда и Первые Истоки",
    color: "#a78bfa",
    nodes: [
      // Central ice crystal diamond
      { x: 50, y: 18, size: 5 },
      { x: 32, y: 48, size: 4 },
      { x: 68, y: 48, size: 4 },
      { x: 50, y: 78, size: 5 },
      { x: 50, y: 48, size: 3.5 }, // center node
      // Outer crowns
      { x: 22, y: 28, size: 3 },
      { x: 78, y: 28, size: 3 },
      { x: 50, y: 8, size: 3.5 },
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 3 },
      { from: 4, to: 0 },
      { from: 4, to: 1 },
      { from: 4, to: 2 },
      { from: 4, to: 3 },
      { from: 1, to: 5 },
      { from: 2, to: 6 },
      { from: 0, to: 7 },
    ]
  },
  sakris: {
    title: "Сакрис Ульриаш",
    subtitle: "Созвездие Следопыта: Драконий Охотничий Лук Духа",
    color: "#60a5fa",
    nodes: [
      // Bow
      { x: 22, y: 38, size: 4 },
      { x: 28, y: 24, size: 3 },
      { x: 50, y: 15, size: 5 },
      { x: 72, y: 24, size: 3 },
      { x: 78, y: 38, size: 4 },
      // Arrow
      { x: 50, y: 78, size: 4.5 },
      { x: 50, y: 48, size: 3.5 },
      { x: 50, y: 22, size: 5.5 }, // arrowhead
      // Dragon horns/ears outline in background
      { x: 32, y: 58, size: 2.5 },
      { x: 68, y: 58, size: 2.5 },
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      // Bow string
      { from: 0, to: 4 },
      // Arrow
      { from: 5, to: 6 },
      { from: 6, to: 7 },
      // Horn links
      { from: 6, to: 8 },
      { from: 6, to: 9 },
    ]
  },
  talis: {
    title: "Таллис Арантир",
    subtitle: "Созвездие Барда-Воина: Песнь Двух Клинков и Лютня Драконоборцев",
    color: "#f97316",
    nodes: [
      // Lute body (oval)
      { x: 50, y: 78, size: 5 },
      { x: 32, y: 62, size: 3.5 },
      { x: 68, y: 62, size: 3.5 },
      { x: 50, y: 48, size: 4 }, // sound hole
      // Lute neck
      { x: 50, y: 32, size: 3 },
      { x: 50, y: 16, size: 3.5 }, // headstock
      // Crossed swords
      { x: 18, y: 22, size: 3.5 }, // Sword 1 hilt
      { x: 82, y: 82, size: 3.5 }, // Sword 1 tip
      { x: 82, y: 22, size: 3.5 }, // Sword 2 hilt
      { x: 18, y: 82, size: 3.5 }, // Sword 2 tip
    ],
    lines: [
      // Lute outline
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      // Crossed swords
      { from: 6, to: 7 },
      { from: 8, to: 9 },
    ]
  },
  stive: {
    title: "Стив",
    subtitle: "Созвездие Друида: Древо Бытия и Священный Лист",
    color: "#34d399",
    nodes: [
      // Leaf outline
      { x: 50, y: 12, size: 5 }, // leaf tip
      { x: 28, y: 38, size: 3.5 },
      { x: 72, y: 38, size: 3.5 },
      { x: 30, y: 62, size: 4 },
      { x: 70, y: 62, size: 4 },
      { x: 50, y: 78, size: 4.5 }, // stem base
      // Leaf veins
      { x: 50, y: 32, size: 2.5 },
      { x: 50, y: 52, size: 3 },
    ],
    lines: [
      // Outline
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 5 },
      { from: 4, to: 5 },
      // Veins (stem connection)
      { from: 0, to: 6 },
      { from: 6, to: 7 },
      { from: 7, to: 5 },
      { from: 6, to: 1 },
      { from: 6, to: 2 },
      { from: 7, to: 3 },
      { from: 7, to: 4 },
    ]
  }
};

/* ── Interactive 3D Canvas Constellation Animation Component ── */
const ConstellationCanvas: React.FC<{ characterId: string; isCrumbling: boolean }> = ({ characterId, isCrumbling }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const data = CONSTELLATIONS[characterId] || CONSTELLATIONS.valery;
  const nodesRef = useRef<Array<{ x: number; y: number; tx: number; ty: number; vx: number; vy: number; size: number; currentSize: number; pulseSpeed: number; color: string; isSpecial: boolean }>>([]);
  const bgStarsRef = useRef<Array<{ x: number; y: number; brightness: number; speed: number; size: number }>>([]);
  const frameId = useRef<number | null>(null);
  const progressRef = useRef(0); // progress of drawing lines 0 to 1

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Resize
    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initializeData();
    };

    // Initialize stars & nodes
    const initializeData = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Initialize background stars
      const stars: typeof bgStarsRef.current = [];
      for (let i = 0; i < 75; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          brightness: Math.random(),
          speed: 0.01 + Math.random() * 0.02,
          size: 0.5 + Math.random() * 1.5,
        });
      }
      bgStarsRef.current = stars;

      // Initialize constellation nodes
      const targetSize = Math.min(w, h) * 0.45;
      const centerX = w / 2;
      const centerY = h / 2 - 20;

      nodesRef.current = data.nodes.map((node) => {
        // Convert percentage coordinates centered
        const tx = centerX + ((node.x - 50) / 100) * targetSize * 1.8;
        const ty = centerY + ((node.y - 50) / 100) * targetSize * 1.8;

        // Start from random off-screen points
        const startAngle = Math.random() * Math.PI * 2;
        const startDist = Math.max(w, h) * 0.8;
        const sx = centerX + Math.cos(startAngle) * startDist;
        const sy = centerY + Math.sin(startAngle) * startDist;

        return {
          x: sx,
          y: sy,
          tx,
          ty,
          vx: 0,
          vy: 0,
          size: node.size,
          currentSize: 0,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          color: node.color || data.color,
          isSpecial: !!node.isSpecial,
        };
      });

      progressRef.current = 0;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw background stars
      bgStarsRef.current.forEach(star => {
        star.brightness += star.speed;
        if (star.brightness > 1 || star.brightness < 0) {
          star.speed = -star.speed;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + Math.max(0, star.brightness) * 0.65})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update Node positions & draw stars
      const nodes = nodesRef.current;
      const ease = 0.08;

      nodes.forEach((node) => {
        if (isCrumbling) {
          // Physics-based crumbling! Disperse outwards from center
          if (node.vx === 0 && node.vy === 0) {
            const centerX = w / 2;
            const centerY = h / 2 - 20;
            const dx = node.x - centerX;
            const dy = node.y - centerY;
            const dist = Math.hypot(dx, dy) || 1;
            // Outward speed
            const speed = 2 + Math.random() * 5;
            node.vx = (dx / dist) * speed + (Math.random() - 0.5) * 2;
            node.vy = (dy / dist) * speed + (Math.random() - 0.5) * 2;
          }
          node.x += node.vx;
          node.y += node.vy;
          node.currentSize *= 0.95; // fade out size
        } else {
          // Alignment ease in
          node.x += (node.tx - node.x) * ease;
          node.y += (node.ty - node.y) * ease;
          
          if (progressRef.current > 0.3) {
            node.currentSize += (node.size - node.currentSize) * 0.1;
          }
        }

        // Pulse star size
        const currentPulse = node.currentSize * (1 + Math.sin(Date.now() * node.pulseSpeed) * 0.18);

        // Draw outer star glow
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isCrumbling ? 0 : 12;
        ctx.fillStyle = node.color;

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentPulse, 0, Math.PI * 2);
        ctx.fill();
      });

      // Reset shadows for lines
      ctx.shadowBlur = 0;

      // Draw connecting lines
      if (!isCrumbling) {
        progressRef.current = Math.min(1, progressRef.current + 0.008);
      } else {
        progressRef.current = Math.max(0, progressRef.current - 0.05);
      }

      ctx.lineWidth = 1.2;

      data.lines.forEach(line => {
        const fromNode = nodes[line.from];
        const toNode = nodes[line.to];

        if (fromNode && toNode) {
          // Only draw lines if nodes have sufficiently arrived
          const distFromTarget = Math.hypot(fromNode.x - fromNode.tx, fromNode.y - fromNode.ty);
          if (distFromTarget < 50 || isCrumbling) {
            ctx.strokeStyle = `rgba(${characterId === 'valery' ? '230,230,250' : characterId === 'talis' ? '249,115,22' : '167,139,250'}, ${isCrumbling ? progressRef.current * 0.2 : 0.32})`;
            
            // Draw part of the line depending on progress
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            
            const lx = fromNode.x + (toNode.x - fromNode.x) * progressRef.current;
            const ly = fromNode.y + (toNode.y - fromNode.y) * progressRef.current;
            
            ctx.lineTo(lx, ly);
            ctx.stroke();
          }
        }
      });

      frameId.current = window.requestAnimationFrame(draw);
    };

    frameId.current = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId.current !== null) {
        window.cancelAnimationFrame(frameId.current);
      }
    };
  }, [characterId, isCrumbling, data]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
};

/* ── Дракон-уроборос (SVG) ── */

const LoadingScreen: React.FC<LoadingScreenProps> = ({ theme, isLoading }) => {
  const location = useLocation();
  const characterId = getCharacterIdByPath(location.pathname);

  // Smooth fadeout control for crumbling stars transition
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [isCrumbling, setIsCrumbling] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
      setIsCrumbling(false);
    } else {
      setIsCrumbling(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsCrumbling(false);
      }, characterId ? 800 : 300); // 800ms fadeout for gorgeous constellation crumble!
      return () => clearTimeout(timer);
    }
  }, [isLoading, characterId]);

  const activeConstellation = characterId && CONSTELLATIONS[characterId];

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 mountaineer z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: theme.void }}
        >
          {activeConstellation ? (
            /* ── CHARACTER CONSTELLATION LOADER ── */
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <ConstellationCanvas characterId={characterId} isCrumbling={isCrumbling} />
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: isCrumbling ? 0 : 1, y: isCrumbling ? -10 : 0 }}
                transition={{ duration: 0.4 }}
                className="z-20 text-center px-6 relative mt-[55vh]"
              >
                <div
                  className="text-2xl md:text-3xl font-extrabold uppercase tracking-[6px] mb-2"
                  style={{
                    fontFamily: theme.fontFamily,
                    color: activeConstellation.color,
                    textShadow: `0 0 20px ${activeConstellation.color}60`,
                  }}
                >
                  {activeConstellation.title}
                </div>
                
                <div
                  className="text-xs uppercase tracking-[3px] opacity-80"
                  style={{
                    fontFamily: theme.fontFamily,
                    color: theme.parchmentDim,
                  }}
                >
                  {activeConstellation.subtitle}
                </div>

                <div
                  className="mt-6 text-sm italic opacity-60 flex items-center justify-center gap-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: theme.parchmentDim,
                  }}
                >
                  <span className="animate-pulse">✨ Созвездия жизни переплетаются...</span>
                </div>
              </motion.div>
            </div>
          ) : (
            /* ── STANDARD OUROBOROS DRAGON LOADER ── */
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center z-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                style={{ 
                  filter: `drop-shadow(0 0 16px ${theme.primaryGlow}99)`,
                  width: 'min(28vw, 140px)',
                  height: 'min(28vw, 140px)',
                }}
              >
                <img 
                  src="/ouroboros.png" 
                  alt="" 
                  className="w-full h-full object-contain"
                  style={{ filter: `drop-shadow(0 0 18px ${theme.primaryGlow}88)` }}
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
