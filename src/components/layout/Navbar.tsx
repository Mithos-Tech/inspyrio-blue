import { Link, useLocation } from 'react-router-dom';
import { HashLink } from '@/src/components/layout/HashLink';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { NAV_LINKS, AGENCY_INFO } from '@/src/constants';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';
import { ArrowUpRight, X } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 md:p-8"
    >
      <div className="glass rounded-full px-6 md:px-8 py-3 flex items-center gap-10 max-w-screen-xl w-full justify-between lg:w-auto shadow-2xl shadow-black/50 border border-white/10">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={AGENCY_INFO.logos.svg} 
            alt={AGENCY_INFO.name} 
            className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-500" 
            referrerPolicy="no-referrer"
          />
          <span className="font-semibold text-lg tracking-[-0.03em] text-white">{AGENCY_INFO.name}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => {
                if (location.pathname === link.path) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={cn(
                'text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-white',
                location.pathname === link.path ? 'text-white' : 'text-white/40'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block border-l border-white/[0.08] pl-8">
          <HashLink 
            smooth 
            to="/#contact"
            scroll={(el) => {
              const offset = 80; // Navbar height
              const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
              });
            }}
          >
            <Button size="sm" variant="primary" className="text-[10px] uppercase tracking-[0.2em] px-6 py-2.5 rounded-full">
              Agendar Reunión
            </Button>
          </HashLink>
        </div>

        {/* Mobile Toggle - Sophisticated Hamburger */}
        <button 
          className="lg:hidden flex flex-col gap-1.5 p-2" 
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
        >
          <div className="w-6 h-[2px] bg-white rounded-full" />
          <div className="w-4 h-[2px] bg-white rounded-full self-end" />
          <div className="w-5 h-[2px] bg-white rounded-full self-end" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for focus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
            />

            {/* Top-down Menu Card */}
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-6 left-6 right-6 bg-[#0a0a0a]/90 backdrop-blur-2xl z-[60] lg:hidden flex flex-col rounded-[24px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
              style={{ height: 'auto' }}
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-1">
                  <img 
                    src={AGENCY_INFO.logos.svg} 
                    alt={AGENCY_INFO.name} 
                    className="w-6 h-6 object-contain" 
                    referrerPolicy="no-referrer"
                  />
                  <span className="font-semibold text-sm tracking-tight text-white">{AGENCY_INFO.name}</span>
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-white/40 hover:text-white transition-colors"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col items-center gap-1 p-2 py-4">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="w-full"
                  >
                    <Link
                      to={link.path}
                      onClick={() => {
                        setIsOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={cn(
                        "flex items-center justify-center px-4 py-3 rounded-xl text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-300",
                        location.pathname === link.path 
                          ? "bg-white/5 text-white scale-[1.02]" 
                          : "text-white/30 hover:text-white hover:bg-white/[0.03] hover:scale-[1.02]"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Action Area */}
              <div className="p-4 pt-0 flex justify-center">
                <HashLink 
                  smooth 
                  to="/#contact" 
                  onClick={() => setIsOpen(false)}
                  className="block w-fit"
                  scroll={(el) => {
                    const offset = 80;
                    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                      top: elementPosition - offset,
                      behavior: 'smooth'
                    });
                  }}
                >
                  <button className="min-w-[180px] bg-white text-black py-3 px-8 rounded-full font-bold text-[9px] uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-neutral-200 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl shadow-white/5">
                    Agendar Reunión
                    <ArrowUpRight size={13} />
                  </button>
                </HashLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
