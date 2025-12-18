import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, ChevronRight, Globe, LogIn } from 'lucide-react';
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
      // Smoother threshold
      setScrolled(window.scrollY > 20);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) border-b
            ${scrolled 
                ? 'h-[64px] bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-sm border-indigo-50/50 dark:border-slate-800/50' 
                : 'h-[90px] bg-transparent border-transparent shadow-none'
            }
        `}
        >
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 h-full flex items-center justify-between relative">
            
            {/* Logo Area */}
            <Link to="/" className="flex items-center gap-3 z-50 group flex-shrink-0" onClick={() => setMobileOpen(false)}>
                <div className={`transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${scrolled ? 'w-9 h-9 rounded-lg text-base' : 'w-11 h-11 rounded-xl text-lg'} bg-gradient-to-br from-indigo-600 to-fuchsia-600 flex items-center justify-center text-white font-serif font-bold shadow-lg shadow-indigo-500/30 group-hover:scale-110`}>
                    D
                </div>
                {/* Visible on Tablet (md) and Desktop (lg) */}
                <span className={`font-serif font-bold tracking-wider transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) hidden md:inline ${scrolled ? 'text-sm' : 'text-lg'}`}>
                    <span className="bg-gradient-to-r from-indigo-900 to-fuchsia-800 dark:from-indigo-300 dark:to-fuchsia-300 bg-clip-text text-transparent">Dobrev</span>
                    <span className="text-slate-900 dark:text-white"> Opus Zodiac</span>
                </span>
            </Link>

            {/* Desktop Menu - Centered & Single Line */}
            <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-0 h-full w-auto">
                <div className="flex items-center justify-center gap-0 lg:gap-1 xl:gap-2 h-full px-0">
                    {MENU_STRUCTURE.map((item) => (
                        <div key={item.label} className="relative group h-full flex items-center px-1.5 xl:px-3">
                        {item.subItems ? (
                            <>
                            <Link 
                                to={item.path} 
                                className={`flex items-center gap-0.5 text-[13px] font-bold tracking-wide uppercase py-2 transition-colors duration-300
                                    text-slate-900 dark:text-white
                                    group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                                `}
                            >
                                {getLabel(item.label)} <ChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-300 opacity-50" />
                            </Link>
                            
                            {/* Dropdown Level 1 */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 perspective-[1000px]">
                                <div className="bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-indigo-50 dark:border-slate-800 rounded-2xl p-2 w-72 origin-top rotate-x-0 mt-[-10px]">
                                    {item.subItems.map(sub => (
                                        <div key={sub.path} className="relative group/sub">
                                            <Link 
                                                to={sub.path}
                                                className="flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                            >
                                                {getLabel(sub.label)}
                                                {sub.subItems && <ChevronRight size={14} className="opacity-50" />}
                                            </Link>

                                            {/* Dropdown Level 2 */}
                                            {sub.subItems && (
                                                <div className="absolute top-0 left-full pl-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
                                                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-indigo-50 dark:border-slate-800 rounded-2xl p-2 w-64">
                                                        {sub.subItems.map(nested => (
                                                            <Link
                                                                key={nested.path}
                                                                to={nested.path}
                                                                className="block px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
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
                            className={`text-[13px] font-bold tracking-wide uppercase py-2 transition-colors duration-300
                                ${location.pathname === item.path 
                                    ? 'text-indigo-600 dark:text-indigo-400' 
                                    : 'text-slate-900 dark:text-white'
                                } 
                                hover:text-indigo-600 dark:hover:text-indigo-400`}
                            >
                            {getLabel(item.label)}
                            </Link>
                        )}
                        </div>
                    ))}
                </div>
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
                
                {/* Settings Pill (Lang + Theme) */}
                <div className={`flex items-center rounded-full p-1.5 border transition-all duration-700 gap-2
                    ${scrolled 
                        ? 'bg-slate-100/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50' 
                        : 'bg-white/40 dark:bg-slate-900/40 border-white/40 dark:border-slate-700/40 backdrop-blur-sm'
                    }
                `}>
                    {/* Language */}
                    <div className="relative" ref={langRef}>
                        <button 
                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-all text-xs font-bold text-slate-900 dark:text-white uppercase"
                        >
                            <Globe size={14} className="text-indigo-500" />
                            <span>{language}</span>
                            <ChevronDown size={10} className={`transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`}/>
                        </button>
                        
                        {/* Dropdown */}
                        <div className={`absolute top-full left-0 mt-3 transition-all duration-300 origin-top-left z-50 ${langDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                             <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-indigo-50 dark:border-slate-700 p-1 min-w-[100px] overflow-hidden">
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

                    <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>

                    {/* Theme Toggle */}
                    <ThemeToggle />
                </div>

                {/* Login Button */}
                <Link 
                    to="/login" 
                    className={`flex items-center gap-2 rounded-full font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:scale-105 transition-all duration-700
                        bg-slate-900 text-white dark:bg-white dark:text-slate-900
                        ${scrolled 
                            ? 'px-5 py-2.5 hover:shadow-indigo-500/20' 
                            : 'px-6 py-3 shadow-sm'
                        }
                    `}
                >
                    <LogIn size={14} strokeWidth={2.5} />
                    <span>{t('menu_login')}</span>
                </Link>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-3 z-50">
                <Link 
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md active:scale-95 transition-transform"
                >
                    <User size={16} />
                </Link>

                <button 
                    className={`p-2 rounded-xl transition-all active:scale-95 ${mobileOpen ? 'bg-white text-indigo-600 shadow-lg' : 'bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-white backdrop-blur-md'}`} 
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </div>
        </header>

        {/* Mobile Menu Overlay */}
        <div 
            className={`fixed inset-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col
            ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
            `}
        >
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-28 pb-32">
                 <nav className="animate-fade-in space-y-2">
                    {renderMobileMenu(MENU_STRUCTURE)}
                 </nav>
            </div>

            {/* Mobile Bottom Dock */}
            <div className="absolute bottom-8 left-4 right-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-2 flex items-center justify-between shadow-2xl border border-white/20 dark:border-slate-800">
                    
                    {/* Language Selector */}
                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-full p-1">
                        {['UA', 'EN', 'RU'].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang as Language)}
                                className={`text-[10px] font-bold px-3 py-2 rounded-full transition-all ${language === lang ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-400'}`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>

                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

                    {/* Theme Toggle */}
                    <ThemeToggle />

                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

                    {/* Login CTA */}
                    <Link 
                        to="/login" 
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full uppercase tracking-wider shadow-lg active:scale-95 transition-all text-[10px]"
                    >
                        <User size={14} /> <span>{t('menu_login')}</span>
                    </Link>
                </div>
            </div>
        </div>
    </>
  );
};