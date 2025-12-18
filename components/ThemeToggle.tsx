import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check system preference or localStorage could be added here
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className={`relative w-14 h-8 rounded-full transition-all duration-500 ease-out shadow-inner border flex items-center px-1
      ${isDark 
        ? 'bg-slate-800 border-slate-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]' 
        : 'bg-indigo-50 border-indigo-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]'
      }`}
      aria-label={isDark ? t('theme_light') : t('theme_dark')}
    >
      {/* Background Icons (static) for visual depth */}
      <div className="absolute left-2 text-indigo-400 opacity-50"><Sun size={12} /></div>
      <div className="absolute right-2 text-slate-500 opacity-50"><Moon size={12} /></div>

      {/* Sliding Knob */}
      <div 
        className={`relative z-10 w-6 h-6 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) transform
        ${isDark 
            ? 'translate-x-6 bg-white border border-slate-200' 
            : 'translate-x-0 bg-slate-900 border border-slate-700'
        }`}
      >
        {isDark ? (
            <Moon size={12} className="text-slate-900 animate-spin-once" /> 
        ) : (
            <Sun size={12} className="text-white animate-spin-once" />
        )}
      </div>
    </button>
  );
};