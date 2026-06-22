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

type TiltState = {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  glareOpacity: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function useCardTilt(maxTilt = 9) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
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
      glareOpacity: 0.24,
    });
  };

  useEffect(() => {
    return () => {
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return {
    ref,
    tilt,
    tiltHandlers: {
      onPointerMove: handlePointerMove,
      onPointerLeave: resetTilt,
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

// desktop fan
const desktopFan = [
  { x: -340 * 1.4, y: 48, rotate: -22 },
  { x: -170 * 1.4, y: 14, rotate: -10 },
  { x: 0, y: 0, rotate: 0 },
  { x: 170 * 1.4, y: 14, rotate: 10 },
  { x: 340 * 1.4, y: 48, rotate: 22 },
];

interface FanCardProps {
  char: CharacterConfig;
  index: number;
  onOpen: (char: CharacterConfig) => void;
}

const FanCard: React.FC<FanCardProps> = ({ char, index, onOpen }) => {
  const { ref, tilt, tiltHandlers } = useCardTilt(8);
  const [isHovered, setIsHovered] = useState(false);
  const fan = desktopFan[index];
  const cardWidth = 212;
  const cardHeight = Math.round(cardWidth * 1.79);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 tarot-no-glow"
      style={{
        width: cardWidth,
        height: cardHeight,
        marginLeft: -cardWidth / 2,
        marginTop: -cardHeight / 2,
        zIndex: isHovered ? 100 : 20 + index,
        perspective: 1400,
      }}
      onMouseEnter={() => setIsHovered(true)}
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
    >
      {/* slow wobble when hovered */}
      <motion.div
        animate={isHovered ? { rotateZ: [-0.8, 0.8, -0.8], y: [0, -3, 0] } : { rotateZ: 0, y: 0 }}
        transition={isHovered ? { duration: 3.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 }}
        className="w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
      <div
        ref={ref}
        {...tiltHandlers}
        onClick={() => onOpen(char)}
        className="group relative h-full w-full cursor-pointer select-none rounded-[16px] tarot-no-glow"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: tilt.glareOpacity === 0 ? 'transform 620ms cubic-bezier(.2,.8,.2,1)' : 'none',
          filter: `drop-shadow(0 26px 34px rgba(0,0,0,0.46))`,
        }}
        aria-label={`Открыть карту ${char.name}`}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') onOpen(char);
        }}
      >
        <div
          className="relative h-full w-full rounded-[16px] overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <CardFront char={char} />
        </div>

        {/* hover glow - hide when actively tilting / flipping */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[16px] transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0 : tilt.glareOpacity,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.42), rgba(255,255,255,0.1) 24%, transparent 58%)`,
            mixBlendMode: 'screen' as const,
          }}
        />
        {/* elegant edge glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[16px] transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.95 : 0.45,
            boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.085), 0 0 28px ${char.color}22`,
          }}
        />
      </div>
      </motion.div>
      {/* card label below */}
      <div className="absolute -bottom-9 left-0 right-0 text-center pointer-events-none">
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            color: isHovered ? '#fff' : homeTheme.parchmentDim,
            fontSize: 11,
            letterSpacing: 2,
            textShadow: `0 0 12px ${char.color}55`,
            transition: 'color .2s',
          }}
        >
           {char.name} 
        </span>
      </div>
    </motion.div>
  );
};

