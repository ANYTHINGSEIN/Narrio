import { useEffect, useState } from 'react';
import { Section1 } from './Section1';
import { Section2 } from './Section2';
import { Section3 } from './Section3';
import { Section4 } from './Section4';
import { Section5 } from './Section5';

export function Philosophy() {
  const [isolatedSection, setIsolatedSection] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section) {
      setIsolatedSection(parseInt(section, 10));
    }
  }, []);

  const sections = [
    <Section1 key="1" />,
    <Section2 key="2" />,
    <Section3 key="3" />,
    <Section4 key="4" />,
    <Section5 key="5" />
  ];

  if (isolatedSection !== null && isolatedSection > 0 && isolatedSection <= sections.length) {
    return (
      <div className="w-screen h-screen overflow-hidden bg-bg p-[clamp(1rem,4vw,2rem)] box-border">
        <div className="w-full h-full relative rounded-[clamp(1rem,3vw,2.5rem)] border border-white/10 overflow-hidden bg-white/5">
          {sections[isolatedSection - 1]}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-[clamp(1rem,4vw,2rem)] box-border bg-bg">
      <div className="flex flex-col w-full relative rounded-[clamp(1rem,3vw,2.5rem)] border border-white/10 overflow-hidden bg-white/5">
        {sections}
      </div>
    </div>
  );
}
