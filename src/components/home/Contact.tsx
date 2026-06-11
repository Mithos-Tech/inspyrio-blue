import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AGENCY_INFO } from '@/src/constants';

export const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://submit-form.com/inLX5WFrD", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-brand-dark relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Section Header - Standardized */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
          <div className="sophisticated-label shrink-0">Contacto</div>
          <h2 className="text-2xl lg:text-4xl font-medium tracking-[-0.02em] text-left md:text-right leading-tight text-white max-w-2xl">
            Trabajemos juntos. <br />
            Hablemos hoy.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start relative">
          {/* Left Side - Info */}
          <div className="lg:col-span-4 space-y-16 relative z-10">
            <div className="space-y-8">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl lg:text-4xl font-medium text-white leading-[1.1] tracking-tight"
              >
                Tu visión merece un <br />
                <span className="text-brand-blue">lenguaje propio.</span>
              </motion.h3>
              
              <p className="text-base text-white/50 font-light leading-relaxed max-w-sm">
                Ya sea que estés lanzando un sitio web, una interfaz compleja o una identidad de marca completa — estamos aquí para elevar cada detalle.
              </p>
            </div>

            {/* Team Profile - Refined spacing */}
            <div className="flex items-center gap-5 p-1 pt-8 border-t border-white/5">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-xl">
                  <img 
                    src={AGENCY_INFO.logos.svg} 
                    alt={AGENCY_INFO.name} 
                    className="w-6 h-6 object-contain opacity-90" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-brand-dark rounded-full" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Equipo {AGENCY_INFO.name}</p>
                <p className="text-xs text-white/80">Estudio de Diseño Global</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/[0.03] border border-white/10 rounded-[32px] p-12 text-center space-y-6 backdrop-blur-xl"
                >
                  <div className="w-20 h-20 bg-brand-blue/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="text-brand-blue w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-medium text-white tracking-tight">¡Mensaje Recibido!</h3>
                  <p className="text-white/60 font-light leading-relaxed max-w-sm mx-auto">
                    Gracias por ponerte en contacto con nosotros. Marcus revisará tu solicitud personalmente y te responderemos en menos de 24 horas.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-brand-blue text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors pt-4"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h4 className="text-3xl lg:text-4xl font-medium text-white mb-16 tracking-tight">Ponte en contacto</h4>
                  
                  <form 
                    onSubmit={handleSubmit}
                    className="space-y-12"
                  >
                    {/* Name Field */}
                    <div className="group relative">
                      <label className="block text-[11px] uppercase tracking-[0.2em] text-white/80 mb-4 transition-colors group-focus-within:text-brand-blue">Tu nombre *</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        disabled={status === 'submitting'}
                        className="w-full bg-transparent py-4 text-white text-lg font-light placeholder:text-white/20 border-none ring-0 focus:ring-0 focus:outline-none"
                        placeholder="Nombre Apellido"
                      />
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 origin-left"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>

                    {/* Email Field */}
                    <div className="group relative">
                      <label className="block text-[11px] uppercase tracking-[0.2em] text-white/80 mb-4 transition-colors group-focus-within:text-brand-blue">Email *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        disabled={status === 'submitting'}
                        className="w-full bg-transparent py-4 text-white text-lg font-light placeholder:text-white/20 border-none ring-0 focus:ring-0 focus:outline-none"
                        placeholder="tu@email.com"
                      />
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 origin-left"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>

                    {/* Message Field */}
                    <div className="group relative">
                      <label className="block text-[11px] uppercase tracking-[0.2em] text-white/80 mb-4 transition-colors group-focus-within:text-brand-blue">Cuéntanos sobre tu proyecto...</label>
                      <textarea 
                        name="message"
                        required
                        disabled={status === 'submitting'}
                        className="w-full bg-transparent py-4 text-white text-lg font-light placeholder:text-white/20 min-h-[120px] resize-none border-none ring-0 focus:ring-0 focus:outline-none"
                        placeholder="Idea, objetivos, presupuesto..."
                      />
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 origin-left"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                      <button 
                        type="submit"
                        disabled={status === 'submitting'}
                        className="group flex items-center gap-4 bg-white text-black px-10 py-4 rounded-full font-medium text-[12px] uppercase tracking-[0.2em] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {status === 'submitting' ? (
                          <>
                            <span>Enviando...</span>
                            <Loader2 size={18} className="animate-spin" />
                          </>
                        ) : (
                          <>
                            <span>Enviar Mensaje</span>
                            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </>
                        )}
                      </button>
                      
                      {status === 'error' && (
                        <p className="mt-4 text-xs text-red-500 font-medium">
                          Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
                        </p>
                      )}

                      <p className="mt-8 text-xs text-white/80">
                        Sin spam. Sin datos compartidos. → <Link to="/privacy" className="hover:text-white cursor-pointer transition-colors">Política de Privacidad</Link>
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
