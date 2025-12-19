import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="relative group">
      <button 
        onClick={() => setIsDark(!isDark)}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-indigo-400"
        aria-label="Toggle theme"
      >
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
      </button>
      
      {/* Tooltip */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg whitespace-nowrap shadow-lg">
          {isDark ? 'магія дня' : 'магія ночі'}
        </div>
      </div>
    </div>
  );
};