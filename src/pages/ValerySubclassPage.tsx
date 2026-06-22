import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { valeryTheme } from '@/types/theme';
import type { ColorTheme } from '@/types/theme';

const blue = valeryTheme.primaryGlow;
const red = valeryTheme.accentGlow;

const spells = [
  { level: '3', names: 'Направляющий снаряд, Щит, Видение грядущей смерти.' },
  { level: '5', names: 'Улучшение характеристики, Божественное оружие, Корона безумия.' },
  { level: '9', names: 'Ускорение, Контрзаклинание, Солдат нежити.' },
  { level: '13', names: 'Изменение формы камня, Власть над водами, Вдохновляющая речь.' },
  { level: '17', names: 'Рассвет, Власть над ветрами, Взгляд властелина.' },
];

const ValerySubclassPage: React.FC = () => {
  const theme = valeryTheme;

  return (
    <Layout theme={theme} particleVariant="mixed" particleCount={30}>
      <main className="subclass-page max-w-[980px] mx-auto px-5 sm:px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={theme} characterId="valery" />

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center pb-8 mb-10"
        >
          <p
            className="text-xs md:text-sm uppercase tracking-[4px] mb-3"
            style={{ fontFamily: "'Cinzel', serif", color: theme.parchmentDim }}
          >
            Подкласс Валерия Даркбейна
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold tracking-[3px] leading-tight"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: theme.silverBright,
              textShadow: `0 0 28px ${theme.primaryGlow}40, 0 0 56px ${theme.accentGlow}18, 0 2px 6px rgba(0,0,0,0.9)`,
            }}
          >
            Пробужденный
          </h1>
          <Divider theme={theme} />
          <div
            className="inline-flex max-w-full items-center justify-center rounded px-4 py-2 text-xs md:text-sm tracking-[1.4px] font-bold"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'rgba(62,141,224,0.12)',
              border: `1px solid ${theme.primaryGlow}55`,
              color: theme.primaryBright,
              boxShadow: `0 0 20px ${theme.primaryGlow}16`,
            }}
          >
            Заменяет умения, специфичные для священной клятвы паладина
          </div>
        </motion.header>

        <Section theme={theme} index="I" title="Описание пути" delay={0.1}>
          <Lead theme={theme}>
            Пробудившийся — это паладин, нарушивший священную клятву, но не лишившийся своих сил, а заимевший свои собственные: подобно силе клятв, в нём загорается искра чего-то большего.
          </Lead>
          <Paragraph theme={theme}>
            И новая сила разгорается не только в нём, но и в его товарищах, вызывая трепет врагов.
          </Paragraph>
          <Paragraph theme={theme}>
            Чтобы стать Пробудившимся, паладин должен быть достаточно самоуверенным и сильным, чтобы противостоять целым армиям и вмещать подобную мощь.
          </Paragraph>
          <Paragraph theme={theme}>
            Совершая великие деяния, эта сила может быть пробуждена или посеяна Божиим промыслом, силой могущественных артефактов и другими причинами по усмотрению мастера.
          </Paragraph>
          <Callout theme={theme} accent={blue} title="Требование">
            Также должен быть достигнут как минимум 7-й уровень в классе. Такой паладин заменяет умения, специфичные для его священной клятвы, умениями Пробужденного.
          </Callout>
          <Quote theme={theme}>
            Он победил своих врагов. Их было больше, чем волос на его голове. Задача, с которой не мог справиться ни один человек в королевстве. Его подготовка и стальная воля не имели себе равных по масштабам и мощи. И вот он стоял здесь, в пещерах Голгофы. Перед ним из озера огненного поднялся трехглавый дракон по имени Голгаран. Размахивая огромным мечом из Сол стали, воин бросился вперёд со звериным боевым кличем. Теперь остались только дракон и Мастер Железа.
          </Quote>
        </Section>

        <Section theme={theme} index="II" title="Заклинания Пробужденного" delay={0.16}>
          <div className="overflow-x-auto mobile-card-table">
            <table className="subclass-table" style={{ '--accent': blue, '--muted': theme.parchmentDim } as React.CSSProperties}>
              <thead>
                <tr>
                  <th>Уровень</th>
                  <th>Заклинание</th>
                </tr>
              </thead>
              <tbody>
                {spells.map((row) => (
                  <tr key={row.level}>
                    <td data-label="Уровень">{row.level}</td>
                    <td data-label="Заклинание">{row.names}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section theme={theme} index="III" title="Канал Искры" delay={0.22}>
          <Paragraph theme={theme}>
            Ваша сила позволяет направлять божественную энергию, чтобы подпитывать магические эффекты. Каждый вариант «Канала Искры», предоставленный вам, объясняет, как его использовать.
          </Paragraph>
          <Paragraph theme={theme}>
            Когда вы используете ваши силы, вы выбираете, какой эффект создать. Затем вы должны окончить короткий или продолжительный отдых, чтобы использовать «Канал Искры» снова.
          </Paragraph>
          <Paragraph theme={theme}>
            Некоторые эффекты «Искры» требуют совершить спасбросок. Когда вы используете эффекты такого рода, Сл равна Сл спасброска от ваших заклинаний паладина.
          </Paragraph>

          <div className="grid md:grid-cols-3 gap-4 mt-5">
            <FeatureCard theme={theme} accent={red} title="Трепет">
              Вы можете действием собрать все свои самые тёмные эмоции и выдать их вспышкой, чтобы источать ужасающее присутствие. Действием вы можете заставить каждое существо по вашему выбору в пределах 30 футов совершить спасбросок Харизмы. При провале существо становится испуганным на 1 минуту. Если существо, испуганное этим эффектом, оканчивает ход более чем в 30 футах от вас, оно может совершить ещё один спасбросок Харизмы для окончания на нём этого эффекта.
            </FeatureCard>
            <FeatureCard theme={theme} accent={blue} title="Приговор">
              Вы можете использовать свой «Божественный канал», чтобы наносить удары со сверхъестественной точностью. Когда вы проводите атаку, вы можете использовать свой «Божественный канал», чтобы получить бонус +10 к этому броску. При критическом попадании c общим значении бонуса равному не менее 40, это попадание становиться по площади. Каждое существо должно совершить спасбросок Силы, при прохождении получает лишь половину урона, от такого попадания.
            </FeatureCard>
            <FeatureCard theme={theme} accent={red} title="Смятение">
              Вы можете действием выбрать целью одно существо, видимое вами и находящееся в пределах 30 футов от вас. Цель должна совершить спасбросок Мудрости. При провале цель должна в каждый свой ход перед перемещением действием совершать приказное действие, которое вы мысленно выбираете в течении минуты. Цель может действовать в свой ход как обычно, если вы не выбрали действие, то использует действие уклонение, смотря на вас и восхищаясь вами. Значительно превосходящая вас в силе-уровне обладает иммунитетом к этому эффекту по усмотрению мастера.
            </FeatureCard>
          </div>
        </Section>

        <Section theme={theme} index="IV" title="7-й уровень: Аура Триумфа" delay={0.28}>
          <Paragraph theme={theme}>
            Паладин, а так же все его подчинённые и НПС получают бонус к броскам урона, равный модификатору Харизмы паладина (минимум +1).
          </Paragraph>
          <Paragraph theme={theme}>
            Игровые юниты получают половину от него, с округлением в большую сторону (минимум +1).
          </Paragraph>
          <BulletList theme={theme} accent={blue} items={[
            'Аура распространяется в пределах 10 футов от него.',
            'Радиус увеличивается до 30 футов на 18 уровне.',
            'Существо может получать преимущество только от одного паладина с таким умением за раз.',
          ]} />
          <Quote theme={theme}>Глядя на этого идиота начинаешь думать, что победа неминуема.</Quote>
        </Section>

        <Section theme={theme} index="V" title="15-й уровень: Несгибаемая стойкость" delay={0.34}>
          <Paragraph theme={theme}>
            Ваша магия проникла в саму суть вашего тела, наделяя вас несгибаемой стойкостью и позволяя карать дерзнувших поднять на вас руку.
          </Paragraph>
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <FeatureCard theme={theme} accent={red} title="Воздаяние">
              Когда существо попадает по вам атакой, оно немедленно получает урон психической энергией, равный вашему модификатору Харизмы (минимум 1), только если находитесь в сознании.
            </FeatureCard>
            <FeatureCard theme={theme} accent={blue} title="Сопротивление">
              Вы снижаете весь физический урон на ваш модификатор Харизмы (минимум 1).
            </FeatureCard>
          </div>
          <Quote theme={theme}>Не-е-ет... Мой... Мой меч! Он же... Он же был крепкий, как скала! Что ты за дьявол такой!?</Quote>
        </Section>

        <Section theme={theme} index="VI" title="20-й уровень: Аватара" delay={0.4}>
          <Paragraph theme={theme}>
            Это кульминация пути Пробуждённого — но не того, кто предал идеалы, а того, кто принял свою истинную сущность. Это синтез вашей мощи, коварства, славы и физической силы.
          </Paragraph>
          <Lead theme={theme}>Вы сбрасываете оковы. На минуту вы становитесь живым воплощением своей собственной силы.</Lead>
          <Callout theme={theme} accent={red} title="Аватара">
            Вы можете действием принять форму Аватара на 1 минуту.
          </Callout>
          <BulletList theme={theme} accent={red} items={[
            'Вы получаете снижение урона ко всем видам урона, равный модификатору Харизмы (минимум 1).',
            'Все проверки Харизмы совершаются с преимуществом.',
            'Когда вы совершаете действие Атака в свой ход, вы можете совершить одну дополнительную атаку в качестве части этого действия.',
            'Ваши рукопашные атаки оружием наносят критический урон при выпадении 19 или 20 на к20.',
          ]} />
          <RuleBlock theme={theme} accent={blue} title="Аура Истинного Облика">
            <BulletList theme={theme} accent={blue} items={[
              'Вы излучаете магическую ауру в радиусе 30 футов. Вы и все избранные вами существа в ауре окутаны мерцающим светом. Враги совершают с помехой броски атаки по этим целям.',
              'Ваша воля давит на врагов. Когда любой враг, находящийся в ауре, начинает там свой ход, он должен совершить спасбросок Мудрости. При провале он получает урон психической энергией 4к10 и становится испуганным вами до конца своего следующего хода. При успехе — получает половину урона и не пугается.',
            ]} />
          </RuleBlock>
          <RuleBlock theme={theme} accent={red} title="Воплощение Воли (Бонусное действие)">
            <Paragraph theme={theme}>
              Во время действия этой формы, в свой ход бонусным действием. Вы совершаете атаку заклинанием. При попадании цель получает урон излучением или некротической энергией (на ваш выбор) 3к10 + ваш модификатор Харизмы. Или вы можете сделать конструкцию не более 5 футов с особыми свойствами, заданными лично вами.
            </Paragraph>
          </RuleBlock>
          <Uses theme={theme}>Использовав это умение, вы не можете использовать его снова, пока не закончите продолжительный отдых.</Uses>
          <Quote theme={theme}>Занавес… И в этой тишине, он понял: выше него — только небо.</Quote>
        </Section>

        <Section theme={theme} index="VII" title="Черта: Наследие" delay={0.46}>
          <Paragraph theme={theme}>
            Когда Пробуждённый использует свою Божественную Кару или наносит удар оружием, он может воззвать к Искре и пробудить наследие одного из своих предков. Вы можете использовать эту способность количество раз, равное вашему БМ:
          </Paragraph>
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <FeatureCard theme={theme} accent={blue} title="Дар Воина">
              Ваш физический удар наносит максимальный урон, игнорирует сопротивление и иммунитеты цели (но не уязвимости).
            </FeatureCard>
            <FeatureCard theme={theme} accent={red} title="Дар Мага">
              Вместо урона оружием — взрыв чистой магической силы. Все существа в радиусе 15 футов от цели должны совершить спасбросок Телосложения. При провале — получают урон излучением, равный урону Божественной Кары + уровень Пробуждённого. При успехе — половину урона.
            </FeatureCard>
          </div>
        </Section>

        <Section theme={theme} index="VIII" title="Заключение" delay={0.52}>
          <Paragraph theme={theme}>
            Данный документ представляет собой фанатское дополнение (homebrew) для настольной ролевой игры Dungeons & Dragons 5th Edition и D&D2024, не является официальным материалом от Wizards of the Coast. Все описанные механики, умения, заклинания и сюжетные элементы созданы в творческих целях и могут быть адаптированы, изменены или дополнены по усмотрению Мастера и игроков.
          </Paragraph>
          <p className="mb-3 text-base md:text-lg leading-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.parchment }}>
            Перед использованием данного подкласса рекомендуется:
          </p>
          <ol className="space-y-2 pl-6 list-decimal text-base md:text-lg leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>
            <li>Согласовать его с Мастером вашей кампании.</li>
            <li>Проверить баланс и возможное взаимодействие с другими игровыми механиками.</li>
            <li>Внести необходимые изменения для соответствия стилю и правилам вашей игровой группы.</li>
          </ol>
          <Paragraph theme={theme}>
            Использование материалов данного файла не гарантирует сбалансированности и может потребовать дополнительной доработки. Удачи в игре, и пусть ваши приключения будут незабываемыми!
          </Paragraph>
          <Quote theme={theme}>Мне просто хотелось выйти за рамки обычного паладина и добавить что-то своё. Удачных игр!</Quote>
        </Section>

        <div className="footer-ornament mt-12" style={{ '--footer-border': `${theme.primaryGlow}20`, '--footer-text-color': theme.primaryGlow } as React.CSSProperties}>
          <div className="rune-string">АС</div>
        </div>
      </main>
    </Layout>
  );
};

interface ThemeProps { theme: ColorTheme; }

interface SectionProps extends ThemeProps {
  index: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

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
        background: 'linear-gradient(135deg, rgba(11,14,24,0.86), rgba(5,6,12,0.68))',
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

const Divider: React.FC<ThemeProps> = ({ theme }) => (
  <div className="rune-divider" style={{ '--divider-color': theme.primaryGlow, '--divider-text': theme.parchment } as React.CSSProperties}>
    <span>АС</span>
  </div>
);

interface TextProps extends ThemeProps { children: React.ReactNode; }

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

const FeatureCard: React.FC<AccentProps> = ({ theme, accent, title, children }) => (
  <div className="rounded p-4 md:p-5 h-full" style={{ background: `${theme.void}88`, border: `1px solid ${accent}2f`, boxShadow: `inset 0 0 18px ${accent}08` }}>
    <h3 className="mb-3 pb-2 text-sm md:text-base font-bold tracking-[1.5px]" style={{ fontFamily: "'Cinzel', serif", color: accent, borderBottom: `1px solid ${accent}2f` }}>{title}</h3>
    <p className="text-base md:text-lg leading-8 text-justify" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>{children}</p>
  </div>
);

interface RuleBlockProps extends AccentProps {}

const RuleBlock: React.FC<RuleBlockProps> = ({ accent, title, children }) => (
  <div className="my-4 rounded p-4" style={{ background: 'rgba(0,0,0,0.16)', border: `1px solid ${accent}24` }}>
    <h3 className="mb-3 text-sm md:text-base font-bold tracking-[2px]" style={{ fontFamily: "'Cinzel', serif", color: accent }}>{title}</h3>
    {children}
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
  <p className="mt-4 rounded px-4 py-3 text-sm md:text-base leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.parchment, background: 'rgba(62,141,224,0.08)', border: `1px solid ${theme.primaryGlow}24` }}>
    {children}
  </p>
);

const Quote: React.FC<TextProps> = ({ theme, children }) => (
  <blockquote className="my-5 rounded px-4 py-4 italic text-base md:text-lg leading-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.parchmentDim, background: 'rgba(0,0,0,0.18)', borderLeft: `3px solid ${theme.accentGlow}` }}>
    {children}
  </blockquote>
);

export default ValerySubclassPage;
