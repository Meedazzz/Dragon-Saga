import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { brinTheme } from '@/types/theme';

const BASE = import.meta.env.BASE_URL;

interface BrinDocumentInfo {
  title: string;
  subtitle: string;
  file: string;
  description: string;
}

/**
 * Документы Брина.
 * Здесь лежат PDF-материалы, связанные с Брином: Астария и мирный план с орками.
 * Чтобы добавить новый документ, положи PDF в `public/docs/` и добавь запись в этот объект.
 */
const documents: Record<string, BrinDocumentInfo> = {
  astaria: {
    title: 'Астария',
    subtitle: 'Материал Брина · государство, дома и политический контекст',
    file: `${BASE}docs/astaria.pdf`,
    description: 'PDF-документ с материалами по Астарии. Страница оформлена как часть архива Брина и не изменяет основную летопись.',
  },
  'pursuing-peace': {
    title: 'Мирный план с орками',
    subtitle: 'Материал Брина · переговоры, план мира и северная дипломатия',
    file: `${BASE}docs/pursuing-peace-orcs.pdf`,
    description: 'PDF-документ с мирным планом по оркам. Он связан с политическим и дипломатическим направлением Брина.',
  },
};

const BrinDocumentPage: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const documentInfo = documentId ? documents[documentId] : undefined;

  if (!documentInfo) {
    return (
      <Layout theme={brinTheme}>
        <main className="document-page">
          <HeroNav theme={brinTheme} characterId="brin" />
          <section className="document-hero-card">
            <h1>Документ не найден</h1>
            <p>В архиве Брина нет такого PDF-материала.</p>
            <button type="button" className="codex-btn codex-btn--primary tarot-no-glow" onClick={() => navigate('/brin')}>Вернуться к Брину</button>
          </section>
        </main>
      </Layout>
    );
  }

  return (
    <Layout theme={brinTheme} particleVariant="mixed" particleCount={22}>
      <main className="document-page">
        <HeroNav theme={brinTheme} characterId="brin" />

        <motion.section className="document-hero-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <span className="codex-kicker">Архив Брина</span>
          <h1>{documentInfo.title}</h1>
          <p className="document-subtitle">{documentInfo.subtitle}</p>
          <p>{documentInfo.description}</p>
          <div className="document-actions">
            <a className="codex-btn codex-btn--primary tarot-no-glow" href={documentInfo.file} target="_blank" rel="noopener noreferrer">Открыть PDF</a>
            <a className="codex-btn tarot-no-glow" href={documentInfo.file} download>Скачать</a>
          </div>
        </motion.section>

        <motion.section className="document-viewer-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <iframe src={documentInfo.file} title={documentInfo.title} loading="lazy" />
        </motion.section>
      </main>
    </Layout>
  );
};

export default BrinDocumentPage;
