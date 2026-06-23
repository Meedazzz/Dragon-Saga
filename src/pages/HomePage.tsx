import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  Castle,
  Compass,
  Dices,
  Flame,
  Map,
  MessageCircle,
  Play,
  ScrollText,
  Send,
  Shield,
  Sparkles,
  Swords,
  Users,
  Youtube,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import TarotFan from '@/components/TarotFan';
import { characters } from '@/data/characters';
import { tarotCards } from '@/data/tarot';
import { applyImageFallback } from '@/lib/imageFallback';
import { homeTheme } from '@/types/theme';
import type { CharacterConfig } from '@/data/characters';

const socialLinks = [
  { label: 'YouTube', href: 'https://www.youtube.com/@Sigmarillion', icon: Youtube },
  { label: 'VK', href: 'https://vk.com/sigmarillion', icon: Users },
  { label: 'Telegram', href: 'https://t.me/SigmarillionDnD', icon: Send },
  { label: 'Discord', href: 'https://discord.gg/vyhKQTKhsw', icon: MessageCircle },
];

const videos = [
  { part: 'Часть 1', title: 'Начало путешествия', url: 'https://www.youtube.com/embed/VIDEO_ID_1' },
  { part: 'Часть 2', title: 'Тени Бергхейма', url: 'https://www.youtube.com/embed/VIDEO_ID_2' },
  { part: 'Часть 3', title: 'Ледяная крепость', url: 'https://www.youtube.com/embed/VIDEO_ID_3' },
];

const worldLinks = [
  { title: 'Полный лор', desc: 'Единый архив героев, домов и древних клятв.', path: '/lor', icon: BookOpen },
  { title: 'Летопись', desc: 'Хронология мира и событий кампании.', path: '/letopis', icon: ScrollText },
  { title: 'Карта Севера', desc: 'Маршруты, границы и ключевые точки путешествия.', path: '/map/sever', icon: Map },
];

