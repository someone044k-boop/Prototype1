import React, { Suspense, lazy, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
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

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Simple placeholder components for pages not fully implemented
const Placeholder: React.FC<{ title: string }> = ({ title }) => (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-serif text-indigo-500 dark:text-indigo-400 mb-4">{title}</h1>
        <p className="max-w-md text-slate-600 dark:text-slate-400">Цей розділ знаходиться в розробці або контент додається.</p>
    </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
          <HashRouter>
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