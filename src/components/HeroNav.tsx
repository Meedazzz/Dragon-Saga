import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCharacterIdByPath, getCharacterById } from '@/data/characters';
import { routeHref } from '@/lib/routeHref';
import type { ColorTheme } from '@/types/theme';

interface HeroNavProps {
  theme: ColorTheme;
  /** Override character id detection */
  characterId?: string;
}

const HeroNav: React.FC<HeroNavProps> = ({ theme, characterId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const cid = characterId || getCharacterIdByPath(location.pathname);
  if (!cid) return null;

  const char = getCharacterById(cid);
  if (!char) return null;

  const navItems = [
    { label: '↗ Полный лор', path: char.lorePath, isLore: true },
    ...char.pages.map((page) => ({ ...page, isLore: false })),
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="flex flex-wrap justify-center gap-2 mb-8"
    >
      {navItems.map((page, idx) => {
        const isActive = location.pathname === page.path;
        return (
          <motion.a
            key={page.path}
            href={routeHref(page.path)}
            onClick={(e) => {
              if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                navigate(page.path);
              }
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
            className={`px-4 py-2 rounded text-xs tracking-[1px] transition-all duration-200 cursor-pointer block text-center ${page.isLore ? 'hero-lore-bridge-nav' : ''}`}
            style={{
              fontFamily: "'Cinzel', serif",
              background: page.isLore
                ? `linear-gradient(135deg, ${theme.accentGlow}24, ${char.color}28, rgba(20,14,20,0.58))`
                : isActive
                  ? `${char.color}22`
                  : 'rgba(20,14,20,0.42)',
              border: `1px solid ${page.isLore ? theme.borderGlow : isActive ? `${char.color}66` : theme.buttonBorder}`,
              color: page.isLore || isActive ? theme.parchment : theme.parchmentDim,
              boxShadow: isActive ? `0 0 12px ${char.color}20` : 'none',
              textDecoration: 'none',
            }}
            whileHover={{
              borderColor: `${char.color}50`,
              color: theme.parchment,
            }}
          >
            {page.label}
          </motion.a>
        );
      })}
    </motion.nav>
  );
};

export default HeroNav;
