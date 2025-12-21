import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Sparkles, Clock, Lock, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Progress tracking interface
interface LessonProgress {
    completed: boolean;
    progress: number; // 0-100
}

interface ModuleProgress {
    [lessonId: string]: LessonProgress;
}

interface CourseProgress {
    [moduleId: string]: ModuleProgress;
}

interface UserProgress {
    courses: {
        [courseId: string]: CourseProgress;
    };
    purchasedCourses: string[]; // ['course1', 'course2', etc.]
}

// Demo progress data (in real app this would come from backend/localStorage)
const getDemoProgress = (): UserProgress => {
    // Try to load from localStorage
    const saved = localStorage.getItem('trainingProgress');
    if (saved) {
        return JSON.parse(saved);
    }
    // Default demo progress - course 1 partially completed
    return {
        courses: {
            course1: {
                archetypes: {
                    scorpio: { completed: true, progress: 100 },
                    aries: { completed: true, progress: 100 },
                    sagittarius: { completed: false, progress: 60 },
                    aquarius: { completed: false, progress: 0 },
                },
                meditation: {
                    libido: { completed: false, progress: 0 },
                    feelings: { completed: false, progress: 0 },
                    mind: { completed: false, progress: 0 },
                    attention: { completed: false, progress: 0 },
                },
                exam: {
                    needs: { completed: false, progress: 0 },
                    exchange: { completed: false, progress: 0 },
                    rules: { completed: false, progress: 0 },
                    society: { completed: false, progress: 0 },
                    family: { completed: false, progress: 0 },
                },
            },
            course2: {
                space: {
                    scorpio: { completed: false, progress: 0 },
                    aries: { completed: false, progress: 0 },
                    sagittarius: { completed: false, progress: 0 },
                    aquarius: { completed: false, progress: 0 },
                },
                heroes: {
                    scorpio: { completed: false, progress: 0 },
                    aries: { completed: false, progress: 0 },
                    sagittarius: { completed: false, progress: 0 },
                    aquarius: { completed: false, progress: 0 },
                },
                weight: {
                    scorpio: { completed: false, progress: 0 },
                    aries: { completed: false, progress: 0 },
                    sagittarius: { completed: false, progress: 0 },
                    aquarius: { completed: false, progress: 0 },
                },
                influence: {
                    scorpio: { completed: false, progress: 0 },
                    aries: { completed: false, progress: 0 },
                    sagittarius: { completed: false, progress: 0 },
                    aquarius: { completed: false, progress: 0 },
                },
                exam: {
                    scorpio: { completed: false, progress: 0 },
                    aries: { completed: false, progress: 0 },
                    sagittarius: { completed: false, progress: 0 },
                    aquarius: { completed: false, progress: 0 },
                },
            },
        },
        purchasedCourses: ['course1', 'course2', 'course3'], // Demo: first 3 courses purchased
    };
};

// Calculate module progress percentage
const calculateModuleProgress = (module: ModuleProgress | undefined): number => {
    if (!module) return 0;
    const lessons = Object.values(module);
    if (lessons.length === 0) return 0;
    const totalProgress = lessons.reduce((sum, l) => sum + l.progress, 0);
    return Math.round(totalProgress / lessons.length);
};

// Calculate course progress percentage
const calculateCourseProgress = (course: CourseProgress | undefined): number => {
    if (!course) return 0;
    const modules = Object.values(course);
    if (modules.length === 0) return 0;
    const totalProgress = modules.reduce((sum, m) => sum + calculateModuleProgress(m), 0);
    return Math.round(totalProgress / modules.length);
};

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

// Lesson descriptions for tooltips
interface LessonDescription {
    title: string;
    description: string;
    duration?: string;
    lessons?: number;
}

