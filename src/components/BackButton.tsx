import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ColorTheme } from '@/types/theme';

interface BackButtonProps {
  theme: ColorTheme;
}

const BackButton: React.FC<BackButtonProps> = ({ theme }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      whileHover={{ scale: 1.05, x: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(-1)}
      className="fixed top-5 right-20 z-[600] h-10 px-4 rounded-full flex items-center gap-2 cursor-pointer transition-all duration-300"
      style={{
        background: theme.buttonBg,
        border: `1px solid ${theme.buttonBorder}`,
        color: theme.buttonText,
        backdropFilter: 'blur(10px)',
        fontFamily: theme.fontFamily,
        fontSize: '0.75rem',
        letterSpacing: '2px',
        textTransform: 'uppercase' as const,
      }}
    >
      <ArrowLeft size={16} />
      <span className="hidden sm:inline">Назад</span>
    </motion.button>
  );
};

export default BackButton;
