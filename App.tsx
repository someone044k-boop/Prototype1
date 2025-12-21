import React, { Suspense, lazy, useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

// Lazy load pages for faster initial load
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Training = lazy(() => import('./pages/Training').then(m => ({ default: m.Training })));
const Classroom = lazy(() => import('./pages/Classroom').then(m => ({ default: m.Classroom })));
const Workshop = lazy(() => import('./pages/Workshop').then(m => ({ default: m.Workshop })));
const Consultations = lazy(() => import('./pages/Consultations').then(m => ({ default: m.Consultations })));
const Master = lazy(() => import('./pages/Master').then(m => ({ default: m.Master })));
const KnowledgeBase = lazy(() => import('./pages/KnowledgeBase').then(m => ({ default: m.KnowledgeBase })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));

// Loading spinner
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
  </div>
);

// Rainbow scroll progress bar with CSS-based smooth animations
const ScrollProgress = () => {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Track modal open state by observing body class
  useEffect(() => {
    const checkModalState = () => {
      setIsModalOpen(document.body.classList.contains('modal-open'));
    };
    checkModalState();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkModalState();
        }
      });
    });
    
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Track header scroll state
  useEffect(() => {
    const handleScrollState = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScrollState, { passive: true });
    handleScrollState();
    return () => window.removeEventListener('scroll', handleScrollState);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioning) return;
      
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTransitioning]);

  // Reset on route change - smooth CSS transition back to 0
  useEffect(() => {
    setIsTransitioning(true);
    setProgress(0);
    
    // After transition completes, re-enable scroll tracking
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  const shouldShow = progress > 0 || isTransitioning;

  return (
    <div 
      className="fixed left-0 right-0 z-[9998] pointer-events-none"
      style={{
        top: scrolled ? 'calc(var(--vw-unit) * 4.5)' : 'calc(var(--vw-unit) * 6)',
        height: isModalOpen ? '0px' : 'calc(var(--vw-unit) * 0.25)',
        opacity: shouldShow && !isModalOpen ? 1 : 0,
        transform: isModalOpen ? 'scaleY(0) translateY(-10px)' : 'scaleY(1) translateY(0)',
        transformOrigin: 'top center',
        transition: 'opacity 0.4s ease-out, transform 0.5s ease-out, height 0.4s ease-out, top 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        filter: isModalOpen ? 'blur(8px)' : 'blur(0px)'
      }}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #fca5a5, #fdba74, #fde047, #bef264, #86efac, #67e8f9, #a5b4fc, #c4b5fd, #f0abfc, #fda4af)',
          backgroundSize: '200% 100%',
          animation: 'rainbow-shift 4s linear infinite',
          boxShadow: progress > 0 
            ? '0 0 8px rgba(196, 181, 253, 0.6), 0 0 16px rgba(240, 171, 252, 0.4), 0 2px 4px rgba(99, 102, 241, 0.3)' 
            : 'none',
          transition: isTransitioning 
            ? 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
            : 'width 0.15s ease-out',
          willChange: 'width'
        }}
      />
      <style>{`
        @keyframes rainbow-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Immediate scroll reset
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
};

// Simple placeholder components for pages not fully implemented
const Placeholder: React.FC<{ title: string }> = ({ title }) => (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold text-indigo-500 dark:text-indigo-400 mb-4">{title}</h1>
        <p className="max-w-md text-slate-600 dark:text-slate-400">Цей розділ знаходиться в розробці або контент додається.</p>
    </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
          <HashRouter>
          <ScrollProgress />
          <ScrollToTop />
          <div className="min-h-screen flex flex-col max-w-[1920px] mx-auto w-full">
              <Header />
              <main className="flex-grow page-transition w-full">
                  <Suspense fallback={<PageLoader />}>
                      <Routes>
                          <Route path="/" element={<Home />} />
                          
                          <Route path="/training" element={<Training />} />
                          <Route path="/training/*" element={<Training />} />
                          
                          {/* Protected Classroom Route */}
                          <Route path="/classroom/:courseId" element={<Classroom />} />
                          
                          <Route path="/workshop" element={<Workshop />} />
                          <Route path="/workshop/*" element={<Workshop />} />
                          
                          {/* Personal Myth is now a sub-page of Workshop */}
                          
                          <Route path="/consultations" element={<Consultations />} />
                          
                          <Route path="/master" element={<Master />} />
                          <Route path="/master/*" element={<Master />} />
                          
                          {/* Knowledge Base */}
                          <Route path="/knowledge" element={<KnowledgeBase />} />
                          <Route path="/knowledge/*" element={<KnowledgeBase />} />
                          
                          {/* Dashboard / Personal Cabinet */}
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/dashboard/*" element={<Dashboard />} />
                          
                          <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                  </Suspense>
              </main>
              <Footer />
          </div>
          </HashRouter>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;