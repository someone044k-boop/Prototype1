import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize, Lock, Volume2, AlertCircle } from 'lucide-react';
import { COURSES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const AudioPlayer: React.FC<{ src?: string }> = ({ src }) => {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [speed, setSpeed] = useState(1);
    const [isFull, setIsFull] = useState(false);

    // Lock body scroll when fullscreen
    useEffect(() => {
        if (isFull) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; }
    }, [isFull]);

    return (
        <div className={`w-full transition-all duration-500 ease-out ${
            isFull 
            ? 'fixed inset-0 z-[60] flex flex-col justify-end p-6 md:p-12 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-xl' 
            : 'bg-gradient-to-br from-indigo-50/80 via-white/50 to-fuchsia-50/80 dark:from-slate-800 dark:via-slate-900/50 dark:to-slate-900 p-6 rounded-[2rem] border border-indigo-100/50 dark:border-indigo-500/20 shadow-xl backdrop-blur-md'
        }`}>
            
            {/* Fullscreen content placeholder */}
            {isFull && (
                <div className="flex-1 flex items-center justify-center mb-10 overflow-auto relative animate-fade-in">
                    {/* Close button for fullscreen */}
                    <button 
                        onClick={() => setIsFull(false)} 
                        className="absolute top-0 right-0 p-3 bg-white dark:bg-slate-800 rounded-full hover:bg-indigo-500 hover:text-white transition-all shadow-md group"
                    >
                        <Maximize size={24} className="rotate-180 text-indigo-400 group-hover:text-white transition-colors" />
                    </button>

                    <div className="max-w-5xl w-full bg-white dark:bg-slate-800 p-8 md:p-12 shadow-2xl rounded-3xl min-h-[60vh] flex items-center justify-center border border-indigo-50 dark:border-slate-700 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5 pointer-events-none" />
                        <h2 className="text-3xl md:text-4xl font-serif text-center bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm">
                            Слайд презентації (Повноекранний режим)
                        </h2>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-5">
                {/* Progress */}
                <div className="h-2.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden cursor-pointer group shadow-inner">
                    <div className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 w-[30%] group-hover:from-violet-400 group-hover:to-indigo-400 transition-all duration-300 relative rounded-r-full shadow-[0_0_10px_rgba(167,139,250,0.5)]">
                        <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/40 blur-[4px]"></div>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 md:gap-8 mt-1 justify-between">
                     <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setPlaying(!playing)}
                            className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white flex items-center justify-center hover:scale-110 hover:shadow-indigo-500/40 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 border-2 border-white/20"
                        >
                            {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} className="ml-1" fill="currentColor" />}
                        </button>

                         <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Час</span>
                            <div className="flex gap-1 text-sm font-bold text-indigo-900/60 dark:text-indigo-100/60 font-mono">
                                <span>04:20</span>
                                <span className="opacity-50">/</span>
                                <span>12:00</span>
                            </div>
                        </div>
                     </div>
                    
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Speed */}
                        <button 
                            onClick={() => setSpeed(s => s === 1 ? 1.5 : s === 1.5 ? 2 : 1)} 
                            className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-slate-800 text-xs font-bold text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-slate-700 transition-colors border border-indigo-100 dark:border-slate-600"
                        >
                            {speed}x
                        </button>

                        {/* Volume */}
                        <div className="flex items-center gap-2 group relative hidden md:flex">
                            <Volume2 size={20} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                            <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[80%] rounded-full"></div>
                            </div>
                        </div>

                        <button 
                            className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-full" 
                            onClick={() => setIsFull(!isFull)}
                        >
                            <Maximize size={20}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Classroom: React.FC = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    
    const course = COURSES.find(c => c.id === courseId);

    // If course not found or not purchased, handle access
    if (!course) {
        return <div className="min-h-screen pt-32 text-center">Course not found</div>;
    }

    if (!course.purchased) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto flex items-center justify-center">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-2xl border border-red-500/30 text-center max-w-lg">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                        <Lock size={40} />
                    </div>
                    <h1 className="text-2xl font-serif font-bold mb-4">{t('access_denied_title')}</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">{t('access_denied_desc')}</p>
                    <div className="flex flex-col gap-3">
                        <Link 
                            to="/training" 
                            className="w-full py-3 bg-gold-500 text-white font-bold rounded hover:bg-gold-600 transition-colors uppercase tracking-wider"
                        >
                            {t('btn_buy_course')}
                        </Link>
                        <Link to="/" className="text-sm text-slate-500 hover:text-gold-500 underline">
                            {t('back')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-2 md:px-4 w-full mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
                
                {/* Left Menu (Lesson Navigation) */}
                <div className="lg:col-span-1 space-y-6">
                    <Link to="/training" className="text-sm font-bold text-slate-500 hover:text-indigo-500 flex items-center gap-1 mb-4 transition-colors">
                        <ChevronLeft size={16} /> {t('back')}
                    </Link>
                    
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20 dark:border-slate-800 sticky top-28">
                        <h3 className="font-serif font-bold text-lg mb-6 text-slate-800 dark:text-white text-center border-b border-slate-100 dark:border-slate-800 pb-4">{course.title}</h3>
                        
                        <div className="space-y-3 mb-8 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {course.modules[0]?.slides.map((slide, idx) => (
                                <button key={slide.id} className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-3 ${idx === 0 ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md transform scale-[1.02]' : 'hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                                    <span className={`text-xs font-mono w-5 h-5 rounded-full flex items-center justify-center ${idx === 0 ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'}`}>{idx + 1}</span> 
                                    <span className="font-medium">{slide.title}</span>
                                </button>
                            ))}
                            {course.year > 2 && (
                                <div className="text-center py-4 text-xs text-slate-400 italic">{t('soon')}</div>
                            )}
                        </div>
                        
                        {/* Course Progress */}
                        <div className="pt-4">
                            <div className="text-xs font-bold text-slate-400 mb-3 uppercase flex justify-between">
                                <span>{t('lesson_progress')}</span>
                                <span className="text-indigo-500">45%</span>
                            </div>
                            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-indigo-400 to-fuchsia-500 transition-all duration-1000 shadow-[0_0_10px_rgba(167,139,250,0.5)]" 
                                    style={{ width: '45%' }}
                                />
                            </div>
                        </div>

                        {/* Nav Buttons */}
                        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl mt-6 border border-slate-100 dark:border-slate-700">
                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all"><ChevronLeft size={20}/></button>
                            <span className="font-mono text-sm font-bold text-slate-500">1 / 12</span>
                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all"><ChevronRight size={20}/></button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-indigo-50 dark:border-slate-800 aspect-[16/9] flex items-center justify-center p-8 relative overflow-hidden group">
                         {/* Magical Background for Slide */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-fuchsia-500/5 opacity-50 pointer-events-none"></div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl group-hover:bg-fuchsia-500/20 transition-all duration-700"></div>
                        
                        <div className="z-10 text-center transform group-hover:scale-105 transition-transform duration-700">
                             <div className="mb-6 inline-block p-4 rounded-full bg-indigo-50 dark:bg-slate-800 text-indigo-500 shadow-inner">
                                <Maximize size={32} strokeWidth={1.5} />
                             </div>
                            <h2 className="text-3xl font-serif text-slate-800 dark:text-white font-bold mb-2">
                                {t('slide_materials')}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                                {course.title} &mdash; Модуль 1
                            </p>
                        </div>
                    </div>
                    
                    <AudioPlayer src="mock" />
                    
                    <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-400 to-fuchsia-400"></div>
                         <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-slate-800 dark:text-white">
                            <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-slate-800 text-indigo-600 flex items-center justify-center">✍️</span>
                            Нотатки до уроку
                         </h3>
                         <textarea className="w-full h-40 p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl resize-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-700 dark:text-slate-300 leading-relaxed" placeholder="Запишіть свої інсайти та думки тут..."></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};