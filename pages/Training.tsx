import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { COURSES } from '../constants';
import { Course } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const Training: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course>(COURSES[0]);
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Handle routing based on URL to select the Course Card
    if (location.pathname.includes('/year-1')) {
        setSelectedCourse(COURSES.find(c => c.year === 1) || COURSES[0]);
    } else if (location.pathname.includes('/year-2')) {
        setSelectedCourse(COURSES.find(c => c.year === 2) || COURSES[1]);
    } else if (location.pathname.includes('/year-3')) {
        setSelectedCourse({ ...COURSES[0], year: 3, title: 'МАГІЯ СТИХІЙ З ТАРО', subtitle: 'Зв’язок із стихіями', purchased: false });
    } else if (location.pathname.includes('/year-4')) {
        setSelectedCourse({ ...COURSES[0], year: 4, title: 'ПІДКОРЕННЯ СИЛ', subtitle: 'Пробудження бездоганних сил', purchased: false });
    } else if (location.pathname === '/training' || location.pathname === '/training/') {
        navigate('/training/year-1', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen pt-24 pb-8 px-2 md:px-4 w-full mx-auto">
      
      {/* Catalog Header */}
      <h1 className="text-3xl md:text-5xl font-serif font-bold text-center mb-8 text-slate-800 dark:text-white uppercase tracking-widest drop-shadow-sm">
         {t('menu_training')}
      </h1>

      {/* Course Navigation (Catalog Tabs) */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
          {[1, 2, 3, 4].map(year => (
              <Link 
                key={year}
                to={`/training/year-${year}`}
                className={`px-6 py-3 rounded-full border transition-all font-bold uppercase tracking-wider text-xs shadow-md
                ${selectedCourse.year === year 
                    ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white border-transparent shadow-indigo-500/30 scale-105' 
                    : 'bg-white dark:bg-slate-800 border-white/20 dark:border-slate-700 text-slate-500 hover:border-indigo-400 hover:text-indigo-500'}`}
              >
                  {year} Курс
              </Link>
          ))}
      </div>

      {/* Selected Course Details Card */}
      <div className="max-w-5xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 dark:border-white/10 animate-fade-in">
           <div className="grid md:grid-cols-2">
               {/* Left: Visual & Status */}
               <div className="p-6 md:p-8 bg-indigo-50/50 dark:bg-slate-800/50 flex flex-col items-center justify-center text-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5"></div>
                   <div className={`w-32 h-32 rounded-full border-4 border-dashed relative z-10 
                        ${selectedCourse.year >= 3 ? 'border-fuchsia-400 text-fuchsia-500' : selectedCourse.year === 2 ? 'border-indigo-400 text-indigo-500' : 'border-violet-400 text-violet-500'} 
                        flex items-center justify-center mb-6 shadow-inner bg-white/50 dark:bg-slate-900/50`}>
                        <span className="font-serif text-5xl font-bold">{selectedCourse.year}</span>
                   </div>
                   
                   {selectedCourse.purchased ? (
                       <div className="px-5 py-1.5 bg-green-500 text-white text-[10px] font-bold rounded-full uppercase mb-3 shadow-lg shadow-green-500/30">
                           Доступно
                       </div>
                   ) : (
                       <div className="px-5 py-1.5 bg-slate-400 text-white text-[10px] font-bold rounded-full uppercase mb-3 flex items-center gap-2 shadow-inner">
                           <Lock size={12}/> Заблоковано
                       </div>
                   )}
                   <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-white mb-1 relative z-10">{selectedCourse.title}</h2>
                   <p className="text-indigo-600 dark:text-indigo-400 font-medium tracking-wide relative z-10 text-sm">{selectedCourse.subtitle}</p>
               </div>

               {/* Right: Info & Action */}
               <div className="p-6 md:p-8 flex flex-col">
                   <div className="flex-1">
                       <h3 className="font-bold uppercase text-slate-400 text-[10px] tracking-widest mb-4">Про курс</h3>
                       <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm leading-relaxed text-justify">
                           Цей курс розкриває глибинні аспекти вашої особистості через роботу з архетипами. 
                           Ви отримаєте доступ до унікальних методик, відео-лекцій, аудіо-налаштувань та практичних завдань.
                           {selectedCourse.year > 2 && " (Матеріали цього курсу знаходяться в розробці)."}
                       </p>
                       <ul className="space-y-3 text-sm mb-6">
                           <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"/> 12 Модулів</li>
                           <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]"/> 24 Аудіо-медитації</li>
                           <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-violet-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"/> Підтримка куратора</li>
                       </ul>
                   </div>

                   <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                       {selectedCourse.purchased ? (
                           <Link 
                               to={`/classroom/${selectedCourse.id}`} 
                               className="block w-full py-3 text-center bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm"
                           >
                               {t('btn_start_learning')}
                           </Link>
                       ) : (
                           <div className="space-y-3">
                               <div className="flex justify-between items-center text-base font-bold">
                                   <span>{t('price')}:</span>
                                   <span className="text-fuchsia-600 dark:text-fuchsia-400 text-xl">{selectedCourse.price} грн</span>
                               </div>
                               <button className="block w-full py-3 text-center bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm">
                                   {t('btn_buy_course')}
                               </button>
                           </div>
                       )}
                   </div>
               </div>
           </div>
           
           {/* Detailed Tabs (Preview of content) */}
           <div className="bg-white/50 dark:bg-slate-900/50 p-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap gap-4 mb-6 border-b border-slate-200 dark:border-slate-700 pb-1">
                    {(selectedCourse.year === 1 ? ['Програма', 'Практики', 'Екзамен'] : ['Огляд']).map((tab, i) => (
                        <button 
                            key={i}
                            onClick={() => setActiveTab(i)}
                            className={`text-[10px] font-bold uppercase pb-2 transition-all relative ${activeTab === i ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab}
                            {activeTab === i && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full"></span>}
                        </button>
                    ))}
                </div>
                
                {/* Simplified preview content */}
                <div className="min-h-[80px] text-sm text-slate-600 dark:text-slate-400">
                    {selectedCourse.year === 1 ? (
                        activeTab === 0 ? (
                            <div className="grid md:grid-cols-2 gap-3">
                                {['Скорпіон, Телець та Діва', 'Овен, Козеріг та Близнюки', 'Стрілець, Лев та Риби', 'Водолій, Терези та Рак'].map(item => (
                                    <div key={item} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm text-xs">{item}</div>
                                ))}
                            </div>
                        ) : <p className="text-xs">Детальна інформація про практики та екзаменацію доступна в повному описі курсу.</p>
                    ) : (
                        <p className="text-xs">Опис програми для цього курсу готується.</p>
                    )}
                </div>
           </div>
      </div>
    </div>
  );
};