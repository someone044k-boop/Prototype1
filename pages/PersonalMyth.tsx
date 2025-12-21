import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Clock, Search } from 'lucide-react';

// Extended cities database with coordinates
const CITIES_DATA: Record<string, { name: string; country: string; lat: number; lng: number }[]> = {
    'Україна': [
        { name: 'Київ', country: 'UA', lat: 50.4501, lng: 30.5234 },
        { name: 'Львів', country: 'UA', lat: 49.8397, lng: 24.0297 },
        { name: 'Одеса', country: 'UA', lat: 46.4825, lng: 30.7233 },
        { name: 'Харків', country: 'UA', lat: 49.9935, lng: 36.2304 },
        { name: 'Дніпро', country: 'UA', lat: 48.4647, lng: 35.0462 },
        { name: 'Запоріжжя', country: 'UA', lat: 47.8388, lng: 35.1396 },
        { name: 'Вінниця', country: 'UA', lat: 49.2331, lng: 28.4682 },
        { name: 'Полтава', country: 'UA', lat: 49.5883, lng: 34.5514 },
        { name: 'Чернігів', country: 'UA', lat: 51.4982, lng: 31.2893 },
        { name: 'Черкаси', country: 'UA', lat: 49.4444, lng: 32.0598 },
        { name: 'Суми', country: 'UA', lat: 50.9077, lng: 34.7981 },
        { name: 'Житомир', country: 'UA', lat: 50.2547, lng: 28.6587 },
        { name: 'Хмельницький', country: 'UA', lat: 49.4229, lng: 26.9871 },
        { name: 'Рівне', country: 'UA', lat: 50.6199, lng: 26.2516 },
        { name: 'Івано-Франківськ', country: 'UA', lat: 48.9226, lng: 24.7111 },
        { name: 'Тернопіль', country: 'UA', lat: 49.5535, lng: 25.5948 },
        { name: 'Луцьк', country: 'UA', lat: 50.7593, lng: 25.3424 },
        { name: 'Ужгород', country: 'UA', lat: 48.6208, lng: 22.2879 },
        { name: 'Чернівці', country: 'UA', lat: 48.2921, lng: 25.9358 },
        { name: 'Кропивницький', country: 'UA', lat: 48.5079, lng: 32.2623 },
        { name: 'Миколаїв', country: 'UA', lat: 46.9750, lng: 31.9946 },
        { name: 'Херсон', country: 'UA', lat: 46.6354, lng: 32.6169 },
    ],
    'Європа': [
        { name: 'Варшава', country: 'PL', lat: 52.2297, lng: 21.0122 },
        { name: 'Краків', country: 'PL', lat: 50.0647, lng: 19.9450 },
        { name: 'Берлін', country: 'DE', lat: 52.5200, lng: 13.4050 },
        { name: 'Мюнхен', country: 'DE', lat: 48.1351, lng: 11.5820 },
        { name: 'Париж', country: 'FR', lat: 48.8566, lng: 2.3522 },
        { name: 'Лондон', country: 'GB', lat: 51.5074, lng: -0.1278 },
        { name: 'Рим', country: 'IT', lat: 41.9028, lng: 12.4964 },
        { name: 'Мадрид', country: 'ES', lat: 40.4168, lng: -3.7038 },
        { name: 'Барселона', country: 'ES', lat: 41.3851, lng: 2.1734 },
        { name: 'Амстердам', country: 'NL', lat: 52.3676, lng: 4.9041 },
        { name: 'Брюссель', country: 'BE', lat: 50.8503, lng: 4.3517 },
        { name: 'Відень', country: 'AT', lat: 48.2082, lng: 16.3738 },
        { name: 'Прага', country: 'CZ', lat: 50.0755, lng: 14.4378 },
        { name: 'Будапешт', country: 'HU', lat: 47.4979, lng: 19.0402 },
        { name: 'Бухарест', country: 'RO', lat: 44.4268, lng: 26.1025 },
        { name: 'Софія', country: 'BG', lat: 42.6977, lng: 23.3219 },
        { name: 'Афіни', country: 'GR', lat: 37.9838, lng: 23.7275 },
        { name: 'Стокгольм', country: 'SE', lat: 59.3293, lng: 18.0686 },
        { name: 'Осло', country: 'NO', lat: 59.9139, lng: 10.7522 },
        { name: 'Копенгаген', country: 'DK', lat: 55.6761, lng: 12.5683 },
        { name: 'Гельсінкі', country: 'FI', lat: 60.1699, lng: 24.9384 },
        { name: 'Дублін', country: 'IE', lat: 53.3498, lng: -6.2603 },
        { name: 'Лісабон', country: 'PT', lat: 38.7223, lng: -9.1393 },
        { name: 'Цюріх', country: 'CH', lat: 47.3769, lng: 8.5417 },
    ],
    'СНД': [
        { name: 'Москва', country: 'RU', lat: 55.7558, lng: 37.6173 },
        { name: 'Санкт-Петербург', country: 'RU', lat: 59.9311, lng: 30.3609 },
        { name: 'Мінськ', country: 'BY', lat: 53.9006, lng: 27.5590 },
        { name: 'Кишинів', country: 'MD', lat: 47.0105, lng: 28.8638 },
        { name: 'Тбілісі', country: 'GE', lat: 41.7151, lng: 44.8271 },
        { name: 'Єреван', country: 'AM', lat: 40.1792, lng: 44.4991 },
        { name: 'Баку', country: 'AZ', lat: 40.4093, lng: 49.8671 },
        { name: 'Астана', country: 'KZ', lat: 51.1694, lng: 71.4491 },
        { name: 'Ташкент', country: 'UZ', lat: 41.2995, lng: 69.2401 },
    ],
    'Америка': [
        { name: 'Нью-Йорк', country: 'US', lat: 40.7128, lng: -74.0060 },
        { name: 'Лос-Анджелес', country: 'US', lat: 34.0522, lng: -118.2437 },
        { name: 'Чикаго', country: 'US', lat: 41.8781, lng: -87.6298 },
        { name: 'Маямі', country: 'US', lat: 25.7617, lng: -80.1918 },
        { name: 'Торонто', country: 'CA', lat: 43.6532, lng: -79.3832 },
        { name: 'Ванкувер', country: 'CA', lat: 49.2827, lng: -123.1207 },
        { name: 'Мехіко', country: 'MX', lat: 19.4326, lng: -99.1332 },
        { name: 'Сан-Паулу', country: 'BR', lat: -23.5505, lng: -46.6333 },
        { name: 'Буенос-Айрес', country: 'AR', lat: -34.6037, lng: -58.3816 },
    ],
    'Азія': [
        { name: 'Токіо', country: 'JP', lat: 35.6762, lng: 139.6503 },
        { name: 'Пекін', country: 'CN', lat: 39.9042, lng: 116.4074 },
        { name: 'Шанхай', country: 'CN', lat: 31.2304, lng: 121.4737 },
        { name: 'Сеул', country: 'KR', lat: 37.5665, lng: 126.9780 },
        { name: 'Сінгапур', country: 'SG', lat: 1.3521, lng: 103.8198 },
        { name: 'Бангкок', country: 'TH', lat: 13.7563, lng: 100.5018 },
        { name: 'Дубай', country: 'AE', lat: 25.2048, lng: 55.2708 },
        { name: 'Тель-Авів', country: 'IL', lat: 32.0853, lng: 34.7818 },
        { name: 'Стамбул', country: 'TR', lat: 41.0082, lng: 28.9784 },
        { name: 'Делі', country: 'IN', lat: 28.7041, lng: 77.1025 },
        { name: 'Мумбаї', country: 'IN', lat: 19.0760, lng: 72.8777 },
        { name: 'Гонконг', country: 'HK', lat: 22.3193, lng: 114.1694 },
    ],
    'Океанія': [
        { name: 'Сідней', country: 'AU', lat: -33.8688, lng: 151.2093 },
        { name: 'Мельбурн', country: 'AU', lat: -37.8136, lng: 144.9631 },
        { name: 'Окленд', country: 'NZ', lat: -36.8509, lng: 174.7645 },
    ],
    'Африка': [
        { name: 'Каїр', country: 'EG', lat: 30.0444, lng: 31.2357 },
        { name: 'Кейптаун', country: 'ZA', lat: -33.9249, lng: 18.4241 },
        { name: 'Найробі', country: 'KE', lat: -1.2921, lng: 36.8219 },
        { name: 'Лагос', country: 'NG', lat: 6.5244, lng: 3.3792 },
    ],
};

