import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { sakrisTheme } from '@/types/theme';

const BerghheimPage: React.FC = () => {
  const theme = sakrisTheme;
  const accent = '#3a8a3a';

  const legends = [
    'Бергхейм — суровый горный край на севере, где ветры воют меж скальных зубьев, а в низинах стелется ледяной туман.',
    'Народ Бергхейма издревле славился стойкостью и охотничьим мастерством. Их рода хранят память о духах предков, что бродят по перевалам.',
    'Место для дополнительных преданий и легенд Бергхейма.',
  ];

  const notableFigures = [
    {
      name: 'Сакрис Ульриаш',
      role: 'Следопыт, сосуд древнего духа',
      desc: 'Место для описания связи Сакриса с Бергхеймом.',
    },
  ];

  const glossary = [
    { term: 'Бергхейм', def: 'Горный край на севере. Место для подробного описания.' },
    { term: 'Дух предка', def: 'Древняя сущность, пробудившаяся в Сакрисе. Место для подробного описания.' },
    { term: 'Перевал Северного Камня', def: 'Горный перевал в землях Бергхейма. Место для подробного описания.' },
  ];

  return (
    <Layout theme={theme} particleVariant="mixed" particleCount={30}>
      <div className="max-w-[950px] mx-auto px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={theme} characterId="sakris" />

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
            Бергхейм
          </h1>
          <div className="rune-divider" style={{ '--divider-color': accent, '--divider-text': theme.parchment } as React.CSSProperties}>
            <span>&#9856;</span>
          </div>
          <p
            className="text-base italic mt-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.parchmentDim }}
          >
            Суровый горный край, где духи предков бродят по перевалам
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
            <span className="section-icon">&#128220;</span>
            <h2 className="section-title">Предания края</h2>
            <div className="section-line" />
          </div>
          <div
            className="p-6 rounded"
            style={{ background: 'rgba(10,46,10,0.3)', border: `1px solid ${accent}20` }}
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
            <span className="section-icon">&#9876;</span>
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
                style={{ background: 'rgba(10,46,10,0.2)', borderLeft: `3px solid ${accent}` }}
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
            <span className="section-icon">&#10022;</span>
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
                style={{ background: 'rgba(10,46,10,0.15)', border: `1px solid ${accent}15` }}
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
          <div className="rune-string">&#9856; &#9857; &#9858; &#9859;</div>
        </div>
      </div>
    </Layout>
  );
};

export default BerghheimPage;
