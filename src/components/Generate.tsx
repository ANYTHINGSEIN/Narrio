import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as LinkIcon, Type, Sparkles, ArrowRight, Check, Plus, ChevronDown, X } from 'lucide-react';
import { PostDetail } from './PostDetail';
import type { Post } from '../types';
import { useSSRSources } from '../api/hooks-ssr';
import { useStyles, useGeneration, useJobStatus, useWebSocket } from '../api/hooks';
import type { SSRSource } from '../api/types';

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
  const [jobId, setJobId] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const { sources, loading: sourcesLoading, error: sourcesError } = useSSRSources();
  const { data: styles, loading: stylesLoading } = useStyles();
  const { createGeneration } = useGeneration();
  const { job, refresh: refreshJobStatus } = useJobStatus(jobId);
  const {
    connected: wsConnected,
    status: wsStatus,
    progress: wsProgress,
    stage: wsStage,
    result: wsResult,
    error: wsError
  } = useWebSocket(jobId);

  // When WebSocket receives COMPLETED status but no result, immediately refresh job data
  useEffect(() => {
    if (wsStatus === 'COMPLETED' && !wsResult && !job?.result && step === 3) {
      console.log('[Generate] WebSocket shows COMPLETED but no result yet, refreshing job status...');
      refreshJobStatus();
    }
  }, [wsStatus, wsResult, job?.result, step, refreshJobStatus]);

  // Monitor job status from both WebSocket and polling, and update UI when completed
  useEffect(() => {
    // Use WebSocket status if available, otherwise fall back to polled job status
    const currentStatus = wsStatus || job?.status;
    const currentResult = wsResult || job?.result;
    const currentError = wsError || job?.error;
    const isCompleted = currentStatus === 'COMPLETED';
    const isFailed = currentStatus === 'FAILED';

    console.log('[Generate] Status check:', {
      currentStatus,
      isCompleted,
      hasWsResult: !!wsResult,
      hasJobResult: !!job?.result,
      hasResult: !!currentResult,
      step
    });

    if ((isCompleted || isFailed) && step === 3) {
      if (isCompleted && currentResult) {
        console.log('[Generate] Job completed, building post from result:', currentResult);
        // Build Post from job result
        const selectedStyleData = styles.find(s => s.id === selectedStyle);
        const post: Post = {
          id: jobId || 'unknown',
          title: '由 Narrio 自动生成的图文内容',
          cover: selectedStyleData?.cover || styles[0]?.cover || '',
          images: currentResult.images?.map((img: any) => img.url || img) || [
            selectedStyleData?.cover || styles[0]?.cover || '',
          ],
          originalType: inputType === 'link' ? 'podcast' : 'article',
          originalContent: inputValue || '这是您输入的内容转换而来的图文排版。',
          author: 'Narrio Creator',
          avatar: 'https://picsum.photos/seed/avatar/100/100',
          likes: 0,
          audioUrl: currentResult.audio_url,
        };
        setGeneratedPost(post);
        setStep(4);
      } else if (isFailed) {
        // Show error with retry option
        setGenerationError(currentError || '生成失败，请重试');
      }
    }
  }, [wsStatus, wsResult, wsError, job?.status, job?.result, job?.error, step, selectedStyle, styles, inputType, inputValue, jobId]);

  // Log WebSocket connection status for debugging
  useEffect(() => {
    if (jobId) {
      console.log('[Generate] WebSocket status:', { connected: wsConnected, status: wsStatus, progress: wsProgress, stage: wsStage });
    }
  }, [jobId, wsConnected, wsStatus, wsProgress, wsStage]);

  const handleGenerate = async () => {
    console.log('handleGenerate called', { inputType, inputValue, selectedStyle });
    try {
      console.log('Calling createGeneration with:', inputType === 'link' ? 'url' : inputType, inputValue, selectedStyle);
      // Wait for React state to update before starting heavy work
      setGenerationError(null);
      setStep(3);
      
      // Let the UI render the loading state first before making API call
      setTimeout(async () => {
        try {
          const result = await createGeneration(inputType === 'link' ? 'url' : inputType, inputValue, selectedStyle);
          console.log('createGeneration result:', result);
          if (result?.id) {
            setJobId(result.id);
          } else {
            setGenerationError('创建任务失败：未能获取任务ID');
          }
        } catch (err) {
          console.error('Failed to create generation API call:', err);
          setGenerationError('创建任务失败，请重试');
        }
      }, 50);
    } catch (err) {
      console.error('Failed to create generation setup:', err);
      setGenerationError('创建任务失败，请重试');
    }
  };

  const handleRetry = () => {
    setGenerationError(null);
    setJobId(null);
    handleGenerate();
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1 overflow-y-auto no-scrollbar pb-4 items-start content-start">
                {styles.map((style) => {
                  const isSelected = selectedStyle === style.id;
                  return (
                    <motion.div
                      layout
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`relative rounded-2xl overflow-hidden border-2 transition-colors cursor-pointer bg-surface flex flex-col ${isSelected ? 'border-primary' : 'border-transparent'}`}
                    >
                      {/* Title bar */}
                      <div className="bg-surface-light px-4 py-3 border-b border-white/5">
                        <span className="text-sm font-medium text-white/90">{style.name}</span>
                      </div>
                      {/* Preview image */}
                      <div className="relative w-full aspect-[3/4] shrink-0">
                        <img src={style.cover} alt={style.name} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                      </div>
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
            {job?.status === 'FAILED' || generationError ? (
              <>
                <div className="w-20 h-20 rounded-full bg-red-400/10 flex items-center justify-center mb-6">
                  <X size={40} className="text-red-400" />
                </div>
                <h2 className="text-xl font-medium mb-3 text-red-400">生成失败</h2>
                <p className="text-white/60 text-sm text-center max-w-[280px] leading-relaxed mb-2">
                  {generationError || job?.error || '抱歉，生成过程中出现了错误'}
                </p>
                <div className="flex space-x-3 mt-8">
                  <button
                    onClick={() => {
                      setStep(2);
                      setGenerationError(null);
                      setJobId(null);
                    }}
                    className="px-6 py-3 rounded-2xl bg-surface-light text-white font-medium transition-colors hover:bg-white/10"
                  >
                    返回选择风格
                  </button>
                  <button
                    onClick={handleRetry}
                    className="px-6 py-3 rounded-2xl bg-primary text-white font-medium transition-colors hover:bg-primary/90 shadow-[0_4px_20px_rgba(72,0,255,0.4)]"
                  >
                    重试
                  </button>
                </div>
              </>
            ) : (
              <>
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
                {(() => {
                  // Use WebSocket data if available, otherwise fall back to job status
                  const currentStage = wsStage || job?.stage;
                  const currentProgress = wsProgress !== undefined ? wsProgress : (job?.progress || 0);

                  return job || wsStatus ? (
                    <div className="text-center">
                      <p className="text-white/40 text-sm text-center max-w-[240px] leading-relaxed mb-2">
                        {currentStage === 'chunkify' && '正在分析和提取核心观点...'}
                        {currentStage === 'stylify' && '正在应用视觉风格...'}
                        {currentStage === 'render' && '正在生成最终图像...'}
                        {!currentStage && '正在处理...'}
                      </p>
                      <p className="text-primary font-medium text-lg">{currentProgress}%</p>
                      {wsConnected && (
                        <p className="text-white/20 text-xs mt-1">实时连接</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-white/40 text-sm text-center max-w-[240px] leading-relaxed">
                      AI 正在提取核心观点并进行视觉排版，请稍候...
                    </p>
                  );
                })()}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
}