const lessonDescriptions: { [key: string]: LessonDescription } = {
    // Course 1 - Archetypes
    'course1-archetypes-scorpio': {
        title: 'Скорпіон, Телець та Діва',
        description: 'Вивчення архетипів землі та води. Глибинні трансформації, стабільність та аналітичність.',
        duration: '3 години',
        lessons: 4
    },
    'course1-archetypes-aries': {
        title: 'Овен, Козеріг та Близнюки',
        description: 'Архетипи вогню та повітря. Ініціатива, амбіції та комунікація.',
        duration: '3 години',
        lessons: 4
    },
    'course1-archetypes-sagittarius': {
        title: 'Стрілець, Лев та Риби',
        description: 'Архетипи експансії та творчості. Філософія, самовираження та інтуїція.',
        duration: '3 години',
        lessons: 4
    },
    'course1-archetypes-aquarius': {
        title: 'Водолій, Терези та Рак',
        description: 'Архетипи соціуму та емоцій. Інновації, гармонія та турбота.',
        duration: '3 години',
        lessons: 4
    },
    // Course 1 - Meditation
    'course1-meditation-libido': {
        title: 'Ініціація системи Лібідо',
        description: 'Медитація для активації життєвої енергії та творчого потенціалу.',
        duration: '45 хв',
        lessons: 1
    },
    'course1-meditation-feelings': {
        title: 'Ініціація системи Почуттів',
        description: 'Медитація для розкриття емоційного інтелекту та чутливості.',
        duration: '45 хв',
        lessons: 1
    },
    'course1-meditation-mind': {
        title: 'Ініціація системи Розуму',
        description: 'Медитація для ясності мислення та концентрації.',
        duration: '45 хв',
        lessons: 1
    },
    'course1-meditation-attention': {
        title: 'Ініціація системи Уваги',
        description: 'Медитація для розвитку усвідомленості та присутності.',
        duration: '45 хв',
        lessons: 1
    },
    // Course 1 - Exam
    'course1-exam-needs': {
        title: 'Потреби та бажання партнерів',
        description: 'Розуміння глибинних потреб у стосунках та їх задоволення.',
        duration: '1.5 години',
        lessons: 2
    },
    'course1-exam-exchange': {
        title: 'Обмін між партнерами',
        description: 'Принципи здорового енергетичного та емоційного обміну.',
        duration: '1.5 години',
        lessons: 2
    },
    'course1-exam-rules': {
        title: 'Правила побуту партнерів',
        description: 'Створення гармонійного спільного простору та правил.',
        duration: '1.5 години',
        lessons: 2
    },
    'course1-exam-society': {
        title: 'Суспільна реакція на стосунки',
        description: 'Взаємодія пари із соціумом та збереження автентичності.',
        duration: '1.5 години',
        lessons: 2
    },
    'course1-exam-family': {
        title: 'Архетип Сім\'ї',
        description: 'Побудова власного суб\'єктивного простору сім\'ї.',
        duration: '2 години',
        lessons: 3
    },
    // Course 2 - Space
    'course2-space-scorpio': {
        title: 'Простір подвигів: Скорпіон, Телець, Діва',
        description: 'Правила набуття слави через трансформацію та стабільність.',
        duration: '2 години',
        lessons: 3
    },
    'course2-space-aries': {
        title: 'Простір подвигів: Овен, Козеріг, Близнюки',
        description: 'Правила набуття слави через ініціативу та амбіції.',
        duration: '2 години',
        lessons: 3
    },
    'course2-space-sagittarius': {
        title: 'Простір подвигів: Стрілець, Лев, Риби',
        description: 'Правила набуття слави через експансію та творчість.',
        duration: '2 години',
        lessons: 3
    },
    'course2-space-aquarius': {
        title: 'Простір подвигів: Водолій, Терези, Рак',
        description: 'Правила набуття слави через інновації та гармонію.',
        duration: '2 години',
        lessons: 3
    },
    // Course 2 - Heroes
    'course2-heroes-scorpio': {
        title: 'Герої: Скорпіон, Телець, Діва',
        description: 'Сила героїв землі та води. Глибина та надійність.',
        duration: '2 години',
        lessons: 3
    },
    'course2-heroes-aries': {
        title: 'Герої: Овен, Козеріг, Близнюки',
        description: 'Сила героїв вогню та повітря. Лідерство та адаптивність.',
        duration: '2 години',
        lessons: 3
    },
    'course2-heroes-sagittarius': {
        title: 'Герої: Стрілець, Лев, Риби',
        description: 'Сила героїв експансії. Натхнення та візіонерство.',
        duration: '2 години',
        lessons: 3
    },
    'course2-heroes-aquarius': {
        title: 'Герої: Водолій, Терези, Рак',
        description: 'Сила героїв соціуму. Революція та емпатія.',
        duration: '2 години',
        lessons: 3
    },
    // Course 2 - Weight
    'course2-weight-scorpio': {
        title: 'Власна вага: Скорпіон, Телець, Діва',
        description: 'Медитації для набуття ваги через глибину та стабільність.',
        duration: '1 година',
        lessons: 2
    },
    'course2-weight-aries': {
        title: 'Власна вага: Овен, Козеріг, Близнюки',
        description: 'Медитації для набуття ваги через дію та структуру.',
        duration: '1 година',
        lessons: 2
    },
    'course2-weight-sagittarius': {
        title: 'Власна вага: Стрілець, Лев, Риби',
        description: 'Медитації для набуття ваги через експансію та творчість.',
        duration: '1 година',
        lessons: 2
    },
    'course2-weight-aquarius': {
        title: 'Власна вага: Водолій, Терези, Рак',
        description: 'Медитації для набуття ваги через інновації та турботу.',
        duration: '1 година',
        lessons: 2
    },
    // Course 2 - Influence
    'course2-influence-scorpio': {
        title: 'Вплив: Скорпіон, Телець, Діва',
        description: 'Практика впливу через трансформацію та аналіз.',
        duration: '1.5 години',
        lessons: 2
    },
    'course2-influence-aries': {
        title: 'Вплив: Овен, Козеріг, Близнюки',
        description: 'Практика впливу через лідерство та комунікацію.',
        duration: '1.5 години',
        lessons: 2
    },
    'course2-influence-sagittarius': {
        title: 'Вплив: Стрілець, Лев, Риби',
        description: 'Практика впливу через натхнення та візію.',
        duration: '1.5 години',
        lessons: 2
    },
    'course2-influence-aquarius': {
        title: 'Вплив: Водолій, Терези, Рак',
        description: 'Практика впливу через інновації та гармонію.',
        duration: '1.5 години',
        lessons: 2
    },
    // Course 2 - Exam
    'course2-exam-scorpio': {
        title: 'Екзаменація: Скорпіон, Телець, Діва',
        description: 'Профіль героя землі та води. Практичний бізнес-аналіз.',
        duration: '2 години',
        lessons: 3
    },
    'course2-exam-aries': {
        title: 'Екзаменація: Овен, Козеріг, Близнюки',
        description: 'Профіль героя вогню та повітря. Стратегія та комунікація.',
        duration: '2 години',
        lessons: 3
    },
    'course2-exam-sagittarius': {
        title: 'Екзаменація: Стрілець, Лев, Риби',
        description: 'Профіль героя експансії. Візія та творчий підхід.',
        duration: '2 години',
        lessons: 3
    },
    'course2-exam-aquarius': {
        title: 'Екзаменація: Водолій, Терези, Рак',
        description: 'Профіль героя соціуму. Інновації та партнерство.',
        duration: '2 години',
        lessons: 3
    },
};

// Course descriptions for tooltips
interface CourseDescription {
    title: string;
    description: string;
    modules: number;
    duration: string;
    features: string[];
}

const courseDescriptions: { [key: string]: CourseDescription } = {
    course1: {
        title: '1й КУРС | ІНІЦІАЦІЯ ЯКОСТЕЙ',
        description: 'Фундаментальний курс знайомства з архетипами. Ви вивчите 12 архетипів зодіаку, пройдете медитації ініціації та побудуєте власний суб\'єктивний простір.',
        modules: 3,
        duration: '2-3 місяці',
        features: ['12 архетипів зодіаку', '4 медитації ініціації', 'Екзаменація з майстром', 'Архетип сім\'ї']
    },
    course2: {
        title: '2й КУРС | ПРАКТИКА ГЕРОЯ',
        description: 'Практичний курс застосування архетипів у суспільстві. Ви навчитесь діяти як герой, набувати вагу та впливати на середовище.',
        modules: 5,
        duration: '3-4 місяці',
        features: ['Простір подвигів', 'Сила героїв', 'Власна вага', 'Вплив на середовище', 'Профіль бізнесмена']
    },
    course3: {
        title: '3й КУРС | ЗВ\'ЯЗОК ІЗ СТИХІЯМИ',
        description: 'Поглиблений курс роботи зі стихіями. Ви навчитесь взаємодіяти з енергіями природи та використовувати їх силу.',
        modules: 4,
        duration: '3-4 місяці',
        features: ['Стихія Вогню', 'Стихія Води', 'Стихія Повітря', 'Стихія Землі']
    },
    course4: {
        title: '4й КУРС | ПРОБУДЖЕННЯ БЕЗДОГАННИХ СИЛ',
        description: 'Майстерський курс пробудження внутрішніх сил. Ви досягнете рівня майстра архетипів та отримаєте доступ до бездоганних сил.',
        modules: 4,
        duration: '4-6 місяців',
        features: ['Бездоганна сила волі', 'Бездоганна сила серця', 'Бездоганна сила розуму', 'Інтеграція сил']
    },
};

