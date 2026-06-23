import React, { useMemo, useRef } from 'react';
import type { ColorTheme } from '@/types/theme';

interface ParticlesProps {
  theme: ColorTheme;
  count?: number;
  variant?: 'default' | 'lightning' | 'arcane' | 'crimson' | 'mixed';
}

interface ParticleItem {
  left: string;
  top: string;
  delay: string;
  duration: string;
  color: string;
  size: number;
  animType: string;
  drift: string;
  blur: string;
}

const Particles: React.FC<ParticlesProps> = ({ theme, count = 30, variant = 'default' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const particles = useMemo<ParticleItem[]>(() => {
    const items: ParticleItem[] = [];

    const getAnimType = (i: number): string => {
      if (variant === 'mixed') {
        if (i % 5 === 0) return 'ember-fall';
        if (i % 2 === 0) return 'snow-fall';
        return 'ash-fall';
      }
      if (variant === 'crimson' || variant === 'lightning') return i % 4 === 0 ? 'ember-fall' : 'ash-fall';
      if (variant === 'arcane') return i % 3 === 0 ? 'snow-fall' : 'ash-fall';
      return i % 3 === 0 ? 'snow-fall' : 'ash-fall';
    };

    for (let i = 0; i < count; i += 1) {
      const colorIndex = i % theme.particleColors.length;
      const isSnow = i % 3 === 0;
      items.push({
        left: `${Math.random() * 100}%`,
        top: `${-120 + Math.random() * 80}px`,
        delay: `${Math.random() * 12}s`,
        duration: `${9 + Math.random() * 12}s`,
        color: isSnow ? 'rgba(221,214,200,0.72)' : theme.particleColors[colorIndex],
        size: isSnow ? 1.3 + Math.random() * 2.4 : 1 + Math.random() * 2.2,
        animType: getAnimType(i),
        drift: `${(Math.random() * 2 - 1) * 110}px`,
        blur: isSnow ? '0.2px' : `${Math.random() * 0.8}px`,
      });
    }
    return items;
  }, [theme, count, variant]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full ash-particle"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 7}px ${p.color}`,
            filter: `blur(${p.blur})`,
            animation: `${p.animType} ${p.duration} infinite linear`,
            animationDelay: p.delay,
            opacity: 0,
            '--ash-drift': p.drift,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default React.memo(Particles);
