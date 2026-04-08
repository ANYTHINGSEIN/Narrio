import { motion } from 'motion/react';

export function Section5() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center px-8 relative overflow-hidden shrink-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-primary/90 font-medium font-serif tracking-widest text-[clamp(1.5rem,6vh,3rem)] text-center px-4"
      >
        <p>
          让思想，以最美的姿态传播。
        </p>
      </motion.div>
    </section>
  );
}
