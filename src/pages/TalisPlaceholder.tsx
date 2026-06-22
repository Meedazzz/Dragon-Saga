import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import type { ColorTheme } from '@/types/theme';

/** Тема для Таллиса — огненно-оранжевые тона */
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

const TalisSubclassPage: React.FC = () => {
  const theme = talisTheme;
  const accent = '#e08040';

  return (
    <Layout theme={theme} particleVariant="default" particleCount={25}>
      <div
        className="min-h-screen w-full flex flex-col items-center px-4 py-12 md:py-20"
        style={{ fontFamily: theme.fontFamily }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-[3px] mb-4"
            style={{ color: theme.accentGlow, textShadow: `0 0 30px ${theme.accentGlow}40` }}
          >
            Мастер Меча Арантир
          </h1>
          <div
            className="text-xs md:text-sm tracking-[3px] uppercase"
            style={{ color: theme.parchmentDim }}
          >
            Подкласс Барда (Колледжа Доблести и Колледжа Клинка)
          </div>
          <div
            className="mt-3 inline-block px-4 py-1.5 rounded text-xs tracking-[2px] font-bold"
            style={{
              background: `${accent}22`,
              border: `1px solid ${accent}55`,
              color: accent,
            }}
          >
            Заменяет оба подкласса: Колледж Доблести и Колледж Клинка
          </div>
        </motion.div>

        {/* 3-й уровень: Песни Клинка */}
        <Section theme={theme} icon="" title="3-й уровень: Песни Клинка">
          <p className="mb-4 leading-relaxed" style={{ color: theme.silver }}>
            Вы постигли базовые стойки древнего искусства. В свой ход вы можете бонусным действием переключиться между ними.
          </p>
          <p className="mb-6 leading-relaxed" style={{ color: theme.silver }}>
            Кроме того, ваши разносторонние навыки помогают вам использовать кости барда в синергии с древними техниками мастера меча. Вы можете потратить одно использование Вдохновения барда в качестве бонусного действия, получая эффект в зависимости от вашей текущей стойки:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <FeatureCard
              theme={theme}
              title="В Песни Обороны"
              borderColor="#8ab4f8"
              glowColor="#8ab4f8"
            >
              <p style={{ color: theme.silver }}>
                Бросьте кость бардовского вдохновения. Ваш <strong>Класс Доспеха (КД)</strong> увеличивается на выпавшее значение до начала вашего следующего хода.
              </p>
            </FeatureCard>

            <FeatureCard
              theme={theme}
              title="В Песни Атаки"
              borderColor="#e08040"
              glowColor="#e08040"
            >
              <p style={{ color: theme.silver }}>
                Вы вкладываете магию в свой следующий удар. Бросьте кость бардовского вдохновения. Если ваша следующая атака до начала вашего следующего хода попадает по врагу, его <strong>КД уменьшается</strong> на выпавшее значение до начала вашего следующего хода.
              </p>
            </FeatureCard>
          </div>
        </Section>

        {/* Песнь Обороны */}
        <Section theme={theme} icon="" title="Песнь Обороны (Серебряная Чешуя)">
          <p className="mb-4 italic" style={{ color: theme.parchmentDim }}>
            Стиль, направленный на защиту соратников, подобно непробиваемой драконьей чешуе.
          </p>

          <PassiveFeature theme={theme} title="«Живой бастион»" accent="#8ab4f8">
            Ваш КД увеличивается на 2.
          </PassiveFeature>

          <div
            className="p-4 rounded-lg mb-4"
            style={{
              background: 'rgba(138, 180, 248, 0.06)',
              border: '1px solid rgba(138, 180, 248, 0.15)',
            }}
          >
            <h4 className="text-sm tracking-[2px] font-bold mb-3" style={{ color: '#8ab4f8' }}>
              Активное умение (Реакция)
            </h4>
            <p className="mb-3 leading-relaxed" style={{ color: theme.silver }}>
              Если союзник в пределах 5 футов от вас получает удар от атаки, вы можете реакцией виртуозно подставить клинок, отразив атаку. Сравните итоговый бросок атаки врага с КД союзника и вашим собственным КД:
            </p>
            <ul className="space-y-2 mb-3" style={{ color: theme.silver }}>
              <li className="flex gap-2">
                <span style={{ color: '#8ab4f8' }}>•</span>
                <span>Если бросок атаки врага <strong>превышает КД союзника</strong>, но <strong>меньше или равен вашему КД</strong> — вы полностью аннулируете урон от этой атаки.</span>
              </li>
              <li className="flex gap-2">
                <span style={{ color: '#8ab4f8' }}>•</span>
                <span>Если бросок атаки врага <strong>превышает и КД союзника, и ваш КД</strong> — вы смягчаете удар, уменьшая получаемый союзником урон на <strong>10 + ваш модификатор Телосложения</strong>.</span>
              </li>
            </ul>
            <p className="text-xs tracking-[1px]" style={{ color: theme.parchmentDim }}>
              Количество использований: ваш Бонус Мастерства (БМ) за продолжительный отдых.
            </p>
          </div>
        </Section>

        {/* Песнь Атаки */}
        <Section theme={theme} icon="" title="Песнь Атаки (Алый Коготь)">
          <p className="mb-4 italic" style={{ color: theme.parchmentDim }}>
            Стиль агрессивного наступления, подобный смертоносным драконьим когтям, направленный на поиск уязвимых точек и стремительное сближение.
          </p>

          <PassiveFeature theme={theme} title="«Рассечение чешуи»" accent="#e08040">
            Ваши атаки оружием совершают критическое попадание при выпадении <strong>19 или 20</strong> на кости d20.
          </PassiveFeature>

          <div
            className="p-4 rounded-lg mb-4"
            style={{
              background: 'rgba(224, 128, 64, 0.06)',
              border: '1px solid rgba(224, 128, 64, 0.15)',
            }}
          >
            <h4 className="text-sm tracking-[2px] font-bold mb-3" style={{ color: '#e08040' }}>
              Активное умение (Стремительный рывок)
            </h4>
            <p className="mb-3 leading-relaxed" style={{ color: theme.silver }}>
              Один раз в каждый свой ход, перед совершением атаки ближнего боя, вы можете пожертвовать от <strong>10 до 30 футов</strong> своей скорости передвижения, чтобы совершить стремительный рывок к цели по прямой линии. За каждые 10 футов потраченной таким образом скорости вы получаете <strong>+1d6 к урону</strong> (максимум +3d6 за 30 футов) для этой атаки.
            </p>
            <p className="text-xs tracking-[1px]" style={{ color: theme.parchmentDim }}>
              Количество использований: ваш Бонус Мастерства (БМ) за продолжительный отдых.
            </p>
          </div>
        </Section>

        {/* 3-й уровень: Танец Драконов */}
        <Section theme={theme} icon="" title="3-й уровень: Танец Драконов">
          <p className="mb-4 leading-relaxed" style={{ color: theme.silver }}>
            Это визитная карточка ордена Арантир — приём, который меняет ход битвы. Вы можете использовать <strong>Танец Драконов</strong> в качестве Действия. Эффект зависит от вашей текущей Песни Клинка.
          </p>
          <p className="mb-6 leading-relaxed" style={{ color: theme.parchmentDim }}>
            Вы можете использовать Танец <strong>один раз</strong> за короткий или продолжительный отдых. Начиная с <strong>10-го уровня — два раза</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <FeatureCard
              theme={theme}
              title="В Песни Обороны"
              borderColor="#8ab4f8"
              glowColor="#8ab4f8"
            >
              <p className="mb-2 leading-relaxed" style={{ color: theme.silver }}>
                Вы используете Действие, чтобы превратиться в <strong>живой щит</strong> для своих соратников. До начала вашего следующего хода вы автоматически парируете (снижаете урон до 0) успешные физические атаки оружием (ближнего и дальнего боя), направленные на вас или любого союзника в пределах <strong>5 футов</strong> от вас.
              </p>
              <p className="text-xs tracking-[1px]" style={{ color: theme.parchmentDim }}>
                Количество отбитых атак: ваш БМ. Не спасает от заклинаний по площади (огненный шар и т.п.).
              </p>
            </FeatureCard>

            <FeatureCard
              theme={theme}
              title="В Песни Атаки (Смертоносный Вихрь)"
              borderColor="#e08040"
              glowColor="#e08040"
            >
              <p className="mb-2 leading-relaxed" style={{ color: theme.silver }}>
                Вы превращаетесь в размытый силуэт. Вы перемещаетесь на расстояние до вашей скорости ходьбы. Это передвижение <strong>не провоцирует атак по возможности</strong>. Во время этого движения вы можете совершить по одной атаке ближнего боя по каждому врагу, в пределах досягаемости которого вы оказываетесь.
              </p>
              <p className="text-xs tracking-[1px]" style={{ color: theme.parchmentDim }}>
                Максимальное количество атак: ваш БМ.
              </p>
            </FeatureCard>
          </div>
        </Section>

        {/* 7-й уровень */}
        <Section theme={theme} icon="" title="7-й уровень: Статус Ордена">
          <p className="mb-4 leading-relaxed" style={{ color: theme.silver }}>
            Открытая демонстрация ваших красно-серебряных цветов и герба с пронзённым драконом заставляет эльфов относиться к вам с почтением или опаской.
          </p>

          <div className="space-y-3" style={{ color: theme.silver }}>
            <div className="flex gap-2">
              <span style={{ color: accent }}>•</span>
              <span>Когда вы взаимодействуете с представителями знати, стражи, наемниками или другими военными структурами эльфийских кровей, лояльных вашему ордену, вы совершаете проверки Харизмы с <strong>преимуществом</strong>; в противном случае — с <strong>помехой</strong>.</span>
            </div>
            <div className="flex gap-2">
              <span style={{ color: accent }}>•</span>
              <span>Вы получаете владение навыком <strong>Запугивание</strong>. Если вы уже владеете им, ваш бонус мастерства для этого навыка удваивается (компетентность).</span>
            </div>
            <div className="flex gap-2">
              <span style={{ color: accent }}>•</span>
              <span>Когда вы совершаете проверку Харизмы (Запугивание), демонстрируя своё оружие, стойку или мастерство, вы совершаете этот бросок с <strong>преимуществом</strong>.</span>
            </div>
          </div>
          <p className="mt-3 text-xs italic" style={{ color: theme.parchmentDim }}>
            Представители воинских сословий, стража и наемники всегда могут безошибочно распознать в вас мастера-фехтовальщика по вашей походке и тому, как вы носите оружие.
          </p>
        </Section>

        {/* 10-й уровень */}
        <Section theme={theme} icon="" title="10-й уровень: Эхо Древних Песен">
          <p className="mb-4 leading-relaxed" style={{ color: theme.silver }}>
            Ваши Танцы Драконов выходят за пределы общих человеческих (или эльфийских) возможностей:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <FeatureCard
              theme={theme}
              title="Улучшение Стальной Мельницы (Защита)"
              borderColor="#8ab4f8"
              glowColor="#8ab4f8"
            >
              <p style={{ color: theme.silver }}>
                Вы крутите клинки с такой невероятной скоростью, что парируете любой направленный на вас удар. Радиус защиты увеличивается до <strong>10 футов</strong>, а количество физических атак, которые вы можете отбить за время действия Танца, становится равным <strong>вашему уровню воина</strong>.
              </p>
            </FeatureCard>

            <FeatureCard
              theme={theme}
              title="Улучшение Смертоносного Вихря (Атака)"
              borderColor="#e08040"
              glowColor="#e08040"
            >
              <p style={{ color: theme.silver }}>
                Ваш рывок сквозь ряды противников становится фатальным. Теперь во время перемещения в Танце Драконов вы можете совершить количество атак, равное <strong>вашему уровню воина</strong>.
              </p>
            </FeatureCard>
          </div>
        </Section>

        {/* 15-й уровень */}
        <Section theme={theme} icon="" title="15-й уровень: Безупречный Ритм">
          <p className="leading-relaxed" style={{ color: theme.silver }}>
            Вы больше не можете оказаться застигнутым врасплох без козыря в рукаве. Если при броске инициативы у вас не осталось использований «Танца Драконов» или «Песен Клинка», вы восстанавливаете <strong>по одному использованию</strong> каждого умения.
          </p>
        </Section>

        {/* 18-й уровень */}
        <Section theme={theme} icon="" title="18-й уровень: Macillindalë">
          <p className="mb-4 leading-relaxed" style={{ color: theme.silver }}>
            Вы достигаете вершины искусства, сливая две песни в единую симфонию стали.
          </p>
          <div
            className="p-5 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${accent}15, rgba(138, 180, 248, 0.08))`,
              border: `1px solid ${accent}30`,
              boxShadow: `0 0 20px ${accent}10`,
            }}
          >
            <p className="mb-3 leading-relaxed" style={{ color: theme.silver }}>
              Когда вы используете бонусное действие для активации Песни Клинка, вы можете активировать <strong>обе песни одновременно</strong>. В течение <strong>1 минуты</strong> вы получаете преимущества пассивных и активных умений обеих песен.
            </p>
            <p className="mb-3 leading-relaxed" style={{ color: theme.silver }}>
              «Танец Драконов» в этом состоянии позволяет вам сначала совершить <strong>Смертоносный Вихрь</strong>, а в конце движения автоматически активировать <strong>Стальную Мельницу</strong> до вашего следующего хода.
            </p>
            <p className="text-xs tracking-[1px]" style={{ color: theme.parchmentDim }}>
              Вы можете использовать эту особенность один раз, восстанавливая возможность после продолжительного отдыха.
            </p>
          </div>
        </Section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="text-2xl tracking-[8px]" style={{ color: theme.parchmentDim }}>
              
          </div>
          <p className="mt-4 text-xs tracking-[2px]" style={{ color: theme.parchmentDim }}>
            «Танец стали и песни — последнее наследие клана Арантир»
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

/* ───── Вспомогательные компоненты ───── */

interface SectionProps {
  theme: ColorTheme;
  icon: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ theme, icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6 }}
    className="w-full max-w-4xl mb-12 md:mb-16"
  >
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xl">{icon}</span>
      <h2
        className="text-lg md:text-2xl font-bold tracking-[2px]"
        style={{ color: theme.primaryBright, textShadow: `0 0 20px ${theme.primaryGlow}30` }}
      >
        {title}
      </h2>
    </div>
    <div
      className="p-6 rounded-lg"
      style={{
        background: `${theme.raven}80`,
        border: `1px solid ${theme.border}`,
        backdropFilter: 'blur(4px)',
      }}
    >
      {children}
    </div>
  </motion.div>
);

