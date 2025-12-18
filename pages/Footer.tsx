import React from 'react';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl text-slate-500 dark:text-slate-400 py-16 border-t border-indigo-100 dark:border-indigo-900/30">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">
        <div className="flex items-center gap-8">
            <a href="#" className="hover:text-fuchsia-500 hover:scale-110 transition-all p-2 bg-white dark:bg-slate-900 rounded-full shadow-md"><Youtube size={20} /></a>
            <a href="#" className="hover:text-fuchsia-500 hover:scale-110 transition-all p-2 bg-white dark:bg-slate-900 rounded-full shadow-md"><Instagram size={20} /></a>
            <a href="#" className="hover:text-fuchsia-500 hover:scale-110 transition-all p-2 bg-white dark:bg-slate-900 rounded-full shadow-md"><Facebook size={20} /></a>
            <a href="#" className="hover:text-fuchsia-500 hover:scale-110 transition-all p-2 bg-white dark:bg-slate-900 rounded-full shadow-md"><Twitter size={20} /></a>
        </div>
        
        <div className="text-sm text-center font-medium opacity-70">
            <p className="mb-2"><a href="#" className="hover:text-indigo-500 underline decoration-indigo-300 dark:decoration-indigo-700 underline-offset-4">{t('offer_agreement')}</a></p>
            <p>&copy; 2025 Школа Архетипів. {t('rights_reserved')}</p>
        </div>
      </div>
    </footer>
  );
};