import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronDown, MapPin, Clock } from 'lucide-react';

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

// Cities data grouped by region
const CITIES_DATA = {
    'Україна': [
        'Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро', 'Запоріжжя', 'Вінниця', 'Полтава',
        'Чернігів', 'Черкаси', 'Суми', 'Житомир', 'Хмельницький', 'Рівне', 'Івано-Франківськ',
        'Тернопіль', 'Луцьк', 'Ужгород', 'Чернівці', 'Кропивницький', 'Миколаїв', 'Херсон'
    ],
    'Європа': [
        'Варшава', 'Краків', 'Берлін', 'Мюнхен', 'Париж', 'Лондон', 'Рим', 'Мадрид',
        'Барселона', 'Амстердам', 'Брюссель', 'Відень', 'Прага', 'Будапешт', 'Бухарест',
        'Софія', 'Афіни', 'Стокгольм', 'Осло', 'Копенгаген', 'Гельсінкі', 'Дублін', 'Лісабон', 'Цюріх'
    ],
    'СНД': [
        'Москва', 'Санкт-Петербург', 'Мінськ', 'Кишинів', 'Тбілісі', 'Єреван', 'Баку', 'Астана', 'Ташкент'
    ],
    'Америка': [
        'Нью-Йорк', 'Лос-Анджелес', 'Чикаго', 'Маямі', 'Торонто', 'Ванкувер', 'Мехіко', 'Сан-Паулу', 'Буенос-Айрес'
    ],
    'Азія': [
        'Токіо', 'Пекін', 'Шанхай', 'Сеул', 'Сінгапур', 'Бангкок', 'Дубай', 'Тель-Авів', 'Стамбул', 'Делі'
    ],
    'Інші': [
        'Сідней', 'Мельбурн', 'Окленд', 'Каїр', 'Кейптаун', 'Найробі'
    ]
};

export const PersonalMyth: React.FC = () => {
    const [name, setName] = useState('');
    const [calculated, setCalculated] = useState(false);
    const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setCalculated(true);
    };

    // Filter cities based on search
    const filteredCities = Object.entries(CITIES_DATA).reduce((acc, [region, cities]) => {
        const filtered = cities.filter(city => 
            city.toLowerCase().includes(searchCity.toLowerCase())
        );
        if (filtered.length > 0) {
            acc[region] = filtered;
        }
        return acc;
    }, {} as Record<string, string[]>);

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
                        
                        {/* Date and Time in one row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold mb-1.5 text-slate-500">Дата</label>
                                <input type="date" className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-indigo-500 text-sm" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1.5 text-slate-500 flex items-center gap-1">
                                    <Clock size={12} /> Час
                                </label>
                                <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
                                    <select 
                                        value={hour}
                                        onChange={(e) => setHour(e.target.value)}
                                        className="flex-1 p-2 bg-transparent outline-none text-sm text-center appearance-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                        required
                                    >
                                        <option value="">--</option>
                                        {Array.from({ length: 24 }, (_, i) => (
                                            <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
                                        ))}
                                    </select>
                                    <span className="text-slate-400 font-bold text-lg">:</span>
                                    <select 
                                        value={minute}
                                        onChange={(e) => setMinute(e.target.value)}
                                        className="flex-1 p-2 bg-transparent outline-none text-sm text-center appearance-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                        required
                                    >
                                        <option value="">--</option>
                                        {Array.from({ length: 12 }, (_, i) => i * 5).map(m => (
                                            <option key={m} value={m.toString().padStart(2, '0')}>{m.toString().padStart(2, '0')}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Beautiful City Dropdown */}
                        <div className="relative">
                            <label className="block text-xs font-bold mb-1.5 text-slate-500 flex items-center gap-1">
                                <MapPin size={12} /> Місце народження
                            </label>
                            <div 
                                className={`w-full p-3.5 bg-white dark:bg-slate-900 border rounded-2xl cursor-pointer transition-all flex items-center justify-between ${cityDropdownOpen ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-800'}`}
                                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                            >
                                <span className={selectedCity ? 'text-slate-800 dark:text-white text-sm' : 'text-slate-400 text-sm'}>
                                    {selectedCity || 'Оберіть місто...'}
                                </span>
                                <ChevronDown size={18} className={`text-slate-400 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>

                            {/* Dropdown Panel */}
                            {cityDropdownOpen && (
                                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                                    {/* Search */}
                                    <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                                        <input 
                                            type="text"
                                            placeholder="Пошук міста..."
                                            value={searchCity}
                                            onChange={(e) => setSearchCity(e.target.value)}
                                            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none text-sm focus:ring-2 focus:ring-indigo-500/20"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    
                                    {/* Cities List */}
                                    <div className="max-h-64 overflow-y-auto">
                                        {Object.entries(filteredCities).map(([region, cities]) => (
                                            <div key={region}>
                                                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider sticky top-0">
                                                    {region}
                                                </div>
                                                {cities.map(city => (
                                                    <div
                                                        key={city}
                                                        className={`px-4 py-2.5 cursor-pointer transition-colors text-sm flex items-center gap-2 ${selectedCity === city ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                                                        onClick={() => {
                                                            setSelectedCity(city);
                                                            setCityDropdownOpen(false);
                                                            setSearchCity('');
                                                        }}
                                                    >
                                                        <MapPin size={14} className="text-slate-400" />
                                                        {city}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                        {Object.keys(filteredCities).length === 0 && (
                                            <div className="px-4 py-6 text-center text-slate-400 text-sm">
                                                Місто не знайдено
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="w-full py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-bold rounded-full mt-2 hover:shadow-lg hover:scale-[1.01] transition-all uppercase tracking-wider shadow-indigo-500/20 text-sm">
                            РОЗРАХУВАТИ КАРТУ
                        </button>
                    </form>
                </div>

                <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                    {calculated ? (
                        <div className="w-full h-full p-6 animate-fade-in flex flex-col items-center z-10">
                            <h4 className="text-lg mb-4 text-indigo-600 dark:text-indigo-400 font-bold">Натальна карта: {name}</h4>
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
                                            {DATA.map((_, index) => (
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
                            <p className="text-base mb-2">Система Домів: Плацидус</p>
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
