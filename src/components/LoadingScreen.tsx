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
  x: number;
  y: number;
  size: number;
  color?: string;
  isSpecial?: boolean;
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
      { x: 50, y: 15, size: 4.5 },
      { x: 50, y: 24, size: 3 },
      { x: 34, y: 28, size: 4 },
      { x: 50, y: 28, size: 3.5 },
      { x: 66, y: 28, size: 4 },
      { x: 50, y: 44, size: 3.5 },
      { x: 50, y: 62, size: 3.5 },
      { x: 50, y: 78, size: 5 },
      { x: 28, y: 78, size: 3 },
      { x: 72, y: 78, size: 3 },
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
      { from: 10, to: 11 },
      { from: 12, to: 13 },
    ]
  },
  brin: {
    title: "Брин дель Хессен",
    subtitle: "Созвездие Чародея: Венец Тёмного Льда и Первые Истоки",
    color: "#a78bfa",
    nodes: [
      { x: 50, y: 18, size: 5 },
      { x: 32, y: 48, size: 4 },
      { x: 68, y: 48, size: 4 },
      { x: 50, y: 78, size: 5 },
      { x: 50, y: 48, size: 3.5 },
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
      { x: 22, y: 38, size: 4 },
      { x: 28, y: 24, size: 3 },
      { x: 50, y: 15, size: 5 },
      { x: 72, y: 24, size: 3 },
      { x: 78, y: 38, size: 4 },
      { x: 50, y: 78, size: 4.5 },
      { x: 50, y: 48, size: 3.5 },
      { x: 50, y: 22, size: 5.5 },
      { x: 32, y: 58, size: 2.5 },
      { x: 68, y: 58, size: 2.5 },
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 0, to: 4 },
      { from: 5, to: 6 },
      { from: 6, to: 7 },
      { from: 6, to: 8 },
      { from: 6, to: 9 },
    ]
  },
  tallis: {
    title: "Таллис Ламберт",
    subtitle: "Созвездие Барда: Лютня Кровавых Песен и Забытые Баллады",
    color: "#f97316",
    nodes: [
      { x: 50, y: 78, size: 5 },
      { x: 32, y: 62, size: 3.5 },
      { x: 68, y: 62, size: 3.5 },
      { x: 50, y: 48, size: 4 },
      { x: 50, y: 32, size: 3 },
      { x: 50, y: 16, size: 3.5 },
      { x: 18, y: 22, size: 3.5 },
      { x: 82, y: 82, size: 3.5 },
      { x: 82, y: 22, size: 3.5 },
      { x: 18, y: 82, size: 3.5 },
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 6, to: 7 },
      { from: 8, to: 9 },
    ]
  },
  stive: {
    title: "Стив",
    subtitle: "Созвездие Друида: Лист Древнего Дуба и Пробуждение Природы",
    color: "#34d399",
    nodes: [
      { x: 50, y: 12, size: 5 },
      { x: 28, y: 38, size: 3.5 },
      { x: 72, y: 38, size: 3.5 },
      { x: 30, y: 62, size: 4 },
      { x: 70, y: 62, size: 4 },
      { x: 50, y: 78, size: 4.5 },
      { x: 50, y: 32, size: 2.5 },
      { x: 50, y: 52, size: 3 },
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 5 },
      { from: 4, to: 5 },
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

const ConstellationCanvas: React.FC<{ characterId: string; isCrumbling: boolean }> = ({ characterId, isCrumbling }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const data = CONSTELLATIONS[characterId] || CONSTELLATIONS.valery;
  const nodesRef = useRef<Array<{ x: number; y: number; tx: number; ty: number; vx: number; vy: number; size: number; currentSize: number; pulseSpeed: number; color: string; isSpecial: boolean }>>([]);
  const bgStarsRef = useRef<Array<{ x: number; y: number; brightness: number; speed: number; size: number }>>([]);
  const frameId = useRef<number | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initializeData();
    };

    const initializeData = () => {
      const w = canvas.width;
      const h = canvas.height;

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

      const targetSize = Math.min(w, h) * 0.45;
      const centerX = w / 2;
      const centerY = h / 2 - 20;

      nodesRef.current = data.nodes.map((node) => {
        const tx = centerX + ((node.x - 50) / 100) * targetSize * 1.8;
        const ty = centerY + ((node.y - 50) / 100) * targetSize * 1.8;

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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

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

      const nodes = nodesRef.current;
      const ease = 0.08;

      nodes.forEach((node) => {
        if (isCrumbling) {
          if (node.vx === 0 && node.vy === 0) {
            const centerX = w / 2;
            const centerY = h / 2 - 20;
            const dx = node.x - centerX;
            const dy = node.y - centerY;
            const dist = Math.hypot(dx, dy) || 1;
            const speed = 2 + Math.random() * 5;
            node.vx = (dx / dist) * speed + (Math.random() - 0.5) * 2;
            node.vy = (dy / dist) * speed + (Math.random() - 0.5) * 2;
          }
          node.x += node.vx;
          node.y += node.vy;
          node.currentSize *= 0.95;
        } else {
          node.x += (node.tx - node.x) * ease;
          node.y += (node.ty - node.y) * ease;

          if (progressRef.current > 0.3) {
            node.currentSize += (node.size - node.currentSize) * 0.1;
          }
        }

        const currentPulse = node.currentSize * (1 + Math.sin(Date.now() * node.pulseSpeed) * 0.18);

        ctx.shadowColor = node.color;
        ctx.shadowBlur = isCrumbling ? 0 : 12;
        ctx.fillStyle = node.color;

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentPulse, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;

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
          const distFromTarget = Math.hypot(fromNode.x - fromNode.tx, fromNode.y - fromNode.ty);
          if (distFromTarget < 50 || isCrumbling) {
            ctx.strokeStyle = `rgba(${characterId === 'valery' ? '230,230,250' : characterId === 'tallis' ? '249,115,22' : '167,139,250'}, ${isCrumbling ? progressRef.current * 0.2 : 0.32})`;

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

const LoadingScreen: React.FC<LoadingScreenProps> = ({ theme, isLoading }) => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const BASE = import.meta.env.BASE_URL;
  const characterId = getCharacterIdByPath(location.pathname);

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
      }, characterId ? 800 : 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, characterId]);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 25 + 15;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const activeConstellation = characterId && CONSTELLATIONS[characterId];

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: theme.void, pointerEvents: isLoading ? 'auto' : 'none' }}
        >
          {activeConstellation ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <ConstellationCanvas characterId={characterId} isCrumbling={isCrumbling} />
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.92 }}
                animate={{ opacity: isCrumbling ? 0 : 1, y: isCrumbling ? -10 : 0, scale: isCrumbling ? 0.96 : 1 }}
                transition={{ duration: 0.4 }}
                className="z-20 text-center px-6 relative flex flex-col items-center justify-center"
                style={{ minHeight: 'auto' }}
              >
                <motion.img
                  src={`${BASE}ouroboros.png`}
                  alt="Уроборос"
                  className="loading-center-sigil"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  style={{ filter: `drop-shadow(0 0 18px ${activeConstellation.color}80)` }}
                  draggable={false}
                />
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
                  <span className="animate-pulse">Созвездие складывается из пепла...</span>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-8 z-20"
            >
              <motion.img
                src={`${BASE}ouroboros.png`}
                alt="Уроборос"
                className="loading-center-sigil"
                animate={{ rotate: 360 }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
                style={{ filter: `drop-shadow(0 0 18px ${theme.primaryGlow}80)` }}
                draggable={false}
              />

              <div
                className="text-2xl tracking-[8px] uppercase font-bold"
                style={{
                  fontFamily: theme.fontFamily,
                  color: theme.parchment,
                  textShadow: `0 0 20px ${theme.primaryGlow}40`,
                }}
              >
                Загрузка
              </div>

              <div
                className="w-64 h-1 rounded-full overflow-hidden"
                style={{ background: `${theme.primary}40` }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${theme.primary}, ${theme.primaryGlow})`,
                    boxShadow: `0 0 10px ${theme.primaryGlow}60`,
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div
                className="text-sm tracking-[4px] uppercase"
                style={{
                  fontFamily: theme.fontFamily,
                  color: theme.parchmentDim,
                }}
              >
                {Math.min(Math.round(progress), 100)}%
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
