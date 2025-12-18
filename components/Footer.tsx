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
     { icon: <Send size={16} className="ml-0.5 mt-0.5" />, label: 'Telegram', url: 'https://t.me/s/EliteArchetypes/' },
     { icon: <Instagram size={16} />, label: 'Instagram', url: '#' },
     { icon: <span className="font-serif font-bold text-[9px] tracking-tight leading-none pt-0.5">Etsy</span>, label: 'Etsy', url: '#' },
     { icon: <Youtube size={16} />, label: 'YouTube', url: 'https://www.youtube.com/@12.elite.archetypes' },
     { icon: <TiktokIcon size={16} />, label: 'TikTok', url: '#' }
  ];

  return (
    <footer className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-indigo-100 dark:border-indigo-900/30 py-4 mt-auto">
      {/* Grid Layout: 2 columns on Mobile (Socials span 2), 3 columns on Desktop */}
      <div className="w-full px-4 grid grid-cols-2 md:grid-cols-3 gap-y-4 md:gap-4 items-center text-[10px] md:text-xs font-bold text-black dark:text-white">
        
        {/* Socials: Top on Mobile (spanning full width), Center on Desktop */}
        <div className="col-span-2 md:col-span-1 order-1 md:order-2 flex justify-center gap-4">
            {socialLinks.map((social, idx) => (
                <a 
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-50 to-fuchsia-50 dark:from-slate-800 dark:to-slate-900 border border-indigo-100/50 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-500 hover:text-white transition-all duration-300 shadow-sm hover:scale-110 hover:border-indigo-200"
                    title={social.label}
                >
                    {social.icon}
                </a>
            ))}
        </div>

        {/* Copyright: Left on Mobile, Left on Desktop */}
        <div className="col-span-1 md:col-span-1 order-2 md:order-1 flex flex-col items-start justify-self-start text-left gap-1.5">
           <span>&copy; 2025 Школа Архетипів.</span>
           <span>{t('rights_reserved')}</span>
        </div>
        
        {/* Agreement Links: Right on Mobile, Right on Desktop */}
        <div className="col-span-1 md:col-span-1 order-2 md:order-3 flex flex-col items-end justify-self-end text-right gap-1.5">
            <a href="#" className="hover:text-indigo-600 transition-colors underline decoration-dotted underline-offset-2">{t('offer_agreement')}</a>
            <a href="#" className="hover:text-indigo-600 transition-colors underline decoration-dotted underline-offset-2">{t('payment_delivery')}</a>
        </div>
      </div>
    </footer>
  );
};