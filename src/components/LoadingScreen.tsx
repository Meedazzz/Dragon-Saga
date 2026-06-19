import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
<<<<<<< HEAD
import { Sword } from 'lucide-react';
=======
>>>>>>> 6b6b02308a0ac0c53a2bc9f64d2b3f629092826f
import type { ColorTheme } from '@/types/theme';

interface LoadingScreenProps {
  theme: ColorTheme;
  isLoading: boolean;
}

<<<<<<< HEAD
const LoadingScreen: React.FC<LoadingScreenProps> = ({ theme, isLoading }) => {
  const [progress, setProgress] = useState(0);
=======
/* ── Дракон-уроборос (SVG) ── */
const OuroborosDragon: React.FC<{ color: string; glowColor: string }> = ({ color, glowColor }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="100"
    height="100"
    fill="none"
  >
    <defs>
      <filter id="ouroboros-glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g filter="url(#ouroboros-glow)">
      {/* Основное кольцо-тело */}
      <path
        d="
          M 100 30
          C 140 30, 170 60, 170 100
          C 170 140, 140 170, 100 170
          C 60 170, 30 140, 30 100
          C 30 60, 60 30, 100 30
        "
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Чешуйки по телу */}
      <path d="M 130 38 C 135 42, 138 35, 133 33" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />
      <path d="M 155 60 C 160 65, 162 57, 157 55" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />
      <path d="M 168 90 C 173 95, 175 87, 170 85" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />
      <path d="M 165 120 C 170 125, 172 117, 167 115" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />
      <path d="M 150 148 C 155 152, 157 144, 152 142" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />
      <path d="M 125 165 C 130 168, 132 160, 127 159" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />
      <path d="M 75 168 C 70 171, 68 163, 73 162" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />
      <path d="M 50 152 C 45 155, 43 147, 48 146" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />
      <path d="M 35 125 C 30 128, 28 120, 33 119" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />
      <path d="M 32 95 C 27 98, 25 90, 30 89" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />
      <path d="M 40 65 C 35 68, 33 60, 38 59" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />
      <path d="M 60 42 C 55 45, 53 37, 58 36" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />

      {/* Голова дракона (сверху, кусает хвост) */}
      <path
        d="
          M 100 30
          L 92 18
          L 88 26
          L 82 20
          L 84 30
          C 88 28, 96 28, 100 30
        "
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Рожки */}
      <path d="M 90 22 L 85 10 L 92 18" fill={color} stroke={color} strokeWidth="1" opacity="0.9" />
      <path d="M 96 20 L 98 8 L 100 18" fill={color} stroke={color} strokeWidth="1" opacity="0.9" />

      {/* Глаз */}
      <circle cx="92" cy="25" r="2" fill={glowColor} opacity="0.95" />

      {/* Пасть, кусающая хвост */}
      <path
        d="M 100 30 C 104 28, 108 28, 110 30"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
      <path d="M 102 28 L 104 24 L 106 28" fill={color} stroke={color} strokeWidth="1" opacity="0.6" />

      {/* Крылья (декоративные, по бокам) */}
      <path
        d="M 165 85 C 180 70, 190 80, 185 95 C 182 88, 175 82, 165 85Z"
        fill={color}
        opacity="0.35"
        stroke={color}
        strokeWidth="1"
      />
      <path
        d="M 35 85 C 20 70, 10 80, 15 95 C 18 88, 25 82, 35 85Z"
        fill={color}
        opacity="0.35"
        stroke={color}
        strokeWidth="1"
      />

      {/* Шипы на хвосте (внутренняя часть кольца) */}
      <path d="M 110 35 L 114 40 L 108 38" fill={color} opacity="0.4" />
      <path d="M 145 55 L 150 58 L 144 59" fill={color} opacity="0.4" />
      <path d="M 160 100 L 163 105 L 158 103" fill={color} opacity="0.4" />
      <path d="M 145 145 L 148 150 L 142 148" fill={color} opacity="0.4" />
      <path d="M 100 165 L 103 170 L 97 168" fill={color} opacity="0.4" />
      <path d="M 55 148 L 52 153 L 50 147" fill={color} opacity="0.4" />
      <path d="M 38 105 L 34 110 L 36 104" fill={color} opacity="0.4" />
      <path d="M 50 58 L 46 62 L 48 55" fill={color} opacity="0.4" />
    </g>
  </svg>
);

const LoadingScreen: React.FC<LoadingScreenProps> = ({ theme, isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
>>>>>>> 6b6b02308a0ac0c53a2bc9f64d2b3f629092826f

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
<<<<<<< HEAD
      }, 150);
=======
      }, 60);
>>>>>>> 6b6b02308a0ac0c53a2bc9f64d2b3f629092826f
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: theme.void }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-8 z-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sword
                size={48}
                style={{ color: theme.primaryGlow }}
                className="drop-shadow-lg"
              />
            </motion.div>

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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
