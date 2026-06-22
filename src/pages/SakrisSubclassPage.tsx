import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { sakrisTheme } from '@/types/theme';
import type { ColorTheme } from '@/types/theme';

const green = sakrisTheme.primaryGlow;
const blue = sakrisTheme.accentGlow;
const violet = '#b48af0';

const patronSpells = [
  {
    level: '3',
    spells: 'Приказ, Вызов на дуэль, Удержание личности, Пронзание разума, Гневная кара.',
  },
  {
    level: '5',
    spells: 'Ужас, Послание.',
  },
  {
    level: '7',
    spells: 'Принуждение, Оглушающая кара.',
  },
  {
    level: '9',
    spells: 'Подчинение личности, Синаптический разряд.',
  },
];

const SakrisSubclassPage: React.FC = () => {
  const theme = sakrisTheme;

  return (
    <Layout theme={theme} particleVariant="arcane" particleCount={30}>
      <main className="subclass-page max-w-[980px] mx-auto px-5 sm:px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={theme} characterId="sakris" />

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
            Подкласс Сакриса
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold tracking-[3px] leading-tight"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: theme.silverBright,
              textShadow: `0 0 28px ${theme.primaryGlow}40, 0 0 56px ${theme.accentGlow}18, 0 2px 6px rgba(0,0,0,0.9)`,
            }}
          >
            Король-чародей
          </h1>
          <Divider theme={theme} />
          <div
            className="inline-flex max-w-full items-center justify-center rounded px-4 py-2 text-xs md:text-sm tracking-[1.4px] font-bold"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'rgba(53,184,90,0.12)',
              border: `1px solid ${theme.primaryGlow}55`,
              color: theme.primaryBright,
              boxShadow: `0 0 20px ${theme.primaryGlow}16`,
            }}
          >
            Колдун: иной покровитель, чудовищный правитель и источник псионической тирании
          </div>
        </motion.header>

        <Section theme={theme} index="I" title="Описание покровителя" delay={0.1}>
          <Lead theme={theme}>
            Воплощайте мощь тирании чудовищных правителей. Ваш договор черпает силу от чудовищного тирана, подобного полубогу или невероятно могущественному заклинателю.
          </Lead>
          <Paragraph theme={theme}>
            Через договор вы становитесь вестником его интересов в мире, проводником его влияния и искажающей разум псионической силы. Личность покровителя может оставаться непостижимой: голос из тени, власть без лица, приказ, которому невозможно не внимать.
          </Paragraph>
        </Section>

        <Section theme={theme} index="II" title="Основа колдуна" delay={0.16}>
          <Paragraph theme={theme}>
            В ходе оккультного ритуала вы заключили договор с таинственной сущностью, чтобы обрести магическую силу. Этот дар позволяет накладывать заклинания колдуна и использовать Магию договора.
          </Paragraph>
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <FeatureCard theme={theme} accent={green} title="Магия договора">
              Вы знаете 2 заговора колдуна на 1-м уровне. Каждый раз, когда получаете уровень колдуна, можете заменить 1 заговор другим из списка колдуна. На 4 и 10 уровнях вы изучаете дополнительный заговор.
            </FeatureCard>
            <FeatureCard theme={theme} accent={blue} title="Ячейки заклинаний">
              Все ячейки Магии договора имеют один уровень, указанный в таблице колдуна. Вы восстанавливаете все потраченные ячейки после короткого или продолжительного отдыха.
            </FeatureCard>
            <FeatureCard theme={theme} accent={blue} title="Подготовленные заклинания">
              Вы подготавливаете список заклинаний 1+ уровня из списка колдуна. Количество подготовленных заклинаний растёт с уровнем. При получении уровня колдуна вы можете заменить 1 подготовленное заклинание другим, для которого у вас есть ячейка.
            </FeatureCard>
            <FeatureCard theme={theme} accent={green} title="Харизма и фокусировка">
              Харизма — ваша заклинательная характеристика для заклинаний колдуна. В качестве заклинательной фокусировки вы можете использовать магическую фокусировку.
            </FeatureCard>
          </div>
          <Uses theme={theme}>
            Рекомендации из исходного текста сохранены кратко: Мистический заряд и Фокусы для заговоров; Очарование личности и Сглаз для начальных заклинаний 1 уровня.
          </Uses>
        </Section>

        <Section theme={theme} index="III" title="Таинственные воззвания" delay={0.22}>
          <Paragraph theme={theme}>
            С 1-го уровня вы обнаружили Таинственные воззвания — частицы запретных знаний, которые наделяют вас постоянными магическими силами или иными знаниями. Вы можете выбрать 1 воззвание на свой выбор, например «Договор гримуара».
          </Paragraph>
          <BulletList theme={theme} accent={green} items={[
            'Если у воззвания есть необходимые условия, вы должны выполнить их, чтобы изучить это воззвание.',
            'Каждый раз, когда получаете уровень колдуна, вы можете заменить одно из своих воззваний на другое, требованиям которого соответствуете.',
            'Вы не можете заменить воззвание, если оно необходимо для другого воззвания, которое у вас есть.',
            'На определённых уровнях колдуна вы получаете дополнительные воззвания согласно таблице класса. Одно и то же воззвание нельзя выбирать более одного раза, если в его описании не указано иного.',
          ]} />
          <Callout theme={theme} accent={blue} title="2-й уровень: Магическая хитрость">
            Вы проводите эзотерический ритуал длительностью 1 минуту. По завершении восстанавливаете потраченные ячейки Магии договора, но не больше половины от максимального количества, округляя в большую сторону. После использования это умение восстанавливается после продолжительного отдыха.
          </Callout>
        </Section>

        <Section theme={theme} index="IV" title="3-й уровень: Заклинания короля-чародея" delay={0.28}>
          <Paragraph theme={theme}>
            Магия вашего покровителя гарантирует, что у вас всегда подготовлены определённые заклинания. Когда вы достигаете указанного уровня колдуна, заклинания из таблицы считаются всегда подготовленными и считаются заклинаниями колдуна для вас.
          </Paragraph>
          <Callout theme={theme} accent={violet} title="Псионическое наложение">
            Когда вы накладываете заклинание из списка «Заклинания короля-чародея», вы можете сделать это без вербальных и/или материальных компонентов, кроме расходуемых компонентов или компонентов с указанной стоимостью.
          </Callout>
          <div className="overflow-x-auto mobile-card-table mt-5">
            <table className="subclass-table" style={{ '--accent': green, '--muted': theme.parchmentDim } as React.CSSProperties}>
              <thead>
                <tr>
                  <th>Уровень</th>
                  <th>Заклинания</th>
                </tr>
              </thead>
              <tbody>
                {patronSpells.map((row) => (
                  <tr key={row.level}>
                    <td data-label="Уровень">{row.level}</td>
                    <td data-label="Заклинания">{row.spells}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section theme={theme} index="V" title="3-й уровень: Вестник тирана" delay={0.34}>
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureCard theme={theme} accent={green} title="Устрашающее присутствие">
              Вы получаете владение навыком Запугивание, если у вас его ещё нет. Кроме того, вы получаете компетентность в Запугивании.
            </FeatureCard>
            <FeatureCard theme={theme} accent={blue} title="Глас тирании">
              Вы можете накладывать заклинание Приказ бонусным действием без траты ячейки заклинания. Вы можете сделать это количество раз, равное вашему модификатору Харизмы (минимум 1 раз), и восстанавливаете все потраченные применения после продолжительного отдыха.
            </FeatureCard>
          </div>
        </Section>

        <Section theme={theme} index="VI" title="4-й уровень: Улучшение характеристик" delay={0.4}>
          <Paragraph theme={theme}>
            Вы получаете черту Улучшение характеристик или другую черту по вашему выбору, требованиям которой соответствуете. Вы снова получаете эту способность на уровнях колдуна 8, 12 и 16.
          </Paragraph>
        </Section>

        <Section theme={theme} index="VII" title="6-й уровень: Решительный эдикт" delay={0.46}>
          <Paragraph theme={theme}>
            Сила вашего покровителя прорывается сквозь вас, позволяя воодушевлять союзников и подчинять врагов. Когда вы накладываете заклинание ячейкой Магии договора, вы можете вызвать взрыв нечестивой силы в эманации радиусом 30 футов, исходящей от вас.
          </Paragraph>
          <Paragraph theme={theme}>
            Для каждого видимого существа в этой эманации выберите один из следующих эффектов:
          </Paragraph>
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <FeatureCard theme={theme} accent={green} title="Воодушевить">
              Существо получает преимущество на броски атаки до конца своего следующего хода.
            </FeatureCard>
            <FeatureCard theme={theme} accent={violet} title="Подчинить">
              Существо должно преуспеть в спасброске Мудрости против Сл спасброска ваших заклинаний или получить состояние испуганный до конца своего следующего хода.
            </FeatureCard>
          </div>
          <Uses theme={theme}>
            После применения этот эффект нельзя применять снова, пока вы не завершите короткий или продолжительный отдых. Вы также восстанавливаете возможность применить это умение, когда применяете Магическую хитрость.
          </Uses>
        </Section>

        <Section theme={theme} index="VIII" title="9-й уровень: Связь с покровителем" delay={0.52}>
          <Paragraph theme={theme}>
            Раньше, чтобы связаться со своим покровителем, вам приходилось действовать через посредников. Теперь вы можете связываться с ним напрямую: у вас всегда подготовлено заклинание Связь с иным планом.
          </Paragraph>
          <Paragraph theme={theme}>
            Благодаря этому умению вы можете наложить это заклинание без расхода ячейки, чтобы связаться со своим покровителем, и автоматически преуспеваете в спасброске от этого заклинания. После такого применения вы не сможете сделать это снова до завершения продолжительного отдыха.
          </Paragraph>
        </Section>

        <Section theme={theme} index="IX" title="10-й уровень: Мстительный отпор" delay={0.58}>
          <Paragraph theme={theme}>
            Вы учитесь давать отпор тем, кто бросает вызов вам или могуществу вашего покровителя. Когда враг попадает по вам броском атаки, вы можете реакцией заставить врага перебросить к20, и он обязан использовать новый результат.
          </Paragraph>
          <Paragraph theme={theme}>
            Если этот переброс превращает атаку в промах, существо, вызвавшее этот эффект, получает психический урон, равный вашему уровню колдуна.
          </Paragraph>
          <Uses theme={theme}>
            Вы можете применять это умение количество раз, равное вашему модификатору Харизмы (минимум 1 раз), и восстанавливаете все потраченные применения после продолжительного отдыха.
          </Uses>
        </Section>

        <Section theme={theme} index="X" title="11-й уровень: Таинственный арканум" delay={0.64}>
          <Paragraph theme={theme}>
            Ваш покровитель дарует вам магический секрет, называемый арканумом. Выберите 1 заклинание 6 уровня из списка заклинаний колдуна в качестве арканума. Вы можете накладывать это заклинание 1 раз без расхода ячейки, после чего должны завершить продолжительный отдых, чтобы наложить его снова.
          </Paragraph>
          <BulletList theme={theme} accent={blue} items={[
            'На 13 уровне вы получаете ещё одно заклинание арканума 7 уровня.',
            'На 15 уровне вы получаете ещё одно заклинание арканума 8 уровня.',
            'На 17 уровне вы получаете ещё одно заклинание арканума 9 уровня.',
            'По завершении продолжительного отдыха вы восстанавливаете все использованные заклинания Таинственного арканума.',
            'При получении уровня колдуна вы можете заменить одно из своих заклинаний арканума другим заклинанием колдуна того же уровня.',
          ]} />
        </Section>

        <Section theme={theme} index="XI" title="14-й уровень: Абсолютная тирания" delay={0.7}>
          <Paragraph theme={theme}>
            Вы владеете тиранической мощью своего покровителя с абсолютной убеждённостью. Каждый раз, когда вы накладываете заклинание Приказ, вы можете выбрать в качестве цели ещё одно существо в пределах дистанции заклинания.
          </Paragraph>
          <Paragraph theme={theme}>
            Кроме того, существо, находящееся в состоянии испуганный из-за вас, автоматически проваливает спасбросок против любого наложенного вами заклинания Приказ.
          </Paragraph>
        </Section>

        <Section theme={theme} index="XII" title="19-й и 20-й уровни" delay={0.76}>
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureCard theme={theme} accent={violet} title="19-й уровень: Эпическая черта">
              Вы получаете эпическую черту или другую черту по вашему выбору, требованиям которой соответствуете. Рекомендуется черта Дар судьбы.
            </FeatureCard>
            <FeatureCard theme={theme} accent={green} title="20-й уровень: Таинственный мастер">
              Когда вы используете своё умение Магическая хитрость, вы восстанавливаете все потраченные ячейки заклинаний Магии договора.
            </FeatureCard>
          </div>
        </Section>

        <div className="footer-ornament mt-12" style={{ '--footer-border': `${theme.primaryGlow}20`, '--footer-text-color': theme.primaryGlow } as React.CSSProperties}>
          <div className="rune-string">КОРОЛЬ-ЧАРОДЕЙ</div>
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
        background: 'linear-gradient(135deg, rgba(8,20,12,0.86), rgba(4,10,6,0.68))',
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
    <span>САКРИС</span>
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
  <p className="mt-4 rounded px-4 py-3 text-sm md:text-base leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.parchment, background: 'rgba(53,184,90,0.08)', border: `1px solid ${theme.primaryGlow}24` }}>
    {children}
  </p>
);

export default SakrisSubclassPage;
