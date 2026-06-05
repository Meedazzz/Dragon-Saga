import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { letopisTheme } from '@/types/theme';

const LetopisPage: React.FC = () => {
  const months = [
    ['1', 'Этуиль', 'Пробуждение'],
    ['2', 'Лайрэ', 'Песнь'],
    ['3', 'Лотрон', 'Цветень'],
    ['4', 'Эруин', 'Середина лета'],
    ['5', 'Иаван', 'Плодородие'],
    ['6', 'Керван', 'Жатва'],
    ['7', 'Уруи', 'Зной'],
    ['8', 'Йаванни', 'Дар'],
    ['9', 'Нарвэ', 'Осень'],
    ['10', 'Хитэ', 'Туман'],
    ['11', 'Гиртрон', 'Стужа'],
    ['12', 'Рин', 'Венец зимы'],
  ];

  const days = ['День Звёзд', 'День Луны', 'День Моря', 'День Древ', 'День Солнца', 'День Валар', 'День Эру'];

  const glossarySections = [
    {
      title: 'Божества и высшие силы',
      items: [
        { term: 'Эру Илуватар', def: 'Единый Бог-Творец.' },
        { term: 'Айнур', def: 'ангельские сущности, участники Великой Музыки.' },
        { term: 'Валар', def: 'Айнур, спустившиеся в Арду, хранители и устроители мира.' },
        { term: 'Моргот (Мелькор)', def: 'величайший из Айнур, первое зло; развеян в звёздную пыль.' },
      ],
    },
    {
      title: 'Артефакты и знаковые предметы',
      items: [
        { term: 'Сильмарили', def: 'три камня Феанора, в которых заточён свет Двух Древ. Один — в небе (звезда), один — в море, один — в земле.' },
      ],
    },
    {
      title: 'Эпохи и ключевые события',
      items: [
        { term: 'Первая Эпоха', def: 'от Музыки Айнур до Войны Гнева. Окончилась развеиванием Моргота и затоплением Белерианда.' },
        { term: 'Война Гнева', def: 'финальная битва сил Валар против Моргота.' },
        { term: 'Вторая Эпоха', def: '1700 лет; сотворение драконидов, основание Иллирии, войны с драконами, завершившиеся их вымиранием.' },
        { term: 'Третья Эпоха', def: 'текущая эпоха, 425 год.' },
      ],
    },
    {
      title: 'Государства, территории и организации',
      items: [
        { term: 'Астария', def: 'первое людское королевство, известно конницей и древними знатными домами. Находится под протекторатом Иллирии.' },
        { term: 'Иллирия', def: 'военная держава, славная боевыми машинами; почти империя, титулы жалуются за военные заслуги.' },
        { term: 'Казад-Дум', def: 'подгорная империя дворфов, занимает горную цепь на четверть территории Иллирии.' },
        { term: 'Харрад', def: 'юго-восточное царство песков и эмиров, лежит южнее Астарии.' },
        { term: 'Легион', def: 'единственная власть драконидов на севере; Первый Легион пал, Второй ищет земли для поселения.' },
        { term: 'Церковь Тэоса', def: 'Религиозная организация Иллирии, возглавляемая первой дочерью монарха.' },
      ],
    },
    {
      title: 'Расы и народы',
      items: [
        { term: 'Люди', def: 'наиболее многочисленная раса, живут 80–100 лет (максимум 110).' },
        { term: 'Эльфы', def: 'чистокровные живут до 500 лет (осталось несколько сотен или пара тысяч); полуэльфы живут как люди (80–100 лет).' },
        { term: 'Дворфы', def: 'подгорный народ, живут до 200 лет.' },
        { term: 'Дракониды', def: 'младшая раса, яйцекладущие, сезонное размножение (5 месяцев в утробе, 2–4 недели в яйце), живут 70–90 лет. Скрещивание с другими расами невозможно.' },
        { term: 'Халфлинги', def: 'малочисленный народ, живут 90–100 лет.' },
        { term: 'Зверорасы', def: 'разумные создания Моргота со звериной природой: гоблины, кобольды, гноллы, великаны, орки.' },
        { term: 'Тифлинги', def: 'проклятая ветвь, созданная последним вздохом Моргота, склонность к тёмной магии; младенцы под надзором Церкви.' },
      ],
    },
  ];

  return (
    <Layout theme={letopisTheme} particleCount={15}>
      <div className="max-w-[800px] mx-auto px-4 md:px-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-sm p-8 md:p-12 relative"
          style={{
            background: 'linear-gradient(135deg, #faf6ed 0%, #f0e6d3 50%, #faf6ed 100%)',
            border: '3px double #8b4513',
            boxShadow: '0 0 20px rgba(139,69,19,0.3)',
          }}
        >
          {/* Inner Border */}
          <div
            className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 pointer-events-none"
            style={{ border: '1px solid #c9a86c' }}
          />

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-[28pt] text-center uppercase tracking-[3px] mb-2"
            style={{
              fontFamily: "'Palatino Linotype', 'Book Antiqua', serif",
              color: '#4a1c1c',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            Сказание о мире
          </motion.h1>
          <p
            className="text-center italic mb-8 md:mb-10 text-sm md:text-base"
            style={{ color: '#6b4423', letterSpacing: '1px' }}
          >
            От Музыки Айнур до 425 года Третьей Эпохи
          </p>

          <div className="text-center text-2xl tracking-[10px] my-6 md:my-8" style={{ color: '#8b4513' }}>&#10086; &#10086; &#10086;</div>

          {/* Introduction */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2
              className="text-lg md:text-[18pt] uppercase tracking-[2px] mt-8 md:mt-9 pb-2 mb-4"
              style={{
                fontFamily: "'Palatino Linotype', serif",
                color: '#5c2818',
                borderBottom: '2px solid #c9a86c',
              }}
            >
              Введение
            </h2>
            <div
              className="italic text-center my-5 py-4 px-5"
              style={{
                color: '#5c3d2e',
                borderLeft: '3px solid #c9a86c',
                borderRight: '3px solid #c9a86c',
                background: 'rgba(201,168,108,0.1)',
              }}
            >
              В начале был Эру, Единый, и сотворил он Айнур — ангелов, чьи голоса сплели Великую Музыку.
              Из гармонии родилась Арда, но вплёлся в неё диссонанс: Мелькор, сильнейший из Айнур,
              пожелал властвовать над миром. Так началась долгая борьба света и тьмы, подвигов и утрат,
              а пути этой легенды, хоть и следуют «Сильмариллиону», сворачивают в иные дали:
              Нуменор не восстал из моря, первой колыбелью людей стала Астария, а Вторая Эпоха озарилась
              рождением драконидов и войнами, достойными пера Мартина. Ныне над миром — 425 год Третьей Эпохи.
            </div>
          </motion.section>

          <div className="text-center text-2xl tracking-[10px] my-6 md:my-8" style={{ color: '#8b4513' }}>&#10087; &#10087; &#10087;</div>

          {/* History */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2
              className="text-lg md:text-[18pt] uppercase tracking-[2px] mt-8 md:mt-9 pb-2 mb-4"
              style={{
                fontFamily: "'Palatino Linotype', serif",
                color: '#5c2818',
                borderBottom: '2px solid #c9a86c',
              }}
            >
              История мира
            </h2>

            <h3
              className="text-base md:text-[14pt] italic mt-6 mb-4"
              style={{ fontFamily: "'Palatino Linotype', serif", color: '#6b3410' }}
            >
              Сотворение и Первая Эпоха
            </h3>

            <ol className="list-none p-0 counter-reset-history">
              <li className="relative pl-10 md:pl-12 mb-4 text-justify" style={{ counterIncrement: 'history-item' }}>
                <span
                  className="absolute left-0 top-0 font-bold text-sm md:text-[14pt]"
                  style={{ fontFamily: "'Palatino Linotype', serif", color: '#8b4513' }}
                >
                  {1}.
                </span>
                <strong>Музыка и сотворение мира.</strong> Эру Илуватар собрал Айнур, и воспели они Арду — мир, явленный в звуках. Но Мелькор, возгордившись, внёс в мелодию ложные ноты, и родилось в мире первое зло.
              </li>
              {[
                { title: 'Валинор и Два Древа.', text: 'Добрые Айнур, наречённые Валар, спустились в мир и создали на Западе райский Валинор. Два Великих Древа — Телперион и Лаурелин — изливали серебряный и золотой свет, а в Средиземье, под звёздами, пробудились Перворождённые — эльфы.' },
                { title: 'Сильмарили.', text: 'Величайший мастер Феанор заточил свет Древ в трёх нетленных камнях — Сильмарилях. Но Мелькор, прозванный Морготом, вместе с гигантской паучихой Унголиант умертвил Древа, похитил камни и бежал в Средиземье, пролив кровь короля эльфов.' },
                { title: 'Исход и клятва.', text: 'Одержимый горем и яростью, Феанор произнёс с сыновьями нерушимую клятву: любой, кто завладеет Сильмарилями, падёт от их клинка. Он увлёк эльфов на восток, но, нуждаясь в кораблях, обагрил руки братской крови, за что Валар прокляли мятежный род.' },
                { title: 'Войны Белерианда.', text: 'Много веков эльфы и люди осаждали твердыни Моргота. Величайший из подвигов — смертный Берен и эльфийская дева Лютиэн вырвали один Сильмариль из самой короны Врага. Но клятва Феанора сеяла раздоры, и предательства источили силы свободных народов, пока королевства эльфов не пали одно за другим.' },
                { title: 'Война Гнева и конец Первой Эпохи.', text: 'Мореход Эарендил, в чьих жилах смешалась кровь эльфов и людей, с добытым Сильмарилем на челе достиг Валинора и молил богов о прощении и помощи. Войско Валар обрушилось на Моргота, и мир содрогнулся. Враг был повержен — не изгнан в Пустоту, а развеян звёздной пылью. Континент Белерианд ушёл под воду; два Сильмариля потеряны в земле и море, третий же навеки стал звездой на небесах.' },
              ].map((item, idx) => (
                <li key={idx} className="relative pl-10 md:pl-12 mb-4 text-justify" style={{ counterIncrement: 'history-item' }}>
                  <span
                    className="absolute left-0 top-0 font-bold text-sm md:text-[14pt]"
                    style={{ fontFamily: "'Palatino Linotype', serif", color: '#8b4513' }}
                  >
                    {idx + 2}.
                  </span>
                  <strong>{item.title}</strong> {item.text}
                </li>
              ))}
            </ol>

            <h3
              className="text-base md:text-[14pt] italic mt-6 mb-4"
              style={{ fontFamily: "'Palatino Linotype', serif", color: '#6b3410' }}
            >
              Между Эпохами
            </h3>
            <p className="text-justify indent-6 mb-4">
              В конце Первой Эпохи объединились людские племена и основали первое королевство — <strong>Астарию</strong>, случилось это около двух с половиной тысяч лет назад. Падения Нуменора не было: легенда пошла иным путём. Спустя несколько столетий после закладки Астарии началась Вторая Эпоха.
            </p>

            <h3
              className="text-base md:text-[14pt] italic mt-6 mb-4"
              style={{ fontFamily: "'Palatino Linotype', serif", color: '#6b3410' }}
            >
              Вторая Эпоха (1700 лет)
            </h3>
            <p className="text-justify indent-6 mb-4">
              По воле Эру и трудами Валар была создана младшая раса — <strong>дракониды</strong>, змееподобные и гордые. Тогда же эльфы и люди возвели королевство <strong>Иллирию</strong>. Вся эпоха прошла под знаком войн знатных домов подченивших себе драконов — жестоких, как в сагах Мартина. Длилась она ровно тысячу семьсот лет и завершилась не победной песнью, а тишиной: великие драконы вымерли или бежали подальше от мирских глаз, и память о них стала легендой.
            </p>

            <h3
              className="text-base md:text-[14pt] italic mt-6 mb-4"
              style={{ fontFamily: "'Palatino Linotype', serif", color: '#6b3410' }}
            >
              Третья Эпоха (425 лет до нынешнего дня)
            </h3>
            <p className="text-justify indent-6 mb-4">
              С уходом драконов мир вступил в Третью Эпоху. Четыреста двадцать пять лет минуло с тех пор. Век за веком Иллирия ковала свою мощь, и ныне её военные машины угрожают соседям. Астария, колыбель людской славы, приняла протекторат более сильного соседя. Эльфы затворились от мира, храня чистоту крови, дракониды с севера — с мечом в руках ищут землю обетованную, а дворфы Казад-Дума грызутся с орками и людьми. Магия же, как шепчут чародеи, не уходит — она меняется, словно живая река.
            </p>
          </motion.section>

          <div className="text-center text-2xl tracking-[10px] my-6 md:my-8" style={{ color: '#8b4513' }}>&#9756; &#10087;</div>

          {/* Political Map */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h2
              className="text-lg md:text-[18pt] uppercase tracking-[2px] mt-8 md:mt-9 pb-2 mb-4"
              style={{
                fontFamily: "'Palatino Linotype', serif",
                color: '#5c2818',
                borderBottom: '2px solid #c9a86c',
              }}
            >
              Политическая карта (425 год Т.Э.)
            </h2>

            {[
              { name: 'Иллирия', desc: 'Почти полконтинента под военной дланью. Держава, чья слава зиждется на боевых машинах — плодах инженерной мысли. Титулы здесь не наследуют, а заслуживают кровью и сталью. После победоносной войны Астария приняла протекторат, и Иллирия балансирует на пороге, отделяющем королевство от империи.' },
              { name: 'Астария', desc: 'Первое людское царство, чья история уходит корнями во тьму Первой Эпохи. Конница Астарии гремит по всему континенту, а знатные дома ревниво берегут древние хроники и родовое достоинство. Ныне — разделена на Великие дома под протекторатом Иллирии, но гордость её не сломлена.' },
              { name: 'Эльфийские анклавы', desc: 'После падения последнего короля-долгожителя эльфы пережили смену режима и ушли в затвор. Границы закрыты на засов, политика направлена на сохранение чистоты крови. Чистых эльфов осталось лишь несколько сотен или, по самым смелым оценкам, пара тысяч — и каждый на вес золота.' },
              { name: 'Дракониды (Легион)', desc: 'Вся власть у драконидов севера принадлежит Легиону, возрождённому из пепла былых падений. После поражения Первого Легиона, Второй Легион прорубает путь к территориям, которые смогут назвать домом. Народ без корней, сжатый в боевой строй.' },
              { name: 'Казад-Дум (дворфы)', desc: 'Горная империя, занимающая большую часть под землёй на востоке, а так же на поверхности — вершинам и хребтам. Война идёт непрерывно: с племенами орков — на поверхности и людьми — на востоке.' },
              { name: 'Харрад', desc: 'Юго-восточные земли под Астарией, царство песков, эмиров и караванных путей. О нём пока говорят мало — лишь слухи о слонах, пряностях и молчаливых храмах.' },
            ].map((nation, idx) => (
              <motion.div
                key={nation.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                className="my-4 p-4"
                style={{
                  background: 'rgba(201,168,108,0.1)',
                  borderLeft: '4px solid #8b4513',
                }}
              >
                <h4 className="font-bold mt-0 text-sm md:text-base" style={{ color: '#5c2818' }}>{nation.name}</h4>
                <p className="text-justify indent-6 text-sm" style={{ color: '#2c1810' }}>{nation.desc}</p>
              </motion.div>
            ))}
          </motion.section>

          <div className="text-center text-2xl tracking-[10px] my-6 md:my-8" style={{ color: '#8b4513' }}>&#10086; &#10086; &#10086;</div>

          {/* Races */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <h2
              className="text-lg md:text-[18pt] uppercase tracking-[2px] mt-8 md:mt-9 pb-2 mb-4"
              style={{
                fontFamily: "'Palatino Linotype', serif",
                color: '#5c2818',
                borderBottom: '2px solid #c9a86c',
              }}
            >
              Расы и биология
            </h2>

            {[
              { name: 'Люди', desc: 'Самая многочисленная раса. Век людской короток: 80–100 лет, лишь самые крепкие дотягивают до 110. Размножение обычное, живорождением, без сезонных циклов.' },
              { name: 'Эльфы', desc: 'Чистокровные эльфы живут до 500 лет, но их число ничтожно — по разным подсчётам, от нескольких сотен до пары тысяч. Любая примесь людской крови, даже в самом отдалённом поколении, укорачивает век до 80–100 лет. Потому полуэльфов много, и они смертны подобно людям. Живорождение.' },
              { name: 'Дворфы', desc: 'Крепкий подгорный народ; живут до 200 лет. Беременность длится около года, младенцы рождаются живыми.' },
              { name: 'Дракониды', desc: 'Самая молодая раса, физически развитая и имеющая черты величественных драконов, сотворённая Валар во Вторую Эпоху. Числом сравнимы с дворфами. Жизнь — 70–90 лет. Сезонное яйцерождение: раз в сезон яйцеклетка разрастается в объёмное мягкое яйцо. Оплодотворённое яйцо вынашивается 5 месяцев, затем откладывается, оболочка затвердевает. В яйце зародыш дозревает ещё 2–4 недели. Из-за этой биологии скрещивание с другими расами невозможно.' },
              { name: 'Халфлинги (полурослики)', desc: 'Самая малочисленная раса. Низкорослые добродушные полевые жители равнин, имеющие склонность к дипломатии и торговле. Живут 90–100 лет, живорождение.' },
              { name: 'Зверорасы', desc: 'Созданы Морготом для войны. Разумны, обладают языками и зачатками ремесла с культурой: гоблины, кобольды, гноллы, великаны, орки.' },
              { name: 'Тифлинги', desc: 'Не полноценная раса. По преданию, последним издыханием Моргота было создано проклятие людского рода. Рождённые под ним отмечены предрасположенностью к тёмной магии. В Иллирии дети с дьявольскими чертами немедленно забираются Церковью под строгий надзор.' },
            ].map((race, idx) => (
              <motion.div
                key={race.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.03 }}
                className="my-4 p-4"
                style={{
                  background: 'rgba(201,168,108,0.1)',
                  borderLeft: '4px solid #8b4513',
                }}
              >
                <h4 className="font-bold mt-0 text-sm md:text-base" style={{ color: '#5c2818' }}>{race.name}</h4>
                <p className="text-justify text-sm" style={{ color: '#2c1810' }}>{race.desc}</p>
              </motion.div>
            ))}
          </motion.section>

          <div className="text-center text-2xl tracking-[10px] my-6 md:my-8" style={{ color: '#8b4513' }}>&#9756; &#10087;</div>

          {/* Calendar */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <h2
              className="text-lg md:text-[18pt] uppercase tracking-[2px] mt-8 md:mt-9 pb-2 mb-4"
              style={{
                fontFamily: "'Palatino Linotype', serif",
                color: '#5c2818',
                borderBottom: '2px solid #c9a86c',
              }}
            >
              Календарь и летоисчисление
            </h2>

            <h3
              className="text-sm md:text-base font-bold mt-5 mb-3"
              style={{ color: '#4a1c1c' }}
            >
              Хронологическая таблица
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-[11pt] my-4" style={{ background: 'rgba(255,255,255,0.3)' }}>
                <thead>
                  <tr style={{ background: '#6b3410', color: '#f5f0e6' }}>
                    <th className="p-2.5 text-left uppercase tracking-[1px] text-xs" style={{ fontFamily: "'Palatino Linotype', serif" }}>Событие</th>
                    <th className="p-2.5 text-left uppercase tracking-[1px] text-xs" style={{ fontFamily: "'Palatino Linotype', serif" }}>Время</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Основание Астарии (первое королевство людей)', '~2500 лет назад'],
                    ['Начало Второй Эпохи (сотворение драконидов, основание Иллирии)', '~2125 лет назад'],
                    ['Вымирание драконов (конец Второй Эпохи)', '425 лет назад'],
                    ['Начало Третьей Эпохи', '425 лет назад'],
                    ['Текущий год', '425 год Т.Э.'],
                  ].map((row, idx) => (
                    <tr key={idx} style={{ background: idx % 2 === 1 ? 'rgba(201,168,108,0.15)' : 'transparent', borderBottom: '1px solid #c9a86c' }}>
                      <td className="p-2.5" style={{ color: '#2c1810' }}>{row[0]}</td>
                      <td className="p-2.5 font-bold" style={{ color: '#4a1c1c' }}>{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3
              className="text-sm md:text-base font-bold mt-5 mb-3"
              style={{ color: '#4a1c1c' }}
            >
              Месяцы года
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm my-4" style={{ background: 'rgba(255,255,255,0.3)' }}>
                <thead>
                  <tr style={{ background: '#6b3410', color: '#f5f0e6' }}>
                    <th className="p-2 text-left uppercase tracking-[1px] text-xs" style={{ fontFamily: "'Palatino Linotype', serif" }}>№</th>
                    <th className="p-2 text-left uppercase tracking-[1px] text-xs" style={{ fontFamily: "'Palatino Linotype', serif" }}>Название</th>
                    <th className="p-2 text-left uppercase tracking-[1px] text-xs" style={{ fontFamily: "'Palatino Linotype', serif" }}>Перевод</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map((m, idx) => (
                    <tr key={idx} style={{ background: idx % 2 === 1 ? 'rgba(201,168,108,0.15)' : 'transparent', borderBottom: '1px solid #c9a86c' }}>
                      <td className="p-2" style={{ color: '#2c1810' }}>{m[0]}</td>
                      <td className="p-2 font-bold" style={{ color: '#4a1c1c' }}>{m[1]}</td>
                      <td className="p-2 italic" style={{ color: '#6b4423' }}>{m[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3
              className="text-sm md:text-base font-bold mt-5 mb-3"
              style={{ color: '#4a1c1c' }}
            >
              Дни недели
            </h3>
            <ol className="list-decimal pl-6 mb-4">
              {days.map((day, idx) => (
                <li key={idx} className="py-1 text-sm" style={{ color: '#2c1810' }}>{day}</li>
              ))}
            </ol>

            <div
              className="text-[10pt] italic my-5 pl-4 py-2"
              style={{
                color: '#6b4423',
                borderLeft: '3px solid #8b4513',
              }}
            >
              <strong>Примечание:</strong> для условной синхронизации с нашим миром, 17 мая 2026 года (воскресенье) может соответствовать Дню Эру или иному дню покоя, согласно текущему календарю летописцев.
            </div>
          </motion.section>

          <div className="text-center text-2xl tracking-[10px] my-6 md:my-8" style={{ color: '#8b4513' }}>&#10086; &#10086; &#10086;</div>

          {/* Glossary */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <h2
              className="text-lg md:text-[18pt] uppercase tracking-[2px] mt-8 md:mt-9 pb-2 mb-4"
              style={{
                fontFamily: "'Palatino Linotype', serif",
                color: '#5c2818',
                borderBottom: '2px solid #c9a86c',
              }}
            >
              Глоссарий
            </h2>

            {glossarySections.map((section) => (
              <div key={section.title} className="mt-6">
                <h3
                  className="text-xs md:text-xs uppercase tracking-[2px] py-2 px-4"
                  style={{
                    background: '#6b3410',
                    color: '#f5f0e6',
                    fontFamily: "'Palatino Linotype', serif",
                  }}
                >
                  {section.title}
                </h3>
                <ul className="list-none p-0">
                  {section.items.map((item, iIdx) => (
                    <li
                      key={iIdx}
                      className="py-2 text-justify"
                      style={{
                        borderBottom: '1px dashed #c9a86c',
                        color: '#2c1810',
                      }}
                    >
                      <strong style={{ color: '#4a1c1c', fontFamily: "'Palatino Linotype', serif" }}>{item.term}</strong> — {item.def}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.section>

          <div className="text-center text-2xl tracking-[10px] my-6 md:my-8" style={{ color: '#8b4513' }}>&#10086; &#10086; &#10086;</div>

          {/* Footer */}
          <footer className="text-center mt-10 text-[10pt] italic" style={{ color: '#8b7355' }}>
            <p>Летопись составлена в 425 году Третьей Эпохи</p>
            <p>&laquo;Память о прошлом — свет в тьме грядущего&raquo;</p>
          </footer>
        </motion.div>
      </div>
    </Layout>
  );
};

export default LetopisPage;
