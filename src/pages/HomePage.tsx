import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  Flame,
  MessageCircle,
  Play,
  Send,
  Shield,
  Sparkles,
  Users,
  Youtube,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import TarotFan from '@/components/TarotFan';
import { tarotBackImage } from '@/data/tarot';
import { homeTheme } from '@/types/theme';

/**
 * Социальные ссылки кампании.
 * Менять URL здесь, если переезжает YouTube/VK/Telegram/Discord.
 */
const socialLinks = [
  { label: 'YouTube', href: 'https://www.youtube.com/@Sigmarillion', icon: Youtube },
  { label: 'VK', href: 'https://vk.com/sigmarillion', icon: Users },
  { label: 'Telegram', href: 'https://t.me/SigmarillionDnD', icon: Send },
  { label: 'Discord', href: 'https://discord.gg/vyhKQTKhsw', icon: MessageCircle },
];

type VideoTab = 'episodes' | 'latest' | 'shorts';

interface SagaVideo {
  part: string;
  title: string;
  description: string;
  embedUrl: string;
  watchUrl: string;
}

/**
 * YouTube-настройки.
 * uploads playlist начинается с UU + channel id без первых двух символов UC.
 * Если канал сменится, поменяй `youtubeUploadsPlaylist` и ссылки ниже.
 */
const youtubeChannelUrl = 'https://www.youtube.com/@Sigmarillion';
const youtubeShortsUrl = 'https://www.youtube.com/@Sigmarillion/shorts';
const youtubeUploadsPlaylist = 'https://www.youtube.com/embed/videoseries?list=UU7IRkV7Cg7MznCecmQXCN1A';

/**
 * Ручной список ключевых записей кампании.
 * Автолента ниже показывает новые загрузки автоматически, но эти две записи оставлены как понятный вход для новых посетителей.
 */
const videos: SagaVideo[] = [
  {
    part: 'Часть 1',
    title: 'Dragon Saga. Часть 1. Знакомство',
    description: 'Старт кампании: герои встречаются в северной рыбацкой деревушке и находят первые зацепки.',
    embedUrl: 'https://www.youtube.com/embed/HgRX_wIi3mY?start=5473&autoplay=1&rel=0',
    watchUrl: 'https://www.youtube.com/watch?v=HgRX_wIi3mY&t=5473s',
  },
  {
    part: 'Часть 2',
    title: 'Dragon Saga. Часть 2. Деревенские проблемы',
    description: 'Угроза над деревней, первые решения партии и рост личных конфликтов.',
    embedUrl: 'https://www.youtube.com/embed/2_l8_ahjHx8?start=6621&autoplay=1&rel=0',
    watchUrl: 'https://www.youtube.com/watch?v=2_l8_ahjHx8&t=6621s',
  },
];

