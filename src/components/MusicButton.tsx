import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';
import type { ColorTheme } from '@/types/theme';
import { SmartTooltip } from './SmartTooltip';

interface MusicButtonProps {
  theme: ColorTheme;
}

const promos = [
  { text: 'Загляните на наш канал!', href: 'https://www.youtube.com/@Sigmarillion', label: 'YouTube' },
  { text: 'Мы регулярно выкладываем новые видео на YouTube', href: 'https://www.youtube.com/@Sigmarillion', label: 'Смотреть' },
  { text: 'Присоединяйтесь к нам в VK', href: 'https://vk.com/sigmarillion', label: 'VK' },
  { text: 'Новости и закулисье в Telegram', href: 'https://t.me/SigmarillionDnD', label: 'Telegram' },
  { text: 'Обсуждаем сессии в Discord', href: 'https://discord.gg/vyhKQTKhsw', label: 'Discord' },
];

const MusicButton: React.FC<MusicButtonProps> = ({ theme }) => {
  const { isPlaying, toggleMusic } = useMusic();
  const [promoIdx, setPromoIdx] = useState(0);
  const [showPromo, setShowPromo] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const hideTimer = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // first promo after 8s
    const first = window.setTimeout(() => {
      if (!dismissed) setShowPromo(true);
    }, 8000);
    return () => clearTimeout(first);
  }, [dismissed]);

  useEffect(() => {
    if (!showPromo && !dismissed) {
      intervalRef.current = window.setInterval(() => {
        setPromoIdx((i) => (i + 1) % promos.length);
        setShowPromo(true);
      }, 35000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showPromo, dismissed]);

  useEffect(() => {
    if (showPromo) {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setShowPromo(false), 7000);
    }
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [showPromo]);

  const promo = promos[promoIdx];

  const closePromo = () => {
    setShowPromo(false);
    setDismissed(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <>
      {/* Promo nudge, bottom-right, emanating from speaker */}
      <AnimatePresence>
        {showPromo && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.94, x: 8 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed z-[595] glow-promo"
            style={{
              right: 'max(16px, env(safe-area-inset-right, 16px))',
              bottom: 'max(76px, calc(64px + env(safe-area-inset-bottom, 0px)))',
              maxWidth: 'min(320px, calc(100vw - 32px))',
            }}
          >
            <div
              className="relative rounded-[14px] px-4 py-3 pr-9 text-[13px] leading-snug"
              style={{
                background: 'rgba(18, 10, 14, 0.96)',
                border: `1px solid ${theme.primaryGlow}88`,
                color: theme.parchment,
                backdropFilter: 'blur(14px)',
                fontFamily: "'Manrope', 'Cormorant Garamond', serif",
                boxShadow: `0 12px 40px rgba(0,0,0,0.55), 0 0 22px ${theme.primaryGlow}2a, 0 0 28px ${theme.accentGlow}18`,
              }}
            >
              <div style={{ color: theme.silverBright, fontWeight: 600 }}>{promo.text}</div>
              <a
                href={promo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1.5 text-xs tracking-wide no-glow"
                style={{ color: theme.accentGlow, textDecoration: 'none', fontFamily: "'Cinzel', serif" }}
              >
                {promo.label} →
              </a>
              <button
                onClick={closePromo}
                aria-label="Закрыть"
                className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full no-glow"
                style={{ color: theme.parchmentDim }}
              >
                <X size={13} />
              </button>
              {/* speech tail */}
              <div
                style={{
                  position: 'absolute',
                  right: '18px',
                  bottom: '-7px',
                  width: '14px',
                  height: '14px',
                  background: 'rgba(18, 10, 14, 0.96)',
                  borderRight: `1px solid ${theme.primaryGlow}88`,
                  borderBottom: `1px solid ${theme.primaryGlow}88`,
                  transform: 'rotate(45deg)',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SmartTooltip content={isPlaying ? 'Выключить музыку' : 'Включить музыку'} side="left" align="center">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={toggleMusic}
          className="fixed z-[600] w-[52px] h-[52px] sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
          style={{
            right: 'max(14px, env(safe-area-inset-right, 14px))',
            bottom: 'max(14px, env(safe-area-inset-bottom, 14px))',
            background: theme.buttonBg,
            border: `1px solid ${theme.buttonBorder}`,
            color: isPlaying ? theme.buttonText : theme.parchmentDim,
            backdropFilter: 'blur(12px)',
            boxShadow: isPlaying 
              ? `0 0 18px ${theme.primaryGlow}55, 0 0 34px ${theme.accentGlow}22, 0 6px 20px rgba(0,0,0,0.45)` 
              : '0 6px 18px rgba(0,0,0,0.38)',
          }}
          aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
        >
          {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
          {isPlaying && (
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: `inset 0 0 16px ${theme.primaryGlow}22`,
                animation: 'promoGlow 2.6s ease-in-out infinite',
              }}
            />
          )}
        </motion.button>
      </SmartTooltip>
    </>
  );
};

export default MusicButton;
