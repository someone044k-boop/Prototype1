import React from 'react';
import { Mandala } from '../components/Mandala';
import { Link } from 'react-router-dom';
import { Send, BookOpen, MessageCircle, Gem, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-28 pb-10 overflow-hidden">
      {/* 1.1 Mandala Animation */}
      <div className="flex flex-col items-center justify-center mb-8 animate-fade-in relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <Mandala size="w-64 h-64 md:w-96 md:h-96" />
        
        {/* 1.2 Text */}
        <div className="mt-6 text-center px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent mb-3 tracking-widest drop-shadow-sm">
                {t('hero_title')}
            </h1>
            <p className="text-lg md:text-xl text-slate-900 dark:text-white font-medium">
                {t('hero_subtitle')}
            </p>
        </div>

        {/* 1.3 Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 px-2 relative z-10">
            {[
                { label: t('btn_courses'), path: '/training', icon: BookOpen },
                { label: t('btn_consult'), path: '/consultations', icon: MessageCircle },
                { label: t('btn_shop'), path: '/workshop', icon: Gem },
                { label: t('btn_knowledge'), path: '/knowledge', icon: Eye }
            ].map((btn) => (
                <Link 
                    key={btn.label}
                    to={btn.path}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold tracking-widest hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-500 hover:text-white dark:hover:text-white transition-all uppercase text-xs shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/40 hover:-translate-y-1"
                >
                    <btn.icon size={16} />
                    {btn.label}
                </Link>
            ))}
        </div>
      </div>

      {/* 1.4 Picture + Rich Text */}
      <div className="w-full px-2 md:px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="relative group rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 dark:border-white/10">
            <img src="https://picsum.photos/600/400" alt="Mystical" className="w-full h-auto transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
        </div>
        <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 dark:text-white relative inline-block">
                {t('hero_desc_title')}
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full"></div>
            </h2>
            <div className="glass-panel p-5 rounded-3xl dark:bg-slate-900/50">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-justify font-medium mb-4 text-sm md:text-base">
                    {t('hero_desc_p1')}
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-justify font-medium text-sm md:text-base">
                    {t('hero_desc_p2')}
                </p>
            </div>
        </div>
      </div>

      {/* 1.5 Video */}
      <div className="max-w-5xl mx-auto px-2 md:px-4 py-8">
        <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50 dark:border-slate-800 shadow-indigo-500/20">
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Intro Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            ></iframe>
        </div>
        {/* 1.6 About Master Button */}
        <div className="text-center mt-8">
            <Link to="/master/about" className="inline-block px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl text-sm">
                {t('btn_about_master')}
            </Link>
        </div>
      </div>

      {/* 1.7 Telegram Integration */}
      <div className="max-w-3xl mx-auto px-2 md:px-4 py-8 text-center mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-[2rem] shadow-xl border border-blue-200/50 dark:border-blue-900/30">
             <h3 className="font-bold mb-4 text-blue-500 flex items-center justify-center gap-3 text-lg"><Send size={20}/> Telegram: Elite Archetypes</h3>
             <div className="h-40 overflow-y-auto text-left text-sm space-y-2 p-3 bg-white dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner custom-scrollbar">
                 <p className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs md:text-sm">🔮 Новий прогноз на сезон Скорпіона вже доступний...</p>
                 <p className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs md:text-sm">✨ Приєднуйтесь до прямого ефіру завтра о 20:00.</p>
                 <p className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs md:text-sm">📚 Опубліковано нову статтю про 8-му Чакру.</p>
             </div>
             <a href="https://t.me/s/EliteArchetypes/" target="_blank" rel="noreferrer" className="inline-block mt-4 px-5 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors uppercase font-bold text-xs tracking-wider shadow-lg shadow-blue-500/30">
                 Перейти в канал
             </a>
          </div>
      </div>

    </div>
  );
};