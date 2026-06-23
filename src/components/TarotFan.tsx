import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tarotCards } from '@/data/tarot';
import { applyImageFallback } from '@/lib/imageFallback';
import { X, RotateCcw, Eye, EyeOff } from 'lucide-react';

interface TarotFanProps {
  onExpandedChange?: (card: typeof tarotCards[0] | null) => void;
}

const TarotFan: React.FC<TarotFanProps> = ({ onExpandedChange }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
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
      setFlippedCards(prev => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    } else {
      setSelectedIndex(index);
      setFlippedCards(new Set());
      onExpandedChange?.(tarotCards[index]);
    }
  };

  const handleClose = () => {
    setSelectedIndex(null);
    setFlippedCards(new Set());
    onExpandedChange?.(null);
  };

  const handleFlipAll = () => {
    if (flippedCards.size === tarotCards.length) {
      setFlippedCards(new Set());
    } else {
      setFlippedCards(new Set(tarotCards.map((_, i) => i)));
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

  // Calculate card positions in fan
  const getCardStyle = (index: number, total: number) => {
    const isSelected = selectedIndex === index;
    const isHovered = hoveredIndex === index;

    // Fan arc calculation
    const arcAngle = 35; // degrees for the fan spread
    const angleStep = arcAngle / (total - 1);
    const baseAngle = -arcAngle / 2 + index * angleStep;

    // Apply scroll offset
    const scrollFactor = scrollOffset * 0.15;
    const adjustedAngle = baseAngle + scrollFactor;

    const radius = 280;
    const rad = (adjustedAngle * Math.PI) / 180;

    // 3D positioning
    const x = Math.sin(rad) * radius * 0.5;
    const y = Math.abs(Math.cos(rad)) * 20;
    const z = isSelected ? 100 : isHovered ? 50 : 0;
    const rotateY = adjustedAngle * 0.6;
    const rotateZ = adjustedAngle * 0.3;

    return {
      transform: isSelected 
        ? `translateX(-50%) translateY(-50%) translateZ(${z}px) scale(1.15) rotateY(0deg) rotateZ(0deg)`
        : `translateX(calc(-50% + ${x}px)) translateY(${-y}px) translateZ(${z}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
      zIndex: isSelected ? 100 : isHovered ? 50 : total - Math.abs(index - (total / 2)),
      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    };
  };

  return (
    <div className="tarot-fan-wrapper">
      {/* Controls */}
      <div className="tarot-fan-controls">
        <button onClick={handleFlipAll} className="tarot-fan-btn" type="button">
          {flippedCards.size === tarotCards.length ? <EyeOff size={16} /> : <Eye size={16} />}
          <span>{flippedCards.size === tarotCards.length ? 'Скрыть все' : 'Показать все'}</span>
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
            const isFlipped = flippedCards.has(index);
            const style = getCardStyle(index, tarotCards.length);

            return (
              <motion.div
                key={card.id}
                className={`tarot-fan-card ${isSelected ? 'selected' : ''} ${isFlipped ? 'flipped' : ''}`}
                style={style}
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 100, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
              >
                <div className="tarot-card-inner">
                  {/* Front (Face) */}
                  <div className="tarot-card-face">
                    <img 
                      src={`${BASE}${card.tarot}`} 
                      alt={card.name}
                      loading="lazy"
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
                      src={`${BASE}shirt.png`} 
                      alt="Рубашка"
                      draggable={false}
                      onError={applyImageFallback}
                    />
                    <div className="tarot-card-back-pattern">
                      <div className="ouroboros-mini" />
                    </div>
                  </div>
                </div>
              </motion.div>
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

              <div className={`tarot-detail-card ${flippedCards.has(selectedIndex) ? 'flipped' : ''}`}>
                <div className="tarot-card-inner">
                  <div className="tarot-card-face">
                    <img 
                      src={`${BASE}${tarotCards[selectedIndex].tarot}`} 
                      alt={tarotCards[selectedIndex].name}
                      draggable={false}
                      onError={applyImageFallback}
                    />
                  </div>
                  <div className="tarot-card-back">
                    <img 
                      src={`${BASE}shirt.png`} 
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

                <button 
                  className="tarot-flip-btn"
                  onClick={() => {
                    setFlippedCards(prev => {
                      const next = new Set(prev);
                      if (next.has(selectedIndex)) next.delete(selectedIndex);
                      else next.add(selectedIndex);
                      return next;
                    });
                  }}
                  type="button"
                >
                  {flippedCards.has(selectedIndex) ? <Eye size={18} /> : <EyeOff size={18} />}
                  {flippedCards.has(selectedIndex) ? 'Показать лицо' : 'Показать рубашку'}
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