interface FeatureCardProps {
  theme: ColorTheme;
  title: string;
  children: React.ReactNode;
  borderColor: string;
  glowColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ theme, title, children, borderColor, glowColor }) => (
  <div
    className="p-4 rounded-lg"
    style={{
      background: `${theme.void}80`,
      border: `1px solid ${borderColor}25`,
      boxShadow: `0 0 15px ${glowColor}08`,
    }}
  >
    <h4
      className="text-sm tracking-[2px] font-bold mb-3 pb-2"
      style={{
        color: borderColor,
        borderBottom: `1px solid ${borderColor}20`,
      }}
    >
      {title}
    </h4>
    {children}
  </div>
);

interface PassiveFeatureProps {
  theme: ColorTheme;
  title: string;
  children: React.ReactNode;
  accent?: string;
}

const PassiveFeature: React.FC<PassiveFeatureProps> = ({ theme, title, children, accent }) => (
  <div
    className="p-4 rounded-lg mb-4"
    style={{
      background: `${accent || theme.accentGlow}08`,
      border: `1px solid ${accent || theme.accentGlow}20`,
    }}
  >
    <h4
      className="text-xs tracking-[2px] font-bold mb-2"
      style={{ color: accent || theme.accentGlow }}
    >
      Пассивное умение
    </h4>
    <p className="text-sm leading-relaxed" style={{ color: theme.silver }}>
      <strong style={{ color: theme.parchment }}>{title}:</strong> {children}
    </p>
  </div>
);

export default TalisSubclassPage;
