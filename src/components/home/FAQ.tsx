import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AGENCY_INFO } from '@/src/constants';
import { db } from '@/src/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const STATIC_FAQS: FAQItem[] = [
  {
    id: 'legacy-faq-0',
    question: '¿Qué tecnologías utilizan en sus proyectos?',
    answer: 'Implementamos el stack más avanzado de la industria: React 19, TypeScript y Tailwind CSS 4 para garantizar un rendimiento y seguridad de nivel superior.',
  },
  {
    id: 'legacy-faq-1',
    question: '¿Cuánto tiempo toma desarrollar un sitio web?',
    answer: 'Dependiendo de la complejidad técnica, un proyecto estándar se completa en un periodo de 3 a 6 semanas, asegurando una ejecución impecable desde el diseño en Figma hasta el despliegue final.',
  },
  {
    id: 'legacy-faq-2',
    question: '¿Trabajan con clientes fuera de Perú?',
    answer: 'Sí. Inspyrio opera de manera global, gestionando proyectos y reuniones de forma remota para marcas internacionales que buscan un estándar de diseño europeo y tecnología de vanguardia.',
  },
  {
    id: 'legacy-faq-3',
    question: '¿Sus diseños son exclusivos o utilizan plantillas?',
    answer: 'Cada interfaz es una pieza de diseño de autor creada desde cero. No utilizamos plantillas genéricas; desarrollamos experiencias únicas alineadas estrictamente a la identidad de su marca.',
  },
  {
    id: 'legacy-faq-4',
    question: '¿Cómo gestionan el contenido dinámico o bases de datos?',
    answer: 'Integramos soluciones modernas como Supabase y Firebase, permitiendo que su plataforma gestione datos y usuarios de forma eficiente, escalable y segura en la nube.',
  },
  {
    id: 'legacy-faq-5',
    question: '¿El sitio estará optimizado para buscadores (SEO)?',
    answer: 'Absolutamente. Desarrollamos con arquitectura semántica y optimización de Core Web Vitals, garantizando que su sitio sea técnicamente perfecto para los algoritmos de Google.',
  },
];

export const FAQ = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>(STATIC_FAQS);

  useEffect(() => {
    const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbFaqs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FAQItem));
      if (dbFaqs.length > 0) {
        setFaqs((current) => {
          const isIdentical = 
            current.length === dbFaqs.length && 
            current.every((item, idx) => 
              item.id === dbFaqs[idx].id && 
              item.question === dbFaqs[idx].question && 
              item.answer === dbFaqs[idx].answer
            );
          return isIdentical ? current : dbFaqs;
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-32 px-6 bg-brand-dark overflow-hidden transition-colors duration-1000">
      <div className="max-w-screen-xl mx-auto">
        {/* Top Badge and Main Heading - Standardized with other sections */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
          <div className="sophisticated-label shrink-0">FAQ</div>
          <h2 className="text-2xl lg:text-4xl font-medium tracking-[-0.02em] text-left md:text-right leading-tight text-white max-w-2xl">
            Proyectos inteligentes. <br />
            Respuestas claras.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">¿No encontraste tu pregunta?</h3>
              <p className="text-white/70 font-light leading-relaxed">
                El equipo de {AGENCY_INFO.name} está aquí para ayudarte. Contáctanos y te responderemos en el menor tiempo posible.
              </p>
            </div>

            {/* Team Profile */}
            <div className="flex items-center gap-4 p-1">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-xl">
                  <img 
                    src={AGENCY_INFO.logos.svg} 
                    alt={AGENCY_INFO.name} 
                    className="w-6 h-6 object-contain opacity-80" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-brand-dark rounded-full" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Equipo {AGENCY_INFO.name}</p>
                <p className="text-xs text-white/70">Estudio de Diseño Global</p>
              </div>
            </div>

            {/* CTA Link */}
            <button className="group flex items-center gap-3 text-white hover:text-brand-blue transition-colors duration-300">
              <span className="text-sm font-medium">Hacer una pregunta</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Accordion */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className={`group border border-white/[0.06] rounded-[24px] overflow-hidden transition-all duration-500 ${
                  expanded === index ? 'bg-white/[0.03] border-white/10 opacity-100' : 'hover:bg-white/[0.01] hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left"
                >
                  <span className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${
                    expanded === index ? 'bg-white text-black rotate-45' : 'group-hover:border-white/30'
                  }`}>
                    <Plus size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {expanded === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-8 pb-8 text-white/70 font-light leading-relaxed max-w-2xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
