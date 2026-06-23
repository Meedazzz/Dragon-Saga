<<<<<<< HEAD
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CalendarDays, Dices, Eye, RotateCcw, ScrollText, Shuffle, Sparkles } from 'lucide-react';
import { tarotBackImage, tarotCards, type TarotCard, type TarotPosition } from '@/data/tarot';
=======
import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CalendarDays, Eye, RotateCcw, Shuffle, Sparkles } from 'lucide-react';
import { tarotBackImage, tarotCards, type TarotCard } from '@/data/tarot';
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
import type { CharacterConfig } from '@/data/characters';
import { homeTheme } from '@/types/theme';

type Orientation = 'upright' | 'reversed';
<<<<<<< HEAD

interface SpreadResult {
  id: string;
  position: TarotPosition;
=======
type SpreadPosition = 'Прошлое' | 'Настоящее' | 'Будущее';

interface SpreadResult {
  id: string;
  position: SpreadPosition;
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
  card: TarotCard;
  orientation: Orientation;
}

interface VisitorResult {
  card: TarotCard;
  orientation: Orientation;
  question: string;
<<<<<<< HEAD
  focus: string;
}

interface SceneResult {
  id: string;
  card: TarotCard;
  orientation: Orientation;
  die: number;
  outcome: 'Дар' | 'Цена' | 'Осложнение';
}

const spreadPositions: TarotPosition[] = ['Прошлое', 'Настоящее', 'Будущее'];

=======
}

const spreadPositions: SpreadPosition[] = ['Прошлое', 'Настоящее', 'Будущее'];

>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
const orientationLabel: Record<Orientation, string> = {
  upright: 'Прямое положение',
  reversed: 'Перевёрнутое положение',
};

const safeQuestion = (value: string) => value.trim().replace(/\s+/g, ' ').slice(0, 220);
<<<<<<< HEAD
=======

>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
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

<<<<<<< HEAD
const getQuestionFocus = (question: string) => {
  const prepared = question.toLowerCase();
  if (/(бой|битв|враг|уби|сраж|дуэл|опасн|угроз)/i.test(prepared)) return 'конфликт';
  if (/(люб|отнош|довер|друг|семь|союз|преда)/i.test(prepared)) return 'связь';
  if (/(путь|куда|дорог|иск|найт|выбор|решит)/i.test(prepared)) return 'путь';
  if (/(тайн|знан|маг|лед|исслед|правд|лож)/i.test(prepared)) return 'тайна';
  if (/(леч|бол|спас|жив|смерт|исцел)/i.test(prepared)) return 'рана';
  return 'знак';
};

const focusAdvice: Record<string, string> = {
  конфликт: 'Сцена просит назвать ставку конфликта: кого защищают герои и что случится, если они победят слишком дорогой ценой.',
  связь: 'Сцена строится вокруг доверия: кто говорит правду, кто молчит и чьё имя нельзя произносить без последствий.',
  путь: 'Сцена требует выбора маршрута: короткая дорога ведёт через цену, длинная — через откровение.',
  тайна: 'Сцена открывает скрытый слой мира: ответ есть, но его хранит тот, кому выгодна метель.',
  рана: 'Сцена начинается с раны — телесной, родовой или духовной. Лечение потребует равноценного обмена.',
  знак: 'Сцена отвечает символом, а не инструкцией: ведущий показывает знак, игрок решает, как его прочитать.',
};

const buildSpreadInterpretation = (card: TarotCard, orientation: Orientation, position: TarotPosition) => {
  const base = card.narrative.positions[position];
  const current = orientation === 'upright'
    ? `Дар карты: ${card.narrative.boon}.`
    : `Тень карты: ${card.narrative.reversed}.`;

  return `${base}. ${current} Крючок для сцены: ${card.narrative.questHook}.`;
};

const buildQuestionInterpretation = (result: VisitorResult) => {
  const { card, orientation, question, focus } = result;
  const omen = orientation === 'upright' ? card.narrative.omen : card.narrative.reversed;
  const action = orientation === 'upright' ? card.narrative.boon : card.narrative.challenge;

  return `На вопрос «${question}» отвечает ${card.narrative.archetype}: ${omen}. ${card.narrative.questionLens}. ${focusAdvice[focus]} Практический ход: ${action}.`;
};

const buildDailyInterpretation = (card: TarotCard) => `Карта дня — ${card.narrative.archetype}: ${card.narrative.daily}. Если день станет сценой НРИ, используй крючок: ${card.narrative.questHook}.`;

