import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as LinkIcon, Type, Sparkles, ArrowRight, Check, Plus, ChevronDown, X } from 'lucide-react';
import { PostDetail } from './PostDetail';
import type { Post } from '../types';
import { useSSRSources } from '../api/hooks-ssr';
import { useStyles } from '../api/hooks';
import type { SSRSource, Style } from '../api/types';

import MetallicPaint from './MetallicPaint';

const SourceCard: React.FC<{ source: SSRSource, selectedUrl: string, onSelectUrl: (url: string) => void }> = ({ source, selectedUrl, onSelectUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden transition-colors hover:border-white/10">
      <div
        className="p-4 flex items-center space-x-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img src={source.avatar} className="w-10 h-10 rounded-full border border-white/10 object-cover" alt={source.name} />
        <div className="flex-1">
          <div className="font-medium text-sm text-white/90">{source.name}</div>
          <div className="text-xs text-white/40 mt-0.5 line-clamp-1">{source.description}</div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/30"
        >
          <ChevronDown size={18} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 space-y-2">
              {source.articles.slice(0, 5).map((article, idx) => {
                const isSelected = article.url === selectedUrl;
                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    onClick={() => onSelectUrl(article.url)}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-primary border-primary shadow-[0_0_20px_rgba(72,0,255,0.3)] text-white'
                        : 'bg-surface-light border-white/5 hover:border-primary/50 group'
                    }`}
                  >
                    <div className="flex-1 pr-4">
                      <div className={`text-sm font-medium line-clamp-1 ${isSelected ? 'text-white' : 'text-white/80'}`}>
                        {article.title}
                      </div>
                      <div className={`text-xs mt-1 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-white/40'}`}>
                        {article.summary}
                      </div>
                    </div>
                    <div
                      className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-white text-primary'
                          : 'bg-white/5 text-primary group-hover:bg-primary group-hover:text-white'
                      }`}
                    >
                      {isSelected ? <Check size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={2.5} />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Generate({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [inputType, setInputType] = useState<'link' | 'text'>('text');
  const [inputValue, setInputValue] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [generatedPost, setGeneratedPost] = useState<Post | null>(null);
  const { sources, loading: sourcesLoading, error: sourcesError } = useSSRSources();
  const { data: styles, loading: stylesLoading } = useStyles();

  const handleGenerate = () => {
    setStep(3);
    // Simulate generation (TODO: 临时性的 3 秒展示，后续将根据真实生成时间动态移除)
    setTimeout(() => {
      const selectedStyleData = styles.find(s => s.id === selectedStyle);
      setGeneratedPost({
        id: 'gen1',
        title: '由 Narrio 自动生成的图文内容',
        cover: selectedStyleData?.cover || styles[0]?.cover || '',
        images: [
          selectedStyleData?.cover || styles[0]?.cover || '',
          'https://picsum.photos/seed/gen2/600/800',
          'https://picsum.photos/seed/gen3/600/800',
        ],
        originalType: inputType === 'link' ? 'podcast' : 'article',
        originalContent: inputValue || '这是您输入的内容转换而来的图文排版。Narrio 提取了核心观点，并匹配了最适合的视觉风格。',
        author: 'Narrio Creator',
        avatar: 'https://picsum.photos/seed/avatar/100/100',
        likes: 0,
      });
      setStep(4);
    }, 3000);
  };

  if (step === 4 && generatedPost) {
    return (
      <PostDetail
        post={generatedPost}
        mode="preview"
        onClose={() => {
          setStep(1);
          setInputValue('');
          setSelectedStyle('');
          setGeneratedPost(null);
          onClose();
        }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-bg overflow-y-auto no-scrollbar flex justify-center"
    >
      <div className="min-h-screen pb-8 px-6 pt-12 flex flex-col max-w-2xl mx-auto w-full relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors z-50"
        >
          <X size={24} />
        </button>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 shrink-0">
        <h1 className="text-3xl font-bold mb-2 font-sans tracking-tight">Create</h1>
        <p className="text-white/50 text-sm">释放你的创作势能</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <div className="flex p-1 bg-surface.light rounded-xl mb-6 font-sans shrink-0">
              <button
                onClick={() => setInputType('text')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg flex items-center justify-center space-x-2 transition-colors ${inputType === 'text' ? 'bg-primary text-white shadow-md' : 'text-white/40 hover:text-white/60'}`}
              >
                <Type size={16} />
                <span>文字</span>
              </button>
              <button
                onClick={() => setInputType('link')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg flex items-center justify-center space-x-2 transition-colors ${inputType === 'link' ? 'bg-primary text-white shadow-md' : 'text-white/40 hover:text-white/60'}`}
              >
                <LinkIcon size={16} />
                <span>链接</span>
              </button>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              {inputType === 'text' ? (
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="粘贴你的长文内容..."
                  className="flex-1 w-full bg-surface border border-white/5 rounded-2xl p-5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 resize-none font-serif leading-relaxed text-lg"
                />
              ) : (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="bg-surface border border-white/5 rounded-2xl p-5 flex items-center space-x-3 focus-within:border-primary/50 transition-colors shrink-0">
                    <LinkIcon className="text-white/30" />
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="粘贴公众号/小宇宙链接..."
                      className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder:text-white/20 font-sans"
                    />
                  </div>

                  <div className="mt-6 flex-1 overflow-y-auto no-scrollbar flex flex-col min-h-0">
                    <h3 className="text-sm font-medium text-white/50 mb-4 shrink-0 px-1">推荐内容</h3>
                    {sourcesLoading && (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span className="ml-3 text-white/70 text-sm">Loading sources...</span>
                      </div>
                    )}
                    {sourcesError && (
                      <div className="text-red-400 text-sm p-4 bg-red-400/10 rounded-xl">
                        {sourcesError}
                      </div>
                    )}
                    {!sourcesLoading && !sourcesError && sources.length > 0 && (
                      <div className="space-y-3 pb-4">
                        {sources.map((source) => (
                          <SourceCard
                            key={source.id}
                            source={source}
                            selectedUrl={inputValue}
                            onSelectUrl={(url) => setInputValue(url)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-8 z-20 mt-auto pt-4 pb-2 bg-bg/90 backdrop-blur-xl -mx-6 px-6">
              <button
                onClick={() => setStep(2)}
                disabled={!inputValue.trim()}
                className="w-full py-4 rounded-2xl bg-primary text-white font-bold font-sans flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_20px_rgba(72,0,255,0.4)]"
              >
                <span>下一步</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <h2 className="text-xl font-medium mb-6 shrink-0">选择视觉风格</h2>
            {stylesLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <span className="ml-3 text-white/70 text-sm">Loading styles...</span>
              </div>
            ) : styles.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-white/70 mb-2">No styles available</p>
                <p className="text-white/40 text-sm">Make sure backend is running and assets/styles/ directory exists</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto no-scrollbar pb-4 items-start content-start">
                {styles.map((style) => {
                  const isSelected = selectedStyle === style.id;
                  return (
                    <motion.div
                      layout
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`relative rounded-2xl overflow-hidden border-2 transition-colors cursor-pointer bg-surface flex flex-col ${isSelected ? 'border-primary' : 'border-transparent'}`}
                    >
                      <motion.div layout className="relative w-full aspect-[3/4] shrink-0">
                        <img src={style.cover} alt={style.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent flex items-start p-4">
                          <span className="text-sm font-medium tracking-wide drop-shadow-md">{style.name}</span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <div className="flex space-x-3 mt-auto pt-4 pb-2 font-sans shrink-0 sticky bottom-8 z-20 bg-bg/90 backdrop-blur-xl -mx-6 px-6">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-4 rounded-2xl bg-surface-light text-white font-medium"
              >
                返回
              </button>
              <button
                onClick={handleGenerate}
                disabled={!selectedStyle}
                className="flex-1 py-4 rounded-2xl bg-primary text-white font-bold flex items-center justify-center space-x-2 disabled:opacity-50 transition-all shadow-[0_4px_20px_rgba(72,0,255,0.4)]"
              >
                <Sparkles size={20} />
                <span>开始生成</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <div className="relative w-96 h-96 mb-8">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
              <MetallicPaint
                imageSrc="/N-metallic.svg"
                seed={42}
                scale={4}
                patternSharpness={1}
                noiseScale={0.5}
                speed={0.4}
                liquid={0.75}
                mouseAnimation={false}
                brightness={2}
                contrast={0.5}
                refraction={0.01}
                blur={0.015}
                chromaticSpread={2}
                fresnel={1}
                angle={0}
                waveAmplitude={1}
                distortion={1}
                contour={0.2}
                lightColor="#ffffff"
                darkColor="#050505"
                tintColor="#4800FF"
              />
            </div>
            <h2 className="text-xl font-medium mb-3">正在释放创作势能</h2>
            <p className="text-white/40 text-sm text-center max-w-[240px] leading-relaxed">
              AI 正在提取核心观点并进行视觉排版，请稍候...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
}
