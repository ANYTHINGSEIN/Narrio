import { motion } from 'motion/react';
import MetallicPaint from '../MetallicPaint';

export function CallToActionSection() {
  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center bg-[#020202] px-6 lg:px-12 overflow-hidden">
      {/* 底部光晕 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#4800FF] rounded-full mix-blend-screen filter blur-[250px] opacity-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center w-full h-full"
      >
        {/* 动态液态金属 Logo */}
        <div className="relative w-[clamp(420px,75vh,900px)] h-[clamp(420px,75vh,900px)] flex items-center justify-center -mb-[20vh] -mt-[10vh]">
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

        <div className="text-center flex flex-col items-center gap-2 md:gap-4 relative z-20 pb-[8vh]">
          <h2 className="text-[clamp(1.75rem,4vh,3.5rem)] font-serif font-light text-white tracking-widest">
            秒出优质图文
          </h2>
          <h2 className="text-[clamp(1.75rem,4vh,3.5rem)] font-serif font-light text-white tracking-widest">
            释放创作势能
          </h2>
        </div>
      </motion.div>
    </section>
  );
}