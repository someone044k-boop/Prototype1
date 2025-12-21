import React, { useState, useEffect } from 'react';
import { 
    User, BookOpen, Bell, MessageCircle, Sparkles, Send, 
    ShoppingBag, Users, Settings, LogOut, ChevronRight,
    Calendar, Clock, CheckCircle, AlertCircle, Lock, Check
} from 'lucide-react';
import { useAuth, hasPermission, UserRole } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

// Progress tracking interfaces (same as Training.tsx)
interface LessonProgress {
    completed: boolean;
    progress: number;
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
    purchasedCourses: string[];
}

// Get progress from localStorage
const getTrainingProgress = (): UserProgress => {
    const saved = localStorage.getItem('trainingProgress');
    if (saved) {
        return JSON.parse(saved);
    }
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
                space: { scorpio: { completed: false, progress: 0 }, aries: { completed: false, progress: 0 }, sagittarius: { completed: false, progress: 0 }, aquarius: { completed: false, progress: 0 } },
                heroes: { scorpio: { completed: false, progress: 0 }, aries: { completed: false, progress: 0 }, sagittarius: { completed: false, progress: 0 }, aquarius: { completed: false, progress: 0 } },
                weight: { scorpio: { completed: false, progress: 0 }, aries: { completed: false, progress: 0 }, sagittarius: { completed: false, progress: 0 }, aquarius: { completed: false, progress: 0 } },
                influence: { scorpio: { completed: false, progress: 0 }, aries: { completed: false, progress: 0 }, sagittarius: { completed: false, progress: 0 }, aquarius: { completed: false, progress: 0 } },
                exam: { scorpio: { completed: false, progress: 0 }, aries: { completed: false, progress: 0 }, sagittarius: { completed: false, progress: 0 }, aquarius: { completed: false, progress: 0 } },
            },
        },
        purchasedCourses: ['course1', 'course2', 'course3'],
    };
};

// Calculate module progress
const calculateModuleProgress = (module: ModuleProgress | undefined): number => {
    if (!module) return 0;
    const lessons = Object.values(module);
    if (lessons.length === 0) return 0;
    const totalProgress = lessons.reduce((sum, l) => sum + l.progress, 0);
    return Math.round(totalProgress / lessons.length);
};

// Calculate course progress
const calculateCourseProgress = (course: CourseProgress | undefined): number => {
    if (!course) return 0;
    const modules = Object.values(course);
    if (modules.length === 0) return 0;
    const totalProgress = modules.reduce((sum, m) => sum + calculateModuleProgress(m), 0);
    return Math.round(totalProgress / modules.length);
};

// Menu items based on permissions
const menuItems = [
    { id: 'courses', label: 'Мої курси', icon: BookOpen, permission: 'courses' },
    { id: 'notifications', label: 'Сповіщення', icon: Bell, permission: 'notifications', badge: 3 },
    { id: 'messages', label: 'Особисті повідомлення', icon: MessageCircle, permission: 'messages', badge: 1 },
    { id: 'myth', label: 'Персональний міф', icon: Sparkles, permission: 'myth' },
    { id: 'write_master', label: 'Написати майстру', icon: Send, permission: 'write_master' },
    { id: 'orders', label: 'Нові замовлення', icon: ShoppingBag, permission: 'orders', badge: 5 },
    { id: 'users', label: 'Користувачі', icon: Users, permission: 'users' },
    { id: 'settings', label: 'Налаштування', icon: Settings, permission: 'settings' },
];

// Role labels
const roleLabels: Record<UserRole, string> = {
    listener: 'Слухач',
    student: 'Студент',
    manager: 'Менеджер',
    admin: 'Адміністратор',
};

const roleColors: Record<UserRole, string> = {
    listener: 'bg-slate-500',
    student: 'bg-indigo-500',
    manager: 'bg-fuchsia-500',
    admin: 'bg-amber-500',
};

