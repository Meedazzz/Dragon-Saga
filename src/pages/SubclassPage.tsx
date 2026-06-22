import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { getCharacterById } from '@/data/characters';
import { getThemeByPath } from '@/types/theme';

const subclassData: Record<string, { name: string; description: string; features: { title: string; desc: string }[] }> = {
  valery: {
    name: 'Подкласс Валерия Даркбейна',
    description: 'Описание подкласса будет добавлено позже.',
    features: [
      { title: 'Особенность 1', desc: 'Описание особенности будет добавлено позже.' },
      { title: 'Особенность 2', desc: 'Описание особенности будет добавлено позже.' },
    ],
  },
  brin: {
    name: 'Подкласс Брина дель Хессена',
    description: 'Описание подкласса будет добавлено позже.',
    features: [
      { title: 'Особенность 1', desc: 'Описание особенности будет добавлено позже.' },
      { title: 'Особенность 2', desc: 'Описание особенности будет добавлено позже.' },
    ],
  },
  sakris: {
    name: 'Подкласс Сакриса Ульриаша',
    description: 'Описание подкласса будет добавлено позже.',
    features: [
      { title: 'Особенность 1', desc: 'Описание особенности будет добавлено позже.' },
      { title: 'Особенность 2', desc: 'Описание особенности будет добавлено позже.' },
    ],
  },
  talis: {
    name: 'Подкласс Таллиса',
    description: 'Описание подкласса будет добавлено позже.',
    features: [
      { title: 'Особенность 1', desc: 'Описание особенности будет добавлено позже.' },
      { title: 'Особенность 2', desc: 'Описание особенности будет добавлено позже.' },
    ],
  },
  stive: {
    name: 'Подкласс Стива',
    description: 'Описание подкласса будет добавлено позже.',
    features: [
      { title: 'Особенность 1', desc: 'Описание особенности будет добавлено позже.' },
      { title: 'Особенность 2', desc: 'Описание особенности будет добавлено позже.' },
    ],
  },
};

const SubclassPage: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const data = characterId ? subclassData[characterId] : undefined;
  const char = characterId ? getCharacterById(characterId) : undefined;
  const theme = characterId ? getThemeByPath(`/${characterId}`) : getThemeByPath('/');

  if (!data || !char) {
    return (
      <Layout theme={theme}>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Cinzel Decorative', serif", color: theme.parchment }}>
            Персонаж не найден
          </h1>
          <p className="text-lg italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.parchmentDim }}>
            По этому пути ещё не проложено летописи.
          </p>
        </div>
      </Layout>
    );
  }

  const accent = char.color;

  return (
    <Layout theme={theme}>
      <div className="max-w-[900px] mx-auto px-6 md:px-10 pb-20 pt-16">
        <HeroNav theme={theme} characterId={characterId} />

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pb-8 mb-10"
        >
          <h1
            className="text-xl md:text-[2.2rem] font-bold tracking-[3px] leading-tight"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: theme.silverBright,
              textShadow: `0 0 20px ${accent}40, 0 2px 6px rgba(0,0,0,0.9)`,
            }}
          >
            {data.name}
          </h1>
          <div className="rune-divider" style={{ '--divider-color': accent, '--divider-text': theme.parchment } as React.CSSProperties}>
            <span></span>
          </div>
        </motion.header>

        {/* Placeholder Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="p-8 rounded text-center"
            style={{
              background: 'rgba(20,15,10,0.3)',
              border: `1px solid ${accent}30`,
            }}
          >
            <div className="text-4xl mb-4" style={{ opacity: 0.4 }}></div>
            <p
              className="text-lg italic mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: theme.parchment,
              }}
            >
              {data.description}
            </p>
            <p
              className="text-sm"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: theme.parchmentDim,
              }}
            >
              Страница в разработке. Скоро здесь появится подробное описание подкласса.
            </p>
          </div>
        </motion.section>

        {/* Feature placeholders */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="section-header" style={{ '--section-border': `${accent}30`, '--section-icon-color': accent, '--section-title-color': theme.parchment, '--section-line-color': accent } as React.CSSProperties}>
            <span className="section-icon"></span>
            <h2 className="section-title">Особенности</h2>
            <div className="section-line" />
          </div>

          <div className="flex flex-col gap-4">
            {data.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="p-5 rounded"
                style={{
                  background: 'rgba(20,15,10,0.2)',
                  borderLeft: `3px solid ${accent}`,
                }}
              >
                <div
                  className="text-base font-bold tracking-[1px] mb-2"
                  style={{ fontFamily: "'Cinzel', serif", color: accent }}
                >
                  {feature.title}
                </div>
                <div
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.silver }}
                >
                  {feature.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <div className="footer-ornament mt-12" style={{ '--footer-border': `${accent}20`, '--footer-text-color': accent } as React.CSSProperties}>
          <div className="rune-string">  </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubclassPage;
