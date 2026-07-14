import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SideMenu from './SideMenu';
import MusicButton from './MusicButton';
import BackButton from './BackButton';
import LoadingScreen from './LoadingScreen';
import Particles from './Particles';
import MythicVeil from './MythicVeil';
import AdminTextEditor from './AdminTextEditor';
import { getThemeByPath } from '@/types/theme';
import type { ColorTheme } from '@/types/theme';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Layout — общий каркас каждой страницы.
 *
 * Здесь подключаются: боковое меню, музыка, кнопка назад, загрузчик,
 * фоновые частицы и новый MythicVeil с рунами/пеплом/сиянием.
 * Если нужно изменить общую атмосферу всего сайта — начинай отсюда и из `src/index.css`.
 */
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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isMobile ? 100 : 300);
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

      <Particles theme={theme} count={isMobile ? Math.min(12, particleCount) : particleCount} variant={particleVariant} />
      <MythicVeil />
      <SideMenu theme={theme} />
      <MusicButton theme={theme} />
      {showBack && !overlayMode && <BackButton theme={theme} />}
      <LoadingScreen theme={theme} isLoading={isLoading} />
      <AdminTextEditor />

      <div className="relative z-[1]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