const CardFront: React.FC<{ char: CharacterConfig; isMobile?: boolean }> = ({ char, isMobile }) => {
  const imgSrc = isMobile ? char.tarot.replace('/optimized/', '/optimized/mobile/') : char.tarot;
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[16px]"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        background: `linear-gradient(160deg, rgba(255,255,255,0.035), ${char.color}14 38%, rgba(7,6,10,0.98))`,
        border: `1px solid ${char.color}55`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.065), inset 0 0 28px rgba(0,0,0,0.42)`,
      }}
    >
      <img
        src={imgSrc}
        alt={char.name}
        className="h-full w-full object-cover"
        style={{ filter: 'none' }}
        loading={isMobile ? 'lazy' : 'eager'}
        decoding="async"
        draggable={false}
      />
      {/* very light sheen, no darkening */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(110deg, rgba(255,255,255,0.10), transparent 28%, transparent 68%, rgba(255,255,255,0.055))',
        }}
      />
    </div>
  );
};

const CardBack: React.FC<{ char: CharacterConfig; compact?: boolean }> = ({ char, compact = false }) => (
  <div
    className={`absolute inset-0 flex flex-col items-center justify-center rounded-[16px] text-center ${compact ? 'p-4' : 'p-7'}`}
    style={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
      background: `radial-gradient(circle at 50% 0%, ${char.color}2d, transparent 44%), linear-gradient(158deg, rgba(10,8,14,0.995), rgba(20,14,20,0.995) 52%, ${char.color}1a)`,
      border: `1px solid ${char.color}66`,
      boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 44px rgba(0,0,0,0.62), 0 0 34px ${char.color}18`,
    }}
  >
    <div
      className={compact ? 'mb-3 text-[11px] uppercase tracking-[2.4px]' : 'mb-5 text-sm uppercase tracking-[3px]'}
      style={{ fontFamily: "'Cinzel Decorative', serif", color: char.color, textShadow: `0 0 18px ${char.color}55` }}
    >
       {char.name} 
    </div>

    {(cardBios[char.id] || []).map((line, idx) => (
      <p
        key={idx}
        className={compact ? 'mb-2 text-[11.5px] leading-[1.45] last:mb-0' : 'mb-3 text-[15.5px] leading-relaxed last:mb-0'}
        style={{ fontFamily: "'Cormorant Garamond', serif", color: homeTheme.parchment }}
      >
        {line}
      </p>
    ))}

    <div
      className={compact ? 'mt-3 text-[9.5px] italic tracking-[1.2px]' : 'mt-5 text-xs italic tracking-[1px]'}
      style={{ color: homeTheme.parchmentDim }}
    >
      Клик — раскрыть карту
    </div>
  </div>
);

