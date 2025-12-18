import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, ChevronRight, Globe } from 'lucide-react';
import { MENU_STRUCTURE } from '../constants';
import { ThemeToggle } from './ThemeToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../translations';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
      setMobileOpen(false);
  }, [location]);

  // Click outside listener for language dropdown
  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (langRef.current && !langRef.current.contains(event.target as Node)) {
              setLangDropdownOpen(false);
          }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileOpen]);

  const getLabel = (key: string) => t(key as any);

  // Recursive menu item renderer for Mobile
  const renderMobileMenu = (items: any[], level = 0) => (
    <div className={`flex flex-col ${level > 0 ? 'ml-4 pl-4 border-l border-indigo-100 dark:border-slate-800 space-y-2 mt-2' : 'space-y-4'}`}>
      {items.map(item => (
        <div key={item.path} className="w-full">
          {item.subItems ? (
            <div className="flex flex-col">
               <div className={`font-sans font-bold text-slate-400 uppercase tracking-widest mb-2 ${level === 0 ? 'text-xs mt-2' : 'text-[10px]'}`}>
                 {getLabel(item.label)}
               </div>
               {renderMobileMenu(item.subItems, level + 1)}
            </div>
          ) : (
             <Link 
                to={item.path} 
                className={`block font-sans transition-colors w-full rounded-xl active:bg-slate-100 dark:active:bg-slate-800
                ${level === 0 
                    ? 'font-bold text-xl text-slate-800 dark:text-slate-100 py-1' 
                    : 'text-base font-medium text-slate-600 dark:text-slate-300 py-1.5 hover:text-indigo-600 dark:hover:text-indigo-400'
                }
                ${location.pathname === item.path ? 'text-indigo-600 dark:text-indigo-400 pl-2 border-l-4 border-indigo-500' : ''}
                `} 
                onClick={() => setMobileOpen(false)}
            >
               {getLabel(item.label)}
             </Link>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
        <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-white/20 dark:border-white/5 backdrop-blur-xl
            ${scrolled ? 'h-16 bg-white/95 dark:bg-slate-900/95 shadow-md' : 'h-20 bg-white/80 dark:bg-slate-900/80 shadow-sm'}
        `}
        >
        <div className="w-full px-4 md:px-6 lg:px-8 h-full flex items-center justify-between relative">
            
            {/* Logo Area */}
            <Link to="/" className="flex items-center gap-3 z-50 group flex-shrink-0" onClick={() => setMobileOpen(false)}>
                <div className={`transition-all duration-500 ${scrolled ? 'w-9 h-9 rounded-lg' : 'w-11 h-11 rounded-xl'} bg-gradient-to-br from-magic-500 to-fuchsia-600 flex items-center justify-center text-white font-serif font-bold shadow-lg group-hover:shadow-magic-500/50 group-hover:scale-110 text-lg`}>
                    D
                </div>
                {/* Visible on Tablet (md) and Desktop (lg) */}
                <span className={`font-serif font-bold tracking-wider transition-all duration-500 hidden md:inline ${scrolled ? 'text-base' : 'text-lg'}`}>
                    <span className="bg-gradient-to-r from-indigo-800 to-fuchsia-700 dark:from-indigo-400 dark:to-fuchsia-400 bg-clip-text text-transparent">Dobrev</span>
                    <span className="text-black dark:text-white"> Opus Zodiac</span>
                </span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-0 h-full w-auto">
            <div className="flex items-center h-full gap-1">
                {MENU_STRUCTURE.map((item) => (
                    <div key={item.label} className="relative group h-full flex items-center px-3 xl:px-4">
                    {item.subItems ? (
                        <>
                        <Link 
                            to={item.path} 
                            className="flex items-center gap-1 text-sm font-sans font-bold tracking-wide text-black dark:text-white group-hover:text-magic-600 dark:group-hover:text-magic-300 transition-colors uppercase py-2 whitespace-nowrap"
                        >
                            {getLabel(item.label)} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 opacity-50" />
                        </Link>
                        
                        {/* Dropdown Level 1 */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 perspective-[1000px]">
                            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-white/10 rounded-2xl p-2 w-72 origin-top rotate-x-0 ring-1 ring-black/5 mt-[-10px]">
                                {item.subItems.map(sub => (
                                    <div key={sub.path} className="relative group/sub">
                                        <Link 
                                            to={sub.path}
                                            className="flex items-center justify-between px-4 py-3 text-sm font-sans font-bold rounded-xl hover:bg-magic-50 dark:hover:bg-slate-800 text-black dark:text-white hover:text-magic-600 dark:hover:text-magic-300 transition-colors"
                                        >
                                            {getLabel(sub.label)}
                                            {sub.subItems && <ChevronRight size={14} />}
                                        </Link>

                                        {/* Dropdown Level 2 */}
                                        {sub.subItems && (
                                            <div className="absolute top-0 left-full pl-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
                                                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-white/10 rounded-2xl p-2 w-64 ring-1 ring-black/5">
                                                    {sub.subItems.map(nested => (
                                                        <Link
                                                            key={nested.path}
                                                            to={nested.path}
                                                            className="block px-4 py-2.5 text-xs font-sans font-medium rounded-lg hover:bg-magic-50 dark:hover:bg-slate-800 text-black dark:text-white hover:text-magic-600 dark:hover:text-magic-300 transition-colors"
                                                        >
                                                            {getLabel(nested.label)}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        </>
                    ) : (
                        <Link 
                        to={item.path}
                        className={`text-sm font-sans font-bold tracking-wide transition-colors uppercase py-2 whitespace-nowrap ${location.pathname === item.path ? 'text-magic-600 dark:text-magic-400' : 'text-black dark:text-white hover:text-magic-600 dark:hover:text-magic-400'}`}
                        >
                        {getLabel(item.label)}
                        </Link>
                    )}
                    </div>
                ))}
            </div>
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                
                {/* Language Dropdown */}
                <div className="relative" ref={langRef}>
                    <button 
                        onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors uppercase"
                    >
                        <Globe size={14} />
                        <span>{language}</span>
                        <ChevronDown size={12} className={`transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`}/>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full right-0 pt-4 transition-all duration-300 transform origin-top-right ${langDropdownOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                         <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-1 w-24 overflow-hidden">
                             {['UA', 'EN', 'RU'].map(lang => (
                                 <button
                                    key={lang}
                                    onClick={() => {
                                        setLanguage(lang as Language);
                                        setLangDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-between ${language === lang ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                 >
                                     {lang}
                                     {language === lang && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>}
                                 </button>
                             ))}
                         </div>
                    </div>
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Login Button (Moved to far right) */}
                <Link to="/login" className="flex items-center gap-2 text-[10px] font-sans font-bold tracking-widest px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 transition-all uppercase shadow-lg hover:shadow-indigo-500/20">
                    <User size={14} /> <span>{t('menu_login')}</span>
                </Link>
            </div>

            {/* Mobile Controls (Toggle) */}
            <div className="lg:hidden flex items-center gap-2 z-50">
                {/* Mobile Header Login Button (Styled with Text) */}
                <Link 
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:scale-105 transition-all shadow-md active:scale-95"
                >
                    <User size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{t('menu_login')}</span>
                </Link>

                <button 
                    className={`p-2 rounded-lg transition-all active:scale-95 ${mobileOpen ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600' : 'text-black dark:text-white'}`} 
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
        </div>
        </header>

        {/* Mobile Menu Overlay */}
        <div 
            className={`fixed inset-x-0 bottom-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl transition-all duration-300 ease-in-out transform flex flex-col
            ${scrolled ? 'top-16' : 'top-20'}
            ${mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
            `}
        >
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pb-20">
                 {/* Main Navigation */}
                 <nav className="animate-fade-in">
                    {renderMobileMenu(MENU_STRUCTURE)}
                 </nav>
            </div>

            {/* Sticky Bottom Actions for Mobile (Single Compact Row) */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white via-white to-transparent dark:from-slate-950 dark:via-slate-950 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between gap-2">
                    
                    {/* Language - Compact */}
                    <div className="flex bg-slate-100 dark:bg-slate-900 rounded-lg p-0.5">
                        {['UA', 'EN', 'RU'].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang as Language)}
                                className={`text-[9px] font-bold px-2.5 py-1.5 rounded-md transition-all ${language === lang ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Login - Compact Row */}
                        <Link 
                            to="/login" 
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg uppercase tracking-wider shadow-md active:scale-[0.98] transition-transform text-[10px]"
                        >
                            <User size={14} /> <span>{t('menu_login')}</span>
                        </Link>

                         {/* Theme - Scaled down */}
                        <div className="scale-75 origin-center">
                             <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};