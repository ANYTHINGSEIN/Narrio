import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [clickEffect, setClickEffect] = useState<{ id: number; x: number; y: number } | null>(null);

  useEffect(() => {
    // Check if device supports hover/has mouse
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasMouse) return;

    // Add global styles to hide default cursor
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    let clickId = 0;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(prev => !prev ? true : prev);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      setClickEffect({ id: clickId++, x: e.clientX, y: e.clientY });
      
      // Clear click effect after animation finishes
      setTimeout(() => {
        setClickEffect(null);
      }, 500);
    };
    
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Don't render on mobile/touch devices
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 50,
          mass: 0.1,
          x: { duration: 0 }, // Follow cursor instantly
          y: { duration: 0 },
        }}
        style={{
          // Use style for opacity to avoid layout thrashing
          opacity: isVisible ? 1 : 0,
          // Shift slightly to align the top-left tip of the SVG with the actual cursor position
          marginLeft: '-4px',
          marginTop: '-4px',
        }}
      >
        <motion.img
          src="/cursor.svg"
          alt="cursor"
          className="w-[58px] h-auto brightness-0 invert"
          initial={{ rotate: 0 }}
          animate={{ rotate: -25 }} // Tilt left
          transition={{ duration: 0 }}
          style={{ transformOrigin: 'top left' }}
        />
      </motion.div>

      {/* Click Ripple Effect */}
      <AnimatePresence>
        {clickEffect && (
          <motion.div
            key={clickEffect.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9998] w-12 h-12 rounded-full border-2 border-white mix-blend-difference"
            style={{
              left: clickEffect.x - 24, // Center the ripple
              top: clickEffect.y - 24,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
