import React, { useState, useEffect } from 'react';
import { X, Clock, CreditCard, Video, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Define structure for rich text content
interface ConsultationType {
    id: string;
    title: string;
    format: string;
    duration: string;
    price: string;
    image: string;
    description: React.ReactNode; // Changed from string to ReactNode for Rich Text
}

const CONSULTATION_TYPES: ConsultationType[] = [
    {
        id: 'general',
        title: 'Загальна консультація',
        format: 'Онлайн-зустріч',
        duration: '1 год',
        price: '1000 грн',
        image: '/consultation/consalt.webp',
        description: (
            <>
                <div className="mb-3 p-3 bg-indigo-50 dark:bg-slate-800/50 rounded-2xl border border-indigo-100 dark:border-slate-700">
                    <p className="font-bold text-lg text-indigo-700 dark:text-indigo-300 mb-1 uppercase tracking-wider">ТЕМИ ЗУСТРІЧІ:</p>
                    <p className="italic text-slate-600 dark:text-slate-400 text-sm">Розбір актуальних життєвих запитів та пошук шляхів їх вирішення.</p>
                </div>

                <div className="space-y-3">
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-fuchsia-500"></span>
                            Терапевтичні консультації по подіям:
                        </h4>
                        <ul className="list-none space-y-1 pl-4 text-slate-700 dark:text-slate-300 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 font-bold">1.</span>
                                <span><strong className="text-slate-900 dark:text-white">Особисті стосунки</strong> (кризи, нерозуміння, пошук партнера).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 font-bold">2.</span>
                                <span>Конфлікти та напруженості у <strong className="text-slate-900 dark:text-white">суспільному житті</strong> (робота, оточення).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 font-bold">3.</span>
                                <span>Повернення життєвих подій до <strong className="text-slate-900 dark:text-white">гармонічного стану</strong>.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            Особиста терапія:
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-2 pl-4 text-slate-700 dark:text-slate-300 text-sm">
                            <li className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                🌪 Травми <strong className="text-red-500/80">важких подій</strong> життя.
                            </li>
                            <li className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                👶 Травми <strong className="text-indigo-500">дитинства</strong> та юності.
                            </li>
                            <li className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                ⏳ Кризи <strong className="text-fuchsia-500">середнього віку</strong>.
                            </li>
                            <li className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                🌊 Глибокі травми <strong className="text-violet-500">підсвідомості</strong>.
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    },
    {
        id: 'archetype',
        title: 'Консультація на мові архетипів',
        format: 'Онлайн-зустріч',
        duration: '2 год',
        price: '2000 грн',
        image: '/consultation/langarch.webp',
        description: (
            <div className="space-y-3 text-base leading-snug">
                <p>
                    👨🏻‍💻 На особистій консультації ми розглядаємо події вашого життя та спілкуємося щодо їх покращення. 
                    Ми використовуємо <strong className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-1 rounded">мову архетипів</strong>, 
                    яка сприяє гармонійному розумінню вашої особистості та вашого життєвого шляху.
                </p>

                <div className="bg-fuchsia-50 dark:bg-fuchsia-900/10 p-3 rounded-2xl border-l-4 border-fuchsia-500">
                    <p className="font-bold text-fuchsia-800 dark:text-fuchsia-300 mb-1">☝🏻 Глибина та Розвиток</p>
                    <p className="text-sm">
                        Архетипи надають глибину для розвитку та вдосконалення людини. На консультації ми використовуємо <strong className="text-slate-900 dark:text-white">ключі архетипів (гармонії)</strong> для:
                    </p>
                    <ul className="mt-1 flex flex-wrap gap-2">
                        {['Особистих стосунків', 'Ведення бізнесу', 'Професійної діяльності', 'Внутрішньої рівноваги'].map(tag => (
                            <span key={tag} className="text-xs font-bold px-2 py-1 bg-white dark:bg-slate-800 rounded-md text-fuchsia-600 dark:text-fuchsia-400 shadow-sm">{tag}</span>
                        ))}
                    </ul>
                </div>

                <p>
                    📎 Після консультації архетипи відразу починають впливати на гармонію вашого життя, утворюючи зміни на краще. 
                    <br/>
                    💫 Наша бесіда створює у вас та у вашому житті <strong className="text-indigo-600 dark:text-indigo-400">гармонію архетипа</strong>. 
                    Це працює як магічне закляття, що покращує події.
                </p>

                <p className="text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded-lg italic text-slate-600 dark:text-slate-400">
                    📁 [Цей метод є основою роботи з ТАРО, оскільки кожна карта — це архетип, який спрямовується у простір вашого життя.]
                </p>

                <div>
                    <h5 className="font-bold text-lg mb-1 text-slate-800 dark:text-white">📌 Чому це ефективно?</h5>
                    <p>
                        Мова архетипів — це <strong>мова гармонії</strong>. Її використовують таємні товариства для здобуття справжньої влади над світом. 
                        Ми ж використовуємо її, щоб ви могли отримати <strong className="text-indigo-600 dark:text-indigo-400">справжню владу над своїм життям</strong> і робити зміни на краще.
                    </p>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-2">
                    <p>
                        ▪️ Консультація мовою архетипів відрізняється від звичайної психології. Архетипи показують, на що можна впливати, щоб покращити вашу енергію та рівень життя.
                    </p>
                    <p className="mt-2 font-bold text-indigo-600 dark:text-indigo-400 text-center text-lg italic">
                        Ви відчуєте себе Героєм, що розуміє свій шлях.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 'healing',
        title: 'Зцілення підсвідомості',
        format: 'Онлайн-зустріч | Цикл сеансів',
        duration: 'Індивідуально',
        price: 'Від 4000 грн',
        image: '/consultation/karma.webp',
        description: (
            <div className="space-y-3 text-base leading-snug">
                <p className="text-lg font-medium text-slate-800 dark:text-white">
                    Ця процедура має на увазі занурення у вашу підсвідомість, виявлення <strong className="text-indigo-600 dark:text-indigo-400">складних артефактів</strong> та їх оптимізацію.
                </p>

                <div className="grid gap-2">
                    <div className="flex gap-3 items-start p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="text-2xl">🖇️</div>
                        <div>
                            <h5 className="font-bold text-slate-800 dark:text-white mb-1">Коріння у минулому</h5>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                Досвід вказує, що складні артефакти підсвідомості мають коріння у <strong>попередніх життях</strong>. 
                                Занурюючись, ми знаходимо спогади та тілесний досвід минулого.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-start p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="text-2xl">⚡️</div>
                        <div>
                            <h5 className="font-bold text-slate-800 dark:text-white mb-1">Енергетичне лікування</h5>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                Іноді ми знаходимо складні травми, які потребують лікування <strong>специфічними енергетичними засобами</strong> та медитаціями.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-900 text-white p-4 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-2xl"></div>
                    <p className="relative z-10 font-medium italic mb-2">
                        "Робота із попередніми життями відчиняє безодню..."
                    </p>
                    <p className="relative z-10 text-sm opacity-90">
                        Люди можуть звертатися кожен місяць задля зцілення досвіду попередніх життів протягом багатьох років. Так відбувається <strong>алхімічне відчищення особистості</strong>.
                    </p>
                </div>

                <div className="pt-2">
                    <p className="font-bold text-red-500 mb-1 uppercase text-xs tracking-widest">☝🏻 Важлива умова:</p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                        До цієї теми слід ставитись вірно. Треба занурюватись та розглядати попередні життя тільки з умов того, що 
                        <strong className="text-slate-900 dark:text-white bg-red-100 dark:bg-red-900/30 px-1 rounded ml-1">у вашому житті вочевидь вже працює сценарій попереднього життя</strong>.
                    </p>
                    <ul className="mt-2 space-y-0.5 text-sm text-slate-600 dark:text-slate-400 pl-4 border-l-2 border-red-300 dark:border-red-900">
                        <li>— Складні стосунки із батьками та партнерами.</li>
                        <li>— Незрозумілі стосунки із певними особистостями.</li>
                        <li>— Потяг до певних тем (егрегорів).</li>
                    </ul>
                </div>
            </div>
        )
    }
];

export const Consultations: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedId) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => { 
            document.body.classList.remove('modal-open');
        }
    }, [selectedId]);

    const activeItem = CONSULTATION_TYPES.find(i => i.id === selectedId);

    return (
        <div className="min-h-screen" style={{ paddingTop: 'calc(var(--vw-unit) * 7)', paddingBottom: 'var(--space-xl)', paddingLeft: 'var(--container-padding)', paddingRight: 'var(--container-padding)' }}>
            <div className="grid md:grid-cols-3 max-w-7xl mx-auto" style={{ gap: 'var(--space-xl)', marginTop: 'var(--space-sm)' }}>
                {CONSULTATION_TYPES.map((item, index) => (
                    <div 
                        key={item.id} 
                        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden group hover:border-indigo-300 dark:hover:border-indigo-700 h-full relative opacity-0 animate-fade-in card-lift"
                        style={{ 
                          animationDelay: `${index * 150}ms`, 
                          animationFillMode: 'forwards', 
                          boxShadow: '0 8px 30px -5px rgba(129, 140, 248, 0.2)',
                          borderRadius: 'var(--radius-3xl)'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 25px 60px -10px rgba(129, 140, 248, 0.4)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px -5px rgba(129, 140, 248, 0.2)'; }}
                    >
                        {/* Image Section */}
                        <div 
                            className="aspect-square overflow-hidden relative bg-slate-100 dark:bg-slate-800 cursor-pointer card-img-hover"
                            onClick={() => setSelectedId(item.id)}
                        >
                             <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                             <img loading="lazy" src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Card Content - Compact */}
                        <div className="flex-1 flex flex-col items-center text-center" style={{ padding: 'var(--space-md)' }}>
                            <h3 
                              className="font-bold text-slate-800 dark:text-white leading-tight flex items-center justify-center"
                              style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xs)', minHeight: 'calc(var(--vw-unit) * 3)' }}
                            >
                              {item.title}
                            </h3>
                            
                            <div className="flex flex-wrap justify-center" style={{ gap: 'var(--space-xs)', marginBottom: 'var(--space-sm)' }}>
                                <span 
                                  className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full font-bold uppercase tracking-wider text-slate-500"
                                  style={{ gap: 'var(--space-xs)', padding: 'var(--space-xs) var(--space-sm)', fontSize: 'var(--text-xs)' }}
                                >
                                    <Video style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }} /> {item.format}
                                </span>
                                <span 
                                  className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full font-bold uppercase tracking-wider text-slate-500"
                                  style={{ gap: 'var(--space-xs)', padding: 'var(--space-xs) var(--space-sm)', fontSize: 'var(--text-xs)' }}
                                >
                                    <Clock style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }} /> {item.duration}
                                </span>
                            </div>

                            <div 
                              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600 dark:from-indigo-400 dark:to-fuchsia-400"
                              style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}
                            >
                                {item.price}
                            </div>
                            
                            <div className="mt-auto w-full">
                                <button 
                                    onClick={() => setSelectedId(item.id)}
                                    className="w-full font-bold uppercase tracking-widest transition-all bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-600 hover:text-white dark:hover:text-white shadow-lg hover:shadow-indigo-500/30"
                                    style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-xs)' }}
                                >
                                    ДЕТАЛЬНІШЕ
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Popup */}
            {selectedId && activeItem && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-fade-in"
                    style={{ padding: 'var(--space-lg)' }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setSelectedId(null);
                    }}
                >
                    {/* Modal wrapper for positioning close button outside */}
                    <div className="relative">
                        {/* Close Button - Outside modal, just next to the window */}
                        <button 
                            onClick={() => setSelectedId(null)} 
                            className="absolute -top-3 -right-3 z-[101] w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/30 shadow-md"
                        >
                            <X size={20} />
                        </button>

                        {/* Increased width to max-w-6xl for better visibility without scrolling */}
                        <div 
                          className="bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[90vh] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/20 dark:border-slate-700 relative animate-fade-in"
                          style={{ borderRadius: 'var(--radius-3xl)' }}
                        >

                            {/* Modal Image (Left Side) - Adjusted width ratio */}
                            <div className="w-full md:w-1/3 h-48 md:h-auto relative hidden md:block group card-img-hover">
                                <img loading="lazy" src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end" style={{ padding: 'var(--space-xl)' }}>
                                    <h3 className="text-white font-bold leading-tight drop-shadow-lg" style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-md)' }}>{activeItem.title}</h3>
                                    <p className="text-indigo-200 font-medium flex items-center" style={{ fontSize: 'var(--text-lg)', gap: 'var(--space-sm)' }}><CreditCard style={{ width: 'var(--size-icon-md)', height: 'var(--size-icon-md)' }}/> {activeItem.price}</p>
                                </div>
                            </div>

                            {/* Modal Content (Right Side) */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col relative bg-white dark:bg-slate-900" style={{ padding: 'var(--space-xl)' }}>
                                {/* Mobile Header (Visible only on small screens) */}
                                <div className="md:hidden" style={{ marginBottom: 'var(--space-xl)' }}>
                                    <h2 className="font-bold text-slate-800 dark:text-white" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}>{activeItem.title}</h2>
                                    <div className="font-bold text-indigo-600 dark:text-indigo-400" style={{ fontSize: 'var(--text-xl)' }}>{activeItem.price}</div>
                                </div>

                                {/* Main Description Content - Rich Text */}
                                <div className="text-slate-600 dark:text-slate-300 font-medium" style={{ marginBottom: 'var(--space-xl)', fontSize: 'var(--text-base)' }}>
                                    {activeItem.description}
                                </div>
                                
                                {/* Sticky Footer in Modal */}
                                <div className="mt-auto flex flex-col sm:flex-row items-center border-t border-slate-100 dark:border-slate-800" style={{ paddingTop: 'var(--space-xl)', gap: 'var(--space-xl)' }}>
                                    <div className="flex-1 w-full">
                                        <div className="flex items-center font-bold text-slate-500" style={{ gap: 'var(--space-lg)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-xs)' }}>
                                            <span className="flex items-center" style={{ gap: 'var(--space-xs)' }}><Clock style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }} className="text-indigo-500"/> {activeItem.duration}</span>
                                            <span className="flex items-center" style={{ gap: 'var(--space-xs)' }}><CheckCircle2 style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }} className="text-green-500"/> Вільні місця є</span>
                                        </div>
                                        <p className="text-slate-400" style={{ fontSize: 'var(--text-xs)' }}>Попередній запис обов'язковий. Майстер зв'яжеться з вами.</p>
                                    </div>
                                    <a 
                                        href="https://t.me/dobrevk" 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-bold shadow-lg hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all uppercase tracking-widest flex items-center justify-center ring-4 ring-indigo-50 dark:ring-slate-800"
                                        style={{ padding: 'var(--space-lg) var(--space-2xl)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)', gap: 'var(--space-sm)' }}
                                    >
                                        <Send style={{ width: 'var(--size-icon-md)', height: 'var(--size-icon-md)' }} /> ЗАПИСАТИСЬ
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};