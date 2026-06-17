import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { brinTheme } from '@/types/theme';

const BrinPage: React.FC = () => {
  return (
    <Layout theme={brinTheme} particleVariant="mixed" particleCount={34}>
      <div className="max-w-[900px] mx-auto px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={brinTheme} characterId="brin" />

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
              color: brinTheme.silverBright,
              textShadow: `0 0 30px rgba(200,192,208,0.4), 0 0 60px rgba(138,42,90,0.3), 0 0 100px rgba(200,126,200,0.15), 0 0 140px rgba(176,106,240,0.08), 0 2px 6px rgba(0,0,0,0.9)`,
            }}
          >
            Ледяная крепость
          </div>
          <div className="rune-divider" style={{ '--divider-color': brinTheme.primaryGlow, '--divider-text': brinTheme.parchment } as React.CSSProperties}>
            <span>&#9840;&#9857;</span>
          </div>
          <h1
            className="text-xl md:text-[2.2rem] font-bold tracking-[3px] leading-tight my-4"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: brinTheme.silverBright,
              textShadow: `0 0 20px rgba(200,192,208,0.3), 0 0 40px rgba(138,42,90,0.2), 0 0 60px rgba(176,106,240,0.1), 0 2px 4px rgba(0,0,0,0.8)`,
            }}
          >
            Личное умение<br />Брина дель Хессена
          </h1>
          <div className="rune-divider" style={{ '--divider-color': brinTheme.primaryGlow, '--divider-text': brinTheme.parchment } as React.CSSProperties}>
            <span>&#9840;&#9857;</span>
          </div>
        </motion.header>

        {/* Ice Fortress Ability */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section-header" style={{ '--section-border': 'rgba(138,42,90,0.2)', '--section-icon-color': brinTheme.accentGlow, '--section-title-color': brinTheme.parchment, '--section-line-color': brinTheme.primaryGlow } as React.CSSProperties}>
            <span className="section-icon">&#10052;</span>
            <h2 className="section-title">Ледяная крепость</h2>
            <div className="section-line" />
          </div>

          <div
            className="charge-box"
            style={{
              '--charge-bg-start': 'rgba(46,10,30,0.5)',
              '--charge-bg-end': 'rgba(30,10,40,0.3)',
              '--charge-border': 'rgba(138,42,90,0.25)',
              '--charge-line-color': `transparent`,
              '--charge-text': brinTheme.silver,
              '--charge-bullet': brinTheme.accentGlow,
              '--charge-note-bg': 'rgba(138,28,90,0.08)',
              '--charge-note-border': brinTheme.accentGlow,
              '--charge-note-text': brinTheme.parchmentDim,
            } as React.CSSProperties}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${brinTheme.primaryGlow}, ${brinTheme.accentGlow}, ${brinTheme.accent}, ${brinTheme.accentGlow}, ${brinTheme.primaryGlow}, transparent)` }} />
            <p className="mb-4 leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: brinTheme.parchment }}>
              <strong style={{ color: brinTheme.parchment }}>Время сотворения:</strong> Действие<br />
              <strong style={{ color: brinTheme.parchment }}>Дистанция:</strong> Видимое существо<br />
              <strong style={{ color: brinTheme.parchment }}>Длительность:</strong> 5 минут<br />
              <strong style={{ color: brinTheme.parchment }}>Компоненты:</strong> —
            </p>
            <p className="mb-4 leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: brinTheme.parchment }}>
              Черпая силу из <strong style={{ color: brinTheme.parchment }}>Чёрного льда</strong>, что дремлет внутри Брина дель Хессена, чародей создаёт портал в ментальное чистилище внутри него — и перемещает в него сознание другого существа.
            </p>
            <p className="mb-4 leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: brinTheme.parchment }}>
              Брин выбирает видимое существо, которое должно совершить <strong style={{ color: brinTheme.parchment }}>спасбросок Интеллекта</strong>. В случае провала, цель перемещается в чистилище — ментальное пространство, огранённое чёрным льдом.
            </p>
            <ul className="charge-list">
              <li>Внутри чистилища <strong style={{ color: brinTheme.parchment }}>невозможно нанести физический и/или ментальный вред или урон</strong>.</li>
              <li>Существа сохраняют свой физический облик, могут взаимодействовать, но <strong style={{ color: brinTheme.parchment }}>без нанесения урона</strong>.</li>
              <li>Брин может создавать <strong style={{ color: brinTheme.parchment }}>любые иллюзии и визуальные эффекты</strong>.</li>
              <li>В конце каждого своего хода цель может совершить <strong style={{ color: brinTheme.parchment }}>новый спасбросок Интеллекта</strong>; в случае успеха она покидает Ледяную крепость.</li>
              <li>Брин также может переместить в чистилище любое существо, которое он знает, <strong style={{ color: brinTheme.parchment }}>независимо от расстояния</strong>, но только с его <strong style={{ color: brinTheme.parchment }}>согласия</strong>.</li>
              <li>Во время действия заклинания Брин и цель <strong style={{ color: brinTheme.parchment }}>недееспособны в физическом мире</strong>.</li>
              <li>Внешнее воздействие на Брина может <strong style={{ color: brinTheme.parchment }}>прервать заклинание</strong>.</li>
            </ul>
            <div className="charge-note">
              <strong>На больших уровнях.</strong> Если используется ячейка 5-го уровня или выше, длительность увеличивается на <strong>5 минут за каждый уровень ячейки</strong>. Если используется ячейка 6-го уровня, можно переместить сознание любой известной цели на любом расстоянии <strong>без её согласия</strong> на 5 минут (и дополнительно 5 минут за каждый уровень ячейки выше 6-го).
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
            '--quote-bg': `linear-gradient(135deg, rgba(5,2,5,0.98) 0%, rgba(15,5,10,0.95) 50%, rgba(10,2,8,0.98) 100%)`,
            '--quote-border': 'rgba(138,42,90,0.2)',
            '--quote-line-color': brinTheme.primaryGlow,
            '--quote-text': brinTheme.primaryGlow,
            '--quote-life': brinTheme.accentGlow,
            '--quote-death': brinTheme.accent,
          } as React.CSSProperties}
        >
          <div className="elven-quote">
            <span className="elven-line">Учитель,</span>
            <span className="elven-line">мне кажется, что лёд не вредит мне,</span>
            <span className="elven-line">он <span className="life">защищает</span> меня?</span>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="footer-ornament" style={{ '--footer-border': 'rgba(138,42,90,0.2)', '--footer-text-color': brinTheme.primaryGlow } as React.CSSProperties}>
          <div className="rune-string">&#9840; &#9857;</div>
        </div>
      </div>
    </Layout>
  );
};

export default BrinPage;
