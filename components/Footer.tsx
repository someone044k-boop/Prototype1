import React from 'react';
import { Instagram, Youtube, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Custom icons with size prop
const TiktokIcon = ({ size = 18 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
);

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  const socialLinks = [
     { icon: <Send size={14} className="ml-0.5 mt-0.5" />, label: 'Telegram', url: 'https://t.me/s/EliteArchetypes/' },
     { icon: <Instagram size={14} />, label: 'Instagram', url: '#' },
     { icon: <span className="font-serif font-bold text-[8px] tracking-tight leading-none pt-0.5">Etsy</span>, label: 'Etsy', url: '#' },
     { icon: <Youtube size={14} />, label: 'YouTube', url: 'https://www.youtube.com/@12.elite.archetypes' },
     { icon: <TiktokIcon size={14} />, label: 'TikTok', url: '#' }
  ];

  return (
    <footer className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-indigo-50 dark:border-indigo-900/30 py-4 mt-auto transition-all duration-500">
      {/* Flex Layout: Stacked on Mobile, Single Row on Desktop */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 text-[10px] md:text-xs font-bold text-slate-800 dark:text-slate-200">
        
        {/* Copyright: Order 2 on Mobile (Bottom), Order 1 on Desktop (Left) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 leading-tight min-w-[200px]">
           <span>&copy; 2025 Школа Архетипів.</span>
           <span className="opacity-70 font-medium">{t('rights_reserved')}</span>
        </div>

        {/* Socials: Order 1 on Mobile (Top), Order 2 on Desktop (Center) */}
        <div className="flex justify-center gap-3 order-1 md:order-2 flex-1">
            {socialLinks.map((social, idx) => (
                <a 
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-50 to-fuchsia-50 dark:from-slate-800 dark:to-slate-900 border border-indigo-100/50 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-500 hover:text-white transition-all duration-300 shadow-sm hover:scale-110 hover:border-transparent hover:shadow-indigo-500/30"
                    title={social.label}
                >
                    {social.icon}
                </a>
            ))}
        </div>
        
        {/* Links: Order 3 on Mobile (Bottom), Order 3 on Desktop (Right) */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right order-3 md:order-3 leading-tight min-w-[200px]">
            <a href="#" className="hover:text-indigo-600 transition-colors">{t('offer_agreement')}</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">{t('payment_delivery')}</a>
        </div>
      </div>
    </footer>
  );
};