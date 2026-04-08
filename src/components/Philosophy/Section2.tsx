import { motion } from 'motion/react';

export function Section2() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden shrink-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-white/80 font-serif leading-loose max-w-2xl text-2xl md:text-3xl text-center"
      >
        <p>
          在这个碎片化阅读的时代，<br/>
          深度的思考往往被埋没在冗长的文字与音频中。
        </p>
      </motion.div>
    </section>
  );
}
