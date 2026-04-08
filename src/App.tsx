import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Explore } from './components/Explore';
import { Generate } from './components/Generate';
import { Philosophy } from './components/Philosophy/index';
import { PlasmaPage } from './components/PlasmaPage';

type Tab = 'explore' | 'philosophy';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('explore');
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  // If we are on the /plasma route, just render the plasma page
  if (typeof window !== 'undefined' && window.location.pathname === '/plasma') {
    return <PlasmaPage />;
  }

  const isIsolatedSection = new URLSearchParams(window.location.search).has('section');

  // If in isolated section mode, we force the active tab to philosophy and hide navigation
  if (isIsolatedSection) {
    return (
      <div className="min-h-screen bg-bg text-white font-serif selection:bg-primary/30">
        <Philosophy />
      </div>
    );
  }

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
            className="relative flex flex-col items-center space-y-1"
          >
            {activeTab === 'explore' && (
              <div className="absolute top-1 w-6 h-6 bg-primary/80 blur-md rounded-full" />
            )}
            <div className={`relative z-10 w-8 h-8 transition-colors ${activeTab === 'explore' ? 'bg-primary' : 'bg-white/40'}`} style={{ WebkitMaskImage: 'url(/explore.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/explore.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} />
            <span className={`relative z-10 text-[10px] font-sans font-medium uppercase tracking-wider transition-colors ${activeTab === 'explore' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/40'}`}>Explore</span>
          </button>
          
          <div className="relative w-12 h-10 flex items-center justify-center">
            {/* Glow effect */}
            <div className="absolute -top-6 w-[62px] h-[62px] rounded-full bg-primary/80 blur-2xl animate-pulse scale-125" />
            
            <button 
              onClick={() => setIsGenerateOpen(true)}
              className="absolute -top-6 flex items-center justify-center w-[62px] h-[62px] rounded-full bg-primary text-white shadow-[0_0_35px_rgba(72,0,255,0.8)] transition-transform active:scale-95 z-10"
            >
              <div className="w-[4.2rem] h-[4.2rem] bg-current" style={{ WebkitMaskImage: 'url(/plus.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/plus.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} />
            </button>
          </div>
          
          <button 
            onClick={() => setActiveTab('philosophy')}
            className="relative flex flex-col items-center space-y-1"
          >
            {activeTab === 'philosophy' && (
              <div className="absolute top-1 w-6 h-6 bg-primary/80 blur-md rounded-full" />
            )}
            <div className={`relative z-10 w-8 h-8 transition-colors ${activeTab === 'philosophy' ? 'bg-primary' : 'bg-white/40'}`} style={{ WebkitMaskImage: 'url(/philosophy.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/philosophy.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} />
            <span className={`relative z-10 text-[10px] font-sans font-medium uppercase tracking-wider transition-colors ${activeTab === 'philosophy' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/40'}`}>Philosophy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
