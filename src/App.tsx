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
      <div className="fixed bottom-0 left-0 right-0 z-40 pb-safe">
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-xl border-t border-white/5" />
        <div className="relative flex justify-around items-center px-6 py-3 max-w-md mx-auto w-full">
          <button 
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center space-y-1.5 transition-colors ${activeTab === 'explore' ? 'text-primary' : 'text-white/40'}`}
          >
            <div className="w-12 h-12 bg-current" style={{ WebkitMaskImage: 'url(/explore.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/explore.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} />
            <span className="text-[10px] font-sans font-medium uppercase tracking-wider">Explore</span>
          </button>
          
          <button 
            onClick={() => setIsGenerateOpen(true)}
            className="relative -top-8 flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(72,0,255,0.4)] transition-transform active:scale-95"
          >
            <div className="w-[4.5rem] h-[4.5rem] bg-current" style={{ WebkitMaskImage: 'url(/plus.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/plus.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} />
          </button>
          
          <button 
            onClick={() => setActiveTab('philosophy')}
            className={`flex flex-col items-center space-y-1.5 transition-colors ${activeTab === 'philosophy' ? 'text-primary' : 'text-white/40'}`}
          >
            <div className="w-12 h-12 bg-current" style={{ WebkitMaskImage: 'url(/philosophy.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/philosophy.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} />
            <span className="text-[10px] font-sans font-medium uppercase tracking-wider">Philosophy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
