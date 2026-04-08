import { motion } from 'motion/react';

export function Section4() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center px-8 relative overflow-hidden shrink-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-white/80 font-serif leading-relaxed sm:leading-loose max-w-2xl text-[clamp(1.125rem,5vh,1.875rem)] text-center flex flex-col gap-[clamp(1rem,4vh,2rem)] px-4"
      >
        <p>
          Narrio 为深度创作者而生。
        </p>
        <p>
          无需精通设计，无需耗时排版。<br/>
          一键将你的长文与播客，<br/>
          转化为极具视觉冲击力的图文内容。
        </p>
      </motion.div>
    </section>
  );
}
