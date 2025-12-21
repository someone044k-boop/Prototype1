import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Clock, CreditCard, Send, CheckCircle2, Video } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LessonPackage {
    id: string;
    title: string;
    format: string;
    duration: string;
    price: string;
    image: string;
    badge?: string;
    description: React.ReactNode;
}

const LESSON_PACKAGES: LessonPackage[] = [
    {
        id: 'nastavnictvo',
        title: 'Пакет "НАСТАВНИЦТВО"',
        format: 'Онлайн-зустрічі',
        duration: '4 зустрічі × 1.5 год',
        price: '5000 грн',
        image: '/master/nastavnictvo.webp',
        description: (
            <div className="space-y-4 text-base leading-relaxed">
                <p>
                    Індивідуальна програма наставництва — це <strong className="text-indigo-600 dark:text-indigo-400">особистий супровід</strong> на шляху вашого духовного розвитку.
                </p>
                <div className="bg-indigo-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-indigo-100 dark:border-slate-700">
                    <p className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">ЩО ВКЛЮЧЕНО:</p>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                        <li className="flex items-start gap-2"><span className="text-indigo-500">✓</span> 4 онлайн-зустрічі по 1.5 години</li>
                        <li className="flex items-start gap-2"><span className="text-indigo-500">✓</span> Зустрічі 1 раз на тиждень</li>
                        <li className="flex items-start gap-2"><span className="text-indigo-500">✓</span> Формат: особиста бесіда</li>
                        <li className="flex items-start gap-2"><span className="text-indigo-500">✓</span> Індивідуальний підхід до ваших запитів</li>
                    </ul>
                </div>
                <p>
                    Під час зустрічей ми працюємо з вашими <strong className="text-indigo-600 dark:text-indigo-400">життєвими ситуаціями</strong>, розглядаємо їх через призму архетипів та знаходимо шляхи до гармонії.
                </p>
            </div>
        )
    },
    {
        id: 'uchen',
        title: 'Пакет "УЧЕНЬ БЛИЗЬКОГО КОЛА"',
        format: 'Онлайн-зустрічі + Практики',
        duration: '4 зустрічі × 2 год',
        price: '10000 грн',
        image: '/master/uchen-blizkogo-kola.webp',
        badge: 'Top Choice',
        description: (
            <div className="space-y-4 text-base leading-relaxed">
                <p>
                    Поглиблена програма для тих, хто прагне <strong className="text-indigo-600 dark:text-indigo-400">глибокого занурення</strong> у практику архетипів та духовний розвиток.
                </p>
                <div className="bg-fuchsia-50 dark:bg-fuchsia-900/10 p-4 rounded-2xl border border-fuchsia-100 dark:border-fuchsia-900/30">
                    <p className="font-bold text-fuchsia-700 dark:text-fuchsia-300 mb-2">ЩО ВКЛЮЧЕНО:</p>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                        <li className="flex items-start gap-2"><span className="text-fuchsia-500">✓</span> 4 індивідуальні зустрічі по 2 години</li>
                        <li className="flex items-start gap-2"><span className="text-fuchsia-500">✓</span> Зустрічі 1 раз на тиждень</li>
                        <li className="flex items-start gap-2"><span className="text-fuchsia-500">✓</span> Практики та медитації</li>
                        <li className="flex items-start gap-2"><span className="text-fuchsia-500">✓</span> Чат-підтримка між зустрічами</li>
                    </ul>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <p className="font-bold text-slate-800 dark:text-white mb-2">ТЕМИ ЗАНЯТЬ:</p>
                    <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                        <li>• Практика з картами ТАРО</li>
                        <li>• Практика Архетипів (Західна Алхімія)</li>
                        <li>• Індивідуальний план розвитку</li>
                    </ul>
                </div>
            </div>
        )
    }
];

