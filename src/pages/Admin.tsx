import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut, 
  LayoutDashboard, 
  Briefcase, 
  Tag, 
  ExternalLink,
  Save,
  X,
  Upload,
  Search as SearchIcon,
  Check,
  HelpCircle,
  Monitor,
  Quote
} from 'lucide-react';
import { useFirebase, OperationType, handleFirestoreError } from '@/src/lib/FirebaseContext';
import { AGENCY_INFO } from '@/src/constants';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  link: string;
  description: string;
  tags: string[];
  order: number;
  isFeatured: boolean;
}

interface Category {
  id: string;
  name: string;
  order: number;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export const Admin = () => {
  const { user, login, logout, isAdmin, loading } = useFirebase();
  const [activeTab, setActiveTab] = useState<'projects' | 'categories' | 'hero' | 'faqs'>('projects');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [heroContent, setHeroContent] = useState({
    title: 'Inspyrio Design Agency',
    subtitle: 'Creamos experiencias digitales de alto impacto que transforman negocios y trascienden fronteras.',
    ctaText: 'Ver Portafolio'
  });
  const [isSavingHero, setIsSavingHero] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  const [syncError, setSyncError] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMigration = async () => {
    setSyncError(null);
    setIsSyncing(true);
    setSyncStatus('Iniciando migración...');
    
    try {
      const STATIC_PROJECTS = [
        { id: '01', title: 'Avio', category: 'TECNOLOGÍA', year: '2024', image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Avio_dvom0s.webp', link: 'https://avio-sports.vercel.app/', description: 'MOVILIDAD ELÉCTRICA', tags: ['MOVILIDAD ELÉCTRICA', 'NEXT.JS'], order: 1, isFeatured: true },
        { id: '02', title: 'Kovr', category: 'E-COMMERCE', year: '2024', image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Kovr_qqxwi4.webp', link: 'https://kovr-run.vercel.app/', description: 'CALZADO PREMIUM', tags: ['CALZADO PREMIUM', 'REACT'], order: 2, isFeatured: true },
        { id: '03', title: 'Klipp', category: 'TURISMO', year: '2024', image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Klipp_y1xpwy.webp', link: 'https://klipp-travel.vercel.app/', description: 'VIAJES Y EXPERIENCIAS', tags: ['VIAJES', 'EXPERIENCIAS'], order: 3, isFeatured: true },
        { id: '04', title: 'Felimarket', category: 'E-COMMERCE', year: '2024', image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Felimarket_bdt7yb.webp', link: 'https://felimarket-premium.vercel.app/', description: 'MINIMARKET DIGITAL', tags: ['MINIMARKET DIGITAL', 'RETAIL'], order: 4, isFeatured: false },
        { id: '05', title: 'SmartKids', category: 'PODCAST', year: '2024', image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Smartkids_pcp5q0.webp', link: 'https://smart-kids-seven.vercel.app/', description: 'PODCAST ESCOLAR', tags: ['PODCAST ESCOLAR', 'EDUCACIÓN'], order: 5, isFeatured: false },
        { id: '06', title: 'Zyvara', category: 'WEDDING / VENUES', year: '2024', image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Zyvara_pchccj.webp', link: 'https://zyvara-venues.vercel.app/', description: 'GESTIÓN DE VENUES', tags: ['GESTIÓN DE VENUES', 'EVENTOS'], order: 6, isFeatured: false },
        { id: '07', title: 'Techstore', category: 'E-COMMERCE', year: '2024', image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356354/Techstore_dn60yg.webp', link: 'https://techstore-shop.vercel.app/', description: 'HARDWARE / TECH', tags: ['HARDWARE', 'TECNOLOGÍA'], order: 7, isFeatured: false },
        { id: '08', title: 'Stratos', category: 'CORPORATIVO', year: '2024', image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356355/Stratos_envofy.webp', link: 'https://stratos-landing.vercel.app/', description: 'IDENTIDAD / SOLUCIONES', tags: ['IDENTIDAD', 'SOLUCIONES'], order: 8, isFeatured: false },
        { id: '09', title: 'Mithostech', category: 'TECNOLOGÍA', year: '2024', image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776356355/MithosTech_hrunno.webp', link: 'https://mithostech-one.vercel.app/', description: 'SOPORTE TÉCNICO IT', tags: ['SOPORTE TÉCNICO', 'IT'], order: 9, isFeatured: false },
        { id: '10', title: 'Pixlate', category: 'E-COMMERCE', year: '2024', image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1776358923/Pixlate_p2jlnk.webp', link: 'https://pixlate-multiservice.vercel.app/', description: 'SUMINISTROS / RETAIL', tags: ['SUMINISTROS', 'RETAIL'], order: 10, isFeatured: false },
        { id: '11', title: 'Luvox', category: 'BIENESTAR ANIMAL', year: '2024', image: 'https://res.cloudinary.com/dkoshgzxo/image/upload/v1778535938/Luvox_oykbwr.webp', link: 'https://luvox-vet.vercel.app/', description: 'VETERINARIA BIENESTAR', tags: ['VETERINARIA', 'BIENESTAR'], order: 11, isFeatured: false }
      ];
      
      const STATIC_CATEGORIES = ['E-COMMERCE', 'TECNOLOGÍA', 'TURISMO', 'CORPORATIVO', 'WEDDING / VENUES', 'PODCAST', 'BIENESTAR ANIMAL'];
      
      const STATIC_FAQS = [
        { question: '¿Qué tecnologías utilizan en sus proyectos?', answer: 'Implementamos el stack más avanzado de la industria: React 19, TypeScript y Tailwind CSS 4 para garantizar un rendimiento y seguridad de nivel superior.', order: 0 },
        { question: '¿Cuánto tiempo toma desarrollar una web premium?', answer: 'Un proyecto estándar se completa en 3 a 5 semanas, manteniendo los más altos estándares de calidad y optimización.', order: 1 },
        { question: '¿Ofrecen soporte después del lanzamiento?', answer: 'Sí, proporcionamos soporte técnico continuo y mantenimiento preventivo para asegurar que tu plataforma evolucione con tu negocio.', order: 2 },
        { question: '¿Cómo es el proceso de diseño?', answer: 'Nuestro proceso es colaborativo y estratégico: desde el conceptual wireframing hasta el prototipado de alta fidelidad y desarrollo.', order: 3 },
        { question: '¿Sus webs están optimizadas para SEO?', answer: 'Cada línea de código está escrita bajo las mejores prácticas de Google, garantizando indexación rápida y visibilidad orgánica.', order: 4 },
        { question: '¿Puedo gestionar mi propio contenido?', answer: 'Totalmente. Incluimos un panel administrativo intuitivo (CMS) desde el cual puedes actualizar imágenes, textos y proyectos sin código.', order: 5 }
      ];
      
      // 1. Categories
      if (categories.length === 0) {
        setSyncStatus('Creando categorías...');
        for (const catName of STATIC_CATEGORIES) {
          await addDoc(collection(db, 'categories'), { 
            name: catName, 
            order: STATIC_CATEGORIES.indexOf(catName) 
          });
        }
      }

      // 2. FAQs
      if (faqs.length === 0) {
        setSyncStatus('Migrando FAQs...');
        for (let i = 0; i < STATIC_FAQS.length; i++) {
          await setDoc(doc(db, 'faqs', `legacy-faq-${i}`), STATIC_FAQS[i], { merge: true });
        }
      }

      // 3. Projects
      for (let i = 0; i < STATIC_PROJECTS.length; i++) {
        const p = STATIC_PROJECTS[i];
        setSyncStatus(`Migrando: ${p.title} (${i + 1}/${STATIC_PROJECTS.length})`);
        const { id, ...dataToSave } = p;
        // Use the original ID to ensure we overwrite if we migrate again
        await setDoc(doc(db, 'projects', id), { 
          ...dataToSave, 
          createdAt: serverTimestamp() 
        }, { merge: true });
      }
      
      setSyncStatus('¡Migración completada con éxito!');
      setTimeout(() => setSyncStatus(''), 5000);
    } catch (e) {
      console.error('Migration error:', e);
      setSyncError('Error de permisos o conexión. Revisa Firestore.');
    } finally {
      setIsSyncing(false);
    }
  };
  
  // Projects state
  const [newProject, setNewProject] = useState({
    title: '',
    category: '',
    year: new Date().getFullYear().toString(),
    image: '',
    link: '',
    description: '',
    tags: '',
    order: 0,
    isFeatured: false
  });

  // Categories state
  const [newCategory, setNewCategory] = useState({
    name: '',
    order: 0
  });

  // FAQs state
  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: '',
    order: 0
  });

  useEffect(() => {
    if (!isAdmin) return;

    const qProjects = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsubscribeProjects = onSnapshot(qProjects, (snapshot) => {
      const rawProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      const uniqueMap = new Map<string, Project>();
      rawProjects.forEach((p) => {
        if (!uniqueMap.has(p.title) || (p.isFeatured && !uniqueMap.get(p.title)?.isFeatured)) {
          uniqueMap.set(p.title, p);
        }
      });
      setProjects(Array.from(uniqueMap.values()));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'projects'));

    const qCategories = query(collection(db, 'categories'), orderBy('order', 'asc'));
    const unsubscribeCategories = onSnapshot(qCategories, (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'categories'));

    const unsubscribeHero = onSnapshot(doc(db, 'content', 'hero'), (snapshot) => {
      if (snapshot.exists()) {
        setHeroContent(snapshot.data() as any);
      }
    });

    const qFaqs = query(collection(db, 'faqs'), orderBy('order', 'asc'));
    const unsubscribeFaqs = onSnapshot(qFaqs, (snapshot) => {
      setFaqs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FAQ)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'faqs'));

    return () => {
      unsubscribeProjects();
      unsubscribeCategories();
      unsubscribeHero();
      unsubscribeFaqs();
    };
  }, [isAdmin]);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveProject = async () => {
    // Safety check for featured limit
    if (newProject.isFeatured) {
      const featuredProjects = projects.filter(p => p.isFeatured && p.id !== editingItem?.id);
      if (featuredProjects.length >= 3) {
        alert('No se puede guardar: Límite de 3 proyectos destacados excedido.');
        return;
      }
    }

    try {
      const data = {
        ...newProject,
        tags: newProject.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
        order: Number(newProject.order),
        isFeatured: newProject.isFeatured,
        updatedAt: serverTimestamp()
      };

      if (editingItem) {
        await updateDoc(doc(db, 'projects', editingItem.id), data);
      } else {
        await addDoc(collection(db, 'projects'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      resetProjectForm();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'projects');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, 'projects');
      }
    }
  };

  const handleSaveCategory = async () => {
    try {
      const data = {
        ...newCategory,
        order: Number(newCategory.order)
      };

      if (editingItem) {
        await updateDoc(doc(db, 'categories', editingItem.id), data);
      } else {
        await addDoc(collection(db, 'categories'), data);
      }
      resetCategoryForm();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'categories');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await deleteDoc(doc(db, 'categories', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, 'categories');
      }
    }
  };

  const handleSaveHero = async () => {
    setIsSavingHero(true);
    try {
      await setDoc(doc(db, 'content', 'hero'), heroContent);
      alert('¡Hero Content actualizado con éxito!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'content/hero');
    } finally {
      setIsSavingHero(false);
    }
  };

  const handleSaveFAQ = async () => {
    try {
      const data = {
        ...newFAQ,
        order: Number(newFAQ.order)
      };

      if (editingItem) {
        await updateDoc(doc(db, 'faqs', editingItem.id), data);
      } else {
        await addDoc(collection(db, 'faqs'), data);
      }
      resetFAQForm();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'faqs');
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta pregunta?')) {
      try {
        await deleteDoc(doc(db, 'faqs', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, 'faqs');
      }
    }
  };

  const resetProjectForm = () => {
    setNewProject({
      title: '',
      category: '',
      year: new Date().getFullYear().toString(),
      image: '',
      link: '',
      description: '',
      tags: '',
      order: projects.length,
      isFeatured: false
    });
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const openEditProject = (project: Project) => {
    setEditingItem(project);
    setNewProject({
      title: project.title,
      category: project.category,
      year: project.year,
      image: project.image,
      link: project.link,
      description: project.description || '',
      tags: project.tags.join(', '),
      order: project.order,
      isFeatured: project.isFeatured || false
    });
    setIsModalOpen(true);
  };

  const resetCategoryForm = () => {
    setNewCategory({
      name: '',
      order: categories.length
    });
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const openEditCategory = (category: Category) => {
    setEditingItem(category);
    setNewCategory({
      name: category.name,
      order: category.order
    });
    setIsModalOpen(true);
  };

  const resetFAQForm = () => {
    setNewFAQ({
      question: '',
      answer: '',
      order: faqs.length
    });
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const openEditFAQ = (faq: FAQ) => {
    setEditingItem(faq);
    setNewFAQ({
      question: faq.question,
      answer: faq.answer,
      order: faq.order
    });
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 rounded-[14px] border-2 border-brand-blue/30 border-t-brand-blue" 
        />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 bg-radial-at-t from-brand-blue/10 to-transparent">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/[0.01] backdrop-blur-xl border border-white/5 rounded-[40px] p-12 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-50" />
          
          <div className="w-24 h-24 rounded-3xl bg-white/[0.02] flex items-center justify-center mx-auto mb-10 border border-white/5 p-6 group">
            <img 
              src={AGENCY_INFO.logos.svg} 
              alt={AGENCY_INFO.name} 
              className="w-full h-full object-contain filter brightness-150 transition-transform duration-700 group-hover:scale-110" 
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter">Acceso Maestro</h1>
          <p className="text-white/60 font-light mb-12 leading-relaxed text-sm">
            Control de Misión Inspyrio Studio. Verifique su identidad administrativa.
          </p>
          <button 
            onClick={login}
            className="w-full py-5 rounded-[20px] bg-white text-black font-bold hover:bg-brand-blue hover:text-white transition-all duration-500 uppercase text-[10px] tracking-wider flex items-center justify-center gap-3 active:scale-[0.98] mb-6"
          >
            Autenticar Identidad
          </button>

          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
          >
            <X size={12} />
            Regresar al Sitio
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row overflow-hidden selection:bg-brand-blue/30 lg:h-screen">
      {/* Desktop Sidebar - Framer Clone style */}
      <aside className="hidden lg:flex w-[300px] border-r border-white/5 flex-col p-6 bg-[#0a0a0a] relative z-20 h-full">
        <div className="flex items-center gap-4 mb-14 px-4 pt-4">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] p-3 flex items-center justify-center border border-white/5 shadow-inner">
            <img src={AGENCY_INFO.logos.svg} alt="Logo" className="w-full h-full object-contain filter brightness-200" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.4em] text-white/30 leading-none mb-1.5">Inspyrio</p>
            <p className="text-[13px] font-black text-white tracking-tight uppercase">Master CMS</p>
          </div>
        </div>

        <nav className="flex-grow space-y-2 px-2">
          {[
            { id: 'projects', label: 'Proyectos', icon: Briefcase },
            { id: 'categories', label: 'Categorías', icon: Tag },
            { id: 'faqs', label: 'FAQs', icon: HelpCircle },
            { id: 'hero', label: 'Hero Content', icon: Monitor },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setDeleteConfirmId(null);
              }}
              className={`w-full group rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border border-transparent ${
                activeTab === tab.id 
                  ? 'bg-white text-black' 
                  : 'text-white/40 hover:bg-white/[0.03] hover:text-white'
              } cursor-pointer`}
            >
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.15em]">
                <tab.icon size={18} className="stroke-[2.5px]" />
                {tab.label}
              </div>
              {activeTab === tab.id && <Check size={14} className="text-black stroke-[3px]" />}
            </button>
          ))}
          
          {/* Back to Website button in Sidebar */}
          <Link 
            to="/"
            className="w-full group mt-6 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 text-white/20 hover:bg-white/[0.03] hover:text-white"
          >
            <Monitor size={18} className="stroke-[2.5px]" />
            <div className="text-[10px] font-bold uppercase tracking-[.15em]">
              Ver Sitio Web
            </div>
          </Link>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5 px-2">
          <div className="flex items-center gap-4 mb-8 px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-10 h-10 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center text-brand-blue font-black text-xs">
              {user?.displayName?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-black text-white truncate uppercase tracking-widest">{user?.displayName}</p>
              <p className="text-[9px] font-mono text-white/30 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[.3em] text-white/40 hover:bg-red-500 hover:text-white hover:border-red-500/50 transition-all active:scale-[0.98]"
          >
            <LogOut size={14} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Mobile Sticky Header */}
      <div className="lg:hidden flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0a0a0a] sticky top-0 z-40 w-full backdrop-blur-md bg-opacity-80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] p-2 flex items-center justify-center border border-white/5">
            <img src={AGENCY_INFO.logos.svg} alt="Logo" className="w-full h-full object-contain filter brightness-200" />
          </div>
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[.3em] text-white/30 leading-none">Inspyrio</p>
            <p className="text-[10px] font-black text-white tracking-widest uppercase">Master CMS</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsMobileSidebarOpen(true)}
          className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/50 active:scale-95 transition-all"
        >
          <div className="w-5 h-4 flex flex-col justify-between items-end relative">
            <span className="h-0.5 bg-white rounded-full w-5 animate-pulse" />
            <span className="h-0.5 bg-white rounded-full w-3" />
            <span className="h-0.5 bg-white rounded-full w-4" />
          </div>
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 bottom-0 left-0 w-[280px] z-50 bg-[#0a0a0a] border-r border-white/5 p-6 flex flex-col h-full"
            >
              {/* Drawer Brand */}
              <div className="flex items-center justify-between mb-10 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] p-2.5 flex items-center justify-center border border-white/5">
                    <img src={AGENCY_INFO.logos.svg} alt="Logo" className="w-full h-full object-contain filter brightness-200" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[.3em] text-white/30 leading-none mb-1">Inspyrio</p>
                    <p className="text-[11px] font-black text-white tracking-tight uppercase">Master CMS</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-grow space-y-2">
                {[
                  { id: 'projects', label: 'Proyectos', icon: Briefcase },
                  { id: 'categories', label: 'Categorías', icon: Tag },
                  { id: 'faqs', label: 'FAQs', icon: HelpCircle },
                  { id: 'hero', label: 'Hero Content', icon: Monitor },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setDeleteConfirmId(null);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full group rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border border-transparent ${
                      activeTab === tab.id 
                        ? 'bg-white text-black' 
                        : 'text-white/40 hover:bg-white/[0.03] hover:text-white'
                    } cursor-pointer`}
                  >
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.15em]">
                      <tab.icon size={18} className="stroke-[2.5px]" />
                      {tab.label}
                    </div>
                    {activeTab === tab.id && <Check size={14} className="text-black stroke-[3px]" />}
                  </button>
                ))}

                <Link 
                  to="/"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="w-full group mt-6 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 text-white/20 hover:bg-white/[0.03] hover:text-white"
                >
                  <Monitor size={18} className="stroke-[2.5px]" />
                  <div className="text-[10px] font-bold uppercase tracking-[.15em]">
                    Ver Sitio Web
                  </div>
                </Link>
              </nav>

              {/* Drawer Footer info */}
              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center text-brand-blue font-black text-[10px]">
                    {user?.displayName?.charAt(0) || 'A'}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[9px] font-black text-white truncate uppercase tracking-widest leading-none mb-1">{user?.displayName}</p>
                    <p className="text-[8px] font-mono text-white/30 truncate leading-none">{user?.email}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    logout();
                    setIsMobileSidebarOpen(false);
                  }}
                  className="w-full py-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[.3em] text-white/40 hover:bg-red-500 hover:text-white hover:border-red-500/50 transition-all active:scale-[0.98]"
                >
                  <LogOut size={12} />
                  Cerrar Sesión
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#050505] relative custom-scrollbar">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[60%] h-[40%] bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none opacity-30" />
        
        <div className="max-w-6xl mx-auto p-6 sm:p-10 md:p-14 lg:p-20 relative z-10">
          {/* Header & Search */}
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-10 mb-10 md:mb-16 lg:mb-20 animate-in fade-in slide-in-from-top-6 duration-1000">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-1 h-10 md:h-14 bg-brand-blue rounded-full shadow-[0_0_20px_rgba(0,102,255,0.4)]" />
              <div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-none mb-2 md:mb-3">
                  {activeTab === 'projects' ? 'Proyectos' : activeTab === 'categories' ? 'Categorías' : activeTab === 'faqs' ? 'FAQs' : 'Hero Content'}
                </h1>
                <p className="text-white/30 text-[8px] md:text-[10px] font-bold uppercase tracking-[.5em]">
                  {activeTab === 'projects' 
                    ? 'Gestión de contenido de alto impacto' 
                    : activeTab === 'categories' 
                      ? 'Estructura de navegación global' 
                      : activeTab === 'faqs'
                        ? 'Dudas comunes y resolución ágil'
                        : 'Propuesta de valor y encabezado'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6 w-full lg:w-auto">
              {/* Refined Search Bar */}
              <div className="relative group flex-grow lg:w-80">
                <input 
                  type="text" 
                  placeholder={`Buscar ${activeTab === 'projects' ? 'proyecto' : activeTab === 'categories' ? 'categoría' : 'pregunta'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-3xl px-12 md:px-14 py-4 md:py-5 text-xs font-medium focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all placeholder:text-white/10"
                />
                <SearchIcon size={16} className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-white transition-colors" />
              </div>

              {!isModalOpen && activeTab !== 'hero' && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-black h-12 w-12 md:h-16 md:w-16 lg:w-auto lg:px-10 rounded-2xl md:rounded-3xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_60px_rgba(255,255,255,0.05)] font-black text-[11px] uppercase tracking-widest shrink-0"
                >
                  <Plus size={18} strokeWidth={3} />
                  <span className="hidden lg:block">Añadir</span>
                </button>
              )}
            </div>
          </header>

          {/* Creation/Edit Form Area (Embedded or Modal-like) */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 30 }}
                className="mb-16 md:mb-24 bg-[#0a0a0a] border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-10 max-w-lg w-full mx-auto relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
              >
                {/* Close Button */}
                <div className="absolute top-6 right-6">
                  <button 
                    onClick={() => {
                      if (activeTab === 'projects') resetProjectForm();
                      else if (activeTab === 'categories') resetCategoryForm();
                      else resetFAQForm();
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="max-w-md mx-auto">
                  <header className="mb-8 text-center">
                    <h2 className="text-lg font-black uppercase tracking-[.25em] mb-2">
                      {editingItem ? 'Editar' : 'Nueva'} {activeTab === 'projects' ? 'Proyecto' : activeTab === 'categories' ? 'Categoría' : 'Pregunta'}
                    </h2>
                    <div className="h-1 w-8 bg-brand-blue rounded-full mx-auto" />
                  </header>

                  <div className="grid grid-cols-1 gap-y-5 mb-8">
                    {activeTab === 'projects' ? (
                      <>
                        <div className="grid grid-cols-1 gap-5">
                          <div className="space-y-2.5">
                            <label className="text-[8px] font-black uppercase tracking-[.4em] text-white/20 ml-1">Título</label>
                            <input 
                              type="text" 
                              placeholder="Título"
                              value={newProject.title}
                              onChange={e => setNewProject({...newProject, title: e.target.value.toUpperCase()})}
                              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-[11px] font-medium focus:outline-none focus:border-brand-blue/30 transition-all"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2.5">
                              <label className="text-[8px] font-black uppercase tracking-[.4em] text-white/20 ml-1">Categoría</label>
                              <div className="relative group">
                                <select 
                                  value={newProject.category}
                                  onChange={e => setNewProject({...newProject, category: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-[11px] font-medium focus:outline-none focus:border-brand-blue/30 transition-all appearance-none text-white/60"
                                >
                                  <option value="" disabled className="bg-[#0a0a0a]">Categoría...</option>
                                  {categories.map(cat => (
                                    <option key={cat.id} value={cat.name} className="bg-[#0a0a0a] text-[10px]">{cat.name.toUpperCase()}</option>
                                  ))}
                                </select>
                                <Tag size={10} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/10" />
                              </div>
                            </div>
                            <div className="space-y-2.5">
                              <label className="text-[8px] font-black uppercase tracking-[.4em] text-white/20 ml-1">Año</label>
                              <input 
                                type="text" 
                                placeholder="2026"
                                value={newProject.year}
                                onChange={e => setNewProject({...newProject, year: e.target.value})}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-[11px] font-medium focus:outline-none focus:border-brand-blue/30 transition-all font-mono"
                              />
                            </div>
                          </div>

                          <div className="space-y-2.5">
                            <label className="text-[8px] font-black uppercase tracking-[.4em] text-white/20 ml-1">Enlace</label>
                            <input 
                              type="text" 
                              placeholder="URL Destino"
                              value={newProject.link}
                              onChange={e => setNewProject({...newProject, link: e.target.value})}
                              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-[11px] font-medium focus:outline-none focus:border-brand-blue/30 transition-all"
                            />
                          </div>

                          <div className="space-y-2.5">
                            <label className="flex justify-between items-center text-[8px] font-black uppercase tracking-[.4em] text-white/20 ml-1">
                              Slogan
                              <span className={`text-[7px] font-mono ${newProject.description.length >= 40 ? 'text-red-500' : 'opacity-40'}`}>
                                {newProject.description.length}/40
                              </span>
                            </label>
                            <input 
                              type="text"
                              placeholder="Breve descripción"
                              maxLength={40}
                              value={newProject.description}
                              onChange={e => setNewProject({...newProject, description: e.target.value})}
                              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-[11px] font-medium focus:outline-none focus:border-brand-blue/30 transition-all placeholder:text-white/5"
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-5">
                            <div className="space-y-2.5">
                              <label className="text-[8px] font-black uppercase tracking-[.4em] text-white/20 ml-1">Imagen URL</label>
                              <input 
                                type="text" 
                                placeholder="Cloudinary Link"
                                value={newProject.image}
                                onChange={e => setNewProject({...newProject, image: e.target.value})}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-[9px] text-brand-blue font-mono focus:outline-none focus:border-brand-blue/30 transition-all"
                              />
                            </div>
                            <div className="space-y-2.5">
                              <label className="text-[8px] font-black uppercase tracking-[.4em] text-white/20 ml-1">Tags (Separados por coma)</label>
                              <input 
                                type="text" 
                                placeholder="UI, REACT..."
                                value={newProject.tags}
                                onChange={e => setNewProject({...newProject, tags: e.target.value.toUpperCase()})}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-[11px] font-medium focus:outline-none focus:border-brand-blue/30 transition-all"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.01] border border-white/5">
                             <input 
                               type="checkbox" 
                               id="destacar" 
                               checked={newProject.isFeatured}
                               onChange={e => {
                                 const isChecking = e.target.checked;
                                 if (isChecking) {
                                   const currentlyFeatured = projects.filter(p => p.isFeatured && p.id !== editingItem?.id);
                                   if (currentlyFeatured.length >= 3) {
                                     alert('Límite alcanzado: El diseño del inicio solo permite 3 proyectos destacados. Por favor, desmarca uno de los proyectos actuales antes de destacar este para mantener la estética del sitio.');
                                     return;
                                   }
                                 }
                                 setNewProject({...newProject, isFeatured: isChecking});
                               }}
                               className="w-4 h-4 rounded border-white/10 bg-transparent text-brand-blue focus:ring-brand-blue/20" 
                             />
                             <label htmlFor="destacar" className="text-[8px] font-black uppercase tracking-[.4em] text-white/30 cursor-pointer select-none">Mostrar en Inicio</label>
                          </div>
                        </div>
                      </>
                    ) : activeTab === 'categories' ? (
                      <>
                        <div className="space-y-3">
                          <label className="text-[8px] font-black uppercase tracking-[.4em] text-white/20 ml-1">Nueva Categoría</label>
                          <input 
                            type="text" 
                            placeholder="Ej: CORPORATIVO"
                            value={newCategory.name}
                            onChange={e => setNewCategory({...newCategory, name: e.target.value.toUpperCase()})}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-xs font-black focus:outline-none focus:border-brand-blue/30 transition-all placeholder:text-white/5"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 gap-5">
                          <div className="space-y-2.5">
                            <label className="text-[8px] font-black uppercase tracking-[.4em] text-white/20 ml-1">Pregunta (Question)</label>
                            <input 
                              type="text" 
                              value={newFAQ.question}
                              onChange={e => setNewFAQ({...newFAQ, question: e.target.value})}
                              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-[11px] font-medium focus:outline-none focus:border-brand-blue/30 transition-all placeholder:text-white/5"
                              placeholder="¿Cómo trabajamos?"
                            />
                          </div>
                          
                          <div className="space-y-2.5">
                            <label className="text-[8px] font-black uppercase tracking-[.4em] text-white/20 ml-1">Respuesta (Answer)</label>
                            <textarea 
                              value={newFAQ.answer}
                              onChange={e => setNewFAQ({...newFAQ, answer: e.target.value})}
                              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-[11px] font-medium focus:outline-none focus:border-brand-blue/30 transition-all resize-none h-32 custom-scrollbar"
                              placeholder="Describe la respuesta detalladamente..."
                            />
                          </div>

                          <div className="space-y-2.5">
                            <label className="text-[8px] font-black uppercase tracking-[.4em] text-white/20 ml-1">Orden de Aparición</label>
                            <input 
                              type="number"
                              value={newFAQ.order}
                              onChange={e => setNewFAQ({...newFAQ, order: Number(e.target.value)})}
                              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-[11px] font-medium focus:outline-none focus:border-brand-blue/30 transition-all"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-5">
                    <button 
                      onClick={activeTab === 'projects' ? handleSaveProject : activeTab === 'categories' ? handleSaveCategory : handleSaveFAQ}
                      className="w-full py-4 rounded-xl bg-white text-black font-black hover:bg-brand-blue hover:text-white transition-all duration-500 uppercase text-[10px] tracking-[.4em] active:scale-[0.98]"
                    >
                      {editingItem ? 'Guardar' : (activeTab === 'projects' ? 'Publicar' : 'Crear')}
                    </button>
                    
                    <p className="text-[7px] font-black text-white/5 uppercase tracking-[.4em]">Integrated Flow v1.0.8</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Special Action for Syncing Static Data */}
          {((activeTab === 'projects' && projects.length < 5) || 
            (activeTab === 'faqs' && faqs.length < 3) || 
            isSyncing) && (activeTab === 'projects' || activeTab === 'faqs') && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 p-8 rounded-[32px] bg-brand-blue/5 border border-brand-blue/20 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="max-w-lg">
                <h3 className="text-sm font-black uppercase tracking-widest text-white mb-2">Migración de {activeTab === 'projects' ? 'Proyectos' : 'Preguntas'}</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                  {syncError ? (
                    <span className="text-red-500">{syncError}</span>
                  ) : (
                    syncStatus || `¿Deseas activar los datos maestros de ${activeTab === 'projects' ? 'proyectos' : 'FAQs'} en tu base de datos en la nube?`
                  )}
                </p>
              </div>
              <button 
                disabled={isSyncing}
                onClick={handleMigration}
                className={`px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 flex items-center gap-3 ${
                  isSyncing 
                    ? 'bg-brand-blue text-white cursor-wait opacity-80' 
                    : 'bg-white text-black hover:bg-brand-blue hover:text-white'
                }`}
              >
                {isSyncing ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Save size={14} />
                    </motion.div>
                    Sincronizando...
                  </>
                ) : (
                  `Migrar ${activeTab === 'projects' ? 'Proyectos' : 'FAQs'} a la Nube`
                )}
              </button>
            </motion.div>
          )}

          {/* Content Explorer (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {activeTab === 'projects' ? (
              filteredProjects.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden hover:border-brand-blue/30 transition-all duration-700"
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px]">
                      <div className="flex flex-col items-center gap-3">
                        <button 
                          onClick={() => openEditProject(project)}
                          className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-brand-blue hover:text-white transition-all active:scale-95"
                        >
                          <Edit2 size={14} />
                          Editar
                        </button>
                        <button 
                          onClick={() => {
                            if (deleteConfirmId === project.id) {
                              handleDeleteProject(project.id);
                              setDeleteConfirmId(null);
                            } else {
                              setDeleteConfirmId(project.id);
                            }
                          }}
                          className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 ${
                            deleteConfirmId === project.id 
                              ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse' 
                              : 'bg-white/10 border border-white/10 text-white hover:bg-red-500'
                          }`}
                        >
                          <Trash2 size={14} className={deleteConfirmId === project.id ? 'animate-bounce' : ''} />
                          {deleteConfirmId === project.id ? '¿Confirmar?' : 'Eliminar'}
                        </button>
                        
                        {deleteConfirmId === project.id && (
                          <button 
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-[8px] font-black uppercase tracking-[.3em] text-white/40 hover:text-white transition-colors"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] text-brand-blue font-bold uppercase tracking-wide">
                          {project.description || project.category}
                        </span>
                        <div className="h-[1px] w-8 bg-white/10" />
                        <span className="text-[10px] text-white/40 font-mono italic">{project.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight uppercase text-white leading-tight">{project.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : activeTab === 'categories' ? (
              <div className="col-span-full space-y-3">
                {filteredCategories.map((cat, idx) => (
                  <motion.div 
                    key={cat.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/5 text-white/20 group-hover:text-brand-blue transition-colors">
                        <Tag size={16} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white leading-none mb-1">{cat.name}</h3>
                        <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Prioridad de Filtro: #{cat.order}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {deleteConfirmId === cat.id ? (
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setDeleteConfirmId(null)}
                            className="h-10 px-4 rounded-xl border border-white/5 text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-all"
                          >
                            No
                          </button>
                          <button 
                            onClick={() => {
                              handleDeleteCategory(cat.id);
                              setDeleteConfirmId(null);
                            }}
                            className="h-10 px-5 rounded-xl bg-red-500 text-[9px] font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-red-500/20"
                          >
                            Sí, Borrar
                          </button>
                        </div>
                      ) : (
                        <>
                          <button 
                            onClick={() => openEditCategory(cat)}
                            className="h-10 px-5 rounded-xl border border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 hover:bg-white hover:text-black transition-all"
                          >
                            Editar
                          </button>
                          <button 
                            onClick={() => setDeleteConfirmId(cat.id)}
                            className="w-10 h-10 rounded-xl border border-white/5 flex items-center justify-center text-white/20 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : activeTab === 'hero' ? (
              <div className="col-span-full max-w-2xl mx-auto w-full px-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.01] border border-white/5 rounded-[32px] p-8 lg:p-12 space-y-10 relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(0,102,255,0.8)]" />
                    <span className="text-[10px] font-black uppercase tracking-[.4em] text-white/40">Configuración Global del Hero</span>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Campo Título */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[9px] font-bold uppercase tracking-[.25em] text-white/20">Título de Impacto</label>
                        <span className="text-[8px] font-mono text-white/10 uppercase">H1 Display</span>
                      </div>
                      <textarea 
                        value={heroContent.title}
                        onChange={e => setHeroContent({...heroContent, title: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-lg font-bold tracking-tight text-white focus:border-brand-blue/30 focus:bg-white/[0.04] transition-all resize-none h-28 custom-scrollbar"
                        placeholder="Escribe el título aquí..."
                      />
                    </div>

                    {/* Campo Subtítulo */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[9px] font-bold uppercase tracking-[.25em] text-white/20">Cuerpo del Mensaje</label>
                        <span className="text-[8px] font-mono text-white/10 uppercase">Paragraph / Lead</span>
                      </div>
                      <textarea 
                        value={heroContent.subtitle}
                        onChange={e => setHeroContent({...heroContent, subtitle: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-xs font-medium leading-relaxed text-white/60 focus:border-brand-blue/30 focus:bg-white/[0.04] transition-all resize-none h-32 custom-scrollbar"
                        placeholder="Describe tu propuesta de valor..."
                      />
                    </div>

                    {/* CTA y Guardado */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold uppercase tracking-[.25em] text-white/20 ml-1">Call to Action</label>
                        <input 
                          type="text"
                          value={heroContent.ctaText}
                          onChange={e => setHeroContent({...heroContent, ctaText: e.target.value})}
                          className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-[10px] font-black uppercase tracking-[.2em] text-brand-blue focus:border-brand-blue/30 focus:bg-white/[0.04] transition-all"
                        />
                      </div>
                      
                      <div className="flex items-end">
                        <button 
                          onClick={handleSaveHero}
                          disabled={isSavingHero}
                          className="w-full h-[58px] bg-white text-black rounded-xl font-black uppercase text-[9px] tracking-[.4em] flex items-center justify-center gap-3 hover:bg-brand-blue hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
                        >
                          {isSavingHero ? 'Sincronizando...' : 'Publicar Cambios'}
                          {!isSavingHero && <Check size={12} strokeWidth={3} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Detalle sofisticado en el fondo */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-[60px] rounded-full pointer-events-none" />
                </motion.div>
                
                <div className="mt-8 flex items-center gap-4 bg-white/[0.01] border border-white/5 p-5 rounded-2xl">
                  <Monitor size={14} className="text-white/20" />
                  <p className="text-[8px] font-bold uppercase tracking-[.2em] text-white/20 leading-relaxed">
                    Consejo Pro: Los cambios se reflejarán instantáneamente en la página de inicio sin necesidad de refrescar para todos los visitantes activos.
                  </p>
                </div>
              </div>
            ) : activeTab === 'faqs' ? (
              <div className="col-span-full space-y-4">
                {filteredFaqs.map((faq, idx) => (
                  <motion.div 
                    key={faq.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center justify-between p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.03] hover:border-brand-blue/20 transition-all group gap-8"
                  >
                    <div className="flex items-start gap-6 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center flex-shrink-0 text-white/20 group-hover:text-brand-blue transition-colors">
                        <HelpCircle size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col mb-2">
                           <h3 className="text-sm font-black uppercase tracking-widest text-white leading-normal line-clamp-1">{faq.question}</h3>
                           <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">Orden: #{faq.order}</p>
                        </div>
                        <p className="text-[11px] text-white/40 leading-relaxed line-clamp-2">{faq.answer}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => openEditFAQ(faq)}
                        className="h-11 px-6 rounded-xl border border-white/5 text-[9px] font-black uppercase tracking-[.3em] text-white/40 hover:bg-white hover:text-black transition-all"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDeleteFAQ(faq.id)}
                        className="w-11 h-11 rounded-xl border border-white/5 flex items-center justify-center text-white/10 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
                
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-24 bg-white/[0.005] border border-dashed border-white/5 rounded-[48px]">
                    <HelpCircle size={40} className="text-white/[0.02] mx-auto mb-6" />
                    <p className="text-[10px] font-black uppercase tracking-[.5em] text-white/10">Base de conocimientos vacía</p>
                  </div>
                )}

                <div className="mt-8 flex items-center gap-4 bg-white/[0.01] border border-white/5 p-5 rounded-2xl">
                  <HelpCircle size={14} className="text-brand-blue" />
                  <p className="text-[8px] font-bold uppercase tracking-[.2em] text-white/20 leading-relaxed">
                    Diseño Pro: Recomendamos mantener entre 6 y 8 preguntas para conservar la elegancia y el balance visual en la página principal.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};
