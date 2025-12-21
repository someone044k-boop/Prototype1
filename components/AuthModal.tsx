import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// reCAPTCHA site key - replace with your actual key
const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key

declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            render: (container: string | HTMLElement, options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void; theme?: string }) => number;
            reset: (widgetId?: number) => void;
        };
        onRecaptchaLoad?: () => void;
    }
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const { login, register, isLoading } = useAuth();
    const navigate = useNavigate();
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isAnimating, setIsAnimating] = useState(false);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const [recaptchaWidgetId, setRecaptchaWidgetId] = useState<number | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const recaptchaRef = useRef<HTMLDivElement>(null);

    // Load reCAPTCHA script
    useEffect(() => {
        if (typeof window !== 'undefined' && !document.getElementById('recaptcha-script')) {
            const script = document.createElement('script');
            script.id = 'recaptcha-script';
            script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
            script.async = true;
            script.defer = true;
            
            window.onRecaptchaLoad = () => {
                setRecaptchaLoaded(true);
            };
            
            document.head.appendChild(script);
        } else if (window.grecaptcha) {
            setRecaptchaLoaded(true);
        }
    }, []);

    // Render reCAPTCHA when modal opens and script is loaded
    useEffect(() => {
        if (isOpen && recaptchaLoaded && recaptchaRef.current && mode === 'register' && recaptchaWidgetId === null) {
            try {
                const isDark = document.documentElement.classList.contains('dark');
                const widgetId = window.grecaptcha.render(recaptchaRef.current, {
                    sitekey: RECAPTCHA_SITE_KEY,
                    callback: (token: string) => setRecaptchaToken(token),
                    'expired-callback': () => setRecaptchaToken(null),
                    theme: isDark ? 'dark' : 'light'
                });
                setRecaptchaWidgetId(widgetId);
            } catch (e) {
                // Widget already rendered
            }
        }
    }, [isOpen, recaptchaLoaded, mode, recaptchaWidgetId]);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setName('');
            setRecaptchaToken(null);
            setErrors({});
            setRecaptchaWidgetId(null);
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    // Switch mode with animation
    const switchMode = (newMode: 'login' | 'register') => {
        if (mode === newMode) return;
        setIsAnimating(true);
        setTimeout(() => {
            setMode(newMode);
            setErrors({});
            setRecaptchaToken(null);
            setRecaptchaWidgetId(null);
            setIsAnimating(false);
        }, 200);
    };

    // Password validation
    const validatePassword = (pwd: string): string[] => {
        const errors: string[] = [];
        if (pwd.length < 8) errors.push('Мінімум 8 символів');
        if (!/[A-Z]/.test(pwd)) errors.push('Потрібна велика літера');
        if (!/[0-9]/.test(pwd)) errors.push('Потрібна цифра');
        return errors;
    };

    // Form validation
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!email.trim()) {
            newErrors.email = 'Введіть email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Невірний формат email';
        }

        if (!password) {
            newErrors.password = 'Введіть пароль';
        } else if (mode === 'register') {
            const pwdErrors = validatePassword(password);
            if (pwdErrors.length > 0) {
                newErrors.password = pwdErrors.join(', ');
            }
        }

        if (mode === 'register') {
            if (!name.trim()) {
                newErrors.name = "Введіть ім'я";
            }
            if (password !== confirmPassword) {
                newErrors.confirmPassword = 'Паролі не співпадають';
            }
            if (!recaptchaToken) {
                newErrors.recaptcha = 'Підтвердіть що ви не робот';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        
        try {
            if (mode === 'login') {
                await login(email, password);
            } else {
                await register(email, password, name);
            }
            onClose();
            navigate('/dashboard');
        } catch (error) {
            setErrors({ submit: 'Помилка авторизації' });
        }
    };

    // Handle Google auth (auto-registers on first login)
    const handleGoogleAuth = async () => {
        // Simulate Google auth - in real app would use OAuth
        await login('google_user@gmail.com', 'google');
        onClose();
        navigate('/dashboard');
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md transition-all duration-150"
            style={{ animation: 'fadeIn 0.15s ease-out' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div 
                ref={modalRef}
                className="bg-white dark:bg-slate-900 w-full max-w-md max-h-[90vh] rounded-[2rem] shadow-2xl border border-white/20 dark:border-slate-700 relative overflow-hidden flex flex-col"
                style={{ animation: 'fadeIn 0.2s ease-out' }}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Header with tabs */}
                    <div className="pt-8 pb-4 px-8">
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-full p-1 mb-6">
                            <button
                                onClick={() => switchMode('login')}
                                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${mode === 'login' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                            >
                                Вхід
                            </button>
                            <button
                                onClick={() => switchMode('register')}
                                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${mode === 'register' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                            >
                                Реєстрація
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white text-center">
                            {mode === 'login' ? 'Вітаємо!' : 'Створити акаунт'}
                        </h2>
                        <p className="text-sm text-slate-500 text-center mt-1">
                            {mode === 'login' ? 'Увійдіть до свого акаунту' : 'Заповніть форму для реєстрації'}
                        </p>
                    </div>

                    {/* Form */}
                    <div className={`px-8 pb-8 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                    {/* Google Button - only for login (auto-registers) */}
                    {mode === 'login' && (
                        <>
                            <button
                                type="button"
                                onClick={handleGoogleAuth}
                                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium text-slate-700 dark:text-slate-200"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Увійти через Google
                            </button>
                            <p className="text-[10px] text-slate-400 text-center mt-2">
                                Автоматична реєстрація при першому вході
                            </p>

                            {/* Divider */}
                            <div className="flex items-center gap-4 my-5">
                                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                                <span className="text-xs text-slate-400 font-medium">або</span>
                                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                            </div>
                        </>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name field (register only) */}
                        {mode === 'register' && (
                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                                    Ім'я
                                </label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ваше ім'я"
                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${errors.name ? 'border-red-400' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-400'}`}
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.name}</p>}
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                                Email
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${errors.email ? 'border-red-400' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-400'}`}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                                Пароль
                            </label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full pl-11 pr-12 py-3 rounded-xl border-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${errors.password ? 'border-red-400' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-400'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.password}</p>}
                            
                            {/* Password strength indicator (register only) */}
                            {mode === 'register' && password && (
                                <div className="mt-2 space-y-1">
                                    {[
                                        { check: password.length >= 8, label: 'Мінімум 8 символів' },
                                        { check: /[A-Z]/.test(password), label: 'Велика літера' },
                                        { check: /[0-9]/.test(password), label: 'Цифра' },
                                    ].map((rule, i) => (
                                        <div key={i} className={`flex items-center gap-1.5 text-xs ${rule.check ? 'text-green-500' : 'text-slate-400'}`}>
                                            <CheckCircle2 size={12} className={rule.check ? 'opacity-100' : 'opacity-30'} />
                                            {rule.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password (register only) */}
                        {mode === 'register' && (
                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                                    Підтвердіть пароль
                                </label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full pl-11 pr-12 py-3 rounded-xl border-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${errors.confirmPassword ? 'border-red-400' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-400'}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.confirmPassword}</p>}
                            </div>
                        )}

                        {/* reCAPTCHA (register only) */}
                        {mode === 'register' && (
                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                                    Перевірка
                                </label>
                                <div 
                                    ref={recaptchaRef} 
                                    className="flex justify-center"
                                ></div>
                                {errors.recaptcha && <p className="text-red-500 text-xs mt-2 flex items-center justify-center gap-1"><AlertCircle size={12}/>{errors.recaptcha}</p>}
                            </div>
                        )}

                        {/* Forgot password link (login only) */}
                        {mode === 'login' && (
                            <div className="text-right">
                                <button type="button" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                                    Забули пароль?
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-bold uppercase tracking-widest text-sm shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all mt-2"
                        >
                            {mode === 'login' ? 'Увійти' : 'Зареєструватися'}
                        </button>
                    </form>

                    {/* Switch mode text */}
                    <p className="text-center text-sm text-slate-500 mt-6">
                        {mode === 'login' ? (
                            <>Немає акаунту? <button onClick={() => switchMode('register')} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Зареєструватися</button></>
                        ) : (
                            <>Вже є акаунт? <button onClick={() => switchMode('login')} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Увійти</button></>
                        )}
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