/**
 * HomePage — облегчённая главная страница.
 *
 * На главной оставлены только понятные входы: герои/Таро, лорбук и YouTube.
 * Активности мастера не удалены, но убраны с главной, чтобы посетитель не путался.
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const BASE = import.meta.env.BASE_URL;
  const [selectedVideo, setSelectedVideo] = useState<SagaVideo | null>(null);
  const [videoTab, setVideoTab] = useState<VideoTab>('episodes');
  const [expandedCard, setExpandedCard] = useState<unknown>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Layout theme={homeTheme} particleCount={22} overlayMode={!!expandedCard}>
      <main className="codex-home codex-home--simple">
        {/* Первый экран: суть кампании и декоративные рубашки карт. */}
        <section className="codex-hero codex-hero--simple" aria-labelledby="home-title">
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
            <span className="codex-kicker"><Flame size={16} /> НРИ · D&D 5e · северное тёмное фэнтези</span>
            <h1 id="home-title">Драконья Сага</h1>
            <p>
              Авторская кампания на базе D&D: пять героев, северные земли, древний лор, карты Таро и записи игровых сессий.
            </p>
            <div className="codex-actions">
              <button type="button" className="codex-btn codex-btn--primary tarot-no-glow" onClick={() => scrollTo('tarot-section')}>
                <Sparkles size={18} /> Герои и Таро
              </button>
              <button type="button" className="codex-btn tarot-no-glow" onClick={() => navigate('/lorebook')}>
                <BookOpen size={18} /> Лорбук
              </button>
              <button type="button" className="codex-btn tarot-no-glow" onClick={() => scrollTo('videos-section')}>
                <Youtube size={18} /> Записи
              </button>
            </div>
          </motion.div>

          <motion.div
            className="codex-hero__cards"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            aria-label="Рубашки карт Таро Драконьей Саги"
          >
            <div className="codex-card-altar codex-card-altar--backs">
              {Array.from({ length: 5 }).map((_, index) => (
                <img
                  key={`tarot-back-${index}`}
                  src={tarotBackImage}
                  alt="Рубашка карты Таро"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  style={{ '--i': index } as React.CSSProperties}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Быстрая навигация: только то, что нужно посетителю. */}
        <nav className="codex-quick-nav codex-quick-nav--simple" aria-label="Быстрая навигация">
          <button type="button" onClick={() => scrollTo('tarot-section')}><Sparkles size={15} /> Герои и Таро</button>
          <button type="button" onClick={() => navigate('/lorebook')}><BookOpen size={15} /> Лор</button>
          <button type="button" onClick={() => scrollTo('videos-section')}><Youtube size={15} /> YouTube</button>
        </nav>

        {/* Единый блок: герои + Таро. Карты открывают краткий лор и ссылки на страницы героев. */}
        <section id="tarot-section" className="codex-section codex-section--wide scroll-mt-16">
          <div className="codex-section-head">
            <span className="codex-kicker"><Sparkles size={16} /> Герои и карты</span>
            <h2>Пять героев партии</h2>
            <p>Раскройте веер карт, рассмотрите героя, переверните рубашку и перейдите на его страницу лора.</p>
          </div>
          <TarotFan onExpandedChange={setExpandedCard} />
        </section>

        {/* Видео: две ключевые записи, автолента канала и отдельный вход в Shorts. */}
        <section className="codex-section" id="videos-section">
          <div className="codex-section-head">
            <span className="codex-kicker"><Play size={16} /> YouTube</span>
            <h2>Записи игровых сессий</h2>
            <p>Смотрите полные записи прямо на сайте или откройте канал, чтобы следить за новыми выпусками.</p>
          </div>

          <div className="codex-video-tabs" role="tablist" aria-label="Категории видео">
            <button type="button" className={videoTab === 'episodes' ? 'is-active tarot-no-glow' : 'tarot-no-glow'} onClick={() => setVideoTab('episodes')}>Записи</button>
            <button type="button" className={videoTab === 'latest' ? 'is-active tarot-no-glow' : 'tarot-no-glow'} onClick={() => setVideoTab('latest')}>Автолента</button>
            <button type="button" className={videoTab === 'shorts' ? 'is-active tarot-no-glow' : 'tarot-no-glow'} onClick={() => setVideoTab('shorts')}>Shorts</button>
          </div>

          {videoTab === 'episodes' && (
            <div className="codex-video-grid">
              {videos.map((video) => (
                <button key={video.part} type="button" className="codex-video-card tarot-no-glow" onClick={() => setSelectedVideo(video)}>
                  <img src={`${BASE}videos/thumbnail.jpg`} alt={video.title} loading="eager" decoding="async" />
                  <span><Play size={18} /></span>
                  <b>{video.part}</b>
                  <strong>{video.title}</strong>
                  <em>{video.description}</em>
                </button>
              ))}
            </div>
          )}

          {videoTab === 'latest' && (
            <div className="codex-video-live-panel">
              <div>
                <span className="codex-kicker"><Youtube size={16} /> Автоматическая лента</span>
                <h3>Последние загрузки Sigmarillion</h3>
                <p>Этот блок использует uploads-плейлист YouTube. Когда на канале появляется новая запись, YouTube сам поднимает её в этой ленте.</p>
                <a className="codex-btn codex-btn--primary tarot-no-glow" href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer">Открыть канал</a>
              </div>
              <iframe
                src={youtubeUploadsPlaylist}
                title="Последние видео Sigmarillion"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}

          {videoTab === 'shorts' && (
            <div className="codex-shorts-panel">
              <div className="codex-shorts-card">
                <Youtube size={28} />
                <h3>Shorts Dragon Saga</h3>
                <p>Короткие нарезки вынесены отдельно, чтобы не смешивать их с полными сессиями.</p>
                <a className="codex-btn codex-btn--primary tarot-no-glow" href={youtubeShortsUrl} target="_blank" rel="noopener noreferrer">Открыть Shorts</a>
              </div>
              <div className="codex-shorts-note">
                <strong>Автообновление:</strong> новые shorts также могут попадать в общую автоленту канала, если YouTube добавляет их в uploads-плейлист.
              </div>
            </div>
          )}
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
                <iframe src={selectedVideo.embedUrl} title={selectedVideo.title} className="w-full h-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                <a className="video-modal-youtube-link tarot-no-glow" href={selectedVideo.watchUrl} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
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
          <div className="codex-footer__mark"><Shield size={16} /> D&D CHRONICLES</div>
        </footer>
      </main>
    </Layout>
  );
};

export default HomePage;
