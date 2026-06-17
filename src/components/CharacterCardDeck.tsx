import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { characters, type CharacterConfig } from '@/data/characters';
import { useIsMobile } from '@/hooks/use-mobile';
import { homeTheme } from '@/types/theme';

type TiltState = {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  glareOpacity: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function useCardTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 35,
    glareOpacity: 0,
  });

  const scheduleTilt = (next: TiltState) => {
    if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    frame.current = window.requestAnimationFrame(() => {
      setTilt(next);
      frame.current = null;
    });
  };

  const resetTilt = () => {
    scheduleTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 35, glareOpacity: 0 });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current || event.pointerType === 'touch') return;
    const rect = ref.current.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    scheduleTilt({
      rotateX: (0.5 - y) * maxTilt * 2,
      rotateY: (x - 0.5) * maxTilt * 2,
      glareX: x * 100,
      glareY: y * 100,
      glareOpacity: 0.28,
    });
  };

  const enableGyro = async () => {
    if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) return;
    type DeviceOrientationWithPermission = typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<PermissionState>;
    };
    const orientationEvent = window.DeviceOrientationEvent as unknown as DeviceOrientationWithPermission;
    try {
      if (typeof orientationEvent.requestPermission === 'function') {
        const permission = await orientationEvent.requestPermission();
        if (permission !== 'granted') return;
      }
      setGyroEnabled(true);
    } catch {
      // ignore
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') void enableGyro();
  };

  useEffect(() => {
    if (!gyroEnabled) return undefined;
    const onOrientation = (event: DeviceOrientationEvent) => {
      const beta = event.beta ?? 0;
      const gamma = event.gamma ?? 0;
      const rotateX = clamp((beta - 45) / 45, -1, 1) * maxTilt;
      const rotateY = clamp(gamma / 35, -1, 1) * maxTilt;
      scheduleTilt({
        rotateX,
        rotateY,
        glareX: clamp(50 + rotateY * 2.2, 12, 88),
        glareY: clamp(42 - rotateX * 2.2, 12, 88),
        glareOpacity: 0.2,
      });
    };
    window.addEventListener('deviceorientation', onOrientation, true);
    return () => window.removeEventListener('deviceorientation', onOrientation, true);
  }, [gyroEnabled, maxTilt]);

  useEffect(() => {
    return () => {
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return {
    ref,
    tilt,
    gyroEnabled,
    enableGyro,
    tiltHandlers: {
      onPointerMove: handlePointerMove,
      onPointerLeave: resetTilt,
      onPointerDown: handlePointerDown,
    },
  };
}

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

// Увеличенный размах веера (коэффициент 1.4)
const desktopFan = [
  { x: -340 * 1.4, y: 48, rotate: -24 },
  { x: -170 * 1.4, y: 14, rotate: -12 },
  { x: 0, y: 0, rotate: 0 },
  { x: 170 * 1.4, y: 14, rotate: 12 },
  { x: 340 * 1.4, y: 48, rotate: 24 },
];

const mobileFan = [
  { x: -104 * 1.4, y: 46, rotate: -23 },
  { x: -52 * 1.4, y: 12, rotate: -12 },
  { x: 0, y: 0, rotate: 0 },
  { x: 52 * 1.4, y: 12, rotate: 12 },
  { x: 104 * 1.4, y: 46, rotate: 23 },
];

interface FanCardProps {
  char: CharacterConfig;
  index: number;
  isMobile: boolean;
  onOpen: (char: CharacterConfig, flipped: boolean) => void;
}

const FanCard: React.FC<FanCardProps> = ({ char, index, isMobile, onOpen }) => {
  const { ref, tilt, gyroEnabled, tiltHandlers } = useCardTilt(isMobile ? 6 : 9);
  const [isHovered, setIsHovered] = useState(false);
  const fan = isMobile ? mobileFan[index] : desktopFan[index];
  const cardWidth = isMobile ? 118 : 206;
  const cardHeight = Math.round(cardWidth * 1.79);
  const spread = 1; // всегда раскрыт
  const isFlipped = isHovered;
  const revealAmount = isHovered ? 1 : 0;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: cardWidth,
        height: cardHeight,
        marginLeft: -cardWidth / 2,
        marginTop: -cardHeight / 2,
        zIndex: isHovered ? 100 : 20 + index,
        perspective: 1200,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 80, scale: 0.88 }}
      animate={{
        opacity: 1,
        x: fan.x * spread,
        y: 34 - fan.y * spread,
        rotateZ: fan.rotate * spread,
        scale: isHovered ? 1.05 : (0.94 + spread * 0.06),
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 19, mass: 0.8 }}
    >
      <div
        ref={ref}
        {...tiltHandlers}
        onClick={() => onOpen(char, isFlipped)}
        className="group relative h-full w-full cursor-pointer select-none rounded-[14px]"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: tilt.glareOpacity === 0 ? 'transform 520ms cubic-bezier(.2,.8,.2,1)' : 'none',
          filter: `drop-shadow(0 24px 30px rgba(0,0,0,${0.34 + revealAmount * 0.18})) drop-shadow(0 0 22px ${char.color}20)`,
        }}
        aria-label={`Открыть карту ${char.name}`}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') onOpen(char, isFlipped);
        }}
      >
        <motion.div
          className="relative h-full w-full rounded-[14px]"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <CardFront char={char} />
          <CardBack char={char} compact />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
          style={{
            opacity: tilt.glareOpacity,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.58), rgba(255,255,255,0.14) 22%, transparent 55%)`,
            transform: 'translateZ(42px)',
          }}
        />

        {isMobile && !gyroEnabled && index === 2 && (
          <div
            className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] tracking-[1px] opacity-70"
            style={{ fontFamily: "'Cinzel', serif", color: homeTheme.parchmentDim }}
          >
            коснитесь карты — включится mobile tilt
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CardFront: React.FC<{ char: CharacterConfig }> = ({ char }) => (
  <div
    className="absolute inset-0 overflow-hidden rounded-[14px]"
    style={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      background: `linear-gradient(145deg, rgba(255,255,255,0.05), ${char.color}18 34%, rgba(8,6,5,0.96))`,
      border: `1px solid ${char.color}55`,
      boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 28px rgba(0,0,0,0.38), 0 0 36px ${char.color}18`,
    }}
  >
    <img
      src={char.tarot}
      alt={char.name}
      className="h-full w-full object-cover"
      loading="eager"
      decoding="async"
      draggable={false}
      onError={(event) => {
        (event.target as HTMLImageElement).style.display = 'none';
      }}
    />
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: 'linear-gradient(110deg, rgba(255,255,255,0.2), transparent 26%, transparent 70%, rgba(255,255,255,0.09))',
      }}
    />
  </div>
);

