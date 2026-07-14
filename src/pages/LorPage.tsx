import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { lorTheme } from '@/types/theme';
import { characters } from '@/data/characters';
import { routeHref } from '@/lib/routeHref';
import { Search } from 'lucide-react';

const allItems = [
  { id: 'valery', title: 'Валерий Даркбейн', desc: 'Паладин ищущий силы и славы, чья кровь связана с силами за гранью смертных.', path: '/lore/valery', category: 'characters' as const, icon: '' },
  { id: 'brin', title: 'Брин дель Хессен', desc: 'Чародей и наследный Лорд, черпающий силу из Чёрного льда.', path: '/lore/brin', category: 'characters' as const, icon: '' },
  { id: 'sakris', title: 'Сакрис Ульриаш', desc: 'Амбициозный драконид искатель приключений переросший свой дом.', path: '/lore/sakris', category: 'characters' as const, icon: '' },
  { id: 'talis', title: 'Таллис', desc: 'Бродяга с лютней, носитель культурного наследия некогда великого клана Драконоборцев.', path: '/lore/talis', category: 'characters' as const, icon: '' },
  { id: 'stive', title: 'Стив', desc: 'Странствует в поисках лекарства для своего учителя и в поисках себя.', path: '/lore/stive', category: 'characters' as const, icon: '' },
  { title: 'Летопись мира', desc: 'Сказание о мире: от Музыки Айнур до 425 года Третьей Эпохи. История, расы, календарь и глоссарий.', path: '/letopis', category: 'lore' as const, icon: '' },
  { title: 'Род Даркбейнов', desc: 'Древний род, чья кровь связана с силами за гранью жизни и смерти.', path: '/darkbain', category: 'lore' as const, icon: '' },
  { title: 'Дом Хессен', desc: 'Великий Дом Астарии, чья кровь хранит тайны Чёрного льда.', path: '/hessen', category: 'lore' as const, icon: '' },
  { title: 'Астария', desc: 'PDF-материал Брина об Астарии и политическом контексте кампании.', path: '/brin/astaria', category: 'lore' as const, icon: '' },
  { title: 'Мирный план с орками', desc: 'PDF-материал Брина о переговорах, дипломатии и мирном плане с орками.', path: '/brin/pursuing-peace', category: 'lore' as const, icon: '' },
  { title: 'Бергхейм', desc: 'Суровый горный край на севере, где духи предков бродят по перевалам.', path: '/berghheim', category: 'lore' as const, icon: '' },
  { title: 'Клан Арантир', desc: 'Последние Драконоборцы, чьи песни пережили века.', path: '/arantir', category: 'lore' as const, icon: '' },
  { title: 'Новый лорбук', desc: 'Бестиарий, неигровые НПС, фракции, локации, магия и языки мира.', path: '/lorebook', category: 'lorebook' as const, icon: '' },
  { title: 'Бестиарий', desc: 'Оборотни, Валькирии, драконы, орки, дракониды, Анкалагон и Обелиск.', path: '/bestiary', category: 'lorebook' as const, icon: '' },
  { title: 'Военные машины Иллирии', desc: 'Доктрина империи, скорпионы, баллисты, требушеты, башни, тараны и редкие магические машины.', path: '/lorebook/illyria-war-machines-doctrine', category: 'lorebook' as const, icon: '' },
  { title: 'Активности', desc: 'Оракул, связи персонажей, маршруты и печати для быстрых сцен партии.', path: '/activities', category: 'activities' as const, icon: '' },
  { title: 'Атлас всего Севера', desc: 'Единая длинная карта: людской север, север эльфов и владения дворфов.', path: '/map/full-north', category: 'maps' as const, icon: '' },
  { title: 'Людской Север', desc: 'Отдельный слой карты с Нортвиндом, Бергхеймом, Ринхолдом и орочьими племенами.', path: '/map/north-humans', category: 'maps' as const, icon: '' },
  { title: 'Север эльфов', desc: 'Отдельный слой карты с Эхуилом, Амон Анго и эльфийскими землями.', path: '/map/north-elves', category: 'maps' as const, icon: '' },
  { title: 'Север дворфов', desc: 'Отдельный слой карты с Зирак-думом и восточными горными дорогами.', path: '/map/north-dwarves', category: 'maps' as const, icon: '' },
  { title: 'Карта Нортвинда', desc: 'Карта Нортвинда — оплота севера и его окрестностей.', path: '/map/northwind', category: 'maps' as const, icon: '' },
  { title: 'Старая карта Севера', desc: 'Архивная версия старой карты северных земель.', path: '/map/sever', category: 'maps' as const, icon: '' },
];

