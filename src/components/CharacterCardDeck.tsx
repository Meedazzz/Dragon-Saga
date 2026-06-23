import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CalendarDays, Eye, RotateCcw, Shuffle, Sparkles } from 'lucide-react';
import { tarotBackImage, tarotCards, type TarotCard } from '@/data/tarot';
import type { CharacterConfig } from '@/data/characters';
import { homeTheme } from '@/types/theme';

type Orientation = 'upright' | 'reversed';
type SpreadPosition = 'Прошлое' | 'Настоящее' | 'Будущее';

type Rotation = {
  x: number;
  y: number;
  z: number;
};

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

const fanLayout = [
  { x: '-300px', y: '46px', r: '-20deg', z: 1 },
  { x: '-150px', y: '12px', r: '-9deg', z: 2 },
  { x: '0px', y: '0px', r: '0deg', z: 5 },
  { x: '150px', y: '12px', r: '9deg', z: 2 },
  { x: '300px', y: '46px', r: '20deg', z: 1 },
];

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
  const hash = hashDate(key);
  const index = hash % tarotCards.length;
  const orientation: Orientation = hash % 2 === 0 ? 'upright' : 'reversed';
  return { card: tarotCards[index], dateKey: key, orientation };
};

const loreLines = (card: TarotCard) => (card.backLore.length > 0 ? card.backLore : [card.desc]);

const buildInterpretation = (card: TarotCard, orientation: Orientation, context: string) => {
  const lines = loreLines(card);
  const core = [card.title, card.desc].filter(Boolean).join(' — ');
  const firstLore = lines[0];
  const secondLore = lines[1] ?? lines[0];
  const finalLore = lines[2] ?? lines[0];

  if (orientation === 'upright') {
    return `${context}. В сцене НРИ карта ставит в центр мотив: ${core}. Опора толкования — «${firstLore}». Сильный ход для героя или отряда: действовать в согласии с этой темой, не забывая строку рубашки: ${finalLore}`;
  }

  return `${context}. Перевёрнутая карта читает тот же мотив как осложнение, цену или внутренний спор: ${core}. Ведущий может опереться на строку рубашки: «${secondLore}». Ответ не отменяет путь, но требует осторожности, паузы и проверки намерений.`;
};

const buildQuestionInterpretation = (result: VisitorResult) => {
  const { card, orientation, question } = result;
  const lines = loreLines(card);
  const anchor = orientation === 'upright' ? lines[0] : lines[1] ?? lines[0];

  if (orientation === 'upright') {
    return `На вопрос «${question}» выпадает ${card.name}. Это не готовое пророчество, а завязка сцены: ${card.desc}. Смысл ответа держится на лоре рубашки — «${anchor}». В НРИ это знак действовать через качество карты: ${card.title}.`;
  }

  return `На вопрос «${question}» выпадает перевёрнутая карта ${card.name}. Та же тема — ${card.desc} — становится испытанием или скрытой ценой. Лор рубашки подсказывает напряжение сцены: «${anchor}». В НРИ такой ответ просит не спешить и выяснить, что именно мешает герою.`;
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
    {card && !compact && <span className="tarot-card-back-name">{card.name}</span>}
  </div>
);

const GalleryCard: React.FC<{
  card: TarotCard;
  index: number;
  revealed: boolean;
  loreMode: boolean;
  onFlip: (card: TarotCard) => void;
  onLore: (card: TarotCard) => void;
  onInspect: (card: TarotCard) => void;
}> = ({ card, index, revealed, loreMode, onFlip, onLore, onInspect }) => {
  const fan = fanLayout[index] ?? fanLayout[2];

  const handleSurfaceClick = () => {
    if (loreMode) onLore(card);
    else onFlip(card);
  };

  return (
    <article
      className={`tarot-gallery-card ${revealed ? 'is-revealed' : ''} ${loreMode ? 'is-lore-mode' : ''}`}
      style={{
        '--card-accent': card.color,
        '--fan-x': fan.x,
        '--fan-y': fan.y,
        '--fan-r': fan.r,
        '--fan-z': fan.z,
      } as React.CSSProperties}
    >
      <button
        type="button"
        className="tarot-gallery-surface tarot-no-glow"
        onClick={handleSurfaceClick}
        aria-label={loreMode ? `Открыть лор карты ${card.name}` : revealed ? `Перевернуть карту ${card.name} рубашкой` : `Перевернуть карту ${card.name}`}
      >
        <span className="tarot-card-rotator">
          <CardBackVisual card={card} />
          <CardFace card={card} />
        </span>
      </button>
      <div className="tarot-card-caption">
        <span>{revealed ? card.name : 'Рубашка'}</span>
        <small>{loreMode ? 'клик — лор' : revealed ? 'клик — скрыть' : 'клик — открыть'}</small>
      </div>
      <div className="tarot-card-actions">
        <button type="button" className="tarot-mini-action tarot-no-glow" onClick={() => onInspect(card)}>
          <Eye size={13} /> 3D
        </button>
        <button type="button" className="tarot-mini-action tarot-no-glow" onClick={() => onLore(card)}>
          <BookOpen size={13} /> Лор
        </button>
      </div>
    </article>
  );
};

