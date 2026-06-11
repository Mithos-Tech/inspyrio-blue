import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Search, 
  Zap, 
  List, 
  Layers, 
  Layout, 
  FileText, 
  LayoutGrid, 
  RefreshCw, 
  PenTool, 
  Folder, 
  Globe, 
  Smartphone, 
  FileSpreadsheet 
} from 'lucide-react';

const STEPS = [
  {
    id: '01',
    title: 'Estrategia',
    description: 'Análisis y roadmap.',
    tags: ['Análisis', 'Roadmap', 'SEO'],
  },
  {
    id: '02',
    title: 'Diseño UI/UX',
    description: 'Wireframes y prototipos.',
    tags: ['Wireframes', 'Prototipos', 'Figma'],
  },
  {
    id: '03',
    title: 'Desarrollo',
    description: 'Codificación y pruebas.',
    tags: ['Frontend', 'Backend', 'Testing'],
  },
  {
    id: '04',
    title: 'Lanzamiento',
    description: 'Despliegue y soporte.',
    tags: ['Deploy', 'Soporte', 'Dominio'],
  },
];

const MOCKUPS = [
  { id: 1, rotate: -5, image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776893856/Estrategia_kynul3.webp' },
  { id: 2, rotate: 3, image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776893856/Dise%C3%B1o_UIUX_nbz3v2.webp' },
  { id: 3, rotate: -2, image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776893856/desarrollo_uyyyel.webp' },
  { id: 4, rotate: 4, image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776893856/lanzamiento_oullop.webp' },
];

export const Process = () => {
  return (
    <section className="py-32 px-6 bg-brand-dark overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header - Outside the container */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
          <div className="sophisticated-label shrink-0">Proceso</div>
          <h2 className="text-2xl lg:text-4xl font-medium tracking-[-0.02em] text-left md:text-right leading-tight text-white max-w-2xl">
            Diseño fluido. <br />
            Resultados sin fricción.
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="group relative w-full bg-white/[0.01] border border-white/[0.06] hover:border-brand-blue/60 rounded-[48px] p-12 md:p-24 flex flex-col items-center text-center overflow-hidden transition-all duration-700 hover:shadow-[0_0_80px_-20px_rgba(0,102,255,0.15)]"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-blue/5 blur-[120px] pointer-events-none group-hover:bg-brand-blue/15 transition-colors duration-700" />
          
          {/* Floating Mockups */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32 w-full relative z-10">
            {MOCKUPS.map((mock, index) => (
              <motion.div
                key={mock.id}
                initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: mock.rotate }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/[0.08] bg-white/[0.03] p-1.5 group-hover:border-brand-blue/20 transition-colors duration-700"
              >
                <img 
                  src={mock.image} 
                  alt="Process step mockup" 
                  className="w-full h-full object-cover rounded-xl opacity-80"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>

          {/* Timeline - Desktop (Horizontal) */}
          <div className="hidden md:block w-full max-w-4xl relative z-10 mb-20">
            <div className="flex items-center justify-between text-[11px] font-medium text-white/50 uppercase tracking-widest mb-4">
              <div className="flex-1 flex items-center justify-between">
                <span>Paso 1</span>
                <div className="flex gap-1 opacity-20 px-4">
                  {[...Array(8)].map((_, i) => <div key={i} className="w-[1px] h-3 bg-white" />)}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span>Paso 2</span>
                <div className="flex gap-1 opacity-20 px-4">
                  {[...Array(8)].map((_, i) => <div key={i} className="w-[1px] h-3 bg-white" />)}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span>Paso 3</span>
                <div className="flex gap-1 opacity-20 px-4">
                  {[...Array(8)].map((_, i) => <div key={i} className="w-[1px] h-3 bg-white" />)}
                </div>
              </div>
              <div className="flex-none">
                <span>Paso 4</span>
              </div>
            </div>
            <div className="h-[1px] w-full bg-white/10" />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 md:gap-12 w-full relative z-10">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex flex-col items-center group/step relative"
              >
                {/* Mobile Step Indicator & Connector */}
                <div className="md:hidden flex flex-col items-center mb-8">
                  <div className="w-10 h-10 rounded-full border border-brand-blue/30 flex items-center justify-center mb-4 bg-brand-blue/5">
                    <span className="text-[12px] font-bold text-brand-blue">{step.id}</span>
                  </div>
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">Paso {step.id}</span>
                  {index < STEPS.length - 1 && (
                    <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-brand-blue/20 to-transparent" />
                  )}
                </div>

                <h3 className="text-2xl font-medium text-white mb-6 tracking-tight group-hover/step:text-brand-blue transition-colors duration-300">
                  {step.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {step.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[9px] text-white/40 uppercase tracking-[0.2em] font-medium hover:text-white hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all duration-300 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
