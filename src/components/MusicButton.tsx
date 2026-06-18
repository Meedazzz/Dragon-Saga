import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';
import type { ColorTheme } from '@/types/theme';

interface MusicButtonProps {
  theme: ColorTheme;
}

const MusicButton: React.FC<MusicButtonProps> = ({ theme }) => {
  const { isPlaying, toggleMusic } = useMusic();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMusic}
      className="fixed bottom-5 right-5 z-[600] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 custom-tooltip"
      style={{
        background: theme.buttonBg,
        border: `1px solid ${theme.buttonBorder}`,
        color: isPlaying ? theme.buttonText : theme.parchmentDim,
        backdropFilter: 'blur(10px)',
        boxShadow: isPlaying ? `0 0 15px ${theme.primaryGlow}40` : 'none',
      }}
      data-tooltip={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
      title={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </motion.button>
  );
};

export default MusicButton;
