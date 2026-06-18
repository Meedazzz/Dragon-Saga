import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Globe, ChevronDown, ChevronRight, Youtube, Send, MessageCircle, Users, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ColorTheme } from '@/types/theme';
import { characters } from '@/data/characters';

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
        children: char.pages.map(page => ({
          label: page.label,
          path: page.path,
        })),
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
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 z-[600] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 custom-tooltip"
        style={{
          background: theme.menuBg,
          border: `1px solid ${theme.buttonBorder}`,
          color: theme.menuAccent,
          backdropFilter: 'blur(10px)',
        }}
        data-tooltip={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        {isOpen ? <X
