import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { sakrisTheme } from '@/types/theme';
import type { ColorTheme } from '@/types/theme';

const accent = sakrisTheme.primaryGlow;
const blue = sakrisTheme.accentGlow;
const mutedGreen = '#3a8a3a';

const families = [
  {
    name: 'Айронсайд',
    role: 'Защитники и ополчение',
    desc: 'Живут в самом укреплённом доме из толстых брёвен, который служит казармой. Свен Айронсайд, суровый ветеран со шрамом от волчьих зубов, отвечает за оборону и учит молодёжь держать строй. Его сын Гуннар видит в Сакрисе слабое звено, а внук Оттар стал главным соперником Сакриса: сильный, рыжеволосый, яростный, почти идеальный воин деревни. Оттар часто побеждал в дуэлях, но так и не смог сломать Сакриса морально.',
  },
  {
    name: 'Миловар',
    role: 'Хозяйственники и продовольствие',
    desc: 'Дом Миловаров пахнет зерном и козьим молоком. Халл Миловар отвечает за скот, посевы и распределение припасов. После смерти внука Бьярни он стал осторожнее и жёстче. Родители Бьярни, Эрик и Марта, смотрят на Сакриса с тихой болью, а Сигрид, младшая сестра погибшего, долго оставалась одной из немногих, кто приносил Сакрису еду и подарки, видя в нём старшего брата.',
  },
  {
    name: 'Аккерлунд',
    role: 'Охотники, травы и дичь',
    desc: 'Дом Ингвы Аккерлунд увешан трофеями. Ингва — женщина-кремень и глава охотников, её муж Торвальд мастер капканов. Кьяртан, лучший молодой охотник, соперничал с Сакрисом по делу: признавал его ночное зрение и тихий шаг, но подкалывал за нехватку силы. Фрейя, младшая дочь, ходит в отряде Сиракс и всегда сравнивала Сакриса с его более яркой сестрой.',
  },
  {
    name: 'Торбьорн',
    role: 'Горняки и кузнецы',
    desc: 'Их дом примыкает к скале, а из трубы почти всегда валит серый дым. Борг Торбьорн добывает и куёт руду, Эльза распоряжается углём и запасами горы. Их сын Стен — противоположность Сакриса: медлительный, коренастый и мощный. В детстве они часто тренировались вместе; Стен давил массой, Сакрис отвечал скоростью. Между ними не вражда, а сухое признание разных сильных сторон.',
  },
  {
    name: 'Локен',
    role: 'Ткачи и козоводы',
    desc: 'Магда Локен ворчит на непоседливость Сакриса, а её тихий муж Йоран больше говорит с козами, чем с людьми. Астрид, их дочь, в юности не боялась подходить к Сакрису близко и рассматривать узоры его чешуи для вышивок. Он приносил ей из леса кости и рога для застёжек, и между ними сложилась почти бессловесная дружба созерцателей. Хельги, младший пастух, молчал о тайных вылазках Сакриса в обмен на лесные сувениры.',
  },
  {
    name: 'Хромульфы',
    role: 'Кожевники и деревенская оппозиция',
    desc: 'Хромульф Одноухий завидует мастерству Гираксы, матери Сакриса, а Берта известна тяжёлым нравом и слухами. Их сын Вигго был главным подпевалой Оттара: называл Сакриса «Ящерицей», подначивал толпу и устраивал мелкие пакости. После того как Сакрис едва не сломал ему руку на тренировке, Вигго стал действовать исподтишка. Его младший брат Рольф держится тише, особенно после угрозы Сиракс скормить его волкам.',
  },
];

const people = [
  {
    name: 'Алдрик',
    role: 'Староста, учитель детей, бывший архивариус',
    desc: 'Алдрику около семидесяти. Когда-то он служил в южной библиотеке, но уехал на Север из-за преследования за запрещённые книги. Формально он староста, но больше советник и учитель. К Сакрису относился почти как к внуку, научил его орочьему языку и письму — их тайному языку доверия.',
  },
  {
    name: 'Раксис, Гиракса и Сиракс',
    role: 'Семья Сакриса',
    desc: 'Отец Раксис — бывший воин, защитник деревни, плотник и резчик по дереву; он предпочитает инструмент мечу. Мать Гиракса — охотница, кожевница, хорошая кухарка и любительница таксидермии; именно от неё Сакрис унаследовал тягу к уединению и независимости. Сиракс, старшая сестра, напротив, шумная и яркая: рано стала помощницей охотников, а перед уходом брата уже командовала собственным отрядом.',
  },
  {
    name: 'Тормхен Одноглазый',
    role: 'Бывший наёмник и хранитель запасов',
    desc: 'Осел в деревне после ранения на тракте. Теперь следит за соленьями, вареньями и настойками, чтобы зимние припасы не пропали. Он часто заходил к Гираксе за едой и приносил истории, услышанные от торговцев. Для Сакриса Тормхен был источником слухов о внешнем мире.',
  },
  {
    name: 'Юна Рыжая Вьюга',
    role: 'Скальдиха-изгой и хранительница историй',
    desc: 'Пять лет назад Юна пришла из метели почти замёрзшей и поселилась в заброшенном амбаре. Хромая женщина с рыжими волосами, птичьими черепами и медными кольцами знает песни и истории, от которых стынет кровь. Она рассказывала Сакрису не только легенды, но и правду о городах, наёмниках, гильдиях и караванах. Именно её слова о волке в клетке стали последним толчком к побегу.',
  },
  {
    name: 'Вельма',
    role: 'Травница и повитуха',
    desc: 'Сухая старушка с глазами цвета льда знает растения мерзлоты, лечит раны, принимает роды и готовит мази. За ней ходит старый ворон Крюк. Вельма не боялась изучать чешую Сакриса, лечила его после стычек и отправляла за редкими лишайниками к скалам и карстовой воронке. Она научила его отличать лекарство от яда и не умирать от красивой ягоды.',
  },
];

