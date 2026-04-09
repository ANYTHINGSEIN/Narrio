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

        {/* 右侧：主容器 */}
        <div className="flex-1 flex flex-col gap-10 lg:gap-16 w-full max-w-5xl">
          
          {/* 顶部大标题 */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full flex justify-center md:justify-start"
          >
            <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-serif font-light text-white tracking-wide">
              一键把长文做成<span className="text-[#4800FF] font-medium mx-1">「好」</span>图文
            </h3>
          </motion.div>

          {/* 步骤网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 w-full">
          
            {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6 items-center md:items-start h-full"
          >
            {/* 标题 */}
            <div className="bg-[#4800FF] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-xl md:text-2xl lg:text-3xl font-light shadow-[0_0_30px_rgba(72,0,255,0.4)]">
              上传自己的内容
            </div>
            
            {/* 视觉演示框 (SVG / 抽象UI) */}
            <div className="w-full flex-1 bg-[#0a0a0a]/60 backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 md:p-8 flex flex-col relative overflow-hidden shadow-2xl group">
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
            className="flex flex-col gap-6 items-center md:items-start h-full"
          >
            {/* 标题 */}
            <div className="bg-[#4800FF] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-xl md:text-2xl lg:text-3xl font-light shadow-[0_0_30px_rgba(72,0,255,0.4)]">
              选择喜欢的图文风格
            </div>
            
            {/* 视觉演示框 (真实图片) */}
            <div className="w-full flex-1 bg-[#0a0a0a]/60 backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 md:p-8 flex flex-col justify-center relative overflow-hidden shadow-2xl group">
              <div className="w-full grid grid-cols-2 gap-4 relative z-10">
                {[
                  '/styles/ref.png',
                  '/styles/ref 2.png',
                  '/styles/ref 3.png',
                  '/styles/ref 4.png'
                ].map((src, index) => (
                  <motion.div
                    key={index}
                    className="aspect-[3/4] relative w-full rounded-xl overflow-hidden border border-white/10 shadow-lg bg-[#111]"
                    whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.4)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      src={src} 
                      alt={`Style ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
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
      </div>
    </section>
  );
}