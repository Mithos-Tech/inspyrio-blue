import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicy = () => {
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
              Política de <br />
              <span className="text-brand-blue">Privacidad</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/40 max-w-sm leading-relaxed font-light text-left md:text-right"
            >
              Cómo protegemos tu información y garantizamos la transparencia en nuestros servicios de diseño.
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
                <Shield size={24} />
                <h2 className="text-2xl font-medium text-white uppercase tracking-widest text-sm">Compromiso de Confidencialidad</h2>
              </div>
              <p className="text-xl text-white/60 font-light leading-relaxed">
                En nuestro estudio de diseño web, la privacidad de nuestros clientes y colaboradores es una prioridad absoluta. Esta política detalla cómo recopilamos, utilizamos y protegemos los datos personales que nos proporcionas durante el proceso de diseño y desarrollo.
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
                  <Eye size={24} />
                </div>
                <h3 className="text-2xl font-medium text-white tracking-tight">Recopilación de Datos</h3>
                <p className="text-white/40 font-light leading-relaxed">
                  Recopilamos información esencial a través de nuestros formularios de contacto y sesiones de consultoría, incluyendo nombres, correos electrónicos y detalles específicos del proyecto para ofrecer una propuesta personalizada.
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
                  <Lock size={24} />
                </div>
                <h3 className="text-2xl font-medium text-white tracking-tight">Seguridad de la Información</h3>
                <p className="text-white/40 font-light leading-relaxed">
                  Implementamos protocolos de seguridad de vanguardia para proteger tus activos digitales y datos sensibles. No compartimos información con terceros sin un acuerdo de confidencialidad explícito.
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
                <h3 className="text-3xl font-medium text-white tracking-tight">Uso de Cookies y Analítica</h3>
                <p className="text-white/40 font-light leading-relaxed text-lg">
                  Utilizamos herramientas de análisis para entender cómo interactúan los usuarios con nuestro portafolio. Estas herramientas recopilan datos anónimos que nos ayudan a mejorar la experiencia de usuario y el rendimiento técnico de nuestros sitios.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-medium text-white tracking-tight">Tus Derechos</h3>
                <p className="text-white/40 font-light leading-relaxed text-lg">
                  Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. Para cualquier solicitud relacionada con tu privacidad, puedes contactarnos directamente a través de nuestro canal oficial de soporte.
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
              <FileText size={48} className="mx-auto text-brand-blue opacity-50" />
              <p className="text-white/60 font-light italic">
                Última actualización: 26 de Febrero, 2026. Nos reservamos el derecho de actualizar esta política para reflejar cambios en nuestras prácticas operativas.
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};
