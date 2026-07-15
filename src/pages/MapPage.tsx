import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { lorTheme } from '@/types/theme';
import { routeHref } from '@/lib/routeHref';
import { useIsMobile } from '@/hooks/use-mobile';

const BASE = import.meta.env.BASE_URL;

interface MapInfo {
  title: string;
  image: string;
  description: string;
  aspect: string;
  short: string;
}

/**
 * mapsData — все карты сайта.
 * `full-north` собирает три новые карты в один длинный атлас: люди → эльфы → дворфы.
 * Если добавляешь новую карту, положи файл в `public/maps/` или `public/` и добавь запись сюда.
 */
const mapsData: Record<string, MapInfo> = {
  'full-north': {
    title: 'Атлас всего Севера',
    image: `${BASE}maps/north_full_atlas.jpg`,
    description: 'Единый разворот всего Севера слева направо: территория людей, земли эльфов и владения дворфов. Переключатели ниже открывают каждый слой отдельно.',
    aspect: '4583 / 704',
    short: 'Весь Север',
  },
  'north-humans': {
    title: 'Территория людей на Севере',
    image: `${BASE}maps/north_humans.jpg`,
    description: 'Человеческая часть северных земель: Нортвинд, Остюр, Бергхейм, орочьи племена, Ринхолд и ледяные рубежи Terra Borealis.',
    aspect: '1505 / 704',
    short: 'Люди',
  },
  'north-elves': {
    title: 'Земли эльфов на Севере',
    image: `${BASE}maps/north_elves.jpg`,
    description: 'Эльфийский север: Эхуил, Амон Анго и древние лесные пути за хребтами.',
    aspect: '1505 / 704',
    short: 'Эльфы',
  },
  'north-dwarves': {
    title: 'Владения дворфов на Севере',
    image: `${BASE}maps/north_dwarves.jpg`,
    description: 'Дворфийская часть Севера: горные дороги, Зирак-дум, восточные хребты и выходы к морю.',
    aspect: '1505 / 704',
    short: 'Дворфы',
  },
  northwind: {
    title: 'Карта Нортвинда',
    image: `${BASE}map_northwind.png`,
    description: 'Карта Нортвинда — оплота севера и его окрестностей.',
    aspect: '2560 / 1396',
    short: 'Нортвинд',
  },
};

const mapOrder = ['full-north', 'north-humans', 'north-elves', 'north-dwarves', 'northwind'];

