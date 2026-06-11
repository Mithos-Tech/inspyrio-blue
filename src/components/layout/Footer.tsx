import { Link } from 'react-router-dom';
import { HashLink } from '@/src/components/layout/HashLink';
import { AGENCY_INFO, NAV_LINKS } from '@/src/constants';
import { Plus, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const GlobalClock = ({ city, timezone }: { city: string, timezone: string }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: timezone
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">{city}</span>
      <span className="text-[13px] text-white/90 font-mono tracking-tighter">{time}</span>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-32 pb-12 px-6 relative overflow-hidden border-t border-white/5">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-16">
          {/* Main Brand Section */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <Link to="/" className="inline-flex items-center gap-4 group">
                <motion.div 
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/10 group-hover:border-brand-blue/40 transition-colors"
                >
                  <img 
                    src={AGENCY_INFO.logos.svg} 
                    alt={AGENCY_INFO.name} 
                    className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" 
                  />
                </motion.div>
                <span className="font-semibold text-xl tracking-tight text-white">{AGENCY_INFO.name}</span>
              </Link>
              <h3 className="text-3xl md:text-4xl font-medium text-white leading-[1.1] tracking-tight max-w-sm">
                Forjando el futuro del <span className="text-brand-blue">diseño digital.</span>
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
              <GlobalClock city="Madrid" timezone="Europe/Madrid" />
              <GlobalClock city="N. York" timezone="America/New_York" />
              <GlobalClock city="Tokyo" timezone="Asia/Tokyo" />
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 lg:ml-12 space-y-8">
            <p className="text-[10px] text-white/50 font-bold tracking-[0.3em] uppercase">Navegación</p>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center gap-2 text-[14px] font-light text-white/70 hover:text-white transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-brand-blue transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="lg:col-span-2 space-y-8">
            <p className="text-[10px] text-white/50 font-bold tracking-[0.3em] uppercase">Social</p>
            <ul className="space-y-4">
              {[
                { name: 'LinkedIn', url: 'https://linkedin.com/' },
                { name: 'Instagram', url: 'https://instagram.com/' },
                { name: 'Dribbble', url: 'https://dribbble.com/' },
                { name: 'Behance', url: 'https://behance.net/' }
              ].map((social) => (
                <li key={social.name}>
                  <a 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-light text-white/70 hover:text-white transition-colors duration-300 flex items-center justify-between group"
                  >
                    {social.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Column */}
          <div className="lg:col-span-3 space-y-8">
            <p className="text-[10px] text-white/50 font-bold tracking-[0.3em] uppercase">Contacto rápido</p>
            <div className="space-y-6">
              <a 
                href={`mailto:${AGENCY_INFO.email}`} 
                className="group block"
              >
                <span className="text-[11px] text-white/60 block mb-1">Escríbenos</span>
                <span className="text-lg font-medium text-white group-hover:text-brand-blue transition-colors duration-300 border-b border-white/10 pb-1">
                  {AGENCY_INFO.email}
                </span>
              </a>
              
              <HashLink smooth to="/#contact" className="block">
                <button className="w-full bg-white text-black py-4 rounded-full flex items-center justify-center gap-3 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-brand-blue hover:text-white transition-all duration-500 shadow-xl shadow-black/20">
                  Iniciar proyecto
                  <Plus size={16} />
                </button>
              </HashLink>
            </div>
          </div>
        </div>

        {/* Central Brand Display */}
        <div className="py-12 md:py-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[8vw] lg:text-[10vw] xl:text-[130px] font-tech font-bold leading-none tracking-tight uppercase text-brand-blue select-none"
          >
            {AGENCY_INFO.name}
          </motion.h2>
        </div>

        {/* Bottom Bar: Clean & Elegant */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-2">
            <p className="text-[13px] text-white/60 font-light translate-y-[-2px]">
              © 2026 <span className="text-brand-blue font-medium">{AGENCY_INFO.name}</span>. Todos los derechos reservados.
            </p>
            <Link 
              to="/admin" 
              className="text-[8px] text-white/5 hover:text-white/20 transition-colors uppercase tracking-[0.3em] font-bold block mt-1"
            >
              Master Access
            </Link>
          </div>
          
          <div className="flex items-center gap-10">
            <Link to="/privacy" className="text-[13px] text-white/50 hover:text-white transition-colors font-light">Privacidad</Link>
            <Link to="/terms" className="text-[13px] text-white/50 hover:text-white transition-colors font-light">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

