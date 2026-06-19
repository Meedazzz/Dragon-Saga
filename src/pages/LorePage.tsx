import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { getThemeByPath } from '@/types/theme';
import type { ColorTheme } from '@/types/theme';


interface LoreData {
  name: string;
  title: string;
  bio: string[];
  deeds: string[];
  traits: {
    character: string;
    ideal: string;
    bond: string;
    flaw: string;
  };
  motto: string;
  avatar: string;
  themeColor: string;
}

const BASE = import.meta.env.BASE_URL;

const loreDatabase: Record<string, LoreData> = {
  valery: {
    name: 'Валерий Даркбейн',
    title: 'Потомок сильнейшего Авантюриста, носитель тёмного проклятья',
    bio: [
      'Родился в древнем роду Даркбейнов, чья кровь отмечена проклятием ещё со времён Падения Асов. С юных лет Валерий чувствовал холод смерти, дремлющий в его жилах. Он покинул родные земли, чтобы стать паладином ордена Серебряного Рассвета, но тень предков настигла его.',
      'В бою он черпает силу из последних мгновений павших врагов, превращая боль и смерть в оружие. Его доспехи помнят удары, которые не должны были пережить смертные. Говорят, что он заключил сделку с древней сущностью, обитающей за гранью жизни.',
    ],
    deeds: [
      'Сокрушил культ Чёрного Пламени в подгорных залах Каз-Тура.',
      'Заключил перемирие между кланами Бергхейма и Драконьей стражей.',
      'Оживил павшего соратника ценой части собственной жизненной силы (ритуал «Восстань»).',
      'Противостоял воплощению Ледяного короля и выжил.',
    ],
    traits: {
      character: '«Смерть — не конец, а лишь ступень. Я помню лица всех, кого не смог спасти.»',
      ideal: '«Сила должна защищать тех, кто не может защитить себя. Даже если эта сила из мрака.»',
      bond: 'Старый серебряный амулет матери — единственное, что осталось от семьи.',
      flaw: 'Иногда его захлёстывает жажда боя, и он не различает друга и врага.',
    },
    motto: '«Нет добра или зла. Есть только жизнь и смерть. И я выбираю — жить, пока могу сражаться.»',
    avatar: `${BASE}avatar_valery.png`,
    themeColor: '#2a5a8a',
  },
  brin: {
    name: 'Брин дель Хессен',
    title: 'Наследный Принц Астарии, владыка Чёрного льда',
    bio: [
      'Единственный сын герцога Астарии, чей род ведёт начало от первых людей, вставших под знамёна Валар. В детстве Брин тяжело болел — и тогда в нём пробудилась сила Чёрного льда, что дремлет в крови наследников Хессенов.',
      'Он учился у магов Севера, постигая тайны ментальной магии, иллюзий и чистилищ. Сегодня он — чародей, способный запереть разум врага в ледяной крепости, и наследник, который однажды примет корону.',
    ],
    deeds: [
      'Очистил подземелья Каз-Дум от нежити, пробуждённой древним культом.',
      'Спас посольство Астарии в Бергхейме, обездвижив заговорщиков без единой капли крови.',
      'Создал «Ледяную крепость» — заклинание, запирающее сознание цели в ментальном чистилище.',
      'Привёл в Астарию северных драконидов, заключив первый мирный договор.',
    ],
    traits: {
      character: '«Тишина и холод — мои советчики. Лёд не лжёт.»',
      ideal: '«Сила без мудрости — лишь разрушение. Я буду тем, кто сдерживает обе стороны.»',
      bond: 'Древний ледяной медальон отца, передаваемый в роду Хессенов из поколения в поколение.',
      flaw: 'Слишком полагается на разум и расчёт; в горячке боя теряет связь с эмоциями и близкими.',
    },
    motto: '«Лёд учит терпению. А терпение учит власти — над собой и над врагом.»',
    avatar: `${BASE}avatar_brin.png`,
    themeColor: '#5a3a7a',
  },
  sakris: {
    name: 'Сакрис Ульриаш',
    title: 'Следопыт, сосуд древнего духа',
    bio: [
      'Рождённый в горном крае Бергхейма, он был амбициозным юношей, которому стало тесно в родном доме. Когда отряд наёмников перешёл ему дорогу, в Сакрисе пробудился древний дух — следопыт, видевший тропы между мирами.',
      'Теперь Сакрис слышит шёпот лесов, чувствует направление врага за лигу и знает, когда рядом пробуждается нежить. Его путь — путь искателя, что не боится ни дикой чащи, ни потусторонних голосов.',
    ],
    deeds: [
      'Обнаружил и уничтожил логово упырей на перевале Северного Камня.',
      'Провёл отряд Валерия через Запретные земли, где не ступала нога смертного.',
      'Воззвал к духу предка, чтобы тот указал путь к похищенной реликвии клана.',
      'Примирил враждующие охотничьи роды Бергхейма.',
    ],
    traits: {
      character: '«Лес говорит со мной. Я лишь пересказываю его слова.»',
      ideal: '«Каждая тропа ведёт к истине. Нужно лишь не сбиться.»',
      bond: 'Костяная статуэтка матери — хранительница рода Бергхейма.',
      flaw: 'Слишком доверяет голосу духа и может пройти мимо живых, ради мёртвых.',
    },
    motto: '«Сакрис, я устал… Я так устал…»',
    avatar: `${BASE}avatar_sakris.png`,
    themeColor: '#2a6a3a',
  },
  stive: {
    name: 'Стив',
    title: 'Друид-отшельник',
    bio: [
      'Когда-то он был учеником сельского травника, а после — послушником друидского круга. Когда учитель заболел неведомой хворью, Стив оставил круг и ушёл в странствие: искать лекарство, искать себя.',
      'Сейчас он бродит по дорогам Севера: говорит с деревьями, помогает путникам и не носит при себе ничего, кроме дорожного мешка и потрёпанной флейты.',
    ],
    deeds: [
      'Остановил падение священного древа в роще Старого Камня.',
      'Вылечил деревню от мора, найдя редкий корень в запретных болотах.',
      'Примирил волчью стаю с пастухами, обучив тех зову друидов.',
    ],
    traits: {
      character: '«Я не ищу славы. Я ищу, чтобы учитель снова улыбнулся.»',
      ideal: '«Живое — священно. Горе тому, кто забывает об этом.»',
      bond: 'Потрёпанная флейта учителя, хранящая мелодию, услышанную лишь в кругу друидов.',
      flaw: 'Часто уходит в мир природы и забывает о мирских делах — и о собственных друзьях.',
    },
    motto: '«Слушай. Деревья говорят тише, чем люди, но говорят правду.»',
    avatar: `${BASE}avatar_stive.png`,
    themeColor: '#2a6a3a',
  },
  talis: {
    name: 'Таллис',
    title: 'Бард-Воин Драконоборцев',
    bio: [
      'Последний носитель песен клана Драконоборцев — некогда великого ордена, истребившего последних драконов Второй Эпохи. Таллис с детства слышал эти песни от деда и решил: пусть клан исчез, песни — никогда.',
      'С лютней на плече и мечом за спиной он идёт от таверны к таверне, собирая истории и записывая их в свою бесконечную книгу. Где Таллис — там песня, а где песня — там праздник, даже на краю гибели.',
    ],
    deeds: [
      'Восстановил забытый гимн Драконоборцев по обрывкам из разных архивов.',
      'Усмирил бунт в таверне «Серебряный Зуб» одной балладой и старой монетой клана.',
      'Спас караван от разбойников, устроив импровизированный концерт на перекрёстке.',
    ],
    traits: {
      character: '«Песня — лучший щит. Спой её — и враг остановится, чтобы послушать.»',
      ideal: '«Память сильнее стали. Пока мы помним — мы живы.»',
      bond: 'Старая лютня деда с трещиной на деке — хранительница песен клана.',
      flaw: 'Слишком любит славу и кубок; может забыть о деле ради хорошей истории.',
    },
    motto: '«Когда умолкнет последняя песня — умолкнет и мир. Пока я дышу — я пою.»',
    avatar: `${BASE}avatar_tallis.png`,
    themeColor: '#FF5E00',
  },
};

