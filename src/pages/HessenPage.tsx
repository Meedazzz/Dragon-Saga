import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { brinTheme } from '@/types/theme';

const HessenPage: React.FC = () => {
  const theme = brinTheme;
  const accent = '#aa5a8a';

  const familyMembers = [
    {
      name: 'Герцог Хессен',
      role: 'Глава Дома Хессен, правитель Астарии',
      desc: 'Место для описания. Герцог Дома Хессен, чья власть простирается над древними землями Астарии.',
    },
    {
      name: 'Брин дель Хессен',
      role: 'Наследный Принц Астарии',
      desc: 'Место для описания. Единственный сын герцога, владыка Чёрного льда.',
    },
  ];

  const legends = [
    'Дом Хессен ведёт своё начало от первых людей, вставших под знамёна Валар.',
    'Чёрный лёд дремлет в крови наследников Хессенов — древняя сила, пробуждающаяся в моменты смертельной опасности.',
    'Место для дополнительных преданий и легенд Дома.',
  ];

  const glossary = [
    { term: 'Чёрный лёд', def: 'Древняя сила, дремлющая в крови наследников Хессенов. Место для подробного описания.' },
    { term: 'Астария', def: 'Первое людское королевство. Место для подробного описания.' },
    { term: 'Ледяной медальон', def: 'Реликвия, передаваемая в роду Хессенов из поколения в поколение. Место для подробного описания.' },
  ];

  return (
    <Layout theme={theme} particleVariant="mixed" particleCount={30}>
      <div className="max-w-[950px] mx-auto px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={theme} characterId="brin" />

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
            Дом Хессен
          </h1>
          <div className="rune-divider" style={{ '--divider-color': accent, '--divider-text': theme.parchment } as React.CSSProperties}>
            <span>&#10052;</span>
          </div>
          <p
            className="text-base italic mt-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.parchmentDim }}
          >
            Великий Дом, чья кровь хранит тайны Чёрного льда
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
            <h2 className="section-title">Предания Дома</h2>
            <div className="section-line" />
          </div>
          <div
            className="p-6 rounded"
            style={{ background: 'rgba(46,10,30,0.3)', border: `1px solid ${accent}20` }}
          >
            {legends.map((legend, idx) => (
              <p key={idx} className="mb-4 last:mb-0 text-justify leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>
                {legend}
              </p>
            ))}
          </div>
        </motion.section>

        {/* Family Members */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="section-header" style={{ '--section-border': `${accent}30`, '--section-icon-color': accent, '--section-title-color': theme.parchment, '--section-line-color': accent } as React.CSSProperties}>
            <span className="section-icon">&#9876;</span>
            <h2 className="section-title">Члены Дома</h2>
            <div className="section-line" />
          </div>
          <div className="flex flex-col gap-4">
            {familyMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="p-5 rounded"
                style={{ background: 'rgba(46,10,30,0.2)', borderLeft: `3px solid ${accent}` }}
              >
                <div className="text-lg font-bold tracking-[1px] mb-1" style={{ fontFamily: "'Cinzel', serif", color: theme.parchment }}>
                  {member.name}
                </div>
                <div className="text-xs tracking-[2px] mb-3 opacity-80" style={{ fontFamily: "'Cinzel', serif", color: accent }}>
                  {member.role}
                </div>
                <div className="text-sm leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>
                  {member.desc}
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
                style={{ background: 'rgba(46,10,30,0.15)', border: `1px solid ${accent}15` }}
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
          <div className="rune-string">&#10052; &#10052; &#10052;</div>
        </div>
      </div>
    </Layout>
  );
};

export default HessenPage;
