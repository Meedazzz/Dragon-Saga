import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SideMenu from './SideMenu';
import MusicButton from './MusicButton';
import BackButton from './BackButton';
import LoadingScreen from './LoadingScreen';
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
}

const Layout: React.FC<LayoutProps> = ({
  children,
  theme: customTheme,
  particleVariant = 'default',
  particleCount = 30,
  showBack = true,
}) => {
  const location = useLocation();
  const theme = customTheme || getThemeByPath(location.pathname);
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isMobile ? 300 : 900);
    return () => clearTimeout(timer);
  }, [location.pathname, isMobile]);

  useEffect(() => {
    document.documentElement.style.setProperty('--scrollbar-track', theme.void);
    document.documentElement.style.setProperty('--scrollbar-thumb', theme.primary);
    document.documentElement.style.setProperty('--scrollbar-thumb-hover', theme.primaryGlow);
  }, [theme]);

  return (
    <div
      className="tome-container"
      style={{
        background: theme.void,
        color: theme.silver,
        fontFamily: theme.fontFamily,
        minHeight: '100vh',
      }}
    >
      {/* Page Border */}
      {theme.borderStyle !== 'none' && (
        <div
          className="fixed inset-0 pointer-events-none z-[100]"
          style={{
            border: '2px solid transparent',
            borderImage: theme.borderStyle,
            borderImageSlice: '1',
            boxShadow: `inset 0 0 60px rgba(0,0,0,${theme.isDark ? '0.6' : '0.2'})`,
          }}
        />
      )}

      {!isMobile && <Particles theme={theme} count={particleCount} variant={particleVariant} />}
      <SideMenu theme={theme} />
      <MusicButton theme={theme} />
      {showBack && <BackButton theme={theme} />}
      <LoadingScreen theme={theme} isLoading={isLoading} />

      <div className="relative z-[1]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
