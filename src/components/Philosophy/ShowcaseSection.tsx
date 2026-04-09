import { motion } from 'motion/react';
import { useState } from 'react';

const cardSets = [
  {
    id: "set1",
    folder: "Harness design for long-running application",
    images: ["0.png", "1.png", "2.png", "4.png", "5.png"]
  },
  {
    id: "set2",
    folder: "Harness engineering-leveraging Codex in an agent-first world",
    images: ["0.png", "1.png", "2.png", "3.png", "4.png"]
  },
  {
    id: "set3",
    folder: "The Cure for Execution Tax",
    images: ["0.png", "1.png", "2.png", "3.png", "4.png"]
  },
  {
    id: "set4",
    folder: "The Gut Decision Matrix-When to Trust Instinct and Intuition",
    images: ["0.png", "1.png", "2.png", "3.png", "4.png"]
  }
];

export function ShowcaseSection() {
  return (
    <section className="relative w-full flex flex-col items-center py-32 px-6 lg:px-12 bg-[#020202] overflow-hidden">
      {/* 背景光晕 */}
      <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] bg-[#4800FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-[#4800FF] rounded-full mix-blend-screen filter blur-[200px] opacity-10 pointer-events-none" />

      {/* 标题 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-100px" }} 
        transition={{ duration: 1, ease: "easeOut" }} 
        className="relative z-10 text-center flex flex-col items-center gap-6 mb-24 lg:mb-32"
      >
        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-serif font-light text-white tracking-wide">
          完美的排版，<br className="md:hidden" />一键即可生成
        </h2>
        <p className="text-[clamp(1rem,1.2vw,1.25rem)] text-white/60 font-light max-w-2xl text-center">
          告别繁琐的排版与设计，将您的深度思考自动转化为极具视觉张力的精美图文。<br className="hidden md:block" />
          （将鼠标悬停在图文上查看手风琴展开效果）
        </p>
      </motion.div>

      {/* 4组图文，一排一组 */}
      <div className="relative z-10 w-full max-w-[1400px] flex flex-col gap-32 lg:gap-48 items-center">
        {cardSets.map((set, index) => (
          <CardStack key={set.id} set={set} index={index} />
        ))}
      </div>
    </section>
  );
}

function CardStack({ set, index }: { set: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 悬停时的背部微光 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4800FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem]" />
      
      <div className="relative w-[220px] md:w-[300px] lg:w-[360px] aspect-[3/4]">
        {set.images.map((img: string, i: number) => {
          const total = set.images.length;
          const center = (total - 1) / 2;
          const offset = i - center;
          
          // 悬停时：像手风琴一样水平展开
          const spreadDistance = typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 160; 
          const hoverX = offset * spreadDistance;
          const hoverRotate = offset * 2;
          const hoverY = Math.abs(offset) * 15;
          
          // 默认状态：紧凑地叠在一起
          const idleX = offset * 15;
          const idleRotate = offset * 4;
          const idleY = Math.abs(offset) * 5;
          const idleScale = 1 - Math.abs(offset) * 0.05;

          return (
            <motion.div
              key={i}
              className="absolute top-0 left-0 w-full h-full rounded-[1.5rem] overflow-hidden border border-white/20 bg-[#111]"
              style={{
                // 确保中间的图片在最上层
                zIndex: Math.floor(10 - Math.abs(offset)),
              }}
              animate={{
                x: isHovered ? hoverX : idleX,
                y: isHovered ? hoverY : idleY,
                rotate: isHovered ? hoverRotate : idleRotate,
                scale: isHovered ? 1 : idleScale,
                boxShadow: isHovered 
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(72, 0, 255, 0.1)" 
                  : "0 10px 30px -10px rgba(0, 0, 0, 0.7)"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 250, 
                damping: 25,
                mass: 1
              }}
            >
              <img 
                src={`/explore-content/${set.folder}/${img}`} 
                alt={`${set.folder} ${i}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}