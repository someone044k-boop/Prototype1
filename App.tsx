import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Training } from './pages/Training';
import { Classroom } from './pages/Classroom';
import { Workshop } from './pages/Workshop';
import { Consultations } from './pages/Consultations';
import { Master } from './pages/Master';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { LanguageProvider } from './contexts/LanguageContext';

// Simple placeholder components for pages not fully implemented
const Placeholder: React.FC<{ title: string }> = ({ title }) => (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-serif text-gold-500 mb-4">{title}</h1>
        <p className="max-w-md text-slate-600 dark:text-slate-400">Цей розділ знаходиться в розробці або контент додається.</p>
    </div>
);

const App: React.FC = () => {
  return (
    <LanguageProvider>
        <HashRouter>
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
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
                    
                    <Route path="/login" element={<Placeholder title="Особистий кабінет" />} />
                    
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
        </HashRouter>
    </LanguageProvider>
  );
};

export default App;