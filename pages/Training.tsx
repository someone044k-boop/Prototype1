import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Sparkles, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Course data structure
interface CourseTab {
    id: string;
    label: string;
}

interface CourseButton {
    label: string;
    path: string;
}

// Course 1 Data
const course1Tabs: CourseTab[] = [
    { id: 'archetypes', label: 'ЗНАЙОМСТВО З АРХЕТИПАМИ' },
    { id: 'meditation', label: 'МЕДИТАЦІЇ ІНІЦІАЦІЇ ЯКОСТЕЙ' },
    { id: 'exam', label: 'ЕКЗАМЕНАЦІЯ' },
];

const course1ArchetypesButtons: CourseButton[] = [
    { label: 'СКОРПІОН, ТЕЛЕЦЬ ТА ДІВА', path: '/training/course1/scorpio' },
    { label: 'ОВЕН, КОЗЕРІГ ТА БЛИЗНЮКИ', path: '/training/course1/aries' },
    { label: 'СТРІЛЕЦЬ, ЛЕВ ТА РИБИ', path: '/training/course1/sagittarius' },
    { label: 'ВОДОЛІЙ, ТЕРЕЗИ ТА РАК', path: '/training/course1/aquarius' },
];

const course1MeditationButtons: CourseButton[] = [
    { label: 'ІНІЦІАЦІЯ СИСТЕМИ ЛІБІДО', path: '/training/course1/libido' },
    { label: 'ІНІЦІАЦІЯ СИСТЕМИ ПОЧУТТІВ', path: '/training/course1/feelings' },
    { label: 'ІНІЦІАЦІЯ СИСТЕМИ РОЗУМУ', path: '/training/course1/mind' },
    { label: 'ІНІЦІАЦІЯ СИСТЕМИ УВАГИ', path: '/training/course1/attention' },
];

const course1ExamButtons: CourseButton[] = [
    { label: 'ПОТРЕБИ ТА БАЖАННЯ ПАРТНЕРІВ', path: '/training/course1/exam/needs' },
    { label: 'ОБМІН МІЖ ПАРТНЕРАМИ', path: '/training/course1/exam/exchange' },
    { label: 'ПРАВИЛА ПОБУТУ ПАРТНЕРІВ', path: '/training/course1/exam/rules' },
    { label: 'СУСПІЛЬНА РЕАКЦІЯ НА СТОСУНКИ', path: '/training/course1/exam/society' },
    { label: 'АРХЕТИП СІМ\'Ї', path: '/training/course1/exam/family' },
];

// Course 2 Data
const course2Tabs: CourseTab[] = [
    { id: 'space', label: 'ПРОСТІР ПОДВИГІВ' },
    { id: 'heroes', label: 'ГЕРОЇ ТА ЇХ СИЛА' },
    { id: 'weight', label: 'ВЛАСНА ВАГА' },
    { id: 'influence', label: 'ВПЛИВ НА СЕРЕДОВИЩЕ' },
    { id: 'exam', label: 'ЕКЗАМЕНАЦІЯ' },
];

