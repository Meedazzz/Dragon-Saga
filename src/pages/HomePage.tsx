import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Send, MessageCircle, Users } from 'lucide-react';
import Layout from '@/components/Layout';
import CharacterCardDeck from '@/components/CharacterCardDeck';
import { homeTheme } from '@/types/theme';
import type { CharacterConfig } from '@/data/characters';

const socialLinks = [
  { label: 'YouTube', href: 'https://www.youtube.com/@Sigmarillion', icon: Youtube },
  { label: 'VK', href: 'https://vk.com/sigmarillion', icon: Users },
  { label: 'Telegram', href: 'https://t.me/SigmarillionDnD', icon: Send },
  { label: 'Discord', href: 'https://discord.gg/vyhKQTKhsw', icon: MessageCircle },
];

const HomePage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ part: string; title: string; url: string } | null>(null);
  const [expandedCard, setExpandedCard] = useState<CharacterConfig | null>(null);
  const videos = [
    { part: 'Часть 1', title: 'Начало путешествия', url: 'https://www.youtube.com/embed/VIDEO_ID_1' },
    { part: 'Часть 2', title: 'Тени Бергхейма', url: 'https://www.youtube.com/embed/VIDEO_ID_2' },
    { part: 'Часть 3', title: 'Ледяная крепость', url: 'https://www.youtube.com/embed/VIDEO_ID_3' },
  ];

  const BASE = import.meta.env.BASE_URL;

  return (
    <Layout theme={homeTheme} particleCount={22} overlayMode={!!expandedCard}>
      <div className="max-w-[1120px] mx-auto px-4 md:px-8 pb-14 pt-7 md:pt-10">
        {/* Header */}
        <motion.header initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center pb-4 md:pb-6 mb-3 md:mb-5">
          <div className="text-3xl md:text-5xl font-black tracking-[9px] md:tracking-[14px] uppercase mb-2" style={{ fontFamily: "'Cinzel Decorative', serif", color: homeTheme.silverBright, textShadow: `0 0 24px ${homeTheme.primaryGlow}28, 0 2px 10px rgba(0,0,0,0.9)` }}>
            DND
          </div>
          <div className="rune-divider my-3" style={{ '--divider-color': homeTheme.primaryGlow, '--divider-text': homeTheme.accentGlow } as React.CSSProperties}>
            <span>BLOOD ICE</span>
          </div>
          <h1 className="text-[22px] md:text-[34px] font-bold tracking-[3px] leading-tight my-2" style={{ fontFamily: "'Cinzel Decorative', serif", color: homeTheme.parchment }}>
            Драконья Сага
          </h1>
          <p className="text-[15px] md:text-[17px] max-w-[660px] mx-auto leading-relaxed mt-3 prose-readable" style={{ color: homeTheme.parchmentDim }}>
            Авторская НРИ на базе D&D: древние тайны, дворцовые интриги и герои, чьи судьбы уже легли на карты Таро.
          </p>
        </motion.header>

        {/* Tarot */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mb-6 md:mb-8">
          <div className="section-header !mt-2 !mb-1">
            <span className="section-icon">✦</span>
            <h2 className="section-title">Карты Таро</h2>
            <div className="section-line" />
          </div>
          <CharacterCardDeck onExpandedChange={setExpandedCard} />
        </motion.section>

        {/* About */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="mb-8 md:mb-10">
          <div className="section-header">
            <span className="section-icon">📖</span>
            <h2 className="section-title">О игре</h2>
            <div className="section-line" />
          </div>
          <div className="p-5 md:p-6 rounded-[14px] grid gap-4 md:grid-cols-[1.25fr_1fr] prose-readable" style={{ background: 'rgba(20,12,18,0.48)', border: `1px solid ${homeTheme.primary}30`, boxShadow: `0 10px 40px rgba(0,0,0,0.32)` }}>
            <p>
              <strong style={{ color: homeTheme.primaryBright }}>Драконья Сага</strong> — приключение в авторском мире, где личные истории героев переплетаются с древними тайнами и силами за пределами понимания смертных.
            </p>
            <p>
              Наша компания <strong style={{ color: homeTheme.accentGlow }}>[Драконья Сага]</strong> объединяет любителей настольных ролевых игр, вместе создающих общую легенду.
            </p>
          </div>
        </motion.section>

        {/* Videos */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }} className="mb-12">
          <div className="section-header">
            <span className="section-icon">▶</span>
            <h2 className="section-title">Видео</h2>
            <div className="section-line" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((video, idx) => (
              <motion.div
                key={video.part}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 + idx * 0.06 }}
                className="rounded-[14px] overflow-hidden cursor-pointer tarot-no-glow"
                style={{ background: 'rgba(18,12,18,0.62)', border: `1px solid ${homeTheme.primary}2a` }}
                whileHover={{ y: -3, borderColor: `${homeTheme.primaryGlow}66` }}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="w-full h-40 flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(28,14,22,0.6), rgba(10,8,14,0.5))' }}>
                  <img src={`${BASE}videos/thumbnail.jpg`} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-62" loading="lazy" decoding="async" />
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg z-10" style={{ background: 'rgba(0,0,0,0.55)', border: `2px solid ${homeTheme.primaryGlow}`, color: homeTheme.primaryGlow }}>
                    ▶
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[11px] tracking-[2px] mb-1" style={{ fontFamily: "'Cinzel', serif", color: homeTheme.primaryGlow }}>{video.part}</div>
                  <div className="text-[14px] leading-relaxed prose-readable" style={{ color: homeTheme.silver }}>{video.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <AnimatePresence>
          {selectedVideo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/82 backdrop-blur-sm z-[800] flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
              <motion.div initial={{ scale: 0.92, y: 18 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 18 }} className="relative w-full max-w-4xl aspect-video bg-black rounded-[14px] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <iframe src={selectedVideo.url} title={selectedVideo.title} className="w-full h-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white text-xl flex items-center justify-center hover:bg-black/80 transition-colors tarot-no-glow" onClick={() => setSelectedVideo(null)}>×</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="flex justify-center gap-2.5 mt-10 pt-8 flex-wrap" style={{ borderTop: `1px solid ${homeTheme.primary}22` }}>
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="px-4 py-2.5 rounded-[10px] text-[11px] tracking-[1.8px] transition-all duration-200 inline-flex items-center gap-2 tarot-no-glow"
              style={{ fontFamily: "'Cinzel', serif", background: 'rgba(22,14,20,0.6)', border: `1px solid ${homeTheme.primary}30`, color: homeTheme.parchmentDim, textDecoration: 'none' }}
            >
              <Icon size={15} /> {label}
            </a>
          ))}
        </motion.div>

        <div className="text-center mt-12 pt-6" style={{ borderTop: `1px solid ${homeTheme.primary}1c` }}>
          <div className="text-[16px] tracking-[10px] opacity-70" style={{ fontFamily: "'Cinzel Decorative', serif", color: homeTheme.primaryGlow }}>
            BLOOD ICE
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
