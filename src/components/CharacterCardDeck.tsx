import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { characters, type CharacterConfig } from '@/data/characters';
import { useIsMobile } from '@/hooks/use-mobile';
import { homeTheme } from '@/types/theme';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const cardBios: Record<string, string[]> = {
  valery: [
    'Род Даркбейнов отмечен проклятием ещё со времён Падения Асов.',
    'Валерий превращает боль, смерть и последние мгновения врагов в оружие.',
    '«Нет добра или зла. Есть только жизнь и смерть.»',
  ],
  brin: [
    'Единственный сын герцога Астарии и наследник крови первых людей.',
    'В нём пробудилась сила Чёрного льда, веками спавшая в доме Хессен.',
    '«Лёд учит терпению. Терпение учит власти.»',
  ],
  sakris: [
    'Рождённый в Бергхейме, Сакрис перерос дом, стены и ожидания рода.',
    'В нём говорит древний дух-следопыт, знающий тропы между мирами.',
    '«Лес говорит со мной. Я лишь пересказываю его слова.»',
  ],
  talis: [
    'Последний носитель песен клана Драконоборцев и памяти старого ордена.',
    'С лютней на плече и мечом за спиной он собирает истории мира.',
    '«Пока я дышу — я пою.»',
  ],
  stive: [
    'Ученик травника и послушник круга, покинувший тихую жизнь ради пути.',
    'Он ищет лекарство для учителя и собственное место среди живых легенд.',
    '«Деревья говорят тише людей, но говорят правду.»',
  ],
};

/* Desktop fan layout (UNCHANGED per req #4.6) */
const desktopFan = [
  { x: -340 * 1.4, y: 48, rotate: -22 },
  { x: -170 * 1.4, y: 14, rotate: -10 },
  { x: 0, y: 0, rotate: 0 },
  { x: 170 * 1.4, y: 14, rotate: 10 },
  { x: 340 * 1.4, y: 48, rotate: 22 },
];

const BASE_URL = import.meta.env.BASE_URL;

/* Front face — fully opaque (req #4.2) */
const CardFront: React.FC<{ char: CharacterConfig; isMobile?: boolean }> = ({ char, isMobile }) => {
  const imgSrc = isMobile ? char.tarot.replace('/optimized/', '/optimized/mobile/') : char.tarot;
  return (
    <div className="tarot-card-front">
      <img
        src={imgSrc}
        alt={char.name}
        draggable={false}
        loading="lazy"
        decoding="async"
      />
      <div className="tarot-card-front-glare" aria-hidden="true" />
    </div>
  );
};

/* Back face — shirt.png background + blurred lore overlay (req #4.5) */
const CardBack: React.FC<{ char: CharacterConfig; compact?: boolean }> = ({ char }) => (
  <div
    className="tarot-card-back"
    style={{
      backgroundImage: `url(${BASE_URL}shirt.png)`,
    }}
  >
    <div className="tarot-card-back-lore">
      <h4 className="tarot-card-back-name">{char.name}</h4>
      {(cardBios[char.id] || []).map((line, idx) => (
        <p key={idx} className="tarot-card-back-line">{line}</p>
      ))}
    </div>
  </div>
);

interface FanCardProps {
  char: CharacterConfig;
  index: number;
  onOpen: (char: CharacterConfig) => void;
}

