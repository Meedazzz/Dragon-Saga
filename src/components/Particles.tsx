import React, { useMemo, useRef } from 'react';
import type { ColorTheme } from '@/types/theme';

interface ParticlesProps {
  theme: ColorTheme;
  count?: number;
  variant?: 'default' | 'lightning' | 'arcane' | 'crimson' | 'mixed';
}

const Particles: React.FC<ParticlesProps> = ({ theme, count = 30, variant = 'default' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(() => {
    const items: { left: string; delay: string; duration: string; color: string; size: number; animType: string }[] = [];

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
      items.push({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${8 + Math.random() * 8}s`,
        color: theme.particleColors[colorIndex],
        size: variant === 'mixed' ? 2 + Math.random() * 2 : 1 + Math.random() * 2,
        animType: getAnimType(i),
      });
    }
    return items;
  }, [theme, count, variant]);

  return (
    <div ref={containerRef} className="particles" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className={`particle ${p.animType}`}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            background: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(Particles);
