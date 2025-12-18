import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="relative flex flex-col items-center justify-center group cursor-pointer" onClick={() => setIsDark(!isDark)}>
      
      <div className="w-14 h-7 rounded-full border border-slate-300 dark:border-slate-600 relative bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-inner overflow-hidden transition-colors">
        <div 
            className={`absolute top-0.5 bottom-0.5 w-5 rounded-full transition-all duration-500 ease-in-out flex items-center justify-center shadow-md
            ${isDark ? 'left-[calc(100%-1.5rem)] bg-white' : 'left-1 bg-slate-900'}
            `}
        >
            {isDark ? <Moon size={12} className="text-slate-900" /> : <Sun size={12} className="text-white" />}
        </div>
      </div>

      {/* Text hidden by default, visible on hover, positioned below */}
      <span className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 text-xs font-serif tracking-widest text-magic-600 dark:text-magic-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap uppercase bg-white/95 dark:bg-slate-900/95 px-3 py-1 rounded-full shadow-lg border border-magic-200 dark:border-magic-800 z-50 pointer-events-none">
        {isDark ? t('theme_light') : t('theme_dark')}
      </span>
    </div>
  );
};