const getSceneOutcome = (die: number): SceneResult['outcome'] => {
  if (die >= 15) return 'Дар';
  if (die >= 8) return 'Цена';
  return 'Осложнение';
};

const buildSceneText = (scene: SceneResult) => {
  const { card, orientation, die, outcome } = scene;
  const tone = orientation === 'upright' ? card.narrative.boon : card.narrative.reversed;
  const resultLine = outcome === 'Дар'
    ? 'герои получают преимущество, но должны описать, почему судьба на миг признала их достойными'
    : outcome === 'Цена'
      ? 'успех возможен только через жертву: ресурс, обещание, тайну или репутацию'
      : 'ведущий вводит осложнение: появляется свидетель, враг, дурной знак или долг из прошлого';

  return `d20 = ${die}. ${card.narrative.archetype} задаёт сцену: ${card.narrative.questHook}. Тон сцены: ${tone}. Итог «${outcome}»: ${resultLine}. Игрок отвечает одним действием персонажа, ведущий завершает сцену последствием.`;
=======
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
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
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
<<<<<<< HEAD
    {card && !compact && <span className="tarot-card-back-name">{card.name}</span>}
=======
    {card && !compact && (
      <span className="tarot-card-back-name">{card.name}</span>
    )}
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
  </div>
);

const GalleryCard: React.FC<{
  card: TarotCard;
<<<<<<< HEAD
  index: number;
=======
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
  revealed: boolean;
  loreMode: boolean;
  onFlip: (card: TarotCard) => void;
  onLore: (card: TarotCard) => void;
<<<<<<< HEAD
}> = ({ card, index, revealed, loreMode, onFlip, onLore }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const swipedRef = useRef(false);
  const wheelLockRef = useRef(0);

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: Number((-py * 13).toFixed(2)), y: Number((px * 16).toFixed(2)) });
  };

  const handlePointerLeave = () => setTilt({ x: 0, y: 0 });

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'touch') {
      touchStartRef.current = { x: event.clientX, y: event.clientY };
      swipedRef.current = false;
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    const start = touchStartRef.current;
    if (!start || event.pointerType !== 'touch') return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      swipedRef.current = true;
      if (loreMode) onLore(card);
      else onFlip(card);
    }
    touchStartRef.current = null;
  };

  const handleWheel = (event: React.WheelEvent<HTMLButtonElement>) => {
    if (Math.abs(event.deltaY) < 4) return;
    event.preventDefault();
    const now = window.performance.now();
    if (now - wheelLockRef.current < 280) return;
    wheelLockRef.current = now;
    if (loreMode) onLore(card);
    else onFlip(card);
  };

  const handleClick = () => {
    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }
    if (loreMode) onLore(card);
    else onFlip(card);
  };

  const fanAngle = (index - 2) * 7;
  const fanY = Math.abs(index - 2) * 14;
=======
}> = ({ card, revealed, loreMode, onFlip, onLore }) => {
  const handleClick = () => {
    if (loreMode) onLore(card);
    else onFlip(card);
  };
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da

  return (
    <motion.button
      type="button"
      className={`tarot-gallery-card tarot-no-glow ${revealed ? 'is-revealed' : ''} ${loreMode ? 'is-lore-mode' : ''}`}
      onClick={handleClick}
<<<<<<< HEAD
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.05 * index }}
      aria-label={loreMode ? `Открыть лор карты ${card.name}` : revealed ? `Перевернуть карту ${card.name} рубашкой` : `Перевернуть карту ${card.name}`}
      style={{
        '--card-accent': card.color,
        '--tilt-x': `${tilt.x}deg`,
        '--tilt-y': `${tilt.y}deg`,
        '--fan-angle': `${fanAngle}deg`,
        '--fan-y': `${fanY}px`,
      } as React.CSSProperties}
=======
      initial={{ opacity: 0, y: 22, rotateZ: -2 }}
      animate={{ opacity: 1, y: 0, rotateZ: 0 }}
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.985 }}
      aria-label={loreMode ? `Открыть лор карты ${card.name}` : revealed ? `Перевернуть карту ${card.name} рубашкой` : `Перевернуть карту ${card.name}`}
      style={{ '--card-accent': card.color } as React.CSSProperties}
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
    >
      <span className="tarot-card-rotator">
        <CardBackVisual card={card} />
        <CardFace card={card} />
      </span>
      <span className="tarot-card-caption">
        <span>{revealed ? card.name : 'Рубашка'}</span>
<<<<<<< HEAD
        <small>{loreMode ? 'клик — лор' : 'мышь/колесо/свайп'}</small>
