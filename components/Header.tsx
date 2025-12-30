import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, ChevronRight, LogIn } from 'lucide-react';
import { MENU_STRUCTURE } from '../constants';
import { ThemeToggle } from './ThemeToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../translations';
import { AuthModal } from './AuthModal';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mandalaAnimated, setMandalaAnimated] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  useAuth(); // Keep context connected

  useEffect(() => {
    const handleScroll = () => {
      // Smoother threshold
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate mandala on every page change
  useEffect(() => {
    setMandalaAnimated(false);
    const timer = setTimeout(() => {
      setMandalaAnimated(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

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
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <header 
        className={`w-full max-w-[1920px] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) border-b
            ${scrolled 
                ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-sm border-indigo-50/50 dark:border-slate-800/50' 
                : 'bg-transparent border-transparent shadow-none'
            }
        `}
        style={{ 
          height: scrolled ? 'var(--header-height-scrolled)' : 'var(--header-height)'
        }}
        >
        <div className="w-full max-w-[1600px] mx-auto h-full flex items-center justify-between relative" style={{ paddingLeft: 'clamp(16px, var(--container-padding), 32px)', paddingRight: 'clamp(16px, var(--container-padding), 32px)' }}>
            
            {/* Logo Area */}
            <Link to="/" className="flex items-center z-50 group flex-shrink-0" style={{ gap: 'clamp(8px, var(--space-md), 12px)' }} onClick={() => { setMobileOpen(false); window.scrollTo(0, 0); }}>
                <div 
                    className="transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) flex items-center justify-center group-hover:scale-110 relative"
                    style={{ width: scrolled ? 'var(--header-logo-size-scrolled)' : 'var(--header-logo-size)', height: scrolled ? 'var(--header-logo-size-scrolled)' : 'var(--header-logo-size)' }}
                >
                    <img 
                        src="/mandala.png" 
                        alt="Dobrev Opus Zodiac" 
                        className={`w-full h-full object-contain relative z-10 ${mandalaAnimated ? 'animate-spin-once' : ''}`}
                    />
                </div>
                {/* Visible on Tablet (md) and Desktop (lg) */}
                <span 
                    className="font-bold tracking-wider transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) hidden md:inline"
                    style={{ fontSize: scrolled ? 'clamp(12px, var(--text-sm), 16px)' : 'clamp(14px, var(--text-lg), 20px)' }}
                >
                    <span className="bg-gradient-to-r from-indigo-900 to-fuchsia-800 dark:from-indigo-300 dark:to-fuchsia-300 bg-clip-text text-transparent">Dobrev</span>
                    <span className="text-slate-900 dark:text-white"> Opus Zodiac</span>
                </span>
            </Link>

            {/* Desktop Menu - Centered & Single Line */}
            <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-0 h-full w-auto">
                <div className="flex items-center justify-center h-full" style={{ gap: 'clamp(4px, var(--space-xs), 8px)' }}>
                    {MENU_STRUCTURE.map((item) => (
                        <div key={item.label} className="relative group h-full flex items-center" style={{ paddingLeft: 'clamp(8px, var(--space-sm), 12px)', paddingRight: 'clamp(8px, var(--space-sm), 12px)' }}>
                        {item.subItems ? (
                            <>
                            <Link 
                                to={item.path} 
                                className={`relative flex items-center font-bold tracking-wide uppercase py-2 transition-colors duration-300
                                    ${location.pathname.startsWith(item.path) 
                                        ? 'text-indigo-600 dark:text-indigo-400' 
                                        : 'text-slate-900 dark:text-white'
                                    }
                                    group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                                `}
                                style={{ fontSize: 'clamp(11px, var(--text-sm), 14px)', gap: 'clamp(2px, calc(var(--vw-unit) * 0.2), 4px)' }}
                            >
                                {getLabel(item.label)} <ChevronDown style={{ width: 'clamp(12px, var(--size-icon-sm), 16px)', height: 'clamp(12px, var(--size-icon-sm), 16px)' }} className="group-hover:rotate-180 transition-transform duration-300 opacity-50" />
                            </Link>
                            
                            {/* Dropdown Level 1 */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 perspective-[1000px]">
                                <div 
                                    className="bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-indigo-50 dark:border-slate-800 origin-top rotate-x-0 mt-[-10px]"
                                    style={{ borderRadius: 'clamp(12px, var(--radius-xl), 20px)', padding: 'clamp(8px, var(--space-sm), 12px)', width: 'clamp(200px, calc(var(--vw-unit) * 18), 280px)' }}
                                >
                                    {item.subItems.map(sub => (
                                        <div key={sub.path} className="relative group/sub">
                                            <Link 
                                                to={sub.path}
                                                className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                style={{ padding: 'clamp(8px, var(--space-md), 12px) clamp(12px, var(--space-lg), 16px)', borderRadius: 'clamp(8px, var(--radius-lg), 12px)', fontSize: 'clamp(11px, var(--text-sm), 14px)' }}
                                            >
                                                {getLabel(sub.label)}
                                                {sub.subItems && <ChevronRight style={{ width: 'clamp(12px, var(--size-icon-sm), 16px)', height: 'clamp(12px, var(--size-icon-sm), 16px)' }} className="opacity-50" />}
                                            </Link>

                                            {/* Dropdown Level 2 */}
                                            {sub.subItems && (
                                                <div className="absolute top-0 left-full pl-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
                                                    <div 
                                                        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-indigo-50 dark:border-slate-800"
                                                        style={{ borderRadius: 'clamp(12px, var(--radius-xl), 20px)', padding: 'clamp(8px, var(--space-sm), 12px)', width: 'clamp(180px, calc(var(--vw-unit) * 16), 250px)' }}
                                                    >
                                                        {sub.subItems.map(nested => (
                                                            <Link
                                                                key={nested.path}
                                                                to={nested.path}
                                                                className="block font-bold text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                                style={{ padding: 'clamp(6px, var(--space-sm), 10px) clamp(12px, var(--space-lg), 16px)', borderRadius: 'clamp(6px, var(--radius-md), 10px)', fontSize: 'clamp(10px, var(--text-xs), 12px)' }}
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
                            className={`relative font-bold tracking-wide uppercase py-2 transition-colors duration-300
                                ${location.pathname === item.path 
                                    ? 'text-indigo-600 dark:text-indigo-400' 
                                    : 'text-slate-900 dark:text-white'
                                } 
                                hover:text-indigo-600 dark:hover:text-indigo-400 group`}
                            style={{ fontSize: 'clamp(11px, var(--text-sm), 14px)' }}
                            >
                            {getLabel(item.label)}
                            </Link>
                        )}
                        </div>
                    ))}
                </div>
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center flex-shrink-0" style={{ gap: 'clamp(8px, var(--space-sm), 12px)' }}>
                
                {/* Language Selector - Dropdown */}
                <div className="relative" ref={langRef}>
                    <button
                        onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                        style={{ fontSize: 'clamp(10px, var(--text-xs), 12px)' }}
                    >
                        <span className="font-bold text-slate-700 dark:text-slate-200">{language}</span>
                        <ChevronDown 
                            size={14} 
                            className={`text-slate-400 transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} 
                        />
                    </button>
                    
                    {/* Dropdown */}
                    <div 
                        className={`absolute top-full right-0 mt-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 z-[9999] ${langDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                        style={{ minWidth: '140px' }}
                    >
                        {[
                            { code: 'UA', label: 'Українська', flag: '🇺🇦' },
                            { code: 'EN', label: 'English', flag: '🇬🇧' },
                            { code: 'RU', label: 'Русский', flag: '🇷🇺' }
                        ].map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => { setLanguage(lang.code as Language); setLangDropdownOpen(false); }}
                                className={`w-full flex items-center gap-2 px-4 py-2.5 text-left transition-colors ${language === lang.code ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                style={{ fontSize: 'clamp(11px, var(--text-sm), 13px)' }}
                            >
                                <span className="text-base">{lang.flag}</span>
                                <span className="font-medium">{lang.label}</span>
                                {language === lang.code && (
                                    <span className="ml-auto text-indigo-500">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Login Button */}
                <button 
                    onClick={() => setAuthModalOpen(true)}
                    className={`flex items-center rounded-full font-bold uppercase tracking-widest hover:shadow-lg hover:scale-105 transition-all duration-700
                        bg-slate-900 text-white dark:bg-white dark:text-slate-900
                        ${scrolled 
                            ? 'hover:shadow-indigo-500/20' 
                            : 'shadow-sm'
                        }
                    `}
                    style={{ 
                        gap: 'clamp(6px, var(--space-sm), 10px)', 
                        fontSize: 'clamp(10px, var(--text-xs), 12px)',
                        padding: scrolled ? 'clamp(6px, var(--space-sm), 10px) clamp(12px, var(--space-lg), 18px)' : 'clamp(8px, var(--space-md), 12px) clamp(16px, var(--space-xl), 24px)'
                    }}
                >
                    <LogIn style={{ width: 'clamp(12px, var(--size-icon-sm), 16px)', height: 'clamp(12px, var(--size-icon-sm), 16px)' }} strokeWidth={2.5} />
                    <span>{t('menu_login')}</span>
                </button>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center z-50" style={{ gap: 'clamp(8px, var(--space-sm), 12px)' }}>
                <button 
                    onClick={() => { setMobileOpen(false); setAuthModalOpen(true); }}
                    className="flex items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md active:scale-95 transition-transform"
                    style={{ 
                        width: scrolled ? 'var(--header-logo-size-scrolled)' : 'var(--header-logo-size)', 
                        height: scrolled ? 'var(--header-logo-size-scrolled)' : 'var(--header-logo-size)' 
                    }}
                >
                    <User style={{ width: 'clamp(16px, calc(var(--header-logo-size) * 0.4), 24px)', height: 'clamp(16px, calc(var(--header-logo-size) * 0.4), 24px)' }} />
                </button>

                <button 
                    className={`flex items-center justify-center rounded-xl transition-all active:scale-95 ${mobileOpen ? 'bg-white text-indigo-600 shadow-lg' : 'bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-white backdrop-blur-md'}`} 
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle Menu"
                    style={{ 
                        width: scrolled ? 'var(--header-logo-size-scrolled)' : 'var(--header-logo-size)', 
                        height: scrolled ? 'var(--header-logo-size-scrolled)' : 'var(--header-logo-size)' 
                    }}
                >
                    {mobileOpen ? <X style={{ width: 'clamp(20px, calc(var(--header-logo-size) * 0.5), 28px)', height: 'clamp(20px, calc(var(--header-logo-size) * 0.5), 28px)' }} /> : <Menu style={{ width: 'clamp(20px, calc(var(--header-logo-size) * 0.5), 28px)', height: 'clamp(20px, calc(var(--header-logo-size) * 0.5), 28px)' }} />}
                </button>
            </div>
        </div>
        </header>
        </div>

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
                    <button 
                        onClick={() => { setMobileOpen(false); setAuthModalOpen(true); }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full uppercase tracking-wider shadow-lg active:scale-95 transition-all text-[10px]"
                    >
                        <User size={14} /> <span>{t('menu_login')}</span>
                    </button>
                </div>
            </div>
        </div>

        {/* Auth Modal */}
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};