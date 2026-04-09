import { motion } from 'motion/react';

export function SolutionSection() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden py-24 px-6 lg:px-12 bg-[#020202]">
      {/* 优雅的背景光晕 */}
      <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-[#4800FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-[#4800FF] rounded-full mix-blend-screen filter blur-[200px] opacity-10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-stretch">
        
        {/* 左侧：只需两步 */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:w-[15%] flex flex-col justify-center shrink-0 items-center lg:items-start text-center lg:text-left"
        >
          <h2 className="text-[clamp(3.5rem,6vw,5.5rem)] font-serif font-light text-white leading-tight tracking-wide">
            只需<br className="hidden lg:block"/>两步
          </h2>
        </motion.div>

        {/* 右侧：步骤容器 */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 w-full max-w-5xl">
          
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6 items-center md:items-start"
          >
            {/* 标题 */}
            <div className="bg-[#4800FF] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-xl md:text-2xl lg:text-3xl font-light shadow-[0_0_30px_rgba(72,0,255,0.4)]">
              上传自己的内容
            </div>
            
            {/* 视觉演示框 (SVG / 抽象UI) */}
            <div className="w-full aspect-square md:aspect-[4/5] lg:aspect-square bg-[#0a0a0a]/60 backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 md:p-8 flex flex-col relative overflow-hidden shadow-2xl group">
              <div className="w-full h-full bg-[#111111] rounded-xl border border-white/5 p-5 flex flex-col gap-5 relative z-10 overflow-hidden">
                {/* 顶部控制栏 */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>
                {/* 切换 Tab */}
                <div className="flex gap-3 mt-2">
                  <div className="h-8 w-20 bg-[#4800FF] rounded-md flex items-center justify-center">
                    <div className="h-1.5 w-8 bg-white/80 rounded-full" />
                  </div>
                  <div className="h-8 w-20 bg-white/5 rounded-md flex items-center justify-center">
                    <div className="h-1.5 w-8 bg-white/30 rounded-full" />
                  </div>
                </div>
                {/* 动态输入内容流 */}
                <div className="flex-1 flex flex-col gap-4 mt-4 relative">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="h-2.5 bg-white/10 rounded-full"
                      style={{ width: `${70 + Math.random() * 30}%` }}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                  {/* 生成按钮 */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-10 bg-[#4800FF] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(72,0,255,0.5)]"
                    whileHover={{ scale: 1.02 }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="h-2 w-12 bg-white/90 rounded-full" />
                  </motion.div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#4800FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>

            {/* 底部描述 */}
            <div className="bg-[#4800FF]/20 text-white/80 px-6 py-3 rounded-lg text-sm md:text-base font-light border border-[#4800FF]/30 backdrop-blur-md">
              文章全文 / 文章链接 / 播客链接 / ......
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-6 items-center md:items-start"
          >
            {/* 标题 */}
            <div className="bg-[#4800FF] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-xl md:text-2xl lg:text-3xl font-light shadow-[0_0_30px_rgba(72,0,255,0.4)]">
              选择喜欢的图文风格
            </div>
            
            {/* 视觉演示框 (SVG / 抽象UI) */}
            <div className="w-full aspect-square md:aspect-[4/5] lg:aspect-square bg-[#0a0a0a]/60 backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 md:p-8 flex flex-col relative overflow-hidden shadow-2xl group">
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4 relative z-10">
                
                {/* 风格 1：液体玻璃 (深邃紫蓝) */}
                <motion.div 
                  className="rounded-xl border border-white/10 overflow-hidden relative bg-gradient-to-br from-blue-900/60 to-[#4800FF]/40 shadow-inner"
                  whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.3)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="absolute inset-0 backdrop-blur-[2px]"
                    animate={{ background: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.08)", "rgba(255,255,255,0.02)"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-blue-400/60 blur-[4px]" />
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-purple-400/40 blur-[8px]" />
                </motion.div>

                {/* 风格 2：学术克制 (简约白底) */}
                <motion.div 
                  className="rounded-xl border border-white/20 overflow-hidden relative bg-[#F5F5F5] flex flex-col p-4 gap-3"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="h-2 w-2/3 bg-black/80 rounded-sm" />
                  <div className="h-1.5 w-full bg-black/30 rounded-sm" />
                  <div className="h-1.5 w-5/6 bg-black/30 rounded-sm" />
                  <div className="mt-auto flex gap-2">
                    <div className="w-8 h-8 border border-black/20 rounded-md flex items-center justify-center">
                      <div className="w-4 h-4 border border-black/40 rounded-full" />
                    </div>
                    <div className="flex-1 border border-black/10 rounded-md bg-black/5" />
                  </div>
                </motion.div>

                {/* 风格 3：幻彩磨砂 (渐变) */}
                <motion.div 
                  className="rounded-xl border border-white/10 overflow-hidden relative bg-gradient-to-tr from-pink-500/40 via-orange-400/40 to-yellow-300/40"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-white/10 backdrop-blur-md"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-12 h-12 bg-white/30 rounded-2xl rotate-12 backdrop-blur-lg border border-white/40 shadow-xl" />
                  </div>
                </motion.div>

                {/* 风格 4：暗黑极简 (黑底高对比) */}
                <motion.div 
                  className="rounded-xl border border-white/10 overflow-hidden relative bg-[#111111] flex flex-col p-4 justify-between"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-black rounded-full" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-1 w-1/3 bg-white/50 rounded-full" />
                    <div className="h-1 w-1/4 bg-white/30 rounded-full" />
                  </div>
                </motion.div>

              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#4800FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>

            {/* 底部描述 */}
            <div className="bg-[#4800FF]/20 text-white/80 px-6 py-3 rounded-lg text-sm md:text-base font-light border border-[#4800FF]/30 backdrop-blur-md">
              液体玻璃 / 幻彩磨砂 / 学术克制 / ......
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}