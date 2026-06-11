import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowUpRight, Search, Sparkles, X } from 'lucide-react';
import { HashLink } from '@/src/components/layout/HashLink';
import { AGENCY_INFO } from '@/src/constants';
import FloatingLines from '@/src/components/ui/FloatingLines';
import { db } from '@/src/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/src/lib/FirebaseContext';
import { FadeInImage } from '@/src/components/ui/FadeInImage';
import { useSEO } from '@/src/hooks/useSEO';

const STATIC_PROJECTS = [
  {
    id: '01',
    title: 'Avio',
    category: 'TECNOLOGÍA',
    year: '2024',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Avio_dvom0s.webp',
    link: 'https://avio-sports.vercel.app/',
    tags: ['MOVILIDAD ELÉCTRICA', 'NEXT.JS']
  },
  {
    id: '02',
    title: 'Kovr',
    category: 'E-COMMERCE',
    year: '2024',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Kovr_qqxwi4.webp',
    link: 'https://kovr-run.vercel.app/',
    tags: ['CALZADO PREMIUM', 'REACT']
  },
  {
    id: '03',
    title: 'Klipp',
    category: 'TURISMO',
    year: '2024',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Klipp_y1xpwy.webp',
    link: 'https://klipp-travel.vercel.app/',
    tags: ['VIAJES', 'EXPERIENCIAS']
  },
  {
    id: '04',
    title: 'Felimarket',
    category: 'E-COMMERCE',
    year: '2024',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Felimarket_bdt7yb.webp',
    link: 'https://felimarket-premium.vercel.app/',
    tags: ['MINIMARKET DIGITAL', 'RETAIL']
  },
  {
    id: '05',
    title: 'SmartKids',
    category: 'PODCAST',
    year: '2024',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Smartkids_pcp5q0.webp',
    link: 'https://smart-kids-seven.vercel.app/',
    tags: ['PODCAST ESCOLAR', 'EDUCACIÓN']
  },
  {
    id: '06',
    title: 'Zyvara',
    category: 'WEDDING / VENUES',
    year: '2024',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Zyvara_pchccj.webp',
    link: 'https://zyvara-venues.vercel.app/',
    tags: ['GESTIÓN DE VENUES', 'EVENTOS']
  },
  {
    id: '07',
    title: 'Techstore',
    category: 'E-COMMERCE',
    year: '2024',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Techstore_dn60yg.webp',
    link: 'https://techstore-shop.vercel.app/',
    tags: ['HARDWARE', 'TECNOLOGÍA']
  },
  {
    id: '08',
    title: 'Stratos',
    category: 'CORPORATIVO',
    year: '2024',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356355/Stratos_envofy.webp',
    link: 'https://stratos-landing.vercel.app/',
    tags: ['IDENTIDAD', 'SOLUCIONES']
  },
  {
    id: '09',
    title: 'Mithostech',
    category: 'TECNOLOGÍA',
    year: '2024',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356355/MithosTech_hrunno.webp',
    link: 'https://mithostech-one.vercel.app/',
    tags: ['SOPORTE TÉCNICO', 'IT']
  },
  {
    id: '10',
    title: 'Pixlate',
    category: 'E-COMMERCE',
    year: '2024',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776358923/Pixlate_p2jlnk.webp',
    link: 'https://pixlate-multiservice.vercel.app/',
    tags: ['SUMINISTROS', 'RETAIL']
  },
  {
    id: '11',
    title: 'Luvox',
    category: 'BIENESTAR ANIMAL',
    year: '2024',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1778535938/Luvox_oykbwr.webp',
    link: 'https://luvox-vet.vercel.app/',
    tags: ['VETERINARIA', 'BIENESTAR']
  }
];

const STATIC_CATEGORIES = ['Todos', 'E-COMMERCE', 'TECNOLOGÍA', 'TURISMO', 'CORPORATIVO', 'WEDDING / VENUES', 'PODCAST', 'BIENESTAR ANIMAL'];

