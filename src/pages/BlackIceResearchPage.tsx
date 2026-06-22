import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { brinTheme } from '@/types/theme';

const BASE = import.meta.env.BASE_URL;

const stages = [
  {
    phase: 'I',
    title: 'Арканная инвазия',
    desc: 'Видимых телесных признаков почти нет. Возникают внутренний озноб, чувство опустошения и страх. На нитях личного Плетения формируются микроскопические узлы сжатия, а аура начинает незаметно поглощать тепло и энергию.',
  },
  {
    phase: 'II',
    title: 'Локальная кристаллизация',
    desc: 'После накопления критической плотности появляются подкожные очаги Чёрного льда. Кристалл не похож на обычный лёд: он плотнее, не поддаётся нормальному плавлению и витрифицирует ближайшие магические нити. Лечебная магия на этой стадии ускоряет рост матрикса.',
  },
  {
    phase: 'III',
    title: 'Симбиотический коллапс',
    desc: 'Кристаллическая корка поражает значительную часть тела. Боль исчезает, сознание мутнеет, а личный магический контур превращается в арканную сингулярность, агрессивно втягивающую внешние потоки Плетения.',
  },
  {
    phase: 'IV',
    title: 'Планарный маяк',
    desc: 'После смерти тело становится монолитом из Чёрного льда. Душа вытесняется, но индивидуальное Плетение не рассеивается: оно вплавляется в кристалл, превращая статую в ретранслятор сигнала, направленного за пределы материального плана.',
  },
];

const conclusions = [
  'Чёрный лед не является простой инфекцией, обморожением или стихийным проклятием.',
  'Его природа ближе к экстрапланарному энергоинформационному вирусу, внедряющемуся в Магическое Плетение живого носителя.',
  'Грубое вливание арканной или божественной энергии не лечит болезнь, а питает вирусную матрицу.',
  'Терминальные статуи следует считать не останками, а межпространственными трансляторами.',
  'Гипотеза врождённого симбиоза допускает существование носителя, способного управлять Чёрным льдом без разрушения тела.',
];

const references = [
  'Анонимный автор. О разрывах Плетения и внешних вторжениях. Архив Башни Истины. 312 г.',
  'Ван дер Кольк М. Некроз магических тканей: симптоматика и паллиативная помощь. Вестник Гильдии Целителей Севера. 418.',
  'Лорд Казель. Трактат о стихийных проклятиях. Королевское издательство Астарии. 395 г.',
  'Мерфи Т. Полевые заметки о некрозе неясного генеза в поселениях Нортвинда. 421 г.',
  'Сильверстоун Э. Резонансная магометрия: practical guide. Столичный Университет Магии. 410 г.',
  'Фон Карн Э. Деградация биологических тканей при магическом истощении. Университетский вестник Иллирии. 412.',
];

