import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import type { ColorTheme } from '@/types/theme';

/** Тема для подкласса Таллиса — красно-серебряные цвета ордена Арантир. */
const talisTheme: ColorTheme = {
  name: 'talis',
  void: '#0c0806',
  raven: '#140e0a',
  primary: '#6a4020',
  primaryGlow: '#8a5030',
  primaryBright: '#aa7040',
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
  menuAccent: '#e08040',
  buttonBg: 'rgba(20, 14, 10, 0.85)',
  buttonText: '#e08040',
  buttonBorder: 'rgba(200, 140, 50, 0.4)',
  particleColors: ['#e08040', '#c06020', '#FF5E00'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #6a4020 0%, transparent 15%, transparent 85%, #6a4020 100%)',
  isDark: true,
};

const defenseColor = '#9fb8d8';
const attackColor = '#e08040';

const TalisSubclassPage: React.FC = () => {
  const theme = talisTheme;

  return (
    <Layout theme={theme} particleVariant="default" particleCount={30}>
      <main className="max-w-[980px] mx-auto px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={theme} characterId="talis" />

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center pb-8 mb-10"
        >
          <p
            className="text-xs md:text-sm uppercase tracking-[4px] mb-3"
            style={{ fontFamily: "'Cinzel', serif", color: theme.parchmentDim }}
          >
            Подкласс Таллиса
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold tracking-[3px] leading-tight"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: theme.silverBright,
              textShadow: `0 0 28px ${theme.accentGlow}45, 0 2px 6px rgba(0,0,0,0.9)`,
            }}
          >
            Мастер Меча Арантир
          </h1>
          <div className="rune-divider" style={{ '--divider-color': theme.accentGlow, '--divider-text': theme.parchment } as React.CSSProperties}>
            <span></span>
          </div>
          <div
            className="inline-flex max-w-full items-center justify-center rounded px-4 py-2 text-xs md:text-sm tracking-[1.5px] font-bold"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'rgba(224,128,64,0.12)',
              border: `1px solid ${theme.accentGlow}55`,
              color: theme.accentGlow,
              boxShadow: `0 0 20px ${theme.accentGlow}16`,
            }}
          >
            Заменяет оба подкласса: Колледж Доблести и Колледж Клинка
          </div>
        </motion.header>

        <Section theme={theme} icon="" title="3-й уровень: Песни Клинка" delay={0.1}>
          <Paragraph theme={theme}>
            Вы постигли базовые стойки древнего искусства. В свой ход вы можете бонусным действием переключиться между ними.
          </Paragraph>
          <Paragraph theme={theme}>
            Кроме того, ваши разносторонние навыки помогают вам использовать кости барда в синергии с древними техниками мастера меча. Вы можете потратить одно использование Вдохновения барда в качестве бонусного действия, получая эффект в зависимости от вашей текущей стойки:
          </Paragraph>
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <FeatureCard theme={theme} title="В Песни Обороны" accent={defenseColor}>
              Бросьте кость бардовского вдохновения. Ваш Класс Доспеха (КД) увеличивается на выпавшее значение до начала вашего следующего хода.
            </FeatureCard>
            <FeatureCard theme={theme} title="В Песни Атаки" accent={attackColor}>
              Вы вкладываете магию в свой следующий удар. Бросьте кость бардовского вдохновения. Если ваша следующая атака до начала вашего следующего хода попадает по врагу, его КД уменьшается на выпавшее значение до начала вашего следующего хода.
            </FeatureCard>
          </div>
        </Section>

        <Section theme={theme} icon="" title="Песнь Обороны (Серебряная Чешуя)" delay={0.16} accent={defenseColor}>
          <Lead theme={theme}>Стиль, направленный на защиту соратников, подобно непробиваемой драконьей чешуе.</Lead>
          <Callout theme={theme} label="Пассивное умение («Живой бастион»)" accent={defenseColor}>
            Ваш КД увеличивается на 2.
          </Callout>
          <RuleBlock theme={theme} title="Активное умение (Реакция)" accent={defenseColor}>
            <Paragraph theme={theme}>
              Если союзник в пределах 5 футов от вас получает удар от атаки, вы можете реакцией виртуозно подставить клинок, отразив атаку. Сравните итоговый бросок атаки врага с КД союзника и вашим собственным КД:
            </Paragraph>
            <BulletList theme={theme} accent={defenseColor} items={[
              'Если бросок атаки врага превышает КД союзника, но меньше или равен вашему КД, вы полностью аннулируете урон от этой атаки.',
              'Если бросок атаки врага превышает и КД союзника, и ваш КД, вы смягчаете удар, уменьшая получаемый союзником урон на 10 + ваш модификатор Телосложения.',
            ]} />
          </RuleBlock>
          <Uses theme={theme}>
            Количество использований: Вы можете использовать эту реакцию количество раз, равное вашему Бонусу Мастерства (БМ). Вы восстанавливаете все потраченные использования после продолжительного отдыха.
          </Uses>
        </Section>

        <Section theme={theme} icon="" title="Песнь Атаки (Алый Коготь)" delay={0.22} accent={attackColor}>
          <Lead theme={theme}>Стиль агрессивного наступления, подобный смертоносным драконьим когтям, направленный на поиск уязвимых точек и стремительное сближение.</Lead>
          <Callout theme={theme} label="Пассивное умение («Рассечение чешуи»)" accent={attackColor}>
            Ваши атаки оружием совершают критическое попадание при выпадении 19 или 20 на кости d20.
          </Callout>
          <RuleBlock theme={theme} title="Активное умение (Стремительный рывок)" accent={attackColor}>
            <Paragraph theme={theme}>
              Один раз в каждый свой ход, перед совершением атаки ближнего боя, вы можете пожертвовать от 10 до 30 футов своей скорости передвижения, чтобы совершить стремительный рывок к цели по прямой линии. За каждые 10 футов потраченной таким образом скорости вы получаете +1d6 к урону (максимум +3d6 за 30 футов) для этой атаки.
            </Paragraph>
          </RuleBlock>
          <Uses theme={theme}>
            Количество использований: Вы можете использовать этот рывок количество раз, равное вашему Бонусу Мастерства (БМ). Вы восстанавливаете все потраченные использования после продолжительного отдыха.
          </Uses>
        </Section>

        <Section theme={theme} icon="" title="3-й уровень: Танец Драконов" delay={0.28}>
          <Paragraph theme={theme}>
            Это визитная карточка ордена Арантир — прием, который меняет ход битвы. Вы можете использовать Танец Драконов в качестве Действия. Эффект зависит от вашей текущей Песни Клинка.
          </Paragraph>
          <Uses theme={theme}>
            Вы можете использовать Танец один раз за короткий или продолжительный отдых. Начиная с 10-го уровня — два раза.
          </Uses>
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <FeatureCard theme={theme} title="В Песни Обороны" accent={defenseColor}>
              Вы используете Действие, чтобы превратиться в живой щит для своих соратников. До начала вашего следующего хода вы можете виртуозно отбивать летящие снаряды и клинки. Вы автоматически парируете (снижаете урон до 0) успешные физические атаки оружием (ближнего и дальнего боя), направленные на вас или любого союзника в пределах 5 футов от вас. Вы можете отбить таким образом количество атак, равное вашему БМ. (Примечание: это защищает от атак, требующих броска попадания, но не спасает от заклинаний по площади, вроде огненного шара).
            </FeatureCard>
            <FeatureCard theme={theme} title="В Песни Атаки (Смертоносный Вихрь)" accent={attackColor}>
              Вы превращаетесь в размытый силуэт. Вы перемещаетесь на расстояние до вашей скорости ходьбы. Это передвижение не провоцирует атак по возможности. Во время этого движения вы можете совершить по одной атаке ближнего боя по каждому врагу, в пределах досягаемости которого вы оказываетесь. Максимальное общее количество атак равно БМ.
            </FeatureCard>
          </div>
        </Section>

        <Section theme={theme} icon="" title="7-й уровень: Статус Ордена" delay={0.34}>
          <Paragraph theme={theme}>
            Открытая демонстрация ваших красно-серебряных цветов и герба с пронзенным драконом заставляет эльфов относиться к вам с почтением или опаской.
          </Paragraph>
          <BulletList theme={theme} accent={theme.accentGlow} items={[
            'Когда вы взаимодействуете с представителями знати, стражи, наемниками или другими военными структурами эльфийских кровей, лояльных вашему ордену, вы совершаете проверки Харизмы с преимуществом, в противном случае, совершите бросок с помехой.',
            'Вы получаете владение навыком Запугивание. Если вы уже владеете им, ваш бонус мастерства для этого навыка удваивается (компетентность).',
            'Когда вы совершаете проверку Харизмы (Запугивание), демонстрируя свое оружие, стойку или мастерство, вы совершаете этот бросок с преимуществом. Представители воинских сословий, стража и наемники всегда могут безошибочно распознать в вас мастера-фехтовальщика по вашей походке и тому, как вы носите оружие.',
          ]} />
        </Section>

        <Section theme={theme} icon="" title="10-й уровень: Эхо Древних Песен" delay={0.4}>
          <Paragraph theme={theme}>
            На 10-м уровне ваши Танцы Драконов выходят за пределы общих человеческих (или эльфийских) возможностей:
          </Paragraph>
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <FeatureCard theme={theme} title="Улучшение Стальной Мельницы (Защита)" accent={defenseColor}>
              Вы крутите клинки с такой невероятной скоростью, что парируете любой направленный на вас удар. Радиус защиты увеличивается до 10 футов, а количество физических атак, которые вы можете отбить за время действия Танца, становится равным вашему уровню воина.
            </FeatureCard>
            <FeatureCard theme={theme} title="Улучшение Смертоносного Вихря (Атака)" accent={attackColor}>
              Ваш рывок сквозь ряды противников становится фатальным. Теперь во время перемещения в Танце Драконов вы можете совершить количество атак, равное вашему уровню воина.
            </FeatureCard>
          </div>
        </Section>

        <Section theme={theme} icon="" title="15-й уровень: Безупречный Ритм" delay={0.46}>
          <Paragraph theme={theme}>
            Вы больше не можете оказаться застигнутым врасплох без козыря в рукаве. Если при броске инициативы у вас не осталось использований «Танца Драконов» или «Песен Клинка», вы восстанавливаете по одному использованию каждого умения.
          </Paragraph>
        </Section>

        <Section theme={theme} icon="" title="18-й уровень: Macillindalë" delay={0.52}>
          <Paragraph theme={theme}>
            Вы достигаете вершины искусства, сливая две песни в единую симфонию стали. Когда вы используете бонусное действие для активации Песни Клинка, вы можете активировать обе песни одновременно. В течение 1 минуты вы получаете преимущества пассивных и активных умений обеих песен. «Танец Драконов» в этом состоянии позволяет вам сначала совершить Смертоносный Вихрь, а в конце движения автоматически активировать Стальную Мельницу до вашего следующего хода.
          </Paragraph>
          <Uses theme={theme}>
            Вы можете использовать эту особенность один раз, восстанавливая возможность после продолжительного отдыха.
          </Uses>
        </Section>

        <div className="footer-ornament mt-12" style={{ '--footer-border': `${theme.accentGlow}20`, '--footer-text-color': theme.accentGlow } as React.CSSProperties}>
          <div className="rune-string">  </div>
        </div>
      </main>
    </Layout>
  );
};

