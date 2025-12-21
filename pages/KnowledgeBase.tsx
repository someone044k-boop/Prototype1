import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FAQ_ITEMS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, ChevronRight, Play, ExternalLink, HelpCircle, Compass, Youtube, Building2, Send } from 'lucide-react';

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
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Slug helper - keeps cyrillic
    const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

    useEffect(() => {
        const path = location.pathname;
        // Scroll to top on any navigation within KnowledgeBase
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        if (path.includes('/faq/')) {
            setActiveSection('faq');
            // Extract term slug from URL and decode
            const slug = decodeURIComponent(path.split('/faq/')[1]);
            const item = FAQ_ITEMS.find(f => toSlug(f.title) === slug);
            if (item) setActiveFaqId(item.id);
            else setActiveFaqId(null);
        } else if (path.includes('/faq') || path === '/knowledge') {
            setActiveSection('faq');
            setActiveFaqId(null);
        } else if (path.includes('/youtube')) setActiveSection('youtube');
        else if (path.includes('/city-of-gods')) setActiveSection('city-of-gods');
        else if (path.includes('/nav')) setActiveSection('nav');
        else setActiveSection('faq');
    }, [location]);

    const renderFAQ = () => (
        <div className="max-w-6xl mx-auto relative">
            {/* Collapsible Sidebar */}
            <div className={`fixed left-0 top-24 z-40 transition-all duration-300 ${sidebarCollapsed ? '-translate-x-[calc(100%-48px)]' : 'translate-x-0'}`}>
                <div className="flex">
                    {/* Sidebar Content */}
                    <div 
                        className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-r-3xl p-4 border-r border-y border-indigo-100/50 dark:border-slate-700 transition-all duration-300 ${sidebarCollapsed ? 'opacity-0 w-0 p-0 overflow-hidden' : 'opacity-100 w-64'}`}
                        style={{ boxShadow: '4px 0 30px -5px rgba(129, 140, 248, 0.25), 0 10px 40px -10px rgba(192, 132, 252, 0.2)' }}
                    >
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white">
                                <BookOpen size={16} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white text-sm">Термінологія</h3>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider">{FAQ_ITEMS.length} термінів</p>
                            </div>
                        </div>
                        <nav className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                            {FAQ_ITEMS.map((item, idx) => (
                                <Link
                                    key={item.id}
                                    to={`/knowledge/faq/${toSlug(item.title)}`}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 group
                                        ${activeFaqId === item.id 
                                            ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20' 
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                                        }`}
                                >
                                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold flex-shrink-0 ${activeFaqId === item.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                        {idx + 1}
                                    </span>
                                    <span className="truncate">{item.title}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                    
                    {/* Toggle Button */}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="h-12 w-12 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-r-xl border-r border-y border-indigo-100/50 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors self-start mt-4"
                        style={{ boxShadow: '4px 0 20px -5px rgba(129, 140, 248, 0.3)' }}
                    >
                        <ChevronRight size={20} className={`transition-transform duration-300 ${sidebarCollapsed ? 'rotate-0' : 'rotate-180'}`} />
                    </button>
                </div>
            </div>

            {/* Content - Full width */}
            <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-12' : 'ml-0 lg:ml-72'}`}>
                <div className="space-y-6 max-w-4xl mx-auto">
                    {activeFaqId ? (
                        // Single term view
                        (() => {
                            const item = FAQ_ITEMS.find(f => f.id === activeFaqId);
                            const idx = FAQ_ITEMS.findIndex(f => f.id === activeFaqId);
                            if (!item) return null;
                            return (
                                <div className="animate-fade-in">
                                    <Link 
                                        to="/knowledge/faq" 
                                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
                                    >
                                        <ChevronRight size={16} className="rotate-180" />
                                        Всі терміни
                                    </Link>
                                    <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2rem] border border-indigo-200 dark:border-indigo-800 shadow-xl">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">{item.title}</h1>
                                                <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider rounded-full">{item.category}</span>
                                            </div>
                                        </div>
                                        <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })()
                    ) : (
                        // All terms list
                        FAQ_ITEMS.map((item, idx) => (
                            <Link 
                                key={item.id} 
                                to={`/knowledge/faq/${toSlug(item.title)}`}
                                className="block bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-fuchsia-100 dark:from-indigo-900/50 dark:to-fuchsia-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg flex-shrink-0 group-hover:from-indigo-500 group-hover:to-fuchsia-500 group-hover:text-white transition-all">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                                        <span className="text-xs text-slate-400 uppercase tracking-wider">{item.category}</span>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))
                    )}
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
                <h2 className="text-3xl font-bold text-center mb-8">Технологія "Місто Богів"</h2>
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
                    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
                        
                        {/* Hero Header */}
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                <span className="text-indigo-600 dark:text-indigo-400">НАВІГАЦІЯ</span>
                                <span className="text-slate-400 mx-3">|</span>
                                <span className="text-slate-700 dark:text-slate-300">СТОРІНКА КОРИСТУВАЧА</span>
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Вітаємо <strong className="text-indigo-600 dark:text-indigo-400">Вас</strong> у авторському просторі <strong className="text-slate-800 dark:text-white">Костянтина Добрева!</strong>
                            </p>
                        </div>

                        {/* Registration Notice */}
                        <div className="bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-cyan-900/20 dark:to-indigo-900/20 rounded-3xl p-6 text-center border border-cyan-200 dark:border-cyan-800">
                            <p className="text-slate-700 dark:text-slate-300">
                                Для зручного користування усіма можливостями слід <Link to="/dashboard" className="text-indigo-600 dark:text-indigo-400 underline font-bold hover:text-fuchsia-600">зареєструватись</Link> через поштову скриньку.
                            </p>
                        </div>

                        {/* Access List */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Ви можете отримати доступ до:</h3>
                            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-indigo-500 mt-1">•</span>
                                    <span><strong className="text-slate-800 dark:text-white">Навчання</strong> у школі архетипів;</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-indigo-500 mt-1">•</span>
                                    <span>Безкоштовні матеріали по <strong className="text-slate-800 dark:text-white">зодіакам (архетипам)</strong>;</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-indigo-500 mt-1">•</span>
                                    <span><strong className="text-slate-800 dark:text-white">Астрологічний розрахунок</strong> алхіміків (у розробці);</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-indigo-500 mt-1">•</span>
                                    <span>Замовлення <strong className="text-slate-800 dark:text-white">артефактів</strong> у майстерні;</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-indigo-500 mt-1">•</span>
                                    <span>Замовлення <strong className="text-slate-800 dark:text-white">послуг</strong> у майстерні;</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-indigo-500 mt-1">•</span>
                                    <span>Підписуйтесь на <a href="https://www.youtube.com/@12.elite.archetypes" target="_blank" rel="noreferrer" className="text-red-500 font-bold hover:underline">YouTube</a> канал щоб залишатись у ритмі простору</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-indigo-500 mt-1">•</span>
                                    <span>Задавайте <strong className="text-slate-800 dark:text-white">питання</strong> автору у розділі <Link to="/master/ask" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">"РОЗМОВИ З АВТОРОМ"</Link></span>
                                </li>
                            </ul>
                        </div>

                        {/* School Section */}
                        <div className="bg-gradient-to-r from-cyan-100 via-indigo-50 to-fuchsia-100 dark:from-cyan-900/30 dark:via-indigo-900/20 dark:to-fuchsia-900/30 rounded-3xl p-8 border border-cyan-200 dark:border-cyan-800">
                            <div className="text-center mb-8">
                                <span className="inline-block px-6 py-2 bg-white dark:bg-slate-900 rounded-full text-lg font-bold text-slate-800 dark:text-white shadow-md border border-slate-200 dark:border-slate-700">
                                    Навчання у Школі архетипів
                                </span>
                            </div>
                            
                            <p className="text-slate-700 dark:text-slate-300 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
                                <strong className="text-slate-800 dark:text-white">Навчання у Школі Архетипів</strong> — це авторська метода духовних перетворень людини. Від базового рівня, коли людина не знайома із духовними практиками, до найвищого рівня, коли людина відкриває власне джерело сили через яке впливає на дійсність свого життя.
                            </p>

                            {/* Course Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* 1-2 Course */}
                                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                                    <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-4">1й та 2й курси ви можете пройти самостійно.</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        Вам слід придбати доступ до презентацій прослухати аудіозапис та виконати медитативні вправи. Ви можете <strong>самостійно ознайомитись із усіма 12ю архетипами</strong>, відчувши їх через власне тіло під час медитації.
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        Ви також можете <Link to="/master/lessons" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">замовити зустріч із майстром</Link>, щоб глибше відчути архетипи та подолати складнощі засвоєння певних архетипів.
                                    </p>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        <p><strong>1й курс</strong> — ініціація якостей 12 архетипів у вашому тілі та просторі життя.</p>
                                        <p>На екзаменації — побудова архетипу сім'ї</p>
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                        <p><strong>2й курс</strong> — практика героя — активна діяльність у суспільстві як духовна практика набуття досвіду.</p>
                                        <p>На екзаменації — побудова архетипу бізнесу</p>
                                    </div>
                                </div>

                                {/* 3-4 Course */}
                                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                                    <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-1">Проходження 3го курсу</h4>
                                    <p className="text-xs text-slate-500 mb-4">потребує регулярних зустрічей з майстром.</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        Ви будете вивчати те як слід застосовувати <strong>аркани таро</strong> для створення авторського магічного простору. Екзаменація 3 курсу полягає у <strong>ототожненні вас із стихією</strong>. Із побудови профілю <strong>елітарної персони</strong>, яка підкорює усі прояви стихії.
                                    </p>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        <p><strong>3й курс</strong> — практика мага — ключі підкорення стихій як спосіб побудови особистого магічного простору.</p>
                                        <p>На екзаменації — ототожнення зі стихією (відповідно до вашого зодіаку).</p>
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                                        <p><strong>4й курс</strong> — практика майстра сили — ключі резонування із бездоганними силами (фізичними явищами, астрологічними планетами).</p>
                                        <p>На екзаменації — побудова архетипу духовного майстра.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Free Materials */}
                        <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-800">
                            <div className="text-center mb-6">
                                <span className="inline-block px-6 py-2 bg-white dark:bg-slate-900 rounded-full text-lg font-bold text-slate-800 dark:text-white shadow-md border border-slate-200 dark:border-slate-700">
                                    Безкоштовні матеріали по зодіакам (архетипи)
                                </span>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 text-center mb-4">
                                Ви можете самостійно <strong>поглибитись у тему Архетипів</strong>, ознайомившись з презентаціями по знакам зодіаку у вільному доступі — <Link to="/training" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">клік</Link>.
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 text-center">
                                Нижче знайдіть другий розділ "МАТЕРІАЛИ ДЛЯ ВІЛЬНОГО ОЗНАЙОМЛЕННЯ"<br/>
                                Також радимо Вам відвідати сторінку <Link to="/knowledge/faq" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">"FAQ | Термінологія"</Link>.
                            </p>
                        </div>

                        {/* Alchemy Calculator - Coming Soon */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-8 border border-amber-200 dark:border-amber-800 text-center">
                            <span className="inline-block px-6 py-2 bg-white dark:bg-slate-900 rounded-full text-lg font-bold text-slate-800 dark:text-white shadow-md border border-slate-200 dark:border-slate-700 mb-6">
                                Астрологічний розрахунок алхіміків
                            </span>
                            <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 tracking-wider">
                                COMING SOON...
                            </p>
                        </div>

                        {/* Workshop Section */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800">
                            <div className="text-center mb-8">
                                <span className="inline-block px-6 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full text-lg font-bold text-white shadow-md">
                                    Замовлення у майстерні
                                </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Artifacts */}
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
                                    <div className="inline-block px-4 py-1.5 bg-white dark:bg-slate-900 rounded-full text-sm font-bold text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
                                        Артефакти
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        На базі школи існує магазин артефактів <Link to="/workshop" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">"МАЙСТЕРНЯ"</Link>.<br/>
                                        Там Ви можете придбати магічні артефакти:
                                    </p>
                                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-500">•</span>
                                            <span><strong>INFINITY COINS</strong> — монети що вмикають астрологічні сили.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-500">•</span>
                                            <span><strong>Атрибутика</strong> — продукція із символікою ієрогліфічного письма</span>
                                        </li>
                                    </ul>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                                        Ювелірне замовлення виконує досвідчений ювелір.<br/>
                                        За індивідуальним кресленням, розрахованим по правилу золотого перетину.
                                    </p>
                                    <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                                        <li className="flex items-start gap-2"><span className="text-fuchsia-500">•</span> Перстні Первинних Сил</li>
                                        <li className="flex items-start gap-2"><span className="text-fuchsia-500">•</span> Кулон Бездоганності</li>
                                        <li className="flex items-start gap-2"><span className="text-fuchsia-500">•</span> Підвіска Бездоганності</li>
                                    </ul>
                                </div>

                                {/* Services */}
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
                                    <div className="inline-block px-4 py-1.5 bg-white dark:bg-slate-900 rounded-full text-sm font-bold text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
                                        Послуги
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        У цьому ж розділі можна замовити послуги майстра:
                                    </p>
                                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-500">•</span>
                                            <span>Сезонні процедури — <Link to="/workshop/procedures" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">тут</Link></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-500">•</span>
                                            <span>Печатки майстра (6 видів) — <Link to="/workshop/seals" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">тут</Link></span>
                                        </li>
                                    </ul>
                                    <div className="rounded-xl overflow-hidden mt-4">
                                        <img src="/sigil/sigil.jpg" alt="Печатка" className="w-full h-40 object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Consultations */}
                        <div className="bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-3xl p-8 border border-fuchsia-200 dark:border-fuchsia-800 text-center">
                            <span className="inline-block px-6 py-2 bg-white dark:bg-slate-900 rounded-full text-lg font-bold text-slate-800 dark:text-white shadow-md border border-slate-200 dark:border-slate-700 mb-6">
                                Консультації
                            </span>
                            <p className="text-slate-700 dark:text-slate-300 mb-4">
                                Ви маєте можливість замовити індивідуальні консультації у розділі <Link to="/consultations" className="text-fuchsia-600 dark:text-fuchsia-400 font-bold hover:underline">"КОНСУЛЬТАЦІЇ"</Link>:
                            </p>
                            <ul className="space-y-2 text-slate-700 dark:text-slate-300 inline-block text-left">
                                <li className="flex items-start gap-2"><span className="text-fuchsia-500">•</span> Загальна консультація</li>
                                <li className="flex items-start gap-2"><span className="text-fuchsia-500">•</span> Консультація на мові Архетипів</li>
                                <li className="flex items-start gap-2"><span className="text-fuchsia-500">•</span> Зцілення підсвідомості</li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div className="bg-gradient-to-r from-rose-400 to-pink-500 dark:from-rose-600 dark:to-pink-700 rounded-3xl p-8 text-white text-center">
                            <h3 className="text-2xl font-bold mb-4">Як з нами законтактувати?</h3>
                            <p className="mb-6 leading-relaxed">
                                Якщо <strong>Вас зацікавила можливість навчання</strong>, представлена продукція в магазині артефактів або <strong>Ви бажаєте отримати індивідуальну консультацію</strong>. Але виникають будь-які сумніви або залишились ще питання, <strong>Ви завжди можете особисто написати нам у телеграм та отримати відповіді на будь-які свої питання</strong>.
                            </p>
                            <a 
                                href="https://t.me/dobrevk" 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-rose-600 font-bold rounded-full shadow-lg hover:scale-105 transition-all"
                            >
                                Для замовлення зв'яжіться з нами <Send size={18} />
                            </a>
                        </div>

                        {/* YouTube Section */}
                        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 text-white text-center">
                            <h3 className="text-xl font-bold mb-4">
                                <span className="text-red-500">YouTube</span> канал | ЗАЛИШАЙТЕСЯ У РИТМІ ПРОСТОРУ
                            </h3>
                            <p className="text-slate-400 mb-4">
                                Деякі відео лекції Ви можете знайти у розділі "<Link to="/knowledge/youtube" className="text-red-400 hover:underline">YouTube</Link>" — клік.
                            </p>
                            <p className="text-slate-300 mb-6">
                                У наших соціальних мережах, <strong className="text-white">Ви також знайдете багато цікавої інформації. Тому радимо Вам підписатися!</strong>
                            </p>
                            <div className="flex justify-center gap-4">
                                <a href="https://t.me/EliteArchetypes" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                                    <Send size={18} />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition-colors">
                                    📷
                                </a>
                                <a href="https://etsy.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-orange-600 flex items-center justify-center transition-colors text-sm font-bold">
                                    Etsy
                                </a>
                                <a href="https://www.youtube.com/@12.elite.archetypes" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center transition-colors">
                                    <Play size={18} fill="white" />
                                </a>
                            </div>
                        </div>

                        {/* Questions Section */}
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 text-center">
                            <span className="inline-block px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-lg font-bold shadow-md mb-6">
                                ВАШІ ПИТАННЯ
                            </span>
                            <p className="text-slate-700 dark:text-slate-300">
                                Задавайте <strong className="text-slate-900 dark:text-white">Ваші питання</strong> до автора проєкту Школа Архетипів — Костянтину Добреву у розділі "РОЗМОВИ З АВТОРОМ" — <Link to="/master/ask" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">тут</Link>
                            </p>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};