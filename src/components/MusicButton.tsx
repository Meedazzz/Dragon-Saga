import React, { useEffect, useState, useRef } from 'react';
import { useMusic } from '@/contexts/MusicContext';
import type { ColorTheme } from '@/types/theme';

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
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const first = setTimeout(() => {
      if (!dismissed) setShowPromo(true);
    }, 8000);
    return () => clearTimeout(first);
  }, [dismissed]);

  useEffect(() => {
    if (!showPromo && !dismissed) {
      intervalRef.current = setInterval(() => {
        setPromoIdx(i => (i + 1) % promos.length);
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
      hideTimer.current = setTimeout(() => setShowPromo(false), 7000);
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
      {showPromo && !dismissed && (
        <div
          className="music-promo glow-promo"
          style={{
            background: theme.menuBg,
            border: `1px solid ${theme.buttonBorder}`,
            color: theme.menuText,
          }}
        >
          <p className="music-promo-text">{promo.text}</p>
          <a
            href={promo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="music-promo-link tarot-no-glow"
            style={{ color: theme.menuAccent }}
          >
            {promo.label}
          </a>
          <button
            onClick={closePromo}
            className="music-promo-close tarot-no-glow"
            aria-label="Закрыть"
          >
            Закрыть
          </button>
        </div>
      )}

      <button
        onClick={toggleMusic}
        className="music-btn tarot-no-glow"
        aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
        style={{
          background: theme.buttonBg,
          border: `1px solid ${theme.buttonBorder}`,
          color: theme.buttonText,
          backdropFilter: 'blur(10px)',
        }}
      >
        {isPlaying ? 'Музыка: вкл' : 'Музыка: выкл'}
        {isPlaying && <span className="music-btn-dot" />}
      </button>
    </>
  );
};

export default MusicButton;