interface SectionHeaderProps {
  icon: string;
  title: string;
  theme: ColorTheme;
  accent: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, theme, accent }) => (
  <div
    className="flex items-center gap-3 my-6 pb-3"
    style={{ borderBottom: `1px solid ${accent}40` }}
  >
    <span style={{ color: accent, fontSize: '1.4rem' }}>{icon}</span>
    <h2
      className="text-xl font-bold tracking-[3px] uppercase"
      style={{
        fontFamily: "'Cinzel Decorative', serif",
        color: theme.parchment,
      }}
    >
      {title}
    </h2>
  </div>
);

const LorePage: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const [lore, setLore] = useState<LoreData | null>(null);

  const theme = useMemo<ColorTheme>(() => {
    if (!characterId) return getThemeByPath('/');
    return getThemeByPath(`/${characterId}`);
  }, [characterId]);

  useEffect(() => {
    setLore(null);
    if (characterId && loreDatabase[characterId]) {
      setLore(loreDatabase[characterId]);
    }
  }, [characterId]);

  if (!lore) {
    return (
      <Layout theme={theme}>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-[4px] mb-4"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: theme.parchment,
            }}
          >
            Персонаж не найден
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-lg italic"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: theme.parchmentDim,
            }}
          >
            По этому пути ещё не проложено летописи. Возможно, история ещё не написана.
          </motion.p>
        </div>
      </Layout>
    );
  }

  const accent = lore.themeColor;

  return (
    <Layout theme={theme}>
      <div
        className="max-w-4xl mx-auto px-6 py-12"
        style={{ color: theme.parchment }}
      >
        <HeroNav theme={theme} characterId={characterId} />

        {/* Аватар и заголовок */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div
            className="w-48 h-48 rounded-full overflow-hidden border-2 flex items-center justify-center flex-shrink-0"
            style={{
              borderColor: `${accent}80`,
              background: `radial-gradient(circle, ${accent}25 0%, transparent 70%)`,
              boxShadow: `0 0 30px ${accent}40`,
            }}
          >
            <img
              src={lore.avatar}
              alt={lore.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback: show initials if avatar not found
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.style.cssText = 'display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:3rem;color:' + accent + ';font-family:Cinzel Decorative,serif;';
                  fallback.textContent = lore.name.split(' ').map(w => w[0]).join('').substring(0, 2);
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <div className="text-center md:text-left">
            <h1
              className="text-4xl md:text-5xl font-bold tracking-[3px]"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                color: theme.silverBright,
                textShadow: `0 0 20px ${accent}40, 0 2px 6px rgba(0,0,0,0.9)`,
              }}
            >
              {lore.name}
            </h1>
            <p
              className="text-xl italic mt-2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: accent,
                textShadow: `0 0 12px ${accent}40`,
              }}
            >
              {lore.title}
            </p>
          </div>
        </div>

        {/* Биография */}
        <SectionHeader icon="📜" title="Биография и путь" theme={theme} accent={accent} />
        <div
          className="lore-block p-6 rounded mb-8"
          style={{
            background: 'rgba(11,26,46,0.3)',
            borderLeft: `3px solid ${accent}`,
            fontFamily: "'Cormorant Garamond', serif",
            color: theme.parchment,
            lineHeight: 1.85,
          }}
        >
          {lore.bio.map((paragraph, idx) => (
            <p key={idx} className="text-justify mb-3 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Свершения */}
        <SectionHeader icon="⚔️" title="Ключевые свершения" theme={theme} accent={accent} />
        <ul
          className="list-disc pl-6 mb-8"
          style={{
            color: theme.silver,
            fontFamily: "'Cormorant Garamond', serif",
            lineHeight: 1.8,
          }}
        >
          {lore.deeds.map((deed, idx) => (
            <li key={idx}>{deed}</li>
          ))}
        </ul>

        {/* Особенности */}
        <SectionHeader icon="🌟" title="Личные особенности" theme={theme} accent={accent} />
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {([
            { key: 'character', label: 'Черта характера' },
            { key: 'ideal', label: 'Идеал' },
            { key: 'bond', label: 'Привязанность' },
            { key: 'flaw', label: 'Слабость' },
          ] as const).map(({ key, label }) => (
            <div
              key={key}
              className="p-4 rounded"
              style={{
                background: `${accent}10`,
                borderLeft: `2px solid ${accent}`,
              }}
            >
              <strong style={{ color: accent, fontFamily: "'Cinzel', serif" }}>
                {label}:
              </strong>{' '}
              <span style={{ color: theme.silver }}>{lore.traits[key]}</span>
            </div>
          ))}
        </div>

        {/* Девиз */}
        <div
          className="p-8 text-center my-12 rounded"
          style={{
            background: theme.void,
            border: `1px solid ${accent}60`,
            boxShadow: `inset 0 0 30px ${accent}10`,
          }}
        >
          <p
            className="text-xl italic"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: accent,
              letterSpacing: '2px',
            }}
          >
            {lore.motto}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LorePage;
