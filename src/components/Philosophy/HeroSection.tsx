import { Plasma } from '../Plasma';
import { motion } from 'motion/react';
import MetallicPaint from '../MetallicPaint';

export function HeroSection() {
  const primaryColor = typeof document !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#4800FF' : '#4800FF';

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <Plasma
          color="#4800FF"
          style={{ backgroundColor: '#000000' }} // 这里就是调整 Canvas BG 的地方
          speed={1}
          direction="forward"
          scale={1}
          opacity={1}
          mouseInteractive={false}
        />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 1, ease: "easeOut" }} 
        className="content-layer flex flex-col items-center justify-center -mt-[clamp(2rem,8vh,4rem)] relative z-10" 
      > 
        <div className="relative w-[clamp(140px,45vh,320px)] h-[clamp(140px,45vh,320px)] lg:w-[clamp(280px,90vh,640px)] lg:h-[clamp(280px,90vh,640px)] shrink-0 -mb-[clamp(3rem,12vh,6rem)] lg:-mb-[clamp(6rem,24vh,12rem)]"> 
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
            chromaticSpread={3} 
            fresnel={1} 
            angle={0} 
            waveAmplitude={1} 
            distortion={1} 
            contour={0.2} 
            lightColor="#ffffff" 
            darkColor="#000000" 
            tintColor="#4800FF" 
          /> 
        </div> 
        <h2 className="text-[clamp(1.5rem,5vh,2.25rem)] font-serif leading-relaxed font-light text-center shrink-0"> 
          释放<br/>创作势能 
        </h2> 
      </motion.div> 
    </section>
  );
}
