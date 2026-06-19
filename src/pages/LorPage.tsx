import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { lorTheme } from '@/types/theme';
import { characters } from '@/data/characters';

interface LorItem {
  id?: string;
  title: string;
  desc: string;
  path: string;
  category: 'characters' | 'lore' | 'maps';
}

const allItems: LorItem[] = [
  { id: 'valery', title: 'Валерий Даркбейн', desc: 'Паладин ищущий силы и славы, чья кровь связана с силами за гранью смертных.', path: '/lore/valery', category: 'characters' },
  { id: 'brin', title: 'Брин дель Хессен', desc: 'Чародей и наследный Лорд, черпающий силу из Чёрного льда.', path: '/lore/brin', category: 'characters' },
  { id: 'sakris', title: 'Сакрис Ульриаш', desc: 'Амбициозный драконид искатель приключений переросший свой дом.', path: '/lore/sakris', category: 'characters' },
  { id: 'talis', title: 'Таллис', desc: 'Бродяга с лютней, носитель культурного наследия некогда великого клана Драконоборцев.', path: '/lore/talis', category: 'characters' },
  { id: 'stive', title: 'Стив', desc: 'Странствует в поисках лекарства для своего учителя и в поисках себя.', path: '/lore/stive', category: 'characters' },
  { title: 'Летопись мира', desc: 'Сказание о мире: от Музыки Айнур до 425 года Третьей Эпохи. История, расы, календарь и глоссарий.', path: '/letopis', category: 'lore' },
  { title: 'Род Даркбейнов', desc: 'Древний род, чья кровь связана с силами за гранью жизни и смерти.', path: '/darkbain', category: 'lore' },
  { title: 'Дом Хессен', desc: 'Великий Дом Астарии, чья кровь хранит тайны Чёрного льда.', path: '/hessen', category: 'lore' },
  { title: 'Бергхейм', desc: 'Суровый горный край на севере, где духи предков бродят по перевалам.', path: '/berghheim', category: 'lore' },
  { title: 'Клан Арантир', desc: 'Последние Драконоборцы, чьи песни пережили века.', path: '/arantir', category: 'lore' },
  { title: 'Карта Севера', desc: 'Карта северных земель — от ледяных пустошей до горных хребтов Бергхейма.', path: '/map/sever', category: 'maps' },
  { title: 'Карта Нортвинда', desc: 'Карта Нортвинда — оплота севера и его окрестностей.', path: '/map/northwind', category: 'maps' },
];

const categoryLabels: Record<string, string> = { characters: 'Персонажи', lore: 'Лор', maps: 'Карты' };

const LorPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems;
    const q = searchQuery.toLowerCase();
    return allItems.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      categoryLabels[item.category].toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, LorItem[]> = {};
    for (const item of filteredItems) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [filteredItems]);

  const categoryOrder = ['characters', 'lore', 'maps'];

  return (
    <Layout theme={lorTheme}>
      <div className="lor-page">
        <header className="lor-header">
          <h1 className="lor-title">Мир Игры</h1>
          <p className="lor-lead">
            Хроники героев, их судьбы и легенды, запечатлённые в цифровых страницах.
          </p>
        </header>

        <div className="lor-search">
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Поиск по миру..."
            className="lor-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="lor-search-clear tarot-no-glow"
              aria-label="Очистить"
            >
              Очистить
            </button>
          )}
        </div>

        {categoryOrder.map(cat => {
          const items = groupedItems[cat];
          if (!items || items.length === 0) return null;
          return (
            <section key={cat} className="lor-section">
              <h2 className="lor-section-title">{categoryLabels[cat]}</h2>
              <div className="lor-grid">
                {items.map((item, idx) => {
                  const char = cat === 'characters' ? characters.find(c => c.id === item.id) : null;
                  return (
                    <motion.a
                      key={item.path}
                      href={item.path}
                      onClick={e => {
                        if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                          e.preventDefault();
                          navigate(item.path);
                        }
                      }}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + idx * 0.04 }}
                      className="lor-card tarot-no-glow"
                      style={{
                        background: 'linear-gradient(180deg, rgba(20,14,22,0.58), rgba(12,8,14,0.46))',
                        border: char ? `1px solid ${char.color}38` : `1px solid ${lorTheme.primary}2a`,
                        borderTop: char ? `2px solid ${char.color}` : undefined,
                        textDecoration: 'none',
                      }}
                      whileHover={{ y: -2 }}
                    >
                      <h3 className="lor-card-title">{item.title}</h3>
                      <p className="lor-card-desc">{item.desc}</p>
                    </motion.a>
                  );
                })}
              </div>
            </section>
          );
        })}

        {filteredItems.length === 0 && (
          <p className="lor-empty">Ничего не найдено по запросу «{searchQuery}»</p>
        )}

        <footer className="lor-footer">BLOOD ICE</footer>
      </div>
    </Layout>
  );
};

export default LorPage;
