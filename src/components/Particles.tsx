import React, { useMemo, useRef } from 'react';
import type { ColorTheme } from '@/types/theme';

const seededRandom = (seed: number) => {
  const value = Math.sin(seed * 9301.13) * 10000;
  return value - Math.floor(value);
};

interface ParticlesProps {
  theme: ColorTheme;
  count?: number;
  variant?: 'default' | 'lightning' | 'arcane' | 'crimson' | 'mixed';
}

const Particles: React.FC<ParticlesProps> = ({ theme, count = 30, variant = 'default' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(() => {
    const items: { left: string; delay: string; duration: string; color: string; size: number; animType: string; driftX: string }[] = [];

    const getAnimType = (i: number): string => {
      if (variant === 'mixed') {
        if (i % 4 === 0) return 'lightning-drift';
        if (i % 4 === 1) return 'arcane-drift';
        if (i % 4 === 2) return 'crimson-drift';
        return 'drift';
      }
      if (variant === 'lightning') return i % 3 === 0 ? 'lightning-drift' : 'drift';
      if (variant === 'arcane') return i % 3 === 0 ? 'arcane-drift' : 'drift';
      if (variant === 'crimson') return i % 3 === 0 ? 'crimson-drift' : 'drift';
      return 'drift';
    };

    for (let i = 0; i < count; i++) {
      const colorIndex = i % theme.particleColors.length;
      const variantSeed = variant.length * 17 + count * 3;
      const r = (salt: number) => seededRandom((i + 1) * (salt + variantSeed));
      items.push({
        left: `${r(11) * 100}%`,
        delay: `${r(23) * 15}s`,
        duration: `${10 + r(37) * 12}s`,
        color: theme.particleColors[colorIndex],
        size: variant === 'mixed' ? 1.4 + r(41) * 2.4 : 1 + r(43) * 2.2,
        animType: getAnimType(i),
        driftX: `${(r(53) - 0.5) * 96}px`,
      });
    }
    return items;
  }, [theme, count, variant]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: '-10vh',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px ${p.color}80`,
            animation: `${p.animType} ${p.duration} infinite ease-in-out`,
            animationDelay: p.delay,
            opacity: 0,
            '--ash-drift': p.driftX,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default React.memo(Particles);