export const PersonalMyth: React.FC = () => {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState<{ name: string; country: string; lat: number; lng: number } | null>(null);
    const [searchCity, setSearchCity] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [dateDisplay, setDateDisplay] = useState(''); // DD.MM.YYYY format for display

    // Handle date input with mask DD.MM.YYYY
    const handleDateInput = (value: string) => {
        // Remove all non-digits
        let digits = value.replace(/\D/g, '');
        
        // Limit to 8 digits (DDMMYYYY)
        digits = digits.slice(0, 8);
        
        // Auto-correct day
        if (digits.length >= 1) {
            const firstDigit = parseInt(digits[0], 10);
            if (firstDigit > 3) {
                digits = '0' + digits;
            }
        }
        if (digits.length >= 2) {
            const day = parseInt(digits.slice(0, 2), 10);
            if (day > 31) {
                digits = '31' + digits.slice(2);
            } else if (day === 0) {
                digits = '01' + digits.slice(2);
            }
        }
        
        // Auto-correct month
        if (digits.length >= 3) {
            const thirdDigit = parseInt(digits[2], 10);
            if (thirdDigit > 1) {
                digits = digits.slice(0, 2) + '0' + digits.slice(2);
            }
        }
        if (digits.length >= 4) {
            const month = parseInt(digits.slice(2, 4), 10);
            if (month > 12) {
                digits = digits.slice(0, 2) + '12' + digits.slice(4);
            } else if (month === 0) {
                digits = digits.slice(0, 2) + '01' + digits.slice(4);
            }
        }
        
        // Re-limit after auto-corrections
        digits = digits.slice(0, 8);
        
        // Format with dots
        let formatted = '';
        if (digits.length > 0) {
            formatted = digits.slice(0, 2);
        }
        if (digits.length > 2) {
            formatted += '.' + digits.slice(2, 4);
        }
        if (digits.length > 4) {
            formatted += '.' + digits.slice(4, 8);
        }
        
        setDateDisplay(formatted);
        
        // Convert to ISO format for internal state when complete
        if (digits.length === 8) {
            const day = digits.slice(0, 2);
            const month = digits.slice(2, 4);
            const year = digits.slice(4, 8);
            const yearNum = parseInt(year, 10);
            
            // Validate year range
            if (yearNum >= 1900 && yearNum <= 2025) {
                setBirthDate(`${year}-${month}-${day}`);
            } else {
                setBirthDate('');
            }
        } else {
            setBirthDate('');
        }
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = () => setCityDropdownOpen(false);
        if (cityDropdownOpen) {
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }
    }, [cityDropdownOpen]);

    // Filter cities based on search
    const filteredCities = Object.entries(CITIES_DATA).reduce((acc, [region, cities]) => {
        const filtered = cities.filter(city => 
            city.name.toLowerCase().includes(searchCity.toLowerCase())
        );
        if (filtered.length > 0) {
            acc[region] = filtered;
        }
        return acc;
    }, {} as Record<string, typeof CITIES_DATA[string]>);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { name, birthDate, time: `${hour}:${minute}`, city: selectedCity });
    };

    // Format date for display
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('uk-UA', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    return (
        <div className="w-full max-w-md mx-auto animate-fade-in">
            <div 
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl"
                style={{ boxShadow: '0 8px 40px -10px rgba(129, 140, 248, 0.25)' }}
            >
                <h3 className="text-base font-bold mb-5 text-slate-800 dark:text-white">Введіть дані народження</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-medium mb-1 text-slate-500">Ім'я</label>
                        <input 
                            type="text" 
                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-indigo-400 outline-none text-sm" 
                            placeholder="Іван" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                        />
                    </div>
                    
                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium mb-1 text-slate-500">Дата</label>
                            <input 
                                type="text"
                                inputMode="numeric"
                                placeholder="ДД.ММ.РРРР"
                                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-400 text-sm" 
                                value={dateDisplay}
                                onChange={(e) => handleDateInput(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1 text-slate-500 flex items-center gap-1">
                                <Clock size={11} /> Час
                            </label>
                            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1">
                                <select 
                                    value={hour}
                                    onChange={(e) => setHour(e.target.value)}
                                    className="flex-1 p-2 bg-transparent outline-none text-sm text-center appearance-none cursor-pointer"
                                >
                                    <option value="">--</option>
                                    {Array.from({ length: 24 }, (_, i) => (
                                        <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
                                    ))}
                                </select>
                                <span className="text-slate-400 font-bold">:</span>
                                <select 
                                    value={minute}
                                    onChange={(e) => setMinute(e.target.value)}
                                    className="flex-1 p-2 bg-transparent outline-none text-sm text-center appearance-none cursor-pointer"
                                >
                                    <option value="">--</option>
                                    {Array.from({ length: 60 }, (_, i) => (
                                        <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* City Dropdown */}
                    <div className="relative">
                        <label className="block text-xs font-medium mb-1 text-slate-500 flex items-center gap-1">
                            <MapPin size={11} /> Місце народження
                        </label>
                        <div 
                            className={`w-full p-3 bg-slate-50 dark:bg-slate-800 border rounded-xl cursor-pointer flex items-center justify-between ${cityDropdownOpen ? 'border-indigo-400' : 'border-slate-200 dark:border-slate-700'}`}
                            onClick={(e) => { e.stopPropagation(); setCityDropdownOpen(!cityDropdownOpen); }}
                        >
                            <span className={selectedCity ? 'text-slate-800 dark:text-white text-sm' : 'text-slate-400 text-sm'}>
                                {selectedCity ? `${selectedCity.name}, ${selectedCity.country}` : 'Оберіть місто...'}
                            </span>
                            <ChevronDown size={16} className={`text-slate-400 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {cityDropdownOpen && (
                            <div 
                                className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                                    <div className="relative">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input 
                                            type="text"
                                            placeholder="Пошук міста..."
                                            value={searchCity}
                                            onChange={(e) => setSearchCity(e.target.value)}
                                            className="w-full p-2 pl-8 bg-slate-50 dark:bg-slate-800 rounded-lg outline-none text-sm"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="max-h-56 overflow-y-auto">
                                    {Object.entries(filteredCities).map(([region, cities]) => (
                                        <div key={region}>
                                            <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-400 uppercase sticky top-0">
                                                {region}
                                            </div>
                                            {cities.map(city => (
                                                <div
                                                    key={`${city.name}-${city.country}`}
                                                    className={`px-3 py-2 cursor-pointer text-sm flex items-center justify-between ${selectedCity?.name === city.name ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                                    onClick={() => {
                                                        setSelectedCity(city);
                                                        setCityDropdownOpen(false);
                                                        setSearchCity('');
                                                    }}
                                                >
                                                    <span>{city.name}</span>
                                                    <span className="text-xs text-slate-400">{city.country}</span>
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

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold rounded-xl hover:opacity-90 transition-all uppercase tracking-wider text-xs mt-2"
                    >
                        Розрахувати
                    </button>
                </form>

                {/* Debug Info */}
                {(name || birthDate || hour || selectedCity) && (
                    <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5">
                        <div className="font-bold text-slate-600 dark:text-slate-400 mb-2 text-[10px] uppercase tracking-wider">Debug</div>
                        {name && (
                            <div className="flex justify-between">
                                <span className="text-slate-400">Ім'я:</span>
                                <span className="text-slate-700 dark:text-slate-300 font-medium">{name}</span>
                            </div>
                        )}
                        {birthDate && (
                            <div className="flex justify-between">
                                <span className="text-slate-400">Дата:</span>
                                <span className="text-slate-700 dark:text-slate-300 font-medium">{formatDate(birthDate)}</span>
                            </div>
                        )}
                        {(hour || minute) && (
                            <div className="flex justify-between">
                                <span className="text-slate-400">Час:</span>
                                <span className="text-slate-700 dark:text-slate-300 font-medium">{hour || '--'}:{minute || '--'}</span>
                            </div>
                        )}
                        {selectedCity && (
                            <div className="flex justify-between">
                                <span className="text-slate-400">Місце:</span>
                                <span className="text-slate-700 dark:text-slate-300 font-medium">{selectedCity.name}, {selectedCity.country}</span>
                            </div>
                        )}
                        {selectedCity && (
                            <div className="flex justify-between text-[10px]">
                                <span className="text-slate-400">Координати:</span>
                                <span className="text-slate-500">{selectedCity.lat.toFixed(4)}°, {selectedCity.lng.toFixed(4)}°</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
