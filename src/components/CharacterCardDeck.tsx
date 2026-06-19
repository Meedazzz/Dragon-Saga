import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { characters, type CharacterConfig } from '@/data/characters';
import { useIsMobile } from '@/hooks/use-mobile';
import { homeTheme } from '@/types/theme';

const BASE = import.meta.env.BASE_URL;
const shirtUrl = `${BASE}shirt.png`;

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
    if (!ref.current || event.pointerType === 'touch' || maxTilt === 0) return;
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
    if (event.pointerType === 'touch' && maxTilt > 0) void enableGyro();
  };

  useEffect(() => {
    if (!gyroEnabled || maxTilt === 0) return undefined;
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

// Увеличенный размах веера (коэффициент 1.4) для десктопа
const desktopFan = [
  { x: -340 * 1.4, y: 48, rotate: -24 },
  { x: -170 * 1.4, y: 14, rotate: -12 },
  { x: 0, y: 0, rotate: 0 },
  { x: 170 * 1.4, y: 14, rotate: 12 },
  { x: 340 * 1.4, y: 48, rotate: 24 },
];

// Мобильный веер с меньшим размахом, чтобы влезало на экран
const mobileFan = [
  { x: -70, y: 24, rotate: -20 },
  { x: -35, y: 8, rotate: -10 },
  { x: 0, y: 0, rotate: 0 },
  { x: 35, y: 8, rotate: 10 },
  { x: 70, y: 24, rotate: 20 },
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
  // Для мобильных используем ширину 95, для десктопа 206
  const cardWidth = isMobile ? 95 : 206;
  const cardHeight = Math.round(cardWidth * 1.79);
  const spread = 1; // всегда раскрыт
  const isFlipped = false; // No rotation/flipping on hover on the main page!

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
        onClick={() => onOpen(char, false)}
        className={`group relative h-full w-full cursor-pointer select-none rounded-[14px] ${isHovered ? 'animate-[card-sway_3.5s_ease-in-out_infinite]' : ''}`}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: tilt.glareOpacity === 0 ? 'transform 520ms cubic-bezier(.2,.8,.2,1)' : 'none',
          filter: isHovered 
            ? `drop-shadow(0 24px 30px rgba(0,0,0,0.5)) drop-shadow(0 0 16px ${char.color}45)`
            : `drop-shadow(0 24px 30px rgba(0,0,0,0.34))`,
        }}
        aria-label={`Открыть карту ${char.name}`}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') onOpen(char, false);
        }}
      >
        <motion.div
          className="relative h-full w-full rounded-[14px]"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <CardFront char={char} isMobile={isMobile} />
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

