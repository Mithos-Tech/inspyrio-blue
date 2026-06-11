import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeInImage } from '@/src/components/ui/FadeInImage';

const POSTS = [
  {
    slug: 'minimalismo-web-moderna',
    title: 'El Minimalismo en la Web Moderna: Menos es Más',
    excerpt: 'Descubre cómo la simplicidad puede elevar la experiencia del usuario y mejorar el rendimiento de tu sitio web.',
    date: '24 Feb, 2024',
    readTime: '5 min',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776744052/minimalismo_kz9tmt.webp',
    category: 'DISEÑO'
  },
  {
    slug: 'micro-interacciones-ux',
    title: 'Micro-interacciones: El Secreto de una UX Inolvidable',
    excerpt: 'Los pequeños detalles son los que marcan la diferencia. Aprende a usar micro-interacciones para deleitar a tus usuarios.',
    date: '18 Feb, 2024',
    readTime: '7 min',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776744080/Micro-interacciones_UX_hkg44q.webp',
    category: 'UX'
  },
];

export const Blog = () => {
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
            Blog
          </motion.div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-medium tracking-tight text-white leading-[0.95]"
            >
              Ideas & <br />
              <span className="text-brand-blue">Perspectivas</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-white/70 max-w-sm leading-relaxed font-light text-left md:text-right"
            >
              Explorando la intersección entre el diseño minimalista y la tecnología de vanguardia.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-6 pb-48 relative z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {POSTS.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`} className="block space-y-8">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] rounded-[40px] md:rounded-[56px] overflow-hidden bg-white/[0.02] border border-white/10 group">
                    <FadeInImage
                      src={post.image}
                      alt={post.title}
                      containerClassName="absolute inset-0 w-full h-full"
                      imageClassName="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    {/* Category Tag */}
                    <div className="absolute top-8 left-8">
                      <span className="px-4 py-1.5 rounded-full bg-brand-blue/20 backdrop-blur-md border border-brand-blue/30 text-[9px] font-bold text-brand-blue tracking-widest uppercase">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6 px-4">
                    <div className="flex items-center gap-6 text-[10px] font-bold text-white/50 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-brand-blue" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-brand-blue" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight group-hover:text-brand-blue transition-colors duration-500 leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-base md:text-lg text-white/60 font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-3 text-brand-blue font-bold text-[11px] uppercase tracking-widest pt-2">
                      Leer más <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
