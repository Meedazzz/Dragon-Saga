import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import CharacterCardDeck from '@/components/CharacterCardDeck';
import { homeTheme } from '@/types/theme';

const HomePage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ part: string; title: string; url: string } | null>(null);
  const videos = [
    { part: 'Часть 1', title: 'Начало путешествия', url: 'https://www.youtube.com/embed/VIDEO_ID_1' },
    { part: 'Часть 2', title: 'Тени Бергхейма', url: 'https://www.youtube.com/embed/VIDEO_ID_2' },
    { part: 'Часть 3', title: 'Ледяная крепость', url: 'https://www.youtube.com/embed/VIDEO_ID_3' },
    { part: 'Часть 4', title: 'Духи древности', url: 'https://www.youtube.com/embed/VIDEO_ID_4' },
    { part: 'Часть 5', title: 'Кровь и честь', url: 'https://www.youtube.com/embed/VIDEO_ID_5' },
  ];

  return (
    <Layout theme={homeTheme} particleCount={40}>
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 pb-16 pt-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pb-8 mb-8"
        >
          <div
            className="text-4xl md:text-6xl font-black tracking-[12px] uppercase mb-3"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: homeTheme.parchment,
              textShadow: '0 0 20px rgba(160,150,130,0.2), 0 2px 6px rgba(0,0,0,0.9)',
            }}
          >
            DND
          </div>
          <div className="rune-divider" style={{ '--divider-color': homeTheme.primary, '--divider-text': homeTheme.primaryGlow } as React.CSSProperties}>
            <span>LETO</span>
          </div>
          <h1
            className="text-xl md:text-3xl font-bold tracking-[3px] leading-tight my-3"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: homeTheme.silver,
              textShadow: '0 0 15px rgba(144,152,160,0.15), 0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Драконья Сага
          </h1>
          <div className="rune-divider" style={{ '--divider-color': homeTheme.primary, '--divider-text': homeTheme.primaryGlow } as React.CSSProperties}>
            <span>PISE</span>
          </div>
          <p
            className="text-sm md:text-base italic max-w-[500px] mx-auto leading-relaxed mt-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: homeTheme.parchmentDim,
              letterSpacing: '1px',
            }}
          >
            Проект НРИ на базе D&D вдохновенный Сильмариллионом и Песней Льда и Пламени
          </p>
        </motion.header>

        {/* About */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="section-header" style={{ '--section-border': 'rgba(80,70,50,0.15)', '--section-icon-color': homeTheme.primaryGlow, '--section-title-color': homeTheme.primaryGlow, '--section-line-color': homeTheme.primary } as React.CSSProperties}>
            <span className="section-icon">&#128220;</span>
            <h2 className="section-title">О проекте</h2>
            <div className="section-line" />
          </div>
          <div
            className="p-6 rounded"
            style={{
              background: 'rgba(20,15,10,0.3)',
              border: '1px solid rgba(80,70,50,0.15)',
            }}
          >
            <p className="mb-4 text-justify leading-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: homeTheme.parchment }}>
              <strong style={{ color: homeTheme.primaryBright }}>Драконья Сага</strong> — это захватывающее приключение в авторском мире, где судьбы героев переплетаются с древними тайнами, дворцовыми интригами и силами, выходящими за пределы понимания смертных.
            </p>
            <p className="mb-4 text-justify leading-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: homeTheme.parchment }}>
              Наша компания — <strong style={{ color: homeTheme.primaryBright }}>[Драконья Сага]</strong> — объединяет страстных любителей настольных ролевых игр, вместе создающих уникальные истории.
            </p>
            <p className="mb-4 text-justify leading-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: homeTheme.parchment }}>
              В этом проекте мы собрали <strong style={{ color: homeTheme.primaryBright }}>летопись наших героев</strong> — их личные умения, предыстории, связи и тайны.
            </p>
            <p className="text-justify leading-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: homeTheme.parchment }}>
              Присоединяйтесь к нам в этом путешествии. <strong style={{ color: homeTheme.primaryBright }}> Наша общая Легенда только начинается.</strong>
            </p>
          </div>
        </motion.section>

        {/* Characters with Tarot Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="section-header" style={{ '--section-border': 'rgba(80,70,50,0.15)', '--section-icon-color': homeTheme.primaryGlow, '--section-title-color': homeTheme.primaryGlow, '--section-line-color': homeTheme.primary } as React.CSSProperties}>
            <span className="section-icon">&#9876;</span>
            <h2 className="section-title">Персонажи</h2>
            <div className="section-line" />
          </div>

          <CharacterCardDeck />
        </motion.section>

        {/* Videos with modal player */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="section-header" style={{ '--section-border': 'rgba(80,70,50,0.15)', '--section-icon-color': homeTheme.primaryGlow, '--section-title-color': homeTheme.primaryGlow, '--section-line-color': homeTheme.primary } as React.CSSProperties}>
            <span className="section-icon">&#127916;</span>
            <h2 className="section-title">Видео</h2>
            <div className="section-line" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((video, idx) => (
              <motion.div
                key={video.part}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
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
                  className="w-full h-40 flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30,25,20,0.5) 0%, rgba(15,12,8,0.3) 100%)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg"
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: `2px solid ${homeTheme.primaryGlow}`,
                      color: homeTheme.primaryGlow,
                    }}
                  >
                    &#9654;
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
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white text-2xl flex items-center justify-center hover:bg-black/80 transition-colors"
                  onClick={() => setSelectedVideo(null)}
                >
                  &times;
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4 mt-10 pt-8 flex-wrap"
          style={{ borderTop: '1px solid rgba(80,70,50,0.1)' }}
        >
          {[
            { label: 'YouTube', href: 'https://www.youtube.com/@Sigmarillion' },
            { label: 'VK', href: 'https://vk.com/sigmarillion' },
            { label: 'Telegram', href: 'https://t.me/SigmarillionDnD' },
            { label: 'Discord', href: 'https://discord.gg/vyhKQTKhsw' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded text-xs tracking-[2px] transition-all duration-200 cursor-pointer inline-block"
              style={{
                fontFamily: "'Cinzel', serif",
                background: 'rgba(30,25,15,0.3)',
                border: '1px solid rgba(80,70,50,0.2)',
                color: homeTheme.parchmentDim,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = 'rgba(106,84,48,0.35)';
                (e.target as HTMLElement).style.color = homeTheme.parchment;
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = 'rgba(80,70,50,0.2)';
                (e.target as HTMLElement).style.color = homeTheme.parchmentDim;
                (e.target as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {link.label}
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
