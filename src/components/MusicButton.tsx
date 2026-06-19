import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Youtube, Send, MessageCircle, Users } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';
import type { ColorTheme } from '@/types/theme';

interface MusicButtonProps {
  theme: ColorTheme;
}

const HINTS = [
  "Мы постоянно выкладываем новые видео — загляните на наш YouTube!",
  "Присоединяйтесь к нашему Telegram-каналу, там много интересного!",
  "Следите за новостями в нашей группе VK!",
  "Заходите пообщаться на наш Discord-сервер!",
];

const MusicButton: React.FC<MusicButtonProps> = ({ theme }) => {
  const { isPlaying, toggleMusic } = useMusic();
  const [showSocials, setShowSocials] = useState(false);
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const hintTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Periodic Hints logic (every 18 seconds, show a hint for 5.5 seconds)
  useEffect(() => {
    let hintIdx = 0;
    const interval = setInterval(() => {
      setCurrentHint(HINTS[hintIdx]);
      hintIdx = (hintIdx + 1) % HINTS.length;

      if (hintTimeout.current) clearTimeout(hintTimeout.current);
      hintTimeout.current = setTimeout(() => {
        setCurrentHint(null);
      }, 5500);
    }, 18000);

    return () => {
      clearInterval(interval);
      if (hintTimeout.current) clearTimeout(hintTimeout.current);
    };
  }, []);

  const socialLinks = [
    { label: 'YouTube', href: 'https://www.youtube.com/@Sigmarillion', icon: Youtube, color: '#ff0000' },
    { label: 'VK', href: 'https://vk.com/sigmarillion', icon: Users, color: '#4c75a3' },
    { label: 'Telegram', href: 'https://t.me/SigmarillionDnD', icon: Send, color: '#0088cc' },
    { label: 'Discord', href: 'https://discord.gg/vyhKQTKhsw', icon: MessageCircle, color: '#7289da' },
  ];

  return (
    <div 
      className="fixed bottom-5 right-5 z-[600] flex items-center"
      onMouseEnter={() => setShowSocials(true)}
      onMouseLeave={() => setShowSocials(false)}
    >
      {/* Dynamic Floating Hint Bubble */}
      <AnimatePresence>
        {currentHint && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.35 }}
            className="absolute bottom-16 right-0 w-64 p-3 rounded-lg border text-xs text-left leading-relaxed shadow-xl backdrop-blur-md"
            style={{
              background: 'rgba(15, 12, 10, 0.95)',
              borderColor: `${theme.primaryGlow}90`,
              color: '#f5edd7',
              fontFamily: "'Cormorant Garamond', serif",
              boxShadow: `0 8px 25px rgba(0,0,0,0.85), 0 0 10px ${theme.primaryGlow}30`,
            }}
          >
            <div className="font-bold mb-1 tracking-wide uppercase text-[10px]" style={{ color: theme.primaryBright, fontFamily: "'Cinzel', serif" }}>
              💡 Вестник Дракона:
            </div>
            {currentHint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Media icons emerging to the left */}
      <AnimatePresence>
        {showSocials && (
          <motion.div 
            initial={{ opacity: 0, x: 25, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
            className="flex items-center gap-2 pr-3 mr-1"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2, boxShadow: `0 0 12px ${link.color}80` }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 custom-tooltip"
                style={{
                  background: 'rgba(20, 15, 10, 0.92)',
                  borderColor: `${theme.buttonBorder}`,
                  color: theme.menuText,
                  boxShadow: `0 0 8px ${theme.primaryGlow}20`,
                }}
                data-tooltip={link.label}
              >
                <link.icon size={15} />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speaker (music) icon button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 custom-tooltip"
        style={{
          background: theme.buttonBg,
          border: `1.5px solid ${theme.buttonBorder}`,
          color: isPlaying ? theme.buttonText : theme.parchmentDim,
          backdropFilter: 'blur(10px)',
          boxShadow: isPlaying ? `0 0 18px ${theme.primaryGlow}50` : 'none',
        }}
        data-tooltip={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>
    </div>
  );
};

export default MusicButton;
