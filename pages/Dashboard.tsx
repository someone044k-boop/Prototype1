import React, { useState } from 'react';
import { 
    User, BookOpen, Bell, MessageCircle, Sparkles, Send, 
    ShoppingBag, Users, Settings, LogOut, ChevronRight,
    Calendar, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { useAuth, hasPermission, UserRole } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('courses');

    // Redirect if not authenticated
    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-white mb-4">
                        Увійдіть до кабінету
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Для доступу до особистого кабінету необхідно авторизуватися
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-full font-bold"
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
        <div className="min-h-screen pt-24 pb-12 px-2 md:px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-slate-800 dark:text-white">
                                {user.name}
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${roleColors[user.role]}`}>
                                    {roleLabels[user.role]}
                                </span>
                                <span className="text-xs text-slate-500">{user.email}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors"
                    >
                        <LogOut size={18} /> Вийти
                    </button>
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-[280px_1fr] gap-6">
                    {/* Sidebar */}
                    <div className="lg:sticky lg:top-28 lg:h-fit">
                        <nav className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-lg border border-slate-100 dark:border-slate-800">
                            <ul className="space-y-2">
                                {availableMenuItems.map(item => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all
                                                ${activeTab === item.id
                                                    ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg'
                                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                }`}
                                        >
                                            <span className="flex items-center gap-3">
                                                <item.icon size={18} />
                                                {item.label}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                {item.badge && (
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === item.id ? 'bg-white/20 text-white' : 'bg-red-500 text-white'}`}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                                <ChevronRight size={14} className={activeTab === item.id ? 'opacity-100' : 'opacity-0'} />
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
    const courses = [
        { id: 'course1', title: '1й Курс Архетипів', progress: 75, lessons: 12, completed: 9 },
        { id: 'course2', title: '2й Курс ТАРО', progress: 30, lessons: 16, completed: 5 },
    ];

    const userCourses = courses.filter(c => user?.courses.includes(c.id));

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-serif font-bold text-slate-800 dark:text-white">Мої курси</h2>
            
            {userCourses.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-100 dark:border-slate-800">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">У вас ще немає курсів</h3>
                    <p className="text-slate-500 mb-4">Придбайте курс, щоб почати навчання</p>
                    <a href="/training" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-full font-bold">
                        Переглянути курси
                    </a>
                </div>
            ) : (
                <div className="grid gap-4">
                    {userCourses.map(course => (
                        <div key={course.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">{course.title}</h3>
                                    <p className="text-sm text-slate-500">{course.completed} з {course.lessons} уроків</p>
                                </div>
                                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{course.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full transition-all"
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>
                            <button className="mt-4 w-full py-2 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white transition-all">
                                Продовжити навчання
                            </button>
                        </div>
                    ))}
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
            <h2 className="text-xl font-serif font-bold text-slate-800 dark:text-white">Сповіщення</h2>
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
            <h2 className="text-xl font-serif font-bold text-slate-800 dark:text-white">Особисті повідомлення</h2>
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
        <h2 className="text-xl font-serif font-bold text-slate-800 dark:text-white">Розрахунок персонального міфу</h2>
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
            <h2 className="text-xl font-serif font-bold text-slate-800 dark:text-white">Написати майстру</h2>
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
                <h2 className="text-xl font-serif font-bold text-slate-800 dark:text-white">Нові замовлення</h2>
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
                <h2 className="text-xl font-serif font-bold text-slate-800 dark:text-white">Користувачі</h2>
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
            <h2 className="text-xl font-serif font-bold text-slate-800 dark:text-white">Налаштування</h2>
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
