import { motion } from 'motion/react';
import MetallicPaint from './MetallicPaint';

export function Philosophy() {
  return (
    <div className="min-h-screen pb-32 px-6 pt-24 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="relative w-80 h-80 -mt-8 mb-4">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
          <MetallicPaint 
            imageSrc="/Narrio-text-metallic.svg"
            seed={42} 
            scale={4} 
            patternSharpness={1} 
            noiseScale={0.5} 
            speed={0.1} 
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
        <h2 className="text-3xl font-serif mb-16 leading-relaxed font-light">
          释放<br/>创作势能
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.2 }}
        className="space-y-10 text-white/60 font-serif leading-loose max-w-md text-lg"
      >
        <p>
          在这个碎片化阅读的时代，<br/>
          深度的思考往往被埋没在冗长的文字与音频中。
        </p>
        <p>
          我们相信，<br/>
          每一个深刻的洞见都值得被看见。<br/>
          每一段用心的表达都应该有完美的呈现。
        </p>
        <p>
          Narrio 为深度创作者而生。<br/>
          无需精通设计，无需耗时排版。<br/>
          一键将你的长文与播客，<br/>
          转化为极具视觉冲击力的图文内容。
        </p>
        <p className="text-primary/90 font-medium pt-8 tracking-wide">
          让思想，以最美的姿态传播。
        </p>
      </motion.div>
    </div>
  );
}