// Optimized scroll reveal hook with single observer
const useScrollReveal = () => {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const observerRef = useRef<IntersectionObserver | null>(null);
    const elementsRef = useRef<Map<string, HTMLElement>>(new Map());

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-reveal');
                        if (id) {
                            setVisibleSections(prev => new Set([...prev, id]));
                            observerRef.current?.unobserve(entry.target);
                        }
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        elementsRef.current.forEach((el) => {
            observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, []);

    const registerElement = (id: string, el: HTMLElement | null) => {
        if (el && !elementsRef.current.has(id)) {
            elementsRef.current.set(id, el);
            observerRef.current?.observe(el);
        }
    };

    const isVisible = (id: string) => visibleSections.has(id);

    return { registerElement, isVisible };
};

export const Master: React.FC = () => {
    const location = useLocation();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { registerElement, isVisible } = useScrollReveal();

    const isAskPage = location.pathname.includes('/ask');

    useEffect(() => {
        // First scroll to top
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Only scroll to sections on main master page, not on /ask
        if (!location.pathname.includes('/ask')) {
            const timer = setTimeout(() => {
                if (location.pathname.includes('/about')) {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                } else if (location.pathname.includes('/lessons')) {
                    document.getElementById('lessons')?.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [location]);

    useEffect(() => {
        if (selectedId) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [selectedId]);

    const activeItem = LESSON_PACKAGES.find(i => i.id === selectedId);

    // Animation classes - smooth and harmonious
    const fadeUp = (id: string) => 
        `transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isVisible(id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;
    
    const fadeLeft = (id: string) => 
        `transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isVisible(id) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`;
    
    const fadeRight = (id: string) => 
        `transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isVisible(id) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`;
    
    const scaleIn = (id: string) => 
        `transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isVisible(id) ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.96]'}`;

    // If on /master/ask page, show only Ask Master section
    if (isAskPage) {
        return (
            <div className="min-h-screen pt-28 pb-12 w-full mx-auto px-4">
                <section id="ask" className="max-w-4xl mx-auto">
                    <div 
                        className="bg-gradient-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-indigo-950/20 p-6 md:p-10 rounded-[2.5rem] border border-white/50 dark:border-white/5 elegant-block"
                        style={{ 
                            boxShadow: '0 25px 60px -15px rgba(129, 140, 248, 0.25), 0 10px 30px -10px rgba(192, 132, 252, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5)'
                        }}
                    >
                        {/* Header with animation */}
                        <div className="text-center mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-3xl shadow-xl">
                                ✉️
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold uppercase mb-2 text-slate-800 dark:text-white">ЗАДАЙТЕ СВОЄ ПИТАННЯ</h1>
                            <p className="text-slate-500 text-sm">Костянтин Добрев особисто відповість на ваше питання</p>
                        </div>
                        
                        {/* Form with animation */}
                        <form className="max-w-2xl mx-auto space-y-4 mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Ваше ім'я</label>
                                <input type="text" placeholder="Введіть ім'я" className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none transition-colors shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Email</label>
                                <input type="email" placeholder="your@email.com" className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none transition-colors shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Ваше питання</label>
                                <textarea placeholder="Опишіть ваше питання детально..." rows={5} className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none transition-colors shadow-sm resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-bold uppercase rounded-full hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.01] transition-all tracking-widest text-sm flex items-center justify-center gap-2">
                                <Send size={18} /> ВІДПРАВИТИ ПИТАННЯ
                            </button>
                        </form>

                        {/* Answers with staggered animation */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-center border-b border-slate-200 dark:border-slate-800 pb-3 text-slate-400 text-xs uppercase tracking-widest opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>Останні відповіді майстра</h3>
                            {[
                                { name: 'Олена', question: 'Як зрозуміти свій домінуючий архетип?', answer: 'Це пізнається через практику споглядання та аналіз власних реакцій на життєві виклики. Рекомендую почати з визначення своїх природних схильностей та того, що приносить вам найбільше задоволення.' },
                                { name: 'Михайло', question: 'Чи можна змінити свій архетип?', answer: 'Архетип — це ваша природа, але ви можете розвивати різні якості та інтегрувати інші архетипи. Це шлях до цілісності та гармонії.' },
                                { name: 'Анна', question: 'Як архетипи пов\'язані з ТАРО?', answer: 'Кожен великий аркан ТАРО відповідає певному архетипу. Це потужний інструмент для самопізнання та роботи з підсвідомістю.' }
                            ].map((item, i) => (
                                <div 
                                    key={i} 
                                    className="bg-white dark:bg-slate-950 p-5 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 opacity-0 animate-fade-in"
                                    style={{ animationDelay: `${400 + i * 100}ms`, animationFillMode: 'forwards' }}
                                >
                                    <p className="font-bold text-xs text-indigo-500 mb-2 uppercase tracking-wide">Питання від {item.name}:</p>
                                    <p className="italic mb-4 text-slate-600 dark:text-slate-300 text-sm">"{item.question}"</p>
                                    <div className="pl-4 border-l-2 border-indigo-200 dark:border-indigo-900">
                                        <p className="font-bold text-[10px] mb-1 text-slate-400 uppercase">Відповідь Майстра:</p>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{item.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 w-full mx-auto" style={{ paddingLeft: '1cm', paddingRight: '1cm' }}>
            <section id="about" className="mb-12 scroll-mt-32" style={{ paddingLeft: '1.5cm', paddingRight: '1.5cm' }}>
                {/* Block 1: Photo + Bio */}
                <div 
                    ref={(el) => registerElement('block1', el)}
                    data-reveal="block1"
                    className={`grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 items-start mb-10 ${fadeUp('block1')}`}
                >
                    <div 
                        className={`rounded-[2.5rem] overflow-hidden border border-indigo-200 dark:border-indigo-900/30 group w-fit mx-auto md:mx-0 card-img-hover ${scaleIn('block1')}`} 
                        style={{ boxShadow: '0 15px 40px -10px rgba(255, 255, 255, 0.5), 0 8px 20px -5px rgba(129, 140, 248, 0.15)' }}
                    >
                        <img loading="eager" src="/master/aboutmaster1.webp" alt="Костянтин Добрев" className="w-72 md:w-80 lg:w-96 h-auto" style={{ marginTop: '-2cm', marginBottom: '0' }} />
                    </div>
                    <div className={`space-y-3 text-base leading-relaxed text-slate-700 dark:text-slate-300 text-justify ${fadeLeft('block1')}`} style={{ transitionDelay: '100ms' }}>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white uppercase tracking-widest mb-4">
                            КОСТЯНТИН ДОБРЕВ
                        </h1>
                        <p>
                            Практикуючий цілитель, психотерапевт. Духовна спеціалізація — майстер наставник. Автор системи духовних практик <strong className="text-indigo-600 dark:text-indigo-400">Dobrev Opus Zodiac</strong>. Автор книги <strong className="text-indigo-600 dark:text-indigo-400">"Гра у час"</strong>. Засновник <strong className="text-indigo-600 dark:text-indigo-400">школи Архетипів</strong>.
                        </p>
                        <p>
                            З 2000х років цікавлюсь та практикую <strong className="text-indigo-600 dark:text-indigo-400">Сефіротичну традицію (ТАРО)</strong>, <strong className="text-indigo-600 dark:text-indigo-400">Каббалу</strong>, техніки <strong className="text-indigo-600 dark:text-indigo-400">НЛП</strong>, медитації, <strong className="text-indigo-600 dark:text-indigo-400">роботу з енергіями</strong> та йогу. З 2006 року проводжу терапевтичні сесії та консультації з клієнтами.
                        </p>
                        <p>
                            З 2009 року почав отримувати освіту психолога, щоб набути <strong className="text-indigo-600 dark:text-indigo-400">наукового розуміння свідомості людини</strong>. У 2013 році видав езотеричний роман <strong className="text-indigo-600 dark:text-indigo-400">"Гра у час"</strong> (Игра во время).
                        </p>
                        <p>
                            Потім відчув кризу, оскільки потребував нових інструментів та нового розуміння свого життєвого шляху. У той період товариш розповів мені про <strong className="text-indigo-600 dark:text-indigo-400">шлях героя</strong> та казко-терапію. Але я перекладав цю тему на езотеричну практику, асоціюючи шлях героя з <strong className="text-indigo-600 dark:text-indigo-400">колом зодіаку</strong> та <strong className="text-indigo-600 dark:text-indigo-400">великими арканами ТАРО</strong>. Всесвіт дуже м'яко дарував зміни духовного шляху. Шлях героя та <strong className="text-indigo-600 dark:text-indigo-400">коло архетипів</strong> відкрили для мене гармонію людської натури.
                        </p>
                    </div>
                </div>

                {/* Block 2: Second Photo + Text */}
                <div 
                    ref={(el) => registerElement('block2', el)}
                    data-reveal="block2"
                    className={`grid md:grid-cols-[1fr_auto] gap-4 md:gap-6 items-start mb-10 ${fadeUp('block2')}`}
                >
                    <div className={`space-y-3 text-base leading-relaxed text-slate-700 dark:text-slate-300 order-2 md:order-1 text-justify ${fadeRight('block2')}`} style={{ transitionDelay: '100ms' }}>
                        <p>
                            З 2015 року, набуваючи досвід з архетипами, визначив себе як <strong className="text-indigo-600 dark:text-indigo-400">майстер наставник</strong> — представника <strong className="text-indigo-600 dark:text-indigo-400">10го архетипу (Водолій)</strong>. Через це моє розуміння <strong className="text-indigo-600 dark:text-indigo-400">кола архетипів</strong> — це розуміння того, як <strong className="text-indigo-600 dark:text-indigo-400">навчати людей</strong> та повертати їх до <strong className="text-indigo-600 dark:text-indigo-400">своєї справжньої натури</strong>.
                        </p>
                        <div className={`glass-panel p-5 rounded-2xl max-w-md mx-auto snake-border ${scaleIn('block2')}`} style={{ transitionDelay: '150ms' }}>
                            <p className="font-bold text-slate-800 dark:text-white mb-2">Це практики розвитку якостей:</p>
                            <ul className="space-y-1 text-sm">
                                <li>— у особистому житті;</li>
                                <li>— у суспільних відносинах та бізнесі;</li>
                                <li>— у професійній діяльності та психологічному стані;</li>
                                <li>— у відновленні гармонії.</li>
                            </ul>
                        </div>
                        <p>
                            <strong className="text-indigo-600 dark:text-indigo-400">Моя мета</strong> — надати всім бажаючим, хто шукає свій <strong className="text-indigo-600 dark:text-indigo-400">духовний шлях</strong>, можливість розкрити свій <strong className="text-indigo-600 dark:text-indigo-400">справжній потенціал</strong>, впевнено <strong className="text-indigo-600 dark:text-indigo-400">долати життєві труднощі</strong> та створювати <strong className="text-indigo-600 dark:text-indigo-400">гармонійні взаємодії</strong> з навколишнім світом.
                        </p>
                    </div>
                    <div 
                        className={`rounded-[2.5rem] overflow-hidden border border-indigo-200 dark:border-indigo-900/30 group w-fit mx-auto md:mx-0 order-1 md:order-2 md:-mt-32 card-img-hover ${scaleIn('block2')}`} 
                        style={{ boxShadow: '0 15px 40px -10px rgba(255, 255, 255, 0.5), 0 8px 20px -5px rgba(129, 140, 248, 0.15)' }}
                    >
                        <img loading="lazy" src="/master/aboutmaster2.webp" alt="Костянтин Добрев з картами ТАРО" className="w-72 md:w-80 lg:w-96 h-auto" style={{ marginTop: '0', marginBottom: '-2cm' }} />
                    </div>
                </div>

                {/* Block 3: School of Archetypes */}
                <div 
                    ref={(el) => registerElement('block3', el)}
                    data-reveal="block3"
                    className={`mt-16 rounded-[2.5rem] p-6 md:p-10 elegant-block ${fadeUp('block3')}`}
                >
                    <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 text-slate-800 dark:text-white">
                        <span className="text-indigo-600 dark:text-indigo-400">ШКОЛА АРХЕТИПІВ</span> | DOBREV OPUS ZODIAC
                    </h2>

                    {/* Row 1: Stained glass + Text */}
                    <div 
                        ref={(el) => registerElement('mandala1', el)}
                        data-reveal="mandala1"
                        className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center mb-10"
                    >
                        <div 
                            className={`w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden mx-auto md:mx-0 flex-shrink-0 transition-[opacity,transform] duration-500 ${isVisible('mandala1') ? 'opacity-100 scale-100 animate-spin-once' : 'opacity-0 scale-95'}`} 
                            style={{ boxShadow: '0 10px 40px -10px rgba(129, 140, 248, 0.3)' }}
                        >
                            <img loading="eager" src="/master/shrtr.svg" alt="Вітраж" className="w-full h-full object-cover" />
                        </div>
                        <div 
                            className={`space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-300 text-justify ${fadeRight('mandala1')}`}
                            style={{ transitionDelay: '400ms' }}
                        >
                            <p>
                                <strong className="text-slate-900 dark:text-white">У 2015 році почав дослідження теми архетипів.</strong> Поступово накопичився матеріал та виникла потреба складати його у велику книгу. <strong className="text-indigo-600 dark:text-indigo-400">Коло архетипів</strong> відкрило мені глибоке розуміння всесвіту людей. Езотеричні та магічні ключі, <strong className="text-indigo-600 dark:text-indigo-400">руни</strong> та <strong className="text-indigo-600 dark:text-indigo-400">карти таро</strong>, сутність <strong className="text-indigo-600 dark:text-indigo-400">йоги</strong> та <strong className="text-indigo-600 dark:text-indigo-400">медитацій</strong>, <strong className="text-indigo-600 dark:text-indigo-400">фен-шуй</strong> та малювання <strong className="text-indigo-600 dark:text-indigo-400">мандали</strong>.
                            </p>
                            <p>
                                Зрозумілим стала сутність релігій та <strong className="text-indigo-600 dark:text-indigo-400">масонських практик</strong>. Яким чином та для чого будуються храми. Важливим є розуміння, що кожна людина має своє місце у всесвіті та має робити свою справу. Архетипи визначають мене як <strong className="text-indigo-600 dark:text-indigo-400">майстра наставника</strong>. Тому я продовжую займатись цією темою як <strong className="text-indigo-600 dark:text-indigo-400">психотерапевт</strong>, <strong className="text-indigo-600 dark:text-indigo-400">вчитель</strong> та <strong className="text-indigo-600 dark:text-indigo-400">наставник</strong>.
                            </p>
                        </div>
                    </div>

                    {/* Row 2: Text + Mandala */}
                    <div 
                        ref={(el) => registerElement('mandala2', el)}
                        data-reveal="mandala2"
                        className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-start"
                    >
                        <div 
                            className={`space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-300 order-2 md:order-1 text-justify ${fadeLeft('mandala2')}`}
                            style={{ transitionDelay: '300ms' }}
                        >
                            <p>
                                У 2021му році матеріалу вистачило для побудови шкільної програми та початку занять. Не зважаючи на військові події у країні люди навчаються, та проживають трансформації. Це <strong className="text-indigo-600 dark:text-indigo-400">особисті трансформації</strong> та <strong className="text-indigo-600 dark:text-indigo-400">трансформації у житті</strong>. У 2024му році перебудував програму навчання, намагаючись пов'язати визначення архетипів із <strong className="text-indigo-600 dark:text-indigo-400">циклом гештальту</strong>.
                            </p>
                        </div>
                        <div 
                            className={`w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden mx-auto md:mx-0 flex-shrink-0 order-1 md:order-2 md:-mt-16 ${isVisible('mandala2') ? 'animate-spin-once' : ''}`} 
                            style={{ boxShadow: '0 10px 40px -10px rgba(129, 140, 248, 0.3)' }}
                        >
                            <img loading="eager" src="/master/3kurs.webp" alt="Мандала архетипів" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Preload card images */}
            <div className="hidden">
                {LESSON_PACKAGES.map(item => (
                    <img key={item.id} src={item.image} alt="" />
                ))}
            </div>

            {/* Individual Lessons */}
            <section 
                ref={(el) => registerElement('lessons', el)}
                data-reveal="lessons"
                id="lessons" 
                className={`scroll-mt-32 mb-12 ${fadeUp('lessons')}`}
            >
                <h2 className="text-2xl font-bold text-center mb-10 uppercase text-slate-800 dark:text-white">ІНДИВІДУАЛЬНІ ЗАНЯТТЯ</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {LESSON_PACKAGES.map((item, index) => (
                        <div 
                            key={item.id}
                            className={`bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col group hover:border-indigo-300 dark:hover:border-indigo-700 h-full relative card-lift ${isVisible('lessons') ? 'card-reveal' : 'opacity-0'}`}
                            style={{ 
                                boxShadow: '0 8px 30px -5px rgba(129, 140, 248, 0.2)',
                                animationDelay: `${index * 200}ms`
                            }} 
                            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.boxShadow = '0 25px 60px -10px rgba(129, 140, 248, 0.4)'; }} 
                            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.boxShadow = '0 8px 30px -5px rgba(129, 140, 248, 0.2)'; }}
                        >
                            {item.badge && (
                                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-lg">{item.badge}</div>
                            )}
                            
                            <div 
                                className="aspect-square overflow-hidden relative bg-slate-100 dark:bg-slate-800 cursor-pointer card-img-hover"
                                onClick={() => setSelectedId(item.id)}
                            >
                                <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <img src={item.image} alt={item.title} className={`w-full h-full object-cover ${item.id === 'nastavnictvo' ? '' : 'object-center'}`} style={item.id === 'nastavnictvo' ? { objectPosition: 'center -1cm' } : {}} />
                            </div>

                            <div className="p-3 flex-1 flex flex-col items-center text-center">
                                <h3 className="text-lg font-bold mb-1 text-slate-800 dark:text-white leading-tight min-h-[2.5rem] flex items-center justify-center">{item.title}</h3>
                                
                                <div className="flex flex-wrap justify-center gap-1.5 mb-2">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                        <Video size={10} /> {item.format}
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                        <Clock size={10} /> {item.duration}
                                    </span>
                                </div>

                                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600 dark:from-indigo-400 dark:to-fuchsia-400 mb-3">
                                    {item.price}
                                </div>
                                
                                <div className="mt-auto w-full">
                                    <button 
                                        onClick={() => setSelectedId(item.id)}
                                        className="w-full py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-widest bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-600 hover:text-white dark:hover:text-white shadow-lg hover:shadow-indigo-500/30 transition-[background,box-shadow] duration-300"
                                    >
                                        ДЕТАЛЬНІШЕ
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reviews */}
            <section 
                ref={(el) => registerElement('reviews', el)}
                data-reveal="reviews"
                id="reviews" 
                className={`scroll-mt-32 ${fadeUp('reviews')}`}
            >
                <h2 className="text-2xl font-bold text-center mb-10 uppercase text-slate-800 dark:text-white">ВІДГУКИ УЧНІВ</h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {[
                        { name: 'Олена К.', text: 'Завдяки курсу я нарешті зрозуміла свій архетип і знайшла гармонію у відносинах. Костянтин — справжній майстер своєї справи!', course: '1й курс' },
                        { name: 'Андрій М.', text: 'Практики з ТАРО відкрили для мене новий погляд на життєві ситуації. Рекомендую всім, хто шукає свій шлях.', course: '2й курс' },
                        { name: 'Марина С.', text: 'Індивідуальні заняття допомогли мені пройти через складний період життя. Дякую за підтримку та мудрість!', course: 'Наставництво' },
                    ].map((review, i) => (
                        <div 
                            key={i} 
                            className={`bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 relative card-lift ${isVisible('reviews') ? 'card-reveal' : 'opacity-0'}`}
                            style={{ 
                                boxShadow: '0 8px 30px -5px rgba(129, 140, 248, 0.15)',
                                animationDelay: `${i * 150}ms`
                            }}
                        >
                            <div className="absolute -top-3 left-6 text-5xl text-indigo-200 dark:text-indigo-900 font-bold">"</div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 pt-4 italic">
                                {review.text}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-white text-sm">{review.name}</p>
                                    <p className="text-[10px] text-indigo-500 uppercase tracking-wider">{review.course}</p>
                                </div>
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(star => (
                                        <span key={star} className="text-amber-400 text-sm">★</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal */}
            {selectedId && activeItem && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-150"
                    style={{ animation: 'fadeIn 0.15s ease-out' }}
                    onClick={(e) => { if (e.target === e.currentTarget) setSelectedId(null); }}
                >
                    <div 
                        className="bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/20 dark:border-slate-700 relative"
                        style={{ animation: 'fadeIn 0.2s ease-out' }}
                    >
                        <button 
                            onClick={() => setSelectedId(null)} 
                            className="absolute top-4 right-4 z-50 p-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-full text-slate-800 dark:text-white hover:bg-red-500 hover:text-white transition-colors duration-150 shadow-sm"
                        >
                            <X size={24} />
                        </button>

                        <div className="w-full md:w-1/3 h-48 md:h-auto relative hidden md:block group card-img-hover">
                            <img src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white text-3xl font-bold mb-3 leading-tight drop-shadow-lg">{activeItem.title}</h3>
                                <p className="text-indigo-200 text-lg font-medium flex items-center gap-2"><CreditCard size={18}/> {activeItem.price}</p>
                            </div>
                        </div>

                        <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col relative bg-white dark:bg-slate-900">
                            <div className="md:hidden mb-6">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{activeItem.title}</h2>
                                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{activeItem.price}</div>
                            </div>

                            <div className="text-slate-600 dark:text-slate-300 mb-8 font-medium">
                                {activeItem.description}
                            </div>
                            
                            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex-1 w-full">
                                    <div className="flex items-center gap-4 text-sm font-bold text-slate-500 mb-1">
                                        <span className="flex items-center gap-1.5"><Clock size={16} className="text-indigo-500"/> {activeItem.duration}</span>
                                        <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500"/> Вільні місця є</span>
                                    </div>
                                    <p className="text-xs text-slate-400">Попередній запис обов'язковий. Майстер зв'яжеться з вами.</p>
                                </div>
                                <a 
                                    href="https://t.me/dobrevk" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/50 hover:scale-[1.02] transition-[transform,box-shadow] duration-300 uppercase tracking-widest text-sm flex items-center justify-center gap-2 ring-4 ring-indigo-50 dark:ring-slate-800"
                                >
                                    <Send size={18} /> ЗАПИСАТИСЬ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
