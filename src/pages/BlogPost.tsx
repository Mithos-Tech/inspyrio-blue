import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Check } from 'lucide-react';
import { FadeInImage } from '@/src/components/ui/FadeInImage';
import { useState } from 'react';

const POSTS_CONTENT = {
  'minimalismo-web-moderna': {
    title: 'El Minimalismo en la Web Moderna: Menos es Más',
    date: '24 Feb, 2024',
    readTime: '5 min',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776744052/minimalismo_kz9tmt.webp',
    category: 'DISEÑO',
    content: `
      <p>En un mundo digital saturado de información, el minimalismo no es solo una elección estética, es una necesidad estratégica. El diseño minimalista se centra en lo esencial, eliminando distracciones y permitiendo que el contenido principal brille.</p>
      
      <h2>¿Por qué elegir el minimalismo?</h2>
      <p>El minimalismo mejora la velocidad de carga, facilita la navegación y reduce la carga cognitiva del usuario. Cuando un sitio web es limpio y directo, el usuario sabe exactamente qué hacer y a dónde ir.</p>
      
      <blockquote>
        "La perfección se alcanza, no cuando no hay nada más que añadir, sino cuando no queda nada por quitar." - Antoine de Saint-Exupéry
      </blockquote>

      <h2>Principios Clave</h2>
      <ul>
        <li><strong>Espacio en Blanco:</strong> No es espacio vacío, es una herramienta para dar jerarquía y respiro al diseño.</li>
        <li><strong>Tipografía Potente:</strong> En ausencia de muchos elementos visuales, la tipografía se convierte en la protagonista.</li>
        <li><strong>Paleta de Colores Limitada:</strong> El uso estratégico del color ayuda a dirigir la atención hacia las llamadas a la acción.</li>
      </ul>

      <p>Implementar el minimalismo requiere disciplina. Cada elemento que decidas mantener debe justificar su existencia aportando valor real a la experiencia del usuario.</p>
    `
  },
  'micro-interacciones-ux': {
    title: 'Micro-interacciones: El Secreto de una UX Inolvidable',
    date: '18 Feb, 2024',
    readTime: '7 min',
    image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776744080/Micro-interacciones_UX_hkg44q.webp',
    category: 'UX',
    content: `
      <p>Las micro-interacciones son esos pequeños momentos de interacción que ocurren en un sitio web o aplicación. Desde el cambio de color de un botón al pasar el cursor hasta la animación de carga de una página.</p>
      
      <h2>El impacto de lo pequeño</h2>
      <p>Aunque parezcan insignificantes, las micro-interacciones son fundamentales para crear una sensación de respuesta y vida en el producto digital. Proporcionan feedback inmediato al usuario, confirmando que su acción ha sido procesada.</p>
      
      <h2>Funciones de las micro-interacciones</h2>
      <ul>
        <li><strong>Comunicar feedback:</strong> Indicar que una acción se ha completado con éxito.</li>
        <li><strong>Guiar al usuario:</strong> Ayudar a entender cómo funciona la interfaz.</li>
        <li><strong>Añadir personalidad:</strong> Reforzar la identidad de marca a través del movimiento.</li>
      </ul>

      <p>Una buena micro-interacción debe ser sutil, rápida y necesaria. Si distrae demasiado, deja de ser una herramienta de UX para convertirse en un estorbo visual.</p>
    `
  }
};

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS_CONTENT[slug as keyof typeof POSTS_CONTENT];
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Artículo no encontrado</h1>
          <Link to="/blog" className="text-brand-blue hover:underline">Volver al blog</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-dark min-h-screen pt-40 pb-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Volver al blog
        </Link>

        {/* Header */}
        <div className="space-y-8 mb-16">
          <div className="flex items-center gap-4">
            <span className="px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-[10px] font-bold text-brand-blue tracking-widest uppercase">
              {post.category}
            </span>
            <div className="flex items-center gap-6 text-[10px] font-bold text-white/50 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Calendar size={12} />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={12} />
                {post.readTime}
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-[40px] md:rounded-[56px] overflow-hidden border border-white/10 mb-16">
          <FadeInImage 
            src={post.image} 
            alt={post.title}
            containerClassName="absolute inset-0 w-full h-full"
            imageClassName="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div 
          className="prose prose-invert prose-blue max-w-none 
            prose-p:text-lg prose-p:text-white/80 prose-p:font-light prose-p:leading-relaxed prose-p:mb-8
            prose-headings:text-white prose-headings:tracking-tight prose-headings:font-medium
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8
            prose-strong:text-white prose-strong:font-semibold
            prose-blockquote:border-l-brand-blue prose-blockquote:bg-white/[0.03] prose-blockquote:p-10 prose-blockquote:rounded-3xl prose-blockquote:italic prose-blockquote:text-white/90 prose-blockquote:my-12 prose-blockquote:border-l-4
            prose-ul:text-white/60 prose-ul:list-disc prose-ul:pl-6 prose-ul:my-8
            prose-li:mb-4 prose-li:pl-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-white/[0.02]">
              <img 
                src="https://res.cloudinary.com/dkoshgzxo/image/upload/v1776799538/marcus_a8hgtw.webp" 
                alt="Marcus Inspyrio"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Marcus Inspyrio</p>
              <p className="text-white/60 text-xs">Creative Director</p>
            </div>
          </div>
          <button 
            onClick={handleShare}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all cursor-pointer relative group active:scale-95"
            title="Compartir artículo"
          >
            {copied ? (
              <Check size={20} className="text-emerald-500 animate-pulse" />
            ) : (
              <Share2 size={20} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
