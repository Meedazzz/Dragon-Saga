import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { lorTheme } from '@/types/theme';
import { useIsMobile } from '@/hooks/use-mobile';

const BASE = import.meta.env.BASE_URL;

const mapsData: Record<string, { title: string; image: string; description: string }> = {
  sever: {
    title: 'Карта Севера',
    image: `${BASE}map_sever.png`,
    description: 'Карта северных земель — от ледяных пустошей до горных хребтов Бергхейма.',
  },
  northwind: {
    title: 'Карта Нортвинда',
    image: `${BASE}map_northwind.png`,
    description: 'Карта Нортвинда — оплота севера и его окрестностей.',
  },
};

const MapPage: React.FC = () => {
  const { mapId } = useParams<{ mapId: string }>();
  const isMobile = useIsMobile();
  const mapData = mapId ? mapsData[mapId] : undefined;

  /* ── Состояние интерактивной карты ── */
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Ссылки для перетаскивания (мышь)
  const dragRef = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({ isDragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  // Ссылки для touch-событий (пинч-зум и тач-пан)
  const pinchRef = useRef<{
    isPinching: boolean;
    startDist: number;
    startScale: number;
  }>({ isPinching: false, startDist: 0, startScale: 1 });

  const containerRef = useRef<HTMLDivElement>(null);

  /* Clamping function to restrict panning bounds within image borders */
  const clampPosition = useCallback((x: number, y: number, s: number) => {
    if (!containerRef.current) return { x, y };
    
    const imgEl = containerRef.current.querySelector('img');
    if (!imgEl) return { x, y };

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const imgWidth = imgEl.naturalWidth || containerWidth;
    const imgHeight = imgEl.naturalHeight || containerHeight;

    const containerRatio = containerWidth / containerHeight;
    const imgRatio = imgWidth / imgHeight;

    let renderedWidth = containerWidth;
    let renderedHeight = containerHeight;

    if (imgRatio > containerRatio) {
      renderedHeight = containerWidth / imgRatio;
    } else {
      renderedWidth = containerHeight * imgRatio;
    }

    const scaledWidth = renderedWidth * s;
    const scaledHeight = renderedHeight * s;

    let clampedX = 0;
    if (scaledWidth > containerWidth) {
      const maxDragX = (scaledWidth - containerWidth) / 2;
      clampedX = Math.min(maxDragX, Math.max(-maxDragX, x));
    }

    let clampedY = 0;
    if (scaledHeight > containerHeight) {
      const maxDragY = (scaledHeight - containerHeight) / 2;
      clampedY = Math.min(maxDragY, Math.max(-maxDragY, y));
    }

    return { x: clampedX, y: clampedY };
  }, []);

  // Clamp position whenever scale or viewport size changes
  useEffect(() => {
    setPos((prev) => clampPosition(prev.x, prev.y, scale));
  }, [scale, clampPosition]);

  /* ── Колёсико мыши — только зум (отдаление на 1x возвращает в центр) ── */
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setScale((prev) => {
      const next = Math.min(7, Math.max(1, prev - e.deltaY * 0.002));
      if (next <= 1) {
        setPos({ x: 0, y: 0 });
        return 1;
      }
      return next;
    });
  }, []);

  /* Подключаем нативный wheel-listener с { passive: false } */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel, isFullscreen]);

  /* ── Управление мышью (Только ЛКМ для перемещения) ── */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return; // Только ЛКМ
    e.preventDefault();
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
    };
  }, [pos]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos(clampPosition(dragRef.current.originX + dx, dragRef.current.originY + dy, scale));
  }, [scale, clampPosition]);

  const handleMouseUp = useCallback(() => {
    dragRef.current.isDragging = false;
  }, []);

  /* ── Управление Touch (мобильная браузерная версия) ── */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      // Одиночное касание — перетаскивание карты
      if (scale <= 1 && !isFullscreen) return; // Разрешаем скролл страницы, если не приближено
      dragRef.current = {
        isDragging: true,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        originX: pos.x,
        originY: pos.y,
      };
    } else if (e.touches.length === 2) {
      // Два касания — пинч-зум
      e.preventDefault();
      dragRef.current.isDragging = false;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      pinchRef.current = {
        isPinching: true,
        startDist: dist,
        startScale: scale,
      };
    }
  }, [scale, pos, isFullscreen]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (pinchRef.current.isPinching && e.touches.length === 2) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const newScale = Math.min(7, Math.max(1, pinchRef.current.startScale * (dist / pinchRef.current.startDist)));
      setScale(newScale);
      if (newScale <= 1) {
        setPos({ x: 0, y: 0 });
      } else {
        setPos((prev) => clampPosition(prev.x, prev.y, newScale));
      }
    } else if (dragRef.current.isDragging && e.touches.length === 1) {
      if (scale > 1 || isFullscreen) {
        e.preventDefault();
        const dx = e.touches[0].clientX - dragRef.current.startX;
        const dy = e.touches[0].clientY - dragRef.current.startY;
        setPos(clampPosition(dragRef.current.originX + dx, dragRef.current.originY + dy, scale));
      }
    }
  }, [scale, isFullscreen, clampPosition]);

  const handleTouchEnd = useCallback(() => {
    dragRef.current.isDragging = false;
    pinchRef.current.isPinching = false;
  }, []);

  /* ── Функции тулбара ── */
  const resetMap = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, []);

  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(7, prev + 0.6));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => {
      const next = Math.max(1, prev - 0.6);
      if (next <= 1) {
        setPos({ x: 0, y: 0 });
        return 1;
      }
      return next;
    });
  }, []);

  // Блокируем скролл тела страницы в полноэкранном режиме
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFullscreen]);

  if (!mapData) {
    return (
      <Layout theme={lorTheme}>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1
            className="text-4xl font-bold mb-4"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: lorTheme.parchment,
            }}
          >
            Карта не найдена
          </h1>
          <p
            className="text-lg italic"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: lorTheme.parchmentDim,
            }}
          >
            По этому пути ещё не проложено летописи.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout theme={lorTheme} particleCount={15} overlayMode={isFullscreen}>
      <div className={isFullscreen ? 'p-0' : 'max-w-[1200px] mx-auto px-4 md:px-8 pb-20 pt-16'}>
        {/* Header (только если не в полноэкранном режиме) */}
        {!isFullscreen && (
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pb-6 mb-6"
          >
            <h1
              className="text-2xl md:text-4xl font-bold tracking-[3px] mb-3"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                color: lorTheme.parchment,
                textShadow: '0 0 20px rgba(160,150,130,0.2), 0 2px 6px rgba(0,0,0,0.9)',
              }}
            >
              {mapData.title}
            </h1>
            <p
              className="text-sm md:text-base italic max-w-[560px] mx-auto leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: lorTheme.parchmentDim,
              }}
            >
              {mapData.description}
            </p>
            <p
              className="text-xs mt-3 opacity-80"
              style={{
                fontFamily: "'Cinzel', serif",
                color: lorTheme.parchmentDim,
                letterSpacing: '1px',
              }}
            >
              {isMobile
                ? 'Кнопки + / - или щипок для масштаба · Свайп для перемещения'
                : 'Колёсико мыши — масштаб · ЛКМ (удержание) — перемещение карты'}
            </p>
          </motion.header>
        )}

        {/* Главный контейнер карты */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          ref={containerRef}
          className={
            isFullscreen
              ? 'fixed inset-0 z-[850] w-screen h-screen overflow-hidden bg-[#0c0a08] flex items-center justify-center select-none'
              : 'relative w-full aspect-[16/10] md:aspect-[21/10] min-h-[440px] max-h-[78vh] overflow-hidden rounded-xl border-2 shadow-2xl bg-[#0c0a08] select-none cursor-grab active:cursor-grabbing'
          }
          style={{
            borderColor: isFullscreen ? 'transparent' : `${lorTheme.primaryGlow}50`,
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
          {/* Изображение карты */}
          <img
            src={mapData.image}
            alt={mapData.title}
            className="w-full h-full object-contain select-none pointer-events-none"
            draggable={false}
            style={{
              display: 'block',
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
              transition: dragRef.current.isDragging ? 'none' : 'transform 0.15s ease-out',
              transformOrigin: 'center center',
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement('div');
                placeholder.className = 'absolute inset-0 flex items-center justify-center bg-[#140f0a]/80 text-[#706850] italic p-8 text-center font-serif text-lg z-10';
                placeholder.innerHTML = `🗺️ Изображение карты будет добавлено позже.<br/>Ожидаемый файл: <code style="color:#8a7040">public/map_${mapId}.png</code>`;
                parent.appendChild(placeholder);
              }
            }}
          />

          {/* Плавающая панель управления (Тулбар) */}
          <div
            className="absolute bottom-4 right-4 z-30 flex items-center gap-1.5 bg-[#0c0a08]/92 p-2 rounded-xl border shadow-2xl backdrop-blur-md"
            style={{ borderColor: `${lorTheme.primary}60` }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <button
              onClick={resetMap}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#201912] hover:bg-[#30261c] active:scale-95 text-[#e6dec8] text-xs font-semibold tracking-wider transition-all border cursor-pointer"
              style={{ fontFamily: "'Cinzel', serif", borderColor: `${lorTheme.primary}40` }}
              title="Сбросить масштаб и позицию"
            >
              <span className="text-sm">🔄</span>
              <span className="hidden sm:inline">Сбросить</span>
            </button>

            <div className="h-4 w-[1px] mx-1" style={{ background: `${lorTheme.primary}40` }} />

            <button
              onClick={zoomOut}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#201912] hover:bg-[#30261c] active:scale-95 text-[#e6dec8] text-base font-bold transition-all border cursor-pointer"
              style={{ borderColor: `${lorTheme.primary}40` }}
              title="Отдалить"
            >
              -
            </button>

            <span
              className="text-xs font-mono px-1 min-w-[40px] text-center font-bold"
              style={{ color: lorTheme.primaryGlow }}
            >
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={zoomIn}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#201912] hover:bg-[#30261c] active:scale-95 text-[#e6dec8] text-base font-bold transition-all border cursor-pointer"
              style={{ borderColor: `${lorTheme.primary}40` }}
              title="Приблизить"
            >
              +
            </button>

            <div className="h-4 w-[1px] mx-1" style={{ background: `${lorTheme.primary}40` }} />

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#201912] hover:bg-[#30261c] active:scale-95 text-[#e6dec8] text-xs font-semibold tracking-wider transition-all border cursor-pointer"
              style={{ fontFamily: "'Cinzel', serif", borderColor: `${lorTheme.primary}40` }}
              title={isFullscreen ? 'Свернуть' : 'На весь экран'}
            >
              <span className="text-sm">{isFullscreen ? '✕' : '⛶'}</span>
              <span className="hidden sm:inline">{isFullscreen ? 'Свернуть' : 'На весь экран'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default MapPage;
