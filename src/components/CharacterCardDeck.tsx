import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CalendarDays, Eye, RotateCcw, Shuffle, Sparkles } from 'lucide-react';
import { tarotBackImage, tarotCards, type TarotCard } from '@/data/tarot';
import type { CharacterConfig } from '@/data/characters';
import { homeTheme } from '@/types/theme';

type Orientation = 'upright' | 'reversed';
type SpreadPosition = 'Прошлое' | 'Настоящее' | 'Будущее';

interface SpreadResult {
  id: string;
  position: SpreadPosition;
  card: TarotCard;
  orientation: Orientation;
}

interface VisitorResult {
  card: TarotCard;
  orientation: Orientation;
  question: string;
}

const spreadPositions: SpreadPosition[] = ['Прошлое', 'Настоящее', 'Будущее'];

const orientationLabel: Record<Orientation, string> = {
  upright: 'Прямое положение',
  reversed: 'Перевёрнутое положение',
};

const safeQuestion = (value: string) => value.trim().replace(/\s+/g, ' ').slice(0, 220);

const randomOrientation = (): Orientation => (Math.random() < 0.5 ? 'upright' : 'reversed');

const drawUniqueCards = (count: number) => {
  const pool = [...tarotCards].sort(() => Math.random() - 0.5);
  return pool.slice(0, count);
};

const hashDate = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
};

const getTodayKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDailyCard = () => {
  const key = getTodayKey();
  const index = hashDate(key) % tarotCards.length;
  return { card: tarotCards[index], dateKey: key };
};

const loreAnchor = (card: TarotCard, orientation: Orientation) => {
  const lines = card.backLore.length > 0 ? card.backLore : [card.desc];
  if (orientation === 'upright') {
    return [card.title, card.desc, lines[0], lines[2]].filter(Boolean).join(' ');
  }
  return [card.title, card.desc, lines[1] ?? lines[0], lines[2]].filter(Boolean).join(' ');
};

const buildInterpretation = (card: TarotCard, orientation: Orientation, context: string) => {
  const anchor = loreAnchor(card, orientation);
  if (orientation === 'upright') {
    return `${context}: ${anchor}`;
  }
  return `${context}: та же карта читается через препятствие, задержку или внутренний спор. Основа толкования: ${anchor}`;
};

const CardFace: React.FC<{ card: TarotCard }> = ({ card }) => (
  <div className="tarot-card-side tarot-card-front" aria-hidden="true">
    <img src={card.tarot} alt={card.name} loading="lazy" decoding="async" draggable={false} />
    <span className="tarot-card-front-glaze" />
  </div>
);

const CardBackVisual: React.FC<{ card?: TarotCard; compact?: boolean }> = ({ card, compact = false }) => (
  <div className="tarot-card-side tarot-card-back" aria-hidden="true">
    <img src={tarotBackImage} alt="Рубашка карты" loading={compact ? 'lazy' : 'eager'} decoding="async" draggable={false} />
    <span className="tarot-card-back-vignette" />
    {card && !compact && (
      <span className="tarot-card-back-name">{card.name}</span>
    )}
  </div>
);

const GalleryCard: React.FC<{
  card: TarotCard;
  revealed: boolean;
  loreMode: boolean;
  onFlip: (card: TarotCard) => void;
  onLore: (card: TarotCard) => void;
}> = ({ card, revealed, loreMode, onFlip, onLore }) => {
  const handleClick = () => {
    if (loreMode) onLore(card);
    else onFlip(card);
  };

  return (
    <motion.button
      type="button"
      className={`tarot-gallery-card tarot-no-glow ${revealed ? 'is-revealed' : ''} ${loreMode ? 'is-lore-mode' : ''}`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 22, rotateZ: -2 }}
      animate={{ opacity: 1, y: 0, rotateZ: 0 }}
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.985 }}
      aria-label={loreMode ? `Открыть лор карты ${card.name}` : revealed ? `Перевернуть карту ${card.name} рубашкой` : `Перевернуть карту ${card.name}`}
      style={{ '--card-accent': card.color } as React.CSSProperties}
    >
      <span className="tarot-card-rotator">
        <CardBackVisual card={card} />
        <CardFace card={card} />
      </span>
      <span className="tarot-card-caption">
        <span>{revealed ? card.name : 'Рубашка'}</span>
        <small>{loreMode ? 'лор' : revealed ? 'клик — скрыть' : 'клик — открыть'}</small>
      </span>
    </motion.button>
  );
};

