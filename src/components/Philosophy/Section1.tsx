import { motion } from 'motion/react';
import MetallicPaint from '../MetallicPaint';

export function Section1() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden shrink-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
        <h2 className="text-4xl font-serif mb-16 leading-relaxed font-light text-center">
          释放<br/>创作势能
        </h2>
      </motion.div>
    </section>
  );
}
