import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DATA = [
  { name: 'Дім 1', value: 30, sign: 'Овен' },
  { name: 'Дім 2', value: 30, sign: 'Телець' },
  { name: 'Дім 3', value: 30, sign: 'Близнюки' },
  { name: 'Дім 4', value: 30, sign: 'Рак' },
  { name: 'Дім 5', value: 30, sign: 'Лев' },
  { name: 'Дім 6', value: 30, sign: 'Діва' },
  { name: 'Дім 7', value: 30, sign: 'Терези' },
  { name: 'Дім 8', value: 30, sign: 'Скорпіон' },
  { name: 'Дім 9', value: 30, sign: 'Стрілець' },
  { name: 'Дім 10', value: 30, sign: 'Козеріг' },
  { name: 'Дім 11', value: 30, sign: 'Водолій' },
  { name: 'Дім 12', value: 30, sign: 'Риби' },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#FF9F1C', '#2EC4B6', '#E71D36', '#011627', '#F7B801', '#8D99AE', '#EF476F', '#06D6A0'];

export const PersonalMyth: React.FC = () => {
    const [name, setName] = useState('');
    const [calculated, setCalculated] = useState(false);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setCalculated(true);
    };

    return (
        <div className="w-full animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-[2.5rem] shadow-2xl">
                    <h3 className="text-lg font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-3 text-slate-800 dark:text-white">Введіть дані народження</h3>
                    <form onSubmit={handleCalculate} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold mb-1.5 text-slate-500">Повне ім'я</label>
                            <input type="text" className="w-full p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 outline-none transition-colors text-sm" placeholder="Іван Іванов" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold mb-1.5 text-slate-500">Дата</label>
                                <input type="date" className="w-full p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-indigo-500 text-sm" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1.5 text-slate-500">Час</label>
                                <input type="time" className="w-full p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-indigo-500 text-sm" required />
                            </div>
                        </div>
                        <div>
                             <label className="block text-xs font-bold mb-1.5 text-slate-500">Місце народження</label>
                             <select className="w-full p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-indigo-500 text-sm">
                                 <option>Київ, Україна</option>
                                 <option>Львів, Україна</option>
                                 <option>Одеса, Україна</option>
                                 <option>Інше</option>
                             </select>
                        </div>
                        <button className="w-full py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-bold rounded-full mt-2 hover:shadow-lg hover:scale-[1.01] transition-all uppercase tracking-wider shadow-indigo-500/20 text-sm">
                            РОЗРАХУВАТИ КАРТУ
                        </button>
                    </form>
                </div>

                <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                    {calculated ? (
                        <div className="w-full h-full p-6 animate-fade-in flex flex-col items-center z-10">
                            <h4 className="font-serif text-lg mb-4 text-indigo-600 dark:text-indigo-400 font-bold">Натальна карта: {name}</h4>
                            <div className="w-full h-64 md:h-72 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={DATA}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={4}
                                            dataKey="value"
                                            cornerRadius={6}
                                        >
                                            {DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-24 h-24 border-2 border-slate-200 dark:border-slate-700 rounded-full opacity-50 flex items-center justify-center">
                                       <span className="text-3xl animate-spin-once">☉</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button className="px-5 py-2 border border-slate-300 dark:border-slate-600 rounded-full hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-500 font-bold text-[10px] uppercase transition-colors">Текстовий міф</button>
                                <button className="px-5 py-2 border border-slate-300 dark:border-slate-600 rounded-full hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-500 font-bold text-[10px] uppercase transition-colors">Міф картами Таро</button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 z-10">
                            <div className="text-5xl mb-3 animate-float">🪐</div>
                            <p className="font-serif text-base mb-2">Система Домів: Плацидус</p>
                            <p className="text-xs">Введіть дані для отримання космічного паспорту</p>
                        </div>
                    )}
                    
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5 pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};