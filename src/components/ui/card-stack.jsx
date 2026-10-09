import { useEffect, useRef, useState } from 'react';
import './card-stack.css';

function wrapIndex(index, length) {
  return length ? ((index % length) + length) % length : 0;
}

function getOffset(index, active, length, loop) {
  const offset = index - active;
  if (!loop || length <= 1) return offset;
  const wrappedOffset = offset > 0 ? offset - length : offset + length;
  return Math.abs(wrappedOffset) < Math.abs(offset) ? wrappedOffset : offset;
}

export function CardStack({
  items,
  initialIndex = 0,
  maxVisible = 5,
  cardWidth = 520,
  cardHeight = 340,
  overlap = 0.48,
  spreadDeg = 42,
  depthPx = 90,
  activeLiftPx = 18,
  activeScale = 1.02,
  inactiveScale = 0.94,
  springDuration = 560,
  loop = true,
  autoAdvance = false,
  intervalMs = 4500,
  pauseOnHover = true,
  showDots = true,
  className = '',
  onChangeIndex,
  renderCard,
}) {
  const [active, setActive] = useState(() => wrapIndex(initialIndex, items.length));
  const [hovering, setHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const stageRef = useRef(null);
  const pointerRef = useRef(null);
  const ignoreClickRef = useRef(false);
  const length = items.length;
  const visibleOffset = Math.floor(maxVisible / 2);
  const actualCardWidth = Math.min(cardWidth, Math.max(260, stageWidth * 0.78));
  const cardSpacing = Math.max(10, Math.round(actualCardWidth * (1 - overlap)));
  const angleStep = visibleOffset ? spreadDeg / visibleOffset : 0;

  useEffect(() => {
    setActive((current) => wrapIndex(current, length));
  }, [length]);

  useEffect(() => {
    if (length) onChangeIndex?.(active, items[active]);
  }, [active, items, length, onChangeIndex]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const measure = () => setStageWidth(stage.getBoundingClientRect().width);
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener?.('change', updatePreference);
    return () => preference.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    if (!autoAdvance || reducedMotion || !length || (pauseOnHover && hovering)) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => loop ? wrapIndex(current + 1, length) : Math.min(current + 1, length - 1));
    }, Math.max(1200, intervalMs));
    return () => window.clearInterval(timer);
  }, [active, autoAdvance, intervalMs, length, loop, pauseOnHover, reducedMotion, hovering]);

  if (!length) return null;

  const goTo = (index) => setActive(wrapIndex(index, length));
  const previous = () => {
    if (loop || active > 0) goTo(active - 1);
  };
  const next = () => {
    if (loop || active < length - 1) goTo(active + 1);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') previous();
    if (event.key === 'ArrowRight') next();
  };
  const handlePointerDown = (event, isActive) => {
    if (!isActive || event.button !== 0) return;
    pointerRef.current = { x: event.clientX, id: event.pointerId };
    ignoreClickRef.current = false;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const handlePointerMove = (event) => {
    if (!pointerRef.current || pointerRef.current.id !== event.pointerId) return;
    setDragOffset(Math.max(-actualCardWidth * 0.45, Math.min(actualCardWidth * 0.45, event.clientX - pointerRef.current.x)));
  };
  const handlePointerUp = (event) => {
    if (!pointerRef.current || pointerRef.current.id !== event.pointerId) return;
    const distance = event.clientX - pointerRef.current.x;
    const threshold = actualCardWidth * 0.2;
    ignoreClickRef.current = Math.abs(distance) > threshold;
    pointerRef.current = null;
    setDragOffset(0);
    if (distance > threshold) previous();
    else if (distance < -threshold) next();
  };

  return (
    <div
      className={`card-stack ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="card-stack-stage"
        ref={stageRef}
        style={{ height: `max(370px, ${cardHeight + 76}px)` }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Project showcase. Use the left and right arrow keys to change projects."
      >
        <div className="card-stack-wash" aria-hidden="true" />
        <div className="card-stack-plane">
          {items.map((item, index) => {
            const offset = getOffset(index, active, length, loop);
            const distance = Math.abs(offset);
            const isActive = offset === 0;
            if (distance > visibleOffset) return null;

            const x = offset * cardSpacing + (isActive ? dragOffset : 0);
            const y = distance * 12 + (isActive ? -activeLiftPx : 0);
            const rotation = offset * angleStep;
            const scale = isActive ? activeScale : inactiveScale;
            const depth = -distance * depthPx;

            return (
              <div
                className={`card-stack-card${isActive ? ' is-active' : ''}`}
                key={item.id ?? item.category ?? index}
                style={{
                  width: actualCardWidth,
                  height: cardHeight,
                  zIndex: 100 - distance,
                  opacity: isActive ? 1 : 0.78,
                  transitionDuration: reducedMotion ? '0ms' : `${springDuration}ms`,
                  transform: `translate3d(calc(-50% + ${x}px), ${y}px, ${depth}px) rotateX(${isActive ? 0 : 8}deg) rotateZ(${rotation}deg) scale(${scale})`,
                }}
                onClick={() => {
                  if (ignoreClickRef.current) {
                    ignoreClickRef.current = false;
                    return;
                  }
                  goTo(index);
                }}
                onPointerDown={(event) => handlePointerDown(event, isActive)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                aria-current={isActive ? 'true' : undefined}
              >
                {renderCard ? renderCard(item, { active: isActive }) : (
                  <div className="card-stack-default-card">
                    <strong>{item.title}</strong>
                    {item.description && <p>{item.description}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="card-stack-controls">
        <button className="card-stack-arrow" type="button" onClick={previous} aria-label="Previous project">‹</button>
        {showDots && (
          <div className="card-stack-dots" aria-label="Choose a project">
            {items.map((item, index) => (
              <button
                className={`card-stack-dot${index === active ? ' is-active' : ''}`}
                key={item.id ?? item.category ?? index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show ${item.title}`}
                aria-pressed={index === active}
              />
            ))}
          </div>
        )}
        <span className="card-stack-status" aria-live="polite">{items[active]?.title}</span>
        <button className="card-stack-arrow" type="button" onClick={next} aria-label="Next project">›</button>
      </div>
    </div>
  );
}