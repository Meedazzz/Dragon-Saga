import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Compass, Dices, Map, MessageCircle, Play, Send, Sparkles, Users, Youtube, ChevronDown, Sword, Shield, Scroll } from 'lucide-react';
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

const quickStats = [
  { icon: Users, value: characters.length, label: 'Героев', color: '#e6e6fa' },
  { icon: Sparkles, value: tarotCards.length, label: 'Карт Таро', color: '#f59e0b' },
  { icon: Sword, value: '∞', label: 'Приключений', color: '#ef4444' },
  { icon: Shield, value: '5', label: 'Сезонов', color: '#34d399' },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const BASE = import.meta.env.BASE_URL;
  const [selectedVideo, setSelectedVideo] = useState<{ part: string; title: string; url: string } | null>(null);
  const [expandedCard, setExpandedCard] = useState<CharacterConfig | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  }, []);

  return (
    <Layout theme={homeTheme} particleCount={26} overlayMode={!!expandedCard}>
      <main className="dragon-home">
        {/* HERO SECTION - Clean & Impactful */}
        <motion.section
          className="saga-hero-v2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="saga-hero-v2__bg">
            <div className="saga-hero-v2__orb saga-hero-v2__orb--one" />
            <div className="saga-hero-v2__orb saga-hero-v2__orb--two" />
            <div className="saga-hero-v2__grid" />
          </div>

          <div className="saga-hero-v2__content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="saga-eyebrow-v2">🩸 Blood Ice × Dragon Saga × D&D Chronicles</span>
              <h1 className="saga-title-v2">
                <span className="saga-title-v2__main">Драконья</span>
                <span className="saga-title-v2__accent">Сага</span>
              </h1>
              <p className="saga-lead-v2">
                Эпическая D&D кампания в мире Бергхейма. Пять судеб, сплетённых нитями войны, 
                магии и древних пророчеств. Откройте историю, которую ещё никто не рассказывал.
              </p>
            </motion.div>

            <motion.div 
              className="saga-hero-v2__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button type="button" className="saga-btn saga-btn--primary tarot-no-glow" onClick={() => scrollTo('tarot-section')}>
                <Sparkles size={17} /> Раскрыть судьбу
              </button>
              <button type="button" className="saga-btn saga-btn--ghost tarot-no-glow" onClick={() => scrollTo('characters-section')}>
                <Users size={17} /> Герои
              </button>
              <button type="button" className="saga-btn saga-btn--ghost tarot-no-glow" onClick={() => navigate('/activities')}>
                <Dices size={17} /> Активности
              </button>
              <button type="button" className="saga-btn saga-btn--ghost tarot-no-glow" onClick={() => navigate('/lor')}>
                <BookOpen size={17} /> Полный лор
              </button>
            </motion.div>

            <motion.div 
              className="saga-hero-v2__stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {quickStats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  className="saga-stat-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <stat.icon size={18} style={{ color: stat.color }} />
                  <span className="saga-stat-item__value">{stat.value}</span>
                  <span className="saga-stat-item__label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            className="saga-hero-v2__scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => scrollTo('characters-section')}
          >
            <ChevronDown size={24} className="animate-bounce" />
          </motion.div>
        </motion.section>

        {/* QUICK NAV - Sticky on scroll */}
        <motion.nav
          className="home-quick-nav-v2"
          aria-label="Быстрая навигация"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button type="button" onClick={() => scrollTo('characters-section')}><Users size={15} /> Герои</button>
          <button type="button" onClick={() => scrollTo('tarot-section')}><Sparkles size={15} /> Таро</button>
          <button type="button" onClick={() => navigate('/activities')}><Dices size={15} /> Активности</button>
          <button type="button" onClick={() => navigate('/letopis')}><Compass size={15} /> Летопись</button>
          <button type="button" onClick={() => navigate('/map/sever')}><Map size={15} /> Карта</button>
        </motion.nav>

        {/* CHARACTERS SECTION */}
        <motion.section
          id="characters-section"
          className="saga-section scroll-mt-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="saga-section-head">
            <div>
              <span className="saga-eyebrow">⚔️ Герои</span>
              <h2>Пять душ, связанных нитью судьбы</h2>
            </div>
            <p>Каждый из них несёт бремя прошлого и надежду на будущее. Их пути переплелись в огне битв и холоде предательства.</p>
          </div>

          <div className="saga-character-grid-v2">
            {characters.map((character, index) => (
              <motion.article
                key={character.id}
                className="saga-character-card-v2"
                style={{ '--char-color': character.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <div className="saga-character-card-v2__glow" />
                <button 
                  type="button" 
                  className="saga-character-lore tarot-no-glow" 
                  onClick={() => navigate(character.lorePath)}
                >
                  ✦ Полный лор
                </button>
                <div className="saga-character-card-v2__image">
                  <img 
                    src={character.tarot} 
                    alt={character.name} 
                    loading="lazy" 
                    decoding="async" 
                    draggable={false} 
                    onError={applyImageFallback} 
                  />
                </div>
                <div className="saga-character-card-v2__body">
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

        {/* TAROT SECTION - With new 3D Fan */}
        <motion.section
          id="tarot-section"
          className="saga-section scroll-mt-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="saga-section-head">
            <div>
              <span className="saga-eyebrow">🔮 Карты Таро</span>
              <h2>Карты судьбы: перекрёстки, кровь и древние клятвы</h2>
            </div>
            <p>Каждая карта — отражение души героя. Переверните, чтобы увидеть истинное лицо. Перетащите, чтобы исследовать веер.</p>
          </div>

          <TarotFan onExpandedChange={setExpandedCard} />
        </motion.section>

        {/* ACTIVITIES PREVIEW */}
        <motion.section
          id="activities-preview"
          className="saga-section saga-activity-preview-v2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="saga-section-head">
            <div>
              <span className="saga-eyebrow">🎲 Активности партии</span>
              <h2>Инструменты для вашей партии</h2>
            </div>
            <p>Всё необходимое для погружения в мир: оракул, нити героев, маршруты и многое другое.</p>
          </div>

          <div className="saga-activity-cards-v2">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate('/activities')}
            >
              <div className="saga-activity-icon"><Dices /></div>
              <h3>Оракул</h3>
              <p>Бросок + d20 для решения судьбоносных вопросов.</p>
              <span className="saga-activity-link">Открыть →</span>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate('/activities')}
            >
              <div className="saga-activity-icon"><Users /></div>
              <h3>Нити героев</h3>
              <p>Связи между персонажами и их общая история.</p>
              <span className="saga-activity-link">Открыть →</span>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onClick={() => navigate('/activities')}
            >
              <div className="saga-activity-icon"><Compass /></div>
              <h3>Маршрут</h3>
              <p>Путеводитель по миру и ключевым локациям.</p>
              <span className="saga-activity-link">Открыть →</span>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate('/activities')}
            >
              <div className="saga-activity-icon"><Scroll /></div>
              <h3>Архив</h3>
              <p>Все записи, документы и найденные артефакты.</p>
              <span className="saga-activity-link">Открыть →</span>
            </motion.article>
          </div>

          <div className="saga-actions saga-actions--center">
            <button type="button" className="saga-btn saga-btn--primary tarot-no-glow" onClick={() => navigate('/activities')}>
              Перейти к активностям
            </button>
          </div>
        </motion.section>

        {/* ABOUT SECTION */}
        <motion.section
          className="saga-section"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="saga-section-head">
            <div>
              <span className="saga-eyebrow">📜 О проекте</span>
              <h2>Мир, рождённый во тьме</h2>
            </div>
            <p>Драконья Сага — это не просто D&D кампания. Это живой мир с собственной историей, культурой и тайнами, которые ждут своих героев.</p>
          </div>

          <div className="saga-about-grid prose-readable">
            <p><strong>Драконья Сага</strong> — захватывающая D&D кампания, разворачивающаяся в мире Бергхейма. Здесь переплетаются судьбы героев, древние пророчества и битвы, от которых дрожит земля.</p>
            <p>Кампания <strong>[Драконья Сага]</strong> ведётся уже несколько лет, и за это время мир оброс невероятным количеством лора, персонажей и историй, которые мы собрали на этом сайте.</p>
          </div>
        </motion.section>

        {/* VIDEOS SECTION */}
        <motion.section
          className="saga-section"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="saga-section-head">
            <div>
              <span className="saga-eyebrow">🎬 Хроники</span>
              <h2>Записи приключений</h2>
            </div>
            <p>Погрузитесь в атмосферу игры через записи наших сессий.</p>
          </div>

          <div className="saga-video-grid">
            {videos.map((video, idx) => (
              <motion.button
                key={video.part}
                type="button"
                className="saga-video-card tarot-no-glow"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + idx * 0.05 }}
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

        {/* VIDEO MODAL */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/82 backdrop-blur-sm z-[800] flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div 
                initial={{ scale: 0.92, y: 18 }} 
                animate={{ scale: 1, y: 0 }} 
                exit={{ scale: 0.92, y: 18 }} 
                className="relative w-full max-w-4xl aspect-video bg-black rounded-[18px] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe 
                  src={selectedVideo.url} 
                  title={selectedVideo.title} 
                  className="w-full h-full" 
                  loading="lazy" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                />
                <button 
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white text-xl flex items-center justify-center hover:bg-black/80 transition-colors tarot-no-glow"
                  onClick={() => setSelectedVideo(null)}
                  type="button"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
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
