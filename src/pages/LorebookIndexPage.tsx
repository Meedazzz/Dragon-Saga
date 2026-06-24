import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Shield, Skull, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { lorebookCategories, lorebookEntries, type LorebookEntry } from '@/data/lorebook';
import { routeHref } from '@/lib/routeHref';
import { lorTheme } from '@/types/theme';

/**
 * LorebookIndexPage — главный каталог новых страниц лорбука.
 * Летопись и старые страницы персонажей не трогаются: новые материалы живут здесь.
 *
 * Группировка:
 * - без поиска и фильтра записи показываются красивыми блоками по категориям;
 * - при поиске/фильтре остаётся единая сетка результатов, чтобы быстрее найти нужное.
 */
const LorebookIndexPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Все');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lorebookEntries.filter((entry) => {
      const categoryMatch = category === 'Все' || entry.category === category;
      const text = `${entry.title} ${entry.subtitle} ${entry.summary} ${entry.category}`.toLowerCase();
      return categoryMatch && (!q || text.includes(q));
    });
  }, [category, query]);

  const grouped = useMemo(() => lorebookCategories
    .map((item) => ({ category: item, entries: lorebookEntries.filter((entry) => entry.category === item) }))
    .filter((group) => group.entries.length > 0), []);

  const showGrouped = category === 'Все' && !query.trim();

  const openEntry = (entry: LorebookEntry) => navigate(`/lorebook/${entry.slug}`);

  const renderCard = (entry: LorebookEntry, index: number) => (
    <motion.a
      key={entry.slug}
      href={routeHref(`/lorebook/${entry.slug}`)}
      onClick={(event) => {
        if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
          event.preventDefault();
          openEntry(entry);
        }
      }}
      className="lorebook-card tarot-no-glow"
      style={{ '--entry-color': entry.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ delay: Math.min(index * 0.015, 0.18) }}
    >
      <span>{entry.category}</span>
      <h2>{entry.title}</h2>
      <p>{entry.summary}</p>
      <small>{entry.tone}</small>
    </motion.a>
  );

  return (
    <Layout theme={lorTheme} particleVariant="mixed" particleCount={26}>
      <main className="lorebook-page">
        <section className="lorebook-hero">
          <span className="codex-kicker"><BookOpen size={16} /> Новый лорбук</span>
          <h1>Лорбук мира</h1>
          <p>Бестиарий, неигровые НПС, фракции, локации, магия, языки и военные машины. Всё добавлено отдельными страницами, не переписывая летопись и чужие лоры.</p>
          <div className="lorebook-hero__stats">
            <span><Skull size={18} /> {lorebookEntries.filter((entry) => entry.category === 'Бестиарий').length} бестиарий</span>
            <span><Users size={18} /> {lorebookEntries.filter((entry) => entry.category === 'Неигровые НПС').length} НПС</span>
            <span><Shield size={18} /> {lorebookEntries.length} страниц</span>
          </div>
        </section>

        <section className="lorebook-controls">
          <label className="lorebook-search">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти: орки, Палантир, Анаптаниум, Валерий, Магни..." />
          </label>
          <div className="lorebook-category-row">
            {['Все', ...lorebookCategories].map((item) => (
              <button key={item} type="button" className={item === category ? 'is-active tarot-no-glow' : 'tarot-no-glow'} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
        </section>

        {showGrouped ? (
          <div className="lorebook-grouped-list">
            {grouped.map((group) => (
              <section key={group.category} className="lorebook-group">
                <div className="lorebook-group__head">
                  <h2>{group.category}</h2>
                  <span>{group.entries.length} записей</span>
                </div>
                <div className="lorebook-grid">
                  {group.entries.map(renderCard)}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <section className="lorebook-grid">
            {filtered.map(renderCard)}
          </section>
        )}
      </main>
    </Layout>
  );
};

export default LorebookIndexPage;
