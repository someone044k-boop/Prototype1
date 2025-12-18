import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Master: React.FC = () => {
    const location = useLocation();
    const { t } = useLanguage();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (location.pathname.includes('/about')) {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            } else if (location.pathname.includes('/ask')) {
                document.getElementById('ask')?.scrollIntoView({ behavior: 'smooth' });
            } else if (location.pathname.includes('/lessons')) {
                document.getElementById('lessons')?.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <div className="min-h-screen pt-24 pb-12 w-full mx-auto px-2 md:px-4">
            {/* 4.2 About Master */}
            <section id="about" className="mb-12 animate-fade-in scroll-mt-32">
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-center mb-8 text-slate-800 dark:text-white uppercase tracking-widest drop-shadow-sm">
                    {t('btn_about_master')}
                </h1>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-indigo-200 dark:border-indigo-900/30 group">
                         <img src="https://picsum.photos/600/800" alt="Костянтин Добрев" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="glass-panel p-6 rounded-[2.5rem] space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-300 text-justify shadow-xl">
                        <p>
                            <strong className="text-lg text-indigo-600 dark:text-indigo-400">Костянтин Добрев</strong> — засновник школи архетипів, дослідник духовних практик та автор унікальної методики "Dobrev Opus Zodiac".
                        </p>
                        <p>
                            Багаторічний досвід вивчення алхімії, астрології та психології дозволив створити систему, що інтегрує стародавні знання в сучасне життя. 
                            Методика базується на проживанні архетипів, що дозволяє людині не просто знати про свою долю, а керувати нею.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4.3 Ask Master */}
            <section id="ask" className="mb-12 bg-gradient-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-indigo-950/20 p-6 rounded-[2.5rem] border border-white/50 dark:border-white/5 shadow-xl scroll-mt-32">
                <div className="text-center mb-6">
                     <h2 className="text-xl font-serif font-bold uppercase mb-2 text-slate-800 dark:text-white">ЗАДАЙТЕ СВОЄ ПИТАННЯ КОСТЯНТИНУ ДОБРЕВУ</h2>
                     <p className="text-slate-500 text-xs tracking-wide">Отримайте відповідь на хвилююче питання</p>
                </div>
                
                <form className="max-w-2xl mx-auto space-y-4 mb-10">
                    <input type="text" placeholder="Ім’я" className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none transition-colors shadow-sm" />
                    <textarea placeholder="Ваше питання..." rows={3} className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none transition-colors shadow-sm resize-none"></textarea>
                    <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-bold uppercase rounded-full hover:shadow-lg hover:scale-[1.01] transition-all tracking-widest text-sm">{t('send')}</button>
                </form>

                <div className="space-y-4 max-w-4xl mx-auto">
                    <h3 className="font-bold text-center border-b border-slate-200 dark:border-slate-800 pb-3 text-slate-400 text-xs uppercase tracking-widest">Останні відповіді</h3>
                    {[1, 2].map(i => (
                        <div key={i} className="bg-white dark:bg-slate-950 p-5 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
                            <p className="font-bold text-xs text-indigo-500 mb-2 uppercase tracking-wide">Питання від Олени:</p>
                            <p className="italic mb-4 text-slate-600 dark:text-slate-300 font-serif text-sm">"Як зрозуміти свій домінуючий архетип?"</p>
                            <div className="pl-4 border-l-2 border-indigo-200 dark:border-indigo-900">
                                <p className="font-bold text-[10px] mb-1 text-slate-400 uppercase">Відповідь Майстра:</p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">Це пізнається через практику споглядання та аналіз власних реакцій на життєві виклики...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4.4 Individual Lessons */}
            <section id="lessons" className="scroll-mt-32">
                <h2 className="text-2xl font-serif font-bold text-center mb-10 uppercase text-slate-800 dark:text-white">ІНДИВІДУАЛЬНІ ЗАНЯТТЯ</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Package 1 */}
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5 overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-500">
                        <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                             <img src="https://picsum.photos/400/200?random=10" alt="Mentor" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/90 to-transparent p-5">
                                 <h3 className="text-white font-bold text-lg tracking-wide">Пакет "НАСТАВНИЦТВО"</h3>
                             </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">5000 грн</div>
                            <ul className="space-y-3 mb-6 flex-1 text-sm text-slate-600 dark:text-slate-300">
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"/> 4 онлайн-зустрічі</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"/> 1 раз на тиждень</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"/> 1.5 години</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"/> Формат: особиста бесіда</li>
                            </ul>
                            <button className="w-full py-3 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold uppercase rounded-xl hover:bg-indigo-500 hover:text-white transition-all tracking-widest text-sm">
                                ПОЧАТИ
                            </button>
                        </div>
                    </div>

                     {/* Package 2 */}
                     <div className="bg-slate-900 text-white rounded-[2.5rem] shadow-2xl border border-indigo-500/30 overflow-hidden flex flex-col transform md:-translate-y-4 relative">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500"></div>
                        <div className="h-48 bg-slate-800 relative overflow-hidden group">
                             <img src="https://picsum.photos/400/200?random=11" alt="Student" className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
                             <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-lg">Top Choice</div>
                             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-5">
                                 <h3 className="text-white font-bold text-lg tracking-wide">Пакет "УЧЕНЬ БЛИЗЬКОГО КОЛА"</h3>
                             </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 mb-4">10000 грн</div>
                            <div className="space-y-4 mb-6 flex-1 text-sm">
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-slate-300"><div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full shadow-[0_0_8px_rgba(217,70,239,0.8)]"/> 4 індивідуальні зустрічі</li>
                                    <li className="flex items-center gap-3 text-slate-300"><div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full"/> 1 раз на тиждень (2 години)</li>
                                    <li className="flex items-center gap-3 text-slate-300"><div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full"/> Практики та медитації</li>
                                    <li className="flex items-center gap-3 text-slate-300"><div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full"/> Чат-підтримка</li>
                                </ul>
                                <div className="border-t border-slate-700 pt-4">
                                    <p className="font-bold text-indigo-400 mb-2 uppercase tracking-wider text-[10px]">ТЕМИ:</p>
                                    <ul className="text-[10px] space-y-1.5 text-slate-400">
                                        <li>• Практика з картами ТАРО</li>
                                        <li>• Практика Архетипів (Західна Алхімія)</li>
                                        <li>• Індивідуальний план</li>
                                    </ul>
                                </div>
                            </div>
                            <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-bold uppercase rounded-xl shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all tracking-widest text-sm">
                                ПОЧАТИ
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};