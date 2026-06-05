import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { homeTheme } from '@/types/theme';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const characters = [
    {
      name: 'Валерий Даркбейн',
      title: 'Потомок сильнейшего Авантюриста, носитель тёмного проклятья',
      desc: 'Паладин смерти, чья кровь связана с силами за гранью жизни. Носитель чёрного знамени и властелин даров Асов.',
      tarot: `${import.meta.env.BASE_URL}tarot_valery.png`,
      path: '/valery',
      color: '#2a5a8a',
      links: [
        { label: 'Личное умение', path: '/valery' },
        { label: 'Род Даркбейнов', path: '/darkbain' },
      ],
    },
    {
      name: 'Сакрис из Бергхейма',
      title: 'Следопыт, сосуд древнего духа',
      desc: 'В глуши, где шепчут вековые дубы, живёт древний и могучий дух эльфа — покровитель следопыта. Дух бесплотный. Единение.',
      tarot: `${import.meta.env.BASE_URL}tarot_sakris.png`,
      path: '/sakris',
      color: '#2a6a3a',
      links: [
        { label: 'Личное умение', path: '/sakris' },
      ],
    },
    {
      name: 'Брин Дель Хасен',
      title: 'Наследный Лорд, владыка чёрного льда',
      desc: 'Чародей, черпающий силу из Чёрного льда, что дремлет внутри. Создатель Ледяной крепости — ментального чистилища, огранённого чёрным льдом.',
      tarot: `${import.meta.env.BASE_URL}tarot_brin.png`,
      path: '/brin',
      color: '#5a3a7a',
      links: [
        { label: 'Личное умение', path: '/brin' },
      ],
    },
    {
      name: 'Талис',
      title: 'Потомок сильнейшего Авантюриста, носитель тёмного проклятья',
      desc: 'Паладин смерти, чья кровь связана с силами за гранью жизни. Носитель чёрного знамени и властелин даров Асов.',
      tarot: `${import.meta.env.BASE_URL}tarot_valery.png`,
      path: '/valery',
      color: '#2a5a8a',
      links: [
        { label: 'Личное умение', path: '/valery' },
        { label: 'Род Даркбейнов', path: '/darkbain' },
      ],
      {
      name: 'Стив',
      title: 'Потомок сильнейшего Авантюриста, носитель тёмного проклятья',
      desc: 'Паладин смерти, чья кровь связана с силами за гранью жизни. Носитель чёрного знамени и властелин даров Асов.',
      tarot: `${import.meta.env.BASE_URL}tarot_valery.png`,
      path: '/valery',
      color: '#2a5a8a',
      links: [
        { label: 'Личное умение', path: '/valery' },
        { label: 'Род Даркбейнов', path: '/darkbain' },
      ],
    },
  ];

  const videos = [
    { part: 'Часть 1', title: 'Начало путешествия' },
    { part: 'Часть 2', title: 'Тени Бергхейма' },
    { part: 'Часть 3', title: 'Ледяная крепость' },
    { part: 'Часть 4', title: 'Духи древности' },
    { part: 'Часть 5', title: 'Кровь и честь' },
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
            Название Кампании
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
            Описание проекта, которое вы сами отредактируете позже.
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
              <strong style={{ color: homeTheme.primaryBright }}>Название кампании</strong> — это захватывающее приключение в мире Dungeons & Dragons, где судьбы героев переплетаются с древними тайнами, богами и силами, выходящими за пределы понимания смертных.
            </p>
            <p className="mb-4 text-justify leading-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: homeTheme.parchment }}>
              Наша компания — <strong style={{ color: homeTheme.primaryBright }}>[Название вашей компании]</strong> — объединяет страстных любителей настольных ролевых игр, создающих уникальные истории и миры.
            </p>
            <p className="mb-4 text-justify leading-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: homeTheme.parchment }}>
              В этом проекте мы собрали <strong style={{ color: homeTheme.primaryBright }}>летопись наших героев</strong> — их личные умения, предыстории, связи и тайны.
            </p>
            <p className="text-justify leading-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: homeTheme.parchment }}>
              Присоединяйтесь к нам в этом путешествии. <strong style={{ color: homeTheme.primaryBright }}>Легенда только начинается.</strong>
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

          <div className="flex flex-col gap-6">
            {characters.map((char, idx) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                onClick={() => navigate(char.path)}
                className="group cursor-pointer grid grid-cols-1 md:grid-cols-[200px_1fr] rounded overflow-hidden transition-all duration-400"
                style={{
                  background: 'rgba(20,15,10,0.3)',
                  border: `1px solid ${char.color}25`,
                }}
                whileHover={{
                  borderColor: `${char.color}50`,
                  boxShadow: `0 8px 30px rgba(0,0,0,0.5)`,
                  x: 10,
                }}
              >
                {/* Tarot Card - Full size, no crop */}
                <div
                  className="relative overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${char.color}30 0%, ${char.color}10 100%)` }}
                >
                  <img
                    src={char.tarot}
                    alt={char.name}
                    className="w-full h-auto object-contain transition-all duration-400 group-hover:scale-105"
                    style={{ maxHeight: '320px' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Character Info */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div
                    className="text-lg md:text-2xl font-bold tracking-[2px] mb-2"
                    style={{
                      fontFamily: "'Cinzel Decorative', serif",
                      color: homeTheme.silver,
                    }}
                  >
                    {char.name}
                  </div>
                  <div
                    className="text-sm italic mb-4"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: homeTheme.parchmentDim,
                    }}
                  >
                    {char.title}
                  </div>
                  <div
                    className="text-sm md:text-base leading-relaxed mb-5"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: homeTheme.parchment,
                    }}
                  >
                    {char.desc}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {char.links.map((link) => (
                      <button
                        key={link.path}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(link.path);
                        }}
                        className="px-4 py-2 rounded text-xs tracking-[1px] transition-all duration-200 cursor-pointer"
                        style={{
                          fontFamily: "'Cinzel', serif",
                          background: 'rgba(30,25,15,0.3)',
                          border: '1px solid rgba(80,70,50,0.2)',
                          color: homeTheme.parchmentDim,
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.borderColor = `${char.color}60`;
                          (e.target as HTMLElement).style.color = homeTheme.parchment;
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.borderColor = 'rgba(80,70,50,0.2)';
                          (e.target as HTMLElement).style.color = homeTheme.parchmentDim;
                        }}
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Videos */}
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

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4 mt-10 pt-8 flex-wrap"
          style={{ borderTop: '1px solid rgba(80,70,50,0.1)' }}
        >
          {['YouTube', 'VK', 'Telegram', 'Discord'].map((social) => (
            <span
              key={social}
              className="px-5 py-2.5 rounded text-xs tracking-[2px] transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "'Cinzel', serif",
                background: 'rgba(30,25,15,0.3)',
                border: '1px solid rgba(80,70,50,0.2)',
                color: homeTheme.parchmentDim,
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
              {social}
            </span>
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
            LE TO PISE
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
