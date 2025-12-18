import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FAQ_ITEMS, MOCK_VIDEOS } from '../constants';

export const KnowledgeBase: React.FC = () => {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState('faq');

    useEffect(() => {
        if (location.pathname.includes('/faq')) setActiveSection('faq');
        else if (location.pathname.includes('/youtube')) setActiveSection('youtube');
        else if (location.pathname.includes('/city-of-gods')) setActiveSection('city-of-gods');
        else if (location.pathname.includes('/nav')) setActiveSection('nav');
    }, [location]);

    const renderFAQ = () => (
        <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 border-r border-slate-200 dark:border-slate-700 pr-4">
                <h3 className="font-bold mb-4 uppercase text-sm text-slate-500">Навігація</h3>
                <ul className="space-y-2 text-sm">
                    {FAQ_ITEMS.map(item => (
                        <li key={item.id}>
                            <a href={`#faq-${item.id}`} className="hover:text-indigo-500 transition-colors block py-1">{item.title}</a>
                        </li>
                    ))}
                    {Array.from({length: 10}).map((_, i) => (
                        <li key={`mock-${i}`}><a href="#" className="hover:text-indigo-500 transition-colors block py-1 text-slate-400">Розділ {10 + i}</a></li>
                    ))}
                </ul>
            </div>
            <div className="col-span-3 space-y-8">
                {FAQ_ITEMS.map(item => (
                    <div key={item.id} id={`faq-${item.id}`} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border-l-4 border-indigo-500">
                        <h3 className="text-xl font-serif font-bold mb-2">{item.title}</h3>
                        <div className="text-slate-600 dark:text-slate-400 rich-text">{item.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderYouTube = () => (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="col-span-3 mb-8 text-center">
                 <h2 className="text-2xl font-bold mb-2">Наш YouTube Канал</h2>
                 <a href="https://www.youtube.com/@12.elite.archetypes" target="_blank" rel="noreferrer" className="text-indigo-500 underline">@12.elite.archetypes</a>
            </div>
            {MOCK_VIDEOS.map(video => (
                <div key={video.id} className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-lg group">
                    <div className="aspect-video relative">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl">▶</div>
                        </div>
                    </div>
                    <div className="p-4">
                        <h4 className="font-bold line-clamp-2 mb-2">{video.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{video.description}</p>
                    </div>
                </div>
            ))}
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
        <div className="min-h-screen pt-32 pb-20 px-2 md:px-4 w-full mx-auto">
            <h1 className="text-4xl font-serif font-bold text-center mb-12 text-slate-800 dark:text-indigo-100 uppercase tracking-widest">
                БАЗА ЗНАНЬ
            </h1>
            
            {/* Navigation Cards (Reverted from single line scroll) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
                {[
                    {id: 'faq', label: 'FAQ | Термінологія', path: '/knowledge/faq'},
                    {id: 'nav', label: 'Навігація по сайту', path: '/knowledge/nav'},
                    {id: 'youtube', label: 'YOUTUBE канал', path: '/knowledge/youtube'},
                    {id: 'city-of-gods', label: 'Технологія "Місто Богів"', path: '/knowledge/city-of-gods'}
                ].map(tab => (
                    <Link 
                        key={tab.id}
                        to={tab.path}
                        className={`p-4 text-center text-xs md:text-sm font-bold uppercase transition-all rounded-2xl border-2 flex items-center justify-center h-20 shadow-md hover:-translate-y-1 hover:shadow-lg
                        ${activeSection === tab.id 
                            ? 'border-indigo-500 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400' 
                            : 'border-transparent bg-white/50 dark:bg-slate-900/50 text-slate-500 hover:border-indigo-300'}`}
                    >
                        {tab.label}
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