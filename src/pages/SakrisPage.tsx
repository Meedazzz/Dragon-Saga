import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { sakrisTheme } from '@/types/theme';

const SakrisPage: React.FC = () => {
  return (
    <Layout theme={sakrisTheme} particleVariant="mixed" particleCount={36}>
      <div className="max-w-[900px] mx-auto px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={sakrisTheme} characterId="sakris" />

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pb-8 mb-10 relative"
        >
          <div
            className="text-3xl md:text-5xl font-black tracking-[8px] uppercase mb-4 leading-none"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: sakrisTheme.silverBright,
              textShadow: `0 0 30px rgba(192,200,208,0.4), 0 0 60px rgba(42,138,42,0.3), 0 0 100px rgba(126,227,126,0.15), 0 0 140px rgba(144,208,255,0.08), 0 2px 6px rgba(0,0,0,0.9)`,
            }}
          >
            Дух бесплотный Единение
          </div>
          <div className="rune-divider" style={{ '--divider-color': sakrisTheme.primaryGlow, '--divider-text': sakrisTheme.parchment } as React.CSSProperties}>
            <span></span>
          </div>
          <h1
            className="text-xl md:text-[2.2rem] font-bold tracking-[3px] leading-tight my-4"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: sakrisTheme.silverBright,
              textShadow: `0 0 20px rgba(192,200,208,0.3), 0 0 40px rgba(42,138,42,0.2), 0 0 60px rgba(144,208,255,0.1), 0 2px 4px rgba(0,0,0,0.8)`,
            }}
          >
            Личное умение<br />Сакриса Ульриаша
          </h1>
          <div className="rune-divider" style={{ '--divider-color': sakrisTheme.primaryGlow, '--divider-text': sakrisTheme.parchment } as React.CSSProperties}>
            <span></span>
          </div>
        </motion.header>

        {/* Patron Ability */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section-header" style={{ '--section-border': 'rgba(42,138,42,0.2)', '--section-icon-color': sakrisTheme.primaryGlow, '--section-title-color': sakrisTheme.parchment, '--section-line-color': sakrisTheme.primaryGlow } as React.CSSProperties}>
            <span className="section-icon"></span>
            <h2 className="section-title">Умение Покровителя</h2>
            <div className="section-line" />
          </div>

          <div
            className="charge-box"
            style={{
              '--charge-bg-start': 'rgba(10,46,10,0.5)',
              '--charge-bg-end': 'rgba(10,30,50,0.3)',
              '--charge-border': 'rgba(42,138,42,0.25)',
              '--charge-line-color': `transparent`,
              '--charge-text': sakrisTheme.silver,
              '--charge-bullet': sakrisTheme.primaryGlow,
              '--charge-note-bg': 'rgba(28,138,28,0.08)',
              '--charge-note-border': sakrisTheme.primaryGlow,
              '--charge-note-text': sakrisTheme.parchmentDim,
            } as React.CSSProperties}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${sakrisTheme.primaryGlow}, ${sakrisTheme.accentGlow}, ${sakrisTheme.accent}, ${sakrisTheme.accentGlow}, ${sakrisTheme.primaryGlow}, transparent)` }} />
            <p className="mb-4 leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: sakrisTheme.parchment }}>
              <strong style={{ color: sakrisTheme.parchment }}>Время активации:</strong> Бонусное действие<br />
              <strong style={{ color: sakrisTheme.parchment }}>Длительность:</strong> 1 минута<br />
              <strong style={{ color: sakrisTheme.parchment }}>Дистанция:</strong> На себя
            </p>
            <p className="mb-4 leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: sakrisTheme.parchment }}>
              Вы уступаете тело своему покровителю. Пока способность активна, вы получаете следующие эффекты:
            </p>
            <ul className="charge-list">
              <li><strong style={{ color: sakrisTheme.parchment }}>Мудрость перворождённых.</strong> Ваши Интеллект, Мудрость и Харизма становятся равны 20 (если не были выше).</li>
              <li><strong style={{ color: sakrisTheme.parchment }}>Потусторонняя мощь.</strong> Ваши текущие уровни заменяются уровнями Колдуна. Вы получаете все умения этого класса соответствующего уровня, включая заранее выбранные воззвания.</li>
            </ul>
            <div className="charge-note">
              <strong>Использование:</strong> Один раз в день.
            </div>
          </div>
        </motion.section>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="quote-section mt-12"
          style={{
            '--quote-bg': `linear-gradient(135deg, rgba(2,5,2,0.98) 0%, rgba(5,10,20,0.95) 50%, rgba(10,5,15,0.98) 100%)`,
            '--quote-border': 'rgba(42,138,42,0.2)',
            '--quote-line-color': sakrisTheme.primaryGlow,
            '--quote-text': sakrisTheme.primaryGlow,
            '--quote-life': sakrisTheme.accentGlow,
            '--quote-death': sakrisTheme.accent,
          } as React.CSSProperties}
        >
          <div className="elven-quote">
            <span className="elven-line">Сакрис,</span>
            <span className="elven-line">Я устал,</span>
            <span className="elven-line">Я так устал...</span>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="footer-ornament" style={{ '--footer-border': 'rgba(42,138,42,0.2)', '--footer-text-color': sakrisTheme.primaryGlow } as React.CSSProperties}>
          <div className="rune-string">   </div>
        </div>
      </div>
    </Layout>
  );
};

export default SakrisPage;
