import { motion } from 'motion/react';

export const BrandMarquee = () => {
  return (
    <section className="py-24 bg-brand-dark overflow-hidden relative border-y border-white/[0.02]">
      {/* Gradient Masks for Faded Edges - Adjusted width for better visibility */}
      <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-brand-dark via-brand-dark/95 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-brand-dark via-brand-dark/95 to-transparent z-20 pointer-events-none" />
      
      <div className="flex relative z-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 50, // Slightly slower for the larger size
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap"
        >
          {/* First Set */}
          <div className="flex items-center">
            {[...Array(6)].map((_, i) => (
              <div key={`set1-${i}`} className="flex items-center px-16 md:px-24">
                <span 
                  className={`text-4xl md:text-6xl lg:text-7xl font-tech uppercase select-none tracking-[0.5em] transition-all duration-1000 ${
                    i % 2 === 0 
                      ? 'text-white/40' 
                      : 'text-brand-blue/60'
                  }`}
                  style={{
                    textShadow: i % 2 !== 0 ? '0 0 30px rgba(0, 102, 255, 0.2)' : 'none'
                  }}
                >
                  INSPYRIO
                </span>
                <div className="w-2 h-2 rounded-full bg-brand-blue/20 mx-24 md:mx-32 blur-[1px]" />
              </div>
            ))}
          </div>
          
          {/* Second Set (Duplicate for seamless loop) */}
          <div className="flex items-center">
            {[...Array(6)].map((_, i) => (
              <div key={`set2-${i}`} className="flex items-center px-16 md:px-24">
                <span 
                  className={`text-4xl md:text-6xl lg:text-7xl font-tech uppercase select-none tracking-[0.5em] transition-all duration-1000 ${
                    i % 2 === 0 
                      ? 'text-white/40' 
                      : 'text-brand-blue/60'
                  }`}
                  style={{
                    textShadow: i % 2 !== 0 ? '0 0 30px rgba(0, 102, 255, 0.2)' : 'none'
                  }}
                >
                  INSPYRIO
                </span>
                <div className="w-2 h-2 rounded-full bg-brand-blue/20 mx-24 md:mx-32 blur-[1px]" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
