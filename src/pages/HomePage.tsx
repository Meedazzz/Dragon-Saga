import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Compass, Dices, Map, MessageCircle, Play, Send, Sparkles, Users, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import CharacterCardDeck from '@/components/CharacterCardDeck';
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const BASE = import.meta.env.BASE_URL;
  const [selectedVideo, setSelectedVideo] = useState<{ part: string; title: string; url: string } | null>(null);
  const [expandedCard, setExpandedCard] = useState<CharacterConfig | null>(null);

  const heroCards = useMemo(() => tarotCards.slice(0, 3), []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Layout theme={homeTheme} particleCount={26} overlayMode={!!expandedCard}>
      <main className="dragon-home">
        <motion.section
          className="saga-hero"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="saga-hero__copy">
            <span className="saga-eyebrow">ᚠ Blood Ice · Dragon Saga · D&D Chronicles</span>
            <h1>Драконья Сага</h1>
            <p className="saga-lead">
              Авторская НРИ на базе D&D: тёмное фэнтези о родовой крови, Чёрном льде, северных дорогах и героях, чьи судьбы уже легли на карты Таро. Это вики мира, оракул для партии и вход в полный лор кампании.
            </p>
            <div className="saga-actions">
              <button type="button" className="saga-button saga-button--primary tarot-no-glow" onClick={() => scrollTo('tarot-section')}>
                <Sparkles size={17} /> Вытянуть карту
              </button>
              <button type="button" className="saga-button tarot-no-glow" onClick={() => scrollTo('characters-section')}>
                <Users size={17} /> Герои
              </button>
              <button type="button" className="saga-button tarot-no-glow" onClick={() => navigate('/activities')}>
                <Dices size={17} /> Активности
              </button>
              <button type="button" className="saga-button tarot-no-glow" onClick={() => navigate('/lor')}>
                <BookOpen size={17} /> Полный лор
              </button>
            </div>
            <div className="saga-metrics" aria-label="Разделы сайта">
              <span><b>{characters.length}</b> героев</span>
              <span><b>{tarotCards.length}</b> арканов</span>
              <span><b>∞</b> сцен</span>
            </div>
          </div>

          <div className="saga-hero__visual" aria-hidden="true">
            <div className="saga-orbit saga-orbit--one" />
            <div className="saga-orbit saga-orbit--two" />
            <div className="saga-card-stack">
              {heroCards.map((card, index) => (
                <img key={card.id} src={card.tarot} alt="" style={{ '--stack-index': index } as React.CSSProperties} draggable={false} onError={applyImageFallback} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.nav
          className="home-quick-nav"
          aria-label="Быстрые разделы"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <button type="button" onClick={() => scrollTo('characters-section')}><Users size={15} /> Персонажи</button>
          <button type="button" onClick={() => scrollTo('tarot-section')}><Sparkles size={15} /> Таро</button>
          <button type="button" onClick={() => navigate('/activities')}><Dices size={15} /> Активности</button>
          <button type="button" onClick={() => navigate('/letopis')}><Compass size={15} /> Летопись</button>
          <button type="button" onClick={() => navigate('/map/sever')}><Map size={15} /> Карта</button>
        </motion.nav>

        <motion.section
          id="characters-section"
          className="saga-section scroll-mt-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <div className="saga-section-head">
            <div>
              <span className="saga-eyebrow">ᛟ Персонажи</span>
              <h2>Герои, их страницы и быстрый вход в лор</h2>
            </div>
            <p>На карточках собраны лор, личные умения, подклассы и связанные страницы. Верхняя навигация на страницах персонажей теперь всегда ведёт к полному лору.</p>
          </div>
          <div className="saga-character-grid">
            {characters.map((character, index) => (
              <motion.article
                key={character.id}
                className="saga-character-card"
                style={{ '--char-color': character.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 + index * 0.04 }}
              >
                <button type="button" className="saga-character-lore tarot-no-glow" onClick={() => navigate(character.lorePath)}>
                  ↗ Полный лор
                </button>
                <img src={character.tarot} alt={character.name} loading="lazy" decoding="async" draggable={false} onError={applyImageFallback} />
                <div className="saga-character-card__body">
                  <h3>{character.name}</h3>
                  <p>{character.title}</p>
                  <div className="saga-character-actions">
                    {character.pages.slice(0, 2).map((page) => (
                      <button key={page.path} type="button" onClick={() => navigate(page.path)} className="tarot-no-glow">
                        {page.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="tarot-section"
          className="saga-section scroll-mt-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
        >
          <div className="saga-section-head">
            <div>
              <span className="saga-eyebrow">ᚱ Исправленная колода</span>
              <h2>Карты Таро: рубашка, лицевая сторона и расклады</h2>
            </div>
            <p>Колода использует одну общую рубашку и отдельные лицевые изображения каждого героя. Есть раскрытие всех карт, режим лора, карта дня и мини-игры для НРИ.</p>
          </div>
          <CharacterCardDeck onExpandedChange={setExpandedCard} />
        </motion.section>

        <motion.section
          id="activities-preview"
          className="saga-section saga-activity-preview"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="saga-section-head">
            <div>
              <span className="saga-eyebrow">ᛞ Новая вкладка</span>
              <h2>Активности для партии и ведущего</h2>
            </div>
            <p>Отдельный зал взаимодействий: оракул, связи персонажей, маршруты, печати и быстрые крючки для сцен.</p>
          </div>
          <div className="saga-activity-cards">
            <article><Dices /><h3>Оракул сцены</h3><p>Карта + d20 дают завязку и тон эпизода.</p></article>
            <article><Users /><h3>Нити героев</h3><p>Быстро показывает связанные страницы и лор.</p></article>
            <article><Compass /><h3>Маршрут</h3><p>Черновик путешествия по северным точкам мира.</p></article>
          </div>
          <div className="saga-actions saga-actions--center">
            <button type="button" className="saga-button saga-button--primary tarot-no-glow" onClick={() => navigate('/activities')}>
              Открыть активности
            </button>
          </div>
        </motion.section>

        <motion.section
          className="saga-section"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
        >
          <div className="saga-section-head">
            <div>
              <span className="saga-eyebrow">ᚲ О игре</span>
              <h2>Общий архив кампании</h2>
            </div>
            <p>Сайт остаётся вики мира, но теперь главная страница не выглядит как набор блоков: она ведёт игрока от героев к картам, лору, летописи и сценам.</p>
          </div>
          <div className="saga-about-grid prose-readable">
            <p><strong>Драконья Сага</strong> — приключение в авторском мире, где личные истории героев переплетаются с древними тайнами и силами за пределами понимания смертных.</p>
            <p>Наша компания <strong>[Драконья Сага]</strong> объединяет любителей настольных ролевых игр, вместе создающих общую легенду.</p>
          </div>
        </motion.section>

        <motion.section
          className="saga-section"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
        >
          <div className="saga-section-head">
            <div>
              <span className="saga-eyebrow">ᛗ Видео</span>
              <h2>Хроники партии</h2>
            </div>
            <p>Место для выпусков, записей сессий и внешних площадок.</p>
          </div>
          <div className="saga-video-grid">
            {videos.map((video, idx) => (
              <motion.button
                key={video.part}
                type="button"
                className="saga-video-card tarot-no-glow"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48 + idx * 0.05 }}
                onClick={() => setSelectedVideo(video)}
              >
                <img src={`${BASE}videos/thumbnail.jpg`} alt={video.title} loading="lazy" decoding="async" />
                <span><Play size={18} /></span>
                <b>{video.part}</b>
                <strong>{video.title}</strong>
              </motion.button>
            ))}
          </div>
        </motion.section>

        <AnimatePresence>
          {selectedVideo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/82 backdrop-blur-sm z-[800] flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
              <motion.div initial={{ scale: 0.92, y: 18 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 18 }} className="relative w-full max-w-4xl aspect-video bg-black rounded-[18px] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <iframe src={selectedVideo.url} title={selectedVideo.title} className="w-full h-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white text-xl flex items-center justify-center hover:bg-black/80 transition-colors tarot-no-glow" onClick={() => setSelectedVideo(null)}>×</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="saga-footer">
          <div className="saga-socials">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="tarot-no-glow">
                <Icon size={15} /> {label}
              </a>
            ))}
          </div>
          <div className="saga-footer-mark">BLOOD ICE</div>
        </footer>
      </main>
    </Layout>
  );
};

export default HomePage;