export const Dashboard: React.FC = () => {
    const { user, logout, isAuthenticated, login } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('courses');

    // Demo login handlers
    const demoLogin = async (role: UserRole) => {
        const emails: Record<UserRole, string> = {
            listener: 'listener@demo.com',
            student: 'student@demo.com',
            manager: 'manager@demo.com',
            admin: 'admin@demo.com',
        };
        await login(emails[role], 'demo');
    };

    // Redirect if not authenticated
    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: 'calc(var(--vw-unit) * 7)', paddingBottom: 'var(--space-2xl)', paddingLeft: 'var(--container-padding)', paddingRight: 'var(--container-padding)' }}>
                <div className="text-center max-w-md">
                    <h2 className="font-bold text-slate-800 dark:text-white" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)' }}>
                        Увійдіть до кабінету
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400" style={{ marginBottom: 'var(--space-xl)', fontSize: 'var(--text-base)' }}>
                        Для доступу до особистого кабінету необхідно авторизуватися
                    </p>
                    
                    {/* Demo Login Buttons */}
                    <div 
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg"
                      style={{ borderRadius: 'var(--radius-2xl)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}
                    >
                        <h3 className="font-bold text-slate-500 uppercase tracking-wider" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-lg)' }}>Демо-вхід для тестування</h3>
                        <div className="grid grid-cols-2" style={{ gap: 'var(--space-md)' }}>
                            <button
                                onClick={() => demoLogin('listener')}
                                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex flex-col items-center"
                                style={{ padding: 'var(--space-md) var(--space-lg)', borderRadius: 'var(--radius-lg)', gap: 'var(--space-xs)', fontSize: 'var(--text-sm)' }}
                            >
                                <span 
                                  className="rounded-full bg-slate-500 flex items-center justify-center text-white font-bold"
                                  style={{ width: 'calc(var(--vw-unit) * 2)', height: 'calc(var(--vw-unit) * 2)', fontSize: 'var(--text-xs)' }}
                                >С</span>
                                <span>Слухач</span>
                            </button>
                            <button
                                onClick={() => demoLogin('student')}
                                className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all flex flex-col items-center"
                                style={{ padding: 'var(--space-md) var(--space-lg)', borderRadius: 'var(--radius-lg)', gap: 'var(--space-xs)', fontSize: 'var(--text-sm)' }}
                            >
                                <span 
                                  className="rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold"
                                  style={{ width: 'calc(var(--vw-unit) * 2)', height: 'calc(var(--vw-unit) * 2)', fontSize: 'var(--text-xs)' }}
                                >С</span>
                                <span>Студент</span>
                            </button>
                            <button
                                onClick={() => demoLogin('manager')}
                                className="bg-fuchsia-50 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 font-medium hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/50 transition-all flex flex-col items-center"
                                style={{ padding: 'var(--space-md) var(--space-lg)', borderRadius: 'var(--radius-lg)', gap: 'var(--space-xs)', fontSize: 'var(--text-sm)' }}
                            >
                                <span 
                                  className="rounded-full bg-fuchsia-500 flex items-center justify-center text-white font-bold"
                                  style={{ width: 'calc(var(--vw-unit) * 2)', height: 'calc(var(--vw-unit) * 2)', fontSize: 'var(--text-xs)' }}
                                >М</span>
                                <span>Менеджер</span>
                            </button>
                            <button
                                onClick={() => demoLogin('admin')}
                                className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all flex flex-col items-center"
                                style={{ padding: 'var(--space-md) var(--space-lg)', borderRadius: 'var(--radius-lg)', gap: 'var(--space-xs)', fontSize: 'var(--text-sm)' }}
                            >
                                <span 
                                  className="rounded-full bg-amber-500 flex items-center justify-center text-white font-bold"
                                  style={{ width: 'calc(var(--vw-unit) * 2)', height: 'calc(var(--vw-unit) * 2)', fontSize: 'var(--text-xs)' }}
                                >А</span>
                                <span>Адмін</span>
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-full font-bold"
                        style={{ padding: 'var(--space-md) var(--space-xl)', fontSize: 'var(--text-sm)' }}
                    >
                        На головну
                    </button>
                </div>
            </div>
        );
    }

    const availableMenuItems = menuItems.filter(item => hasPermission(user.role, item.permission));

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen" style={{ paddingTop: 'calc(var(--vw-unit) * 7)', paddingBottom: 'var(--space-2xl)', paddingLeft: 'var(--container-padding)', paddingRight: 'var(--container-padding)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between" style={{ marginBottom: 'var(--space-xl)', gap: 'var(--space-lg)' }}>
                    <div className="flex items-center" style={{ gap: 'var(--space-lg)' }}>
                        <div 
                          className="rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg"
                          style={{ width: 'calc(var(--vw-unit) * 4)', height: 'calc(var(--vw-unit) * 4)', fontSize: 'var(--text-2xl)' }}
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="font-bold text-slate-800 dark:text-white" style={{ fontSize: 'var(--text-2xl)' }}>
                                {user.name}
                            </h1>
                            <div className="flex items-center" style={{ gap: 'var(--space-sm)', marginTop: 'var(--space-xs)' }}>
                                <span 
                                  className={`rounded-full font-bold uppercase tracking-wider text-white ${roleColors[user.role]}`}
                                  style={{ padding: 'var(--space-xs) var(--space-sm)', fontSize: 'var(--text-xs)' }}
                                >
                                    {roleLabels[user.role]}
                                </span>
                                <span className="text-slate-500" style={{ fontSize: 'var(--text-xs)' }}>{user.email}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors"
                        style={{ gap: 'var(--space-sm)', padding: 'var(--space-sm) var(--space-lg)', fontSize: 'var(--text-sm)' }}
                    >
                        <LogOut style={{ width: 'var(--size-icon-md)', height: 'var(--size-icon-md)' }} /> Вийти
                    </button>
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-[280px_1fr]" style={{ gap: 'var(--space-xl)' }}>
                    {/* Sidebar */}
                    <div className="lg:sticky lg:h-fit" style={{ top: 'calc(var(--vw-unit) * 7)' }}>
                        <nav 
                          className="bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800"
                          style={{ borderRadius: 'var(--radius-3xl)', padding: 'var(--space-lg)' }}
                        >
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                {availableMenuItems.map(item => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center justify-between font-medium transition-all
                                                ${activeTab === item.id
                                                    ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg'
                                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                }`}
                                            style={{ padding: 'var(--space-md) var(--space-lg)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)' }}
                                        >
                                            <span className="flex items-center" style={{ gap: 'var(--space-md)' }}>
                                                <item.icon style={{ width: 'var(--size-icon-md)', height: 'var(--size-icon-md)' }} />
                                                {item.label}
                                            </span>
                                            <span className="flex items-center" style={{ gap: 'var(--space-sm)' }}>
                                                {item.badge && (
                                                    <span 
                                                      className={`rounded-full font-bold ${activeTab === item.id ? 'bg-white/20 text-white' : 'bg-red-500 text-white'}`}
                                                      style={{ padding: 'var(--space-xs) var(--space-sm)', fontSize: 'var(--text-xs)' }}
                                                    >
                                                        {item.badge}
                                                    </span>
                                                )}
                                                <ChevronRight style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }} className={activeTab === item.id ? 'opacity-100' : 'opacity-0'} />
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                        {activeTab === 'courses' && <CoursesTab />}
                        {activeTab === 'notifications' && <NotificationsTab />}
                        {activeTab === 'messages' && <MessagesTab />}
                        {activeTab === 'myth' && <MythTab />}
                        {activeTab === 'write_master' && <WriteMasterTab />}
                        {activeTab === 'orders' && <OrdersTab />}
                        {activeTab === 'users' && <UsersTab />}
                        {activeTab === 'settings' && <SettingsTab />}
                    </div>
                </div>
            </div>
        </div>
    );
};


// Tab Components
const CoursesTab: React.FC = () => {
    const { user } = useAuth();
    const [progress, setProgress] = useState<UserProgress>(getTrainingProgress);

    // Reload progress on mount
    useEffect(() => {
        setProgress(getTrainingProgress());
    }, []);

    // Course info
    const coursesInfo = [
        { 
            id: 'course1', 
            title: '1й КУРС | ІНІЦІАЦІЯ ЯКОСТЕЙ', 
            subtitle: 'Знайомство з архетипами',
            color: 'indigo',
            modules: [
                { id: 'archetypes', name: 'Знайомство з архетипами', lessons: 4 },
                { id: 'meditation', name: 'Медитації ініціації', lessons: 4 },
                { id: 'exam', name: 'Екзаменація', lessons: 5 },
            ]
        },
        { 
            id: 'course2', 
            title: '2й КУРС | ПРАКТИКА ГЕРОЯ', 
            subtitle: 'Практика архетипів у суспільстві',
            color: 'amber',
            modules: [
                { id: 'space', name: 'Простір подвигів', lessons: 4 },
                { id: 'heroes', name: 'Герої та їх сила', lessons: 4 },
                { id: 'weight', name: 'Власна вага', lessons: 4 },
                { id: 'influence', name: 'Вплив на середовище', lessons: 4 },
                { id: 'exam', name: 'Екзаменація', lessons: 4 },
            ]
        },
        { 
            id: 'course3', 
            title: '3й КУРС | ЗВ\'ЯЗОК ІЗ СТИХІЯМИ', 
            subtitle: 'Поглиблена робота зі стихіями',
            color: 'emerald',
            modules: []
        },
        { 
            id: 'course4', 
            title: '4й КУРС | ПРОБУДЖЕННЯ БЕЗДОГАННИХ СИЛ', 
            subtitle: 'Майстерський рівень',
            color: 'violet',
            modules: []
        },
    ];

    const purchasedCourses = progress.purchasedCourses || [];
    const userCourses = coursesInfo.filter(c => purchasedCourses.includes(c.id) || user?.courses.includes(c.id));

    // Get color classes
    const getColorClasses = (color: string) => ({
        bg: `bg-${color}-500`,
        bgLight: `bg-${color}-50 dark:bg-${color}-900/20`,
        text: `text-${color}-600 dark:text-${color}-400`,
        border: `border-${color}-200 dark:border-${color}-800`,
        gradient: color === 'indigo' ? 'from-indigo-500 to-fuchsia-500' : 
                  color === 'amber' ? 'from-amber-500 to-orange-500' :
                  color === 'emerald' ? 'from-emerald-500 to-teal-500' :
                  'from-violet-500 to-purple-500'
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Мої курси</h2>
                <Link 
                    to="/training" 
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                    Всі курси →
                </Link>
            </div>
            
            {userCourses.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-100 dark:border-slate-800">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">У вас ще немає курсів</h3>
                    <p className="text-slate-500 mb-4">Придбайте курс, щоб почати навчання</p>
                    <Link to="/training" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-full font-bold">
                        Переглянути курси
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    {userCourses.map(course => {
                        const courseProgress = calculateCourseProgress(progress.courses[course.id]);
                        const colors = getColorClasses(course.color);
                        const isLocked = courseProgress === 0 && course.id !== 'course1';
                        
                        return (
                            <div 
                                key={course.id} 
                                className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden ${isLocked ? 'opacity-60' : ''}`}
                            >
                                {/* Course Header */}
                                <div className={`p-6 bg-gradient-to-r ${colors.gradient} text-white`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg">{course.title}</h3>
                                            <p className="text-white/80 text-sm">{course.subtitle}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold">{courseProgress}%</div>
                                            <div className="text-white/80 text-xs uppercase tracking-wider">Прогрес</div>
                                        </div>
                                    </div>
                                    {/* Progress Bar */}
                                    <div className="mt-4 w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-white rounded-full transition-all duration-500"
                                            style={{ width: `${courseProgress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Modules */}
                                {course.modules.length > 0 ? (
                                    <div className="p-4">
                                        <div className="grid gap-2">
                                            {course.modules.map((module, idx) => {
                                                const moduleProgress = calculateModuleProgress(progress.courses[course.id]?.[module.id]);
                                                const isModuleLocked = idx > 0 && calculateModuleProgress(progress.courses[course.id]?.[course.modules[idx - 1].id]) < 100;
                                                const isCompleted = moduleProgress === 100;
                                                
                                                return (
                                                    <div 
                                                        key={module.id}
                                                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                                                            isModuleLocked 
                                                                ? 'bg-slate-50 dark:bg-slate-800/50 opacity-50' 
                                                                : isCompleted
                                                                    ? 'bg-green-50 dark:bg-green-900/20'
                                                                    : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                        }`}
                                                    >
                                                        {/* Status Icon */}
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                            isModuleLocked 
                                                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                                                                : isCompleted
                                                                    ? 'bg-green-500 text-white'
                                                                    : `bg-${course.color}-100 dark:bg-${course.color}-900/30 text-${course.color}-600 dark:text-${course.color}-400`
                                                        }`}>
                                                            {isModuleLocked ? <Lock size={14} /> : isCompleted ? <Check size={14} /> : <span className="text-xs font-bold">{idx + 1}</span>}
                                                        </div>
                                                        
                                                        {/* Module Info */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between">
                                                                <span className={`font-medium text-sm ${isModuleLocked ? 'text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                                                                    {module.name}
                                                                </span>
                                                                <span className={`text-xs font-bold ${isCompleted ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                                                                    {moduleProgress}%
                                                                </span>
                                                            </div>
                                                            {/* Mini Progress Bar */}
                                                            <div className="mt-1 w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                                <div 
                                                                    className={`h-full rounded-full transition-all ${isCompleted ? 'bg-green-500' : `bg-${course.color}-500`}`}
                                                                    style={{ width: `${moduleProgress}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        
                                        {/* Continue Button */}
                                        <Link 
                                            to="/training"
                                            className={`mt-4 w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all bg-gradient-to-r ${colors.gradient} text-white hover:shadow-lg`}
                                        >
                                            {courseProgress === 0 ? 'Почати навчання' : courseProgress === 100 ? 'Переглянути курс' : 'Продовжити навчання'}
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="p-6 text-center">
                                        <Lock className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                                        <p className="text-slate-500 text-sm">Курс знаходиться у розробці</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const NotificationsTab: React.FC = () => {
    const notifications = [
        { id: 1, title: 'Новий урок доступний', text: 'Урок 10 курсу Архетипів тепер доступний', time: '2 год тому', read: false },
        { id: 2, title: 'Нагадування', text: 'Завтра о 18:00 онлайн-зустріч з майстром', time: '5 год тому', read: false },
        { id: 3, title: 'Вітаємо!', text: 'Ви успішно завершили 9 урок', time: '1 день тому', read: true },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Сповіщення</h2>
            <div className="space-y-3">
                {notifications.map(n => (
                    <div key={n.id} className={`bg-white dark:bg-slate-900 rounded-2xl p-4 border ${n.read ? 'border-slate-100 dark:border-slate-800' : 'border-indigo-200 dark:border-indigo-800'} shadow-sm`}>
                        <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${n.read ? 'bg-slate-300' : 'bg-indigo-500'}`} />
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-800 dark:text-white text-sm">{n.title}</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">{n.text}</p>
                                <span className="text-xs text-slate-400 mt-1 block">{n.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MessagesTab: React.FC = () => {
    const [message, setMessage] = useState('');
    const messages = [
        { id: 1, from: 'Майстер', text: 'Вітаю! Як просувається ваше навчання?', time: '10:30', isMe: false },
        { id: 2, from: 'Ви', text: 'Дякую, все чудово! Маю питання по 8 уроку.', time: '10:35', isMe: true },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Особисті повідомлення</h2>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden">
                <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                    {messages.map(m => (
                        <div key={m.id} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-3 rounded-2xl ${m.isMe ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white'}`}>
                                <p className="text-sm">{m.text}</p>
                                <span className={`text-[10px] ${m.isMe ? 'text-white/70' : 'text-slate-400'}`}>{m.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Написати повідомлення..."
                            className="flex-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-xl">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MythTab: React.FC = () => (
    <div className="space-y-6 animate-fade-in">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Розрахунок персонального міфу</h2>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-lg">
            <div className="text-center mb-8">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Ваш персональний міф</h3>
                <p className="text-slate-500">Введіть дату народження для розрахунку</p>
            </div>
            <form className="max-w-md mx-auto space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Дата народження</label>
                    <input type="date" className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Час народження (якщо відомий)</label>
                    <input type="time" className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Місце народження</label>
                    <input type="text" placeholder="Київ, Україна" className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/50 transition-all">
                    Розрахувати міф
                </button>
            </form>
        </div>
    </div>
);

const WriteMasterTab: React.FC = () => {
    const [message, setMessage] = useState('');
    
    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Написати майстру</h2>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-lg">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-xl font-bold">
                        КД
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-white">Костянтин Добрев</h3>
                        <p className="text-sm text-slate-500">Майстер • Зазвичай відповідає протягом дня</p>
                    </div>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Тема звернення</label>
                        <input type="text" placeholder="Питання по курсу..." className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Повідомлення</label>
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                            placeholder="Опишіть ваше питання..."
                            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2">
                        <Send size={18} /> Надіслати
                    </button>
                </form>
            </div>
        </div>
    );
};


const OrdersTab: React.FC = () => {
    const orders = [
        { id: 1, client: 'Олена Петренко', email: 'olena@email.com', product: 'Перстень Сонця', status: 'new', date: '19.12.2024' },
        { id: 2, client: 'Андрій Коваль', email: 'andrii@email.com', product: '1й Курс Архетипів', status: 'processing', date: '18.12.2024' },
        { id: 3, client: 'Марія Шевченко', email: 'maria@email.com', product: 'Консультація', status: 'completed', date: '17.12.2024' },
        { id: 4, client: 'Іван Бондар', email: 'ivan@email.com', product: 'Печатка багатства', status: 'new', date: '19.12.2024' },
        { id: 5, client: 'Наталія Кравчук', email: 'natalia@email.com', product: 'Монета Скорпіона', status: 'new', date: '19.12.2024' },
    ];

    const statusLabels: Record<string, { label: string; color: string }> = {
        new: { label: 'Нове', color: 'bg-red-500' },
        processing: { label: 'В обробці', color: 'bg-amber-500' },
        completed: { label: 'Завершено', color: 'bg-green-500' },
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Нові замовлення</h2>
                <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold">
                    {orders.filter(o => o.status === 'new').length} нових
                </span>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Клієнт</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Товар</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Статус</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Дата</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Дії</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-4 py-4">
                                        <div>
                                            <p className="font-medium text-slate-800 dark:text-white text-sm">{order.client}</p>
                                            <p className="text-xs text-slate-500">{order.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{order.product}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase text-white ${statusLabels[order.status].color}`}>
                                            {statusLabels[order.status].label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-slate-500">{order.date}</td>
                                    <td className="px-4 py-4">
                                        <button className="px-3 py-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                                            Відповісти
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const UsersTab: React.FC = () => {
    const users = [
        { id: 1, name: 'Олена Петренко', email: 'olena@email.com', role: 'student' as UserRole, courses: 2 },
        { id: 2, name: 'Андрій Коваль', email: 'andrii@email.com', role: 'listener' as UserRole, courses: 0 },
        { id: 3, name: 'Марія Шевченко', email: 'maria@email.com', role: 'manager' as UserRole, courses: 3 },
        { id: 4, name: 'Іван Бондар', email: 'ivan@email.com', role: 'student' as UserRole, courses: 1 },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Користувачі</h2>
                <span className="text-sm text-slate-500">{users.length} користувачів</span>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Користувач</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Роль</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Курсів</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Дії</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {users.map(u => (
                                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">
                                                {u.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800 dark:text-white text-sm">{u.name}</p>
                                                <p className="text-xs text-slate-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <select 
                                            defaultValue={u.role}
                                            className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="listener">Слухач</option>
                                            <option value="student">Студент</option>
                                            <option value="manager">Менеджер</option>
                                            <option value="admin">Адмін</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{u.courses}</td>
                                    <td className="px-4 py-4">
                                        <button className="px-3 py-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                                            Редагувати
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const SettingsTab: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Налаштування</h2>
            <div className="grid gap-6">
                {/* Profile Settings */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-lg">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4">Профіль</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ім'я</label>
                            <input type="text" defaultValue={user?.name} className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                            <input type="email" defaultValue={user?.email} className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-xl font-bold text-sm">
                            Зберегти зміни
                        </button>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-lg">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4">Безпека</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Поточний пароль</label>
                            <input type="password" className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Новий пароль</label>
                            <input type="password" className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <button className="px-6 py-2 bg-slate-800 dark:bg-white text-white dark:text-slate-800 rounded-xl font-bold text-sm">
                            Змінити пароль
                        </button>
                    </div>
                </div>

                {/* Site Settings (Admin only) */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-lg">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4">Налаштування сайту</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-800 dark:text-white text-sm">Режим обслуговування</p>
                                <p className="text-xs text-slate-500">Тимчасово закрити сайт для відвідувачів</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-800 dark:text-white text-sm">Реєстрація нових користувачів</p>
                                <p className="text-xs text-slate-500">Дозволити нові реєстрації</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
