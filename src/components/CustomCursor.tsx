import { useEffect } from 'react';

// Custom cursor disabled - using system cursor
export function CustomCursor() {
  useEffect(() => {
    // Clean up any existing custom cursor styles
    const existingStyle = document.querySelector('[data-custom-cursor]');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Ensure system cursor is visible
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        cursor: auto !important;
      }
    `;
    style.setAttribute('data-custom-cursor', 'true');
    document.head.appendChild(style);

    return () => {
      // Keep the style in place
    };
  }, []);

  return null;
}
