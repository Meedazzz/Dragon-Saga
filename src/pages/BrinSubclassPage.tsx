import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { brinTheme } from '@/types/theme';
import type { ColorTheme } from '@/types/theme';

const violet = brinTheme.primaryGlow;
const ice = brinTheme.accentGlow;
const crimson = '#e44a5a';

const BrinSubclassPage: React.FC = () => {
  const theme = brinTheme;

  return (
    <Layout theme={theme} particleVariant="arcane" particleCount={32}>
      <main className="subclass-page max-w-[980px] mx-auto px-5 sm:px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={theme} characterId="brin" />

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center pb-8 mb-10"
        >
          <p className="text-xs md:text-sm uppercase tracking-[4px] mb-3" style={{ fontFamily: "'Cinzel', serif", color: theme.parchmentDim }}>
            Подкласс Брина дель Хессена
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold tracking-[3px] leading-tight"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: theme.silverBright,
              textShadow: `0 0 28px ${theme.primaryGlow}40, 0 0 56px ${theme.accentGlow}18, 0 2px 6px rgba(0,0,0,0.9)`,
            }}
          >
            Чародей Чёрного Льда
          </h1>
          <div className="rune-divider" style={{ '--divider-color': theme.primaryGlow, '--divider-text': theme.parchment } as React.CSSProperties}>
            <span>BLACK ICE</span>
          </div>
          <div
            className="inline-flex max-w-full items-center justify-center rounded px-4 py-2 text-xs md:text-sm tracking-[1.4px] font-bold"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'rgba(162,74,184,0.12)',
              border: `1px solid ${theme.primaryGlow}55`,
              color: theme.primaryBright,
              boxShadow: `0 0 20px ${theme.primaryGlow}16`,
            }}
          >
            Происхождение чародея, связанное с аномальной силой Чёрного льда
          </div>
        </motion.header>

        <Section theme={theme} index="I" title="1-й уровень: Ледяное наследие" delay={0.1}>
          <Lead theme={theme}>
            Внутри вас дремлет сила Чёрного льда — нестабильная, опасная и способная проявиться в миг, когда тело оказывается на грани смерти.
          </Lead>
          <Callout theme={theme} accent={ice} title="Ледяное наследие">
            Вы вызываете Волну Дикой Магии, когда падаете в 0 хитов.
          </Callout>
        </Section>

        <Section theme={theme} index="II" title="1-й уровень: Кости чёрного льда" delay={0.16}>
          <Paragraph theme={theme}>
            Когда вы совершаете атаку заклинанием, вы можете использовать один или несколько зарядов кости чёрного льда. За каждый потраченный заряд вы наносите дополнительный урон, используя максимальную кость урона этого заклинания.
          </Paragraph>
          <Callout theme={theme} accent={crimson} title="Тип урона">
            Дополнительный урон, нанесённый этим умением, является некротическим уроном.
          </Callout>
          <Callout theme={theme} accent={violet} title="Заряды костей чёрного льда">
            Количество зарядов равно вашему Бонусу Мастерства. Все потраченные заряды восстанавливаются после продолжительного отдыха.
          </Callout>
        </Section>

        <Section theme={theme} index="III" title="6-й уровень: Саркофаг Чёрного Льда" delay={0.22}>
          <Lead theme={theme}>
            Когда вы должны получить летальный урон, сила внутри вас пытается защитить вас: вы мгновенно покрываетесь непроницаемым саркофагом из сияющего чёрного льда до начала вашего следующего хода.
          </Lead>
          <BulletList theme={theme} accent={ice} items={[
            'Если ваши хиты должны были опуститься до нуля, вместо этого они опускаются до 1.',
            'Весь избыточный урон переносится на саркофаг, окружающий вас.',
            'Саркофаг имеет 10 временных хитов за каждый уровень чародея. Эти временные хиты поглощают избыточный урон, вызвавший реакцию, а затем любой последующий урон.',
            'Ваша скорость становится равна 0, и вы становитесь недееспособным до начала вашего следующего хода.',
            'Скорость всех существ в радиусе 10 футов уменьшается вдвое, а эта область считается труднопроходимой местностью.',
            'В начале вашего следующего хода владелец восстанавливает 6d, равное модификатору Интеллекта, и наносит столько же урона в радиусе 10 футов.',
          ]} />
          <Uses theme={theme}>
            Вы не можете использовать эту способность снова, пока не завершите продолжительный отдых.
          </Uses>
        </Section>

        <Section theme={theme} index="IV" title="Примечание о доработке" delay={0.28}>
          <Paragraph theme={theme}>
            Этот подкласс находится в разработке. Текущая версия включает умения 1-го и 6-го уровня, а последующие особенности подкласса будут добавлены и оформлены в дальнейшем после уточнения механик и баланса.
          </Paragraph>
        </Section>

        <div className="footer-ornament mt-12" style={{ '--footer-border': `${theme.primaryGlow}20`, '--footer-text-color': theme.primaryGlow } as React.CSSProperties}>
          <div className="rune-string">ЧЁРНЫЙ ЛЁД</div>
        </div>
      </main>
    </Layout>
  );
};

