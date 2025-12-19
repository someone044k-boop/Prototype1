import React from 'react';
import { Instagram, Youtube, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Custom icons with size prop
const TiktokIcon = ({ size = 24 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
);

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  const socialLinks = [
     { icon: <Send size={22} />, label: 'Telegram', url: 'https://t.me/EliteArchetypes' },
     { icon: <Instagram size={22} />, label: 'Instagram', url: '#' },
     { icon: <span className="font-bold text-xs tracking-tight leading-none">Etsy</span>, label: 'Etsy', url: '#' },
     { icon: <Youtube size={22} />, label: 'YouTube', url: 'https://www.youtube.com/@12.elite.archetypes' },
     { icon: <TiktokIcon size={22} />, label: 'TikTok', url: '#' }
  ];

  return (
    <footer className="bg-transparent py-4 mt-auto">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 text-[10px] md:text-xs font-bold text-slate-600 dark:text-slate-400 relative">
        
        {/* Copyright */}
        <div className="flex items-center gap-1 order-2 sm:order-1">
           <span>&copy; 2025 Школа Архетипів.</span>
           <span className="opacity-70 font-medium hidden md:inline">| {t('rights_reserved')}</span>
        </div>

        {/* Socials - Centered */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 order-1 sm:order-2 flex-1 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1">
            {socialLinks.map((social, idx) => (
                <a 
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 text-slate-500 dark:text-slate-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-500 hover:text-white transition-all duration-300 hover:scale-110 hover:border-transparent hover:shadow-lg hover:shadow-indigo-500/30"
                    title={social.label}
                >
                    {social.icon}
                </a>
            ))}
        </div>
        
        {/* Links */}
        <div className="flex items-center gap-2 sm:gap-3 order-3">
            <a href="#" className="hover:text-indigo-600 transition-colors">{t('offer_agreement')}</a>
            <span className="opacity-50 hidden sm:inline">|</span>
            <a href="#" className="hover:text-indigo-600 transition-colors">{t('payment_delivery')}</a>
        </div>
      </div>
    </footer>
  );
};