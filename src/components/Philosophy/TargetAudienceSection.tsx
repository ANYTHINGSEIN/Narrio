import { motion } from 'motion/react';

export function TargetAudienceSection() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden py-24 px-6 lg:px-12 bg-[#020202]">
      {/* 优雅的背景光晕 */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#4800FF] rounded-full mix-blend-screen filter blur-[200px] opacity-15" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#4800FF] rounded-full mix-blend-screen filter blur-[200px] opacity-15" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-20 md:gap-32">
        
        {/* 叙事文案部分 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 1, ease: "easeOut" }} 
          className="text-center flex flex-col items-center gap-10"
        >
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-serif leading-tight font-light text-white tracking-wide">
            好的内容，<br className="md:hidden" />不应该被形式锁住
          </h2>
          <p className="text-[clamp(1.125rem,1.5vw,1.5rem)] text-white/60 font-light leading-[2] max-w-5xl text-center tracking-wide">
            这个世界上思考最有深度的一群人，擅长创作长文与播客。
            <br className="hidden md:block" />
            却往往因为缺乏设计与排版能力，在图文媒体中表现糟糕，无法触达目标用户。
            <br className="hidden md:block" />
            我们希望打破这一层内容的势能，让深度的价值流向它真正需要的地方。
          </p>
        </motion.div>

        {/* 排版卡片部分 (参考设计规范与图片) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative w-full rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-2xl overflow-hidden p-10 md:p-16 lg:p-24 shadow-2xl shadow-[#4800FF]/5"
        >
          {/* 卡片内部的微光 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#4800FF]/50 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-[#4800FF]/10 to-transparent opacity-50 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">
            
            {/* 左侧：Narrio 品牌与口号 */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8">
              <div className="w-[clamp(160px,30vw,320px)] h-auto">
                <img 
                  src="/Narrio-text.svg" 
                  alt="Narrio" 
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-white/80 font-serif tracking-wide">
                为深度创作者而生！
              </div>
            </div>

            {/* 右侧：属性对比 */}
            <div className="flex-1 w-full max-w-xl flex flex-col gap-12 lg:gap-16">
              {/* Tag */}
              <div className="self-center bg-[#4800FF] px-6 py-2 lg:px-8 lg:py-3 rounded-full text-white text-lg lg:text-xl font-light tracking-wider shadow-[0_0_20px_rgba(72,0,255,0.4)]">
                深度内容创作者
              </div>
              
              {/* Columns */}
              <div className="flex justify-between items-start w-full">
                {/* 擅长 */}
                <div className="flex flex-col gap-6 text-center flex-1">
                  <h3 className="text-2xl lg:text-3xl font-serif text-white mb-4">超擅长</h3>
                  <div className="flex flex-col gap-5 text-lg lg:text-xl text-white/90 font-light">
                    <span>写长文</span>
                    <span>做播客</span>
                    <span>深度输出</span>
                  </div>
                </div>
                
                {/* 分割线 */}
                <div className="w-px h-40 bg-gradient-to-b from-transparent via-white/20 to-transparent mt-4" />

                {/* 不擅长 */}
                <div className="flex flex-col gap-6 text-center flex-1">
                  <h3 className="text-2xl lg:text-3xl font-serif text-white/40 mb-4">不擅长</h3>
                  <div className="flex flex-col gap-5 text-lg lg:text-xl text-white/40 font-light">
                    <span>做设计</span>
                    <span>搓排版</span>
                    <span>优质图文</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}