const LoreModal: React.FC<{ card: TarotCard | null; onClose: () => void }> = ({ card, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!card) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [card]);

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
          {loreLines(card).map((line) => (
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

const InspectModal: React.FC<{
  card: TarotCard | null;
  onClose: () => void;
  onOpenLore: (card: TarotCard) => void;
}> = ({ card, onClose, onOpenLore }) => {
  const [rotation, setRotation] = useState<Rotation>({ x: 0, y: 180, z: 0 });
  const dragRef = useRef<{ startX: number; startY: number; origin: Rotation; pointerId: number } | null>(null);

  useEffect(() => {
    if (!card) return undefined;
    setRotation({ x: 0, y: 180, z: 0 });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [card]);

  if (!card) return null;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      origin: rotation,
      pointerId: event.pointerId,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    setRotation({
      x: drag.origin.x - dy * 0.38,
      y: drag.origin.y + dx * 0.46,
      z: drag.origin.z,
    });
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    }
  };

  const isBackFacing = Math.cos((rotation.y * Math.PI) / 180) > 0;

  return (
    <motion.div
      className="tarot-modal-backdrop tarot-inspect-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.article
        className="tarot-inspect-modal"
        initial={{ opacity: 0, y: 26, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ type: 'spring', damping: 24, stiffness: 210 }}
      >
        <button type="button" className="tarot-modal-close tarot-no-glow" onClick={onClose} aria-label="Закрыть">×</button>
        <div className="tarot-inspect-stage">
          <div
            className="tarot-inspect-card"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onWheel={(event) => {
              event.preventDefault();
              setRotation((previous) => ({ ...previous, z: previous.z + event.deltaY * 0.18 }));
            }}
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)` }}
            role="img"
            aria-label={`3D-осмотр карты ${card.name}`}
          >
            <CardBackVisual card={card} />
            <CardFace card={card} />
          </div>
        </div>
        <div className="tarot-inspect-info">
          <div className="tarot-modal-rune">ᚠ ᚱ ᚢ</div>
          <h3>{card.name}</h3>
          <p className="tarot-modal-title">{isBackFacing ? 'Рубашка и лор' : card.title}</p>
          <div className="tarot-inspect-lore">
            {loreLines(card).map((line) => <p key={line}>{line}</p>)}
          </div>
          <div className="tarot-inspect-help">
            Десктоп: ЛКМ + движение — вращение, колёсико — поворот. Мобильная версия: свайп по карте.
          </div>
          <div className="tarot-modal-actions">
            <button type="button" className="tarot-ritual-button tarot-no-glow" onClick={() => setRotation((previous) => ({ ...previous, y: previous.y + 180 }))}>
              <RotateCcw size={14} /> Перевернуть
            </button>
            <button type="button" className="tarot-link-chip tarot-no-glow" onClick={() => setRotation({ x: 0, y: 180, z: 0 })}>
              Сброс
            </button>
            <button type="button" className="tarot-link-chip tarot-no-glow" onClick={() => onOpenLore(card)}>
              Лор
            </button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

const DailyCardPanel: React.FC = () => {
  const daily = useMemo(getDailyCard, []);
  const interpretation = buildInterpretation(daily.card, daily.orientation, 'Карта дня');

  return (
    <aside className={`daily-card-panel ${daily.orientation === 'reversed' ? 'is-reversed' : ''}`} style={{ '--card-accent': daily.card.color } as React.CSSProperties}>
      <div className="daily-card-kicker"><CalendarDays size={15} /> Карта дня</div>
      <div className="daily-card-frame">
        <img src={daily.card.tarot} alt={daily.card.name} loading="lazy" decoding="async" draggable={false} />
      </div>
      <h3>{daily.card.name}</h3>
      <p className="daily-card-date">{daily.dateKey} · {orientationLabel[daily.orientation]}</p>
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
        <p>{buildQuestionInterpretation(result)}</p>
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
            <h3>Мини-игра: самостоятельный расклад</h3>
            <p>Прошлое · Настоящее · Будущее · 50% перевёрнутых карт</p>
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
            <p>Один вопрос · одна карта · нарративное толкование в стиле НРИ</p>
          </div>
        </div>
        <textarea
          value={question}
          onChange={(event) => { setQuestion(event.target.value); if (questionError) setQuestionError(''); }}
          placeholder="Введите вопрос для мастера судьбы..."
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
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [loreMode, setLoreMode] = useState(false);
  const [selectedLore, setSelectedLore] = useState<TarotCard | null>(null);
  const [selectedInspect, setSelectedInspect] = useState<TarotCard | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    onExpandedChange?.(selectedInspect ?? selectedLore);
  }, [selectedInspect, selectedLore, onExpandedChange]);

  const updateMobileIndex = () => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const cards = Array.from(gallery.querySelectorAll<HTMLElement>('.tarot-gallery-card'));
    if (cards.length === 0) return;
    const center = gallery.scrollLeft + gallery.clientWidth / 2;
    let nextIndex = 0;
    let nextDistance = Number.POSITIVE_INFINITY;
    cards.forEach((node, index) => {
      const nodeCenter = node.offsetLeft + node.offsetWidth / 2;
      const distance = Math.abs(center - nodeCenter);
      if (distance < nextDistance) {
        nextDistance = distance;
        nextIndex = index;
      }
    });
    setMobileIndex(nextIndex);
  };

  useEffect(() => {
    updateMobileIndex();
    window.addEventListener('resize', updateMobileIndex);
    return () => window.removeEventListener('resize', updateMobileIndex);
  }, []);

  const toggleCard = (card: TarotCard) => {
    setRevealed((previous) => ({ ...previous, [card.id]: !previous[card.id] }));
  };

  const scrollToMobileCard = (index: number) => {
    const gallery = galleryRef.current;
    const card = gallery?.querySelectorAll<HTMLElement>('.tarot-gallery-card')[index];
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div className="tarot-oracle-layout">
      <div className="tarot-oracle-main">
        <div className="tarot-gallery-toolbar">
          <div>
            <span className="tarot-toolbar-kicker">Вики мира + Таро для НРИ</span>
            <p>Пять карт лежат рубашкой в веере. Клик переворачивает карту; режим лора открывает текст рубашки без переворота.</p>
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

        <div ref={galleryRef} className="tarot-gallery" onScroll={updateMobileIndex} aria-label="Галерея карт Таро">
          {tarotCards.map((card, index) => (
            <GalleryCard
              key={card.id}
              card={card}
              index={index}
              revealed={!!revealed[card.id]}
              loreMode={loreMode}
              onFlip={toggleCard}
              onLore={setSelectedLore}
              onInspect={setSelectedInspect}
            />
          ))}
        </div>

        <div className="tarot-mobile-indicators" aria-label="Индикатор мобильной галереи">
          {tarotCards.map((card, index) => (
            <button
              type="button"
              key={card.id}
              className={`tarot-mobile-dot tarot-no-glow ${mobileIndex === index ? 'is-active' : ''}`}
              onClick={() => scrollToMobileCard(index)}
              aria-label={`Показать карту ${card.name}`}
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
        {selectedInspect && (
          <InspectModal
            card={selectedInspect}
            onClose={() => setSelectedInspect(null)}
            onOpenLore={(card) => {
              setSelectedInspect(null);
              setSelectedLore(card);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedLore && <LoreModal card={selectedLore} onClose={() => setSelectedLore(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default CharacterCardDeck;
