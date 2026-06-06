import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { homeTheme } from '@/types/theme';

const charactersData: Record<string, { name: string; title: string }> = {
  valery: { name: 'Валерий Даркбейн', title: 'Потомок сильнейшего Авантюриста' },
  brin: { name: 'Брин дель Хессен', title: 'Наследный Принц Астарии' },
  sakris: { name: 'Сакрис из Бергхейма', title: 'Следопыт, сосуд древнего духа' },
  stive: { name: 'Стив', title: 'Друид-отшельник' },
  talis: { name: 'Таллис', title: 'Бард-Воин' },
};

const LorePage: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const character = characterId ? charactersData[characterId] : null;

  if (!character) {
    return <Layout theme={homeTheme}>Персонаж не найден</Layout>;
  }

  return (
    <Layout theme={homeTheme}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">{character.name}</h1>
        <h2 className="text-xl italic mb-4">{character.title}</h2>
        <p>Здесь будет лор персонажа. Текст можно добавить позже.</p>
      </div>
    </Layout>
  );
};

export default LorePage;