interface ThemeProps { theme: ColorTheme; }
interface TextProps extends ThemeProps { children: React.ReactNode; }
interface SectionProps extends TextProps { index: string; title: string; delay?: number; }

const Section: React.FC<SectionProps> = ({ theme, index, title, children, delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ delay, duration: 0.5 }}
    className="mb-9 md:mb-11"
  >
    <div className="section-header" style={{ '--section-border': `${theme.primaryGlow}30`, '--section-icon-color': theme.accentGlow, '--section-title-color': theme.parchment, '--section-line-color': theme.primaryGlow } as React.CSSProperties}>
      <span className="section-icon text-xs tracking-[2px]" style={{ fontFamily: "'Cinzel', serif" }}>{index}</span>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
    </div>
    <div
      className="rounded-lg p-5 md:p-7 text-left"
      style={{
        background: 'linear-gradient(135deg, rgba(20,8,26,0.86), rgba(9,4,12,0.70))',
        border: `1px solid ${theme.primaryGlow}28`,
        boxShadow: `0 18px 50px rgba(0,0,0,0.25), inset 0 0 28px ${theme.primaryGlow}08`,
        WebkitBackdropFilter: 'blur(4px)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {children}
    </div>
  </motion.section>
);

const Paragraph: React.FC<TextProps> = ({ theme, children }) => (
  <p className="mb-4 last:mb-0 text-base md:text-lg leading-8 text-justify" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>
    {children}
  </p>
);

const Lead: React.FC<TextProps> = ({ theme, children }) => (
  <p className="mb-5 text-base md:text-lg leading-8 italic text-justify" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.parchmentDim }}>
    {children}
  </p>
);

interface AccentProps extends TextProps { accent: string; title: string; }
const Callout: React.FC<AccentProps> = ({ theme, accent, title, children }) => (
  <div className="my-4 rounded p-4" style={{ background: `${accent}10`, border: `1px solid ${accent}30`, borderLeft: `4px solid ${accent}` }}>
    <div className="mb-2 text-xs md:text-sm font-bold tracking-[2px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: accent }}>{title}</div>
    <p className="text-base md:text-lg leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>{children}</p>
  </div>
);

interface BulletListProps extends ThemeProps { accent: string; items: string[]; }
const BulletList: React.FC<BulletListProps> = ({ theme, accent, items }) => (
  <ul className="space-y-3 my-4">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-base md:text-lg leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>
        <span aria-hidden="true" className="mt-1 shrink-0 text-xs" style={{ color: accent }}>—</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Uses: React.FC<TextProps> = ({ theme, children }) => (
  <p className="mt-4 rounded px-4 py-3 text-sm md:text-base leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.parchment, background: 'rgba(162,74,184,0.08)', border: `1px solid ${theme.primaryGlow}24` }}>
    {children}
  </p>
);

export default BrinSubclassPage;
