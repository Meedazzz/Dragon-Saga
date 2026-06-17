import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { lorTheme } from '@/types/theme';
import { characters } from '@/data/characters';
import { Search } from 'lucide-react';

const allItems = [
  {
    id: 'valery',
    title: 'Валерий Даркбейн',
    desc: 'Паладин ищущий силы и славы, чья кровь связана с силами за гранью смертных.',
    path: '/lore/valery',
    category: 'characters' as const,
    icon: '⚔️',
  },
  {
    id: 'brin',
    title: 'Брин дель Хессен',
    desc: 'Чародей и наследный Лорд, черпающий силу из Чёрного льда.',
    path: '/lore/brin',
    category: 'characters' as const,
    icon: '⚔️',
  },
  {
    id: 'sakris',
    title: 'Сакрис Ульриаш',
    desc: 'Амбициозный драконид искатель приключений переросший свой дом.',
    path: '/lore/sakris',
    category: 'characters' as const,
    icon: '⚔️',
  },
  {
    id: 'talis',
    title: 'Таллис',
    desc: 'Бродяга с лютней, носитель культурного наследия некогда великого клана Драконоборцев.',
    path: '/lore/talis',
    category: 'characters' as const,
    icon: '⚔️',
  },
  {
    id: 'stive',
    title: 'Стив',
    desc: 'Странствует в поисках лекарства для своего учителя и в поисках себя.',
    path: '/lore/stive',
    category: 'characters' as const,
    icon: '⚔️',
  },
  {
    title: 'Летопись мира',
    desc: 'Сказание о мире: от Музыки Айнур до 425 года Третьей Эпохи. История, расы, календарь и глоссарий.',
    path: '/letopis',
    category: 'lore' as const,
    icon: '📜',
  },
  {
    title: 'Род Даркбейнов',
    desc: 'Древний род, чья кровь связана с силами за гранью жизни и смерти.',
    path: '/darkbain',
    category: 'lore' as const,
    icon: '📜',
  },
  {
    title: 'Дом Хессен',
    desc: 'Великий Дом Астарии, чья кровь хранит тайны Чёрного льда.',
    path: '/hessen',
    category: 'lore' as const,
    icon: '📜',
  },
  {
    title: 'Бергхейм',
    desc: 'Суровый горный край на севере, где духи предков бродят по перевалам.',
    path: '/berghheim',
    category: 'lore' as const,
    icon: '📜',
  },
  {
    title: 'Клан Арантир',
    desc: 'Последние Драконоборцы, чьи песни пережили века.',
    path: '/arantir',
    category: 'lore' as const,
    icon: '📜',
  },
  {
    title: 'Карта Севера',
    desc: 'Карта северных земель — от ледяных пустошей до горных хребтов Бергхейма.',
    path: '/map/sever',
    category: 'maps' as const,
    icon: '🗺️',
  },
  {
    title: 'Карта Нортвинда',
    desc: 'Карта Нортвинда — оплота севера и его окрестностей.',
    path: '/map/northwind',
    category: 'maps' as const,
    icon: '🗺️',
  },
];

const categoryLabels: Record<string, string> = {
  characters: 'Персонажи',
  lore: 'Лор',
  maps: 'Карты',
};

const LorPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems;
    const q = searchQuery.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        categoryLabels[item.category].toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof allItems> = {};
    for (const item of filteredItems) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [filteredItems]);

  const categoryOrder = ['characters', 'lore', 'maps'];

  return (
    <Layout theme={lorTheme} particleCount={35}>
      <div className="max-w-[900px] mx-auto px-4 md:px-8 pb-20 pt-10">
        {/* Header — simplified */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pb-6 mb-6"
        >
          <h1
            className="text-2xl md:text-4xl font-bold tracking-[4px] leading-tight"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: lorTheme.silver,
              textShadow: '0 0 15px rgba(144,152,160,0.15), 0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Мир Игры
          </h1>
          <p
            className="text-sm italic max-w-[480px] mx-auto leading-relaxed mt-3"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: lorTheme.parchmentDim,
              letterSpacing: '1px',
            }}
          >
            Хроники героев, их судьбы и легенды, запечатлённые в цифровых страницах.
          </p>
        </motion.header>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-lg"
            style={{
              background: 'rgba(20,15,10,0.4)',
              border: '1px solid rgba(80,70,50,0.25)',
            }}
          >
            <Search size={18} style={{ color: lorTheme.parchmentDim, flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по миру..."
              className="flex-1 bg-transparent outline-none text-sm"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: lorTheme.parchment,
                letterSpacing: '1px',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs cursor-pointer"
                style={{ color: lorTheme.parchmentDim }}
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Grouped Results */}
        {categoryOrder.map((cat) => {
          const items = groupedItems[cat];
          if (!items || items.length === 0) return null;

          return (
            <motion.section
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-8"
            >
              <div className="section-header !mt-1 !mb-3" style={{ '--section-border': 'rgba(80,70,50,0.15)', '--section-icon-color': lorTheme.primaryGlow, '--section-title-color': lorTheme.primaryGlow, '--section-line-color': lorTheme.primary } as React.CSSProperties}>
                <span className="section-icon">{items[0].icon}</span>
                <h2 className="section-title">{categoryLabels[cat]}</h2>
                <div className="section-line" />
              </div>

              <div className={`grid gap-3 ${cat === 'characters' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {items.map((item, idx) => {
                  const char = cat === 'characters' ? characters.find(c => c.id === item.id) : null;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      onClick={() => navigate(item.path)}
                      className="rounded-md p-4 md:p-5 relative overflow-hidden cursor-pointer transition-all duration-300"
                      style={{
                        background: 'linear-gradient(180deg, rgba(20,15,10,0.5) 0%, rgba(10,8,5,0.3) 100%)',
                        border: char ? `1px solid ${char.color}30` : '1px solid rgba(138,106,42,0.2)',
                        borderTop: char ? `2px solid ${char.color}` : undefined,
                      }}
                      whileHover={{
                        borderColor: char ? `${char.color}60` : 'rgba(184,144,58,0.3)',
                        y: -2,
                        boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                      }}
                    >
                      {char && (
                        <div
                          className="absolute top-0 left-0 right-0 h-0.5"
                          style={{ background: `linear-gradient(90deg, transparent, ${char.color}, ${char.color}80, transparent)` }}
                        />
                      )}
                      {!char && (
                        <div
                          className="absolute top-0 left-0 right-0 h-0.5"
                          style={{ background: `linear-gradient(90deg, transparent, ${lorTheme.primaryGlow}, transparent)` }}
                        />
                      )}
                      <div
                        className="text-sm md:text-base font-bold tracking-[2px] mb-1.5"
                        style={{
                          fontFamily: "'Cinzel Decorative', serif",
                          color: char ? lorTheme.silver : lorTheme.primaryGlow,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="text-xs leading-relaxed"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          color: lorTheme.parchmentDim,
                        }}
                      >
                        {item.desc}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}

        {/* Empty search result */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p
              className="text-lg italic"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: lorTheme.parchmentDim }}
            >
              Ничего не найдено по запросу «{searchQuery}»
            </p>
          </motion.div>
        )}

        {/* Footer */}
        <div className="footer-ornament mt-12" style={{ '--footer-border': 'rgba(80,70,50,0.1)', '--footer-text-color': lorTheme.primary } as React.CSSProperties}>
          <div className="rune-string">L E T O P I S E</div>
        </div>
      </div>
    </Layout>
  );
};

export default LorPage;