=======
        <small>{loreMode ? 'лор' : revealed ? 'клик — скрыть' : 'клик — открыть'}</small>
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
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
<<<<<<< HEAD
          {card.backLore.map((line) => <p key={line}>{line}</p>)}
        </div>
        <div className="tarot-modal-oracle-note">
          <strong>{card.narrative.archetype}</strong> — {card.narrative.omen}.<br />
          Крючок НРИ: {card.narrative.questHook}.
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
=======
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
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
      </motion.article>
    </motion.div>
  );
};

const DailyCardPanel: React.FC = () => {
<<<<<<< HEAD
  const daily = useMemo(() => getDailyCard(), []);
=======
  const daily = useMemo(getDailyCard, []);
  const interpretation = buildInterpretation(daily.card, 'upright', 'Карта дня');
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da

  return (
    <aside className="daily-card-panel" style={{ '--card-accent': daily.card.color } as React.CSSProperties}>
      <div className="daily-card-kicker"><CalendarDays size={15} /> Карта дня</div>
      <div className="daily-card-frame">
        <img src={daily.card.tarot} alt={daily.card.name} loading="lazy" decoding="async" draggable={false} />
      </div>
      <h3>{daily.card.name}</h3>
      <p className="daily-card-date">{daily.dateKey}</p>
<<<<<<< HEAD
      <p>{buildDailyInterpretation(daily.card)}</p>
=======
      <p>{interpretation}</p>
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
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
<<<<<<< HEAD
      <p>{buildSpreadInterpretation(result.card, result.orientation, result.position)}</p>
=======
      <p>{buildInterpretation(result.card, result.orientation, `Позиция «${result.position}»`)}</p>
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
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
<<<<<<< HEAD
        <span className="spread-position">Вопрос · {result.focus}</span>
        <h4>{result.card.name}</h4>
        <span className="spread-orientation">{orientationLabel[result.orientation]}</span>
        <p>{buildQuestionInterpretation(result)}</p>
      </div>
    </motion.article>
  );
};

