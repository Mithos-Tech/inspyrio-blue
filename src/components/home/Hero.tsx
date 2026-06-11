import { motion } from 'motion/react';
import { HashLink } from '@/src/components/layout/HashLink';
import { Button } from '@/src/components/ui/Button';
import { Sparkles } from 'lucide-react';
import FloatingLines from '@/src/components/ui/FloatingLines';
import { useState, useEffect } from 'react';
import { db } from '@/src/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export const Hero = () => {
  const [content, setContent] = useState({
    title: 'Diseño web claro.\nResultados reales.',
    subtitle: 'Sitios rápidos, funcionales y bien construidos.',
    ctaText: 'Iniciar con Inspyrio'
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'content', 'hero'), (snapshot) => {
      if (snapshot.exists()) {
        setContent(snapshot.data() as any);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="relative pt-48 pb-32 px-6 overflow-hidden flex flex-col items-center justify-center min-h-screen bg-brand-dark">
      {/* Interactive Background */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <FloatingLines 
          linesGradient={[
            '#0066FF', // Azul Eléctrico (70% dominant)
            '#0066FF', 
            '#0066FF', 
            '#0066FF', 
            '#0066FF', 
            '#8A2BE2', // Lila/Índigo (20%)
            '#8A2BE2', 
            '#00CED1'  // Teal/Cian (10%)
          ]}
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={12}
          lineDistance={4}
          bendRadius={4}
          bendStrength={-0.4}
          interactive={true}
          parallax={true}
          animationSpeed={0.8}
        />
      </div>

      {/* Bottom Gradient Fade for Seamless Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent z-10 pointer-events-none" />

      {/* Subtle Glows */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-brand-blue/10 to-transparent z-0 pointer-events-none" />
      
      <div className="max-w-screen-xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="sophisticated-label mb-10"
        >
          <Sparkles size={12} className="mr-2" />
          Diseño Web Profesional
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-[90px] font-medium tracking-[-0.05em] leading-[1.1] md:leading-[0.9] mb-10 whitespace-pre-line"
        >
          {content.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-14 leading-relaxed font-light tracking-tight px-4"
        >
          {content.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <HashLink smooth to="/#contact">
            <Button size="lg" variant="secondary" className="px-10 py-4 bg-white/5 border-white/10 text-white hover:bg-white/10 text-[11px] uppercase tracking-[0.2em]">
              <Sparkles size={14} className="mr-2 text-brand-blue" />
              {content.ctaText}
            </Button>
          </HashLink>
        </motion.div>
      </div>
    </section>
  );
};
