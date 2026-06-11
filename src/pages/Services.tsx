import { motion } from 'motion/react';
import { useEffect } from 'react';
import { AGENCY_INFO } from '@/src/constants';
import { FadeInImage } from '@/src/components/ui/FadeInImage';
import { HashLink } from '@/src/components/layout/HashLink';

const SERVICES_DATA = [
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
  {
    id: '04',
    title: 'Mantenimiento Web',
    description: 'Tu sitio siempre al día. Nos encargamos de las actualizaciones, seguridad y soporte técnico para que tú te enfoques en lo que realmente importa: tu negocio.',
    tags: ['Seguridad', 'Updates', 'Soporte'],
    metric: '24/7',
    metricText: 'monitoreo de disponibilidad',
    subServices: ['Bug Fixing', 'Security Audits', 'Cloud Hosting', 'Technical Support'],
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776485675/Mantenimiento_Web_qp4uvo.webp',
  },
  {
    id: '05',
    title: 'Identidad Digital',
    description: 'Construimos una presencia coherente y potente. Desde el branding básico hasta activos digitales para redes sociales que resuenan con tu audiencia.',
    tags: ['Branding', 'Social Media', 'Graphic Design'],
    metric: '+60%',
    metricText: 'reconocimiento de marca',
    subServices: ['Logo Design', 'Brand Guidelines', 'Social Assets', 'Digital Marketing'],
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776485675/Identidad_Digital_rrlfdv.webp',
  },
];

export const Services = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `Servicios | ${AGENCY_INFO.name}`;
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-dark min-h-screen"
    >
      {/* Sophisticated Hero */}
      <section className="pt-64 pb-48 px-6 relative overflow-hidden flex items-center min-h-[70vh]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-blue/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-screen-xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sophisticated-label mb-8"
          >
            Experticia
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-medium tracking-tight mb-8 text-white leading-[1.1]"
          >
            Soluciones que <br /> <span className="text-brand-blue">elevan tu marca</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-white/40 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Combinamos diseño estratégico y tecnología de vanguardia para crear experiencias digitales que dejan huella.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto space-y-32 md:space-y-48">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
            >
              {/* Image Card */}
              <div className="w-full md:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-brand-blue/10 blur-2xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative aspect-[4/3] rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/10 bg-white/[0.02]">
                    <FadeInImage 
                      src={service.image} 
                      alt={service.title}
                      containerClassName="absolute inset-0 w-full h-full"
                      imageClassName="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div className="w-full md:w-1/2 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-brand-blue font-mono text-sm font-bold tracking-widest">{service.id}</span>
                    <div className="h-px w-8 bg-brand-blue/30" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Pills */}
                  <div className="flex flex-wrap gap-3">
                    {service.tags.map(tag => (
                      <span key={tag} className="px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-[11px] text-white/50 uppercase tracking-widest font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metric & Sub-services */}
                <div className="pt-8 border-t border-white/5 space-y-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-brand-blue">{service.metric}</span>
                    <span className="text-sm text-white/40 font-light uppercase tracking-wider">{service.metricText}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {service.subServices.map((sub, i) => (
                      <div key={sub} className="flex items-center gap-4">
                        <span className="text-[12px] text-white/30 font-medium">{sub}</span>
                        {i < service.subServices.length - 1 && (
                          <div className="w-1 h-1 rounded-full bg-white/10" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA or Footer Spacer */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white">¿Listo para empezar?</h2>
          <p className="text-white/40 font-light">Transformemos tu visión en una realidad digital impactante.</p>
          <HashLink smooth to="/#contact" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-brand-blue text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-brand-blue/90 transition-colors cursor-pointer"
            >
              Hablemos de tu proyecto
            </motion.button>
          </HashLink>
        </div>
      </section>
    </motion.div>
  );
};
