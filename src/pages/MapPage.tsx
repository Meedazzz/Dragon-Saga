import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { lorTheme } from '@/types/theme';
import { useIsMobile } from '@/hooks/use-mobile';

const BASE_URL = import.meta.env.BASE_URL;

const mapsData: Record<string, { title: string; image: string; description: string; aspect: string }> = {
  sever: { title: 'Карта Севера', image: `${BASE_URL}map_sever.jpg`, description: 'Карта северных земель — от ледяных пустошей до горных хребтов Бергхейма.', aspect: '2400 / 1123' },
  northwind: { title: 'Карта Нортвинда', image: `${BASE_URL}map_northwind.jpg`, description: 'Карта Нортвинда — оплота севера и его окрестностей.', aspect: '2560 / 1396' },
};

const MapPage: React.FC = () => {
  const { mapId } = useParams<{ mapId: string }>();
  const isMobile = useIsMobile();
  const mapData = mapId ? mapsData[mapId] : undefined;

  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imgNatural, setImgNatural] = useState<{ w: number; h: number } | null>(null);

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
    return { x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) };
  }, [imgNatural]);

  useEffect(() => { setPos(prev => clampPosition(prev.x, prev.y, scale)); }, [scale, clampPosition]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setScale(prev => {
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
      else setPos(prev => clampPosition(prev.x, prev.y, newScale));
    } else if (dragRef.current.isDragging && e.touches.length === 1 && scale > 1) {
      e.preventDefault();
      const dx = e.touches[0].clientX - dragRef.current.startX;
      const dy = e.touches[0].clientY - dragRef.current.startY;
      setPos(clampPosition(dragRef.current.originX + dx, dragRef.current.originY + dy, scale));
    }
  }, [scale, clampPosition]);

  const handleTouchEnd = useCallback(() => { dragRef.current.isDragging = false; pinchRef.current.isPinching = false; }, []);
  const resetMap = useCallback(() => { setScale(1); setPos({ x: 0, y: 0 }); }, []);
  const zoomIn = useCallback(() => setScale(p => Math.min(6, p * 1.25)), []);
  const zoomOut = useCallback(() => setScale(p => { const n = Math.max(1, p / 1.25); if (n <= 1.01) { setPos({ x: 0, y: 0 }); return 1; } return n; }), []);

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isFullscreen]);

  if (!mapData) {
    return (
      <Layout theme={lorTheme}>
        <div className="tome-page">
          <h1 className="tome-title">Карта не найдена</h1>
          <p className="tome-lead">По этому пути ещё не проложено летописи.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout theme={lorTheme}>
      <div className="map-page">
        {!isFullscreen && (
          <header className="map-header">
            <h1 className="map-title">{mapData.title}</h1>
            <p className="map-lead">{mapData.description}</p>
            <p className="map-hint">
              {isMobile ? 'Кнопки + / − или щипок — масштаб · Свайп — перемещение' : 'Колёсико — масштаб · ЛКМ — перемещение'}
            </p>
          </header>
        )}

        <div
          ref={containerRef}
          className="map-frame"
          style={{
            aspectRatio: mapData.aspect,
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
          onContextMenu={e => e.preventDefault()}
        >
          <img
            src={mapData.image}
            alt={mapData.title}
            onLoad={e => { const img = e.currentTarget; setImgNatural({ w: img.naturalWidth, h: img.naturalHeight }); }}
            className="map-img"
            draggable={false}
          />
        </div>

        <div className="map-toolbar">
          <button onClick={resetMap} className="map-tool-btn tarot-no-glow">Сброс</button>
          <button onClick={zoomOut} className="map-tool-btn tarot-no-glow">−</button>
          <span className="map-tool-scale">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="map-tool-btn tarot-no-glow">+</button>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="map-tool-btn tarot-no-glow">
            {isFullscreen ? 'Выйти' : 'Экран'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MapPage;