/**
 * HomePage — главная страница-кодекс.
 *
 * Структура:
 * 1. codex-hero — первое впечатление, крупный заголовок и стопка карт.
 * 2. codex-quick-nav — липкая навигация по блокам главной.
 * 3. characters-section — карточки героев и быстрые переходы.
 * 4. tarot-section — интерактивная колода TarotFan.
 * 5. world-section — вход в лор, летопись и карты.
 * 6. activity-band/video/footer — инструменты партии, хроники и соцсети.
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const BASE = import.meta.env.BASE_URL;
  const [selectedVideo, setSelectedVideo] = useState<{ part: string; title: string; url: string } | null>(null);
  const [expandedCard, setExpandedCard] = useState<CharacterConfig | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Layout theme={homeTheme} particleCount={28} overlayMode={!!expandedCard}>
      <main className="codex-home">
        <section className="codex-hero" aria-labelledby="home-title">
          <div className="codex-hero__ambient" aria-hidden="true">
            <span className="codex-hero__ring codex-hero__ring--one" />
            <span className="codex-hero__ring codex-hero__ring--two" />
            <span className="codex-hero__runes">ᚠ ᚱ ᚢ ᚨ ᛟ ᛞ ᛗ ᛉ</span>
          </div>

          <motion.div
            className="codex-hero__copy"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="codex-kicker"><Flame size={16} /> Blood Ice · Dragon Saga · D&D Chronicles</span>
            <h1 id="home-title">Драконья Сага</h1>
            <p>
              Темная фэнтези-вики кампании: герои, карты Таро, летопись, маршруты и инструменты мастера собраны как единый живой кодекс мира.
            </p>
            <div className="codex-actions">
              <button type="button" className="codex-btn codex-btn--primary tarot-no-glow" onClick={() => scrollTo('tarot-section')}>
                <Sparkles size={18} /> Раскрыть судьбу
              </button>
              <button type="button" className="codex-btn tarot-no-glow" onClick={() => scrollTo('characters-section')}>
                <Users size={18} /> Герои
              </button>
              <button type="button" className="codex-btn tarot-no-glow" onClick={() => navigate('/activities')}>
                <Dices size={18} /> Активности
              </button>
              <button type="button" className="codex-btn tarot-no-glow" onClick={() => navigate('/lor')}>
                <BookOpen size={18} /> Полный лор
              </button>
            </div>

            <div className="codex-stats" aria-label="Состав архива">
              <span><b>{characters.length}</b><small>героев</small></span>
              <span><b>{tarotCards.length}</b><small>арканов</small></span>
              <span><b>2</b><small>карты мира</small></span>
              <span><b>∞</b><small>сцен</small></span>
            </div>
          </motion.div>

          <motion.div
            className="codex-hero__cards"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            aria-label="Герои Драконьей Саги"
          >
            <div className="codex-card-altar">
              {tarotCards.slice(0, 5).map((card, index) => (
                <img
                  key={card.id}
                  src={card.tarot}
                  alt={card.name}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  onError={applyImageFallback}
                  style={{ '--i': index } as React.CSSProperties}
                />
              ))}
            </div>
          </motion.div>
        </section>

        <nav className="codex-quick-nav" aria-label="Быстрая навигация">
          <button type="button" onClick={() => scrollTo('characters-section')}><Users size={15} /> Герои</button>
          <button type="button" onClick={() => scrollTo('tarot-section')}><Sparkles size={15} /> Таро</button>
          <button type="button" onClick={() => scrollTo('world-section')}><Compass size={15} /> Мир</button>
          <button type="button" onClick={() => navigate('/activities')}><Dices size={15} /> Активности</button>
          <button type="button" onClick={() => navigate('/letopis')}><ScrollText size={15} /> Летопись</button>
        </nav>

        <section id="characters-section" className="codex-section scroll-mt-16">
          <div className="codex-section-head">
            <span className="codex-kicker"><Swords size={16} /> Персонажи</span>
            <h2>Пять героев, пять личных легенд</h2>
            <p>Карточки работают как страницы персонажей на сайтах больших вселенных: портрет, роль, быстрый лор и связанные материалы без лишнего шума.</p>
          </div>

          <div className="codex-character-grid">
            {characters.map((character, index) => (
              <motion.article
                key={character.id}
                className="codex-character-card"
                style={{ '--character-color': character.color } as React.CSSProperties}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <button type="button" className="codex-card-lore tarot-no-glow" onClick={() => navigate(character.lorePath)}>
                  ↗ Полный лор
                </button>
                <div className="codex-character-card__image">
                  <img src={character.tarot} alt={character.name} loading="eager" decoding="async" draggable={false} onError={applyImageFallback} />
                </div>
                <div className="codex-character-card__body">
                  <span>{character.title}</span>
                  <h3>{character.name}</h3>
                  <p>{character.desc}</p>
                  <div className="codex-chip-row">
                    {character.pages.slice(0, 3).map((page) => (
                      <button key={page.path} type="button" className="tarot-no-glow" onClick={() => navigate(page.path)}>{page.label}</button>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="tarot-section" className="codex-section codex-section--wide scroll-mt-16">
          <div className="codex-section-head">
            <span className="codex-kicker"><Sparkles size={16} /> Оракул</span>
            <h2>Таро героев без битых лицевых сторон</h2>
            <p>Колода использует корректные пути, одну рубашку и fallback на PNG. Раскройте все карты или выберите одну, чтобы рассмотреть аркан.</p>
          </div>
          <TarotFan onExpandedChange={setExpandedCard} />
        </section>

        <section id="world-section" className="codex-section scroll-mt-16">
          <div className="codex-section-head">
            <span className="codex-kicker"><Castle size={16} /> Атлас мира</span>
            <h2>Лор, летопись и карты соединены в один маршрут</h2>
            <p>Раздел мира теперь ощущается как навигационный центр: куда идти игроку, где искать историю и что открыть ведущему.</p>
          </div>
          <div className="codex-world-grid">
            {worldLinks.map(({ title, desc, path, icon: Icon }) => (
              <button key={path} type="button" className="codex-world-card tarot-no-glow" onClick={() => navigate(path)}>
                <Icon size={24} />
                <strong>{title}</strong>
                <span>{desc}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="codex-section codex-activity-band">
          <div className="codex-section-head">
            <span className="codex-kicker"><Dices size={16} /> Инструменты партии</span>
            <h2>Активности стали отдельным залом управления сценами</h2>
            <p>Оракул, нити героев, маршрут и архив собраны как быстрые инструменты мастера.</p>
          </div>
          <div className="codex-actions codex-actions--center">
            <button type="button" className="codex-btn codex-btn--primary tarot-no-glow" onClick={() => navigate('/activities')}>
              Открыть активности
            </button>
          </div>
        </section>

        <section className="codex-section">
          <div className="codex-section-head">
            <span className="codex-kicker"><Play size={16} /> Хроники</span>
            <h2>Записи приключений</h2>
            <p>Место для сессий, трейлеров и материалов кампании.</p>
          </div>
          <div className="codex-video-grid">
            {videos.map((video) => (
              <button key={video.part} type="button" className="codex-video-card tarot-no-glow" onClick={() => setSelectedVideo(video)}>
                <img src={`${BASE}videos/thumbnail.jpg`} alt={video.title} loading="eager" decoding="async" />
                <span><Play size={18} /></span>
                <b>{video.part}</b>
                <strong>{video.title}</strong>
              </button>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[800] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                className="relative w-full max-w-4xl aspect-video bg-black rounded-[18px] overflow-hidden shadow-2xl"
                initial={{ scale: 0.92, y: 18 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 18 }}
                onClick={(e) => e.stopPropagation()}
              >
                <iframe src={selectedVideo.url} title={selectedVideo.title} className="w-full h-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white text-xl flex items-center justify-center tarot-no-glow" onClick={() => setSelectedVideo(null)} type="button">×</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="codex-footer">
          <div className="codex-socials">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="tarot-no-glow">
                <Icon size={15} /> {label}
              </a>
            ))}
          </div>
          <div className="codex-footer__mark"><Shield size={16} /> BLOOD ICE</div>
        </footer>
      </main>
    </Layout>
  );
};

export default HomePage;
