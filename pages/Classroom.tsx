import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize, Minimize, Lock, Volume2, VolumeX, X } from 'lucide-react';
import { COURSES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface AudioPlayerProps {
    src?: string;
    slideKey: number;
    totalSlides: number;
    onPrev: () => void;
    onNext: () => void;
    onSlideCompleted: (slideIndex: number) => void;
    slideData?: {
        title: string;
        content: string;
        imageUrl?: string;
        type: string;
    };
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ slideKey, totalSlides, onPrev, onNext, onSlideCompleted, slideData }) => {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [isFull, setIsFull] = useState(false);
    const [volume, setVolume] = useState(80);
    const [isMuted, setIsMuted] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);

    // Reset audio when slide changes
    useEffect(() => {
        setPlaying(false);
        setProgress(0);
        setHasCompleted(false);
    }, [slideKey]);

    // Check if 80% completed
    useEffect(() => {
        if (progress >= 80 && !hasCompleted) {
            setHasCompleted(true);
            onSlideCompleted(slideKey);
        }
    }, [progress, hasCompleted, slideKey, onSlideCompleted]);

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
            ? 'fixed inset-0 z-[60] flex flex-col bg-slate-900' 
            : 'bg-gradient-to-br from-indigo-50/80 via-white/50 to-fuchsia-50/80 dark:from-slate-800 dark:via-slate-900/50 dark:to-slate-900 p-3 md:p-4 rounded-2xl border border-indigo-100/50 dark:border-indigo-500/20 shadow-[0_8px_30px_rgba(129,140,248,0.15)] backdrop-blur-md'
        }`}>
            
            {isFull && (
                <>
                    {/* Fullscreen slide - full width */}
                    <div className="flex-1 relative min-h-0 overflow-hidden">
                        <button 
                            onClick={() => setIsFull(false)} 
                            className="absolute top-4 right-4 p-2.5 bg-white/80 rounded-full hover:bg-gradient-to-br hover:from-indigo-500 hover:to-fuchsia-500 transition-all z-20 group shadow-lg"
                        >
                            <X size={20} className="text-slate-500 group-hover:text-white transition-colors" />
                        </button>
                        {slideData?.imageUrl && (
                            <img 
                                src={slideData.imageUrl} 
                                alt={slideData.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                        {/* Audio progress bar on image */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/30">
                            <div 
                                className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Compact fullscreen audio controls */}
                    <div className="flex-shrink-0 bg-gradient-to-r from-indigo-50 via-white to-fuchsia-50">
                        {/* Progress bar at top */}
                        <div className="h-2 bg-indigo-100 w-full cursor-pointer">
                            <div 
                                className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        
                        <div className="flex items-center gap-3 w-full px-4 py-3">
                            <span className="text-base font-semibold text-slate-800 truncate min-w-[200px] max-w-[280px]">{slideData?.title}</span>
                            <span className="text-sm font-mono text-slate-500 font-bold">{slideKey + 1}/{totalSlides}</span>
                            
                            <button 
                                onClick={onPrev}
                                disabled={slideKey === 0}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-fuchsia-600 transition-colors disabled:opacity-30"
                            >
                                <ChevronLeft size={18}/> Назад
                            </button>
                            
                            <button 
                                onClick={() => setPlaying(!playing)}
                                className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center hover:scale-105 transition-all shadow-md flex-shrink-0"
                            >
                                {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} className="ml-0.5" fill="currentColor" />}
                            </button>
                            
                            <button 
                                onClick={onNext}
                                disabled={slideKey === totalSlides - 1}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-fuchsia-600 transition-colors disabled:opacity-30"
                            >
                                Вперед <ChevronRight size={18}/>
                            </button>
                            
                            {/* Audio progress bar */}
                            <div className="flex-1 h-1.5 bg-indigo-100 rounded-full overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(129,140,248,0.5)] animate-pulse">
                                <div 
                                    className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-300 shadow-[0_0_10px_rgba(217,70,239,0.6)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            
                            <span className="text-xs font-mono text-slate-500">12:00</span>
                            
                            <button 
                                onClick={() => setSpeed((s: number) => s === 1 ? 1.5 : s === 1.5 ? 2 : 1)} 
                                className="text-sm font-bold text-slate-700 hover:text-fuchsia-500 transition-colors"
                            >
                                {speed}x
                            </button>
                            
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => setIsMuted(!isMuted)}
                                    className="text-slate-500 hover:text-fuchsia-500 transition-colors"
                                >
                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                                <input 
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={isMuted ? 0 : volume}
                                    onChange={(e) => {
                                        setVolume(Number(e.target.value));
                                        if (Number(e.target.value) > 0) setIsMuted(false);
                                    }}
                                    className="w-20 h-1.5 bg-indigo-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-fuchsia-500 [&::-webkit-slider-thumb]:cursor-pointer"
                                />
                            </div>
                            
                            <button 
                                onClick={() => setIsFull(false)}
                                className="p-1.5 text-slate-500 hover:text-fuchsia-500 transition-colors hover:bg-indigo-100 rounded"
                                title="Вийти з повного екрану"
                            >
                                <Minimize size={18}/>
                            </button>
                        </div>
                    </div>
                </>
            )}

            {!isFull && (
                <div className="flex items-center gap-3 md:gap-4">
                    <button 
                        onClick={() => setPlaying(!playing)}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white flex items-center justify-center hover:scale-105 hover:shadow-indigo-500/40 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 border border-white/20 flex-shrink-0"
                    >
                        {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} className="ml-0.5" fill="currentColor" />}
                    </button>
                    
                    <div className="flex-1 flex flex-col gap-1">
                        <div className="h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden cursor-pointer group">
                            <div 
                                className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 transition-all duration-300 relative rounded-r-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-end text-[10px] text-slate-400 font-mono">
                            <span>12:00</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        <button 
                            onClick={() => setSpeed((s: number) => s === 1 ? 1.5 : s === 1.5 ? 2 : 1)} 
                            className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-slate-800 text-[10px] font-bold text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-slate-700 transition-colors border border-indigo-100 dark:border-slate-600"
                        >
                            {speed}x
                        </button>
                        <div className="items-center gap-1.5 group relative hidden md:flex">
                            <button 
                                onClick={() => setIsMuted(!isMuted)}
                                className="text-slate-400 hover:text-indigo-500 transition-colors"
                            >
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                            <input 
                                type="range"
                                min="0"
                                max="100"
                                value={isMuted ? 0 : volume}
                                onChange={(e) => {
                                    setVolume(Number(e.target.value));
                                    if (Number(e.target.value) > 0) setIsMuted(false);
                                }}
                                className="w-16 h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                            />
                        </div>
                        <button 
                            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-full" 
                            onClick={() => setIsFull(!isFull)}
                            title="На весь екран"
                        >
                            <Maximize size={16}/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export const Classroom: React.FC = () => {
    const { courseId } = useParams();
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [completedSlides, setCompletedSlides] = useState<Set<number>>(new Set());
    
    const course = COURSES.find(c => c.id === courseId);
    const slides = course?.modules[0]?.slides || [];
    const totalSlides = slides.length;
    const currentSlideData = slides[currentSlide];

    // Load progress from localStorage on mount
    useEffect(() => {
        if (courseId) {
            const saved = localStorage.getItem(`course_progress_${courseId}`);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setCompletedSlides(new Set(parsed));
                } catch {
                    // ignore parse errors
                }
            }
        }
    }, [courseId]);

    // Save progress to localStorage when completedSlides changes
    useEffect(() => {
        if (courseId && completedSlides.size > 0) {
            localStorage.setItem(`course_progress_${courseId}`, JSON.stringify([...completedSlides]));
        }
    }, [completedSlides, courseId]);

    const goToSlide = (index: number) => {
        if (index >= 0 && index < totalSlides) {
            setCurrentSlide(index);
        }
    };

    const nextSlide = () => goToSlide(currentSlide + 1);
    const prevSlide = () => goToSlide(currentSlide - 1);

    const handleSlideCompleted = (slideIndex: number) => {
        setCompletedSlides((prev: Set<number>) => new Set([...prev, slideIndex]));
    };

    // Calculate real progress based on completed slides
    const courseProgress = totalSlides > 0 ? Math.round((completedSlides.size / totalSlides) * 100) : 0;

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
                    <h1 className="text-2xl font-bold mb-4">{t('access_denied_title')}</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">{t('access_denied_desc')}</p>
                    <div className="flex flex-col gap-3">
                        <Link 
                            to="/training" 
                            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-lg transition-all uppercase tracking-wider"
                        >
                            {t('btn_buy_course')}
                        </Link>
                        <Link to="/" className="text-sm text-slate-500 hover:text-indigo-500 underline">
                            {t('back')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden p-2 md:p-4">
            <Link to="/dashboard" className="text-sm font-bold text-slate-500 hover:text-indigo-500 flex items-center gap-1 mb-3 transition-colors flex-shrink-0">
                <ChevronLeft size={16} /> Мої курси
            </Link>
            
            <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
                {/* Menu - full height */}
                <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 lg:h-full">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 xl:p-6 rounded-2xl shadow-[0_8px_40px_rgba(129,140,248,0.25),0_4px_20px_rgba(255,255,255,0.4)] dark:shadow-xl border border-white/20 dark:border-slate-800 h-full flex flex-col">
                        <h3 className="font-bold text-base xl:text-lg mb-4 text-slate-800 dark:text-white text-center border-b border-slate-100 dark:border-slate-800 pb-3 flex-shrink-0">{course.title}</h3>
                        
                        <div className="space-y-1.5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {slides.map((slide, idx) => (
                                <button 
                                    key={slide.id} 
                                    onClick={() => goToSlide(idx)}
                                    className={`w-full text-left px-3 py-2 xl:px-4 xl:py-3 rounded-xl text-xs xl:text-sm transition-all flex items-center gap-2 xl:gap-3 ${
                                        idx === currentSlide 
                                            ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md transform scale-[1.02]' 
                                            : 'hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                                    }`}
                                >
                                    <span className={`text-[10px] xl:text-xs font-mono w-5 h-5 xl:w-6 xl:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                        idx === currentSlide ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'
                                    }`}>
                                        {idx + 1}
                                    </span> 
                                    <span className="font-medium truncate">{slide.title}</span>
                                </button>
                            ))}
                        </div>
                        
                        <div className="pt-4 flex-shrink-0">
                            <div className="text-[10px] xl:text-xs font-bold text-slate-400 mb-2 uppercase flex justify-between">
                                <span>{t('lesson_progress')}</span>
                                <span className="text-indigo-500">{courseProgress}%</span>
                            </div>
                            <div className="h-1.5 xl:h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-indigo-400 to-fuchsia-500 transition-all duration-500 shadow-[0_0_10px_rgba(167,139,250,0.5)]" 
                                    style={{ width: `${courseProgress}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-gradient-to-r from-indigo-50 via-white to-fuchsia-50 dark:from-slate-800/80 dark:via-slate-800/50 dark:to-slate-800/80 p-1.5 rounded-xl mt-6 border border-indigo-100/50 dark:border-indigo-500/20 flex-shrink-0">
                            <button 
                                onClick={prevSlide}
                                disabled={currentSlide === 0}
                                className="p-2 bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
                            >
                                <ChevronLeft size={18}/>
                            </button>
                            <span className="font-mono text-sm font-bold text-slate-700 dark:text-white">{currentSlide + 1} / {totalSlides}</span>
                            <button 
                                onClick={nextSlide}
                                disabled={currentSlide === totalSlides - 1}
                                className="p-2 bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
                            >
                                <ChevronRight size={18}/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Slide + Audio */}
                <div className="flex-1 flex flex-col min-h-0 gap-3">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl xl:rounded-[2rem] shadow-[0_8px_40px_rgba(129,140,248,0.25),0_4px_20px_rgba(255,255,255,0.4)] dark:shadow-2xl border border-indigo-50 dark:border-slate-800 flex-1 flex items-center justify-center relative overflow-hidden group">
                        {currentSlideData?.imageUrl && (
                            <img 
                                src={currentSlideData.imageUrl} 
                                alt={currentSlideData.title}
                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                            />
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-4 xl:p-6 z-10">
                        </div>
                    </div>
                    
                    {/* Audio player under slide */}
                    <div className="flex-shrink-0">
                        <AudioPlayer 
                            src={currentSlideData?.audioUrl} 
                            slideKey={currentSlide}
                            totalSlides={totalSlides}
                            onPrev={prevSlide}
                            onNext={nextSlide}
                            onSlideCompleted={handleSlideCompleted}
                            slideData={currentSlideData ? {
                                title: currentSlideData.title,
                                content: currentSlideData.content,
                                imageUrl: currentSlideData.imageUrl,
                                type: currentSlideData.type
                            } : undefined}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