const CardFront: React.FC<{ char: CharacterConfig; isMobile?: boolean }> = ({ char, isMobile }) => {
  // Для мобильных подгружаем оптимизированные изображения, если путь содержит '/optimized/'
  const imgSrc = isMobile ? char.tarot.replace('/optimized/', '/optimized/mobile/') : char.tarot;
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[14px]"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        background: '#0c0a08',
        border: `1.5px solid ${char.color}65`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
      }}
    >
      <img
        src={imgSrc}
        alt={char.name}
        className="h-full w-full object-cover opacity-100"
        loading={isMobile ? 'lazy' : 'eager'}
        decoding="async"
        draggable={false}
        onError={(event) => {
          (event.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  );
};

const CardBack: React.FC<{ char: CharacterConfig; compact?: boolean }> = ({ char, compact = false }) => (
  <div
    className="absolute inset-0 overflow-hidden rounded-[14px] flex items-center justify-center"
    style={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
      backgroundImage: `url(${shirtUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: `1.5px solid ${char.color}75`,
      boxShadow: `inset 0 0 40px rgba(0,0,0,0.85), 0 0 25px ${char.color}15`,
    }}
  >
    {/* Centered dark frosted glass overlay for readability */}
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${compact ? 'p-3' : 'p-6'}`}
      style={{
        background: 'rgba(8, 6, 5, 0.74)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
      }}
    >
      <div
        className={compact ? 'mb-2 text-[10px] uppercase tracking-[1.5px] font-bold' : 'mb-4 text-sm uppercase tracking-[2.5px] font-black'}
        style={{ 
          fontFamily: "'Cinzel Decorative', serif", 
          color: char.color, 
          textShadow: `0 0 12px ${char.color}70, 0 2px 4px rgba(0,0,0,0.9)` 
        }}
      >
        ✦ {char.name} ✦
      </div>

      {(cardBios[char.id] || []).map((line, idx) => (
        <p
          key={idx}
          className={compact ? 'mb-1 text-[9px] leading-[1.3] last:mb-0 text-center' : 'mb-3 text-[14px] leading-relaxed last:mb-0 text-center'}
          style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            color: '#f5edd7', 
            textShadow: '0 1px 3px rgba(0,0,0,0.95)',
            fontWeight: 500
          }}
        >
          {line}
        </p>
      ))}

      <div
        className={compact ? 'mt-2 text-[8px] italic tracking-[0.5px] opacity-80' : 'mt-4 text-[10px] italic tracking-[1px] opacity-80'}
        style={{ color: homeTheme.parchmentDim, fontFamily: "'Cinzel', serif" }}
      >
        {compact ? 'Клик — раскрыть карту' : 'Потяните ЛКМ — вращать 3D'}
      </div>
    </div>
  </div>
);

/* ── Мобильные карточки (Прокручиваемый Свайп-веер с защитой от случайного клика) ── */
interface MobileCardProps {
  char: CharacterConfig;
  index: number;
  onOpen: (char: CharacterConfig, flipped: boolean) => void;
}

