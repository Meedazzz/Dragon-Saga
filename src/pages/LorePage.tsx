import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { homeTheme, valeryTheme, brinTheme, sakrisTheme } from '@/types/theme';

// Данные персонажей – замените текст на свой
const loreData: Record<string, { name: string; title: string; bio: string; avatar: string; theme: any }> = {
  valery: {
    name: 'Валерий Даркбейн',
    title: 'Потомок сильнейшего Авантюриста',
    bio: 'Полный лор Валерия... (отредактируйте)',
    avatar: `${import.meta.env.BASE_URL}tarot_valery.png`,
    theme: valeryTheme,
  },
  brin: {
    name: 'Брин дель Хессен',
    title: 'Наследный Принц Астарии',
    bio: 'Лор Брина...',
    avatar: `${import.meta.env.BASE_URL}tarot_brin.png`,
    theme: brinTheme,
  },
  sakris: {
    name: 'Сакрис из Бергхейма',
    title: 'Следопыт, сосуд древнего духа',
    bio: 'Лор Сакриса...',
    avatar: `${import.meta.env.BASE_URL}tarot_sakris.png`,
    theme: sakrisTheme,
  },
  stive: {
    name: 'Стив',
    title: 'Друид-отшельник',
    bio: 'Лор Стива...',
    avatar: `${import.meta.env.BASE_URL}tarot_stive.png`,
    theme: homeTheme, // временно
  },
  talis: {
    name: 'Таллис',
    title: 'Бард-Воин',
    bio: 'Лор Таллиса...',
    avatar: `${import.meta.env.BASE_URL}tarot_talis.png`,
    theme: homeTheme,
  },
};

const LorePage: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const character = characterId ? loreData[characterId] : null;
  if (!character) return <Layout theme={homeTheme}>Персонаж не найден</Layout>;

  return (
    <Layout theme={character.theme}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-cyan-700 shadow-lg">
            <img src={character.avatar} alt={character.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Cinzel Decorative', serif", color: character.theme.silver }}>
              {character.name}
            </h1>
            <p className="text-xl italic text-cyan-400 mt-2">{character.title}</p>
          </div>
        </div>
        <div className="prose prose-invert max-w-none" style={{ color: character.theme.parchment }}>
          <p>{character.bio}</p>
        </div>
      </div>
    </Layout>
  );
};

export default LorePage;
