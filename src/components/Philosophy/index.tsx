import { HeroSection } from './HeroSection';
import { TargetAudienceSection } from './TargetAudienceSection';
import { SolutionSection } from './SolutionSection';

export function Philosophy() {
  return (
    <div className="w-full min-h-screen bg-[#020202]">
      <HeroSection />
      <TargetAudienceSection />
      <SolutionSection />
    </div>
  );
}
