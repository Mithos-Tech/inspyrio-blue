import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { ScrollToTop } from '@/src/components/layout/ScrollToTop';
import { AnimatePresence, motion } from 'motion/react';
import { Home } from '@/src/pages/Home';

// Lazy load pages for performance
const Services = lazy(() => import('@/src/pages/Services').then(m => ({ default: m.Services })));
const Portfolio = lazy(() => import('@/src/pages/Portfolio').then(m => ({ default: m.Portfolio })));
const Blog = lazy(() => import('@/src/pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('@/src/pages/BlogPost').then(m => ({ default: m.BlogPost })));
const PrivacyPolicy = lazy(() => import('@/src/pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('@/src/pages/TermsOfService').then(m => ({ default: m.TermsOfService })));
const Admin = lazy(() => import('@/src/pages/Admin').then(m => ({ default: m.Admin })));

// Loading component
const PageLoader = () => (
  <div className="fixed inset-0 bg-brand-dark flex items-center justify-center z-50">
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="w-12 h-12 rounded-full border-2 border-brand-blue/30 border-t-brand-blue"
    />
  </div>
);

function AppContent() {
  const location = useLocation();

  // Disable browser scroll restoration to prevent jumping
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const isAdmin = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-brand-dark">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col"
          >
            <Suspense fallback={<PageLoader />}>
              <div className="flex-grow flex flex-col">
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
                {!isAdmin && <Footer />}
              </div>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

import { FirebaseProvider } from '@/src/lib/FirebaseContext';

export default function App() {
  return (
    <Router>
      <FirebaseProvider>
        <AppContent />
      </FirebaseProvider>
    </Router>
  );
}
