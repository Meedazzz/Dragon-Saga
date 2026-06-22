import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { valeryTheme } from '@/types/theme';

const ValeryPage: React.FC = () => {
  return (
    <Layout theme={valeryTheme} particleVariant="default" particleCount={30}>
      <div className="max-w-[900px] mx-auto px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={valeryTheme} characterId="valery" />

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pb-8 mb-10 relative"
        >
          <div
            className="text-4xl md:text-7xl font-black tracking-[12px] uppercase mb-4 leading-none"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: valeryTheme.silverBright,
              textShadow: `0 0 30px rgba(192,200,208,0.4), 0 0 60px rgba(42,90,138,0.3), 0 0 100px rgba(126,200,227,0.15), 0 2px 6px rgba(0,0,0,0.9)`,
            }}
          >
            AC
          </div>
          <div className="rune-divider" style={{ '--divider-color': valeryTheme.primaryGlow, '--divider-text': valeryTheme.parchment } as React.CSSProperties}>
            <span></span>
          </div>
          <h1
            className="text-xl md:text-[2.2rem] font-bold tracking-[3px] leading-tight my-4"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: valeryTheme.silverBright,
              textShadow: `0 0 20px rgba(192,200,208,0.3), 0 0 40px rgba(42,90,138,0.2), 0 2px 4px rgba(0,0,0,0.8)`,
            }}
          >
            Личное умение<br />Валерия Даркбейна
          </h1>
          <div className="rune-divider" style={{ '--divider-color': valeryTheme.primaryGlow, '--divider-text': valeryTheme.parchment } as React.CSSProperties}>
            <span></span>
          </div>
          <p
            className="text-sm md:text-base italic max-w-[900px] mx-auto leading-relaxed mt-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: valeryTheme.parchmentDim,
              letterSpacing: '1px',
              textShadow: '0 1px 3px rgba(0,0,0,0.9)',
            }}
          >
            <span className="block text-center">По примеру Асов и героев древности, ярость битвы становится вашей мощью.</span>
            <span className="block text-center mt-1">Вы улавливаете эхо предсмертных мгновений и накал сражения, превращая их в силы, питающие дары вашей крови.</span>
          </p>
        </motion.header>

        {/* Charge Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section-header" style={{ '--section-border': 'rgba(42,90,138,0.3)', '--section-icon-color': valeryTheme.accentGlow, '--section-title-color': valeryTheme.parchment, '--section-line-color': valeryTheme.primaryGlow } as React.CSSProperties}>
            <span className="section-icon"></span>
            <h2 className="section-title">Получение зарядов энергии</h2>
            <div className="section-line" />
          </div>

          <div
            className="charge-box"
            style={{
              '--charge-bg-start': 'rgba(11,26,46,0.6)',
              '--charge-bg-end': 'rgba(5,5,7,0.4)',
              '--charge-border': 'rgba(42,90,138,0.25)',
              '--charge-line-color': valeryTheme.primaryGlow,
              '--charge-text': valeryTheme.silver,
              '--charge-bullet': valeryTheme.accentGlow,
              '--charge-note-bg': 'rgba(138,28,28,0.08)',
              '--charge-note-border': valeryTheme.accent,
              '--charge-note-text': valeryTheme.parchmentDim,
            } as React.CSSProperties}
          >
            <p className="mb-4 leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: valeryTheme.parchment }}>
              Вы получаете <strong style={{ color: valeryTheme.parchment }}>заряд энергии</strong> (максимум = ваш бонус мастерства) в следующих случаях (не чаще 1 раза за ход):
            </p>
            <ul className="charge-list">
              <li>В начале вашего хода, если в радиусе 60 футов есть недавно убитые существа (погибшие не более 1 раунда назад).</li>
              <li>Когда вы наносите урон или получаете урон.</li>
            </ul>
            <div className="charge-note">
              Заряды исчезают через 1 раунд после окончания боя.
            </div>
          </div>
        </motion.section>

        {/* Gifts Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="section-header" style={{ '--section-border': 'rgba(42,90,138,0.3)', '--section-icon-color': valeryTheme.accentGlow, '--section-title-color': valeryTheme.parchment, '--section-line-color': valeryTheme.primaryGlow } as React.CSSProperties}>
            <span className="section-icon"></span>
            <h2 className="section-title">Трата зарядов</h2>
            <div className="section-line" />
          </div>

          <div className="overflow-x-auto">
            <table
              className="gifts-table"
              style={{
                '--table-head-start': 'rgba(26,58,92,0.5)',
                '--table-head-end': 'rgba(11,26,46,0.7)',
                '--table-head-text': valeryTheme.parchment,
                '--table-border': valeryTheme.primaryGlow,
                '--table-row-odd': 'rgba(10,10,14,0.5)',
                '--table-row-even': 'rgba(11,26,46,0.2)',
                '--table-row-hover': 'rgba(42,90,138,0.12)',
                '--table-cell-border': 'rgba(42,90,138,0.1)',
                '--table-name-color': valeryTheme.silverBright,
                '--table-cost-color': valeryTheme.accentGlow,
                '--table-action-color': valeryTheme.parchment,
                '--table-effect-color': valeryTheme.silver,
                '--necro-border': valeryTheme.accent,
                '--necro-name': valeryTheme.accentGlow,
                '--cobalt-border': valeryTheme.primaryGlow,
                '--cobalt-name': valeryTheme.parchment,
              } as React.CSSProperties}
            >
              <thead>
                <tr>
                  <th>Дар</th>
                  <th>Стоимость</th>
                  <th>Действие</th>
                  <th>Эффект</th>
                </tr>
              </thead>
              <tbody>
                <tr className="cobalt-row">
                  <td>Дар Слова</td>
                  <td>1 заряд</td>
                  <td>Свободное</td>
                  <td>Выберите союзника и дайте ему преимущество на одну атаку или всю подконтрольную вам нежить в 30 футах. Нежить тратит реакцию и выполняет короткий, физически возможный приказ.</td>
                </tr>
                <tr className="cobalt-row">
                  <td>Дар Воина</td>
                  <td>1 заряд</td>
                  <td>Часть атаки</td>
                  <td>Максимизируется только урон от оружия (не от кары или заклинаний). Игнорирует сопротивление и иммунитеты цели (кроме уязвимостей).</td>
                </tr>
                <tr className="cobalt-row">
                  <td>Дар Мага</td>
                  <td>2 заряда</td>
                  <td>Действие</td>
                  <td>Цель получает обычный урон от вашей атаки. Одновременно все остальные существа в радиусе 15 футов от цели получают урон излучением = ваша Божественная кара + уровень паладина (спасбросок Телосложения Сл 8 + БМ + Хар; успех — половина).</td>
                </tr>
                <tr className="cobalt-row">
                  <td>Дар Славы</td>
                  <td>3 заряда</td>
                  <td>Бонусное</td>
                  <td>Восстанавливаете 1 израсходованную ячейку заклинаний. Уровень ячейки = 1d4 (не выше вашего максимального уровня заклинаний).</td>
                </tr>
                <tr className="necro-row">
                  <td>Дар Смерти</td>
                  <td>4 заряда</td>
                  <td>Бонусное</td>
                  <td>На 1 минуту: когда вы убиваете существо, можете реакцией поднять его как нежить. Эта нежить подчиняется вашим мысленным командам.</td>
                </tr>
                <tr className="necro-row">
                  <td colSpan={4} style={{ padding: '8px 12px', fontSize: '0.85rem', color: valeryTheme.parchmentDim, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
                    <span style={{ color: valeryTheme.accentGlow, fontWeight: 700 }}>Ограничение:</span> можно использовать только БМ раз в день.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Spell Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="section-header" style={{ '--section-border': 'rgba(42,90,138,0.3)', '--section-icon-color': valeryTheme.accentGlow, '--section-title-color': valeryTheme.parchment, '--section-line-color': valeryTheme.primaryGlow } as React.CSSProperties}>
            <span className="section-icon"></span>
            <h2 className="section-title">Дополнительное заклинание</h2>
            <div className="section-line" />
          </div>

          <div
            className="spell-block"
            style={{
              '--spell-border': 'rgba(60,10,10,0.4)',
              '--spell-top': valeryTheme.accent,
              '--spell-line-start': valeryTheme.accent,
              '--spell-line-end': valeryTheme.accentGlow,
              '--spell-name-color': valeryTheme.accentGlow,
              '--spell-level-color': valeryTheme.parchmentDim,
              '--stat-border': valeryTheme.accent,
              '--stat-label-color': valeryTheme.accentGlow,
              '--stat-value-color': valeryTheme.silverBright,
            } as React.CSSProperties}
          >
            <div className="spell-name">ВОССТАНЬ!</div>
            <div className="spell-level">3-й уровень, некромантия</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 relative z-[1]">
              {[
                { label: 'Время накладывания', value: 'Действие' },
                { label: 'Дистанция', value: '30 футов' },
                { label: 'Компоненты', value: 'В' },
                { label: 'Длительность', value: 'Пока не развеется' },
              ].map((stat) => (
                <div key={stat.label} className="stat-row">
                  <span className="stat-label">{stat.label}:</span>
                  <span className="stat-value">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="spell-desc" style={{ fontFamily: "'Cormorant Garamond', serif", color: valeryTheme.silver }}>
              <p className="mb-4 leading-8">
                Вы произносите слово власти, и выбранные трупы в пределах дистанции поднимаются в виде <strong style={{ color: valeryTheme.parchment }}>солдата нежити</strong>.
              </p>
              <p className="mb-4 leading-8">
                <strong style={{ color: valeryTheme.parchment }}>Солдат нежити</strong> ментально связан с вами. Вы можете мысленно отдавать ему команды (никакое действие не требуется). Если вы не отдали приказ, солдат делает всё возможное, чтобы защитить вас. Солдат остаётся под вашим контролем, пока не умрёт или пока вы не отпустите его действием.
              </p>
            </div>

            <div
              className="mt-5 p-4 italic leading-7"
              style={{
                background: 'rgba(20,5,5,0.4)',
                borderLeft: `3px solid ${valeryTheme.accent}`,
                color: valeryTheme.parchment,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.05rem',
              }}
            >
              <strong style={{ color: valeryTheme.parchment }}>На больших уровнях.</strong> За каждый уровень ячейки выше 3-го вы поднимаете на 2 солдат нежити больше.
            </div>
          </div>
        </motion.section>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="quote-section mt-12"
          style={{
            '--quote-bg': `linear-gradient(135deg, ${valeryTheme.void} 0%, rgba(10,5,5,0.95) 50%, ${valeryTheme.void} 100%)`,
            '--quote-border': 'rgba(42,90,138,0.25)',
            '--quote-line-color': valeryTheme.primaryGlow,
            '--quote-text': valeryTheme.primaryGlow,
            '--quote-life': valeryTheme.parchment,
            '--quote-death': valeryTheme.accentGlow,
          } as React.CSSProperties}
        >
          <div className="elven-quote">
            <span className="elven-line">Нет добра или зла.</span>
            <span className="elven-line">Есть только <span className="life">жизнь</span> и <span className="death">смерть</span>.</span>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="footer-ornament" style={{ '--footer-border': 'rgba(42,90,138,0.2)', '--footer-text-color': valeryTheme.primaryGlow } as React.CSSProperties}>
          <div className="rune-string">    </div>
        </div>
      </div>
    </Layout>
  );
};

export default ValeryPage;