const landmarks = [
  {
    name: 'Рунный камень',
    desc: 'Гигантский камень с выцарапанными рунами, вокруг которого строилась деревня. Никто не знает, кто поставил его первым. При приближении бурь он издаёт низкий вибрирующий звук, и местные верят, что камень оберегает Бергхейм. Если руны вспыхивают, это считают предупреждением о беде.',
  },
  {
    name: 'Незамерзающая воронка',
    desc: 'Глубокая карстовая воронка в паре миль от деревни, заполненная водой. Даже в морозы она не замерзает, а ночью отражает небо так ясно, будто под землёй лежит второе звёздное море. Юна иногда поёт у воды на языке, который не понимает даже Алдрик.',
  },
  {
    name: 'Рудная скала',
    desc: 'Небольшая выработка железной руды у скалы рядом с домом Торбьорнов. Она не делает Бергхейм богатым, но даёт металл для инструментов, гвоздей, капканов и простого оружия, без которого деревня не пережила бы долгие зимы.',
  },
];

const BerghheimPage: React.FC = () => {
  const theme = sakrisTheme;

  return (
    <Layout theme={theme} particleVariant="mixed" particleCount={30}>
      <main className="subclass-page max-w-[980px] mx-auto px-5 sm:px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={theme} characterId="sakris" />

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center pb-8 mb-10"
        >
          <p className="text-xs md:text-sm uppercase tracking-[4px] mb-3" style={{ fontFamily: "'Cinzel', serif", color: theme.parchmentDim }}>
            Родина Сакриса Ульриаша
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold tracking-[4px] mb-3"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: theme.silverBright,
              textShadow: `0 0 30px ${accent}40, 0 2px 6px rgba(0,0,0,0.9)`,
            }}
          >
            Бергхейм
          </h1>
          <div className="rune-divider" style={{ '--divider-color': accent, '--divider-text': theme.parchment } as React.CSSProperties}>
            <span>СЕВЕРНЫЙ КАМЕНЬ</span>
          </div>
          <p className="text-base md:text-lg italic mt-4 max-w-3xl mx-auto leading-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.parchmentDim }}>
            Самодостаточная деревня в северном лесу, где около сотни людей поколениями держатся за камень, охоту, коз, железо и память о тех, кто ушёл.
          </p>
        </motion.header>

        <Section theme={theme} index="I" title="Общий облик" delay={0.1}>
          <Paragraph theme={theme}>
            Бергхейм — маленькая северная община, построенная вокруг древнего рунного камня. Здесь живёт около сотни человек: в основном люди, чьи семьи остаются на этой земле поколениями. Иногда в деревне оседают чужаки, но чаще по несчастью, чем по выбору.
          </Paragraph>
          <Paragraph theme={theme}>
            Деревня выживает за счёт леса и собственных рук. Охотники добывают дичь, козы дают молоко, мясо, шерсть и мех, на скудных участках растут морозостойкие культуры, а небольшая рудная жила обеспечивает железом кузнеца. Это не богатое место, но достаточно крепкое, чтобы не просить помощи каждый сезон.
          </Paragraph>
        </Section>

        <Section theme={theme} index="II" title="Устройство и власть" delay={0.16}>
          <Paragraph theme={theme}>
            Формально деревней управляет староста Алдрик — начитанный старик, бывший архивариус с Юга. Его уважают за память, грамотность и способность учить детей. Но в повседневной жизни настоящая власть держится на трёх семейных опорах.
          </Paragraph>
          <div className="grid md:grid-cols-3 gap-4 mt-5">
            <FeatureCard theme={theme} accent={accent} title="Свен Айронсайд">
              Глава ополчения. Отвечает за защиту деревни, оружейную дисциплину и обучение молодёжи.
            </FeatureCard>
            <FeatureCard theme={theme} accent={blue} title="Халл Миловар">
              Смотрит за скотом, посевами, запасами и распределением продовольствия.
            </FeatureCard>
            <FeatureCard theme={theme} accent={mutedGreen} title="Ингва Аккерлунд">
              Руководит охотниками, сбором трав, добычей дичи и свежеванием.
            </FeatureCard>
          </div>
        </Section>

        <Section theme={theme} index="III" title="Места силы и памяти" delay={0.22}>
          <div className="grid md:grid-cols-3 gap-4">
            {landmarks.map((place) => (
              <FeatureCard key={place.name} theme={theme} accent={place.name === 'Незамерзающая воронка' ? blue : accent} title={place.name}>
                {place.desc}
              </FeatureCard>
            ))}
          </div>
        </Section>

        <Section theme={theme} index="IV" title="Роды Бергхейма" delay={0.28}>
          <div className="space-y-4">
            {families.map((family) => (
              <InfoBlock key={family.name} theme={theme} accent={accent} title={family.name} subtitle={family.role}>
                {family.desc}
              </InfoBlock>
            ))}
          </div>
        </Section>

        <Section theme={theme} index="V" title="Отдельные жители" delay={0.34}>
          <div className="space-y-4">
            {people.map((person, idx) => (
              <InfoBlock key={person.name} theme={theme} accent={idx % 2 === 0 ? blue : accent} title={person.name} subtitle={person.role}>
                {person.desc}
              </InfoBlock>
            ))}
          </div>
        </Section>

        <Section theme={theme} index="VI" title="Сакрис и Бергхейм" delay={0.4}>
          <Paragraph theme={theme}>
            Сакрис был частью этой деревни, но никогда не помещался в её мерки. Он был вынослив, скрытен и наблюдателен, но недостаточно силён для того образа воина, который уважали Свен, Гуннар и Оттар. Его полезность видели не все, а сам он всё чаще воспринимал Бергхейм как тесную клетку.
          </Paragraph>
          <Paragraph theme={theme}>
            Детство Сакриса держалось на нескольких связях: дружбе с Бьярни, тайном языке с Алдриком, лесных уроках Гираксы, историях Юны, помощи Вельмы и молчаливом понимании с теми, кто тоже жил немного в стороне от общего шума. После смерти Бьярни, ссор с родителями и мечты о Нортвинде Сакрис ушёл за караваном, оставив только записку.
          </Paragraph>
          <Quote theme={theme}>
            Для Бергхейма Сакрис — тот, кто ушёл слишком рано. Для Сакриса Бергхейм — место, к которому ещё придётся вернуться, даже если он пока не знает, как посмотреть в глаза тем, кто его искал.
          </Quote>
        </Section>

        <div className="footer-ornament mt-12" style={{ '--footer-border': `${accent}20`, '--footer-text-color': accent } as React.CSSProperties}>
          <div className="rune-string">БЕРГХЕЙМ</div>
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
    <div className="section-header" style={{ '--section-border': `${accent}30`, '--section-icon-color': blue, '--section-title-color': theme.parchment, '--section-line-color': accent } as React.CSSProperties}>
      <span className="section-icon text-xs tracking-[2px]" style={{ fontFamily: "'Cinzel', serif" }}>{index}</span>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
    </div>
    <div
      className="rounded-lg p-5 md:p-7 text-left"
      style={{
        background: 'linear-gradient(135deg, rgba(8,20,12,0.86), rgba(4,10,6,0.68))',
        border: `1px solid ${accent}28`,
        boxShadow: `0 18px 50px rgba(0,0,0,0.25), inset 0 0 28px ${accent}08`,
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

interface FeatureCardProps extends TextProps { accent: string; title: string; }
const FeatureCard: React.FC<FeatureCardProps> = ({ theme, accent, title, children }) => (
  <div className="rounded p-4 md:p-5 h-full" style={{ background: `${theme.void}88`, border: `1px solid ${accent}2f`, boxShadow: `inset 0 0 18px ${accent}08` }}>
    <h3 className="mb-3 pb-2 text-sm md:text-base font-bold tracking-[1.5px]" style={{ fontFamily: "'Cinzel', serif", color: accent, borderBottom: `1px solid ${accent}2f` }}>{title}</h3>
    <p className="text-base md:text-lg leading-8 text-justify" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>{children}</p>
  </div>
);

interface InfoBlockProps extends TextProps { accent: string; title: string; subtitle: string; }
const InfoBlock: React.FC<InfoBlockProps> = ({ theme, accent, title, subtitle, children }) => (
  <div className="rounded p-4 md:p-5" style={{ background: 'rgba(0,0,0,0.16)', borderLeft: `3px solid ${accent}`, borderTop: `1px solid ${accent}18` }}>
    <div className="text-base md:text-lg font-bold tracking-[1.2px]" style={{ fontFamily: "'Cinzel', serif", color: theme.parchment }}>{title}</div>
    <div className="text-xs md:text-sm tracking-[1.8px] uppercase mt-1 mb-3" style={{ fontFamily: "'Cinzel', serif", color: accent }}>{subtitle}</div>
    <p className="text-base md:text-lg leading-8 text-justify" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}>{children}</p>
  </div>
);

const Quote: React.FC<TextProps> = ({ theme, children }) => (
  <blockquote className="my-5 rounded px-4 py-4 italic text-base md:text-lg leading-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.parchmentDim, background: 'rgba(0,0,0,0.18)', borderLeft: `3px solid ${blue}` }}>
    {children}
  </blockquote>
);

export default BerghheimPage;