const MapPage: React.FC = () => {
  const { mapId } = useParams<{ mapId: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const resolvedMapId = mapId === 'sever' ? 'full-north' : mapId;
  const mapData = resolvedMapId ? mapsData[resolvedMapId] : undefined;

  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imgNatural, setImgNatural] = useState<{w:number,h:number}|null>(null);

  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const pinchRef = useRef({ isPinching: false, startDist: 0, startScale: 1 });
  const containerRef = useRef<HTMLDivElement>(null);

  const clampPosition = useCallback((x: number, y: number, s: number) => {
    if (!containerRef.current || !imgNatural) return { x: 0, y: 0 };
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    const scaledW = cw * s;
    const scaledH = ch * s;
    const maxX = Math.max(0, (scaledW - cw) / 2);
    const maxY = Math.max(0, (scaledH - ch) / 2);

    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }, [imgNatural]);

  useEffect(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, [resolvedMapId]);

  useEffect(() => {
    setPos((prev) => clampPosition(prev.x, prev.y, scale));
  }, [scale, clampPosition]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setScale((prev) => {
      const next = Math.min(6, Math.max(1, prev * (e.deltaY > 0 ? 0.92 : 1.08)));
      if (next <= 1.01) { setPos({ x: 0, y: 0 }); return 1; }
      return next;
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel, isFullscreen]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0 || scale <= 1) return;
    e.preventDefault();
    dragRef.current = { isDragging: true, startX: e.clientX, startY: e.clientY, originX: pos.x, originY: pos.y };
  }, [pos, scale]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos(clampPosition(dragRef.current.originX + dx, dragRef.current.originY + dy, scale));
  }, [scale, clampPosition]);

  const handleMouseUp = useCallback(() => { dragRef.current.isDragging = false; }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1) {
      dragRef.current = { isDragging: true, startX: e.touches[0].clientX, startY: e.touches[0].clientY, originX: pos.x, originY: pos.y };
    } else if (e.touches.length === 2) {
      e.preventDefault();
      dragRef.current.isDragging = false;
      const t1 = e.touches[0], t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      pinchRef.current = { isPinching: true, startDist: dist, startScale: scale };
    }
  }, [scale, pos]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (pinchRef.current.isPinching && e.touches.length === 2) {
      e.preventDefault();
      const t1 = e.touches[0], t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const newScale = Math.min(6, Math.max(1, pinchRef.current.startScale * (dist / pinchRef.current.startDist)));
      setScale(newScale);
      if (newScale <= 1.01) setPos({ x: 0, y: 0 });
      else setPos((prev) => clampPosition(prev.x, prev.y, newScale));
    } else if (dragRef.current.isDragging && e.touches.length === 1 && scale > 1) {
      e.preventDefault();
      const dx = e.touches[0].clientX - dragRef.current.startX;
      const dy = e.touches[0].clientY - dragRef.current.startY;
      setPos(clampPosition(dragRef.current.originX + dx, dragRef.current.originY + dy, scale));
    }
  }, [scale, clampPosition]);

  const handleTouchEnd = useCallback(() => { dragRef.current.isDragging = false; pinchRef.current.isPinching = false; }, []);

  const resetMap = useCallback(() => { setScale(1); setPos({ x: 0, y: 0 }); }, []);
  const zoomIn = useCallback(() => setScale((p) => Math.min(6, p * 1.25)), []);
  const zoomOut = useCallback(() => setScale((p) => {
    const n = Math.max(1, p / 1.25);
    if (n <= 1.01) { setPos({ x: 0, y: 0 }); return 1; }
    return n;
  }), []);

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isFullscreen]);

  if (!mapData || !resolvedMapId) {
    return (
      <Layout theme={lorTheme}>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 style={{ fontFamily: "'Cinzel Decorative', serif", color: lorTheme.parchment }} className="text-4xl font-bold mb-4">Карта не найдена</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: lorTheme.parchmentDim }} className="text-lg italic">По этому пути ещё не проложено летописи.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout theme={lorTheme} particleCount={14} overlayMode={isFullscreen}>
      <div className={isFullscreen ? '' : 'max-w-[1240px] mx-auto px-4 md:px-8 pb-20 pt-14'}>
        {!isFullscreen && (
          <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-center pb-7 mb-5">
            <p className="text-[11px] mb-3 tracking-[3px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: lorTheme.primaryGlow }}>
              Атлас Севера
            </p>
            <h1
              className="text-[26px] md:text-[42px] font-bold tracking-[3px] mb-3"
              style={{ fontFamily: "'Cinzel Decorative', serif", color: lorTheme.silverBright, textShadow: '0 0 20px rgba(228,74,90,.18), 0 2px 8px rgba(0,0,0,.9)'}}
            >
              {mapData.title}
            </h1>
            <p className="text-[15px] md:text-[17px] italic max-w-[720px] mx-auto leading-relaxed prose-readable" style={{ color: lorTheme.parchmentDim }}>
              {mapData.description}
            </p>
            <div className="map-layer-switcher" aria-label="Слои карты Севера">
              {mapOrder.map((id) => {
                const item = mapsData[id];
                return (
                  <a
                    key={id}
                    href={routeHref(`/map/${id}`)}
                    onClick={(event) => {
                      if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
                        event.preventDefault();
                        navigate(`/map/${id}`);
                      }
                    }}
                    className={id === resolvedMapId ? 'is-active tarot-no-glow' : 'tarot-no-glow'}
                  >
                    {item.short}
                  </a>
                );
              })}
            </div>
            <p className="text-[11px] mt-3 opacity-80 tracking-wider" style={{ fontFamily: "'Cinzel', serif", color: lorTheme.parchmentDim }}>
              {isMobile ? 'Кнопки + / − или щипок — масштаб · Свайп — перемещение' : 'Колёсико — масштаб · ЛКМ — перемещение'}
            </p>
          </motion.header>
        )}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={isFullscreen
            ? 'fixed inset-0 z-[840] bg-[#060508]'
            : 'relative mx-auto rounded-[18px] overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.62)]'
          }
          style={{
            border: isFullscreen ? 'none' : `1px solid ${lorTheme.primaryGlow}55`,
            maxWidth: isFullscreen ? 'none' : '1160px',
          }}
        >
          <div
            ref={containerRef}
            className={isFullscreen
              ? 'w-screen h-screen flex items-center justify-center overflow-hidden select-none touch-none'
              : 'relative w-full overflow-hidden select-none touch-none bg-[#07060a]'}
            style={{
              aspectRatio: isFullscreen ? undefined : mapData.aspect,
              maxHeight: isFullscreen ? '100vh' : (resolvedMapId === 'full-north' ? '86vh' : '78vh'),
              cursor: scale > 1 ? (dragRef.current.isDragging ? 'grabbing' : 'grab') : 'default',
              height: isFullscreen ? '100vh' : undefined,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onContextMenu={(e) => e.preventDefault()}
          >
            <img
              src={mapData.image}
              alt={mapData.title}
              draggable={false}
              onLoad={(e) => {
                const img = e.currentTarget;
                setImgNatural({ w: img.naturalWidth, h: img.naturalHeight });
              }}
              className="block select-none pointer-events-none"
              style={{
                width: '100%',
                height: isFullscreen ? '100%' : '100%',
                objectFit: 'contain',
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                transformOrigin: 'center center',
                transition: dragRef.current.isDragging ? 'none' : 'transform 140ms ease-out',
                imageRendering: 'auto',
              }}
            />
            <div className="pointer-events-none absolute inset-0" style={{
              boxShadow: 'inset 0 0 120px rgba(0,0,0,0.55), inset 0 0 40px rgba(0,0,0,0.35)',
              borderRadius: isFullscreen ? 0 : 18,
            }}/>
          </div>

          <div
            className="absolute z-30 flex items-center gap-1.5 rounded-xl px-2.5 py-2 shadow-2xl backdrop-blur-xl"
            style={{
              right: '14px',
              bottom: '14px',
              background: 'rgba(12, 8, 14, 0.88)',
              border: `1px solid ${lorTheme.primaryGlow}55`,
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <button onClick={resetMap}
              className="px-3 py-[7px] rounded-lg text-[11px] tracking-wider font-semibold transition-all hover:-translate-y-px tarot-no-glow"
              style={{ fontFamily: "'Cinzel', serif", color: lorTheme.parchment, background: 'rgba(255,255,255,0.04)', border: `1px solid ${lorTheme.primary}44` }}
            >⟲ Сброс</button>
            <div style={{ width: 1, height: 18, background: `${lorTheme.primary}38`, margin: '0 4px' }} />
            <button onClick={zoomOut} className="w-8 h-8 rounded-lg font-bold tarot-no-glow" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${lorTheme.primary}44`, color: lorTheme.parchment }}>−</button>
            <span className="text-[11px] tabular-nums px-1 min-w-[44px] text-center" style={{ color: lorTheme.primaryGlow, fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>{Math.round(scale*100)}%</span>
            <button onClick={zoomIn} className="w-8 h-8 rounded-lg font-bold tarot-no-glow" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${lorTheme.primary}44`, color: lorTheme.parchment }}>+</button>
            <div style={{ width: 1, height: 18, background: `${lorTheme.primary}38`, margin: '0 4px' }} />
            <button onClick={() => setIsFullscreen(!isFullscreen)}
              className="px-3 py-[7px] rounded-lg text-[11px] tracking-wider font-semibold transition-all hover:-translate-y-px tarot-no-glow"
              style={{ fontFamily: "'Cinzel', serif", color: lorTheme.parchment, background: 'rgba(255,255,255,0.04)', border: `1px solid ${lorTheme.primary}44` }}
            >{isFullscreen ? '× Выйти' : ' Экран'}</button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default MapPage;
