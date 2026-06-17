import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { lorTheme } from '@/types/theme';

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

  /* ── Состояние для модального окна ── */
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragState = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  }>({ isDragging: false, startX: 0, startY: 0, originX: 0, originY: 0, moved: false });

  /* ── Состояние для инлайн-карты (зум колёсиком) ── */
  const [inlineScale, setInlineScale] = useState(1);
  const [inlinePos, setInlinePos] = useState({ x: 0, y: 0 });
  const inlineDrag = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({ isDragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const inlineContainerRef = useRef<HTMLDivElement>(null);

  const mapData = mapId ? mapsData[mapId] : undefined;

  /* ── Инлайн: колёсико мыши — приближение/отдаление ── */
  const handleInlineWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setInlineScale((prev) => {
      const next = Math.min(5, Math.max(1, prev - e.deltaY * 0.002));
      if (next <= 1) {
        setInlinePos({ x: 0, y: 0 });
        return 1;
      }
      return next;
    });
  }, []);

  /* Подключаем нативный wheel-listener с { passive: false } */
  useEffect(() => {
    const el = inlineContainerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleInlineWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleInlineWheel);
  }, [handleInlineWheel]);

  /* ── Инлайн: ЛКМ — открывает модалку (если не зумнуто) или сбрасывает зум ── */
  const handleInlineClick = useCallback(() => {
    if (inlineDrag.current.isDragging) return;
    if (inlineScale > 1) {
      setInlineScale(1);
      setInlinePos({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
    }
  }, [inlineScale]);

  /* ── Инлайн: перетаскивание при зуме (только ЛКМ) ── */
  const handleInlineMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return; // только ЛКМ
      if (inlineScale <= 1) return;
      e.preventDefault();
      inlineDrag.current = {
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        originX: inlinePos.x,
        originY: inlinePos.y,
      };
    },
    [inlineScale, inlinePos],
  );

  const handleInlineMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!inlineDrag.current.isDragging) return;
      const dx = e.clientX - inlineDrag.current.startX;
      const dy = e.clientY - inlineDrag.current.startY;
      setInlinePos({
        x: inlineDrag.current.originX + dx,
        y: inlineDrag.current.originY + dy,
      });
    },
    [],
  );

  const handleInlineMouseUp = useCallback(() => {
    inlineDrag.current.isDragging = false;
  }, []);

  /* ── Модалка: колёсико ── */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => {
      const next = Math.min(5, Math.max(1, prev - e.deltaY * 0.002));
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const toggleZoom = useCallback(() => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  }, [scale]);

  const closeModal = useCallback(() => {
    setIsZoomed(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

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
    <Layout theme={lorTheme} particleCount={15} overlayMode={isZoomed}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 pb-20 pt-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pb-8 mb-8"
        >
          <h1
            className="text-2xl md:text-4xl font-bold tracking-[3px] mb-3"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: lorTheme.parchment,
              textShadow:
                '0 0 20px rgba(160,150,130,0.2), 0 2px 6px rgba(0,0,0,0.9)',
            }}
          >
            {mapData.title}
          </h1>
          <p
            className="text-sm md:text-base italic max-w-[500px] mx-auto leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: lorTheme.parchmentDim,
            }}
          >
            {mapData.description}
          </p>
          <p
            className="text-xs mt-3"
            style={{
              fontFamily: "'Cinzel', serif",
              color: lorTheme.parchmentDim,
              letterSpacing: '1px',
            }}
          >
            Колёсико мыши — приблизить · ЛКМ — открыть / сбросить
          </p>
        </motion.header>

        {/* Inline Map Image (with scroll-zoom + LMB reset) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          ref={inlineContainerRef}
          className="overflow-hidden rounded"
          style={{
            border: `2px solid ${lorTheme.primaryGlow}40`,
            boxShadow: `0 8px 40px rgba(0,0,0,0.5)`,
            cursor: inlineScale > 1 ? 'grab' : 'zoom-in',
          }}
          onClick={handleInlineClick}
          onMouseDown={handleInlineMouseDown}
          onMouseMove={handleInlineMouseMove}
          onMouseUp={handleInlineMouseUp}
          onMouseLeave={handleInlineMouseUp}
          onContextMenu={(e) => e.preventDefault()}
        >
          <img
            src={mapData.image}
            alt={mapData.title}
            className="w-full h-auto select-none"
            draggable={false}
            style={{
              display: 'block',
              transform: `translate(${inlinePos.x}px, ${inlinePos.y}px) scale(${inlineScale})`,
              transition: inlineDrag.current.isDragging
                ? 'none'
                : 'transform 0.2s ease-out',
              transformOrigin: 'center center',
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div style="display:flex;align-items:center;justify-content:center;min-height:400px;background:rgba(20,15,10,0.4);color:#706850;font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-style:italic;padding:40px;text-align:center;">
                    🗺️ Изображение карты будет добавлено позже.<br/>
                    Ожидаемый файл: <code style="color:#8a7040">public/map_${mapId}.png</code>
                  </div>
                `;
              }
            }}
          />
        </motion.div>

        {/* Zoomed Modal */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-[700] flex items-center justify-center p-4 overflow-hidden"
              onClick={() => {
                if (dragState.current.moved) {
                  dragState.current.moved = false;
                  return;
                }
                closeModal();
              }}
              onWheel={handleWheel}
              onMouseDown={(e) => {
                if (e.button !== 0) return;
                dragState.current = {
                  isDragging: true,
                  startX: e.clientX,
                  startY: e.clientY,
                  originX: position.x,
                  originY: position.y,
                  moved: false,
                };
              }}
              onMouseMove={(e) => {
                if (!dragState.current.isDragging) return;
                const dx = e.clientX - dragState.current.startX;
                const dy = e.clientY - dragState.current.startY;
                if (Math.abs(dx) > 3 || Math.abs(dy) > 3)
                  dragState.current.moved = true;
                setPosition({
                  x: dragState.current.originX + dx,
                  y: dragState.current.originY + dy,
                });
              }}
              onMouseUp={() => {
                dragState.current.isDragging = false;
              }}
              onMouseLeave={() => {
                dragState.current.isDragging = false;
              }}
            >
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                src={mapData.image}
                alt={mapData.title}
                className="max-w-full max-h-full object-contain select-none"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transition: dragState.current.isDragging
                    ? 'none'
                    : 'transform 0.2s ease-out',
                  cursor: scale > 1 ? 'grab' : 'zoom-in',
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!dragState.current.moved) toggleZoom();
                  dragState.current.moved = false;
                }}
                draggable={false}
              />
              <button
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/60 text-white text-3xl flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                onClick={closeModal}
              >
                &times;
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default MapPage;
