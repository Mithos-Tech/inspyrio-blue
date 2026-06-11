import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { useState, useEffect } from 'react';
import { db } from '@/src/lib/firebase';
import { collection, onSnapshot, query, orderBy, limit, where } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/src/lib/FirebaseContext';
import { FadeInImage } from '@/src/components/ui/FadeInImage';

const STATIC_PROJECTS = [
  {
    title: 'Avio',
    year: '2024',
    category: 'MOVILIDAD ELÉCTRICA',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Avio_dvom0s.webp',
    link: 'https://avio-sports.vercel.app/',
    tags: ['TECNOLOGÍA', 'NEXT.JS'],
  },
  {
    title: 'Kovr',
    year: '2024',
    category: 'CALZADO PREMIUM',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Kovr_qqxwi4.webp',
    link: 'https://kovr-run.vercel.app/',
    tags: ['E-COMMERCE', 'RETAIL'],
  },
  {
    title: 'Klipp',
    year: '2024',
    category: 'EXPERIENCIAS DE VIAJE',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Klipp_y1xpwy.webp',
    link: 'https://klipp-travel.vercel.app/',
    tags: ['TURISMO', 'DISEÑO'],
  },
];

export const PortfolioPreview = () => {
  const [projects, setProjects] = useState<any[]>(STATIC_PROJECTS);

  useEffect(() => {
    // We try to get projects that are marked as 'isFeatured'
    const q = query(
      collection(db, 'projects'), 
      orderBy('order', 'asc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const rawProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Deduplicate by title FIRST to ensure we have unique projects
        const uniqueMap = new Map();
        rawProjects.forEach((p: any) => {
          if (!uniqueMap.has(p.title) || (p.isFeatured && !uniqueMap.get(p.title).isFeatured)) {
            uniqueMap.set(p.title, p);
          }
        });
        
        const allUnique = Array.from(uniqueMap.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
        
        // Prefer featured ones
        let featured = allUnique.filter((p: any) => p.isFeatured);
        
        // Combine and take first 3 unique entries
        let finalProjects;
        if (featured.length >= 3) {
          finalProjects = featured.slice(0, 3);
        } else {
          // If not enough featured, take all featured + others until we have 3
          const others = allUnique.filter((p: any) => !p.isFeatured);
          finalProjects = [...featured, ...others].slice(0, 3);
        }

        setProjects(finalProjects);
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'projects_preview'));

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-32 px-6 bg-brand-dark">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12 px-4">
          <div className="sophisticated-label shrink-0">Proyectos</div>
          <h2 className="text-3xl lg:text-5xl font-medium tracking-[-0.04em] text-left md:text-right leading-[1] text-white max-w-2xl">
            Trabajos selectos. <br />
            <span className="text-white/40">Pasión por el detalle.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 mb-24">
          {projects.map((project, index) => (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.id || project.title}
              className="block group cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Image Container - Updated to 4:3 Aspect Ratio for more robustness */}
                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-white/[0.06] mb-8 bg-white/[0.02]">
                  <FadeInImage
                    src={project.image}
                    alt={project.title}
                    containerClassName="absolute inset-0 w-full h-full"
                    imageClassName="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Subtle Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Info Container - Below Image */}
                <div className="flex justify-between items-center px-4">
                  <div className="flex flex-col">
                    <h3 className="text-xl lg:text-2xl font-medium text-white tracking-tight group-hover:text-brand-blue transition-colors duration-500">
                      {project.title}
                    </h3>
                    <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] mt-1.5 font-bold">
                      {project.description || project.category}
                    </span>
                  </div>
                  
                  {/* Diagonal Arrow Button - Refined size */}
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500">
                    <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-8">
          <p className="text-white/40 italic font-light text-sm tracking-tight">
            Próximamente más casos de estudio...
          </p>
          <Link to="/portfolio">
            <Button variant="primary" className="px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">
              Ver más
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
