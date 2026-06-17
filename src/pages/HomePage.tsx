import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Send, MessageCircle, Users } from 'lucide-react';
import Layout from '@/components/Layout';
import CharacterCardDeck from '@/components/CharacterCardDeck';
import { homeTheme } from '@/types/theme';

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

  const BASE = import.meta.env.BASE_URL;

  return (
    <Layout theme={homeTheme} particleCount={24}>
      <div className="max-w-[1120px] mx-auto px-4 md:px-8 pb-14 pt-7 md:pt-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pb-3 md:pb-4 mb-3 md:mb-4"
        >
          <div
            className="text-3xl md:text-5xl font-black tracking-[8px] md:tracking-[12px] uppercase mb-2"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: homeTheme.parchment,
              textShadow: '0 0 20px rgba(160,150,130,0.2), 0 2px 6px rgba(0,0,0,0.9)',
            }}
          >
            DND
          </div>
          <div className="rune-divider my-2" style={{ '--divider-color': homeTheme.primary, '--divider-text': homeTheme.primaryGlow } as React.CSSProperties}>
            <span>ᛚᛟᚾᛖ ᚹᛟᛚᚠ</span>
          </div>
          <h1
            className="text-xl md:text-3xl font-bold tracking-[3px] leading-tight my-2"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: homeTheme.silver,
              textShadow: '0 0 15px rgba(144,152,160,0.15), 0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Драконья Сага
          </h1>
          <p
            className="text-sm md:text-base italic max-w-[640px] mx-auto leading-relaxed mt-3"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: homeTheme.parchmentDim,
              letterSpacing: '1px',
            }}
          >
            Авторская НРИ на базе D&D: древние тайны, дворцовые интриги и герои, чьи судьбы уже легли на карты Таро.
          </p>
        </motion.header>

        {/* Карты Таро – теперь сразу после хедера */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-5 md:mb-6"
        >
          <div className="section-header !mt-3 !mb-2" style={{ '--section-border': 'rgba(80,70,50,0.15)', '--section-icon-color': homeTheme.primaryGlow, '--section-title-color': homeTheme.primaryGlow, '--section-line-color': homeTheme.primary } as React.CSSProperties}>
            <h2 className="section-title">Карты Таро</h2>
            <div className="section-line" />
          </div>
          <CharacterCardDeck />
        </motion.section>

        {/* О игре – теперь ниже карт */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-5 md:mb-6"
        >
          <div className="section-header !mt-3 !mb-3" style={{ '--section-border': 'rgba(80,70,50,0.15)', '--section-icon-color': homeTheme.primaryGlow, '--section-title-color': homeTheme.primaryGlow, '--section-line-color': homeTheme.primary } as React.CSSProperties}>
            <h2 className="section-title">О игре</h2>
            <div className="section-line" />
          </div>
          <div
            className="p-4 md:p-5 rounded grid gap-3 md:grid-cols-[1.25fr_1fr] md:items-center"
            style={{
              background: 'rgba(20,15,10,0.28)',
              border: '1px solid rgba(80,70,50,0.15)',
            }}
          >
            <p className="text-left md:text-justify leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: homeTheme.parchment }}>
              <strong style={{ color: homeTheme.primaryBright }}>Драконья Сага</strong> — приключение в авторском мире, где личные истории героев переплетаются с древними тайнами и силами за пределами понимания смертных.
            </p>
            <p className="text-left md:text-justify leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: homeTheme.parchment }}>
              Наша компания <strong style={{ color: homeTheme.primaryBright }}>[Драконья Сага]</strong> объединяет любителей настольных ролевых игр, вместе создающих общую легенду.
            </p>
          </div>
        </motion.section>

        {/* Videos with modal player */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-12"
        >
          <div className="section-header" style={{ '--section-border': 'rgba(80,70,50,0.15)', '--section-icon-color': homeTheme.primaryGlow, '--section-title-color': homeTheme.primaryGlow, '--section-line-color': homeTheme.primary } as React.CSSProperties}>
            <h2 className="section-title">Видео</h2>
            <div className="section-line" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((video, idx) => (
              <motion.div
                key={video.part}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + idx * 0.08 }}
                className="rounded overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  background: 'rgba(20,15,10,0.3)',
                  border: '1px solid rgba(80,70,50,0.15)',
                }}
                whileHover={{
                  borderColor: 'rgba(106,84,48,0.3)',
                  y: -3,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                }}
                onClick={() => setSelectedVideo(video)}
              >
                <div
                  className="w-full h-40 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30,25,20,0.5) 0%, rgba(15,12,8,0.3) 100%)',
                  }}
                >
                  <img
                    src={`${BASE}videos/thumbnail.jpg`}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity group-hover:opacity-80"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg z-10"
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: `2px solid ${homeTheme.primaryGlow}`,
                      color: homeTheme.primaryGlow,
                    }}
                  >
                    ▶
                  </div>
                </div>
                <div className="p-4">
                  <div
                    className="text-xs tracking-[2px] mb-1"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      color: homeTheme.primaryGlow,
                    }}
                  >
                    {video.part}
                  </div>
                  <div
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: homeTheme.silver,
                    }}
                  >
                    {video.title}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Modal for video */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
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
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white text-2xl flex items-center justify-center hover:bg-black/80 transition-colors"
                  onClick={() => setSelectedVideo(null)}
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-3 mt-10 pt-8 flex-wrap"
          style={{ borderTop: '1px solid rgba(80,70,50,0.1)' }}
        >
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="px-4 py-2.5 rounded text-xs tracking-[2px] transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              style={{
                fontFamily: "'Cinzel', serif",
                background: 'rgba(30,25,15,0.3)',
                border: '1px solid rgba(80,70,50,0.2)',
                color: homeTheme.parchmentDim,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(106,84,48,0.35)';
                (e.currentTarget as HTMLElement).style.color = homeTheme.parchment;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(80,70,50,0.2)';
                (e.currentTarget as HTMLElement).style.color = homeTheme.parchmentDim;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <Icon size={15} />
              {label}
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-12 pt-6" style={{ borderTop: '1px solid rgba(80,70,50,0.1)' }}>
          <div
            className="text-lg tracking-[8px] opacity-40"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: homeTheme.primary,
            }}
          >
            BLOOD ICE
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
