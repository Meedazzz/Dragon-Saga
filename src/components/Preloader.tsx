import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ColorTheme } from '@/types/theme';

interface PreloaderProps {
  theme: ColorTheme;
  isLoading: boolean;
}

/**
 * Preloader with Ouroboros icon (req #8).
 *
 * - Full-screen dark overlay (#0b0b0f)
 * - Centered ouroboros.png spinning with CSS @keyframes
 * - Snake body takes on the page's accent color via CSS mask
 * - Smooth fade-out when isLoading becomes false
 * - Adapts color automatically to the current theme.primaryGlow
 */
const Preloader: React.FC<PreloaderProps> = ({ theme, isLoading }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply theme accent colors AND mask URL as CSS variables so the
    // preloader can pick them up via mask-image + background-color
    // (req #8). The mask URL uses BASE_URL so it works both locally
    // and when deployed under a sub-path (e.g. /Dragon-Saga/).
    const baseUrl = import.meta.env.BASE_URL || '/';
    if (rootRef.current) {
      rootRef.current.style.setProperty('--preloader-color', theme.primaryGlow);
      rootRef.current.style.setProperty('--preloader-color-bright', theme.primaryBright);
      rootRef.current.style.setProperty('--preloader-color-accent', theme.accentGlow);
      rootRef.current.style.setProperty('--preloader-mask-url', `url('${baseUrl}ouroboros.png')`);
    }
  }, [theme]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={rootRef}
          className="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          aria-hidden="true"
          data-theme={theme.name}
        >
          <div className="preloader-inner">
            <div className="preloader-glow-ring" />
            <div className="preloader-icon" />
            <div className="preloader-label">Загрузка</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
