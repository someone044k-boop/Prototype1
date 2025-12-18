import React, { useState, useEffect } from 'react';
import { X, Clock, CreditCard, Video, Send, CheckCircle2 } from 'lucide-react';

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
        image: '/image.jpg',
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
        image: 'https://picsum.photos/seed/consult2/600/400',
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
                    <p className="mt-2 font-serif font-bold text-indigo-600 dark:text-indigo-400 text-center text-lg">
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
        image: 'https://picsum.photos/seed/consult3/600/400',
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
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; }
    }, [selectedId]);

    const activeItem = CONSULTATION_TYPES.find(i => i.id === selectedId);

    return (
        <div className="min-h-screen pt-24 pb-10 px-2 md:px-4 w-full mx-auto">
             <h1 className="text-3xl md:text-5xl font-serif font-bold text-center mb-10 text-slate-800 dark:text-white uppercase tracking-widest drop-shadow-sm">
                КОНСУЛЬТАЦІЇ
            </h1>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {CONSULTATION_TYPES.map(item => (
                    <div key={item.id} className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden group hover:-translate-y-2 transition-transform duration-500 h-full relative -top-[5px]">
                        {/* Image Section */}
                        <div className="aspect-square overflow-hidden relative">
                             <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                             <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>

                        {/* Card Content - Compact */}
                        <div className="p-3 flex-1 flex flex-col items-center text-center">
                            <h3 className="text-lg font-bold font-serif mb-1 text-slate-800 dark:text-white leading-tight min-h-[2.5rem] flex items-center justify-center">{item.title}</h3>
                            
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
                                    className="w-full py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-600 hover:text-white dark:hover:text-white shadow-lg hover:shadow-indigo-500/30"
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
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setSelectedId(null);
                    }}
                >
                    {/* Increased width to max-w-6xl for better visibility without scrolling */}
                    <div className="bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/20 dark:border-slate-700 relative animate-fade-in">
                        
                        {/* Close Button */}
                        <button 
                            onClick={() => setSelectedId(null)} 
                            className="absolute top-4 right-4 z-50 p-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-full text-slate-800 dark:text-white hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                            <X size={24} />
                        </button>

                        {/* Modal Image (Left Side) - Adjusted width ratio */}
                        <div className="w-full md:w-1/3 h-48 md:h-auto relative hidden md:block group">
                            <img src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white font-serif text-3xl font-bold mb-3 leading-tight drop-shadow-lg">{activeItem.title}</h3>
                                <p className="text-indigo-200 text-lg font-medium flex items-center gap-2"><CreditCard size={18}/> {activeItem.price}</p>
                            </div>
                        </div>

                        {/* Modal Content (Right Side) */}
                        <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col relative bg-white dark:bg-slate-900">
                            {/* Mobile Header (Visible only on small screens) */}
                            <div className="md:hidden mb-6">
                                <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-white mb-2">{activeItem.title}</h2>
                                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{activeItem.price}</div>
                            </div>

                            {/* Main Description Content - Rich Text */}
                            <div className="text-slate-600 dark:text-slate-300 mb-8 font-medium">
                                {activeItem.description}
                            </div>
                            
                            {/* Sticky Footer in Modal */}
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
                                    className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 ring-4 ring-indigo-50 dark:ring-slate-800"
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