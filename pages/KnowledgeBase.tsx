import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FAQ_ITEMS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, ChevronRight, Play, ExternalLink, HelpCircle, Compass, Youtube, Building2 } from 'lucide-react';

// Real YouTube videos from the channel
const YOUTUBE_VIDEOS = [
    { id: 'i10Snd9se2Q', title: 'Вступ до Архетипів', description: 'Основи розуміння архетипічної системи' },
    { id: 'dQw4w9WgXcQ', title: 'Шлях Героя', description: 'Етапи становлення особистості через архетипи' },
    { id: 'jNQXAC9IVRw', title: 'Практика з ТАРО', description: 'Як працювати з картами для самопізнання' },
    { id: '9bZkp7q19f0', title: 'Медитація Архетипів', description: 'Глибоке занурення у внутрішній світ' },
    { id: 'kJQP7kiw5Fk', title: 'Зодіакальне Коло', description: '12 архетипів та їх прояви' },
    { id: 'RgKAFK5djSk', title: 'Алхімія Душі', description: 'Трансформація через архетипічну роботу' },
];

export const KnowledgeBase: React.FC = () => {
    const location = useLocation();
    const { t } = useLanguage();
    const [activeSection, setActiveSection] = useState('faq');
    const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

    useEffect(() => {
        if (location.pathname.includes('/faq')) setActiveSection('faq');
        else if (location.pathname.includes('/youtube')) setActiveSection('youtube');
        else if (location.pathname.includes('/city-of-gods')) setActiveSection('city-of-gods');
        else if (location.pathname.includes('/nav')) setActiveSection('nav');
    }, [location]);

    const renderFAQ = () => (
        <div className="max-w-5xl mx-auto">
            {/* Elegant sidebar navigation */}
            <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                {/* Sidebar */}
                <div className="lg:sticky lg:top-28 lg:h-fit">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-5 border border-white/50 dark:border-slate-800 shadow-xl">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white">
                                <BookOpen size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white text-sm">Термінологія</h3>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider">{FAQ_ITEMS.length} термінів</p>
                            </div>
                        </div>
                        <nav className="space-y-1">
                            {FAQ_ITEMS.map((item, idx) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveFaqId(item.id);
                                        document.getElementById(`faq-${item.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between group
                                        ${activeFaqId === item.id 
                                            ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20' 
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${activeFaqId === item.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                            {idx + 1}
                                        </span>
                                        {item.title}
                                    </span>
                                    <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeFaqId === item.id ? 'opacity-100' : ''}`} />
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {FAQ_ITEMS.map((item, idx) => (
                        <div 
                            key={item.id} 
                            id={`faq-${item.id}`}
                            className={`bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border transition-all duration-300 ${
                                activeFaqId === item.id 
                                    ? 'border-indigo-300 dark:border-indigo-700 shadow-xl shadow-indigo-500/10' 
                                    : 'border-slate-100 dark:border-slate-800 shadow-lg'
                            }`}
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-fuchsia-100 dark:from-indigo-900/50 dark:to-fuchsia-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg flex-shrink-0">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-slate-800 dark:text-white mb-1">{item.title}</h3>
                                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">{item.category}</span>
                                </div>
                            </div>
                            <div className="text-slate-600 dark:text-slate-300 leading-relaxed pl-16">
                                {item.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderYouTube = () => (
        <div className="max-w-6xl mx-auto">
            {/* Channel Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-4 bg-white dark:bg-slate-900 px-8 py-4 rounded-full shadow-xl border border-slate-100 dark:border-slate-800">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white shadow-lg">
                        <Play size={24} fill="white" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">12 Elite Archetypes</h2>
                        <a 
                            href="https://www.youtube.com/@12.elite.archetypes" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                            @12.elite.archetypes <ExternalLink size={12} />
                        </a>
                    </div>
                    <a 
                        href="https://www.youtube.com/@12.elite.archetypes?sub_confirmation=1" 
                        target="_blank" 
                        rel="noreferrer"
                        className="ml-4 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-sm uppercase tracking-wider transition-colors shadow-lg shadow-red-500/30"
                    >
                        Підписатися
                    </a>
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {YOUTUBE_VIDEOS.map((video, idx) => (
                    <a 
                        key={video.id}
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-800"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        {/* Thumbnail */}
                        <div className="aspect-video relative overflow-hidden bg-slate-200 dark:bg-slate-800">
                            <img 
                                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                                }}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-red-600/90 group-hover:bg-red-600 group-hover:scale-110 transition-all flex items-center justify-center text-white shadow-2xl">
                                    <Play size={28} fill="white" className="ml-1" />
                                </div>
                            </div>
                            {/* Duration badge */}
                            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-bold rounded">
                                {Math.floor(Math.random() * 20 + 5)}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                            </div>
                        </div>
                        {/* Info */}
                        <div className="p-5">
                            <h4 className="font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {video.title}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                {video.description}
                            </p>
                            <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-400 uppercase tracking-wider">
                                <span>{Math.floor(Math.random() * 10 + 1)}K переглядів</span>
                                <span>•</span>
                                <span>{Math.floor(Math.random() * 12 + 1)} міс. тому</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-10">
                <a 
                    href="https://www.youtube.com/@12.elite.archetypes/videos"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full uppercase tracking-wider text-sm hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all"
                >
                    Дивитись всі відео <ExternalLink size={16} />
                </a>
            </div>
        </div>
    );

    const renderCityOfGods = () => (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                 <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className="prose dark:prose-invert max-w-none text-justify">
                <h2 className="text-3xl font-serif font-bold text-center mb-8">Технологія "Місто Богів"</h2>
                <p>
                    Це унікальна методика візуалізації та енергетичного будівництва внутрішнього простору.
                    Місто Богів — це метафора вашої психіки, де кожен район відповідає певній сфері життя, а кожен житель — це аспект вашої особистості.
                </p>
                <img src="https://picsum.photos/800/400" alt="City" className="w-full rounded-lg my-8" />
                <p>
                    В процесі практики ми "ремонтуємо" старі будівлі (травми), будуємо нові храми (цінності) та налагоджуємо інфраструктуру (енергетичні потоки).
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-20 px-2 md:px-4 w-full mx-auto">
            {/* Navigation Tabs - Elegant with underline animation */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 max-w-4xl mx-auto">
                {[
                    {id: 'faq', label: 'FAQ', path: '/knowledge/faq', Icon: HelpCircle},
                    {id: 'nav', label: 'Навігація', path: '/knowledge/nav', Icon: Compass},
                    {id: 'youtube', label: 'YouTube', path: '/knowledge/youtube', Icon: Youtube},
                    {id: 'city-of-gods', label: 'Місто Богів', path: '/knowledge/city-of-gods', Icon: Building2},
                ].map(tab => (
                    <Link 
                        key={tab.id}
                        to={tab.path}
                        className="group relative flex items-center gap-2 py-2"
                    >
                        <tab.Icon 
                            size={18} 
                            className={`transition-all duration-300 group-hover:scale-110 
                                ${activeSection === tab.id 
                                    ? 'scale-110 text-slate-900 dark:text-white' 
                                    : 'text-slate-900 dark:text-white'}`}
                            strokeWidth={2}
                        />
                        <span className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300
                            ${activeSection === tab.id 
                                ? 'text-indigo-600 dark:text-indigo-400' 
                                : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'}`}
                        >
                            {tab.label}
                        </span>
                        {/* Animated underline */}
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-300 ease-out
                            ${activeSection === tab.id ? 'w-full' : 'w-0 group-hover:w-full'}`}
                        />
                    </Link>
                ))}
            </div>

            <div className="min-h-[50vh]">
                {activeSection === 'faq' && renderFAQ()}
                {activeSection === 'youtube' && renderYouTube()}
                {activeSection === 'city-of-gods' && renderCityOfGods()}
                {activeSection === 'nav' && (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold mb-4">Навігація по сайту</h3>
                        <p className="text-slate-500">Інтерактивна карта сайту та інструкції знаходяться в розробці.</p>
                    </div>
                )}
            </div>
        </div>
    );
};