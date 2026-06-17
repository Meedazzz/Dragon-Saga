import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword } from 'lucide-react';
import type { ColorTheme } from '@/types/theme';

interface LoadingScreenProps {
  theme: ColorTheme;
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ theme, isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 25 + 15;
        });
      }, 60);
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
            className="flex flex-col items-center gap-8"
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
