import { motion } from 'motion/react';
import { Share2, Radio, ArrowRight } from 'lucide-react';

export const MockupPreview = () => {
  const HUDDLY_LOGO = "https://res.cloudinary.com/dk1tkgjpj/image/upload/v1771871613/Logo_oso_cukhmz.svg";
  const ASTRONAUT_IMAGE = "https://res.cloudinary.com/dkoshgzxo/image/upload/v1776106573/blue_vtuixq.png";

  return (
    <section className="relative pb-32 px-6 bg-brand-dark -mt-12 z-20">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[48px] bg-[#080808] overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,102,255,0.2)] min-h-[510px] md:min-h-[680px] lg:min-h-[800px] border border-white/[0.08]"
        >
          {/* =========================================================================
              DESKTOP ONLY VERSION (md and up)
             ========================================================================= */}
          <div className="hidden md:block">
            {/* Background Text Overlay - Refined & Subtle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden z-0">
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2 }}
                className="text-center"
              >
                <h2 className="text-[11vw] font-tech font-bold leading-[0.8] uppercase text-white tracking-tighter">
                  HUD
                </h2>
                <h2 className="text-[11vw] font-tech font-bold leading-[0.8] uppercase text-white tracking-tighter">
                  DLY
                </h2>
              </motion.div>
            </div>

            {/* Central Highlight Glow - Resalta al personaje */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="w-[50%] h-[50%] bg-brand-blue/20 blur-[120px] rounded-full opacity-60" />
            </div>

            {/* Main Content Area - Desktop (Bottom Left and Bottom Right) */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-20 lg:pr-16 flex flex-row items-end justify-between z-30">
              {/* Left Side: Presentation Text */}
              <div className="flex flex-col items-start text-left max-w-sm">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-3xl mb-6"
                >
                  <Radio size={10} className="text-brand-blue animate-pulse" />
                  <span className="text-[8px] font-tech text-brand-blue uppercase tracking-[0.2em]">Live Now</span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-2xl lg:text-3xl font-tech text-white leading-[1.3] tracking-tight"
                >
                  Explorando el <br />
                  <span className="text-brand-blue">Espacio Digital.</span>
                </motion.h3>
              </div>

              {/* Right Side: Description & CTA */}
              <div className="flex flex-col items-end text-right max-w-[320px]">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-col items-end gap-8"
                >
                  <p className="text-base lg:text-lg font-tech text-white/70 leading-[1.6] tracking-tight">
                    Conversaciones sobre tecnología y diseño.
                  </p>
                  
                  <button className="group relative flex items-center gap-6 pl-8 pr-4 py-4 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-2xl text-white font-tech text-[10px] uppercase tracking-[0.2em] hover:bg-white/[0.1] transition-all duration-500 shadow-xl overflow-hidden">
                    <span className="relative z-10">Escuchar ahora</span>
                    <div className="relative z-10 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                      <ArrowRight size={16} />
                    </div>
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Central Character Image with float effect */}
            <div className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="h-full w-full flex items-end justify-center"
              >
                <motion.img
                  initial={{ opacity: 0, y: 200, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                  src={ASTRONAUT_IMAGE}
                  alt="Astronaut"
                  className="h-[65%] lg:h-[75%] w-auto object-contain select-none"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* Subtle Gradients */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent z-25 pointer-events-none" />
          </div>

          {/* =========================================================================
              MOBILE ONLY VERSION (below md)
             ========================================================================= */}
          <div className="block md:hidden pt-20 pb-8 px-6 flex flex-col items-center justify-between min-h-[510px] relative z-30">
            {/* 1. Live Now Badge - Top Centered */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-3xl"
            >
              <Radio size={8} className="text-brand-blue animate-pulse" />
              <span className="text-[7.5px] font-tech text-brand-blue uppercase tracking-[0.2em]">Live Now</span>
            </motion.div>

            {/* 2. Character and behind HUDDLY Title container */}
            <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-[220px] my-1.5 pointer-events-none">
              {/* Background HUDDLY Label (Behind the Astronaut) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
                <h2 className="text-[17vw] font-tech font-bold leading-[0.8] uppercase text-white/5 tracking-tighter">
                  HUD
                </h2>
                <h2 className="text-[17vw] font-tech font-bold leading-[0.8] uppercase text-white/5 tracking-tighter">
                  DLY
                </h2>
              </div>

              {/* Glowing Background aura */}
              <div className="absolute w-[60%] h-[60%] bg-brand-blue/15 blur-[50px] rounded-full pointer-events-none z-0" />

              {/* Hero PNG character (In front of the background text) - with Floating effect */}
              <motion.div
                animate={{
                  y: [80, 70, 80]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="z-20 relative flex items-center justify-center"
              >
                <motion.img
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  src={ASTRONAUT_IMAGE}
                  alt="Astronaut"
                  className="max-h-[360px] w-auto object-contain select-none"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* 3. Text & CTA block - Cleanly placed directly below the float character */}
            <div className="w-full flex flex-col items-center text-center gap-5 mt-1 relative z-30">
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-lg sm:text-xl font-tech text-white leading-normal tracking-tight max-w-[280px]"
              >
                Explorando el <span className="text-brand-blue block">Espacio Digital.</span>
              </motion.h3>

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group relative flex items-center gap-5 pl-7 pr-3.5 py-3 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-2xl text-white font-tech text-[9px] uppercase tracking-[0.2em] hover:bg-white/[0.1] active:scale-95 transition-all duration-350 shadow-xl overflow-hidden pointer-events-auto"
              >
                <span className="relative z-10">Escuchar ahora</span>
                <div className="relative z-10 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                  <ArrowRight size={13} />
                </div>
              </motion.button>
            </div>
            
            {/* Subtle bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#080808] to-transparent z-10 pointer-events-none" />
          </div>

          {/* =========================================================================
              COMMON OVERLAYS / SHARED COMPONENTS
             ========================================================================= */}
          {/* Header - Sophisticated & Minimal (Renders across both mobile and desktop absolute positioning) */}
          <div className="absolute top-0 left-0 right-0 p-8 md:p-12 flex items-center justify-between z-40">
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center backdrop-blur-3xl">
                <img src={HUDDLY_LOGO} alt="Huddly Logo" className="w-6 h-6 opacity-80" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-tech text-brand-blue tracking-tight leading-none">Huddly</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-10 px-10 py-3.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-3xl">
              {['Inicio', 'Episodios', 'Pistas', 'Nosotros'].map((item) => (
                <span key={item} className="text-[10px] font-bold text-white/60 hover:text-white cursor-pointer transition-all uppercase tracking-[0.2em]">
                  {item}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl">
                <Share2 size={15} />
              </button>
              <button className="hidden sm:flex items-center gap-3 px-6 py-3 rounded-full bg-brand-blue text-white text-[10px] font-tech uppercase tracking-[0.1em] hover:scale-105 transition-all shadow-[0_10px_30px_rgba(0,102,255,0.3)]">
                Suscribirse
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1/2 bg-brand-blue/[0.03] blur-[140px] rounded-full z-15 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};










