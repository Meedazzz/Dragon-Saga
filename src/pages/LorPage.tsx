import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { lorTheme } from '@/types/theme';
import { characters } from '@/data/characters';

const LorPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'heroes' | 'lore' | 'maps'>('heroes');

  const loreCards = [
    {
      title: 'Род Даркбейнов',
      desc: 'Древний род, чья кровь связана с силами за гранью жизни и смерти. Тайны, передаваемые из поколения в поколение.',
      path: '/darkbain',
      icon: '⚔️',
    },
    {
      title: 'Дом Хессен',
      desc: 'Великий Дом Астарии, чья кровь хранит тайны Чёрного льда.',
      path: '/hessen',
      icon: '❄️',
    },
    {
      title: 'Бергхейм',
      desc: 'Суровый горный край на севере, где духи предков бродят по перевалам.',
      path: '/berghheim',
      icon: '🏔️',
    },
    {
      title: 'Клан Арантир',
      desc: 'Последние Драконоборцы, чьи песни пережили века.',
      path: '/arantir',
      icon: '🎵',
    },
    {
      title: 'Летопись мира',
      desc: 'Сказание о мире: от Музыки Айнур до 425 года Третьей Эпохи. История, расы, календарь и глоссарий.',
      path: '/letopis',
      icon: '📜',
    },
  ];

  const mapCards = [
    {
      title: 'Карта Севера',
      desc: 'Карта северных земель — от ледяных пустошей до горных хребтов Бергхейма.',
      path: '/map/sever',
      icon: '🗺️',
    },
    {
      title: 'Карта Нортвинда',
      desc: 'Карта Нортвинда — оплота севера и его окрестностей.',
      path: '/map/northwind',
      icon: '🗺️',
    },
  ];

  return (
    <Layout theme={lorTheme} particleCount={35}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 pb-20 pt-12">
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
              color: lorTheme.parchment,
              textShadow: '0 0 20px rgba(160,150,130,0.2), 0 2px 6px rgba(0,0,0,0.9)',
            }}
          >
            DND
          </div>
          <div className="rune-divider" style={{ '--divider-color': lorTheme.primary, '--divider-text': lorTheme.primaryGlow } as React.CSSProperties}>
            <span>LETO</span>
          </div>
          <h1
            className="text-xl md:text-3xl font-bold tracking-[3px] leading-tight my-3"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: lorTheme.silver,
              textShadow: '0 0 15px rgba(144,152,160,0.15), 0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Мир Игры
          </h1>
          <div className="rune-divider" style={{ '--divider-color': lorTheme.primary, '--divider-text': lorTheme.primaryGlow } as React.CSSProperties}>
            <span>PISE</span>
          </div>
          <p
            className="text-sm md:text-base italic max-w-[500px] mx-auto leading-relaxed mt-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: lorTheme.parchmentDim,
              letterSpacing: '1px',
            }}
          >
            Хроники героев, их судьбы и легенды, запечатлённые в цифровых страницах.
          </p>
        </motion.header>

        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-10 flex-wrap"
        >
          {[
            { id: 'heroes' as const, label: 'Персонажи', icon: '⚔' },
            { id: 'lore' as const, label: 'Лор', icon: '📜' },
            { id: 'maps' as const, label: 'Карты', icon: '🗺️' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveSection(btn.id)}
              className="px-5 py-2.5 rounded-sm text-xs md:text-sm font-bold tracking-[2px] uppercase transition-all duration-300 cursor-pointer"
              style={{
                fontFamily: "'Cinzel', serif",
                background: activeSection === btn.id
                  ? 'linear-gradient(180deg, rgba(30,25,15,0.5) 0%, rgba(15,12,8,0.4) 100%)'
                  : 'linear-gradient(180deg, rgba(30,25,15,0.4) 0%, rgba(15,12,8,0.3) 100%)',
                border: `1px solid ${activeSection === btn.id ? 'rgba(106,84,48,0.4)' : 'rgba(80,70,50,0.25)'}`,
                color: activeSection === btn.id ? lorTheme.parchment : lorTheme.parchmentDim,
                textShadow: activeSection === btn.id ? '0 0 8px rgba(160,144,96,0.2)' : 'none',
                transform: activeSection === btn.id ? 'translateY(-1px)' : 'none',
                boxShadow: activeSection === btn.id ? '0 3px 10px rgba(0,0,0,0.3)' : 'none',
              }}
            >
              <span className="mr-2">{btn.icon}</span>
              {btn.label}
            </button>
          ))}
          <button
            onClick={() => navigate('/letopis')}
            className="px-5 py-2.5 rounded-sm text-xs md:text-sm font-bold tracking-[2px] uppercase transition-all duration-300 cursor-pointer"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'linear-gradient(180deg, rgba(30,25,15,0.4) 0%, rgba(15,12,8,0.3) 100%)',
              border: '1px solid rgba(80,70,50,0.25)',
              color: lorTheme.parchmentDim,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(106,84,48,0.4)';
              (e.target as HTMLElement).style.color = lorTheme.parchment;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(80,70,50,0.25)';
              (e.target as HTMLElement).style.color = lorTheme.parchmentDim;
            }}
          >
            <span className="mr-2">🌍</span>
            Летопись
          </button>
        </motion.nav>

        {/* Heroes Section */}
        {activeSection === 'heroes' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="section-header" style={{ '--section-border': 'rgba(80,70,50,0.15)', '--section-icon-color': lorTheme.primaryGlow, '--section-title-color': lorTheme.primaryGlow, '--section-line-color': lorTheme.primary } as React.CSSProperties}>
              <span className="section-icon">&#9876;</span>
              <h2 className="section-title">Персонажи</h2>
              <div className="section-line" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {characters.map((char, idx) => (
                <motion.div
                  key={char.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  onClick={() => navigate(char.lorePath)}
                  className="rounded-md p-6 relative overflow-hidden cursor-pointer transition-all duration-300"
                  style={{
                    background: 'linear-gradient(180deg, rgba(20,15,10,0.6) 0%, rgba(10,8,5,0.4) 100%)',
                    border: `1px solid ${char.color}30`,
                    borderTop: `2px solid ${char.color}`,
                  }}
                  whileHover={{
                    borderColor: `${char.color}60`,
                    y: -3,
                    boxShadow: `0 8px 25px rgba(0,0,0,0.5)`,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${char.color}, ${char.color}80, transparent)` }}
                  />
                  <div
                    className="text-base md:text-xl font-bold tracking-[2px] mb-2"
                    style={{
                      fontFamily: "'Cinzel Decorative', serif",
                      color: lorTheme.silver,
                    }}
                  >
                    {char.name}
                  </div>
                  <div
                    className="text-xs italic mb-4"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: lorTheme.parchmentDim,
                    }}
                  >
                    {char.title}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {char.pages.slice(0, 3).map((page) => (
                      <span
                        key={page.path}
                        className="px-2 py-1 rounded text-[10px] tracking-[1px]"
                        style={{
                          fontFamily: "'Cinzel', serif",
                          background: 'rgba(30,25,15,0.3)',
                          border: '1px solid rgba(80,70,50,0.15)',
                          color: lorTheme.parchmentDim,
                        }}
                      >
                        {page.label}
                      </span>
                    ))}
                    {char.pages.length > 3 && (
                      <span
                        className="px-2 py-1 rounded text-[10px] tracking-[1px]"
                        style={{
                          fontFamily: "'Cinzel', serif",
                          background: 'rgba(30,25,15,0.3)',
                          border: '1px solid rgba(80,70,50,0.15)',
                          color: lorTheme.parchmentDim,
                        }}
                      >
                        +{char.pages.length - 3}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Lore Section */}
        {activeSection === 'lore' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="section-header" style={{ '--section-border': 'rgba(80,70,50,0.15)', '--section-icon-color': lorTheme.primaryGlow, '--section-title-color': lorTheme.primaryGlow, '--section-line-color': lorTheme.primary } as React.CSSProperties}>
              <span className="section-icon">&#128220;</span>
              <h2 className="section-title">Лор</h2>
              <div className="section-line" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {loreCards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  onClick={() => navigate(card.path)}
                  className="rounded-md p-6 relative cursor-pointer transition-all duration-300"
                  style={{
                    background: 'linear-gradient(180deg, rgba(20,15,10,0.5) 0%, rgba(10,8,5,0.3) 100%)',
                    border: '1px solid rgba(138,106,42,0.2)',
                  }}
                  whileHover={{
                    borderColor: 'rgba(184,144,58,0.3)',
                    y: -2,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${lorTheme.primaryGlow}, transparent)` }}
                  />
                  <div className="text-2xl mb-2">{card.icon}</div>
                  <div
                    className="text-base md:text-lg tracking-[2px] mb-2"
                    style={{
                      fontFamily: "'Cinzel Decorative', serif",
                      color: lorTheme.primaryGlow,
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    className="text-sm leading-relaxed mb-4"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: lorTheme.parchmentDim,
                    }}
                  >
                    {card.desc}
                  </div>
                  <span
                    className="inline-block px-5 py-2.5 rounded-sm text-xs tracking-[2px] uppercase transition-all duration-200 cursor-pointer"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      background: 'linear-gradient(180deg, rgba(30,25,15,0.4) 0%, rgba(15,12,8,0.3) 100%)',
                      border: '1px solid rgba(80,70,50,0.25)',
                      color: lorTheme.parchmentDim,
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.borderColor = lorTheme.primary;
                      (e.target as HTMLElement).style.color = lorTheme.parchment;
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.borderColor = 'rgba(80,70,50,0.25)';
                      (e.target as HTMLElement).style.color = lorTheme.parchmentDim;
                    }}
                  >
                    Открыть
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Maps Section */}
        {activeSection === 'maps' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="section-header" style={{ '--section-border': 'rgba(80,70,50,0.15)', '--section-icon-color': lorTheme.primaryGlow, '--section-title-color': lorTheme.primaryGlow, '--section-line-color': lorTheme.primary } as React.CSSProperties}>
              <span className="section-icon">&#128506;</span>
              <h2 className="section-title">Карты</h2>
              <div className="section-line" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mapCards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  onClick={() => navigate(card.path)}
                  className="rounded-md p-6 relative cursor-pointer transition-all duration-300"
                  style={{
                    background: 'linear-gradient(180deg, rgba(20,15,10,0.5) 0%, rgba(10,8,5,0.3) 100%)',
                    border: '1px solid rgba(138,106,42,0.2)',
                  }}
                  whileHover={{
                    borderColor: 'rgba(184,144,58,0.3)',
                    y: -2,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${lorTheme.primaryGlow}, transparent)` }}
                  />
                  <div className="text-3xl mb-3">{card.icon}</div>
                  <div
                    className="text-base md:text-lg tracking-[2px] mb-2"
                    style={{
                      fontFamily: "'Cinzel Decorative', serif",
                      color: lorTheme.primaryGlow,
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    className="text-sm leading-relaxed mb-4"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: lorTheme.parchmentDim,
                    }}
                  >
                    {card.desc}
                  </div>
                  <span
                    className="inline-block px-5 py-2.5 rounded-sm text-xs tracking-[2px] uppercase transition-all duration-200 cursor-pointer"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      background: 'linear-gradient(180deg, rgba(30,25,15,0.4) 0%, rgba(15,12,8,0.3) 100%)',
                      border: '1px solid rgba(80,70,50,0.25)',
                      color: lorTheme.parchmentDim,
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.borderColor = lorTheme.primary;
                      (e.target as HTMLElement).style.color = lorTheme.parchment;
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.borderColor = 'rgba(80,70,50,0.25)';
                      (e.target as HTMLElement).style.color = lorTheme.parchmentDim;
                    }}
                  >
                    Открыть карту
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Footer */}
        <div className="footer-ornament mt-12" style={{ '--footer-border': 'rgba(80,70,50,0.1)', '--footer-text-color': lorTheme.primary } as React.CSSProperties}>
          <div className="rune-string">L E T O P I S E</div>
        </div>
      </div>
    </Layout>
  );
};

export default LorPage;
