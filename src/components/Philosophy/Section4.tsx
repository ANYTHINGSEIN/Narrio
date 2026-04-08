import { motion } from 'motion/react';

export function Section4() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden shrink-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-white/80 font-serif leading-loose max-w-2xl text-2xl md:text-3xl text-center space-y-8"
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