/* ── Mobile carousel ── */
const MobileCarouselCard: React.FC<{
  char: CharacterConfig;
  isActive: boolean;
  onOpen: (char: CharacterConfig) => void;
}> = ({ char, isActive, onOpen }) => {
  const startPos = useRef<{x:number;y:number;t:number}|null>(null);
  const [pressed, setPressed] = useState(false);

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
      onOpen(char);
    }
  };
  const handlePointerCancel = () => { setPressed(false); startPos.current = null; };

  return (
    <div
      className="relative select-none rounded-[14px] overflow-hidden tarot-no-glow cursor-pointer transition-transform duration-200"
      style={{
        background: `linear-gradient(155deg, rgba(255,255,255,0.03), ${char.color}16 40%, rgba(9,6,12,0.98))`,
        border: `1px solid ${char.color}55`,
        boxShadow: isActive
          ? `0 20px 44px rgba(0,0,0,0.55), 0 0 28px ${char.color}2a`
          : `0 10px 22px rgba(0,0,0,0.42), 0 0 16px ${char.color}16`,
        transform: pressed ? 'scale(0.985)' : 'scale(1)',
        aspectRatio: '768 / 1376',
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerCancel}
      role="button"
      aria-label={`Открыть карту ${char.name}`}
      tabIndex={0}
    >
      <img
        src={char.tarot.replace('/optimized/', '/optimized/mobile/')}
        alt={char.name}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
        loading="eager"
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 38%, rgba(255,255,255,0.06) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 text-center pb-3 pt-8" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.78))' }}>
        <div style={{ fontFamily: "'Cinzel Decorative', serif", color: '#fff', fontSize: 14, letterSpacing: 1.6, textShadow: `0 0 14px ${char.color}aa` }}>
          {char.name}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", color: homeTheme.parchmentDim, fontSize: 11, fontStyle: 'italic', marginTop: 2 }}>
          коснитесь, чтобы открыть
        </div>
      </div>
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
    <div className="w-full max-w-[420px] mx-auto px-3">
      <Carousel
        opts={{ align: 'center', loop: true }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {characters.map((char) => (
            <CarouselItem key={char.id} className="pl-3 basis-[74%] sm:basis-[62%]">
              <div className="py-4">
                <MobileCarouselCard
                  char={char}
                  isActive={characters[current]?.id === char.id}
                  onOpen={onOpen}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2 mt-1">
        {characters.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Слайд ${i+1}`}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: current === i ? 22 : 8,
              background: current === i ? homeTheme.primaryGlow : 'rgba(255,255,255,0.22)',
            }}
          />
        ))}
      </div>
      <div className="text-center mt-2 text-[11px] tracking-wider" style={{ color: homeTheme.parchmentDim, fontFamily: "'Cinzel', serif" }}>
        свайп — листать · тап — открыть
      </div>
    </div>
  );
};

interface ExpandedCardOverlayProps {
  char: CharacterConfig | null;
  onClose: () => void;
}

const ExpandedCardOverlay: React.FC<ExpandedCardOverlayProps> = ({ char, onClose }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0); // always start with front
  const [rotZ, setRotZ] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const scrollAccum = useRef(0);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const justDragged = useRef(false);
  const dragMoved = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY, rotX, rotY };
    e.preventDefault();
    e.stopPropagation();
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    setIsDragging(true);
    dragMoved.current = false;
    dragStart.current = { x: t.clientX, y: t.clientY, rotX, rotY };
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (clientX: number, clientY: number) => {
      const dx = clientX - dragStart.current.x;
      const dy = clientY - dragStart.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved.current = true;
      setRotY(dragStart.current.rotY + dx * 0.5);
      setRotX(dragStart.current.rotX - dy * 0.5);
    };
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const end = () => {
      setIsDragging(false);
      if (dragMoved.current) {
        justDragged.current = true;
        setTimeout(() => { justDragged.current = false; }, 120);
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', end);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', end);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', end);
    };
  }, [isDragging]);

  // wheel Z rotation
  useEffect(() => {
    const el = cardWrapperRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollAccum.current += e.deltaY * 0.22;
      setRotZ(scrollAccum.current);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // snap back side upright when releasing
  useEffect(() => {
    if (isDragging) return;
    const cosY = Math.cos((rotY * Math.PI) / 180);
    const isBackFacing = cosY < 0;
    if (isBackFacing) {
      const snappedY = Math.round(rotY / 180) * 180;
      const isOdd = Math.round(snappedY / 180) % 2 !== 0;
      const finalY = isOdd ? snappedY : snappedY + 180;
      const finalX = 0;
      const finalZ = Math.round(rotZ / 360) * 360;
      setRotX(finalX);
      setRotY(finalY);
      setRotZ(finalZ);
      scrollAccum.current = finalZ;
    }
  }, [isDragging, rotX, rotY, rotZ]);

  if (!char) return null;

  const goTo = (path: string) => { onClose(); navigate(path); };
  const handleChildLinkClick = (e: React.MouseEvent, path: string) => {
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault(); goTo(path);
    }
  };
  const toggleFlip = () => setRotY((prev) => prev + 180);
  const isBackSideActive = Math.cos((rotY * Math.PI) / 180) < 0;

  const tryClose = () => {
    if (justDragged.current) return;
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[650] flex items-center justify-center bg-black/82 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) tryClose(); }}
    >
      <motion.div
        className="relative flex flex-col items-center justify-center max-h-[95vh] my-auto"
        initial={{ opacity: 0, scale: 0.78, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.78, y: 28 }}
        transition={{ type: 'spring', damping: 23, stiffness: 210 }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        style={{ perspective: 1500 }}
      >
        <button
          onClick={onClose}
          className="absolute -right-2 -top-11 z-20 flex h-9 w-9 items-center justify-center rounded-full text-xl transition-transform hover:scale-110 cursor-pointer tarot-no-glow"
          style={{ background: 'rgba(12,8,14,0.94)', border: `1px solid ${char.color}70`, color: homeTheme.parchment }}
          aria-label="Закрыть карту"
        >
          ×
        </button>

        <div ref={cardWrapperRef} className="relative" style={{ perspective: 1500 }}>
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="relative rounded-[18px] select-none cursor-grab active:cursor-grabbing tarot-no-glow"
            style={{
              width: isMobile ? 'min(58vw, 220px)' : '352px',
              aspectRatio: '768 / 1376',
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)',
              filter: `drop-shadow(0 36px 52px rgba(0,0,0,0.74))`,
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(1px)' }}
            >
              <CardFront char={char} />
            </div>
            {/* Back */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)' }}
            >
              <CardBack char={char} />
            </div>

            {/* glow - hide while actively rotating */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[18px] transition-opacity duration-200"
              style={{
                opacity: isDragging ? 0 : 0.14,
                background: `radial-gradient(circle at 50% 35%, rgba(255,255,255,0.22), transparent 62%)`,
                mixBlendMode: 'screen' as const,
              }}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={toggleFlip}
            className="rounded-full px-4 py-2 text-xs tracking-[1.5px] transition-all hover:-translate-y-0.5 cursor-pointer tarot-no-glow"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'rgba(22,14,20,0.95)',
              border: `1px solid ${char.color}88`,
              color: homeTheme.parchment,
              boxShadow: `0 0 12px ${char.color}28`,
            }}
          >
            {isBackSideActive ? '↩ Лицевая сторона' : '↕ Краткий лор'}
          </button>
          <a
            href={char.lorePath}
            onClick={(e) => handleChildLinkClick(e, char.lorePath)}
            className="rounded-full px-4 py-2 text-xs tracking-[1.5px] transition-all hover:-translate-y-0.5 cursor-pointer block text-center tarot-no-glow"
            style={{
              fontFamily: "'Cinzel', serif",
              background: `${char.color}28`,
              border: `1.5px solid ${char.color}`,
              color: '#fff',
              textDecoration: 'none',
              boxShadow: `0 0 16px ${char.color}38`,
            }}
          >
             Читать лор →
          </a>
        </div>

        <div
          className="mt-2 text-center text-[11px] tracking-[1.2px] opacity-75"
          style={{ fontFamily: "'Manrope', sans-serif", color: homeTheme.parchmentDim }}
        >
          {isMobile
            ? 'Тяните для вращения · тап по кнопке — перевернуть'
            : 'ЛКМ + движение — 3D осмотр · Колёсико — поворот'}
        </div>

        <div className="mt-3 flex max-w-[540px] flex-wrap items-center justify-center gap-2">
          {char.pages.map((page) => (
            <a
              key={page.path}
              href={page.path}
              onClick={(e) => handleChildLinkClick(e, page.path)}
              className="rounded-lg px-3 py-1.5 text-[11px] tracking-[0.8px] transition-all hover:-translate-y-0.5 cursor-pointer block text-center tarot-no-glow"
              style={{
                fontFamily: "'Cinzel', serif",
                background: 'rgba(26,18,26,0.78)',
                border: '1px solid rgba(255,255,255,0.1)',
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

  useEffect(() => { onExpandedChange?.(expanded); }, [expanded, onExpandedChange]);

  const openCard = (char: CharacterConfig) => {
    setExpanded(char); // always front-first
  };

  return (
    <div className="relative min-h-[320px] md:min-h-[600px]">
      <div className="flex min-h-[280px] flex-col items-center justify-center overflow-visible py-3 md:min-h-[540px] md:py-6">
        {isMobile ? (
          <MobileDeck onOpen={openCard} />
        ) : (
          <div className="relative w-full max-w-[1080px]" style={{ height: 430, perspective: 1600 }}>
            {characters.map((char, index) => (
              <FanCard key={char.id} char={char} index={index} onOpen={openCard} />
            ))}
          </div>
        )}

        <div className="mt-8 md:mt-14 flex w-full max-w-[540px] flex-col items-center gap-3 px-5">
          <button
            onClick={() => navigate('/letopis')}
            className="rounded-full px-5 py-2.5 text-[11px] md:text-xs tracking-[2.2px] transition-transform hover:-translate-y-0.5 cursor-pointer"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'rgba(22,14,20,0.78)',
              border: `1px solid ${homeTheme.primaryGlow}66`,
              color: homeTheme.parchment,
              boxShadow: `0 0 18px ${homeTheme.primaryGlow}18`,
            }}
          >
             Открыть летопись мира
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <ExpandedCardOverlay char={expanded} onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CharacterCardDeck;
