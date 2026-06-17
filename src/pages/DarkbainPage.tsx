import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { darkbainTheme } from '@/types/theme';

const DarkbainPage: React.FC = () => {
  const characters = [
    {
      name: 'Эсканор Даркбейн',
      role: 'Старший из Даркбейнов, легендарный истребитель чудовищ',
      desc: 'Сильнейший воин континента. Воспитывал внука в железном кулаке, но и в сказаниях о битвах былых времён. Не одобряет армейского пути сына и противится превращению родового поместья в людное поселение.',
    },
    {
      name: 'Мария Даркбейн',
      role: 'Жена Эсканора, жрица Тулкаса',
      desc: 'Властная и мудрая. Обучила Валерия основам магии, читала эпосы и сказки.',
    },
    {
      name: 'Габриэль Даркбейн',
      role: 'Сын Эсканора и отец Валерия, генерал Иллирии',
      desc: 'В тридцать лет — генерал Иллирии. Титул и звание получил за решающую роль в установлении протектората над Астарией. Сына видит редко, носит при себе фамильную рекликвию. Вкладывает средства в восстановление и расширение родовых земель, из-за чего конфликтует с дедом.',
    },
    {
      name: 'Мать Валерия',
      role: 'Истинная эльфийка скрывающая свой лик, эльфийский маг',
      desc: 'Могучий маг вещих снов. Является сыну лишь во сне, даёт наставления о будущем. Её имя и происхождение скрыты; если на родине узнают о сыне, его убьют.',
    },
    {
      name: 'Валерий Даркбейн',
      role: 'Сын, 17 лет, полуэльф',
      desc: 'Воин, одарённый небывалой физической удалью и святой магией, не связанной с храмовым обетом. Странствует на севере в попытках самому заработать имя.',
    },
  ];

  const bonded = [
    {
      name: 'Изольда',
      relation: 'Первая любовь · Предательство',
      desc: 'Травница из деревни, где Валерий одолел восставшего сово-медведа. Вспыхнувшее чувство обернулось предательством: селяне не простили эльфийской крови, начали плести заговор, и на добро ударили ножом в спину. Валерий исцелил отца Изольды и ушёл в закат, осыпая всех проклятиями.',
    },
    {
      name: 'Шел',
      relation: 'Пассия · Травница племени Северных Орков',
      desc: 'Травница племени орков, чью мать убили в бою, воспитана бабушкой и обучена травничеству и изготовлением древних снадобий. Не говорит на общем языке, он — на её наречии. Когда он возвращался из стычек израненный, она молча поила его горькими зельями.',
    },
  ];

  const rumors = [
    'Даркбейны издревле служат Тулкасу, потому и сила в них нечеловеческая, а меч Хазирун поёт, предупреждая об опасности.',
    'Пращур их водился с малыми майяр, оттого потомки рождаются то с даром магии, то с мощью великана.',
    'Генерал Габриэль потому и взлетел столь быстро, что сам бог войны отметил его в битве за Астарию.',
    'Дед Эсканор будто бы выпил кровь дракона, иначе как человеку дожить до таких лет в здравии и силе?',
    'Мать молодого господина — эльфийская колдунья, и за её грехи парня преследуют тёмные силы, оттого волосы его посветлели.',
    'А кошмары его — это проклятие рода, расплата за древнюю некромантию. Говорят, каждую ночь он умирает сотней смертей, но молчит.',
    'Сам Валерий — не то паладин без клятвы, не то воин с благословением небес. Его святая магия не из храма, а из крови, и это пугает.',
    'Поместье их в столице сторожат тени предков, и земля там стонет по ночам.',
    'А ещё говорят, что генерал Габриэль превращает старое поместье в целый посад, и скоро там будет не дом, а малый город. Дед же его, Эсканор, словно цепной пёс, сидит у ворот и никого чужого во внутренний двор не пускает. Чудно: сын отстраивает, отец разрушения чинит.',
  ];

  const glossary = [
    { term: 'Даркбейны', def: 'Род авантюристов, ведущий начало от первых людей; служат Тулкасу, славятся невероятной физической мощью и иногда магическими дарами. Поместье к югу от столицы Иллирии.' },
    { term: 'Хазирун', def: 'Фамильный двуручный меч, раны от которого не заживают.' },
    { term: '«Человеком назовём...»', def: 'Семейный устав, по которому наследники обязаны доказать право носить фамилию.' },
    { term: 'Ванитас', def: 'Символ бренности и одновременно имя, которым Валерий хотел бы назвать нового бога.' },
    { term: 'Кольцо иллюзий', def: 'Подарок мага на границе севера.' },
    { term: 'Крипта конунга', def: 'Древняя гробница, очищенная Валерием.' },
    { term: 'Крипта древних эльфов', def: 'Ледяная усыпальница, где Валерий обрёл сокровенные знания.' },
    { term: 'Шел', def: 'Травница из племени орков, не говорящая на общем языке; её связь с Валерием — взаимная поддержка и понимание без слов.' },
    { term: 'Поместье Даркбейнов', def: 'Расположено к югу от столицы Иллирии. Ныне восстанавливается усилиями Габриэля; окрестные земли оживают и привлекают поселенцев, но Эсканор противится допуску чужаков во внутренние пределы и контролирует все изменения.' },
  ];

  return (
    <Layout theme={darkbainTheme} particleCount={20}>
      <div
        className="max-w-[950px] mx-auto relative z-[1]"
        style={{
          background: darkbainTheme.raven,
          border: `3px solid ${darkbainTheme.primary}`,
          boxShadow: `0 0 80px rgba(0,0,0,0.95), inset 0 0 120px rgba(0,0,0,0.6), 0 0 40px rgba(74,63,42,0.1)`,
        }}
      >
        {/* HeroNav at the very top */}
        <div className="pt-4">
          <HeroNav theme={darkbainTheme} characterId="valery" />
        </div>
        {/* Inner Border */}
        <div
          className="absolute top-3 left-3 right-3 bottom-3 pointer-events-none z-10"
          style={{
            border: `1px solid ${darkbainTheme.primaryGlow}`,
            opacity: 0.25,
          }}
        />
        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center py-16 px-8 md:px-10 overflow-hidden"
          style={{
            background: darkbainTheme.primary,
            borderBottom: `4px double ${darkbainTheme.primaryGlow}`,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 opacity-50" style={{ background: darkbainTheme.primaryGlow }} />
          {/* Corner Ornaments */}
          {['❧', '❧', '❧', '❧'].map((orn, i) => (
            <div
              key={i}
              className="absolute text-6xl opacity-30"
              style={{
                color: darkbainTheme.primaryGlow,
                top: i < 2 ? '20px' : 'auto',
                bottom: i >= 2 ? '20px' : 'auto',
                left: i % 2 === 0 ? '20px' : 'auto',
                right: i % 2 === 1 ? '20px' : 'auto',
                transform: i === 1 ? 'scaleX(-1)' : i === 2 ? 'scaleY(-1)' : i === 3 ? 'scale(-1, -1)' : 'none',
              }}
            >
              {orn}
            </div>
          ))}

          {/* Crest — текущее изображение tarot_darkbain.png квадратное 1024×1024, поэтому место под него тоже квадратное */}
          <div
            className="w-56 h-56 md:w-72 md:h-72 mx-auto mb-8 flex items-center justify-center relative overflow-hidden"
            style={{
              border: `3px solid ${darkbainTheme.primaryGlow}`,
              background: darkbainTheme.void,
              boxShadow: `0 0 40px rgba(74,63,42,0.25), inset 0 0 50px rgba(0,0,0,0.6), 0 0 20px rgba(90,10,10,0.15)`,
            }}
          >
            <img
              src="tarot_darkbain.png"
              alt="Герб рода Даркбейн"
              className="w-full h-full object-cover opacity-90 scale-[1.02]"
              draggable={false}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          <h1
            className="text-3xl md:text-[52px] tracking-[4px] mb-3"
            style={{
              fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
              color: darkbainTheme.parchment,
              textShadow: '0 2px 15px rgba(0,0,0,0.9), 0 0 50px rgba(200,200,200,0.08), 0 0 100px rgba(90,10,10,0.05)',
            }}
          >
            Семья Даркбейн
          </h1>
          <p
            className="text-lg md:text-[22px] tracking-[3px] opacity-85"
            style={{
              fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
              color: darkbainTheme.primaryGlow,
            }}
          >
            Тёмное Проклятье Врагов
          </p>
        </motion.header>

        <div className="relative z-[2]">
          {/* Family Legends */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="py-12 px-6 md:px-16"
          >
            <h2
              className="text-2xl md:text-4xl tracking-[3px] mb-8 pb-4 relative"
              style={{
                fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
                color: darkbainTheme.parchment,
                borderBottom: `2px solid ${darkbainTheme.primary}`,
              }}
            >
              Предания рода
              <span
                className="absolute bottom-[-2px] left-0 w-36 h-0.5"
                style={{
                  background: darkbainTheme.primaryGlow,
                  boxShadow: '0 0 10px rgba(74,63,42,0.3)',
                }}
              />
            </h2>
            <div
              className="text-[15.5px] leading-[1.85] text-justify"
              style={{ color: darkbainTheme.silver }}
            >
              <p className="mb-5 indent-9">
                Когда первые люди пробудились под солнцем, ещё не ведая ни письма, ни стали, один из пращуров Даркбейнов встал под знамёна Валар и принёс клятву Тулкасу — богу мощи и воинской славы. С тех пор род служил ему не молитвами, а деяниями: каждая битва, в которой Даркбейн обнажал клинок, считалась выигранной. Долгие века кровь их оставалась людской, но пути авантюристов сводили их сердца с иными народами. Поговаривают в жилы Даркбейнов влилась кровь даже малых майяр — оттого в потомках порой просыпалась сила, не виданная простыми смертными.
              </p>
              <p className="mb-5 indent-9">
                Род жил по креду, выкованному скорее инстинктом, чем честью: <em>сильные ищут сильных</em>. Браки заключались не по знатности или роду, а по неодолимому влечению к мощи себе подобных, и дети наследовали силу обоих родителей. Путь искателей приключений стал их судьбой: они истребляли чудовищ, защищали слабых и копили артефакты в подземных залах родового поместья. Но дорога эта безжалостна, и от главной ветви ныне уцелело лишь трое.
              </p>
              <p className="mb-5 indent-9">
                Родовое поместье Даркбейнов стоит не в самом сердце столицы, а к югу от неё, на старом тракте, что некогда вёл к древним эльфийским гаваням. Веками земли эти пребывали в запустении: поля заросли терновником, а стены особняка осыпались под дождями. Но с тех пор как Габриэль получил генеральский чин, он вливает золото в родовое гнездо. Ветхие постройки обновляются, и земли вокруг наполняются былой жизнью.
              </p>
            </div>

            {/* Quote Block */}
            <div
              className="relative py-6 px-8 md:px-10 my-8 italic"
              style={{
                borderLeft: `3px solid ${darkbainTheme.primaryGlow}`,
                background: darkbainTheme.void,
                color: darkbainTheme.silverBright,
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)',
              }}
            >
              <span
                className="absolute -top-5 left-2 text-7xl opacity-20"
                style={{
                  fontFamily: "'UnifrakturMaguntia', serif",
                  color: darkbainTheme.primaryGlow,
                }}
              >
                &ldquo;
              </span>
              Фамильный клинок Хазирун — двуручный меч, — выкован, по преданию, в эру драконов и закалён в крови первого змея, павшего от руки Даркбейна раны от которого не заживают. Он переходит от отца к сыну, но лишь тогда, когда наследник докажет, что достоин.
            </div>
          </motion.section>

          {/* Divider */}
          <div className="flex items-center justify-center py-8 px-6">
            <div className="flex-1 h-px opacity-35" style={{ background: darkbainTheme.primaryGlow }} />
            <div className="mx-6 text-2xl opacity-50" style={{ color: darkbainTheme.primaryGlow, textShadow: '0 0 15px rgba(74,63,42,0.3)' }}>&#10086;</div>
            <div className="flex-1 h-px opacity-35" style={{ background: darkbainTheme.primaryGlow }} />
          </div>

          {/* Family Members */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="py-12 px-6 md:px-16"
          >
            <h2
              className="text-2xl md:text-4xl tracking-[3px] mb-8 pb-4 relative"
              style={{
                fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
                color: darkbainTheme.parchment,
                borderBottom: `2px solid ${darkbainTheme.primary}`,
              }}
            >
              Члены семьи
              <span
                className="absolute bottom-[-2px] left-0 w-36 h-0.5"
                style={{ background: darkbainTheme.primaryGlow }}
              />
            </h2>

            <div className="flex flex-col gap-7 mt-8">
              {characters.map((char, idx) => (
                <motion.div
                  key={char.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="relative py-7 px-8 md:px-9 transition-all duration-300"
                  style={{
                    background: darkbainTheme.primary,
                    border: `1px solid ${darkbainTheme.void}`,
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 w-1 h-full opacity-70"
                    style={{
                      background: darkbainTheme.primaryGlow,
                      boxShadow: '0 0 10px rgba(74,63,42,0.3)',
                    }}
                  />
                  <div
                    className="absolute top-4 right-5 text-xl opacity-20"
                    style={{ color: darkbainTheme.primaryGlow }}
                  >
                    &#10022;
                  </div>
                  <div
                    className="text-lg md:text-[22px] tracking-[2px] mb-2"
                    style={{
                      fontFamily: "'UnifrakturMaguntia', 'Cinzel', serif",
                      color: darkbainTheme.parchment,
                    }}
                  >
                    {char.name}
                  </div>
                  <div
                    className="text-[13px] tracking-[3px] mb-3 opacity-85"
                    style={{
                      fontFamily: "'UnifrakturMaguntia', serif",
                      color: darkbainTheme.primaryGlow,
                    }}
                  >
                    {char.role}
                  </div>
                  <div
                    className="text-[14.5px] leading-[1.75]"
                    style={{ color: darkbainTheme.silver }}
                  >
                    {char.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Divider */}
          <div className="flex items-center justify-center py-8 px-6">
            <div className="flex-1 h-px opacity-35" style={{ background: darkbainTheme.primaryGlow }} />
            <div className="mx-6 text-2xl opacity-50" style={{ color: darkbainTheme.primaryGlow }}>&#10086;</div>
            <div className="flex-1 h-px opacity-35" style={{ background: darkbainTheme.primaryGlow }} />
          </div>

          {/* Bonded Characters */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="py-10 px-6 md:px-16"
          >
            <div
              className="relative p-8 md:p-10 my-8"
              style={{
                background: 'rgba(26,10,26,1)',
                border: '1px solid rgba(90,10,10,0.3)',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)',
              }}
            >
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl px-5"
                style={{
                  color: darkbainTheme.accentGlow,
                  opacity: 0.5,
                  background: darkbainTheme.raven,
                }}
              >
                &#9670;
              </div>
              <h3
                className="text-xl md:text-[28px] tracking-[4px] mb-8 text-center"
                style={{
                  fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
                  color: darkbainTheme.parchment,
                }}
              >
                Связанные с Валерием
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bonded.map((person) => (
                  <div
                    key={person.name}
                    className="relative p-6 text-center"
                    style={{
                      background: darkbainTheme.void,
                      border: `1px solid ${darkbainTheme.primary}`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px] opacity-40"
                      style={{ background: darkbainTheme.accentGlow }}
                    />
                    <div
                      className="text-xl md:text-[22px] tracking-[3px] mb-1"
                      style={{
                        fontFamily: "'UnifrakturMaguntia', 'Cinzel', serif",
                        color: darkbainTheme.parchment,
                      }}
                    >
                      {person.name}
                    </div>
                    <div
                      className="text-xs tracking-[3px] mb-3 opacity-80"
                      style={{
                        fontFamily: "'UnifrakturMaguntia', serif",
                        color: darkbainTheme.accentGlow,
                      }}
                    >
                      {person.relation}
                    </div>
                    <div
                      className="text-[13.5px] leading-[1.7] text-left"
                      style={{ color: darkbainTheme.silver }}
                    >
                      {person.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Divider */}
          <div className="flex items-center justify-center py-8 px-6">
            <div className="flex-1 h-px opacity-35" style={{ background: darkbainTheme.primaryGlow }} />
            <div className="mx-6 text-2xl opacity-50" style={{ color: darkbainTheme.primaryGlow }}>&#10086;</div>
            <div className="flex-1 h-px opacity-35" style={{ background: darkbainTheme.primaryGlow }} />
          </div>

          {/* Lore */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="py-12 px-6 md:px-16"
          >
            <h2
              className="text-2xl md:text-4xl tracking-[3px] mb-8 pb-4 relative"
              style={{
                fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
                color: darkbainTheme.parchment,
                borderBottom: `2px solid ${darkbainTheme.primary}`,
              }}
            >
              Лор Валерия
              <span
                className="absolute bottom-[-2px] left-0 w-36 h-0.5"
                style={{ background: darkbainTheme.primaryGlow }}
              />
            </h2>
            <div
              className="text-[15.5px] leading-[1.85] text-justify"
              style={{ color: darkbainTheme.silver }}
            >
              <p className="mb-5 indent-9">
                Он родился пятнадцатого февраля, в самую лютую стужу. Младенец с человеческими ушами и чёрными волосами, в котором кровь эльфийской аристократки и прославленного воина людей вступили в войну. К отрочеству эльфийская кровь вытеснила человеческое наследие: волосы стали пепельными, уши заострились — вечный знак раздвоенной природы.
              </p>
              <p className="mb-5 indent-9">
                Матери он не знал. Она являлась во сне — статная, сереброволосая, учила книгами и магией. Отца видел раз в три года: тот ставил удар и учил выживать, но не учил быть сыном. Воспитывали дед Эсканор и бабушка Мария, чьи имена гремели в балладах. Они любили внука, но семейный устав гласил: <em>«Человеком назовём, когда сам имя заработаешь»</em>. В пятнадцать лет его отправили в мир — доказывать право носить фамилию.
              </p>
              <div
                className="relative py-6 px-8 my-8 italic"
                style={{
                  borderLeft: `3px solid ${darkbainTheme.primaryGlow}`,
                  background: darkbainTheme.void,
                  color: darkbainTheme.silverBright,
                }}
              >
                Первая любовь и предательство. В деревушке, где он одолел восставшего мертвеца-медведя, травница Изольда выходила его, и вспыхнуло чувство. Но селяне не простили эльфийской крови: его заманили за околицу и ударили ножом в спину. Он ранил нападавших, исцелил отца Изольды и ушёл в закат, проклиная свои уши и волосы.
              </div>
              <p className="mb-5 indent-9">
                <strong>Нож перед зеркалом.</strong> В ближнем городе, в борделе, его признание в родстве с Даркбейнами сочли бахвальством. Стоя перед зеркалом, он едва не отрезал уши, но лишь остриг волосы до безобразной короткой пряди и разбил стекло. В ту ночь мать впервые явилась во сне и наставила. С тех пор он представляется Валерием из Иллирии.
              </p>
              <p className="mb-5 indent-9">
                <strong>«Ванитас».</strong> Бродячий художник, с которым он странствовал, написал дракона, рвущего пасть об череп на горе золота. «Символ бренности всего», — сказал он. Юноша ответил: «Я… я нет». Картина звалась «Ванитас».
              </p>
              <p className="mb-5 indent-9">
                <strong>Север.</strong> Он освободил деревню от бандитов, заслужив молву. Ярл Нортвинда, оценив прямоту и силу, дал ему приют. Валерий очистил крипту древнего конунга от нежити, сразил ледяного великана и принёс магический кристалл. Затем был послан к оркам для перемирия. В племени Аразака он впервые увидел Шел — травницу племени, чью мать убили в бою. Она не говорила на общем языке, он — на её наречии. Когда он возвращался из стычек израненный, она молча поила его горькими зельями, он корчил рожи, и она смеялась.
              </p>
              <p className="mb-5 indent-9">
                В благодарность он подарил ей костяную статуэтку женщины с травяным серпом, испещрённую эльфийской вязью. А потом была ночь на горном склоне: они сидели вдвоём, глядя на звёзды и далёкий Нортвинд, говорили жестами и рисунками на снегу, и она поняла его историю без слов. Когда она коснулась его лица — там, где ещё не затянулся свежий шрам — ночь перестала быть просто ночью. Утром он оставил ей меч и двести золотых — не плату, а знак: «Ты меня спасала. Я должен знать, что у тебя всё есть».
              </p>
            </div>
          </motion.section>

          {/* Divider */}
          <div className="flex items-center justify-center py-8 px-6">
            <div className="flex-1 h-px opacity-35" style={{ background: darkbainTheme.primaryGlow }} />
            <div className="mx-6 text-2xl opacity-50" style={{ color: darkbainTheme.primaryGlow }}>&#10086;</div>
            <div className="flex-1 h-px opacity-35" style={{ background: darkbainTheme.primaryGlow }} />
          </div>

          {/* Rumors */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="py-12 px-6 md:px-16"
          >
            <h2
              className="text-2xl md:text-4xl tracking-[3px] mb-8 pb-4 relative"
              style={{
                fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
                color: darkbainTheme.parchment,
                borderBottom: `2px solid ${darkbainTheme.primary}`,
              }}
            >
              Городская молва и слухи
              <span
                className="absolute bottom-[-2px] left-0 w-36 h-0.5"
                style={{ background: darkbainTheme.primaryGlow }}
              />
            </h2>
            <p className="mb-4" style={{ color: darkbainTheme.silver }}>В тавернах и на перекрёстках перешёптываются:</p>
            <ul className="list-none p-0">
              {rumors.map((rumor, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.05 }}
                  className="relative py-4 md:py-5 pl-12 md:pl-14 mb-3 italic"
                  style={{
                    background: darkbainTheme.primary,
                    borderLeft: `2px solid ${darkbainTheme.accentGlow}`,
                    color: darkbainTheme.silverBright,
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.2)',
                  }}
                >
                  <span
                    className="absolute left-5 top-4 md:top-5 text-sm opacity-50"
                    style={{ color: darkbainTheme.accentGlow }}
                  >
                    &#10022;
                  </span>
                  {rumor}
                </motion.li>
              ))}
            </ul>
            <div
              className="relative py-6 px-8 mt-8 italic"
              style={{
                borderLeft: `3px solid ${darkbainTheme.primaryGlow}`,
                background: darkbainTheme.void,
                color: darkbainTheme.silverBright,
              }}
            >
              Так говорят люди. Но я считаю — на всё воля богов, а Даркбейны лишь её слепые исполнители, даже когда думают, что сами вершат судьбу.
            </div>
          </motion.section>

          {/* Divider */}
          <div className="flex items-center justify-center py-8 px-6">
            <div className="flex-1 h-px opacity-35" style={{ background: darkbainTheme.primaryGlow }} />
            <div className="mx-6 text-2xl opacity-50" style={{ color: darkbainTheme.primaryGlow }}>&#10086;</div>
            <div className="flex-1 h-px opacity-35" style={{ background: darkbainTheme.primaryGlow }} />
          </div>

          {/* Glossary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="py-12 px-6 md:px-16"
          >
            <h2
              className="text-2xl md:text-4xl tracking-[3px] mb-8 pb-4 relative"
              style={{
                fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
                color: darkbainTheme.parchment,
                borderBottom: `2px solid ${darkbainTheme.primary}`,
              }}
            >
              Глоссарий рода
              <span
                className="absolute bottom-[-2px] left-0 w-36 h-0.5"
                style={{ background: darkbainTheme.primaryGlow }}
              />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              {glossary.map((item, idx) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.05 }}
                  className="relative p-5"
                  style={{
                    background: darkbainTheme.primary,
                    border: `1px solid ${darkbainTheme.void}`,
                  }}
                >
                  <div
                    className="absolute top-2 right-3 text-base opacity-15"
                    style={{ color: darkbainTheme.primaryGlow }}
                  >
                    &#9670;
                  </div>
                  <div
                    className="text-base md:text-[17px] tracking-[2px] mb-2 pb-1.5"
                    style={{
                      fontFamily: "'UnifrakturMaguntia', 'Cinzel', serif",
                      color: darkbainTheme.parchment,
                      borderBottom: `1px solid ${darkbainTheme.primary}`,
                    }}
                  >
                    {item.term}
                  </div>
                  <div
                    className="text-[13px] leading-[1.65]"
                    style={{ color: darkbainTheme.silver }}
                  >
                    {item.def}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Footer */}
          <footer
            className="relative text-center py-12 px-8"
            style={{
              background: darkbainTheme.primary,
              borderTop: `4px double ${darkbainTheme.primaryGlow}`,
            }}
          >
            <div
              className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 flex items-center justify-center opacity-75 overflow-hidden"
              style={{
                border: `2px solid ${darkbainTheme.primaryGlow}`,
                background: darkbainTheme.void,
                boxShadow: '0 0 30px rgba(74,63,42,0.15)',
              }}
            >
              <img
                src="tarot_darkbain.png"
                alt="Знак семьи"
                className="w-full h-full object-cover opacity-70 scale-[1.02]"
                draggable={false}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <p
              className="text-sm tracking-[4px] opacity-60 mb-2"
              style={{
                fontFamily: "'UnifrakturMaguntia', serif",
                color: darkbainTheme.primaryGlow,
              }}
            >
              Знак семьи Даркбейн
            </p>
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default DarkbainPage;
