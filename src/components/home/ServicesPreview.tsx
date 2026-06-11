import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { HashLink } from '@/src/components/layout/HashLink';
import { Button } from '@/src/components/ui/Button';
import { FadeInImage } from '@/src/components/ui/FadeInImage';

const SERVICES = [
  {
    id: '01',
    title: 'Diseño Web UI/UX',
    description: 'Creamos interfaces intuitivas y estéticas que no solo se ven bien, sino que guían al usuario hacia la conversión. Cada píxel tiene un propósito.',
    tags: ['Figma', 'Prototipado', 'UX Research'],
    metric: '+95%',
    metricText: 'satisfacción en usabilidad',
    subServices: ['User Flow', 'Wireframing', 'Visual Design', 'Design Systems'],
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776485675/Dise%C3%B1o_Web_UIUX_fzoibh.webp',
  },
  {
    id: '02',
    title: 'Desarrollo Frontend',
    description: 'Transformamos diseños en realidad con código limpio, escalable y optimizado. Utilizamos las tecnologías más modernas para garantizar el mejor rendimiento.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    metric: '< 0.5s',
    metricText: 'tiempo de carga promedio',
    subServices: ['SPA Development', 'API Integration', 'Performance Tuning', 'Clean Code'],
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776485675/Desarrollo_Frontend_ayj7ap.webp',
  },
  {
    id: '03',
    title: 'Optimización SEO',
    description: 'Hacemos que tu marca sea encontrada. Optimizamos la estructura y el contenido para escalar posiciones en los motores de búsqueda de forma orgánica.',
    tags: ['SEO On-Page', 'Core Web Vitals', 'Analytics'],
    metric: '3x',
    metricText: 'más visibilidad orgánica',
    subServices: ['Keyword Research', 'Technical SEO', 'Content Strategy', 'Link Building'],
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776485675/Optimizaci%C3%B3n_SEO_svz4ei.webp',
  },
];

export const ServicesPreview = () => {
  const [expanded, setExpanded] = useState<string | null>('01');

  const handleToggle = (id: string) => {
    const isExpanding = expanded !== id;
    const currentlyExpandedId = expanded;

    if (isExpanding) {
      const element = document.getElementById(`service-card-${id}`);
      if (element) {
        // Calculate header offset (responsive design friendly)
        const headerOffset = window.innerWidth < 768 ? 90 : 140;
        const elementPosition = element.getBoundingClientRect().top;
        let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // If there's an already expanded item above the clicked one,
        // subtract its collapse height to predict the final absolute Y coordinate
        if (currentlyExpandedId && parseInt(currentlyExpandedId) < parseInt(id)) {
          const expandedCard = document.getElementById(`service-card-${currentlyExpandedId}`);
          const expandedContent = expandedCard?.querySelector('.overflow-hidden');
          if (expandedContent) {
            const collapseHeight = expandedContent.clientHeight;
            offsetPosition -= collapseHeight;
          }
        }

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

    setExpanded(isExpanding ? id : null);
  };

  return (
    <section className="py-32 px-6 bg-brand-dark">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
          <div className="sophisticated-label shrink-0">Servicios</div>
          <h2 className="text-2xl lg:text-4xl font-medium tracking-[-0.02em] text-left md:text-right leading-tight text-white max-w-2xl">
            Buen diseño. <br />
            Mejores resultados.
          </h2>
        </div>

        <div className="space-y-0">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group border-b border-white/[0.06] transition-all duration-500 scroll-mt-24 md:scroll-mt-32"
            >
              <button
                onClick={() => handleToggle(service.id)}
                className="w-full flex items-center justify-between py-10 lg:py-14 text-left group"
              >
                <div className="flex items-center gap-8 lg:gap-16">
                  <span className="font-mono text-xs text-white/60 group-hover:text-brand-blue transition-colors">({service.id})</span>
                  <h3 className="text-3xl lg:text-5xl font-medium tracking-tight group-hover:translate-x-2 transition-transform duration-500">{service.title}</h3>
                </div>
                <div className={`w-12 h-12 rounded-full border border-white/[0.1] flex items-center justify-center transition-all duration-500 ${expanded === service.id ? 'bg-white text-black border-white' : 'group-hover:bg-white group-hover:text-black'}`}>
                  {expanded === service.id ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              <AnimatePresence>
                {expanded === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-20 flex flex-col md:flex-row gap-12 md:gap-24 items-center">
                      {/* Image Card */}
                      <div className="w-full md:w-1/2">
                        <div className="relative group/img">
                          <div className="absolute -inset-4 bg-brand-blue/10 blur-2xl rounded-[40px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
                          <div className="relative aspect-[4/3] rounded-[32px] md:rounded-[40px] overflow-hidden border border-white/10 bg-white/[0.02]">
                            <FadeInImage 
                              src={service.image} 
                              alt={service.title}
                              containerClassName="absolute inset-0 w-full h-full"
                              imageClassName="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-700"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="w-full md:w-1/2 space-y-8">
                        <div className="space-y-6">
                          <p className="text-base md:text-lg text-white/80 font-light leading-relaxed tracking-tight">
                            {service.description}
                          </p>
                          
                          {/* Pills */}
                          <div className="flex flex-wrap gap-3">
                            {service.tags.map(tag => (
                              <span key={tag} className="px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-[10px] text-white/70 uppercase tracking-[0.2em] font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Metric & Sub-services */}
                        <div className="pt-8 border-t border-white/5 space-y-6">
                          <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-brand-blue">{service.metric}</span>
                            <span className="text-sm text-white/80 font-light uppercase tracking-wider">{service.metricText}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {service.subServices.map((sub, i) => (
                              <div key={sub} className="flex items-center gap-4">
                                <span className="text-[12px] text-white/70 font-medium">{sub}</span>
                                {i < service.subServices.length - 1 && (
                                  <div className="w-1 h-1 rounded-full bg-white/20" />
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="pt-4">
                            <HashLink smooth to="/#contact">
                              <Button 
                                variant="primary" 
                                className="w-full sm:w-auto rounded-full px-10 py-4 bg-white/10 border border-white/20 hover:bg-white/20 active:bg-brand-blue active:border-brand-blue transition-all duration-300 text-white font-medium text-[11px] uppercase tracking-[0.2em] shadow-lg"
                              >
                                Cotizar Servicio
                              </Button>
                            </HashLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
