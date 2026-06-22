import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import type { ColorTheme } from '@/types/theme';

/** Тема для Клана Арантир — тёплые оранжевые/медные тона */
const arantirTheme: ColorTheme = {
  name: 'arantir',
  void: '#0c0806',
  raven: '#140e0a',
  primary: '#6a4a20',
  primaryGlow: '#8a6a30',
  primaryBright: '#aa8a50',
  accent: '#c06020',
  accentGlow: '#e08040',
  silver: '#b0a090',
  silverBright: '#d0c0b0',
  parchment: '#c8b090',
  parchmentDim: '#887060',
  border: 'rgba(140, 100, 40, 0.25)',
  borderGlow: 'rgba(200, 140, 50, 0.4)',
  menuBg: 'rgba(12, 8, 6, 0.97)',
  menuText: '#c8b090',
  menuAccent: '#8a6a30',
  buttonBg: 'rgba(20, 14, 10, 0.85)',
  buttonText: '#e08040',
  buttonBorder: 'rgba(200, 140, 50, 0.4)',
  particleColors: ['#e08040', '#c06020', '#aa8a50'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #6a4a20 0%, transparent 15%, transparent 85%, #6a4a20 100%)',
  isDark: true,
};

const ArantirPage: React.FC = () => {
  const theme = arantirTheme;
  const accent = '#e08040';

  const legends = [
    'Клан Арантир — древний орден Драконоборцев, некогда великий и могучий, истребивший последних драконов Второй Эпохи.',
    'С веками клан угасал, его песни забывались, а воины рассеивались по свету. Но память о великих подвигах жила в балладах, что передавались из уст в уста.',
    'Место для дополнительных преданий и легенд Клана Арантир.',
  ];

  const notableFigures = [
    {
      name: 'Таллис',
      role: 'Бард-Воин, последний носитель песен клана',
      desc: 'Место для описания связи Таллиса с Кланом Арантир.',
    },
  ];

  const glossary = [
    { term: 'Драконоборцы', def: 'Некогда великий орден, истребивший последних драконов Второй Эпохи. Место для подробного описания.' },
    { term: 'Песни клана', def: 'Древние баллады, хранящие историю и мудрость Драконоборцев. Место для подробного описания.' },
    { term: 'Лютня деда', def: 'Реликвия клана — старая лютня с трещиной на деке, хранительница песен. Место для подробного описания.' },
  ];

  return (
    <Layout theme={theme} particleCount={25}>
      <div className="max-w-[950px] mx-auto px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={theme} characterId="talis" />

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pb-8 mb-10"
        >
          <h1
            className="text-2xl md:text-5xl font-bold tracking-[4px] mb-3"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: theme.silverBright,
              textShadow: `0 0 30px ${accent}40, 0 2px 6px rgba(0,0,0,0.9)`,
            }}
          >
            Клан Арантир
          </h1>
          <div className="rune-divider" style={{ '--divider-color': accent, '--divider-text': theme.parchment } as React.CSSProperties}>
            <span></span>
          </div>
          <p
            className="text-base italic mt-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.parchmentDim }}
          >
            Последние Драконоборцы, чьи песни пережили века
          </p>
        </motion.header>

        {/* Legends */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="section-header" style={{ '--section-border': `${accent}30`, '--section-icon-color': accent, '--section-title-color': theme.parchment, '--section-line-color': accent } as React.CSSProperties}>
            <span className="section-icon"></span>
            <h2 className="section-title">Предания клана</h2>
            <div className="section-line" />
          </div>
          <div
            className="p-6 rounded"
            style={{ background: 'rgba(40,20,10,0.3)', border: `1px solid ${accent}20` }}
          >
            {legends.map((legend, idx) => (
              <p key={idx} className="mb-4 last:mb-0 text-justify leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>
                {legend}
              </p>
            ))}
          </div>
        </motion.section>

        {/* Notable Figures */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="section-header" style={{ '--section-border': `${accent}30`, '--section-icon-color': accent, '--section-title-color': theme.parchment, '--section-line-color': accent } as React.CSSProperties}>
            <span className="section-icon"></span>
            <h2 className="section-title">Известные личности</h2>
            <div className="section-line" />
          </div>
          <div className="flex flex-col gap-4">
            {notableFigures.map((fig, idx) => (
              <motion.div
                key={fig.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="p-5 rounded"
                style={{ background: 'rgba(40,20,10,0.2)', borderLeft: `3px solid ${accent}` }}
              >
                <div className="text-lg font-bold tracking-[1px] mb-1" style={{ fontFamily: "'Cinzel', serif", color: theme.parchment }}>
                  {fig.name}
                </div>
                <div className="text-xs tracking-[2px] mb-3 opacity-80" style={{ fontFamily: "'Cinzel', serif", color: accent }}>
                  {fig.role}
                </div>
                <div className="text-sm leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>
                  {fig.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Glossary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="section-header" style={{ '--section-border': `${accent}30`, '--section-icon-color': accent, '--section-title-color': theme.parchment, '--section-line-color': accent } as React.CSSProperties}>
            <span className="section-icon"></span>
            <h2 className="section-title">Глоссарий</h2>
            <div className="section-line" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {glossary.map((item, idx) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                className="p-4 rounded"
                style={{ background: 'rgba(40,20,10,0.15)', border: `1px solid ${accent}15` }}
              >
                <div className="text-base font-bold tracking-[1px] mb-2 pb-1" style={{ fontFamily: "'Cinzel', serif", color: theme.parchment, borderBottom: `1px solid ${accent}30` }}>
                  {item.term}
                </div>
                <div className="text-sm leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>
                  {item.def}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <div className="footer-ornament mt-12" style={{ '--footer-border': `${accent}20`, '--footer-text-color': accent } as React.CSSProperties}>
          <div className="rune-string">  </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArantirPage;
