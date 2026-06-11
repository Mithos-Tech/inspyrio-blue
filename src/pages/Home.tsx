import { Hero } from '@/src/components/home/Hero';
import { MockupPreview } from '@/src/components/home/MockupPreview';
import { ServicesPreview } from '@/src/components/home/ServicesPreview';
import { PortfolioPreview } from '@/src/components/home/PortfolioPreview';
import { Process } from '@/src/components/home/Process';
import { Difference } from '@/src/components/home/Difference';
import { FAQ } from '@/src/components/home/FAQ';
import { BrandMarquee } from '@/src/components/home/BrandMarquee';
import { Contact } from '@/src/components/home/Contact';
import { motion } from 'motion/react';
import { useSEO } from '@/src/hooks/useSEO';

export const Home = () => {
  useSEO({
    title: 'Estudio de Diseño Web Premium',
    description: 'Transformamos tu visión en una experiencia digital sofisticada, minimalista y de alto impacto. Diseño web de élite, desarrollo frontend moderno y posicionamiento SEO avanzado.',
    keywords: 'diseño web premium, diseño de elite, paginas web minimalistas, diseño ux/ui premium, desarrollo front-end de lujo, inspyrio, agencia de diseño'
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden"
    >
      <Hero />
      <MockupPreview />
      <ServicesPreview />
      <PortfolioPreview />
      <Process />
      <Difference />
      <BrandMarquee />
      <FAQ />
      <Contact />
    </motion.div>
  );
};
