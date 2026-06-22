import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Globe, ChevronDown, ChevronRight, Youtube, Send, MessageCircle, Users, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ColorTheme } from '@/types/theme';
import { characters } from '@/data/characters';
import { SmartTooltip } from './SmartTooltip';

interface SideMenuProps {
  theme: ColorTheme;
}

interface MenuItemGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: { label: string; path: string; children?: { label: string; path: string }[] }[];
  /** Sub-groups within this menu group (e.g. Лор / Карты inside Мир игры) */
  subGroups?: { id: string; label: string; items: { label: string; path: string }[] }[];
}

const SideMenu: React.FC<SideMenuProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [expandedChars, setExpandedChars] = useState<Record<string, boolean>>({});
  const [expandedSubGroups, setExpandedSubGroups] = useState<Record<string, boolean>>({ lore: true, maps: false });
  const navigate = useNavigate();
  const location = useLocation();

  const contactLinks = [
    { label: 'YouTube', href: 'https://www.youtube.com/@Sigmarillion', icon: Youtube },
    { label: 'VK', href: 'https://vk.com/sigmarillion', icon: Users },
    { label: 'Telegram', href: 'https://t.me/SigmarillionDnD', icon: Send },
    { label: 'Discord', href: 'https://discord.gg/vyhKQTKhsw', icon: MessageCircle },
  ];

  const menuGroups: MenuItemGroup[] = [
    {
      id: 'characters',
      label: 'Персонажи',
      icon: User,
      children: characters.map(char => ({
        label: char.name,
        path: char.lorePath,
        children: [
          { label: 'Полный лор', path: char.lorePath },
          ...char.pages.map(page => ({
            label: page.label,
            path: page.path,
          }))
        ],
      })),
    },
    {
      id: 'world',
      label: 'Мир игры',
      icon: Globe,
      path: '/lor',
      subGroups: [
        {
          id: 'lore',
          label: 'Лор',
          items: [
            { label: 'Летопись мира', path: '/letopis' },
            { label: 'Род Даркбейнов', path: '/darkbain' },
            { label: 'Дом Хессен', path: '/hessen' },
            { label: 'Феноменология Чёрного льда', path: '/black-ice-research' },
            { label: 'Бергхейм', path: '/berghheim' },
            { label: 'Клан Арантир', path: '/arantir' },
          ],
        },
        {
          id: 'maps',
          label: 'Карты',
          items: [
            { label: 'Карта Севера', path: '/map/sever' },
            { label: 'Карта Нортвинда', path: '/map/northwind' },
          ],
        },
      ],
    },
  ];

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    setTimeout(() => navigate(path), 200);
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      handleNavigate(path);
    }
  };

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleChar = (charName: string) => {
    setExpandedChars(prev => ({ ...prev, [charName]: !prev[charName] }));
  };

  const toggleSubGroup = (id: string) => {
    setExpandedSubGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isPathActive = (path: string) => location.pathname === path;

  return (
    <>
      <SmartTooltip content={isOpen ? "Закрыть меню" : "Открыть меню"} side="right">
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
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </motion.button>
      </SmartTooltip>

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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-80 z-[550] flex flex-col"
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
                Dragon Saga
              </div>
              <div
                className="mt-4 h-px w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${theme.menuAccent}, transparent)`,
                }}
              />
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 overflow-y-auto pb-4">
              {/* Home link */}
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
                className="w-full flex items-center gap-3 px-4 py-3 mb-1 rounded-lg text-left transition-all duration-300 cursor-pointer block"
                style={{
                  background: isPathActive('/') ? `${theme.menuAccent}20` : 'transparent',
                  border: `1px solid ${isPathActive('/') ? theme.menuAccent : 'transparent'}`,
                  color: isPathActive('/') ? theme.menuAccent : theme.menuText,
                  textDecoration: 'none',
                }}
                whileHover={{
                  x: 4,
                  background: `${theme.menuAccent}15`,
                }}
              >
                <div className="flex items-center gap-3 w-full">
                  <Home size={16} />
                  <span className="text-sm tracking-[1px]" style={{ fontFamily: theme.fontFamily }}>
                    Главная
                  </span>
                </div>
              </motion.a>

              {/* Menu Groups */}
              {menuGroups.map((group, gIdx) => (
                <div key={group.id} className="mb-1">
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (gIdx + 1) * 0.05 }}
                    onClick={() => {
                      if (group.path && !group.children && !group.subGroups) {
                        handleNavigate(group.path);
                      } else {
                        toggleGroup(group.id);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 cursor-pointer"
                    style={{
                      background: expandedGroups[group.id] ? `${theme.menuAccent}15` : 'transparent',
                      color: theme.menuAccent,
                    }}
                    whileHover={{
                      x: 4,
                      background: `${theme.menuAccent}15`,
                    }}
                  >
                    <group.icon size={16} />
                    <span
                      className="text-sm tracking-[1px] flex-1"
                      style={{ fontFamily: theme.fontFamily, fontWeight: 700 }}
                    >
                      {group.label}
                    </span>
                    {(group.children || group.subGroups) && (
                      expandedGroups[group.id]
                        ? <ChevronDown size={14} />
                        : <ChevronRight size={14} />
                    )}
                  </motion.button>

                  {/* Expanded children */}
                  <AnimatePresence>
                    {(group.children || group.subGroups) && expandedGroups[group.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {group.id === 'characters' && group.children ? (
                          // Character sub-items with expandable sub-pages
                          group.children.map((charItem) => (
                            <div key={charItem.path} className="ml-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleChar(charItem.label);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded text-left transition-all duration-200 cursor-pointer"
                                style={{ color: theme.menuText }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLElement).style.background = `${theme.menuAccent}10`;
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                                }}
                              >
                                {expandedChars[charItem.label] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                <span className="text-xs tracking-[1px] flex-1" style={{ fontFamily: theme.fontFamily }}>
                                  {charItem.label}
                                </span>
                              </button>
                              <AnimatePresence>
                                {expandedChars[charItem.label] && charItem.children && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="ml-5"
                                  >
                                    {charItem.children.map((subPage) => (
                                      <a
                                        key={subPage.path}
                                        href={subPage.path}
                                        onClick={(e) => handleLinkClick(e, subPage.path)}
                                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded text-left transition-all duration-200 cursor-pointer block"
                                        style={{
                                          color: isPathActive(subPage.path) ? theme.menuAccent : theme.parchmentDim,
                                          background: isPathActive(subPage.path) ? `${theme.menuAccent}15` : 'transparent',
                                          borderLeft: isPathActive(subPage.path) ? `2px solid ${theme.menuAccent}` : '2px solid transparent',
                                          textDecoration: 'none',
                                        }}
                                        onMouseEnter={(e) => {
                                          if (!isPathActive(subPage.path)) {
                                            (e.currentTarget as HTMLElement).style.color = theme.menuText;
                                            (e.currentTarget as HTMLElement).style.borderLeftColor = `${theme.menuAccent}40`;
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          if (!isPathActive(subPage.path)) {
                                            (e.currentTarget as HTMLElement).style.color = theme.parchmentDim;
                                            (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent';
                                          }
                                        }}
                                      >
                                        <span className="text-[11px] tracking-[1px]" style={{ fontFamily: theme.fontFamily }}>
                                          {subPage.label}
                                        </span>
                                      </a>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))
                        ) : group.subGroups ? (
                          // Sub-groups (Лор, Карты) within "Мир игры"
                          <div className="ml-2">
                            {/* Direct link to Обзор мира */}
                            {(() => {
                              const overviewPath = group.path;
                              if (!overviewPath) return null;
                              const isActive = isPathActive(overviewPath);
                              return (
                              <a
                                href={overviewPath}
                                onClick={(e) => handleLinkClick(e, overviewPath)}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded text-left transition-all duration-200 cursor-pointer block"
                                style={{
                                  color: isActive ? theme.menuAccent : theme.parchmentDim,
                                  background: isActive ? `${theme.menuAccent}15` : 'transparent',
                                  borderLeft: isActive ? `2px solid ${theme.menuAccent}` : '2px solid transparent',
                                  textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => {
                                  if (!isActive) {
                                    (e.currentTarget as HTMLElement).style.color = theme.menuText;
                                    (e.currentTarget as HTMLElement).style.borderLeftColor = `${theme.menuAccent}40`;
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isActive) {
                                    (e.currentTarget as HTMLElement).style.color = theme.parchmentDim;
                                    (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent';
                                  }
                                }}
                              >
                                <div className="flex items-center gap-2 w-full">
                                  <Search size={12} />
                                  <span className="text-xs tracking-[1px]" style={{ fontFamily: theme.fontFamily }}>
                                    Обзор мира
                                  </span>
                                </div>
                              </a>
                              );
                            })()}
                            {group.subGroups.map((subGroup) => (
                              <div key={subGroup.id} className="mt-1">
                                <button
                                  onClick={() => toggleSubGroup(subGroup.id)}
                                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-left transition-all duration-200 cursor-pointer"
                                  style={{ color: theme.menuText }}
                                  onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = `${theme.menuAccent}10`;
                                  }}
                                  onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                                  }}
                                >
                                  {expandedSubGroups[subGroup.id] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                  <span className="text-xs tracking-[1px] flex-1" style={{ fontFamily: theme.fontFamily, fontWeight: 600 }}>
                                    {subGroup.label}
                                  </span>
                                </button>
                                  <AnimatePresence>
                                    {expandedSubGroups[subGroup.id] && (
                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="ml-4"
                                      >
                                        {subGroup.items.map((item) => (
                                          <a
                                            key={item.path}
                                            href={item.path}
                                            onClick={(e) => handleLinkClick(e, item.path)}
                                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded text-left transition-all duration-200 cursor-pointer block"
                                            style={{
                                              color: isPathActive(item.path) ? theme.menuAccent : theme.parchmentDim,
                                              background: isPathActive(item.path) ? `${theme.menuAccent}15` : 'transparent',
                                              borderLeft: isPathActive(item.path) ? `2px solid ${theme.menuAccent}` : '2px solid transparent',
                                              textDecoration: 'none',
                                            }}
                                            onMouseEnter={(e) => {
                                              if (!isPathActive(item.path)) {
                                                (e.currentTarget as HTMLElement).style.color = theme.menuText;
                                                (e.currentTarget as HTMLElement).style.borderLeftColor = `${theme.menuAccent}40`;
                                              }
                                            }}
                                            onMouseLeave={(e) => {
                                              if (!isPathActive(item.path)) {
                                                (e.currentTarget as HTMLElement).style.color = theme.parchmentDim;
                                                (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent';
                                              }
                                            }}
                                          >
                                            <span className="text-[11px] tracking-[1px]" style={{ fontFamily: theme.fontFamily }}>
                                              {item.label}
                                            </span>
                                          </a>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        ) : group.children ? (
                          // Simple sub-items (fallback)
                          group.children.map((item) => (
                            <a
                              key={item.path}
                              href={item.path}
                              onClick={(e) => handleLinkClick(e, item.path)}
                              className="w-full flex items-center gap-2 px-4 py-2 ml-2 rounded text-left transition-all duration-200 cursor-pointer block"
                              style={{
                                color: isPathActive(item.path) ? theme.menuAccent : theme.parchmentDim,
                                background: isPathActive(item.path) ? `${theme.menuAccent}15` : 'transparent',
                                borderLeft: isPathActive(item.path) ? `2px solid ${theme.menuAccent}` : '2px solid transparent',
                                textDecoration: 'none',
                              }}
                              onMouseEnter={(e) => {
                                if (!isPathActive(item.path)) {
                                  (e.currentTarget as HTMLElement).style.color = theme.menuText;
                                  (e.currentTarget as HTMLElement).style.borderLeftColor = `${theme.menuAccent}40`;
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isPathActive(item.path)) {
                                  (e.currentTarget as HTMLElement).style.color = theme.parchmentDim;
                                  (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent';
                                }
                              }}
                            >
                              <span className="text-xs tracking-[1px]" style={{ fontFamily: theme.fontFamily }}>
                                {item.label}
                              </span>
                            </a>
                          ))
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Contacts */}
            <div className="p-4 text-center">
              <div
                className="h-px w-full mb-4"
                style={{
                  background: `linear-gradient(90deg, transparent, ${theme.menuAccent}40, transparent)`,
                }}
              />
              <div
                className="mb-3 text-[10px] tracking-[3px] uppercase"
                style={{ color: theme.parchmentDim, opacity: 0.65, fontFamily: theme.fontFamily }}
              >
                Контакты
              </div>
              <div className="flex items-center justify-center gap-2">
                {contactLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'rgba(30,25,15,0.35)',
                      border: `1px solid ${theme.buttonBorder}`,
                      color: theme.menuText,
                      textDecoration: 'none',
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideMenu;
