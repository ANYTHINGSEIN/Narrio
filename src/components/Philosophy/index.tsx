import { Plasma } from '@/components/Plasma';

export function Philosophy() {
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#4800FF';

  return (
    <div className="w-full min-h-screen">
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <Plasma
          color={primaryColor}
          speed={1}
          direction="forward"
          scale={1}
          opacity={1}
          mouseInteractive
        />
      </div>
    </div>
  );
}