const SceneReading: React.FC<{ result: SceneResult | null }> = ({ result }) => {
  if (!result) return null;
  return (
    <motion.article
      className={`visitor-result oracle-scene-result ${result.orientation === 'reversed' ? 'is-reversed' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ '--card-accent': result.card.color } as React.CSSProperties}
    >
      <div className="visitor-result-image">
        <img src={result.card.tarot} alt={result.card.name} loading="lazy" decoding="async" draggable={false} />
      </div>
      <div>
        <span className="spread-position">Мини-игра · {result.outcome}</span>
        <h4>{result.card.name}</h4>
        <span className="spread-orientation">{orientationLabel[result.orientation]}</span>
        <p>{buildSceneText(result)}</p>
=======
        <span className="spread-position">Вопрос посетителя</span>
        <h4>{result.card.name}</h4>
        <span className="spread-orientation">{orientationLabel[result.orientation]}</span>
        <p>{buildInterpretation(result.card, result.orientation, `На вопрос «${result.question}»`)}</p>
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
      </div>
    </motion.article>
  );
};

const TarotRituals: React.FC = () => {
  const [spread, setSpread] = useState<SpreadResult[]>([]);
  const [question, setQuestion] = useState('');
  const [visitorResult, setVisitorResult] = useState<VisitorResult | null>(null);
<<<<<<< HEAD
  const [sceneResult, setSceneResult] = useState<SceneResult | null>(null);
=======
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
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
<<<<<<< HEAD
    setVisitorResult({ card, orientation: randomOrientation(), question: preparedQuestion, focus: getQuestionFocus(preparedQuestion) });
  };

  const drawScene = () => {
    const [card] = drawUniqueCards(1);
    const die = Math.floor(Math.random() * 20) + 1;
    setSceneResult({
      id: `${card.id}-${Date.now()}-${die}`,
      card,
      orientation: randomOrientation(),
      die,
      outcome: getSceneOutcome(die),
    });
=======
    setVisitorResult({ card, orientation: randomOrientation(), question: preparedQuestion });
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
  };

  return (
    <section className="tarot-rituals" aria-label="Расклады Таро">
      <div className="tarot-ritual-card three-spread-card">
        <div className="tarot-ritual-heading">
          <Sparkles size={18} />
          <div>
            <h3>Самостоятельный расклад</h3>
<<<<<<< HEAD
            <p>Прошлое · Настоящее · Будущее · 50% перевёрнутых</p>
=======
            <p>Прошлое · Настоящее · Будущее</p>
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
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
<<<<<<< HEAD
            <h3>Расклад по вопросу</h3>
            <p>Один вопрос · одна персональная карта</p>
=======
            <h3>Расклад для посетителей</h3>
            <p>Один вопрос · одна карта</p>
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
          </div>
        </div>
        <textarea
          value={question}
          onChange={(event) => { setQuestion(event.target.value); if (questionError) setQuestionError(''); }}
<<<<<<< HEAD
          placeholder="Введите вопрос: о пути, союзе, враге, тайне или цене..."
=======
          placeholder="Введите вопрос..."
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
          className="tarot-question-input"
          rows={3}
        />
        {questionError && <div className="tarot-question-error">{questionError}</div>}
        <button type="button" className="tarot-ritual-button tarot-no-glow" onClick={drawVisitor}>
          <Eye size={15} /> Вытянуть карту
        </button>
        <VisitorReading result={visitorResult} />
      </div>
<<<<<<< HEAD

      <div className="tarot-ritual-card narrative-game-card">
        <div className="tarot-ritual-heading">
          <Dices size={18} />
          <div>
            <h3>Мини-игра: сцена оракула</h3>
            <p>Карта + d20 дают завязку для НРИ-сцены</p>
          </div>
        </div>
        <p className="tarot-mini-rules">Вытяни карту, брось d20 и сыграй короткую сцену: игрок описывает действие, ведущий отвечает последствием.</p>
        <button type="button" className="tarot-ritual-button tarot-no-glow" onClick={drawScene}>
          <ScrollText size={15} /> Сыграть сцену
        </button>
        <SceneReading result={sceneResult} />
      </div>
=======
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
    </section>
  );
};

interface CharacterCardDeckProps {
  onExpandedChange?: (char: CharacterConfig | null) => void;
}

const CharacterCardDeck: React.FC<CharacterCardDeckProps> = ({ onExpandedChange }) => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const galleryRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [loreMode, setLoreMode] = useState(false);
  const [selectedLore, setSelectedLore] = useState<TarotCard | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
=======
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [loreMode, setLoreMode] = useState(false);
  const [selectedLore, setSelectedLore] = useState<TarotCard | null>(null);
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da

  useEffect(() => {
    onExpandedChange?.(selectedLore);
  }, [selectedLore, onExpandedChange]);

  const toggleCard = (card: TarotCard) => {
    setRevealed((previous) => ({ ...previous, [card.id]: !previous[card.id] }));
<<<<<<< HEAD
  };

  const updateActiveIndex = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const cards = Array.from(gallery.querySelectorAll<HTMLElement>('.tarot-gallery-card'));
    const center = gallery.scrollLeft + gallery.clientWidth / 2;
    const closest = cards.reduce((best, node, index) => {
      const nodeCenter = node.offsetLeft + node.offsetWidth / 2;
      const distance = Math.abs(nodeCenter - center);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });
    setActiveCardIndex(closest.index);
  }, []);

  const scrollToCard = (index: number) => {
    const gallery = galleryRef.current;
    const card = gallery?.querySelectorAll<HTMLElement>('.tarot-gallery-card')[index];
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setActiveCardIndex(index);
=======
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
  };

  return (
    <div className="tarot-oracle-layout">
      <div className="tarot-oracle-main">
        <div className="tarot-gallery-toolbar">
          <div>
            <span className="tarot-toolbar-kicker">Галерея из пяти карт</span>
<<<<<<< HEAD
            <p>На десктопе карты раскрываются веером: ведите мышью по карте и крутите колесо. На телефоне листайте и свайпайте карту.</p>
=======
            <p>Карты лежат рубашкой. Переворачивайте их или включите режим лора.</p>
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
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

<<<<<<< HEAD
        <div ref={galleryRef} className="tarot-gallery" aria-label="Галерея карт Таро" onScroll={updateActiveIndex}>
          {tarotCards.map((card, index) => (
            <GalleryCard
              key={card.id}
              card={card}
              index={index}
=======
        <div className="tarot-gallery" aria-label="Галерея карт Таро">
          {tarotCards.map((card) => (
            <GalleryCard
              key={card.id}
              card={card}
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
              revealed={!!revealed[card.id]}
              loreMode={loreMode}
              onFlip={toggleCard}
              onLore={setSelectedLore}
            />
          ))}
        </div>

<<<<<<< HEAD
        <div className="tarot-mobile-indicator" aria-label="Индикатор карт">
          {tarotCards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={index === activeCardIndex ? 'is-active' : ''}
              aria-label={`Показать карту ${card.name}`}
              onClick={() => scrollToCard(index)}
            />
          ))}
        </div>

=======
>>>>>>> f82ae8320da56651977d80ab56a96a19099cd8da
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
