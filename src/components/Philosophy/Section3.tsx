import { motion } from 'motion/react';

export function Section3() {
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
          我们相信，<br/>
          每一个深刻的洞见都值得被看见。
        </p>
        <p>
          每一段用心的表达都应该有完美的呈现。
        </p>
      </motion.div>
    </section>
  );
}
