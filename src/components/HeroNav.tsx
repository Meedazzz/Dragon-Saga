import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCharacterIdByPath, getCharacterById } from '@/data/characters';
import type { ColorTheme } from '@/types/theme';

interface HeroNavProps {
  theme: ColorTheme;
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
    <div className="hero-nav">
      {char.pages.map((page, idx) => {
        const isActive = location.pathname === page.path;
        return (
          <motion.a
            key={page.path}
            href={page.path}
            onClick={e => {
              if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                navigate(page.path);
              }
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
            className="hero-nav-link"
            style={{
              fontFamily: "'Cinzel', serif",
              background: isActive ? `${char.color}22` : 'rgba(20,14,20,0.42)',
              border: `1px solid ${isActive ? `${char.color}66` : theme.buttonBorder}`,
              color: isActive ? theme.parchment : theme.parchmentDim,
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
    </div>
  );
};

export default HeroNav;