const LoreModal: React.FC<{ card: TarotCard | null; onClose: () => void }> = ({ card, onClose }) => {
  const navigate = useNavigate();
  if (!card) return null;

  const goTo = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <motion.div
      className="tarot-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.article
        className="tarot-lore-modal"
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ type: 'spring', damping: 24, stiffness: 210 }}
      >
        <button type="button" className="tarot-modal-close tarot-no-glow" onClick={onClose} aria-label="Закрыть">×</button>
        <div className="tarot-modal-rune">ᚠ ᚱ ᚢ</div>
        <h3>{card.name}</h3>
        <p className="tarot-modal-title">{card.title}</p>
        <div className="tarot-modal-lore-lines">
          {card.backLore.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="tarot-modal-actions">
          <button type="button" className="tarot-ritual-button tarot-no-glow" onClick={() => goTo(card.lorePath)}>
            Читать лор
          </button>
          {card.pages.map((page) => (
            <button key={page.path} type="button" className="tarot-link-chip tarot-no-glow" onClick={() => goTo(page.path)}>
              {page.label}
            </button>
          ))}
        </div>
      </motion.article>
    </motion.div>
  );
};

const DailyCardPanel: React.FC = () => {
  const daily = useMemo(getDailyCard, []);
  const interpretation = buildInterpretation(daily.card, 'upright', 'Карта дня');

  return (
    <aside className="daily-card-panel" style={{ '--card-accent': daily.card.color } as React.CSSProperties}>
      <div className="daily-card-kicker"><CalendarDays size={15} /> Карта дня</div>
      <div className="daily-card-frame">
        <img src={daily.card.tarot} alt={daily.card.name} loading="lazy" decoding="async" draggable={false} />
      </div>
      <h3>{daily.card.name}</h3>
      <p className="daily-card-date">{daily.dateKey}</p>
      <p>{interpretation}</p>
    </aside>
  );
};

const SpreadCardView: React.FC<{ result: SpreadResult }> = ({ result }) => (
  <article className={`spread-card ${result.orientation === 'reversed' ? 'is-reversed' : ''}`} style={{ '--card-accent': result.card.color } as React.CSSProperties}>
    <div className="spread-card-image">
      <img src={result.card.tarot} alt={result.card.name} loading="lazy" decoding="async" draggable={false} />
    </div>
    <div className="spread-card-body">
      <span className="spread-position">{result.position}</span>
      <h4>{result.card.name}</h4>
      <span className="spread-orientation">{orientationLabel[result.orientation]}</span>
      <p>{buildInterpretation(result.card, result.orientation, `Позиция «${result.position}»`)}</p>
    </div>
  </article>
);