const categoryLabels: Record<string, string> = { characters: 'Персонажи', lore: 'Лор', lorebook: 'Лорбук', activities: 'Активности', maps: 'Карты' };

const LorPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems;
    const q = searchQuery.toLowerCase();
    return allItems.filter((item) => item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || categoryLabels[item.category].toLowerCase().includes(q));
  }, [searchQuery]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof allItems> = {};
    for (const item of filteredItems) { if (!groups[item.category]) groups[item.category] = []; groups[item.category].push(item); }
    return groups;
  }, [filteredItems]);

  const categoryOrder = ['characters', 'lore', 'lorebook', 'activities', 'maps'];

  return (
    <Layout theme={lorTheme} particleCount={24}>
      <div className="max-w-[900px] mx-auto px-4 md:px-8 pb-20 pt-10">
        <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-center pb-6 mb-6">
          <h1 className="text-2xl md:text-4xl font-bold tracking-[4px]" style={{ fontFamily: "'Cinzel Decorative', serif", color: lorTheme.silverBright }}>
            Мир Игры
          </h1>
          <p className="text-sm italic max-w-[480px] mx-auto leading-relaxed mt-3 prose-readable" style={{ color: lorTheme.parchmentDim }}>
            Хроники героев, их судьбы и легенды, запечатлённые в цифровых страницах.
          </p>
        </motion.header>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mb-8">
          <div className="flex items-center gap-3 px-4 py-3 rounded-[12px]" style={{ background: 'rgba(18,12,20,0.52)', border: `1px solid ${lorTheme.primary}33` }}>
            <Search size={18} style={{ color: lorTheme.parchmentDim, flexShrink: 0 }} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Поиск по миру..." className="flex-1 bg-transparent outline-none text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", color: lorTheme.parchment, letterSpacing: '0.5px' }} />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="text-xs cursor-pointer tarot-no-glow" style={{ color: lorTheme.parchmentDim }}>×</button>}
          </div>
        </motion.div>

        {categoryOrder.map((cat) => {
          const items = groupedItems[cat];
          if (!items || items.length === 0) return null;
          return (
            <motion.section key={cat} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
              <div className="section-header !mt-1 !mb-3">
                <span className="section-icon">{items[0].icon}</span>
                <h2 className="section-title">{categoryLabels[cat]}</h2>
                <div className="section-line" />
              </div>
              <div className={`grid gap-3 ${cat === 'characters' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {items.map((item, idx) => {
                  const char = cat === 'characters' ? characters.find(c => c.id === item.id) : null;
                  return (
                    <motion.a key={item.path} href={routeHref(item.path)}
                      onClick={(e) => { if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) { e.preventDefault(); navigate(item.path); } }}
                      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + idx * 0.04 }}
                      className="rounded-[12px] p-4 md:p-5 relative overflow-hidden cursor-pointer transition-all duration-300 block text-left tarot-no-glow"
                      style={{ background: 'linear-gradient(180deg, rgba(20,14,22,0.58), rgba(12,8,14,0.46))', border: char ? `1px solid ${char.color}38` : `1px solid ${lorTheme.primary}2a`, borderTop: char ? `2px solid ${char.color}` : undefined, textDecoration: 'none' }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: char ? `linear-gradient(90deg, transparent, ${char.color}, transparent)` : `linear-gradient(90deg, transparent, ${lorTheme.primaryGlow}, transparent)` }} />
                      <div className="text-sm md:text-base font-bold tracking-[1.8px] mb-1.5" style={{ fontFamily: "'Cinzel', serif", color: char ? lorTheme.silverBright : lorTheme.primaryGlow }}>{item.title}</div>
                      <div className="text-[13px] leading-relaxed prose-readable" style={{ color: lorTheme.parchmentDim }}>{item.desc}</div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.section>
          );
        })}

        {filteredItems.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-lg italic prose-readable" style={{ color: lorTheme.parchmentDim }}>Ничего не найдено по запросу «{searchQuery}»</p>
          </motion.div>
        )}

        <div className="footer-ornament mt-12">
          <div className="rune-string">BLOOD ICE</div>
        </div>
      </div>
    </Layout>
  );
};

export default LorPage;
