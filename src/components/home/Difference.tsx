import { motion } from 'motion/react';

export const Difference = () => {
  const assets = {
    velocity: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1780542833/velocidad_blue_fp5w8y.svg",
    seo: "https://res.cloudinary.com/dk1tkgjpj/image/upload/v1771985897/seo_sui9tt.svg",
    codigo: "https://res.cloudinary.com/dk1tkgjpj/image/upload/v1771985897/codigo_cdvvyu.svg",
    mobile: "https://res.cloudinary.com/dk1tkgjpj/image/upload/v1771985898/Mobile-First_c4xhsi.jpg",
    ux: "https://res.cloudinary.com/dk1tkgjpj/image/upload/v1771985897/ux_qcfim6.svg"
  };

  return (
    <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Section Header - Standardized with other sections */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
          <div className="sophisticated-label shrink-0">¿Por qué?</div>
          <h2 className="text-2xl lg:text-4xl font-medium tracking-[-0.02em] text-left md:text-right leading-tight text-white max-w-2xl">
            Ventajas competitivas. <br />
            Soluciones de alto nivel.
          </h2>
        </div>

        {/* Bento Grid - Clean & Sharp Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[360px] md:auto-rows-[260px]">
          
          {/* 1. Velocidad de Carga Extrema (Top Left - Tall) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 md:row-span-2 rounded-[40px] border-[0.5px] border-white/10 bg-[#0A0A0A] flex flex-col overflow-hidden group relative"
          >
            <div className="p-10 pb-0 text-center relative z-10">
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-4 tracking-tight">Velocidad de <br /> Carga Extrema</h3>
              <p className="text-white/80 font-light text-[12px] leading-relaxed max-w-[240px] mx-auto tracking-tight">
                Optimizamos cada línea para tiempos de respuesta inferiores a 0.5s.
              </p>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full flex justify-center items-end px-8 pb-8 pointer-events-none">
              <motion.img 
                src={assets.velocity} 
                alt="Velocity" 
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[200px] md:max-h-[240px] object-contain"
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* 2. SEO y Conversión (Top Center - Tall) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 md:row-span-2 rounded-[40px] border-[0.5px] border-white/10 bg-[#0A0A0A] flex flex-col overflow-hidden group relative"
          >
            <div className="p-10 pb-0 text-center relative z-10">
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-4 tracking-tight">SEO y Conversión</h3>
              <p className="text-white/80 font-light text-[12px] leading-relaxed mx-auto tracking-tight">
                Diseñamos para vender. <br /> Tu éxito es nuestra métrica.
              </p>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full px-4 pb-6 pointer-events-none select-none">
              <svg 
                viewBox="0 0 500 310" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto overflow-visible"
              >
                <defs>
                  {/* Gradients */}
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="50%" stopColor="#00D2FF" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                  
                  {/* Glow Filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  
                  <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Horizontal Gridlines */}
                {[10, 61, 112, 163, 214, 265].map((yVal, i) => (
                  <line 
                    key={`grid-${i}`}
                    x1="35" 
                    y1={yVal} 
                    x2="465" 
                    y2={yVal} 
                    stroke="rgba(255, 255, 255, 0.05)" 
                    strokeWidth="0.5" 
                  />
                ))}

                {/* Vertical helper dotted lines for premium dashboard aesthetic */}
                {[40, 78, 116, 154, 192, 230, 268, 306, 344, 382, 420, 458].map((xVal, i) => (
                  <line
                    key={`v-grid-${i}`}
                    x1={xVal}
                    y1="10"
                    x2={xVal}
                    y2="265"
                    stroke="rgba(255, 255, 255, 0.03)"
                    strokeWidth="0.5"
                    strokeDasharray="2 3"
                  />
                ))}

                {/* Gradient area fill */}
                <motion.path 
                  d="M 40,260 C 59,260 59,241 78,241 C 97,241 97,216 116,216 C 135,216 135,216 154,216 C 173,216 173,184 192,184 C 211,184 211,184 230,184 C 249,184 249,138 268,138 C 287,138 287,133 306,133 C 325,133 325,98 344,98 C 363,98 363,74 382,74 C 401,74 401,61 420,61 C 439,61 439,10 458,10 L 458,265 L 40,265 Z" 
                  fill="url(#areaGradient)" 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                />

                {/* Neon blur stroke layer for glow */}
                <motion.path 
                  d="M 40,260 C 59,260 59,241 78,241 C 97,241 97,216 116,216 C 135,216 135,216 154,216 C 173,216 173,184 192,184 C 211,184 211,184 230,184 C 249,184 249,138 268,138 C 287,138 287,133 306,133 C 325,133 325,98 344,98 C 363,98 363,74 382,74 C 401,74 401,61 420,61 C 439,61 439,10 458,10" 
                  fill="none" 
                  stroke="#2563EB" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  opacity="0.4"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                />

                {/* Primary trend line */}
                <motion.path 
                  d="M 40,260 C 59,260 59,241 78,241 C 97,241 97,216 116,216 C 135,216 135,216 154,216 C 173,216 173,184 192,184 C 211,184 211,184 230,184 C 249,184 249,138 268,138 C 287,138 287,133 306,133 C 325,133 325,98 344,98 C 363,98 363,74 382,74 C 401,74 401,61 420,61 C 439,61 439,10 458,10" 
                  fill="none" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                />

                {/* Vertex dot markers with individual animations */}
                {[
                  { x: 40, y: 260 },
                  { x: 78, y: 241 },
                  { x: 116, y: 216 },
                  { x: 154, y: 216 },
                  { x: 192, y: 184 },
                  { x: 230, y: 184 },
                  { x: 268, y: 138 },
                  { x: 306, y: 133 },
                  { x: 344, y: 98 },
                  { x: 382, y: 74 },
                  { x: 420, y: 61 },
                  { x: 458, y: 10 }
                ].map((pt, i) => (
                  <g key={`point-${i}`}>
                    {/* Pulsing glow ring on each point */}
                    <motion.circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="4" 
                      fill={i < 6 ? "#2563EB" : i < 10 ? "#00D2FF" : "#a855f7"} 
                      opacity="0.6"
                      filter="url(#dotGlow)"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 + 0.6, type: 'spring', stiffness: 300, damping: 15 }}
                    />
                    {/* White center point */}
                    <motion.circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="2" 
                      fill="#FFFFFF" 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 + 0.7, type: 'spring', stiffness: 300, damping: 15 }}
                    />
                  </g>
                ))}

                {/* Monthly X Axis Labels */}
                {["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"].map((month, i) => {
                  const xPositions = [40, 78, 116, 154, 192, 230, 268, 306, 344, 382, 420, 458];
                  return (
                    <text 
                      key={`month-lbl-${i}`}
                      x={xPositions[i]} 
                      y="290" 
                      fill="rgba(255, 255, 255, 0.45)" 
                      fontSize="9.5" 
                      fontFamily="sans-serif"
                      textAnchor="middle"
                      className="font-medium tracking-tight"
                    >
                      {month}
                    </text>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* 3. Código Limpio y Escalable (Top Right - Small) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 md:row-span-1 rounded-[40px] border-[0.5px] border-white/10 bg-[#0A0A0A] p-8 md:p-10 flex items-center relative overflow-hidden group"
          >
            <div className="relative z-10 w-[55%] md:w-[60%]">
              <p className="text-white/80 text-[11px] mb-3 font-light leading-relaxed tracking-tight uppercase">
                Bases sólidas que evolucionan.
              </p>
              <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight leading-tight">Código Limpio <br /> y Escalable</h3>
            </div>
            <div className="absolute right-0 top-0 h-full w-[45%] md:w-1/2 flex items-center justify-end pointer-events-none">
              <motion.img 
                src={assets.codigo} 
                alt="Code" 
                loading="lazy"
                decoding="async"
                className="h-full w-auto max-w-none object-contain object-left translate-x-[65%] md:translate-x-[35%]"
              />
            </div>
          </motion.div>

          {/* 4. Diseño Mobile-First (Tall Right - Below Code) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-4 md:row-span-2 rounded-[40px] border-[0.5px] border-white/10 bg-[#0A0A0A] relative overflow-hidden group"
          >
            <motion.img 
              src={assets.mobile} 
              alt="Mobile First" 
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-10 z-10">
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-3 tracking-tight leading-tight">Diseño <br /> Mobile-First</h3>
              <p className="text-white/80 font-light text-[12px] leading-relaxed tracking-tight">
                Consistencia en cualquier dispositivo.
              </p>
            </div>
          </motion.div>

          {/* 5. UX Intuitiva (Wide Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-8 md:row-span-1 rounded-[40px] border-[0.5px] border-white/10 bg-[#0A0A0A] flex items-center relative overflow-hidden group"
          >
            <div className="relative z-10 w-[50%] md:w-1/2 p-8 md:pl-12">
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-3 tracking-tight leading-tight">UX Intuitiva</h3>
              <p className="text-white/80 font-light text-[12px] leading-relaxed max-w-xs tracking-tight">
                Psicología aplicada para una navegación sin fricciones.
              </p>
            </div>
            <div className="absolute right-0 top-0 h-full w-[50%] md:w-[60%] flex items-center justify-end pointer-events-none">
              <motion.img 
                src={assets.ux} 
                alt="UX" 
                loading="lazy"
                decoding="async"
                className="h-[120%] md:h-[150%] w-auto max-w-none object-contain object-left translate-x-[55%] md:translate-x-[15%]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
