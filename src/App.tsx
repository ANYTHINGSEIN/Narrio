import { useState } from 'react';
import { Compass, Plus, BookOpen } from 'lucide-react';
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
            <Compass size={24} strokeWidth={activeTab === 'explore' ? 2.5 : 2} />
            <span className="text-[10px] font-sans font-medium uppercase tracking-wider">Explore</span>
          </button>
          
          <button 
            onClick={() => setIsGenerateOpen(true)}
            className="relative -top-6 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(72,0,255,0.4)] transition-transform active:scale-95"
          >
            <Plus size={32} strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={() => setActiveTab('philosophy')}
            className={`flex flex-col items-center space-y-1.5 transition-colors ${activeTab === 'philosophy' ? 'text-primary' : 'text-white/40'}`}
          >
            <BookOpen size={24} strokeWidth={activeTab === 'philosophy' ? 2.5 : 2} />
            <span className="text-[10px] font-sans font-medium uppercase tracking-wider">Philosophy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
