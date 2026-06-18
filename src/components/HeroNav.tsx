import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCharacterIdByPath, getCharacterById } from '@/data/characters';
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

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="flex flex-wrap justify-center gap-2 mb-8"
    >
      {char.pages.map((page, idx) => {
        const isActive = location.pathname === page.path;
        return (
          <motion.button
            key={page.path}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
            onClick={() => navigate(page.path)}
            className="px-4 py-2 rounded text-xs tracking-[1px] transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: "'Cinzel', serif",
              background: isActive
                ? `${char.color}25`
                : 'rgba(20,15,10,0.3)',
              border: `1px solid ${isActive ? `${char.color}60` : 'rgba(80,70,50,0.2)'}`,
              color: isActive ? theme.parchment : theme.parchmentDim,
              boxShadow: isActive ? `0 0 12px ${char.color}20` : 'none',
            }}
            whileHover={{
              borderColor: `${char.color}50`,
              color: theme.parchment,
            }}
          >
            {page.label}
          </motion.button>
        );
      })}
    </motion.nav>
  );
};

export default HeroNav;
