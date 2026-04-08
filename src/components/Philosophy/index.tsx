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
      <div className="w-screen h-screen overflow-hidden bg-bg">
        {sections[isolatedSection - 1]}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {sections}
    </div>
  );
}