export const Portfolio = () => {
  useSEO({
    title: 'Portafolio de Diseños Web de Élite',
    description: 'Explora nuestra galería de proyectos premium. Sitios web a medida, e-commerce sofisticados e identidades digitales excepcionales de alto impacto.',
    keywords: 'portafolio diseño web, sitios web premium, casos de éxito desarrollo web, diseño web minimalista, diseño de elite, inspyrio showcase'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<any[]>(STATIC_PROJECTS);
  const [categories, setCategories] = useState<string[]>(STATIC_CATEGORIES);

  useEffect(() => {
    const qProjects = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsubscribeProjects = onSnapshot(qProjects, (snapshot) => {
      if (!snapshot.empty) {
        const dbProjects = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        
        // Safety: Filter duplicates by title if database is messy
        const uniqueMap = new Map();
        dbProjects.forEach((p: any) => {
          // If we see a duplicate title, keep the one that might be 'featured' or just the first one
          if (!uniqueMap.has(p.title)) {
            uniqueMap.set(p.title, p);
          }
        });
        
        const uniqueProjects = Array.from(uniqueMap.values()).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        setProjects(uniqueProjects);
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'projects'));

    const qCategories = query(collection(db, 'categories'), orderBy('order', 'asc'));
    const unsubscribeCategories = onSnapshot(qCategories, (snapshot) => {
      if (!snapshot.empty) {
        setCategories(['Todos', ...snapshot.docs.map(doc => doc.data().name)]);
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'categories'));

    return () => {
      unsubscribeProjects();
      unsubscribeCategories();
    };
  }, []);

  const filteredProjects = projects.filter(p => {
    const query = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.tags && p.tags.some((tag: string) => tag.toLowerCase().includes(query)))
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-dark min-h-screen relative"
    >
      {/* Sophisticated Hero */}
      <section className="pt-64 pb-48 px-6 relative overflow-hidden flex items-center min-h-[70vh]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-blue/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-screen-xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sophisticated-label mb-8"
          >
            Portafolio
          </motion.div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[0.95]"
            >
              Proyectos <br />
              <span className="text-brand-blue">Seleccionados</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-white/50 max-w-sm leading-relaxed font-light text-left md:text-right"
            >
              Una colección de experiencias digitales diseñadas para impactar y perdurar en el tiempo.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search Bar - Sophisticated & Minimalist */}
      <section className="px-6 mb-24 relative z-20">
        <div className="max-w-2xl mx-auto">
          <div className="relative group rounded-full bg-white/[0.02] border border-white/5 focus-within:border-brand-blue/30 focus-within:bg-white/[0.03] transition-all duration-500">
            <div className="flex items-center gap-4 px-8 py-5">
              <Search size={18} className="text-white/20 group-focus-within:text-brand-blue transition-colors duration-300" />
              <input 
                type="text" 
                placeholder="Buscar proyectos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-transparent border-none text-white text-base md:text-lg font-light focus:outline-none placeholder:text-white/10 tracking-tight"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 rounded-full hover:bg-white/5 text-white/30 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          
          {searchQuery && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-[9px] text-white/20 uppercase tracking-[.3em] font-mono"
            >
              Encontrados: {filteredProjects.length}
            </motion.p>
          )}
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="px-6 pb-48">
        <div className="max-w-screen-xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <a 
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group cursor-pointer"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Image Container - Framer Style with Robust Aspect Ratio */}
                    <div className="relative aspect-[4/3] rounded-[40px] md:rounded-[56px] overflow-hidden bg-white/[0.02] border border-white/10 mb-10 group">
                      <FadeInImage 
                        src={project.image} 
                        alt={project.title}
                        containerClassName="absolute inset-0 w-full h-full"
                        imageClassName="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      
                      {/* Floating Tags on Hover */}
                      <div className="absolute bottom-8 left-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white tracking-widest uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Info Container */}
                    <div className="flex justify-between items-start px-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-brand-blue font-bold tracking-widest">{String(index + 1).padStart(2, '0')}</span>
                          <div className="h-px w-6 bg-brand-blue/30" />
                          <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">
                            {project.description || project.category}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-medium text-white tracking-tight group-hover:text-brand-blue transition-colors duration-500">
                          {project.title}
                        </h3>
                      </div>
                      
                      {/* Diagonal Arrow Button */}
                      <div className="mt-2 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 shadow-2xl">
                        <ArrowUpRight size={24} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </motion.div>
                </a>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Creative CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-48 relative rounded-[48px] md:rounded-[64px] bg-white/[0.02] border border-white/5 p-12 lg:p-24 overflow-hidden text-center group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-transparent to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-10">
              <div className="w-20 h-20 rounded-3xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-8 border border-brand-blue/20">
                <Sparkles className="text-brand-blue" size={36} />
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                ¿Tu próximo gran <br />
                <span className="text-brand-blue">proyecto</span> empieza aquí?
              </h2>
              <p className="text-white/60 text-lg lg:text-xl font-light leading-relaxed">
                Estamos listos para llevar tu visión al siguiente nivel con diseño de vanguardia y tecnología de punta.
              </p>
              <div className="pt-8">
                <HashLink 
                  smooth 
                  to="/#contact"
                  className="inline-block px-12 py-5 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform shadow-2xl shadow-white/10 uppercase text-xs tracking-widest"
                >
                  Hablemos de tu idea
                </HashLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};