const CardBack: React.FC<{ char: CharacterConfig; compact?: boolean }> = ({ char, compact = false }) => (
  <div
    className={`absolute inset-0 flex flex-col items-center justify-center rounded-[14px] text-center ${compact ? 'p-4' : 'p-7'}`}
    style={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
      background: `radial-gradient(circle at 50% 0%, ${char.color}38, transparent 42%), linear-gradient(155deg, rgba(8,7,6,0.98), rgba(20,15,10,0.98) 52%, ${char.color}22)`,
      border: `1px solid ${char.color}70`,
      boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 42px rgba(0,0,0,0.58), 0 0 36px ${char.color}18`,
    }}
  >
    <div
      className={compact ? 'mb-3 text-[10px] uppercase tracking-[2px]' : 'mb-5 text-sm uppercase tracking-[3px]'}
      style={{ fontFamily: "'Cinzel Decorative', serif", color: char.color, textShadow: `0 0 18px ${char.color}45` }}
    >
      ✦ {char.name} ✦
    </div>

    {(cardBios[char.id] || []).map((line, idx) => (
      <p
        key={idx}
        className={compact ? 'mb-2 text-[10px] leading-[1.35] last:mb-0' : 'mb-3 text-[15px] leading-relaxed last:mb-0'}
        style={{ fontFamily: "'Cormorant Garamond', serif", color: homeTheme.parchment }}
      >
        {line}
      </p>
    ))}

    <div
      className={compact ? 'mt-3 text-[9px] italic tracking-[1px]' : 'mt-5 text-xs italic tracking-[1px]'}
      style={{ color: homeTheme.parchmentDim }}
    >
      {compact ? 'Клик — раскрыть карту' : 'Поверните или откройте летопись героя'}
    </div>
  </div>
);

interface ExpandedCardOverlayProps {
  char: CharacterConfig | null;
  initialFlipped: boolean;
  onClose: () => void;
}

const ExpandedCardOverlay: React.FC<ExpandedCardOverlayProps> = ({ char, initialFlipped, onClose }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isFlipped, setIsFlipped] = useState(initialFlipped);
  const { ref, tilt, gyroEnabled, enableGyro, tiltHandlers } = useCardTilt(isMobile ? 5 : 8);

  if (!char) return null;

  const goTo = (path: string) => {
    onClose();
    navigate(path);
  };

  const pageIcons: Record<string, string> = {
    'Летопись': '📜',
    'Биография': '👤',
    'Способности': '⚡',
    'История': '🏛️',
    'Оружие': '🗡️',
    'Магия': '🔮',
    'Путь': '🗺️',
  };

  return (
    <motion.div
      className="fixed inset-0 z-[450] flex items-center justify-center bg-black/78 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.72, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.72, y: 32 }}
        transition={{ type: 'spring', damping: 22, stiffness: 190 }}
        onClick={(event) => event.stopPropagation()}
        style={{ perspective: 1400 }}
      >
        <button
          onClick={onClose}
          className="absolute -right-2 -top-12 z-20 flex h-9 w-9 items-center justify-center rounded-full text-xl transition-transform hover:scale-110"
          style={{ background: 'rgba(10,8,6,0.92)', border: `1px solid ${char.color}70`, color: homeTheme.parchment }}
          aria-label="Закрыть карту"
        >
          ×
        </button>

        <div
          ref={ref}
          {...tiltHandlers}
          className="relative rounded-[18px]"
          style={{
            width: isMobile ? 'min(82vw, 330px)' : '360px',
            aspectRatio: '768 / 1376',
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transformStyle: 'preserve-3d',
            transition: tilt.glareOpacity === 0 ? 'transform 560ms cubic-bezier(.2,.8,.2,1)' : 'none',
            filter: `drop-shadow(0 34px 48px rgba(0,0,0,0.72)) drop-shadow(0 0 36px ${char.color}30)`,
          }}
        >
          <motion.div
            className="relative h-full w-full rounded-[18px]"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <CardFront char={char} />
            <CardBack char={char} />
          </motion.div>

          <div
            className="pointer-events-none absolute inset-0 rounded-[18px] mix-blend-screen"
            style={{
              opacity: tilt.glareOpacity,
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.62), rgba(255,255,255,0.13) 24%, transparent 58%)`,
              transform: 'translateZ(50px)',
            }}
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setIsFlipped((value) => !value)}
            className="rounded-full px-4 py-2 text-xs tracking-[1.5px] transition-transform hover:-translate-y-0.5"
            style={{ fontFamily: "'Cinzel', serif", background: 'rgba(20,15,10,0.92)', border: `1px solid ${char.color}55`, color: homeTheme.parchment }}
          >
            {isFlipped ? '↩ Лицевая сторона' : '↕ Краткий лор'}
          </button>

          {isMobile && !gyroEnabled && (
            <button
              onClick={() => void enableGyro()}
              className="rounded-full px-4 py-2 text-xs tracking-[1.5px] transition-transform hover:-translate-y-0.5"
              style={{ fontFamily: "'Cinzel', serif", background: `${char.color}18`, border: `1px solid ${char.color}55`, color: homeTheme.parchment }}
            >
              ◇ Mobile tilt
            </button>
          )}

          <button
            onClick={() => goTo(char.lorePath)}
            className="rounded-full px-4 py-2 text-xs tracking-[1.5px] transition-transform hover:-translate-y-0.5"
            style={{ fontFamily: "'Cinzel', serif", background: `${char.color}22`, border: `1px solid ${char.color}65`, color: homeTheme.parchment }}
          >
            📜 Читать лор →
          </button>
        </div>

        <div className="mt-3 flex max-w-[520px] flex-wrap items-center justify-center gap-2">
          {char.pages.map((page) => (
            <button
              key={page.path}
              onClick={() => goTo(page.path)}
              className="rounded px-3 py-1.5 text-[10px] tracking-[1px] transition-colors"
              style={{ fontFamily: "'Cinzel', serif", background: 'rgba(30,25,15,0.65)', border: '1px solid rgba(120,100,70,0.25)', color: homeTheme.parchmentDim }}
            >
              {pageIcons[page.label] || '📄'} {page.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const CharacterCardDeck: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const deckRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(1.0);
  const [expanded, setExpanded] = useState<CharacterConfig | null>(null);
  const [overlayStartsFlipped, setOverlayStartsFlipped] = useState(false);
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ['start 85%', 'end 20%'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(clamp(Math.max(latest, 0.32), 0, 1));
  });

  const openCard = (char: CharacterConfig, flipped: boolean) => {
    setOverlayStartsFlipped(flipped);
    setExpanded(char);
  };

  return (
    <div ref={deckRef} className="relative min-h-[440px] md:min-h-[620px]">
      <div className="flex min-h-[400px] flex-col items-center justify-center overflow-visible py-4 md:min-h-[560px] md:py-6">
        <div
          className="relative w-full max-w-[1040px]"
          style={{ height: isMobile ? 300 : 440, perspective: 1500 }}
        >
          {characters.map((char, index) => (
            <FanCard
              key={char.id}
              char={char}
              index={index}
              isMobile={isMobile}
              onOpen={openCard}
            />
          ))}
        </div>

        <div className="mt-2 flex w-full max-w-[520px] flex-col items-center gap-3 px-5">
          <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'rgba(80,70,50,0.18)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                background: `linear-gradient(90deg, ${homeTheme.primary}, ${homeTheme.primaryGlow}, ${homeTheme.silver})`,
                boxShadow: `0 0 18px ${homeTheme.primaryGlow}45`,
              }}
            />
          </div>
          <button
            onClick={() => navigate('/letopis')}
            className="rounded-full px-5 py-2 text-xs tracking-[2px] transition-transform hover:-translate-y-0.5"
            style={{ fontFamily: "'Cinzel', serif", background: 'rgba(20,15,10,0.72)', border: `1px solid ${homeTheme.primary}55`, color: homeTheme.parchment }}
          >
            📖 Открыть летопись мира
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <ExpandedCardOverlay
            char={expanded}
            initialFlipped={overlayStartsFlipped}
            onClose={() => setExpanded(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CharacterCardDeck;
