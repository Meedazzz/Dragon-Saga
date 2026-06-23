import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ChevronRight,
  Clock,
  Compass,
  Dices,
  Heart,
  Search,
  Shield,
  Sparkles,
  Swords,
  Users,
  X,
} from 'lucide-react';
import Layout from '@/components/Layout';
import { characters } from '@/data/characters';
import { tarotCards, type TarotCard } from '@/data/tarot';
import { applyImageFallback } from '@/lib/imageFallback';
import { homeTheme } from '@/types/theme';

interface Activity {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  category: string;
  color: string;
  details: string[];
}

const activities: Activity[] = [
  {
    id: 'oracle', icon: Dices, title: 'Оракул сцены', category: 'Гадание', color: '#f5c451',
    description: 'Карта Таро + d20 дают тон сцены, цену и крючок для партии.',
    details: ['Вытягивает реальный аркан героя', 'Бросает d20', 'Даёт быстрый крючок сцены', 'Ведёт к полному лору карты'],
  },
  {
    id: 'threads', icon: Users, title: 'Нити героев', category: 'Связи', color: '#a78bfa',
    description: 'Быстрые переходы к героям, их лору и связанным страницам.',
    details: ['Пять героев в одном модуле', 'Переход к полному лору', 'Личные умения и подклассы', 'Удобно для игроков за столом'],
  },
  {
    id: 'route', icon: Compass, title: 'Маршрут', category: 'Навигация', color: '#34d399',
    description: 'Переходы к картам, летописи и маршрутам северных земель.',
    details: ['Карта Севера', 'Карта Нортвинда', 'Летопись событий', 'Быстрый старт для сессии'],
  },
  {
    id: 'archive', icon: BookOpen, title: 'Архив мира', category: 'Знания', color: '#60a5fa',
    description: 'Главный вход в лор, дома, кланы, исследования и хроники.',
    details: ['Общий лор', 'Дом Хессен', 'Род Даркбейнов', 'Феноменология Чёрного льда'],
  },
  {
    id: 'timeline', icon: Clock, title: 'Хронология', category: 'История', color: '#e6e6fa',
    description: 'Каркас событий и последствий для подготовки следующей главы.',
    details: ['Завязка', 'Разлом', 'Выбор', 'Последствие'],
  },
  {
    id: 'battle', icon: Swords, title: 'Тактика', category: 'Бой', color: '#ef4444',
    description: 'Быстрый блок для боевых ролей, угроз и ставки сцены.',
    details: ['Кто защищает', 'Кто платит цену', 'Что меняется после победы', 'Какая тень возвращается'],
  },
  {
    id: 'sanctuary', icon: Heart, title: 'Убежище', category: 'База', color: '#ec4899',
    description: 'Идеи для базы партии, союзников и безопасных сцен между приключениями.',
    details: ['Союзники', 'Запасы', 'Слухи', 'Новая угроза'],
  },
];

const categories = ['Все', ...Array.from(new Set(activities.map((activity) => activity.category)))];

const randomInt = (max: number) => {
  if (max <= 0) return 0;
  const cryptoApi = globalThis.crypto;
  if (cryptoApi?.getRandomValues) {
    const array = new Uint32Array(1);
    cryptoApi.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Date.now() % max);
};
const routeLinks = [
  { label: 'Карта Севера', path: '/map/sever' },
  { label: 'Карта Нортвинда', path: '/map/northwind' },
  { label: 'Летопись', path: '/letopis' },
];
const archiveLinks = [
  { label: 'Полный лор', path: '/lor' },
  { label: 'Род Даркбейнов', path: '/darkbain' },
  { label: 'Дом Хессен', path: '/hessen' },
  { label: 'Чёрный лёд', path: '/black-ice-research' },
  { label: 'Бергхейм', path: '/berghheim' },
  { label: 'Клан Арантир', path: '/arantir' },
];

/**
 * ActivitiesPage — зал инструментов мастера и партии.
 *
 * Здесь лежат не длинные статьи, а быстрые действия:
 * оракул с d20, переходы к героям, маршруты по миру и архив лора.
 * Добавляй новые активности в массив `activities`, а их особую логику — в модальное окно ниже.
 */
