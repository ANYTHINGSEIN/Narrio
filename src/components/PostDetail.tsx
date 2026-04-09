import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Play, Pause, Download, Loader2, X } from 'lucide-react';
import { saveAs } from 'file-saver';
import ReactMarkdown from 'react-markdown';
import { Post } from '../types';

export function PostDetail({ post, onClose, mode = 'feed' }: { post: Post; onClose: () => void; mode?: 'feed' | 'preview' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
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

  const handleDownloadImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      // Download all images in sequence
      for (let i = 0; i < post.images.length; i++) {
        const imgUrl = post.images[i];
        const response = await fetch(imgUrl);
        const blob = await response.blob();

        const ext = imgUrl.split('.').pop()?.split(/[#?]/)[0] || 'jpg';
        const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext.toLowerCase()) ? ext : 'jpg';

        saveAs(blob, `${post.title || 'image'}_${i + 1}.${safeExt}`);

        // Small delay between downloads to avoid browser blocking
        if (i < post.images.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl bg-bg min-h-screen relative shadow-2xl flex flex-col md:min-h-0 md:h-[90vh] md:my-8 md:rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Desktop Layout - Side by Side */}
        <div className="hidden md:flex flex-1 overflow-hidden">
          {/* Left Side - Image Carousel */}
          <div className="w-1/2 bg-[#050505] relative flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
            {post.images.map((img, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative flex items-center justify-center">
                <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-sans text-white border border-white/10">
                  {idx + 1} / {post.images.length}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Content */}
          <div className="w-1/2 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent shrink-0 z-10">
              {mode === 'feed' ? (
                <button onClick={onClose} className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                  <ChevronLeft size={24} />
                </button>
              ) : (
                <div className="w-10" />
              )}

              <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                <img
                  src={avatarError ? '/favicon.svg' : (post.avatar || '/favicon.svg')}
                  alt={post.author}
                  className="w-6 h-6 rounded-full border border-white/20 object-cover"
                  onError={() => setAvatarError(true)}
                />
                <span className="text-sm font-medium font-sans text-white/90">{post.author}</span>
              </div>

              {mode === 'preview' ? (
                <button onClick={onClose} className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                  <X size={24} />
                </button>
              ) : (
                <div className="w-10" />
              )}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold leading-tight text-white/90">{post.title}</h1>
                {mode === 'feed' && (
                  <button onClick={onClose} className="md:hidden p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                    <X size={24} />
                  </button>
                )}
              </div>

              {post.originalType === 'podcast' && post.audioUrl && (
                <div className="mb-6 p-4 rounded-2xl bg-surface-light border border-white/5 backdrop-blur-sm flex items-center space-x-4">
                  <button
                    onClick={toggleAudio}
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(72,0,255,0.4)] transition-transform hover:scale-105"
                  >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
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

              <div className="prose prose-invert max-w-none overflow-hidden">
                {post.originalContent && post.originalContent.trim() ? (
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-white/90" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3 text-white/90" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-white/90" {...props} />,
                      p: ({node, ...props}) => <p className="text-white/80 leading-relaxed text-base font-serif mb-4" {...props} />,
                      a: ({node, ...props}) => <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                      img: ({node, ...props}) => <img className="max-w-full h-auto rounded-lg my-4" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic text-white/70 my-4" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside text-white/80 my-4 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside text-white/80 my-4 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="text-white/80" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-white/90" {...props} />,
                    }}
                  >
                    {post.originalContent}
                  </ReactMarkdown>
                ) : (
                  <p className="text-white/50 text-sm">暂无正文内容</p>
                )}
              </div>

              {/* Desktop Download Button */}
              {mode === 'preview' && (
                <div className="hidden md:block mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={handleDownloadImage}
                    disabled={isDownloading}
                    className="w-full py-4 rounded-2xl bg-primary text-white font-bold font-sans flex items-center justify-center space-x-2 disabled:opacity-50 transition-all shadow-[0_4px_20px_rgba(72,0,255,0.4)]"
                  >
                    {isDownloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                    <span>{isDownloading ? '下载中...' : '下载所有图片'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="flex md:hidden flex-1 flex-col h-full">
          {/* Header */}
          <div className="sticky top-0 z-20 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 via-black/50 to-transparent shrink-0">
            {mode === 'feed' ? (
              <button onClick={onClose} className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                <ChevronLeft size={24} />
              </button>
            ) : (
              <div className="w-10" /> /* Spacer for centering */
            )}

            <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
              <img
                src={avatarError ? '/favicon.svg' : (post.avatar || '/favicon.svg')}
                alt={post.author}
                className="w-6 h-6 rounded-full border border-white/20 object-cover"
                onError={() => setAvatarError(true)}
              />
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
          <div
            className="w-full aspect-[3/4] bg-[#050505] relative flex overflow-x-auto snap-x snap-mandatory no-scrollbar shrink-0 border-b border-white/5"
          >
            {post.images.map((img, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative flex items-center justify-center">
                <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-sans text-white border border-white/10">
                  {idx + 1} / {post.images.length}
                </div>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="p-4 bg-bg flex-grow shrink-0 no-scrollbar" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            <h1 className="text-xl font-bold mb-4 leading-tight text-white/90">{post.title}</h1>

            {post.originalType === 'podcast' && post.audioUrl && (
              <div className="mb-6 p-4 rounded-2xl bg-surface-light border border-white/5 backdrop-blur-sm flex items-center space-x-4">
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

            <div className="prose prose-invert max-w-none pb-24 overflow-hidden">
              {post.originalContent && post.originalContent.trim() ? (
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2 text-white/90" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-3 mb-2 text-white/90" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-base font-bold mt-2 mb-1 text-white/90" {...props} />,
                    p: ({node, ...props}) => <p className="text-white/80 leading-relaxed text-base font-serif mb-3" {...props} />,
                    a: ({node, ...props}) => <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                    img: ({node, ...props}) => <img className="max-w-full h-auto rounded-lg my-3" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-3 italic text-white/70 my-3" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside text-white/80 my-3 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside text-white/80 my-3 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="text-white/80" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-white/90" {...props} />,
                  }}
                >
                  {post.originalContent}
                </ReactMarkdown>
              ) : (
                <p className="text-white/50 text-sm">暂无正文内容</p>
              )}
            </div>
          </div>
        </div>

        {/* Floating Bottom Bar for Preview Mode */}
        {mode === 'preview' && (
          <div className="sticky bottom-8 z-20 mt-auto pt-4 pb-2 bg-bg/90 backdrop-blur-xl px-6">
            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="w-full py-4 rounded-2xl bg-primary text-white font-bold font-sans flex items-center justify-center space-x-2 disabled:opacity-50 transition-all shadow-[0_4px_20px_rgba(72,0,255,0.4)]"
            >
              {isDownloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
              <span>{isDownloading ? '下载中...' : '下载所有图片'}</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