export const Training: React.FC = () => {
    const location = useLocation();
    const { t } = useLanguage();
    const [activeCourse, setActiveCourse] = useState<number>(1);
    const [activeTab1, setActiveTab1] = useState('archetypes');
    const [activeTab2, setActiveTab2] = useState('space');
    const [mandalaAnimated, setMandalaAnimated] = useState(false);

    // Determine active course from URL
    useEffect(() => {
        const path = location.pathname;
        // Scroll to top on navigation
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        if (path.includes('/year-2') || path.includes('/course2')) setActiveCourse(2);
        else if (path.includes('/year-3') || path.includes('/course3')) setActiveCourse(3);
        else if (path.includes('/year-4') || path.includes('/course4')) setActiveCourse(4);
        else if (path.includes('/year-1') || path.includes('/course1') || path === '/training') setActiveCourse(1);
        else setActiveCourse(1);
        
        // Reset animation on course change
        setMandalaAnimated(false);
        const timer = setTimeout(() => setMandalaAnimated(true), 100);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    // Tab Button Component
    const TabButton: React.FC<{ tab: CourseTab; isActive: boolean; onClick: () => void }> = ({ tab, isActive, onClick }) => (
        <button
            onClick={onClick}
            className="group relative flex items-center gap-2 py-2 px-1"
        >
            <span className={`text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap
                ${isActive 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'}`}
            >
                {tab.label}
            </span>
            {/* Animated underline */}
            <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-300 ease-out
                ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
            />
        </button>
    );

    // Course Button Component - простий вертикальний список
    const CourseButton: React.FC<{ btn: CourseButton; index: number }> = ({ btn, index }) => (
        <Link
            to={btn.path}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:shadow-md opacity-0 animate-fade-in"
            style={{ animationDelay: `${300 + index * 100}ms`, animationFillMode: 'forwards' }}
        >
            <ChevronRight size={14} className="text-indigo-500 flex-shrink-0" />
            <span>{btn.label}</span>
        </Link>
    );

    // Render Course 1
    const renderCourse1 = () => (
        <div className="animate-fade-in">
            {/* Header with Mandala */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                {/* Mandala - збільшений розмір */}
                <div className={`w-48 h-48 md:w-64 md:h-64 flex-shrink-0 ${mandalaAnimated ? 'animate-spin-once' : ''}`}>
                    <img src="/mandala.png" alt="Mandala" className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
                
                {/* Title */}
                <div className={`text-center md:text-left transition-all duration-1000 ${mandalaAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <h1 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
                        <span className="text-indigo-600 dark:text-indigo-400">{t('course1_title').split('|')[0]}</span>
                        <span className="text-slate-400 mx-2">|</span>
                        <span>{t('course1_title').split('|')[1]}</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-300">{t('course1_subtitle')}</h2>
                    
                    {/* Demo Classroom Button */}
                    <Link
                        to="/classroom/c1"
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all"
                    >
                        <Sparkles size={14} />
                        Демо: Навчальна кімната
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
                {course1Tabs.map(tab => (
                    <TabButton key={tab.id} tab={tab} isActive={activeTab1 === tab.id} onClick={() => setActiveTab1(tab.id)} />
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-indigo-950/20 rounded-[2rem] p-6 md:p-10 border border-white/50 dark:border-white/5 shadow-xl">
                {activeTab1 === 'archetypes' && (
                    <div className="animate-fade-in">
                        {/* Rich Text Header */}
                        <div className="mb-8 max-w-3xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-4 text-left">
                                <span className="text-indigo-600 dark:text-indigo-400">ТЕОРЕТИЧНИЙ МОДУЛЬ</span>
                                <span className="text-slate-400 mx-2">|</span>
                                <span className="text-slate-800 dark:text-white">ВИЗНАЧЕННЯ АРХЕТИПІВ</span>
                            </h2>
                            <div className="space-y-2 text-slate-600 dark:text-slate-400 text-left">
                                <p><strong className="text-slate-800 dark:text-white">Визначення:</strong> Архетипи — це універсальні первинні образи та патерни поведінки, що існують у колективному несвідомому людства.</p>
                                <p>Профайлінг та деталізація архетипів (зодіак).</p>
                                <p>Функції та призначення архетипів.</p>
                                <p>Стадії розвитку архетипу.</p>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Left: Buttons - вертикальний список */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Програма модуля</h3>
                                <div className="space-y-2">
                                    {course1ArchetypesButtons.map((btn, i) => <CourseButton key={btn.path} btn={btn} index={i} />)}
                                </div>
                            </div>

                            {/* Right: Image + Program */}
                            <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-4 shadow-lg border border-slate-100 dark:border-slate-700">
                                <div className="rounded-xl overflow-hidden shadow-md mb-4">
                                    <img src="/master/3kurs.webp" alt="Course" className="w-full h-48 object-cover" />
                                </div>
                                <div className="p-2">
                                    <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-2">Програма курсу</h4>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                        <li className="flex items-center gap-2"><Clock size={12} className="text-indigo-500" /> 12 відео-уроків</li>
                                        <li className="flex items-center gap-2"><Sparkles size={12} className="text-fuchsia-500" /> Практичні завдання</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab1 === 'meditation' && (
                    <div className="animate-fade-in">
                        <div className="mb-8 max-w-3xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-4 text-left">
                                <span className="text-fuchsia-600 dark:text-fuchsia-400">ПРАКТИЧНИЙ МОДУЛЬ</span>
                                <span className="text-slate-400 mx-2">|</span>
                                <span className="text-slate-800 dark:text-white">4 ВІКНО БЕЗДОГАННОСТІ</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-left">Медитації що ініціюють частини матриці душі.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Програма модуля</h3>
                                <div className="space-y-2">
                                    {course1MeditationButtons.map((btn, i) => <CourseButton key={btn.path} btn={btn} index={i} />)}
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-4 shadow-lg border border-slate-100 dark:border-slate-700">
                                <div className="rounded-xl overflow-hidden shadow-md mb-4 bg-gradient-to-br from-indigo-100 to-fuchsia-100 dark:from-slate-800 dark:to-indigo-900 p-8">
                                    <img src="/master/shrtr.svg" alt="Meditation" className="w-full h-48 object-contain" />
                                </div>
                                <div className="p-2">
                                    <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-2">Програма курсу</h4>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                        <li className="flex items-center gap-2"><Clock size={12} className="text-indigo-500" /> 4 медитації</li>
                                        <li className="flex items-center gap-2"><Sparkles size={12} className="text-fuchsia-500" /> Аудіо-супровід</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab1 === 'exam' && (
                    <div className="animate-fade-in">
                        <div className="mb-8 max-w-3xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-4 text-left">
                                <span className="text-amber-600 dark:text-amber-400">ЕКЗАМЕНАЦІЯ</span>
                                <span className="text-slate-400 mx-2">|</span>
                                <span className="text-slate-800 dark:text-white">ПОБУДОВА ВЛАСНОГО СУБ'ЄКТИВНОГО ПРОСТОРУ</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 font-medium text-left">ПРОСТОРУ АРХЕТИПУ СІМ'Ї</p>
                        </div>

                        {/* Info Block */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                    Ви можете безкоштовно ознайомитись із ключами екзаменації.
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                    Але для переходу на 2й курс ви маєте пройти 4 заняття по екзамінації з майстром на онлайн-зустрічі.
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    До екзаменації можна повертатись час від часу, щоб краще та глибше засвоювати ключі створення суб'єктивного простору.
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <a 
                                    href="https://t.me/dobrevk" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all uppercase tracking-wider text-sm"
                                >
                                    ПРОЙТИ ЕКЗАМЕНАЦІЮ
                                </a>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Програма модуля</h3>
                                <div className="space-y-2">
                                    {course1ExamButtons.map((btn, i) => <CourseButton key={btn.path} btn={btn} index={i} />)}
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-4 shadow-lg border border-slate-100 dark:border-slate-700">
                                <div className="rounded-xl overflow-hidden shadow-md mb-4">
                                    <img src="/master/aboutmaster2.webp" alt="Exam" className="w-full h-48 object-cover" />
                                </div>
                                <div className="p-2">
                                    <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-2">Програма курсу</h4>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                        <li className="flex items-center gap-2"><Clock size={12} className="text-indigo-500" /> 5 тем</li>
                                        <li className="flex items-center gap-2"><Sparkles size={12} className="text-fuchsia-500" /> Онлайн-зустрічі</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Donate Section */}
                        <div className="mt-10 text-center bg-gradient-to-r from-indigo-50 to-fuchsia-50 dark:from-slate-800 dark:to-indigo-900/30 rounded-2xl p-6">
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                                Матеріали екзаменації розміщені безкоштовно.<br/>
                                Якщо у Вас виникло бажання віддячити автору, то Ви можете задонатити будь яку суму, для підтримки проекту "Школа Архетипів".
                            </p>
                            <a 
                                href="https://t.me/dobrevk" 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold rounded-full shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all uppercase tracking-wider text-sm"
                            >
                                ❤️ ПІДТРИМАТИ ПРОЕКТ
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // Render Course 2
    const renderCourse2 = () => (
        <div className="animate-fade-in">
            {/* Header with Mandala - збільшений розмір */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                <div className={`w-40 h-40 md:w-56 md:h-56 flex-shrink-0 ${mandalaAnimated ? 'animate-spin-once' : ''}`}>
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 to-orange-500 p-4 shadow-2xl">
                        <img src="/mandala.png" alt="Mandala" className="w-full h-full object-contain drop-shadow-xl" style={{ filter: 'hue-rotate(30deg)' }} />
                    </div>
                </div>
                
                <div className={`text-center md:text-left transition-all duration-1000 ${mandalaAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <h1 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
                        <span className="text-amber-600 dark:text-amber-400">2й КУРС</span>
                        <span className="text-slate-400 mx-2">|</span>
                        <span>ПРАКТИКА ГЕРОЯ</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">ПРАКТИКА АРХЕТИПІВ У СУСПІЛЬСТВІ</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
                {course2Tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab2(tab.id)}
                        className="group relative flex items-center py-2 px-1"
                    >
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap
                            ${activeTab2 === tab.id 
                                ? 'text-amber-600 dark:text-amber-400' 
                                : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'}`}
                        >
                            {tab.label}
                        </span>
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 ease-out
                            ${activeTab2 === tab.id ? 'w-full' : 'w-0 group-hover:w-full'}`}
                        />
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-gradient-to-br from-white to-amber-50 dark:from-slate-900 dark:to-amber-950/20 rounded-[2rem] p-6 md:p-10 border border-white/50 dark:border-white/5 shadow-xl">
                {activeTab2 === 'space' && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-8 max-w-3xl mx-auto">
                            <h2 className="text-xl md:text-2xl font-bold mb-4">
                                <span className="text-amber-600 dark:text-amber-400">ТЕОРЕТИЧНИЙ МОДУЛЬ</span>
                                <span className="text-slate-400 mx-2">|</span>
                                <span className="text-slate-800 dark:text-white">ПРОСТІР ПОДВИГІВ</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">Правила за якими герої набувають славу.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Програма модуля</h3>
                                {[1,2,3,4].map((_, i) => (
                                    <div key={i} className="block w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium opacity-0 animate-fade-in" style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: 'forwards' }}>
                                        <span className="flex items-center gap-2"><ChevronRight size={14} className="text-amber-500" /> Урок {i + 1}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="rounded-2xl overflow-hidden shadow-xl mb-4 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-800 dark:to-amber-900/30">
                                    <img src="/master/aboutmaster1.webp" alt="Course" className="w-full h-48 object-cover" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-2">Програма курсу</h4>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                        <li className="flex items-center gap-2"><Clock size={12} className="text-amber-500" /> 8 відео-уроків</li>
                                        <li className="flex items-center gap-2"><Sparkles size={12} className="text-orange-500" /> Практичні завдання</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab2 === 'heroes' && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-8 max-w-3xl mx-auto">
                            <h2 className="text-xl md:text-2xl font-bold mb-4">
                                <span className="text-amber-600 dark:text-amber-400">ТЕОРЕТИЧНИЙ МОДУЛЬ</span>
                                <span className="text-slate-400 mx-2">|</span>
                                <span className="text-slate-800 dark:text-white">ГЕРОЇ ТА ЇХ СИЛА</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">Сила яка дозволяє героям діяти.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Програма модуля</h3>
                                {[1,2,3,4].map((_, i) => (
                                    <div key={i} className="block w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium opacity-0 animate-fade-in" style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: 'forwards' }}>
                                        <span className="flex items-center gap-2"><ChevronRight size={14} className="text-amber-500" /> Урок {i + 1}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="rounded-2xl overflow-hidden shadow-xl mb-4">
                                    <img src="/master/nastavnictvo.webp" alt="Heroes" className="w-full h-48 object-cover" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-2">Програма курсу</h4>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                        <li className="flex items-center gap-2"><Clock size={12} className="text-amber-500" /> 6 відео-уроків</li>
                                        <li className="flex items-center gap-2"><Sparkles size={12} className="text-orange-500" /> Аналіз героїв</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab2 === 'weight' && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-8 max-w-3xl mx-auto">
                            <h2 className="text-xl md:text-2xl font-bold mb-4">
                                <span className="text-orange-600 dark:text-orange-400">ПРАКТИЧНИЙ МОДУЛЬ</span>
                                <span className="text-slate-400 mx-2">|</span>
                                <span className="text-slate-800 dark:text-white">1 ВІКНО БЕЗДОГАННОСТІ</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">Медитації що набувають вагу частин матриці душі.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Програма модуля</h3>
                                {[1,2,3,4].map((_, i) => (
                                    <div key={i} className="block w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium opacity-0 animate-fade-in" style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: 'forwards' }}>
                                        <span className="flex items-center gap-2"><ChevronRight size={14} className="text-orange-500" /> Медитація {i + 1}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="rounded-2xl overflow-hidden shadow-xl mb-4 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-slate-800 dark:to-orange-900/30 p-8">
                                    <img src="/master/shrtr.svg" alt="Weight" className="w-full h-32 object-contain" style={{ filter: 'hue-rotate(30deg)' }} />
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-2">Програма курсу</h4>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                        <li className="flex items-center gap-2"><Clock size={12} className="text-orange-500" /> 4 медитації</li>
                                        <li className="flex items-center gap-2"><Sparkles size={12} className="text-amber-500" /> Аудіо-супровід</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab2 === 'influence' && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-8 max-w-3xl mx-auto">
                            <h2 className="text-xl md:text-2xl font-bold mb-4">
                                <span className="text-orange-600 dark:text-orange-400">ПРАКТИЧНИЙ МОДУЛЬ</span>
                                <span className="text-slate-400 mx-2">|</span>
                                <span className="text-slate-800 dark:text-white">1 ВІКНО БЕЗДОГАННОСТІ</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">Медитації що набувають вплив на простір життя.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Програма модуля</h3>
                                {[1,2,3,4].map((_, i) => (
                                    <div key={i} className="block w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium opacity-0 animate-fade-in" style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: 'forwards' }}>
                                        <span className="flex items-center gap-2"><ChevronRight size={14} className="text-orange-500" /> Медитація {i + 1}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="rounded-2xl overflow-hidden shadow-xl mb-4">
                                    <img src="/master/uchen-blizkogo-kola.webp" alt="Influence" className="w-full h-48 object-cover" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-2">Програма курсу</h4>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                        <li className="flex items-center gap-2"><Clock size={12} className="text-orange-500" /> 4 медитації</li>
                                        <li className="flex items-center gap-2"><Sparkles size={12} className="text-amber-500" /> Практика впливу</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab2 === 'exam' && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-8 max-w-3xl mx-auto">
                            <h2 className="text-xl md:text-2xl font-bold mb-4">
                                <span className="text-amber-600 dark:text-amber-400">ЕКЗАМЕНАЦІЯ</span>
                                <span className="text-slate-400 mx-2">|</span>
                                <span className="text-slate-800 dark:text-white">ПРОФІЛЬ ГЕРОЯ</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">Вибудова профілю героя. Людини що активно діє у суспільстві як бізнесмен.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Програма модуля</h3>
                                {[1,2,3,4].map((_, i) => (
                                    <div key={i} className="block w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium opacity-0 animate-fade-in" style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: 'forwards' }}>
                                        <span className="flex items-center gap-2"><ChevronRight size={14} className="text-amber-500" /> Тема {i + 1}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="rounded-2xl overflow-hidden shadow-xl mb-4">
                                    <img src="/master/aboutmaster2.webp" alt="Exam" className="w-full h-48 object-cover" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-2">Програма курсу</h4>
                                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                        <li className="flex items-center gap-2"><Clock size={12} className="text-amber-500" /> 4 теми</li>
                                        <li className="flex items-center gap-2"><Sparkles size={12} className="text-orange-500" /> Онлайн-зустрічі</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // Render Course 3 - Coming Soon - елегантна анімація
    const renderCourse3 = () => (
        <div className="animate-fade-in min-h-[60vh] flex flex-col items-center justify-center">
            {/* Header with Mandala */}
            <div className="flex flex-col items-center gap-6 mb-10">
                <div className={`w-40 h-40 md:w-56 md:h-56 flex-shrink-0 ${mandalaAnimated ? 'animate-spin-once' : ''}`}>
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-4 shadow-2xl">
                        <img src="/mandala.png" alt="Mandala" className="w-full h-full object-contain drop-shadow-xl" style={{ filter: 'hue-rotate(120deg)' }} />
                    </div>
                </div>
                
                <div className={`text-center transition-all duration-1000 ${mandalaAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
                        <span className="text-emerald-600 dark:text-emerald-400">3й КУРС</span>
                        <span className="text-slate-400 mx-2">|</span>
                        <span>ЗВ'ЯЗОК ІЗ СТИХІЯМИ</span>
                    </h1>
                </div>
            </div>

            {/* Elegant Coming Soon */}
            <div className="relative">
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-emerald-400/40 animate-float"
                            style={{ 
                                left: `${20 + i * 15}%`, 
                                top: `${10 + (i % 3) * 30}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${3 + i * 0.5}s`
                            }}
                        />
                    ))}
                </div>

                {/* Center content */}
                <div className="relative z-10 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-slate-800/80 dark:to-emerald-950/50 backdrop-blur-sm rounded-[3rem] px-16 py-12 text-center shadow-2xl border border-emerald-200/50 dark:border-emerald-800/50">
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-emerald-400"></div>
                        <Sparkles className="text-emerald-500" size={20} />
                        <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-emerald-400"></div>
                    </div>
                    <span className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 tracking-wider">
                        НЕЗАБАРОМ
                    </span>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 tracking-wide">
                        Курс знаходиться у розробці
                    </p>
                </div>
            </div>
        </div>
    );

    // Render Course 4 - Coming Soon - елегантна анімація
    const renderCourse4 = () => (
        <div className="animate-fade-in min-h-[60vh] flex flex-col items-center justify-center">
            {/* Header with Mandala */}
            <div className="flex flex-col items-center gap-6 mb-10">
                <div className={`w-40 h-40 md:w-56 md:h-56 flex-shrink-0 ${mandalaAnimated ? 'animate-spin-once' : ''}`}>
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-400 to-purple-500 p-4 shadow-2xl">
                        <img src="/mandala.png" alt="Mandala" className="w-full h-full object-contain drop-shadow-xl" style={{ filter: 'hue-rotate(270deg)' }} />
                    </div>
                </div>
                
                <div className={`text-center transition-all duration-1000 ${mandalaAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
                        <span className="text-violet-600 dark:text-violet-400">4й КУРС</span>
                        <span className="text-slate-400 mx-2">|</span>
                        <span>ПРОБУДЖЕННЯ БЕЗДОГАННИХ СИЛ</span>
                    </h1>
                </div>
            </div>

            {/* Elegant Coming Soon */}
            <div className="relative">
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-violet-400/40 animate-float"
                            style={{ 
                                left: `${20 + i * 15}%`, 
                                top: `${10 + (i % 3) * 30}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${3 + i * 0.5}s`
                            }}
                        />
                    ))}
                </div>

                {/* Center content */}
                <div className="relative z-10 bg-gradient-to-br from-violet-50/80 to-purple-50/80 dark:from-slate-800/80 dark:to-violet-950/50 backdrop-blur-sm rounded-[3rem] px-16 py-12 text-center shadow-2xl border border-violet-200/50 dark:border-violet-800/50">
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-violet-400"></div>
                        <Sparkles className="text-violet-500" size={20} />
                        <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-violet-400"></div>
                    </div>
                    <span className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 tracking-wider">
                        НЕЗАБАРОМ
                    </span>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 tracking-wide">
                        Курс знаходиться у розробці
                    </p>
                </div>
            </div>
        </div>
    );

    // Main render
    return (
        <div className="min-h-screen pt-20 pb-8 px-4 md:px-8 lg:pr-24">
            {/* Mobile Course Navigation - показується тільки на мобільних */}
            <div className="lg:hidden flex flex-wrap justify-center gap-2 mb-6 sticky top-20 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-3 -mx-4 px-4 border-b border-slate-100 dark:border-slate-800">
                {[1, 2, 3, 4].map((num) => (
                    <Link
                        key={num}
                        to={`/training/year-${num}`}
                        className={`px-3 py-2 rounded-xl flex items-center gap-1.5 font-bold text-xs transition-all
                            ${activeCourse === num 
                                ? 'bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                            }`}
                    >
                        <span>{num}</span>
                        <span className="uppercase tracking-wider">курс</span>
                    </Link>
                ))}
            </div>

            {/* Fixed Right Sidebar - Course Navigation - тільки на десктопі */}
            <div className="fixed right-4 top-24 z-40 hidden lg:flex flex-col gap-2" style={{ width: 'calc(var(--vw-unit) * 7)' }}>
                {[1, 2, 3, 4].map((num) => (
                    <Link
                        key={num}
                        to={`/training/year-${num}`}
                        className={`px-3 py-2 rounded-xl flex items-center gap-2 font-bold transition-all duration-300 shadow-lg
                            ${activeCourse === num 
                                ? 'bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white scale-105' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105'
                            }`}
                        style={{ 
                            boxShadow: activeCourse === num ? '0 4px 20px rgba(129, 140, 248, 0.4)' : '0 2px 10px rgba(0,0,0,0.1)',
                            fontSize: 'var(--text-sm)'
                        }}
                    >
                        <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center" style={{ fontSize: 'var(--text-xs)' }}>{num}</span>
                        <span className="uppercase tracking-wider" style={{ fontSize: 'var(--text-xs)' }}>курс</span>
                    </Link>
                ))}
                <div className="h-[1px] bg-slate-200 dark:bg-slate-700 my-1"></div>
                <Link
                    to="/training/map"
                    className="px-3 py-2 rounded-xl flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-lg hover:scale-105 font-bold uppercase tracking-wider"
                    title="Повна програма"
                    style={{ fontSize: 'var(--text-xs)' }}
                >
                    Програма
                </Link>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Course Content */}
                {activeCourse === 1 && renderCourse1()}
                {activeCourse === 2 && renderCourse2()}
                {activeCourse === 3 && renderCourse3()}
                {activeCourse === 4 && renderCourse4()}
            </div>
        </div>
    );
};
