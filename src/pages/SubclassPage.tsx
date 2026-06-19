import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { getCharacterById } from '@/data/characters';
import { getThemeByPath } from '@/types/theme';

const subclassData: Record<string, { name: string; description: string; features: { title: string; desc: string }[] }> = {
  valery: { name: 'Подкласс Валерия Даркбейна', description: 'Описание подкласса будет добавлено позже.', features: [{ title: 'Особенность 1', desc: 'Описание особенности будет добавлено позже.' }, { title: 'Особенность 2', desc: 'Описание особенности будет добавлено позже.' }] },
  brin: { name: 'Подкласс Брина дель Хессена', description: 'Описание подкласса будет добавлено позже.', features: [{ title: 'Особенность 1', desc: 'Описание особенности будет добавлено позже.' }, { title: 'Особенность 2', desc: 'Описание особенности будет добавлено позже.' }] },
  sakris: { name: 'Подкласс Сакриса Ульриаша', description: 'Описание подкласса будет добавлено позже.', features: [{ title: 'Особенность 1', desc: 'Описание особенности будет добавлено позже.' }, { title: 'Особенность 2', desc: 'Описание особенности будет добавлено позже.' }] },
  talis: { name: 'Подкласс Таллиса', description: 'Описание подкласса будет добавлено позже.', features: [{ title: 'Особенность 1', desc: 'Описание особенности будет добавлено позже.' }, { title: 'Особенность 2', desc: 'Описание особенности будет добавлено позже.' }] },
  stive: { name: 'Подкласс Стива', description: 'Описание подкласса будет добавлено позже.', features: [{ title: 'Особенность 1', desc: 'Описание особенности будет добавлено позже.' }, { title: 'Особенность 2', desc: 'Описание особенности будет добавлено позже.' }] },
};

const SubclassPage: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const data = characterId ? subclassData[characterId] : undefined;
  const char = characterId ? getCharacterById(characterId) : undefined;
  const theme = characterId ? getThemeByPath(`/${characterId}`) : getThemeByPath('/');

  if (!data || !char) {
    return (
      <Layout theme={theme}>
        <div className="tome-page">
          <h1 className="tome-title">Персонаж не найден</h1>
          <p className="tome-lead">По этому пути ещё не проложено летописи.</p>
        </div>
      </Layout>
    );
  }

  const accent = char.color;

  return (
    <Layout theme={theme}>
      <div className="subclass-page tome-page">
        <HeroNav theme={theme} />

        <header className="subclass-header">
          <h1 className="subclass-title" style={{ color: accent }}>{data.name}</h1>
        </header>

        <section className="charge-box">
          <p className="prose-readable">{data.description}</p>
          <p className="charge-note">Страница в разработке. Скоро здесь появится подробное описание подкласса.</p>
        </section>

        <section>
          <div className="section-header">
            <div className="section-title" style={{ color: accent }}>Особенности</div>
            <div className="section-line" />
          </div>
          <div className="darkbain-grid">
            {data.features.map((feature, idx) => (
              <article key={idx} className="darkbain-card">
                <h3 className="darkbain-card-name">{feature.title}</h3>
                <p className="prose-readable">{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="footer-ornament"><span className="rune-string">SUBCLASS</span></footer>
      </div>
    </Layout>
  );
};

export default SubclassPage;