// Module descriptions for tooltips
interface ModuleDescription {
    title: string;
    description: string;
    lessons: number;
    duration: string;
}

const moduleDescriptions: { [key: string]: ModuleDescription } = {
    // Course 1 modules
    'course1-archetypes': {
        title: 'Знайомство з архетипами',
        description: 'Теоретичний модуль вивчення 12 архетипів зодіаку. Профайлінг, функції та стадії розвитку кожного архетипу.',
        lessons: 4,
        duration: '12 годин'
    },
    'course1-meditation': {
        title: 'Медитації ініціації якостей',
        description: 'Практичний модуль з 4 медитацій для ініціації систем лібідо, почуттів, розуму та уваги.',
        lessons: 4,
        duration: '3 години'
    },
    'course1-exam': {
        title: 'Екзаменація',
        description: 'Побудова власного суб\'єктивного простору та архетипу сім\'ї. Онлайн-зустрічі з майстром.',
        lessons: 5,
        duration: '8 годин'
    },
    // Course 2 modules
    'course2-space': {
        title: 'Простір подвигів',
        description: 'Правила за якими герої набувають славу. Вивчення простору дій для кожної групи архетипів.',
        lessons: 4,
        duration: '8 годин'
    },
    'course2-heroes': {
        title: 'Герої та їх сила',
        description: 'Сила яка дозволяє героям діяти. Аналіз героїчних якостей кожної групи архетипів.',
        lessons: 4,
        duration: '6 годин'
    },
    'course2-weight': {
        title: 'Власна вага',
        description: 'Медитації для набуття ваги частин матриці душі. Практика впливу через внутрішню силу.',
        lessons: 4,
        duration: '4 години'
    },
    'course2-influence': {
        title: 'Вплив на середовище',
        description: 'Медитації та практики для набуття впливу на простір життя та оточення.',
        lessons: 4,
        duration: '6 годин'
    },
    'course2-exam': {
        title: 'Екзаменація',
        description: 'Вибудова профілю героя. Людини що активно діє у суспільстві як бізнесмен.',
        lessons: 4,
        duration: '8 годин'
    },
};

