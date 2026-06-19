import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SideMenu from './SideMenu';
import MusicButton from './MusicButton';
import BackButton from './BackButton';
import Preloader from './Preloader';
import Particles from './Particles';
import { getThemeByPath } from '@/types/theme';
import type { ColorTheme } from '@/types/theme';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
  theme?: ColorTheme;
  particleVariant?: 'default' | 'lightning' | 'arcane' | 'crimson' | 'mixed';
  particleCount?: number;
  showBack?: boolean;
  overlayMode?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  theme: customTheme,
  particleVariant = 'default',
  particleCount = 30,
  showBack = true,
  overlayMode = false,
}) => {
  const location = useLocation();
  const theme = customTheme || getThemeByPath(location.pathname);
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Wait long enough for the lazy-loaded page chunk to mount.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isMobile ? 500 : 600);
    return () => clearTimeout(timer);
  }, [location.pathname, isMobile]);

  useEffect(() => {
    document.documentElement.style.setProperty('--scrollbar-track', theme.void);
    document.documentElement.style.setProperty('--scrollbar-thumb', theme.primary);
    document.documentElement.style.setProperty('--scrollbar-thumb-hover', theme.primaryGlow);
  }, [theme]);

  return (
    <div className="tome-container" style={{ background: theme.void }}>
      {theme.borderStyle !== 'none' && (
        <div
          className="page-border"
          style={{ background: theme.borderStyle }}
          aria-hidden="true"
        />
      )}

      {/* SideMenu is mounted here — it uses position:fixed internally (req #1) */}
      <SideMenu theme={theme} />

      {!isMobile && <Particles theme={theme} count={particleCount} variant={particleVariant} />}
      {showBack && !overlayMode && <BackButton theme={theme} />}

      {children}

      <Preloader theme={theme} isLoading={isLoading} />
      <MusicButton theme={theme} />
    </div>
  );
};

export default Layout;