/* Desktop fan card — NO hover flip (req #4.1) */
const FanCard: React.FC<FanCardProps> = ({ char, index, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const fan = desktopFan[index];
  const cardWidth = 212;
  const cardHeight = Math.round(cardWidth * 1.79);
  const tooltipShownRef = useRef(false);

  /* Show "Click me" tooltip occasionally & elegantly (req #5.1) */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    const show = () => {
      if (tooltipShownRef.current) return;
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 2200);
    };
    timer = setTimeout(show, 1400 + index * 350);
    interval = setInterval(() => {
      if (Math.random() > 0.55) {
        setTooltipVisible(false);
        setTimeout(show, 600);
      }
    }, 9000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [index]);

  return (
    <motion.div
      onMouseEnter={() => {
        setIsHovered(true);
        tooltipShownRef.current = true;
      }}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 70, scale: 0.9 }}
      animate={{
        opacity: 1,
        x: fan.x,
        y: 30 - fan.y,
        rotateZ: fan.rotate,
        scale: isHovered ? 1.045 : 0.99,
      }}
      transition={{ type: 'spring', stiffness: 110, damping: 20, mass: 0.85 }}
      style={{
        width: cardWidth,
        height: cardHeight,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -cardWidth / 2,
        marginTop: -cardHeight / 2,
        transformOrigin: 'center',
      }}
    >
      <button
        onClick={() => onOpen(char)}
        className="tarot-card-btn tarot-no-glow"
        aria-label={`Открыть карту ${char.name}`}
      >
        <CardFront char={char} />
      </button>

      <div className="tarot-card-label">{char.name}</div>

      <AnimatePresence>
        {tooltipVisible && (
          <motion.span
            key="clickme"
            className="tarot-card-tooltip"
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Click me
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* Mobile carousel card — NO hover flip */
const MobileCarouselCard: React.FC<{
  char: CharacterConfig;
  isActive: boolean;
  onOpen: (char: CharacterConfig) => void;
}> = ({ char, isActive, onOpen }) => {
  const startPos = useRef<{ x: number; y: number; t: number } | null>(null);
  const [pressed, setPressed] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipShownRef = useRef(false);

  /* Occasional "Click me" tooltip with extra-smooth transition on mobile (req #5.4) */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    const show = () => {
      if (tooltipShownRef.current) return;
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 2400);
    };
    timer = setTimeout(show, 1100);
    interval = setInterval(() => {
      if (Math.random() > 0.5) {
        setTooltipVisible(false);
        setTimeout(show, 700);
      }
    }, 8500);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    startPos.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    setPressed(true);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    setPressed(false);
    if (!startPos.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    const dt = Date.now() - startPos.current.t;
    const dist = Math.hypot(dx, dy);
    startPos.current = null;
    if (dist < 10 && dt < 350) {
      e.stopPropagation();
      tooltipShownRef.current = true;
      setTooltipVisible(false);
      onOpen(char);
    }
  };
  const handlePointerCancel = () => { setPressed(false); startPos.current = null; };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.18s ease',
      }}
      className="tarot-mobile-card-wrap"
    >
      <CarouselItem>
        <div className="tarot-mobile-card tarot-no-glow">
          <img
            src={char.tarot.replace('/optimized/', '/optimized/mobile/')}
            alt={char.name}
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="tarot-mobile-name">{char.name}</div>
        <div className="tarot-mobile-hint">коснитесь, чтобы открыть</div>

        <AnimatePresence>
          {tooltipVisible && isActive && (
            <motion.span
              key="clickme-mobile"
              className="tarot-card-tooltip"
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.92 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            >
              Click me
            </motion.span>
          )}
        </AnimatePresence>
      </CarouselItem>
    </div>
  );
};

