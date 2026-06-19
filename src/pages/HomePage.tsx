import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Send, MessageCircle, Users } from 'lucide-react';
import Layout from '@/components/Layout';
import CharacterCardDeck from '@/components/CharacterCardDeck';
import { homeTheme } from '@/types/theme';

// Contact / social icons are the ONLY icons allowed (req #6).
const socialLinks = [
  { label: 'YouTube', href: 'https://www.youtube.com/@Sigmarillion', icon: Youtube },
  { label: 'VK', href: 'https://vk.com/sigmarillion', icon: Users },
  { label: 'Telegram', href: 'https://t.me/SigmarillionDnD', icon: Send },
  { label: 'Discord', href: 'https://discord.gg/vyhKQTKhsw', icon: MessageCircle },
];

const HomePage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ part: string; title: string; url: string } | null>(null);
  const videos = [
    { part: 'Часть 1', title: 'Начало путешествия', url: 'https://www.youtube.com/embed/VIDEO_ID_1' },
    { part: 'Часть 2', title: 'Тени Бергхейма', url: 'https://www.youtube.com/embed/VIDEO_ID_2' },
    { part: 'Часть 3', title: 'Ледяная крепость', url: 'https://www.youtube.com/embed/VIDEO_ID_3' },
  ];

  const BASE_URL = import.meta.env.BASE_URL;

  return (
    <Layout>
      <header className="home-hero">
        <div className="home-hero-eyebrow">DND</div>
        <div className="home-hero-sub">BLOOD ICE</div>
        <h1 className="home-hero-title">Драконья Сага</h1>
        <p className="home-hero-lead">
          Авторская НРИ на базе D&amp;D: древние тайны, дворцовые интриги и герои,
          чьи судьбы уже легли на карты Таро.
        </p>
      </header>

      <section className="home-tarot">
        <div className="rune-divider"><span>Карты Таро</span></div>
        <CharacterCardDeck />
      </section>

      <section className="home-about">
        <div className="rune-divider"><span>О игре</span></div>
        <p className="home-about-p">
          <strong>Драконья Сага</strong> — приключение в авторском мире, где личные истории героев
          переплетаются с древними тайнами и силами за пределами понимания смертных.
        </p>
        <p className="home-about-p">
          Наша компания <strong>[Драконья Сага]</strong> объединяет любителей настольных ролевых игр,
          вместе создающих общую легенду.
        </p>
      </section>

      <section className="home-videos">
        <div className="rune-divider"><span>Видео</span></div>
        <div className="home-videos-grid">
          {videos.map((video, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedVideo(video)}
              className="home-video-card tarot-no-glow"
            >
              <img
                src={`${BASE_URL}videos/thumbnail.jpg`}
                alt={video.title}
                loading="lazy"
                decoding="async"
              />
              <span className="home-video-play">Смотреть</span>
              <div className="home-video-meta">
                <span className="home-video-part">{video.part}</span>
                <span className="home-video-title">{video.title}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="home-socials">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="home-social-link tarot-no-glow"
              aria-label={label}
              style={{ borderColor: homeTheme.border }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="home-video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="home-video-modal-inner"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="home-video-modal-close tarot-no-glow"
                aria-label="Закрыть"
              >
                Закрыть
              </button>
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="home-footer">BLOOD ICE</footer>
    </Layout>
  );
};

export default HomePage;
