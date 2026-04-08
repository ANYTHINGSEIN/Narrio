import { useRef, useState } from 'react';
import { Plasma } from './Plasma';

export function PlasmaPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [width, setWidth] = useState(1450);
  const [height, setHeight] = useState(350);
  const [scale, setScale] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // We will grab the canvas element from the container
      const canvas = containerRef.current?.querySelector('canvas');
      if (!canvas) {
        alert('Canvas not found!');
        return;
      }
      
      // Create a temporary 2D canvas to combine the black background and the WebGL canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const ctx = tempCanvas.getContext('2d');
      if (!ctx) throw new Error('Could not get 2d context');
      
      // Fill with the black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      
      // Draw the WebGL canvas on top
      ctx.drawImage(canvas, 0, 0);
      
      const dataUrl = tempCanvas.toDataURL('image/png');
      
      const response = await fetch('/api/save-plasma', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: dataUrl }),
      });
      
      if (response.ok) {
        const data = await response.json();
        alert(`Successfully saved to ppt-asset/${data.filename}!`);
      } else {
        const error = await response.text();
        alert('Failed to save: ' + error);
      }
    } catch (err) {
      console.error(err);
      alert('Error saving image');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-auto bg-neutral-900 flex items-center justify-center">
      {/* Controls Panel */}
      <div className="fixed top-4 left-4 z-50 bg-black/80 p-6 rounded-2xl border border-white/10 flex flex-col gap-4 text-white shadow-2xl backdrop-blur-md">
        <h2 className="text-lg font-bold">Export Settings</h2>
        
        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/60">Width (px)</label>
          <input 
            type="number" 
            value={width} 
            onChange={e => setWidth(Number(e.target.value))}
            className="bg-white/10 border border-white/20 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/60">Height (px)</label>
          <input 
            type="number" 
            value={height} 
            onChange={e => setHeight(Number(e.target.value))}
            className="bg-white/10 border border-white/20 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/60">Scale (Resolution Multiplier)</label>
          <input 
            type="number" 
            step="0.1"
            value={scale} 
            onChange={e => setScale(Number(e.target.value))}
            className="bg-white/10 border border-white/20 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div className="text-xs text-white/40 mt-1">
          Output Resolution: {Math.round(width * scale)} x {Math.round(height * scale)} px
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="mt-2 w-full px-4 py-2 bg-primary text-white rounded-lg font-sans font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save image'}
        </button>
      </div>

      {/* Plasma Container */}
      <div 
        ref={containerRef} 
        className="relative bg-black shrink-0 shadow-2xl ring-1 ring-white/10"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Plasma
          color="#4800FF"
          style={{ backgroundColor: '#000000' }}
          speed={1}
          direction="forward"
          scale={1}
          opacity={1}
          mouseInteractive={false}
          dpr={scale}
        />
      </div>
    </div>
  );
}
