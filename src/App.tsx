import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Explore } from './components/Explore';
import { Generate } from './components/Generate';
import { Philosophy } from './components/Philosophy';

type Tab = 'explore' | 'philosophy';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('explore');
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-white font-serif selection:bg-primary/30">
      {/* Main Content Area */}
      <main>
        {activeTab === 'explore' && <Explore />}
        {activeTab === 'philosophy' && <Philosophy />}
      </main>

      <AnimatePresence>
        {isGenerateOpen && <Generate onClose={() => setIsGenerateOpen(false)} />}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-4 z-40 md:bottom-8 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[400px]">
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl" />
        <div className="relative flex justify-around items-center px-6 py-2 w-full">
          <button 
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'explore' ? 'text-primary' : 'text-white/40'}`}
          >
            <div className="w-8 h-8 bg-current" style={{ WebkitMaskImage: 'url(/explore.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/explore.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} />
            <span className="text-[10px] font-sans font-medium uppercase tracking-wider">Explore</span>
          </button>
          
          <button 
            onClick={() => setIsGenerateOpen(true)}
            className="relative -top-6 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(72,0,255,0.4)] transition-transform active:scale-95"
          >
            <div className="w-[3.5rem] h-[3.5rem] bg-current" style={{ WebkitMaskImage: 'url(/plus.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/plus.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} />
          </button>
          
          <button 
            onClick={() => setActiveTab('philosophy')}
            className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'philosophy' ? 'text-primary' : 'text-white/40'}`}
          >
            <div className="w-8 h-8 bg-current" style={{ WebkitMaskImage: 'url(/philosophy.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/philosophy.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} />
            <span className="text-[10px] font-sans font-medium uppercase tracking-wider">Philosophy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
