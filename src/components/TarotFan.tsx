import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { tarotBackImage, tarotCards } from '@/data/tarot';
import { applyImageFallback } from '@/lib/imageFallback';
import { X, RotateCcw, Eye, EyeOff } from 'lucide-react';

interface TarotFanProps {
  onExpandedChange?: (card: typeof tarotCards[0] | null) => void;
}

/**
 * TarotFan — интерактивная веерная колода.
 *
 * Важно:
 * - `card.tarot` уже содержит BASE_URL, поэтому нельзя добавлять BASE второй раз;
 * - рубашка берётся из `tarotBackImage`;
 * - при ошибке WebP срабатывает `applyImageFallback` и подставляет PNG.
 */
const TarotFan: React.FC<TarotFanProps> = ({ onExpandedChange }) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const BASE = import.meta.env.BASE_URL;

  const handleCardClick = (index: number) => {
    if (isDragging) return;
    if (selectedIndex === index) {
      // Flip the card
      setFlippedCards((previous) => previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]);
    } else {
      setSelectedIndex(index);
      setFlippedCards([]);
      onExpandedChange?.(tarotCards[index]);
    }
  };

  const handleClose = () => {
    setSelectedIndex(null);
    setFlippedCards([]);
    onExpandedChange?.(null);
  };

  const handleFlipAll = () => {
    if (flippedCards.length === tarotCards.length) {
      setFlippedCards([]);
    } else {
      setFlippedCards(tarotCards.map((_, index) => index));
    }
  };

  // Mouse drag for scrolling through fan
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false);
    setDragStartX(e.clientX - scrollOffset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    const newOffset = e.clientX - dragStartX;
    if (Math.abs(newOffset - scrollOffset) > 5) {
      setIsDragging(true);
    }
    setScrollOffset(newOffset);
  };

  const handleMouseUp = () => {
    setTimeout(() => setIsDragging(false), 50);
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(false);
    setDragStartX(e.touches[0].clientX - scrollOffset);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const newOffset = e.touches[0].clientX - dragStartX;
    if (Math.abs(newOffset - scrollOffset) > 5) {
      setIsDragging(true);
    }
    setScrollOffset(newOffset);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsDragging(false), 50);
  };

  // Calculate card positions in fan.
  // Карты должны реально раскрываться веером, а не лежать почти в одной точке.
  // Поэтому используем не синус с маленькой амплитудой, а понятный шаг по X,
  // который адаптируется под ширину устройства.
  const getCardStyle = (index: number, total: number) => {
    const isHovered = hoveredIndex === index;
    const center = (total - 1) / 2;
    const distanceFromCenter = index - center;
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const spread = viewportWidth < 480 ? 72 : viewportWidth < 768 ? 96 : viewportWidth < 1024 ? 126 : 156;
    const dragOffset = Math.max(-140, Math.min(140, scrollOffset * 0.22));

    const x = distanceFromCenter * spread + dragOffset;
    const y = Math.abs(distanceFromCenter) * 24;
    const z = isHovered ? 56 : 0;
    const rotateY = distanceFromCenter * -5 + dragOffset * 0.018;
    const rotateZ = distanceFromCenter * 6 + dragOffset * 0.014;
    const scale = isHovered ? 1.045 : 1;

    return {
      transform: `translateX(calc(-50% + ${x}px)) translateY(${-y}px) translateZ(${z}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
      zIndex: isHovered ? 80 : 30 - Math.abs(distanceFromCenter),
      transition: 'all 0.62s cubic-bezier(0.2, 0.86, 0.22, 1)',
    };
  };

  return (
    <div className="tarot-fan-wrapper">
      {/* Controls */}
      <div className="tarot-fan-controls">
        <button onClick={handleFlipAll} className="tarot-fan-btn" type="button">
          {flippedCards.length === tarotCards.length ? <EyeOff size={16} /> : <Eye size={16} />}
          <span>{flippedCards.length === tarotCards.length ? 'Скрыть все' : 'Показать все'}</span>
        </button>
        <button onClick={handleClose} className="tarot-fan-btn" type="button" disabled={selectedIndex === null}>
          <RotateCcw size={16} />
          <span>Сбросить</span>
        </button>
      </div>

      {/* Fan Container */}
      <div 
        ref={containerRef}
        className="tarot-fan-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="tarot-fan-stage">
          {tarotCards.map((card, index) => {
            const isSelected = selectedIndex === index;
            const isFlipped = flippedCards.includes(index);
            const style = getCardStyle(index, tarotCards.length);

            return (
              <div
                key={card.id}
                className={`tarot-fan-card ${isSelected ? 'selected' : ''} ${isFlipped ? 'flipped' : ''}`}
                style={style}
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="tarot-card-inner">
                  {/* Front (Face) */}
                  <div className="tarot-card-face">
                    <img 
                      src={card.tarot} 
                      alt={card.name}
                      loading="eager"
                      draggable={false}
                      onError={applyImageFallback}
                    />
                    <div className="tarot-card-info">
                      <h4>{card.name}</h4>
                      <span>{card.title}</span>
                    </div>
                  </div>

                  {/* Back (Shirt) */}
                  <div className="tarot-card-back">
                    <img 
                      src={tarotBackImage} 
                      alt="Рубашка"
                      draggable={false}
                      onError={applyImageFallback}
                    />
                    <div className="tarot-card-back-pattern">
                      <div className="ouroboros-mini" style={{ backgroundImage: `url(${BASE}ouroboros.png)` }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Card Detail Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            className="tarot-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div 
              className="tarot-detail-content"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="tarot-detail-close" onClick={handleClose} type="button">
                <X size={24} />
              </button>

              <div className={`tarot-detail-card ${flippedCards.includes(selectedIndex) ? 'flipped' : ''}`}>
                <div className="tarot-card-inner">
                  <div className="tarot-card-face">
                    <img 
                      src={tarotCards[selectedIndex].tarot} 
                      alt={tarotCards[selectedIndex].name}
                      draggable={false}
                      onError={applyImageFallback}
                    />
                  </div>
                  <div className="tarot-card-back">
                    <img 
                      src={tarotBackImage} 
                      alt="Рубашка"
                      draggable={false}
                      onError={applyImageFallback}
                    />
                  </div>
                </div>
              </div>

              <div className="tarot-detail-info">
                <h2>{tarotCards[selectedIndex].name}</h2>
                <p className="tarot-detail-title">{tarotCards[selectedIndex].title}</p>
                <p className="tarot-detail-desc">{tarotCards[selectedIndex].desc}</p>

                <div className="tarot-detail-actions">
                  <button
                    type="button"
                    className="tarot-link-action"
                    onClick={() => navigate(tarotCards[selectedIndex].lorePath)}
                  >
                    Полный лор
                  </button>
                  {tarotCards[selectedIndex].pages.slice(0, 2).map((page) => (
                    <button
                      key={page.path}
                      type="button"
                      className="tarot-link-action tarot-link-action--muted"
                      onClick={() => navigate(page.path)}
                    >
                      {page.label}
                    </button>
                  ))}
                </div>

                <button 
                  className="tarot-flip-btn"
                  onClick={() => {
                    setFlippedCards((previous) => previous.includes(selectedIndex)
                      ? previous.filter((item) => item !== selectedIndex)
                      : [...previous, selectedIndex]);
                  }}
                  type="button"
                >
                  {flippedCards.includes(selectedIndex) ? <Eye size={18} /> : <EyeOff size={18} />}
                  {flippedCards.includes(selectedIndex) ? 'Показать лицо' : 'Показать рубашку'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll hint */}
      <div className="tarot-scroll-hint">
        <span>Перетащите для прокрутки</span>
        <div className="scroll-indicator" />
      </div>
    </div>
  );
};

export default TarotFan;
