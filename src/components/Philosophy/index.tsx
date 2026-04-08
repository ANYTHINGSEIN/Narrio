import { Plasma } from '@/components/Plasma';

export function Philosophy() {
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#4800FF';

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        <Plasma
          color={primaryColor}
          speed={1}
          direction="forward"
          scale={0.65}
          opacity={1}
          mouseInteractive
        />
      </div>
    </div>
  );
}
