import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { homeTheme } from '@/types/theme';

interface LoreData {
  name: string;
  title: string;
  bio: string;
  deeds: string[];
  traits: {
    character: string;
    ideal: string;
    bond: string;
    flaw: string;
  };
  motto: string;
  avatar?: string;
}

// Примерные данные (потом замените на реальные)
const loreDatabase: Record<string, LoreData> = {
  'valery': {
    name: 'Валерий Даркбейн',
    title: 'Потомок сильнейшего Авантюриста, носитель тёмного проклятья',
    bio: 'Родился в древнем роду Даркбейнов, чья кровь отмечена проклятием ещё со времён Падения Асов...',
    deeds: [
      'Сокрушил культ Чёрного Пламени в подгорных залах Каз-Тура.',
      'Заключил перемирие между кланами Бергхейма и Драконьей стражей.',
      'Оживил павшего соратника ценой части собственной жизненной силы.',
    ],
    traits: {
      character: '«Смерть — не конец, а лишь ступень. Я помню лица всех, кого не смог спасти.»',
      ideal: '«Сила должна защищать тех, кто не может защитить себя. Даже если эта сила из мрака.»',
      bond: 'Старый серебряный амулет матери, единственное, что осталось от семьи.',
      flaw: 'Иногда его захлёстывает жажда боя, и он не различает друга и врага.',
    },
    motto: '«Нет добра или зла. Есть только жизнь и смерть. И я выбираю — жить, пока могу сражаться.»',
    avatar: `${import.meta.env.BASE_URL}tarot_valery.png`,
  },
  'brin': { /* ... аналогично */ },
  // и так далее
};

const LorePage: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const [lore, setLore] = useState<LoreData | null>(null);

  useEffect(() => {
    if (characterId && loreDatabase[characterId]) {
      setLore(loreDatabase[characterId]);
    } else {
      // заглушка
      setLore(null);
    }
  }, [characterId]);

  if (!lore) {
    return <Layout theme={homeTheme}>Персонаж не найден</Layout>;
  }

  return (
    <Layout theme={homeTheme}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Аватар и заголовок */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-cobalt-glow shadow-lg">
            <img src={lore.avatar || '/placeholder.png'} alt={lore.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Cinzel Decorative', serif", color: homeTheme.silver }}>
              {lore.name}
            </h1>
            <p className="text-xl italic text-sky-ice mt-2">{lore.title}</p>
          </div>
        </div>

        {/* Биография */}
        <div className="section-header">
          <span className="section-icon">📜</span>
          <h2 className="section-title">Биография и путь</h2>
        </div>
        <div className="lore-block p-6 rounded bg-void/40 border-l-4 border-cobalt-glow mb-8">
          <p className="text-parchment leading-relaxed">{lore.bio}</p>
        </div>

        {/* Свершения */}
        <div className="section-header">
          <span className="section-icon">⚔️</span>
          <h2 className="section-title">Ключевые свершения</h2>
        </div>
        <ul className="list-disc pl-6 mb-8 text-parchment leading-relaxed">
          {lore.deeds.map((deed, idx) => <li key={idx}>{deed}</li>)}
        </ul>

        {/* Особенности */}
        <div className="section-header">
          <span className="section-icon">🌟</span>
          <h2 className="section-title">Личные особенности</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-void/30 rounded border-l-2 border-cobalt-glow"><strong>Черта:</strong> {lore.traits.character}</div>
          <div className="p-4 bg-void/30 rounded border-l-2 border-cobalt-glow"><strong>Идеал:</strong> {lore.traits.ideal}</div>
          <div className="p-4 bg-void/30 rounded border-l-2 border-cobalt-glow"><strong>Привязанность:</strong> {lore.traits.bond}</div>
          <div className="p-4 bg-void/30 rounded border-l-2 border-cobalt-glow"><strong>Слабость:</strong> {lore.traits.flaw}</div>
        </div>

        {/* Мото */}
        <div className="p-6 text-center bg-abyss border border-cobalt-glow rounded my-12">
          <p className="text-xl italic text-cobalt-glow">{lore.motto}</p>
        </div>
      </div>
    </Layout>
  );
};

export default LorePage;