interface ThemeProps {
  theme: ColorTheme;
}

interface SectionProps extends ThemeProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
  accent?: string;
}

const Section: React.FC<SectionProps> = ({ theme, icon, title, children, delay = 0, accent }) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ delay, duration: 0.55 }}
    className="mb-9 md:mb-11"
  >
    <div className="section-header" style={{ '--section-border': `${accent || theme.accentGlow}30`, '--section-icon-color': accent || theme.accentGlow, '--section-title-color': theme.parchment, '--section-line-color': accent || theme.accentGlow } as React.CSSProperties}>
      <span className="section-icon">{icon}</span>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
    </div>
    <div
      className="rounded-lg p-5 md:p-7 text-left"
      style={{
        background: 'linear-gradient(135deg, rgba(20,14,10,0.82), rgba(12,8,6,0.66))',
        border: `1px solid ${(accent || theme.accentGlow)}28`,
        boxShadow: `0 18px 50px rgba(0,0,0,0.24), inset 0 0 28px ${(accent || theme.accentGlow)}08`,
        WebkitBackdropFilter: 'blur(4px)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {children}
    </div>
  </motion.section>
);

interface TextProps extends ThemeProps {
  children: React.ReactNode;
}

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

interface CalloutProps extends TextProps {
  label: string;
  accent: string;
}

const Callout: React.FC<CalloutProps> = ({ theme, label, accent, children }) => (
  <div
    className="mb-4 rounded p-4"
    style={{ background: `${accent}10`, border: `1px solid ${accent}30`, borderLeft: `4px solid ${accent}` }}
  >
    <div className="mb-2 text-xs md:text-sm font-bold tracking-[2px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: accent }}>
      {label}
    </div>
    <p className="text-base md:text-lg leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>
      {children}
    </p>
  </div>
);

interface RuleBlockProps extends ThemeProps {
  title: string;
  accent: string;
  children: React.ReactNode;
}

const RuleBlock: React.FC<RuleBlockProps> = ({ title, accent, children }) => (
  <div className="mb-4 rounded p-4" style={{ background: 'rgba(0,0,0,0.14)', border: `1px solid ${accent}22` }}>
    <h3 className="mb-3 text-sm md:text-base font-bold tracking-[2px]" style={{ fontFamily: "'Cinzel', serif", color: accent }}>
      {title}
    </h3>
    {children}
  </div>
);

interface FeatureCardProps extends ThemeProps {
  title: string;
  accent: string;
  children: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ theme, title, accent, children }) => (
  <div
    className="rounded p-4 md:p-5 h-full"
    style={{ background: `${theme.void}88`, border: `1px solid ${accent}2f`, boxShadow: `inset 0 0 18px ${accent}08` }}
  >
    <h3 className="mb-3 pb-2 text-sm md:text-base font-bold tracking-[1.5px]" style={{ fontFamily: "'Cinzel', serif", color: accent, borderBottom: `1px solid ${accent}2f` }}>
      {title}
    </h3>
    <p className="text-base md:text-lg leading-8 text-justify" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>
      {children}
    </p>
  </div>
);

interface BulletListProps extends ThemeProps {
  accent: string;
  items: string[];
}

const BulletList: React.FC<BulletListProps> = ({ theme, accent, items }) => (
  <ul className="space-y-3 my-4">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-base md:text-lg leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>
        <span aria-hidden="true" className="mt-1 shrink-0" style={{ color: accent }}></span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Uses: React.FC<TextProps> = ({ theme, children }) => (
  <p
    className="mt-4 rounded px-4 py-3 text-sm md:text-base leading-7"
    style={{
      fontFamily: "'Cormorant Garamond', serif",
      color: theme.parchment,
      background: 'rgba(224,128,64,0.08)',
      border: `1px solid ${theme.accentGlow}24`,
    }}
  >
    {children}
  </p>
);

export default TalisSubclassPage;
