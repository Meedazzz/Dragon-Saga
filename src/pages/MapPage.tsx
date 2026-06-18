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
    setPos({
      x: dragRef.current.originX + dx,
      y: dragRef.current.originY + dy,
    });
  }, []);

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
      }
    } else if (dragRef.current.isDragging && e.touches.length === 1) {
      if (scale > 1 || isFullscreen) {
        e.preventDefault();
        const dx = e.touches[0].clientX - dragRef.current.startX;
        const dy = e.touches[0].clientY - dragRef.current.startY;
        setPos({
          x: dragRef.current.originX + dx,
          y: dragRef.current.originY + dy,
        });
      }
    }
  }, [scale, isFullscreen]);

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
            style