const MobileDeck: React.FC<{ onOpen: (char: CharacterConfig) => void }> = ({ onOpen }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    return () => { api.off('select', onSelect); };
  }, [api]);

  return (
    <div className="tarot-mobile-deck">
      <Carousel setApi={setApi} opts={{ align: 'center', loop: true }}>
        <CarouselContent>
          {characters.map((char) => (
            <MobileCarouselCard
              key={char.id}
              char={char}
              isActive={current === characters.findIndex(c => c.id === char.id)}
              onOpen={onOpen}
            />
          ))}
        </CarouselContent>
      </Carousel>
      <div className="tarot-mobile-dots">
        {characters.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Слайд ${i + 1}`}
            className="tarot-mobile-dot"
            style={{
              width: current === i ? 22 : 8,
              background: current === i ? homeTheme.primaryGlow : 'rgba(255,255,255,0.22)',
            }}
          />
        ))}
      </div>
      <div className="tarot-mobile-foot">свайп — листать · тап — открыть</div>
    </div>
  );
};

/* Expanded card overlay (req #4.2 → #4.5) */
interface ExpandedCardOverlayProps {
  char: CharacterConfig | null;
  onClose: () => void;
}

const ExpandedCardOverlay: React.FC<ExpandedCardOverlayProps> = ({ char, onClose }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [rotZ, setRotZ] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const scrollAccum = useRef(0);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const justDragged = useRef(false);

  useEffect(() => {
    if (char) {
      setRotX(0);
      setRotY(0);
      setRotZ(0);
      scrollAccum.current = 0;
    }
  }, [char?.id, showBack]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    justDragged.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY, rotX, rotY };
    e.preventDefault();
    e.stopPropagation();
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    setIsDragging(true);
    justDragged.current = false;
    dragStart.current = { x: t.clientX, y: t.clientY, rotX, rotY };
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (clientX: number, clientY: number) => {
      const dx = clientX - dragStart.current.x;
      const dy = clientY - dragStart.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) justDragged.current = true;
      /* Orbit-style rotation only — no flipping on drag (req #4.3) */
      setRotY(dragStart.current.rotY + dx * 0.5);
      setRotX(dragStart.current.rotX - dy * 0.5);
    };
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const end = () => {
      setIsDragging(false);
      if (justDragged.current) {
        justDragged.current = true;
        setTimeout(() => { justDragged.current = false; }, 120);
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', end);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', end);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', end);
    };
  }, [isDragging]);

  /* Capture wheel events on the card area so the page never scrolls (req #2) */
  useEffect(() => {
    const el = cardWrapperRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      scrollAccum.current += e.deltaY * 0.22;
      setRotZ(scrollAccum.current);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  if (!char) return null;

  const goTo = (path: string) => {
    onClose();
    navigate(path);
  };
  const handleChildLinkClick = (e: React.MouseEvent, path: string) => {
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      goTo(path);
    }
  };
  const toggleFlip = () => setShowBack(prev => !prev);

  const tryClose = () => {
    if (justDragged.current) return;
    onClose();
  };

  return (
    <div
      className="tarot-overlay-backdrop"
      onClick={e => {
        if (e.target === e.currentTarget) tryClose();
      }}
    >
      <div
        ref={cardWrapperRef}
        className="tarot-overlay-inner"
        onClick={e => e.stopPropagation()}
        style={{ perspective: 1500 }}
      >
        <button
          onClick={onClose}
          className="tarot-overlay-close tarot-no-glow"
          aria-label="Закрыть"
        >
          Закрыть
        </button>

        {/* Rotatable card. Drag rotation applies to FRONT.
            Back is a button-triggered flip (req #4.3, #4.4). */}
        <div
          className="tarot-overlay-stage"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            transform: showBack
              ? `rotateY(180deg) rotateX(${rotX * 0.35}deg) rotateZ(${rotZ * 0.5}deg)`
              : `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
            transition: isDragging ? 'none' : 'transform 480ms cubic-bezier(.2,.8,.2,1)',
          }}
        >
          <div className="tarot-overlay-face tarot-overlay-front">
            <CardFront char={char} />
          </div>
          <div className="tarot-overlay-face tarot-overlay-back">
            <CardBack char={char} />
          </div>
        </div>

        <div className="tarot-overlay-controls" onClick={e => e.stopPropagation()}>
          {/* Short-lore flip button (req #4.4) */}
          <button
            onClick={toggleFlip}
            className="tarot-flip-btn tarot-no-glow"
            style={{
              border: `1.5px solid ${char.color}`,
              color: '#fff',
              boxShadow: `0 0 16px ${char.color}38`,
            }}
          >
            {showBack ? 'Лицевая сторона' : 'Краткий лор'}
          </button>

          <a
            href={char.lorePath}
            onClick={e => handleChildLinkClick(e, char.lorePath)}
            className="tarot-read-lore tarot-no-glow"
            style={{
              border: `1.5px solid ${char.color}`,
              color: '#fff',
              boxShadow: `0 0 16px ${char.color}38`,
            }}
          >
            Читать лор
          </a>

          {char.pages.map((page) => (
            <a
              key={page.path}
              href={page.path}
              onClick={e => handleChildLinkClick(e, page.path)}
              className="tarot-subpage tarot-no-glow"
            >
              {page.label}
            </a>
          ))}
        </div>

        <div className="tarot-overlay-hint">
          {isMobile
            ? 'Тяните для вращения · нажмите «Краткий лор» для обратной стороны'
            : 'ЛКМ + движение — 3D осмотр · Колёсико — поворот'}
        </div>
      </div>
    </div>
  );
};

interface CharacterCardDeckProps {
  onExpandedChange?: (char: CharacterConfig | null) => void;
}

const CharacterCardDeck: React.FC<CharacterCardDeckProps> = ({ onExpandedChange }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState<CharacterConfig | null>(null);

  useEffect(() => { onExpandedChange?.(expanded); }, [expanded, onExpandedChange]);

  const openCard = (char: CharacterConfig) => {
    setExpanded(char); // always front-first (req #4.2)
  };

  return (
    <div className="character-card-deck">
      {isMobile ? (
        <MobileDeck onOpen={openCard} />
      ) : (
        <div className="tarot-fan-stage">
          {characters.map((char, index) => (
            <FanCard key={char.id} char={char} index={index} onOpen={openCard} />
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/letopis')}
        className="tarot-open-letopis tarot-no-glow"
        style={{
          border: `1px solid ${homeTheme.primaryGlow}66`,
          color: homeTheme.parchment,
          boxShadow: `0 0 18px ${homeTheme.primaryGlow}18`,
        }}
      >
        Открыть летопись мира
      </button>

      <AnimatePresence>
        {expanded && (
          <ExpandedCardOverlay
            char={expanded}
            onClose={() => setExpanded(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CharacterCardDeck;