const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [oracleResult, setOracleResult] = useState<{ card: TarotCard; die: number; tone: string } | null>(null);

  const filteredActivities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return activities.filter((activity) => {
      const matchesCategory = activeCategory === 'Все' || activity.category === activeCategory;
      const haystack = `${activity.title} ${activity.description} ${activity.category}`.toLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
    });
  }, [activeCategory, searchQuery]);

  const drawOracle = () => {
    const card = tarotCards[randomInt(tarotCards.length)];
    const die = randomInt(20) + 1;
    const tone = die >= 15 ? 'Дар' : die >= 8 ? 'Цена' : 'Осложнение';
    setOracleResult({ card, die, tone });
  };

  const openActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    if (activity.id === 'oracle' && !oracleResult) drawOracle();
  };

  return (
    <Layout theme={homeTheme} particleCount={20}>
      <main className="activities-page codex-activities">
        <motion.section className="activities-hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="activities-hero__bg"><div className="activities-hero__orb" /></div>
          <div className="activities-hero__content">
            <span className="activities-eyebrow">🎲 Инструменты мастера</span>
            <h1>Активности партии</h1>
            <p>Оракул, связи героев, маршруты, архив и быстрые каркасы сцен. Все инструменты завязаны на существующий лор и карты сайта.</p>
            <div className="codex-actions codex-actions--center">
              <button type="button" className="codex-btn codex-btn--primary tarot-no-glow" onClick={() => navigate('/')}>На главную</button>
              <button type="button" className="codex-btn tarot-no-glow" onClick={() => navigate('/lor')}>Полный лор</button>
            </div>
          </div>
        </motion.section>

        <motion.section className="activities-controls" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <label className="activities-search">
            <Search size={16} className="activities-search__icon" />
            <input type="text" placeholder="Найти активность..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
          </label>
          <div className="activities-categories">
            {categories.map((category) => (
              <button key={category} type="button" className={`activities-category tarot-no-glow ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)}>
                {category}
              </button>
            ))}
          </div>
        </motion.section>

        <section className="activities-grid">
          <AnimatePresence mode="popLayout">
            {filteredActivities.map((activity, index) => (
              <motion.article
                key={activity.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ delay: index * 0.035, duration: 0.25 }}
                className="activity-card"
                style={{ '--activity-color': activity.color } as React.CSSProperties}
                onClick={() => openActivity(activity)}
              >
                <div className="activity-card__glow" />
                <div className="activity-card__icon"><activity.icon size={27} /></div>
                <div className="activity-card__content">
                  <span className="activity-card__category">{activity.category}</span>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </div>
                <div className="activity-card__arrow"><ChevronRight size={20} /></div>
              </motion.article>
            ))}
          </AnimatePresence>
        </section>

        {filteredActivities.length === 0 && (
          <motion.div className="activities-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Sparkles size={48} />
            <p>Ничего не найдено. Попробуйте другой запрос.</p>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedActivity && (
            <motion.div className="activity-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedActivity(null)}>
              <motion.div
                className="activity-modal"
                initial={{ scale: 0.92, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.92, y: 30, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(event) => event.stopPropagation()}
                style={{ '--activity-color': selectedActivity.color } as React.CSSProperties}
              >
                <button className="activity-modal__close tarot-no-glow" onClick={() => setSelectedActivity(null)} type="button" aria-label="Закрыть"><X size={22} /></button>

                <div className="activity-modal__header">
                  <div className="activity-modal__icon"><selectedActivity.icon size={32} /></div>
                  <div><span className="activity-modal__category">{selectedActivity.category}</span><h2>{selectedActivity.title}</h2></div>
                </div>

                <p className="activity-modal__description">{selectedActivity.description}</p>

                {selectedActivity.id === 'oracle' && (
                  <div className="activity-tool-panel">
                    <button type="button" className="codex-btn codex-btn--primary tarot-no-glow" onClick={drawOracle}><Dices size={16} /> Бросить снова</button>
                    {oracleResult && (
                      <article className="activity-oracle-result">
                        <img src={oracleResult.card.tarot} alt={oracleResult.card.name} onError={applyImageFallback} />
                        <div>
                          <span>d20 = {oracleResult.die} · {oracleResult.tone}</span>
                          <h3>{oracleResult.card.name}</h3>
                          <p>{oracleResult.card.narrative.questHook}</p>
                          <button type="button" className="codex-btn tarot-no-glow" onClick={() => navigate(oracleResult.card.lorePath)}>Открыть лор</button>
                        </div>
                      </article>
                    )}
                  </div>
                )}

                {selectedActivity.id === 'threads' && (
                  <div className="activity-link-grid">
                    {characters.map((character) => (
                      <button key={character.id} type="button" className="tarot-no-glow" onClick={() => navigate(character.lorePath)}>
                        <img src={character.avatar} alt="" onError={applyImageFallback} />
                        <span>{character.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                {selectedActivity.id === 'route' && (
                  <div className="activity-link-grid activity-link-grid--text">
                    {routeLinks.map((link) => <button key={link.path} type="button" onClick={() => navigate(link.path)}>{link.label}</button>)}
                  </div>
                )}

                {selectedActivity.id === 'archive' && (
                  <div className="activity-link-grid activity-link-grid--text">
                    {archiveLinks.map((link) => <button key={link.path} type="button" onClick={() => navigate(link.path)}>{link.label}</button>)}
                  </div>
                )}

                <div className="activity-modal__details">
                  <h4>Возможности</h4>
                  <ul>
                    {selectedActivity.details.map((detail) => (
                      <li key={detail}><Shield size={14} /> {detail}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </Layout>
  );
};

export default ActivitiesPage;
