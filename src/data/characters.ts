/**
 * Централизованная конфигурация всех персонажей.
 * Используется на главной, в боковом меню, навигации героя и лоре.
 */

export interface CharacterPage {
  label: string;
  path: string;
}

export interface CharacterConfig {
  id: string;
  name: string;
  title: string;
  desc: string;
  color: string;
  tarot: string;
  avatar: string;
  lorePath: string;
  pages: CharacterPage[];
}

const BASE = import.meta.env.BASE_URL;

export const characters: CharacterConfig[] = [
  {
    id: 'valery',
    name: 'Валерий Даркбейн',
    title: 'Потомок сильнейшего Авантюриста',
    desc: 'Паладин ищущий силы и славы, чья кровь связана с силами за гранью смертных.',
    color: '#e6e6fa',
    tarot: `${BASE}optimized/tarot_valery.webp`,
    avatar: `${BASE}avatar_valery.png`,
    lorePath: '/lore/valery',
    pages: [
      { label: 'Личное умение', path: '/valery' },
      { label: 'Подкласс', path: '/subclass/valery' },
      { label: 'Род Даркбейнов', path: '/darkbain' },
    ],
  },
  {
    id: 'brin',
    name: 'Брин дель Хессен',
    title: 'Наследный Принц Астарии',
    desc: 'Чародей и наследный Лорд, черпающий силу из Чёрного льда.',
    color: '#5a3a7a',
    tarot: `${BASE}optimized/tarot_brin.webp`,
    avatar: `${BASE}avatar_brin.png`,
    lorePath: '/lore/brin',
    pages: [
      { label: 'Личное умение', path: '/brin' },
      { label: 'Подкласс', path: '/subclass/brin' },
      { label: 'Научная работа', path: '/black-ice-research' },
      { label: 'Астария', path: '/brin/astaria' },
      { label: 'Мирный план с орками', path: '/brin/pursuing-peace' },
      { label: 'Дом Хессен', path: '/hessen' },
    ],
  },
  {
    id: 'sakris',
    name: 'Сакрис Ульриаш',
    title: 'Следопыт, сосуд древнего духа',
    desc: 'Драконид из сурового Бергхейма, покинувший дом ради дорог, знаний и собственного пути.',
    color: '#2a5a8a',
    tarot: `${BASE}optimized/tarot_sakris.webp`,
    avatar: `${BASE}avatar_sakris.png`,
    lorePath: '/lore/sakris',
    pages: [
      { label: 'Личное умение', path: '/sakris' },
      { label: 'Подкласс', path: '/subclass/sakris' },
      { label: 'Бергхейм', path: '/berghheim' },
    ],
  },
  {
    id: 'talis',
    name: 'Таллис',
    title: 'Бард-Воин',
    desc: 'Бродяга с лютней, носитель культурного наследия некогда великого клана Драконоборцев.',
    color: '#FF5E00',
    tarot: `${BASE}optimized/tarot_tallis.webp`,
    avatar: `${BASE}avatar_tallis.png`,
    lorePath: '/lore/talis',
    pages: [
      { label: 'Подкласс', path: '/subclass/talis' },
      { label: 'Клан Арантир', path: '/arantir' },
    ],
  },
  {
    id: 'stive',
    name: 'Стив',
    title: 'Друид отшельник',
    desc: 'Странствует в поисках лекарства для своего учителя и в поисках себя.',
    color: '#2a6a3a',
    tarot: `${BASE}optimized/tarot_stive.webp`,
    avatar: `${BASE}avatar_stive.png`,
    lorePath: '/lore/stive',
    pages: [
      { label: 'Личное умение', path: '/stive' },
      { label: 'Подкласс', path: '/subclass/stive' },
    ],
  },
];

export function getCharacterById(id: string): CharacterConfig | undefined {
  return characters.find(c => c.id === id);
}

/** Определить id персонажа по текущему пути */
export function getCharacterIdByPath(pathname: string): string | undefined {
  if (pathname.includes('valery') || pathname.includes('darkbain')) return 'valery';
  if (pathname.includes('brin') || pathname.includes('hessen') || pathname.includes('astaria') || pathname.includes('pursuing-peace') || pathname.includes('black-ice-research')) return 'brin';
  if (pathname.includes('sakris') || pathname.includes('berghheim')) return 'sakris';
  if (pathname.includes('talis') || pathname.includes('arantir')) return 'talis';
  if (pathname.includes('stive')) return 'stive';
  return undefined;
}
