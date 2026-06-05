import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, BookOpen, Globe, Scroll, Swords } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ColorTheme } from '@/types/theme';

interface SideMenuProps {
  theme: ColorTheme;
}

const menuItems = [
  { path: '/', label: 'Главная', icon: Home },
  { path: '/lor', label: 'Мир Игры', icon: Globe },
  { path: '/valery', label: 'Валерий Даркбейн', icon: User },
  { path: '/sakris', label: 'Сакрис из Бергхейма', icon: Swords },
  { path: '/brin', label: 'Брин Дель Хасен', icon: User },
  { path: '/darkbain', label: 'Род Даркбейнов', icon: BookOpen },
  { path: '/letopis', label: 'Летопись мира', icon: Scroll },
];

const SideMenu: React.FC<SideMenuProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    setTimeout(() => navigate(path), 200);
  };

  return (
    <>
      {/* Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 z-[600] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
        style={{
          background: theme.menuBg,
          border: `1px solid ${theme.buttonBorder}`,
          color: theme.menuAccent,
          backdropFilter: 'blur(10px)',
        }}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[500]"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-72 z-[550] flex flex-col"
            style={{
              background: theme.menuBg,
              borderRight: `1px solid ${theme.buttonBorder}`,
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div className="pt-20 pb-6 px-6 text-center">
              <div
                className="text-2xl font-bold tracking-[6px] uppercase"
                style={{
                  fontFamily: theme.fontFamily,
                  color: theme.menuAccent,
                  textShadow: `0 0 15px ${theme.menuAccent}40`,
                }}
              >
                D&D
              </div>
              <div
                className="text-xs mt-2 tracking-[4px] uppercase"
                style={{ color: theme.parchmentDim }}
              >
                Chronicles
              </div>
              <div
                className="mt-4 h-px w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${theme.menuAccent}, transparent)`,
                }}
              />
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-4 overflow-y-auto">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavigate(item.path)}
                    className="w-full flex items-center gap-4 px-4 py-3 mb-2 rounded-lg text-left transition-all duration-300 cursor-pointer"
                    style={{
                      background: isActive ? `${theme.menuAccent}20` : 'transparent',
                      border: `1px solid ${isActive ? theme.menuAccent : 'transparent'}`,
                      color: isActive ? theme.menuAccent : theme.menuText,
                    }}
                    whileHover={{
                      x: 4,
                      background: `${theme.menuAccent}15`,
                    }}
                  >
                    <Icon size={18} />
                    <span
                      className="text-sm tracking-[1px]"
                      style={{ fontFamily: theme.fontFamily }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 text-center">
              <div
                className="h-px w-full mb-4"
                style={{
                  background: `linear-gradient(90deg, transparent, ${theme.menuAccent}40, transparent)`,
                }}
              />
              <div
                className="text-xs tracking-[6px] uppercase"
                style={{ color: theme.parchmentDim, opacity: 0.5 }}
              >
                Letopise
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideMenu;
