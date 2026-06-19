import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { ColorTheme } from '@/types/theme';
import { useIsMobile } from '@/hooks/use-mobile';

interface BackButtonProps {
  theme: ColorTheme;
}

const BackButton: React.FC<BackButtonProps> = ({ theme }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <motion.button
      onClick={() => navigate(-1)}
      whileTap={{ scale: 0.96 }}
      className="back-btn tarot-no-glow"
      aria-label="Назад"
      style={{
        background: theme.buttonBg,
        border: `1px solid ${theme.buttonBorder}`,
        color: theme.buttonText,
        backdropFilter: 'blur(10px)',
        fontFamily: theme.fontFamily,
        letterSpacing: '2px',
        textTransform: 'uppercase',
      }}
    >
      Назад
    </motion.button>
  );
};

export default BackButton;
