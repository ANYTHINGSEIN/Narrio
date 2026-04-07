import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Play, Pause, Download, Loader2, X } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Post } from '../types';

export function PostDetail({ post, onClose, mode = 'feed' }: { post: Post; onClose: () => void; mode?: 'feed' | 'preview' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Prevent background scrolling when the detail view is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleExport = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isExporting) return;
    
    setIsExporting(true);
    try {
      const zip = new JSZip();
      const imgFolder = zip.folder("images");
      
      if (imgFolder) {
        // Fetch all images and add to zip
        await Promise.all(post.images.map(async (imgUrl, index) => {
          try {
            const response = await fetch(imgUrl);
            const blob = await response.blob();
            // Try to guess extension from URL or default to jpg
            const ext = imgUrl.split('.').pop()?.split(/[#?]/)[0] || 'jpg';
            const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext.toLowerCase()) ? ext : 'jpg';
            imgFolder.file(`image_${index + 1}.${safeExt}`, blob);
          } catch (err) {
            console.error(`Failed to fetch image ${index + 1}:`, err);
          }
        }));
      }
      
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${post.title || 'narrio-post'}.zip`);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-y-auto flex justify-center no-scrollbar"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-bg min-h-screen relative shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
          {mode === 'feed' ? (
            <button onClick={onClose} className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="w-10" /> /* Spacer for centering */
          )}
          
          <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
            <img src={post.avatar} alt={post.author} className="w-6 h-6 rounded-full border border-white/20 object-cover" />
            <span className="text-sm font-medium font-sans text-white/90">{post.author}</span>
          </div>

          {mode === 'preview' ? (
            <button onClick={onClose} className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
              <X size={24} />
            </button>
          ) : (
            <div className="w-10" /> /* Spacer for centering */
          )}
        </div>

        {/* Image Carousel */}
        <div className="w-full h-[60vh] md:h-[70vh] bg-[#050505] relative flex overflow-x-auto snap-x snap-mandatory no-scrollbar shrink-0 border-b border-white/5">
          {post.images.map((img, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative flex items-center justify-center">
              <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-contain" />
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-sans text-white border border-white/10">
                {idx + 1} / {post.images.length}
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 pb-24 flex-1 bg-bg">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-white/90">{post.title}</h1>
          
          {post.originalType === 'podcast' && post.audioUrl && (
            <div className="mb-8 p-4 rounded-2xl bg-surface-light border border-white/5 backdrop-blur-sm flex items-center space-x-4">
              <button 
                onClick={toggleAudio}
                className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(72,0,255,0.4)] transition-transform hover:scale-105"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
              <div className="flex-1 font-sans">
                <div className="text-sm text-white/60 mb-2">原播客音频</div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/3 rounded-full"></div>
                </div>
              </div>
              <audio ref={audioRef} src={post.audioUrl} onEnded={() => setIsPlaying(false)} />
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 leading-relaxed text-lg font-serif whitespace-pre-wrap">
              {post.originalContent}
            </p>
          </div>
        </div>

        {/* Floating Bottom Bar for Preview Mode */}
        {mode === 'preview' && (
          <div className="sticky bottom-8 z-20 mt-auto pt-4 pb-2 bg-bg/90 backdrop-blur-xl px-6">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full py-4 rounded-2xl bg-primary text-white font-bold font-sans flex items-center justify-center space-x-2 disabled:opacity-50 transition-all shadow-[0_4px_20px_rgba(72,0,255,0.4)]"
            >
              {isExporting ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
              <span>{isExporting ? '打包导出中...' : '导出图文 (ZIP)'}</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
