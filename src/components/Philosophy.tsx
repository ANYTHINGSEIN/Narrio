import { motion } from 'motion/react';

export function Philosophy() {
  return (
    <div className="min-h-screen pb-32 px-6 pt-24 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <img 
          src="/Narrio-text.svg" 
          alt="Narrio" 
          className="w-80 -mt-8 mb-4" 
        />
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