const BlackIceResearchPage: React.FC = () => {
  const theme = brinTheme;

  return (
    <Layout theme={theme} particleVariant="arcane" particleCount={18}>
      <main className="subclass-page max-w-[1040px] mx-auto px-4 sm:px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={theme} characterId="brin" />

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="manuscript-page rounded-xl p-5 sm:p-7 md:p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(246,232,202,0.96), rgba(218,196,158,0.93))',
            color: '#2a1812',
            border: '1px solid rgba(92,54,24,0.45)',
            boxShadow: '0 24px 70px rgba(0,0,0,0.45), inset 0 0 80px rgba(80,38,16,0.16)',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          <header className="text-center mb-10 pb-8" style={{ borderBottom: 'double 4px rgba(92,54,24,0.42)' }}>
            <div className="text-xs md:text-sm uppercase tracking-[3px] mb-3" style={{ fontFamily: "'Cinzel', serif", color: '#6b2d3a' }}>
              Иллирийское Королевское Научное Общество. 425 г. Т. 1, № 1. С. 1–85
            </div>
            <div className="text-[11px] md:text-xs tracking-[1.8px] mb-5" style={{ fontFamily: "'Cinzel', serif", color: '#6a513c' }}>
              Научная статья. УДК 133.4:616-003.8:530.145:544.22. doi:10.1234/illiria-425-1-1-85
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-[1.8px] leading-tight" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#25120f' }}>
              Феноменальная деструкция и аномальная интеграция в структуру Магического Плетения
            </h1>
            <p className="mt-4 text-lg md:text-xl italic leading-8" style={{ color: '#4b2c22' }}>
              Теоретическое обоснование концепции «арканного вируса» Чёрного льда в условиях многомерной планарной интерференции
            </p>
            <div className="mt-6 text-base md:text-lg" style={{ color: '#2a1812' }}>
              <strong>Йохан Вальтц</strong><br />
              Независимый исследователь, Иллирия, округ Нортвинд, Иллирийская Академия Наук
            </div>
            <a
              href={`${BASE}docs/Fenomenologia_Chernogo_lda.pdf`}
              className="inline-block mt-6 rounded px-4 py-2 text-xs md:text-sm tracking-[1.4px]"
              style={{ fontFamily: "'Cinzel', serif", color: '#f7ead2', background: '#5f2634', border: '1px solid rgba(60,20,20,0.45)', textDecoration: 'none' }}
            >
              Открыть подлинный свиток PDF
            </a>
          </header>

          <Section title="Аннотация" ornament="Abstractum">
            <p className="dropcap text-justify">
              В работе представлен критический пересмотр природы заболевания, известного как «Чёрный лед», эндемичного для приполярных и субполярных территорий Иллирии, особенно округа Нортвинд. Автор отвергает как сугубо биологическое, так и теологическо-проклятийное объяснение феномена, предлагая концепцию «арканного вируса» — внепланарного энергоинформационного паттерна, внедряющегося в индивидуальное Магическое Плетение живого носителя.
            </p>
            <p className="mt-4 text-justify">
              Особое внимание уделено фазам поражения, геометрии Плетения с аномальными углами 47 и 113 градусов, физико-алхимическим свойствам кристаллического матрикса и гипотезе врождённого симбиоза, при котором Чёрный лед может стать не причиной гибели, а частью устойчивой живой структуры.
            </p>
            <p className="mt-4 text-sm md:text-base italic">
              <strong>Ключевые слова:</strong> Чёрный лед, Магическое Плетение, арканный вирус, Нортвинд, экстрапланарные аномалии, магобиологический симбиоз, сумеречное серебро.
            </p>
          </Section>

          <Section title="I. Введение и историко-географический контекст" ornament="De origine">
            <p className="text-justify">
              Северные земли Иллирии веками сталкиваются с заболеванием, при котором органические ткани постепенно замещаются иссиня-чёрной кристаллической субстанцией. Болезнь смертельна, не поддаётся обычной медицине и сопротивляется привычным формам арканного лечения. Очаги особенно часто возникают в округе Нортвинд, где холод, разреженность Плетения и древние планарные нарушения создают условия для устойчивой инвазии.
            </p>
            <p className="mt-4 text-justify">
              Страх местных жителей, неудачи официальных экспедиций и сокрытие масштабов угрозы превратили Чёрный лед из медицинской загадки в проблему государственной безопасности.
            </p>
          </Section>

          <Section title="II. О прежних теориях" ornament="Contra errores">
            <div className="grid md:grid-cols-3 gap-4">
              <MiniCard title="Магобиологическая школа">
                Фон Карн считала болезнь формой клеточного коллапса от холода и истощения эфира. Вальтц возражает: падение ауры является следствием, а не причиной поражения.
              </MiniCard>
              <MiniCard title="Проклятийная школа">
                Казель связывал Чёрный лед с волей элементалей. Однако ритуалы очищения повышали заболеваемость, поскольку грубая энергия становилась пищей для патогена.
              </MiniCard>
              <MiniCard title="Полевые заметки">
                Мерфи точно описал симптомы, но не проводил магометрических замеров, поэтому его труд остался клинической летописью без объяснения механизма.
              </MiniCard>
            </div>
          </Section>

          <Section title="III. Метод и приборы" ornament="Instrumenta">
            <p className="text-justify">
              Исследование велось в изолированной северной лаборатории. Главным инструментом стал дифференциальный арканный интерферометр с фильтрами из сумеречного серебра — сплава мифрила и холодного железа, выдержанного в планарном разломе. Прибор отсекал фоновые шумы материального плана и фиксировал колебания личной эфирной нити субъекта.
            </p>
            <div className="my-5 rounded p-4 text-center" style={{ background: 'rgba(74,42,20,0.10)', border: '1px solid rgba(74,42,20,0.22)', fontFamily: "'Cinzel', serif" }}>
              Ψ = (Δλ × Kэф) / ∫(Ωm × dt)
            </div>
            <p className="text-justify">
              Здесь Ψ обозначает интегральную деформацию Плетения, Δλ — фазовый сдвиг эфирной нити, Kэф — стабильность сумеречного серебра, Ωm — плотность жизненной энергии, а t — время фиксации сигнала.
            </p>
          </Section>

          <Section title="IV. Четыре фазы патогенеза" ornament="Gradus morbi">
            <div className="overflow-x-auto mobile-card-table">
              <table className="manuscript-table">
                <thead>
                  <tr>
                    <th>Фаза</th>
                    <th>Название</th>
                    <th>Краткое описание</th>
                  </tr>
                </thead>
                <tbody>
                  {stages.map((stage) => (
                    <tr key={stage.phase}>
                      <td data-label="Фаза">{stage.phase}</td>
                      <td data-label="Название">{stage.title}</td>
                      <td data-label="Описание">{stage.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="V. Геометрия Плетения и матрикс" ornament="De figura">
            <p className="text-justify">
              Главным доказательством внепланарной природы Чёрного льда Вальтц считает геометрию поражённого Плетения. В норме его нити сходятся под углами 60, 90 и 120 градусов. Внутри очагов Чёрного льда стабильно фиксируются углы 47 и 113 градусов — невозможные для устойчивой топологии Иллирии.
            </p>
            <p className="mt-4 text-justify">
              Кристаллический матрикс инертен к обычным кислотам, необычно реагирует на мифрил и холодное железо, а в сильных магнитных полях проявляет аномальный диамагнетизм. Это указывает, что вещество не просто замещает ткани, а перестраивает локальную реальность под чужую планарную логику.
            </p>
          </Section>

          <Section title="VI. Гипотеза врождённого симбиоза" ornament="De symbiosi">
            <p className="text-justify">
              Автор предполагает, что высокая смертность не является целью патогена, а лишь следствием несовместимости человеческой биологии с плотностью внепланарной энергии. Если инвазия происходит на ранней стадии эмбрионального развития, чужой код может стать частью базовой структуры организма, не разрушая его.
            </p>
            <p className="mt-4 text-justify">
              В таком случае рождается не жертва болезни, а стабильный носитель: живой проводник Чёрного льда, способный оперировать его энергией без классических школ магии. Эта гипотеза особенно важна для понимания природы Брина дель Хессена и его связи с Чёрным льдом.
            </p>
          </Section>

          <Section title="VII. Клинические наблюдения" ornament="Observationes">
            <div className="grid md:grid-cols-2 gap-4">
              <MiniCard title="Пациент N-11">
                Охотник с низким магическим фоном. Болезнь развивалась медленнее: от синюшного пятна и потери чувствительности до полной кристаллизации. После смерти монолит излучал стабильные импульсы с углами Плетения 47 и 113 градусов.
              </MiniCard>
              <MiniCard title="Пациент S-04">
                Маг-элементалист с развитой системой маны. Заболевание прогрессировало быстрее: магические каналы стали магистралями для вирусного кода. Терминальный маяк оказался значительно мощнее.
              </MiniCard>
            </div>
          </Section>

          <Section title="VIII. Выводы" ornament="Conclusio">
            <ol className="space-y-2 pl-6 list-decimal leading-7">
              {conclusions.map((item) => <li key={item}>{item}</li>)}
            </ol>
            <p className="mt-5 text-justify">
              Автор призывает независимое научное сообщество Иллирии разрабатывать методы фазового подавления чужеродных углов 47/113 и отказаться от догматических попыток лечить Чёрный лед обычным вливанием энергии.
            </p>
          </Section>

          <Section title="Благодарности и источники" ornament="Fontes">
            <p className="text-justify">
              Вальтц выражает благодарность магистру Т., жителям изолированных поселений Нортвинда и всем, кто содействовал магометрическим замерам в условиях северных экспедиций.
            </p>
            <ol className="mt-4 space-y-2 pl-6 list-decimal text-sm md:text-base leading-6">
              {references.map((ref) => <li key={ref}>{ref}</li>)}
            </ol>
            <p className="mt-5 text-sm italic">
              Статья поступила в редакцию 10.05.425; одобрена после рецензирования 28.05.425; принята к публикации 31.05.425. © Вальтц Й., 425.
            </p>
          </Section>
        </motion.article>
      </main>
    </Layout>
  );
};

interface SectionProps {
  title: string;
  ornament: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, ornament, children }) => (
  <section className="my-8 md:my-10">
    <div className="mb-4 pb-2" style={{ borderBottom: '1px solid rgba(92,54,24,0.28)' }}>
      <div className="text-[10px] md:text-xs uppercase tracking-[2.4px] mb-1" style={{ fontFamily: "'Cinzel', serif", color: '#7c4b2a' }}>{ornament}</div>
      <h2 className="text-xl md:text-2xl font-bold tracking-[1.4px]" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#2a1812' }}>{title}</h2>
    </div>
    <div className="text-base md:text-lg leading-8">
      {children}
    </div>
  </section>
);

interface MiniCardProps {
  title: string;
  children: React.ReactNode;
}

const MiniCard: React.FC<MiniCardProps> = ({ title, children }) => (
  <div className="rounded p-4" style={{ background: 'rgba(80,42,20,0.10)', border: '1px solid rgba(80,42,20,0.22)' }}>
    <h3 className="mb-2 text-sm md:text-base font-bold tracking-[1.2px]" style={{ fontFamily: "'Cinzel', serif", color: '#5f2634' }}>{title}</h3>
    <p className="text-base md:text-lg leading-7 text-justify">{children}</p>
  </div>
);

export default BlackIceResearchPage;