const MobileCard: React.FC<MobileCardProps> = ({ char, index, onOpen }) => {
  const touchStartPos = useRef({ x: 0, y: 0, time: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = Math.abs(e.changedTouches[0].clientX - touchStartPos.current.x);
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartPos.current.y);
    const dt = Date.now() - touchStartPos.current.time;

    // If movement is very small and quick, it is a Tap instead of a Swipe!
    if (dx < 8 && dy < 8 && dt < 280) {
      onOpen(char, false);
    }
  };

  return (
    <motion.div
      className="relative cursor-pointer select-none overflow-hidden rounded-[12px] snap-center shrink-0 w-[190px]"
      style={{
        background: `linear-gradient(145deg, rgba(255,255,255,0.02), ${char.color}10 40%, rgba(8,6,5,0.98))`,
        border: `1.5px solid ${char.color}55`,
        boxShadow: `0 8px 24px rgba(0,0,0,0.65), 0 0 20px ${char.color}12`,
      }}
      whileTap={{ scale: 0.96 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => {
        // Fallback for click events on desktop emulation
        if (e.detail > 0) {
          onOpen(char, false);
        }
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="relative w-full" style={{ aspectRatio: '768 / 1376' }}>
        <img
          src={char.tarot.replace('/optimized/', '/optimized/mobile/')}
          alt={char.name}
          className="h-full w-full object-cover"
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(110deg, rgba(255,255,255,0.1), transparent 30%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 p-3 text-center"
          style={{
            background: 'linear-gradient(transparent, rgba(0,0,0,0.9) 70%)',
          }}
        >
          <div
            className="text-[10px] uppercase tracking-[2px] font-bold mb-0.5"
            style={{ fontFamily: "'Cinzel', serif", color: char.color, textShadow: `0 0 8px ${char.color}80` }}
          >
            {char.name}
          </div>
          <div className="text-[8px] opacity-75 font-serif" style={{ color: homeTheme.parchmentDim }}>
            {char.title}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface MobileDeckProps {
  onOpen: (char: CharacterConfig, flipped: boolean) => void;
}

const MobileDeck: React.FC<MobileDeckProps> = ({ onOpen }) => {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Scroll indicator banner */}
      <div className="text-[10px] uppercase tracking-[2px] opacity-60 font-semibold mb-1 flex items-center gap-1.5" style={{ color: homeTheme.parchmentDim }}>
        <span>👈</span> Листайте влево и вправо <span>👉</span>
      </div>

      {/* Swipeable Scroll Container with Touch Snap */}
      <div 
        className="w-full flex gap-5 overflow-x-auto snap-x snap-mandatory py-4 px-8 scrollbar-none"
        style={{
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Empty left spacer for snapping center */}
        <div className="shrink-0 w-[calc(50vw-115px)] pointer-events-none" />
        
        {characters.map((char, index) => (
          <MobileCard key={char.id} char={char} index={index} onOpen={onOpen} />
        ))}

        {/* Empty right spacer for snapping center */}
        <div className="shrink-0 w-[calc(50vw-115px)] pointer-events-none" />
      </div>
    </div>
  );
};

interface ExpandedCardOverlayProps {
  char: CharacterConfig | null;
  initialFlipped: boolean;
  onClose: () => void;
}

const ExpandedCardOverlay: React.FC<ExpandedCardOverlayProps> = ({ char, initialFlipped, onClose }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // 3D rotation angles
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(initialFlipped ? 180 : 0);
  const [rotZ, setRotZ] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const wasDragging = useRef(false); // Explicit protection against accidental dismissal

  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const scrollAccum = useRef(0);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mouse drag handler for free 3D rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only Left Click
    setIsDragging(true);
    wasDragging.current = false; // Reset on click
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rotX,
      rotY,
    };
    e.preventDefault();
  };

  // Drag listeners
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      
      // If the cursor moved significantly, consider it a drag/rotate action
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        wasDragging.current = true;
      }

      // Rotate around Y and X axes
      const newRotY = dragStart.current.rotY + dx * 0.55;
      const newRotX = dragStart.current.rotX - dy * 0.55;

      setRotY(newRotY);
      setRotX(newRotX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Mouse wheel roll (rotate around Z axis)
  useEffect(() => {
    if (isMobile) return;
    const el = cardWrapperRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      scrollAccum.current += e.deltaY * 0.25;
      setRotZ(scrollAccum.current);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        // When scrolling stops, if back side is facing user, snap Z to flat 0
        const cosY = Math.cos((rotY * Math.PI) / 180);
        if (cosY < 0) {
          setRotZ((prev) => {
            const snapped = Math.round(prev / 360) * 360;
            scrollAccum.current = snapped;
            return snapped;
          });
        }
      }, 700);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [isMobile, rotY]);

  // Snapping logic: runs ONLY on release of dragging (isDragging transitions from true to false)
  // Ensures readable orientation on the back side of the card (where text is)
  const prevDragging = useRef(false);
  useEffect(() => {
    if (prevDragging.current && !isDragging) {
      const cosY = Math.cos((rotY * Math.PI) / 180);
      const isBackFacing = cosY < 0;

      if (isBackFacing) {
        // Snapping rotation on release:
        // rotY to nearest odd multiple of 180
        const snappedY = Math.round(rotY / 180) * 180;
        const isOdd = Math.round(snappedY / 180) % 2 !== 0;
        const finalY = isOdd ? snappedY : snappedY + 180;

        // rotX (tilt) to 0 (flat)
        const finalX = Math.round(rotX / 360) * 360;

        // rotZ (roll) to nearest multiple of 360 (upright)
        const finalZ = Math.round(rotZ / 360) * 360;

        setRotX(finalX);
        setRotY(finalY);
        setRotZ(finalZ);
        scrollAccum.current = finalZ;
      }
    }
    prevDragging.current = isDragging;
  }, [isDragging, rotX, rotY, rotZ]);

  // Sync scroll accumulator with Z rotation when modified via buttons
  useEffect(() => {
    scrollAccum.current = rotZ;
  }, [rotZ]);

  if (!char) return null;

  const goTo = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleCardClick = () => {
    // Only flip if we were NOT dragging (explicit protection against accidental flips at the end of a drag)
    if (!wasDragging.current) {
      toggleFlip();
    }
  };

  // Intercept left clicks on child page buttons for standard SPA transition
  const handleChildLinkClick = (e: React.MouseEvent, path: string) => {
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      goTo(path);
    }
  };

  const toggleFlip = () => {
    setRotY((prev) => prev + 180);
  };

  const toggleRoll = () => {
    setRotZ((prev) => prev + 180);
  };

  // Determine active side based on rotY angle
  const isBackSideActive = Math.cos((rotY * Math.PI) / 180) < 0;

  return (
    <motion.div
      className="fixed inset-0 z-[650] flex items-center justify-center bg-black/78 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        // Only close if clicked exactly outside the card and we were NOT dragging
        if (e.target === e.currentTarget && !wasDragging.current) {
          onClose();
        }
        // Small delay reset to avoid racing conditions
        setTimeout(() => {
          wasDragging.current = false;
        }, 50);
      }}
    >
      <motion.div
        className="relative flex flex-col items-center justify-center max-h-[95vh] my-auto"
        initial={{ opacity: 0, scale: 0.72, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.72, y: 32 }}
        transition={{ type: 'spring', damping: 22, stiffness: 190 }}
        onClick={(event) => event.stopPropagation()}
        style={{ perspective: 1400 }}
      >
        <button
          onClick={onClose}
          className="absolute -right-2 -top-12 z-20 flex h-9 w-9 items-center justify-center rounded-full text-xl transition-transform hover:scale-110 cursor-pointer"
          style={{ background: 'rgba(10,8,6,0.92)', border: `1px solid ${char.color}70`, color: homeTheme.parchment }}
          aria-label="Закрыть карту"
        >
          ×
        </button>

        <div ref={cardWrapperRef} className="relative" style={{ perspective: 1400 }}>
          <div
            onMouseDown={handleMouseDown}
            onClick={handleCardClick}
            className="relative rounded-[18px] select-none cursor-grab active:cursor-grabbing"
            style={{
              width: isMobile ? 'min(55vw, 190px)' : '360px',
              aspectRatio: '768 / 1376',
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDragging
                ? 'none'
                : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
              filter: `drop-shadow(0 34px 48px rgba(0,0,0,0.72))`,
            }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(1px)',
              }}
            >
              <CardFront char={char} />
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(-1px)',
              }}
            >
              <CardBack char={char} />
            </div>

            {/* Glare effect */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[18px] mix-blend-screen"
              style={{
                opacity: isDragging ? 0.35 : 0,
                background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.45), transparent 60%)`,
                transform: 'translateZ(10px)',
              }}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={toggleFlip}
            className="rounded-full px-4 py-2 text-xs tracking-[1.5px] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110 cursor-pointer"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'rgba(20,15,10,0.92)',
              border: `1px solid ${char.color}88`,
              color: homeTheme.parchment,
              boxShadow: `0 0 10px ${char.color}30`,
            }}
          >
            {isBackSideActive ? '↩ Лицевая сторона' : '↕ Краткий лор'}
          </button>

          <button
            onClick={toggleRoll}
            className="rounded-full px-4 py-2 text-xs tracking-[1.5px] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110 cursor-pointer"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'rgba(20,15,10,0.92)',
              border: `1px solid ${char.color}88`,
              color: homeTheme.parchment,
              boxShadow: `0 0 10px ${char.color}30`,
            }}
          >
            ↺ Перевернуть
          </button>

          <a
            href={char.lorePath}
            onClick={(e) => handleChildLinkClick(e, char.lorePath)}
            className="rounded-full px-4 py-2 text-xs tracking-[1.5px] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110 cursor-pointer block text-center"
            style={{
              fontFamily: "'Cinzel', serif",
              background: `${char.color}30`,
              border: `2px solid ${char.color}`,
              color: homeTheme.parchment,
              textDecoration: 'none',
              boxShadow: `0 0 15px ${char.color}50`,
            }}
          >
            Читать лор →
          </a>
        </div>

        {!isMobile && (
          <div
            className="mt-2 text-center text-[10px] tracking-[1.5px] opacity-70 font-semibold"
            style={{ fontFamily: "'Cinzel', serif", color: homeTheme.parchmentDim }}
          >
            Зажмите ЛКМ и двигайте — свободное вращение в 3D · Колёсико мыши — вращать по оси Z
          </div>
        )}

        <div className="mt-3 flex max-w-[520px] flex-wrap items-center justify-center gap-2">
          {char.pages.map((page) => (
            <a
              key={page.path}
              href={page.path}
              onClick={(e) => handleChildLinkClick(e, page.path)}
              className="rounded px-3 py-1.5 text-[10px] tracking-[1px] transition-all hover:-translate-y-0.5 hover:shadow hover:brightness-110 cursor-pointer block text-center"
              style={{
                fontFamily: "'Cinzel', serif",
                background: 'rgba(30,25,15,0.75)',
                border: '1px solid rgba(138,112,64,0.35)',
                color: homeTheme.parchment,
                textDecoration: 'none',
              }}
            >
              {page.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

interface CharacterCardDeckProps {
  onExpandedChange?: (char: CharacterConfig | null) => void;
}

const CharacterCardDeck: React.FC<CharacterCardDeckProps> = ({ onExpandedChange }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState<CharacterConfig | null>(null);
  const [overlayStartsFlipped, setOverlayStartsFlipped] = useState(false);
  const [deckHint, setDeckHint] = useState("✦ Нажми на карту, чтобы услышать её шёпот ✦");

  useEffect(() => {
    const hints = [
      "✦ Нажми на карту, чтобы узреть судьбу героя ✦",
      "✦ Коснись меня, чтобы открыть летопись ✦",
      "✦ Разверни судьбу — выбери свою карту ✦",
      "✦ Карты Таро ждут твоего прикосновения ✦"
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % hints.length;
      setDeckHint(hints[idx]);
    }, 6000); // alternate every 6 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    onExpandedChange?.(expanded);
  }, [expanded, onExpandedChange]);

  const openCard = (char: CharacterConfig) => {
    setOverlayStartsFlipped(false); // Always show front face (artwork) to the viewer initially!
    setExpanded(char);
  };

  return (
    <div className="relative min-h-[280px] md:min-h-[620px]">
      <div className="flex min-h-[240px] flex-col items-center justify-center overflow-visible py-3 md:min-h-[560px] md:py-6">
        
        {/* Pulsing mystical deck hint bubble */}
        <motion.div
          key={deckHint}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0.4, 1, 0.4], y: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-xs uppercase tracking-[3px] text-center mb-6 font-bold"
          style={{ color: homeTheme.parchmentDim, fontFamily: "'Cinzel', serif" }}
        >
          {deckHint}
        </motion.div>

        {isMobile ? (
          <MobileDeck onOpen={openCard} />
        ) : (
          <div
            className="relative w-full max-w-[1040px]"
            style={{ height: 440, perspective: 1500 }}
          >
            {characters.map((char, index) => (
              <FanCard
                key={char.id}
                char={char}
                index={index}
                isMobile={false}
                onOpen={openCard}
              />
            ))}
          </div>
        )}

        <div className="mt-6 md:mt-14 flex w-full max-w-[520px] flex-col items-center gap-3 px-5">
          <button
            onClick={() => navigate('/letopis')}
            className="rounded-full px-5 py-2 text-xs tracking-[2px] transition-transform hover:-translate-y-0.5 cursor-pointer"
            style={{ fontFamily: "'Cinzel', serif", background: 'rgba(20,15,10,0.72)', border: `1px solid ${homeTheme.primary}55`, color: homeTheme.parchment }}
          >
            Открыть летопись мира
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