export const Training: React.FC = () => {
    const location = useLocation();
    const { t } = useLanguage();
    const [activeCourse, setActiveCourse] = useState<number>(1);
    const [activeTab1, setActiveTab1] = useState('archetypes');
    const [activeTab2, setActiveTab2] = useState('space');
    const [mandalaAnimated, setMandalaAnimated] = useState(false);
    const [showProgram, setShowProgram] = useState(false);
    const [programTab, setProgramTab] = useState<'overview' | 'progress'>('overview');
    const [userProgress, setUserProgress] = useState<UserProgress>(getDemoProgress);

    // Check if module is unlocked
    const isModuleUnlocked = (courseId: string, moduleId: string): boolean => {
        // First module of first course is always unlocked
        if (courseId === 'course1' && moduleId === 'archetypes') return true;
        
        // Check if course is purchased
        if (!userProgress.purchasedCourses.includes(courseId)) return false;
        
        // Define module order for each course
        const course1Modules = ['archetypes', 'meditation', 'exam'];
        const course2Modules = ['space', 'heroes', 'weight', 'influence', 'exam'];
        
        const modules = courseId === 'course1' ? course1Modules : course2Modules;
        const moduleIndex = modules.indexOf(moduleId);
        
        // First module of course - check if previous course is 100% complete
        if (moduleIndex === 0) {
            if (courseId === 'course1') return true;
            const prevCourseId = `course${parseInt(courseId.replace('course', '')) - 1}`;
            return calculateCourseProgress(userProgress.courses[prevCourseId]) >= 100;
        }
        
        // Check if previous module is 100% complete
        const prevModuleId = modules[moduleIndex - 1];
        const prevModuleProgress = calculateModuleProgress(userProgress.courses[courseId]?.[prevModuleId]);
        return prevModuleProgress >= 100;
    };

    // Check if course is unlocked
    const isCourseUnlocked = (courseId: string): boolean => {
        if (courseId === 'course1') return true;
        if (!userProgress.purchasedCourses.includes(courseId)) return false;
        
        const courseNum = parseInt(courseId.replace('course', ''));
        const prevCourseId = `course${courseNum - 1}`;
        return calculateCourseProgress(userProgress.courses[prevCourseId]) >= 100;
    };

    // Check if course is purchased
    const isCoursePurchased = (courseId: string): boolean => {
        return userProgress.purchasedCourses.includes(courseId);
    };

    // Determine active course from URL
    useEffect(() => {
        const path = location.pathname;
        // Scroll to top on navigation
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Check if showing full program
        if (path.includes('/map') || path.includes('/program')) {
            setShowProgram(true);
            return;
        } else {
            setShowProgram(false);
        }
        
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
                                <div className="rounded-xl overflow-hidden shadow-md mb-4 card-img-hover">
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
                                <div className="rounded-xl overflow-hidden shadow-md mb-4 bg-gradient-to-br from-indigo-100 to-fuchsia-100 dark:from-slate-800 dark:to-indigo-900 p-8 card-img-hover">
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
                                <div className="rounded-xl overflow-hidden shadow-md mb-4 card-img-hover">
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
                                <div className="rounded-2xl overflow-hidden shadow-xl mb-4 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-800 dark:to-amber-900/30 card-img-hover">
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
                                <div className="rounded-2xl overflow-hidden shadow-xl mb-4 card-img-hover">
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
                                <div className="rounded-2xl overflow-hidden shadow-xl mb-4 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-slate-800 dark:to-orange-900/30 p-8 card-img-hover">
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
                                <div className="rounded-2xl overflow-hidden shadow-xl mb-4 card-img-hover">
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
                                <div className="rounded-2xl overflow-hidden shadow-xl mb-4 card-img-hover">
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

    // Render Full Program - Дерево розвитку з геймифікацією
    const renderProgram = () => {
        // Get lesson progress
        const getLessonProgress = (courseId: string, moduleId: string, lessonId: string): number => {
            return userProgress.courses[courseId]?.[moduleId]?.[lessonId]?.progress || 0;
        };

        // Check if lesson is completed
        const isLessonCompleted = (courseId: string, moduleId: string, lessonId: string): boolean => {
            return userProgress.courses[courseId]?.[moduleId]?.[lessonId]?.completed || false;
        };

        // Skill Tree Node Component with progress and tooltip
        const SkillNode: React.FC<{ 
            label: string; 
            path: string; 
            colorClass: string;
            courseId: string;
            moduleId: string;
            lessonId: string;
            delay?: number;
        }> = ({ label, path, colorClass, courseId, moduleId, lessonId, delay = 0 }) => {
            const [showTooltip, setShowTooltip] = useState(false);
            const progress = getLessonProgress(courseId, moduleId, lessonId);
            const completed = isLessonCompleted(courseId, moduleId, lessonId);
            const unlocked = isModuleUnlocked(courseId, moduleId);
            
            // Get description for this lesson
            const descKey = `${courseId}-${moduleId}-${lessonId}`;
            const desc = lessonDescriptions[descKey];
            
            if (!unlocked) {
                return (
                    <div 
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-medium opacity-60 cursor-not-allowed"
                    >
                        <Lock size={12} className="flex-shrink-0" />
                        <span className="text-[10px] md:text-xs leading-tight line-through">{label}</span>
                    </div>
                );
            }
            
            return (
                <div 
                    className="relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <Link
                        to={path}
                        className={`group flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all hover:shadow-md hover:scale-[1.02] relative overflow-hidden
                            ${completed 
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400' 
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                            }`}
                    >
                        {/* Progress bar background */}
                        {progress > 0 && progress < 100 && (
                            <div 
                                className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        )}
                        <div className="relative flex items-center gap-2 z-10">
                            {completed ? (
                                <Check size={12} className="text-green-500 flex-shrink-0" />
                            ) : (
                                <ChevronRight size={12} className={`${colorClass} flex-shrink-0`} />
                            )}
                            <span className="text-[10px] md:text-xs leading-tight">{label}</span>
                            {progress > 0 && progress < 100 && (
                                <span className="text-[9px] text-indigo-500 font-bold ml-auto">{progress}%</span>
                            )}
                        </div>
                    </Link>
                    
                    {/* Tooltip */}
                    {showTooltip && desc && (
                        <div 
                            className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 w-64 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl animate-fade-in"
                            style={{ 
                                boxShadow: '0 8px 32px rgba(129, 140, 248, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            {/* Arrow */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white dark:border-r-slate-800" />
                            
                            <h5 className="font-bold text-sm text-slate-800 dark:text-white mb-2">{desc.title}</h5>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">{desc.description}</p>
                            
                            <div className="flex items-center gap-4 text-[10px] text-slate-500 dark:text-slate-400">
                                {desc.duration && (
                                    <span className="flex items-center gap-1">
                                        <Clock size={10} className="text-indigo-500" />
                                        {desc.duration}
                                    </span>
                                )}
                                {desc.lessons && (
                                    <span className="flex items-center gap-1">
                                        <Sparkles size={10} className="text-fuchsia-500" />
                                        {desc.lessons} {desc.lessons === 1 ? 'урок' : desc.lessons < 5 ? 'уроки' : 'уроків'}
                                    </span>
                                )}
                            </div>
                            
                            {/* Progress in tooltip */}
                            {progress > 0 && (
                                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] text-slate-500">Прогрес</span>
                                        <span className={`text-[10px] font-bold ${completed ? 'text-green-500' : 'text-indigo-500'}`}>
                                            {completed ? '✓ Завершено' : `${progress}%`}
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full transition-all ${completed ? 'bg-green-500' : 'bg-indigo-500'}`}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        };

        // Module Block with progress and tooltip
        const ModuleBlock: React.FC<{
            title: string;
            subtitle?: string;
            courseId: string;
            moduleId: string;
            colorClass: string;
            bgClass: string;
            borderClass: string;
            shadowColor: string;
            children: React.ReactNode;
        }> = ({ title, subtitle, courseId, moduleId, colorClass, bgClass, borderClass, shadowColor, children }) => {
            const [showTooltip, setShowTooltip] = useState(false);
            const unlocked = isModuleUnlocked(courseId, moduleId);
            const moduleProgress = calculateModuleProgress(userProgress.courses[courseId]?.[moduleId]);
            const descKey = `${courseId}-${moduleId}`;
            const desc = moduleDescriptions[descKey];
            
            return (
                <div 
                    className="relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <div 
                        className={`rounded-2xl p-4 border relative overflow-hidden transition-all ${bgClass} ${borderClass} ${!unlocked ? 'opacity-50' : ''}`}
                        style={{ boxShadow: `0 4px 20px ${shadowColor}` }}
                    >
                        {/* Lock overlay */}
                        {!unlocked && (
                            <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/40 backdrop-blur-[1px] z-20 flex items-center justify-center">
                                <div className="bg-white dark:bg-slate-800 rounded-full p-3 shadow-lg">
                                    <Lock size={20} className="text-slate-400" />
                                </div>
                            </div>
                        )}
                        
                        {/* Progress indicator */}
                        {unlocked && moduleProgress > 0 && (
                            <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 rounded-full px-2 py-1 z-10">
                                <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all ${moduleProgress >= 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
                                        style={{ width: `${moduleProgress}%` }}
                                    />
                                </div>
                                <span className={`text-[9px] font-bold ${moduleProgress >= 100 ? 'text-green-500' : 'text-indigo-500'}`}>
                                    {moduleProgress}%
                                </span>
                            </div>
                        )}
                        
                        <h4 className={`text-xs font-bold ${colorClass} mb-1 uppercase tracking-wider`}>{title}</h4>
                        {subtitle && <p className="text-[10px] text-slate-500 mb-3">{subtitle}</p>}
                        <div className="space-y-2">
                            {children}
                        </div>
                    </div>
                    
                    {/* Module Tooltip */}
                    {showTooltip && desc && unlocked && (
                        <div 
                            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-50 w-72 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl animate-fade-in pointer-events-none"
                            style={{ 
                                boxShadow: '0 8px 32px rgba(129, 140, 248, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            {/* Arrow */}
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white dark:border-t-slate-800" />
                            
                            <h5 className="font-bold text-sm text-slate-800 dark:text-white mb-2">{desc.title}</h5>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">{desc.description}</p>
                            
                            <div className="flex items-center gap-4 text-[10px] text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-1">
                                    <Clock size={10} className="text-indigo-500" />
                                    {desc.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Sparkles size={10} className="text-fuchsia-500" />
                                    {desc.lessons} уроків
                                </span>
                            </div>
                            
                            {/* Progress in tooltip */}
                            {moduleProgress > 0 && (
                                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] text-slate-500">Прогрес модуля</span>
                                        <span className={`text-[10px] font-bold ${moduleProgress >= 100 ? 'text-green-500' : 'text-indigo-500'}`}>
                                            {moduleProgress >= 100 ? '✓ Завершено' : `${moduleProgress}%`}
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full transition-all ${moduleProgress >= 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
                                            style={{ width: `${moduleProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        };

        // Course Header with progress and tooltip
        const CourseHeader: React.FC<{
            number: number;
            title: string;
            subtitle: string;
            courseId: string;
            gradient: string;
            textColor: string;
            shadowColor: string;
            purchased?: boolean;
        }> = ({ number, title, subtitle, courseId, gradient, textColor, shadowColor, purchased = true }) => {
            const [showTooltip, setShowTooltip] = useState(false);
            const unlocked = isCourseUnlocked(courseId);
            const courseProgress = calculateCourseProgress(userProgress.courses[courseId]);
            const isPurchased = isCoursePurchased(courseId);
            const desc = courseDescriptions[courseId];
            
            return (
                <div 
                    className="relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <div 
                        className={`relative rounded-2xl p-4 md:p-6 text-white text-center cursor-pointer ${gradient} ${!unlocked || !isPurchased ? 'opacity-60' : ''}`}
                        style={{ boxShadow: `0 8px 32px ${shadowColor}` }}
                    >
                        {/* Lock/Purchase overlay */}
                        {(!unlocked || !isPurchased) && (
                            <div className="absolute inset-0 rounded-2xl bg-slate-900/30 backdrop-blur-[2px] z-10 flex items-center justify-center">
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xl text-center">
                                    <Lock size={24} className="text-slate-400 mx-auto mb-2" />
                                    <p className="text-slate-600 dark:text-slate-400 text-xs font-medium">
                                        {!isPurchased ? 'Курс не придбано' : 'Завершіть попередній курс'}
                                    </p>
                                </div>
                            </div>
                        )}
                        
                        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-sm font-bold shadow-lg ${textColor}`}>
                            {courseProgress >= 100 ? <Check size={16} className="text-green-500" /> : number}
                        </div>
                        
                        {/* Progress ring */}
                        {unlocked && isPurchased && courseProgress > 0 && (
                            <div className="absolute top-2 right-2 flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
                                <div className="w-16 h-2 bg-white/30 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all ${courseProgress >= 100 ? 'bg-green-400' : 'bg-white'}`}
                                        style={{ width: `${courseProgress}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold">{courseProgress}%</span>
                            </div>
                        )}
                        
                        <h3 className="text-sm md:text-lg font-bold mt-2">{title}</h3>
                        <p className="text-xs md:text-sm opacity-90">{subtitle}</p>
                    </div>
                    
                    {/* Course Tooltip */}
                    {showTooltip && desc && (
                        <div 
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50 w-80 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl animate-fade-in"
                            style={{ 
                                boxShadow: '0 12px 48px rgba(129, 140, 248, 0.25), 0 8px 24px rgba(0, 0, 0, 0.15)'
                            }}
                        >
                            {/* Arrow */}
                            <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white dark:border-b-slate-800" />
                            
                            <h5 className="font-bold text-base text-slate-800 dark:text-white mb-2">{desc.title}</h5>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{desc.description}</p>
                            
                            {/* Stats */}
                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                                <span className="flex items-center gap-1">
                                    <Clock size={12} className="text-indigo-500" />
                                    {desc.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Sparkles size={12} className="text-fuchsia-500" />
                                    {desc.modules} модулів
                                </span>
                            </div>
                            
                            {/* Features */}
                            <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Що ви вивчите:</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {desc.features.map((feature, i) => (
                                        <span 
                                            key={i}
                                            className="px-2 py-1 text-[10px] font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Progress in tooltip */}
                            {courseProgress > 0 && (
                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-slate-500">Ваш прогрес</span>
                                        <span className={`text-xs font-bold ${courseProgress >= 100 ? 'text-green-500' : 'text-indigo-500'}`}>
                                            {courseProgress >= 100 ? '✓ Завершено' : `${courseProgress}%`}
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full transition-all ${courseProgress >= 100 ? 'bg-green-500' : 'bg-gradient-to-r from-indigo-500 to-fuchsia-500'}`}
                                            style={{ width: `${courseProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        };

        // Connector Line Component
        const TreeConnector: React.FC<{ height?: string; colorClass?: string }> = ({ height = '2rem', colorClass = 'from-indigo-300 to-indigo-400' }) => (
            <div className="flex justify-center">
                <div 
                    className={`w-1 bg-gradient-to-b ${colorClass} dark:opacity-60 rounded-full`}
                    style={{ height }}
                />
            </div>
        );

        // Checkpoint Node with completion status
        const Checkpoint: React.FC<{ 
            label: string; 
            colorClass: string; 
            bgClass: string; 
            courseId: string;
            delay?: number;
        }> = ({ label, colorClass, bgClass, courseId, delay = 0 }) => {
            const courseProgress = calculateCourseProgress(userProgress.courses[courseId]);
            const completed = courseProgress >= 100;
            
            return (
                <div 
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full ${completed ? 'bg-green-100 dark:bg-green-900/30' : bgClass}`}
                >
                    {completed ? (
                        <Check size={14} className="text-green-500" />
                    ) : (
                        <Sparkles size={14} className={colorClass} />
                    )}
                    <span className={`text-xs font-bold uppercase tracking-wider ${completed ? 'text-green-600 dark:text-green-400' : colorClass}`}>
                        {completed ? '✓ ' : ''}{label}
                    </span>
                    {!completed && courseProgress > 0 && (
                        <span className="text-[10px] text-slate-500">({courseProgress}%)</span>
                    )}
                </div>
            );
        };

        return (
            <div className="animate-fade-in pb-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">
                        <span className="text-indigo-600 dark:text-indigo-400">ДЕРЕВО РОЗВИТКУ</span>
                        <span className="text-slate-400 mx-2">|</span>
                        <span>ШКОЛА АРХЕТИПІВ</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Ваш шлях від учня до майстра</p>
                </div>

                {/* Start Node */}
                <div className="flex justify-center mb-4">
                    <div className="px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full text-slate-600 dark:text-slate-300 font-bold text-sm uppercase tracking-wider shadow-lg animate-fade-in">🎯 Початок</div>
                </div>
                <TreeConnector height="1.5rem" colorClass="from-slate-300 to-indigo-400" />

            {/* Skill Tree */}
            <div className="max-w-5xl mx-auto">
                {/* Course 1 */}
                <CourseHeader
                    number={1}
                    title="1й КУРС | ІНІЦІАЦІЯ ЯКОСТЕЙ"
                    subtitle="ЗБІР ЦІЛІСНОСТІ"
                    courseId="course1"
                    gradient="bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                    textColor="text-indigo-600"
                    shadowColor="rgba(129, 140, 248, 0.3)"
                />
                <TreeConnector height="1.5rem" colorClass="from-indigo-400 to-indigo-500" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <ModuleBlock
                        title="ЗНАЙОМСТВО З АРХЕТИПАМИ"
                        subtitle="Теоретичний модуль"
                        courseId="course1"
                        moduleId="archetypes"
                        colorClass="text-indigo-600 dark:text-indigo-400"
                        bgClass="bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-900 dark:to-indigo-950/20"
                        borderClass="border-indigo-100 dark:border-indigo-900/30"
                        shadowColor="rgba(129, 140, 248, 0.1)"
                    >
                        <SkillNode label="СКОРПІОН, ТЕЛЕЦЬ ТА ДІВА" path="/training/course1/scorpio" colorClass="text-indigo-500" courseId="course1" moduleId="archetypes" lessonId="scorpio" />
                        <SkillNode label="ОВЕН, КОЗЕРІГ ТА БЛИЗНЮКИ" path="/training/course1/aries" colorClass="text-indigo-500" courseId="course1" moduleId="archetypes" lessonId="aries" />
                        <SkillNode label="СТРІЛЕЦЬ, ЛЕВ ТА РИБИ" path="/training/course1/sagittarius" colorClass="text-indigo-500" courseId="course1" moduleId="archetypes" lessonId="sagittarius" />
                        <SkillNode label="ВОДОЛІЙ, ТЕРЕЗИ ТА РАК" path="/training/course1/aquarius" colorClass="text-indigo-500" courseId="course1" moduleId="archetypes" lessonId="aquarius" />
                    </ModuleBlock>
                    <ModuleBlock
                        title="МЕДИТАЦІЇ ІНІЦІАЦІЇ"
                        subtitle="Практичний модуль"
                        courseId="course1"
                        moduleId="meditation"
                        colorClass="text-fuchsia-600 dark:text-fuchsia-400"
                        bgClass="bg-gradient-to-br from-white to-fuchsia-50/50 dark:from-slate-900 dark:to-fuchsia-950/20"
                        borderClass="border-fuchsia-100 dark:border-fuchsia-900/30"
                        shadowColor="rgba(192, 132, 252, 0.1)"
                    >
                        <SkillNode label="ІНІЦІАЦІЯ СИСТЕМИ ЛІБІДО" path="/training/course1/libido" colorClass="text-fuchsia-500" courseId="course1" moduleId="meditation" lessonId="libido" />
                        <SkillNode label="ІНІЦІАЦІЯ СИСТЕМИ ПОЧУТТІВ" path="/training/course1/feelings" colorClass="text-fuchsia-500" courseId="course1" moduleId="meditation" lessonId="feelings" />
                        <SkillNode label="ІНІЦІАЦІЯ СИСТЕМИ РОЗУМУ" path="/training/course1/mind" colorClass="text-fuchsia-500" courseId="course1" moduleId="meditation" lessonId="mind" />
                        <SkillNode label="ІНІЦІАЦІЯ СИСТЕМИ УВАГИ" path="/training/course1/attention" colorClass="text-fuchsia-500" courseId="course1" moduleId="meditation" lessonId="attention" />
                    </ModuleBlock>
                    <ModuleBlock
                        title="ЕКЗАМЕНАЦІЯ"
                        subtitle="Архетип сім'ї"
                        courseId="course1"
                        moduleId="exam"
                        colorClass="text-violet-600 dark:text-violet-400"
                        bgClass="bg-gradient-to-br from-white to-violet-50/50 dark:from-slate-900 dark:to-violet-950/20"
                        borderClass="border-violet-100 dark:border-violet-900/30"
                        shadowColor="rgba(139, 92, 246, 0.1)"
                    >
                        <SkillNode label="ПОТРЕБИ ТА БАЖАННЯ ПАРТНЕРІВ" path="/training/course1/exam/needs" colorClass="text-violet-500" courseId="course1" moduleId="exam" lessonId="needs" />
                        <SkillNode label="ОБМІН МІЖ ПАРТНЕРАМИ" path="/training/course1/exam/exchange" colorClass="text-violet-500" courseId="course1" moduleId="exam" lessonId="exchange" />
                        <SkillNode label="ПРАВИЛА ПОБУТУ ПАРТНЕРІВ" path="/training/course1/exam/rules" colorClass="text-violet-500" courseId="course1" moduleId="exam" lessonId="rules" />
                        <SkillNode label="СУСПІЛЬНА РЕАКЦІЯ" path="/training/course1/exam/society" colorClass="text-violet-500" courseId="course1" moduleId="exam" lessonId="society" />
                        <SkillNode label="АРХЕТИП СІМ'Ї" path="/training/course1/exam/family" colorClass="text-violet-500" courseId="course1" moduleId="exam" lessonId="family" />
                    </ModuleBlock>
                </div>
                <div className="flex justify-center"><Checkpoint label="Залік 1 курсу" colorClass="text-indigo-600 dark:text-indigo-400" bgClass="bg-indigo-100 dark:bg-indigo-900/30" courseId="course1" /></div>
                <TreeConnector height="2rem" colorClass="from-indigo-400 to-amber-400" />

                {/* Course 2 */}
                <CourseHeader
                    number={2}
                    title="2й КУРС | ПРАКТИКА ГЕРОЯ"
                    subtitle="ПРАКТИКА АРХЕТИПІВ У СУСПІЛЬСТВІ"
                    courseId="course2"
                    gradient="bg-gradient-to-r from-amber-500 to-orange-500"
                    textColor="text-amber-600"
                    shadowColor="rgba(245, 158, 11, 0.3)"
                />
                <TreeConnector height="1.5rem" colorClass="from-amber-400 to-amber-500" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <ModuleBlock
                        title="ПРОСТІР ПОДВИГІВ"
                        courseId="course2"
                        moduleId="space"
                        colorClass="text-amber-600 dark:text-amber-400"
                        bgClass="bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-amber-950/20"
                        borderClass="border-amber-100 dark:border-amber-900/30"
                        shadowColor="rgba(245, 158, 11, 0.1)"
                    >
                        <SkillNode label="СКОРПІОН, ТЕЛЕЦЬ ТА ДІВА" path="/training/course2/space/scorpio" colorClass="text-amber-500" courseId="course2" moduleId="space" lessonId="scorpio" />
                        <SkillNode label="ОВЕН, КОЗЕРІГ ТА БЛИЗНЮКИ" path="/training/course2/space/aries" colorClass="text-amber-500" courseId="course2" moduleId="space" lessonId="aries" />
                        <SkillNode label="СТРІЛЕЦЬ, ЛЕВ ТА РИБИ" path="/training/course2/space/sagittarius" colorClass="text-amber-500" courseId="course2" moduleId="space" lessonId="sagittarius" />
                        <SkillNode label="ВОДОЛІЙ, ТЕРЕЗИ ТА РАК" path="/training/course2/space/aquarius" colorClass="text-amber-500" courseId="course2" moduleId="space" lessonId="aquarius" />
                    </ModuleBlock>
                    <ModuleBlock
                        title="ГЕРОЇ ТА ЇХ СИЛА"
                        courseId="course2"
                        moduleId="heroes"
                        colorClass="text-orange-600 dark:text-orange-400"
                        bgClass="bg-gradient-to-br from-white to-orange-50/50 dark:from-slate-900 dark:to-orange-950/20"
                        borderClass="border-orange-100 dark:border-orange-900/30"
                        shadowColor="rgba(249, 115, 22, 0.1)"
                    >
                        <SkillNode label="СКОРПІОН, ТЕЛЕЦЬ ТА ДІВА" path="/training/course2/heroes/scorpio" colorClass="text-orange-500" courseId="course2" moduleId="heroes" lessonId="scorpio" />
                        <SkillNode label="ОВЕН, КОЗЕРІГ ТА БЛИЗНЮКИ" path="/training/course2/heroes/aries" colorClass="text-orange-500" courseId="course2" moduleId="heroes" lessonId="aries" />
                        <SkillNode label="СТРІЛЕЦЬ, ЛЕВ ТА РИБИ" path="/training/course2/heroes/sagittarius" colorClass="text-orange-500" courseId="course2" moduleId="heroes" lessonId="sagittarius" />
                        <SkillNode label="ВОДОЛІЙ, ТЕРЕЗИ ТА РАК" path="/training/course2/heroes/aquarius" colorClass="text-orange-500" courseId="course2" moduleId="heroes" lessonId="aquarius" />
                    </ModuleBlock>
                    <ModuleBlock
                        title="ВЛАСНА ВАГА"
                        courseId="course2"
                        moduleId="weight"
                        colorClass="text-amber-600 dark:text-amber-400"
                        bgClass="bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-amber-950/20"
                        borderClass="border-amber-100 dark:border-amber-900/30"
                        shadowColor="rgba(245, 158, 11, 0.1)"
                    >
                        <SkillNode label="СКОРПІОН, ТЕЛЕЦЬ ТА ДІВА" path="/training/course2/weight/scorpio" colorClass="text-amber-500" courseId="course2" moduleId="weight" lessonId="scorpio" />
                        <SkillNode label="ОВЕН, КОЗЕРІГ ТА БЛИЗНЮКИ" path="/training/course2/weight/aries" colorClass="text-amber-500" courseId="course2" moduleId="weight" lessonId="aries" />
                        <SkillNode label="СТРІЛЕЦЬ, ЛЕВ ТА РИБИ" path="/training/course2/weight/sagittarius" colorClass="text-amber-500" courseId="course2" moduleId="weight" lessonId="sagittarius" />
                        <SkillNode label="ВОДОЛІЙ, ТЕРЕЗИ ТА РАК" path="/training/course2/weight/aquarius" colorClass="text-amber-500" courseId="course2" moduleId="weight" lessonId="aquarius" />
                    </ModuleBlock>
                    <ModuleBlock
                        title="ВПЛИВ НА СЕРЕДОВИЩЕ"
                        courseId="course2"
                        moduleId="influence"
                        colorClass="text-orange-600 dark:text-orange-400"
                        bgClass="bg-gradient-to-br from-white to-orange-50/50 dark:from-slate-900 dark:to-orange-950/20"
                        borderClass="border-orange-100 dark:border-orange-900/30"
                        shadowColor="rgba(249, 115, 22, 0.1)"
                    >
                        <SkillNode label="СКОРПІОН, ТЕЛЕЦЬ ТА ДІВА" path="/training/course2/influence/scorpio" colorClass="text-orange-500" courseId="course2" moduleId="influence" lessonId="scorpio" />
                        <SkillNode label="ОВЕН, КОЗЕРІГ ТА БЛИЗНЮКИ" path="/training/course2/influence/aries" colorClass="text-orange-500" courseId="course2" moduleId="influence" lessonId="aries" />
                        <SkillNode label="СТРІЛЕЦЬ, ЛЕВ ТА РИБИ" path="/training/course2/influence/sagittarius" colorClass="text-orange-500" courseId="course2" moduleId="influence" lessonId="sagittarius" />
                        <SkillNode label="ВОДОЛІЙ, ТЕРЕЗИ ТА РАК" path="/training/course2/influence/aquarius" colorClass="text-orange-500" courseId="course2" moduleId="influence" lessonId="aquarius" />
                    </ModuleBlock>
                </div>
                <TreeConnector height="1rem" colorClass="from-amber-400 to-amber-500" />
                <div className="flex justify-center mb-4">
                    <div className="w-full max-w-sm">
                        <ModuleBlock
                            title="ЕКЗАМЕНАЦІЯ"
                            courseId="course2"
                            moduleId="exam"
                            colorClass="text-amber-600 dark:text-amber-400"
                            bgClass="bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-amber-950/20"
                            borderClass="border-amber-100 dark:border-amber-900/30"
                            shadowColor="rgba(245, 158, 11, 0.1)"
                        >
                            <SkillNode label="СКОРПІОН, ТЕЛЕЦЬ ТА ДІВА" path="/training/course2/exam/scorpio" colorClass="text-amber-500" courseId="course2" moduleId="exam" lessonId="scorpio" />
                            <SkillNode label="ОВЕН, КОЗЕРІГ ТА БЛИЗНЮКИ" path="/training/course2/exam/aries" colorClass="text-amber-500" courseId="course2" moduleId="exam" lessonId="aries" />
                            <SkillNode label="СТРІЛЕЦЬ, ЛЕВ ТА РИБИ" path="/training/course2/exam/sagittarius" colorClass="text-amber-500" courseId="course2" moduleId="exam" lessonId="sagittarius" />
                            <SkillNode label="ВОДОЛІЙ, ТЕРЕЗИ ТА РАК" path="/training/course2/exam/aquarius" colorClass="text-amber-500" courseId="course2" moduleId="exam" lessonId="aquarius" />
                        </ModuleBlock>
                    </div>
                </div>
                <div className="flex justify-center"><Checkpoint label="Залік 2 курсу" colorClass="text-amber-600 dark:text-amber-400" bgClass="bg-amber-100 dark:bg-amber-900/30" courseId="course2" /></div>
                <TreeConnector height="2rem" colorClass="from-amber-400 to-emerald-400" />

                {/* Course 3 - Coming Soon */}
                <CourseHeader
                    number={3}
                    title="3й КУРС | ЗВ'ЯЗОК ІЗ СТИХІЯМИ"
                    subtitle="НЕЗАБАРОМ"
                    courseId="course3"
                    gradient="bg-gradient-to-r from-emerald-500 to-teal-500"
                    textColor="text-emerald-600"
                    shadowColor="rgba(16, 185, 129, 0.3)"
                />
                <TreeConnector height="2rem" colorClass="from-emerald-400 to-violet-400" />

                {/* Course 4 - Coming Soon */}
                <CourseHeader
                    number={4}
                    title="4й КУРС | ПРОБУДЖЕННЯ БЕЗДОГАННИХ СИЛ"
                    subtitle="НЕЗАБАРОМ"
                    courseId="course4"
                    gradient="bg-gradient-to-r from-violet-500 to-purple-500"
                    textColor="text-violet-600"
                    shadowColor="rgba(139, 92, 246, 0.3)"
                />
                <TreeConnector height="1.5rem" colorClass="from-violet-400 to-fuchsia-400" />

                {/* Final Node */}
                <div className="flex justify-center">
                    <div className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-violet-500 rounded-full text-white font-bold text-sm uppercase tracking-wider shadow-xl" style={{ boxShadow: '0 8px 32px rgba(129, 140, 248, 0.4)' }}>🏆 Майстер Архетипів</div>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-r from-indigo-50 to-fuchsia-50 dark:from-slate-800 dark:to-indigo-900/30 rounded-[2rem] p-8 text-center max-w-2xl mx-auto" style={{ boxShadow: '0 8px 32px rgba(129, 140, 248, 0.1)' }}>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Готові почати навчання?</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">Зв'яжіться з майстром для отримання доступу до курсів.</p>
                <a href="https://t.me/dobrevk" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold rounded-full shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all uppercase tracking-wider text-sm">Написати майстру</a>
            </div>
        </div>
        );
    };

    // Main render
    return (
        <div className="min-h-screen pt-20 pb-8 px-4 md:px-8 lg:pr-24">
            {/* Mobile Course Navigation - показується на мобільних */}
            {(
                <div className="lg:hidden flex flex-wrap justify-center gap-2 mb-6 sticky top-20 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-3 -mx-4 px-4 border-b border-slate-100 dark:border-slate-800">
                    {[1, 2, 3, 4].map((num) => (
                        <Link
                            key={num}
                            to={`/training/year-${num}`}
                            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 font-bold text-xs transition-all
                                ${activeCourse === num && !showProgram
                                    ? 'bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg' 
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                                }`}
                        >
                            <span>{num}</span>
                            <span className="uppercase tracking-wider">курс</span>
                        </Link>
                    ))}
                    <Link
                        to="/training/map"
                        className={`px-3 py-2 rounded-xl flex items-center gap-1.5 font-bold text-xs transition-all
                            ${showProgram
                                ? 'bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                            }`}
                    >
                        Програма
                    </Link>
                </div>
            )}

            {/* Fixed Right Sidebar - Course Navigation - на десктопі */}
            {(
                <div 
                    className="fixed right-4 top-24 z-40 hidden lg:flex flex-col gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-white/50 dark:border-slate-700/50" 
                    style={{ 
                        width: 'calc(var(--vw-unit) * 9)',
                        boxShadow: '0 8px 32px rgba(129, 140, 248, 0.15), 0 4px 16px rgba(192, 132, 252, 0.1)'
                    }}
                >
                    {[1, 2, 3, 4].map((num) => (
                        <Link
                            key={num}
                            to={`/training/year-${num}`}
                            className={`px-3 py-2 rounded-xl flex items-center gap-2 font-bold transition-all duration-300
                                ${activeCourse === num && !showProgram
                                    ? 'bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white scale-105' 
                                    : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105'
                                }`}
                            style={{ 
                                boxShadow: activeCourse === num && !showProgram ? '0 4px 20px rgba(129, 140, 248, 0.4)' : 'none',
                                fontSize: 'var(--text-sm)'
                            }}
                        >
                            <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center" style={{ fontSize: 'var(--text-xs)' }}>{num}</span>
                            <span className="uppercase tracking-wider" style={{ fontSize: 'var(--text-xs)' }}>курс</span>
                        </Link>
                    ))}
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-indigo-200 dark:via-slate-600 to-transparent my-1"></div>
                    <Link
                        to="/training/map"
                        className={`px-3 py-2 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-bold uppercase tracking-wider
                            ${showProgram
                                ? 'bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white scale-105' 
                                : 'bg-white/60 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105'
                            }`}
                        title="Повна програма"
                        style={{ 
                            fontSize: 'var(--text-xs)',
                            boxShadow: showProgram ? '0 4px 20px rgba(129, 140, 248, 0.4)' : 'none'
                        }}
                    >
                        Програма
                    </Link>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                {/* Course Content */}
                {showProgram ? renderProgram() : (
                    <>
                        {activeCourse === 1 && renderCourse1()}
                        {activeCourse === 2 && renderCourse2()}
                        {activeCourse === 3 && renderCourse3()}
                        {activeCourse === 4 && renderCourse4()}
                    </>
                )}
            </div>
        </div>
    );
};
