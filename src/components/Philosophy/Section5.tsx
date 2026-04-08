import { motion } from 'motion/react';

export function Section5() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden shrink-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-primary/90 font-medium font-serif tracking-widest text-3xl md:text-5xl text-center"
      >
        <p>
          让思想，以最美的姿态传播。
        </p>
      </motion.div>
    </section>
  );
}
