import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Link as LinkIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getLorebookEntry, lorebookEntries } from '@/data/lorebook';
import { routeHref } from '@/lib/routeHref';
import { lorTheme } from '@/types/theme';

/**
 * LorebookEntryPage — универсальная страница любой новой статьи лорбука.
 * Данные берутся из `src/data/lorebook.ts`, поэтому новые буклеты лучше добавлять туда.
 */
const LorebookEntryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const entry = slug ? getLorebookEntry(slug) : undefined;

  if (!entry) {
    return (
      <Layout theme={lorTheme}>
        <main className="lorebook-entry-page">
          <section className="lorebook-hero">
            <span className="codex-kicker"><BookOpen size={16} /> Лорбук</span>
            <h1>Страница не найдена</h1>
            <p>Эта запись ещё не создана или была переименована.</p>
            <button type="button" className="codex-btn codex-btn--primary tarot-no-glow" onClick={() => navigate('/lorebook')}>Вернуться в лорбук</button>
          </section>
        </main>
      </Layout>
    );
  }

  const related = (entry.related ?? [])
    .map((relatedSlug) => lorebookEntries.find((item) => item.slug === relatedSlug))
    .filter(Boolean) as typeof lorebookEntries;

  return (
    <Layout theme={lorTheme} particleVariant="mixed" particleCount={22}>
      <main className="lorebook-entry-page" style={{ '--entry-color': entry.accent } as React.CSSProperties}>
        <section className="lorebook-entry-hero">
          <button type="button" className="lorebook-back tarot-no-glow" onClick={() => navigate('/lorebook')}>
            <ArrowLeft size={16} /> Все страницы
          </button>
          <span className="codex-kicker"><BookOpen size={16} /> {entry.category}</span>
          <h1>{entry.title}</h1>
          <p className="lorebook-entry-subtitle">{entry.subtitle}</p>
          <p className="lorebook-entry-summary">{entry.summary}</p>
          <div className="lorebook-entry-tone">{entry.tone}</div>
        </section>

        <section className="lorebook-entry-body">
          {entry.sections.map((section, sectionIndex) => (
            <motion.article
              key={section.title}
              className="lorebook-section-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: sectionIndex * 0.04 }}
            >
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </motion.article>
          ))}
        </section>

        {entry.hooks && entry.hooks.length > 0 && (
          <section className="lorebook-hooks">
            <h2>Сюжетные зацепки</h2>
            <div>
              {entry.hooks.map((hook) => <p key={hook}>{hook}</p>)}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="lorebook-related">
            <h2>Связанные страницы</h2>
            <div>
              {related.map((item) => (
                <a key={item.slug} href={routeHref(`/lorebook/${item.slug}`)} onClick={(event) => {
                  if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
                    event.preventDefault();
                    navigate(`/lorebook/${item.slug}`);
                  }
                }}>
                  <LinkIcon size={14} /> {item.title}
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
};

export default LorebookEntryPage;
