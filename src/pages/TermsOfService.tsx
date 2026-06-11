import { motion } from 'motion/react';
import { Gavel, CheckCircle, AlertCircle, Briefcase } from 'lucide-react';
import { useSEO } from '@/src/hooks/useSEO';

export const TermsOfService = () => {
  useSEO({
    title: 'Términos de Servicio',
    description: 'Consulta los acuerdos legales y términos de servicio de Inspyrio para garantizar proyectos y colaboraciones exitosas.',
    keywords: 'terminos de servicio, condiciones de uso, contrato de diseño web, legal inspyrio'
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-dark min-h-screen relative"
    >
      {/* Sophisticated Hero */}
      <section className="pt-64 pb-32 px-6 relative overflow-hidden flex items-center min-h-[60vh]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-blue/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-screen-xl mx-auto relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sophisticated-label mb-8"
          >
            Legal
          </motion.div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-medium tracking-tight text-white leading-[0.9]"
            >
              Términos de <br />
              <span className="text-brand-blue">Servicio</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/40 max-w-sm leading-relaxed font-light text-left md:text-right"
            >
              Acuerdos claros para proyectos de diseño web excepcionales y colaboraciones exitosas.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 pb-48 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-24">
            
            {/* Introduction */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-brand-blue">
                <Gavel size={24} />
                <h2 className="text-2xl font-medium text-white uppercase tracking-widest text-sm">Marco Legal del Servicio</h2>
              </div>
              <p className="text-xl text-white/60 font-light leading-relaxed">
                Al contratar nuestros servicios de diseño y desarrollo web, aceptas los siguientes términos y condiciones. Estos acuerdos están diseñados para proteger tanto tu inversión como nuestra propiedad intelectual y procesos creativos.
              </p>
            </motion.div>

            {/* Grid of details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-8">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-2xl font-medium text-white tracking-tight">Alcance del Proyecto</h3>
                <p className="text-white/40 font-light leading-relaxed">
                  Cada proyecto se define mediante una propuesta detallada que especifica los entregables, plazos y revisiones incluidas. Cualquier cambio fuera del alcance original se presupuestará por separado para mantener la transparencia.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-8">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-2xl font-medium text-white tracking-tight">Propiedad Intelectual</h3>
                <p className="text-white/40 font-light leading-relaxed">
                  Tras el pago final, la propiedad de los diseños finales y el código personalizado se transfiere al cliente. Nos reservamos el derecho de mostrar el trabajo en nuestro portafolio para fines promocionales.
                </p>
              </motion.div>
            </div>

            {/* Detailed sections */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-invert max-w-none space-y-12"
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-medium text-white tracking-tight">Pagos y Facturación</h3>
                <p className="text-white/40 font-light leading-relaxed text-lg">
                  Los proyectos requieren un depósito inicial para comenzar la fase de diseño. Los pagos restantes se estructuran según hitos de entrega. El incumplimiento de los plazos de pago puede resultar en la suspensión temporal del desarrollo del proyecto.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-medium text-white tracking-tight">Garantía y Soporte</h3>
                <p className="text-white/40 font-light leading-relaxed text-lg">
                  Ofrecemos un periodo de garantía post-lanzamiento para corregir cualquier error técnico imprevisto. El soporte continuo y el mantenimiento se ofrecen bajo planes de suscripción independientes para asegurar la longevidad de tu sitio.
                </p>
              </div>
            </motion.div>

            {/* Final Note */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-12 rounded-[40px] bg-white/[0.02] border border-white/10 text-center space-y-6"
            >
              <AlertCircle size={48} className="mx-auto text-brand-blue opacity-50" />
              <p className="text-white/60 font-light italic">
                Al utilizar nuestros servicios, confirmas que has leído y aceptado estos términos. Para cualquier duda legal, por favor contáctanos antes de iniciar el proyecto.
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};
