import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Send, MessageCircle, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ColorTheme } from '@/types/theme';
import { characters } from '@/data/characters';

interface SideMenuProps {
  theme: ColorTheme;
}

interface SubItem {
  label: string;
  path: string;
}

interface MenuChild {
  label: string;
  path: string;
  children?: SubItem[];
}

interface MenuItemGroup {
  id: string;
  label: string;
  path?: string;
  children?: MenuChild[];
  subGroups?: { id: string; label: string; items: SubItem[] }[];
}

const SideMenu: React.FC<SideMenuProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [expandedChars, setExpandedChars] = useState<Record<string, boolean>>({});
  const [expandedSubGroups, setExpandedSubGroups] = useState<Record<string, boolean>>({ lore: true, maps: false });
  const [hoveringButton, setHoveringButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Contact icons are the ONLY icons allowed (per requirement #6).
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
      children: characters.map(char => ({
        label: char.name,
        path: char.lorePath,
        children: [
          { label: 'Полный лор', path: char.lorePath },
          ...char.pages.map(page => ({ label: page.label, path: page.path })),
        ],
      })),
    },
    {
      id: 'world',
      label: 'Мир игры',
      path: '/lor',
      subGroups: [
        {
          id: 'lore',
          label: 'Лор',
          items: [
            { label: 'Летопись мира', path: '/letopis' },
            { label: 'Род Даркбейнов', path: '/darkbain' },
            { label: 'Дом Хессен', path: '/hessen' },
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
      {/* SideMenu trigger — ALWAYS fixed in the same spot, regardless of scroll (req #1) */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setHoveringButton(true)}
        onMouseLeave={() => setHoveringButton(false)}
        onFocus={() => setHoveringButton(true)}
        onBlur={() => setHoveringButton(false)}
        className="side-menu-trigger"
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
      >
        {isOpen ? 'Закрыть' : 'Меню'}
      </button>

      {/* "Main menu" tooltip — rounded, offset toward centre & down (req #5.2, #5.3) */}
      <AnimatePresence>
        {hoveringButton && !isOpen && (
          <motion.span
            key="main-menu-tooltip"
            className="side-menu-tooltip"
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Main menu
          </motion.span>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="side-menu-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {isOpen && (
        <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          className="side-menu-panel"
          style={{
            background: theme.menuBg,
            color: theme.menuText,
            borderRight: `1px solid ${theme.buttonBorder}`,
          }}
          aria-label="Боковое меню"
        >
          {/* Header */}
          <div className="side-menu-header">
            <span className="side-menu-eyebrow">D&amp;D</span>
            <h2 className="side-menu-title">Dragon Saga</h2>
          </div>

          {/* Nav */}
          <nav className="side-menu-nav">
            {menuGroups.map(group => (
              <div key={group.id} className="side-menu-group">
                {group.children ? (
                  <>
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="side-menu-group-btn"
                      style={{ color: theme.menuAccent }}
                    >
                      <span>{group.label}</span>
                      <span className="side-menu-caret">{expandedGroups[group.id] ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedGroups[group.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                          className="side-menu-sublist"
                        >
                          {group.children!.map(child => (
                            <div key={child.label} className="side-menu-char">
                              <button
                                onClick={() => toggleChar(child.label)}
                                className="side-menu-char-btn"
                                style={{
                                  color: isPathActive(child.path) ? theme.menuAccent : theme.menuText,
                                }}
                              >
                                <span>{child.label}</span>
                                <span className="side-menu-caret">{expandedChars[child.label] ? '−' : '+'}</span>
                              </button>
                              <AnimatePresence initial={false}>
                                {expandedChars[child.label] && child.children && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                                    className="side-menu-leaf"
                                  >
                                    {child.children.map(sub => (
                                      <a
                                        key={sub.path + sub.label}
                                        href={sub.path}
                                        onClick={e => handleLinkClick(e, sub.path)}
                                        className="side-menu-leaf-link"
                                        style={{
                                          color: isPathActive(sub.path) ? theme.menuAccent : theme.menuText,
                                        }}
                                      >
                                        {sub.label}
                                      </a>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a
                    href={group.path}
                    onClick={e => handleLinkClick(e, group.path!)}
                    className="side-menu-group-btn"
                    style={{
                      color: isPathActive(group.path!) ? theme.menuAccent : theme.menuText,
                    }}
                  >
                    {group.label}
                  </a>
                )}

                {/* Sub groups (Лор / Карты inside Мир игры) */}
                {group.subGroups && (
                  <div className="side-menu-subgroups">
                    {group.subGroups.map(sg => (
                      <div key={sg.id} className="side-menu-subgroup">
                        <button
                          onClick={() => toggleSubGroup(sg.id)}
                          className="side-menu-subgroup-btn"
                          style={{ color: theme.menuAccent }}
                        >
                          <span>{sg.label}</span>
                          <span className="side-menu-caret">{expandedSubGroups[sg.id] ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence initial={false}>
                          {expandedSubGroups[sg.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                              className="side-menu-leaf"
                            >
                              {sg.items.map(item => (
                                <a
                                  key={item.path}
                                  href={item.path}
                                  onClick={e => handleLinkClick(e, item.path)}
                                  className="side-menu-leaf-link"
                                  style={{
                                    color: isPathActive(item.path) ? theme.menuAccent : theme.menuText,
                                  }}
                                >
                                  {item.label}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Contacts (icons allowed per req #6) */}
          <div className="side-menu-contacts">
            <h3 className="side-menu-contacts-title">Контакты</h3>
            <div className="side-menu-contacts-list">
              {contactLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="side-menu-contact"
                  style={{
                    color: theme.menuText,
                    borderColor: theme.buttonBorder,
                  }}
                  title={label}
                  aria-label={label}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.aside>
      )}
    </>
  );
};

export default SideMenu;