const VisitorReading: React.FC<{ result: VisitorResult | null }> = ({ result }) => {
  if (!result) return null;
  return (
    <motion.article
      className={`visitor-result ${result.orientation === 'reversed' ? 'is-reversed' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ '--card-accent': result.card.color } as React.CSSProperties}
    >
      <div className="visitor-result-image">
        <img src={result.card.tarot} alt={result.card.name} loading="lazy" decoding="async" draggable={false} />
      </div>
      <div>
        <span className="spread-position">Вопрос посетителя</span>
        <h4>{result.card.name}</h4>
        <span className="spread-orientation">{orientationLabel[result.orientation]}</span>
        <p>{buildInterpretation(result.card, result.orientation, `На вопрос «${result.question}»`)}</p>
      </div>
    </motion.article>
  );
};

const TarotRituals: React.FC = () => {
  const [spread, setSpread] = useState<SpreadResult[]>([]);
  const [question, setQuestion] = useState('');
  const [visitorResult, setVisitorResult] = useState<VisitorResult | null>(null);
  const [questionError, setQuestionError] = useState('');

  const drawSpread = () => {
    const cards = drawUniqueCards(3);
    setSpread(cards.map((card, index) => ({
      id: `${card.id}-${Date.now()}-${index}`,
      position: spreadPositions[index],
      card,
      orientation: randomOrientation(),
    })));
  };

  const drawVisitor = () => {
    const preparedQuestion = safeQuestion(question);
    if (!preparedQuestion) {
      setQuestionError('Введите вопрос перед раскладом.');
      return;
    }
    setQuestionError('');
    const [card] = drawUniqueCards(1);
    setVisitorResult({ card, orientation: randomOrientation(), question: preparedQuestion });
  };

  return (
    <section className="tarot-rituals" aria-label="Расклады Таро">
      <div className="tarot-ritual-card three-spread-card">
        <div className="tarot-ritual-heading">
          <Sparkles size={18} />
          <div>
            <h3>Самостоятельный расклад</h3>
            <p>Прошлое · Настоящее · Будущее</p>
          </div>
        </div>
        <button type="button" className="tarot-ritual-button tarot-no-glow" onClick={drawSpread}>
          <Shuffle size={15} /> Вытянуть 3 карты
        </button>
        <AnimatePresence mode="popLayout">
          {spread.length > 0 && (
            <motion.div className="spread-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {spread.map((result) => <SpreadCardView key={result.id} result={result} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="tarot-ritual-card visitor-spread-card">
        <div className="tarot-ritual-heading">
          <BookOpen size={18} />
          <div>
            <h3>Расклад для посетителей</h3>
            <p>Один вопрос · одна карта</p>
          </div>
        </div>
        <textarea
          value={question}
          onChange={(event) => { setQuestion(event.target.value); if (questionError) setQuestionError(''); }}
          placeholder="Введите вопрос..."
          className="tarot-question-input"
          rows={3}
        />
        {questionError && <div className="tarot-question-error">{questionError}</div>}
        <button type="button" className="tarot-ritual-button tarot-no-glow" onClick={drawVisitor}>
          <Eye size={15} /> Вытянуть карту
        </button>
        <VisitorReading result={visitorResult} />
      </div>
    </section>
  );
};

interface CharacterCardDeckProps {
  onExpandedChange?: (char: CharacterConfig | null) => void;
}

const CharacterCardDeck: React.FC<CharacterCardDeckProps> = ({ onExpandedChange }) => {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [loreMode, setLoreMode] = useState(false);
  const [selectedLore, setSelectedLore] = useState<TarotCard | null>(null);

  useEffect(() => {
    onExpandedChange?.(selectedLore);
  }, [selectedLore, onExpandedChange]);

  const toggleCard = (card: TarotCard) => {
    setRevealed((previous) => ({ ...previous, [card.id]: !previous[card.id] }));
  };

  return (
    <div className="tarot-oracle-layout">
      <div className="tarot-oracle-main">
        <div className="tarot-gallery-toolbar">
          <div>
            <span className="tarot-toolbar-kicker">Галерея из пяти карт</span>
            <p>Карты лежат рубашкой. Переворачивайте их или включите режим лора.</p>
          </div>
          <button
            type="button"
            className={`tarot-mode-toggle tarot-no-glow ${loreMode ? 'is-active' : ''}`}
            onClick={() => setLoreMode((value) => !value)}
            aria-pressed={loreMode}
          >
            {loreMode ? <BookOpen size={16} /> : <RotateCcw size={16} />}
            {loreMode ? 'Режим лора' : 'Режим переворота'}
          </button>
        </div>

        <div className="tarot-gallery" aria-label="Галерея карт Таро">
          {tarotCards.map((card) => (
            <GalleryCard
              key={card.id}
              card={card}
              revealed={!!revealed[card.id]}
              loreMode={loreMode}
              onFlip={toggleCard}
              onLore={setSelectedLore}
            />
          ))}
        </div>

        <TarotRituals />

        <div className="tarot-lore-link-row">
          <button
            type="button"
            onClick={() => navigate('/letopis')}
            className="tarot-ritual-button tarot-no-glow"
            style={{ color: homeTheme.parchment } as React.CSSProperties}
          >
            Открыть летопись мира
          </button>
        </div>
      </div>

      <DailyCardPanel />

      <AnimatePresence>
        {selectedLore && <LoreModal card={selectedLore} onClose={() => setSelectedLore(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default CharacterCardDeck;
