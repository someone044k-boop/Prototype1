import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronRight, X, Clock, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PersonalMyth } from './PersonalMyth';

// Categories for sidebar
const categories = [
    { id: 'coins', label: 'sub_coins', path: '/workshop/coins' },
    { id: 'procedures', label: 'sub_proc', path: '/workshop/procedures' },
    { id: 'seals', label: 'sub_seals', path: '/workshop/seals' },
    { id: 'attributes', label: 'sub_attr', path: '/workshop/attributes' },
    { id: 'jewelry', label: 'sub_jewel', path: '/workshop/jewelry' },
    { id: 'myth', label: 'sub_myth', path: '/workshop/personal-myth' },
];

// Jewelry subcategories
const jewelryTypes = [
    { id: 'rings', label: 'Перстні сили', path: '/workshop/jewelry/rings' },
    { id: 'pendants', label: 'Підвіска бездоганності', path: '/workshop/jewelry/pendants' },
];

// Seal types
const sealTypes = [
    { id: 'seal_trad', label: 'Традиційна', path: '/workshop/seals/traditional' },
    { id: 'seal_gen', label: 'Загальна', path: '/workshop/seals/general' },
    { id: 'seal_oph', label: 'Змієносця', path: '/workshop/seals/ophiuchus' },
    { id: 'seal_bday', label: 'Дня народження', path: '/workshop/seals/birthday' },
    { id: 'seal_wealth', label: 'Багатства', path: '/workshop/seals/wealth' },
    { id: 'seal_elem', label: 'Стихій', path: '/workshop/seals/elements' },
];

// Data for Rings (5 items) with Rich Text descriptions
const RINGS_DATA: { id: string; title: string; price: string; image: string; description: React.ReactNode }[] = [
    { 
        id: 'ring1', 
        title: 'Перстень чорної кімнати', 
        price: '400 $', 
        image: '/Jewerly/blackring1.jpeg', 
        description: (
            <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                    Перстень із символом <strong className="text-slate-900 dark:text-white">темної сили</strong> підсилює життєву енергію, харизму та лідерські якості. Ідеальний для тих, хто прагне успіху та визнання.
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <img src="/Jewerly/blackring2.jpeg" alt="Чорний перстень 2" className="w-full h-32 object-cover rounded-xl shadow-lg" />
                    <img src="/Jewerly/blackring3.jpeg" alt="Чорний перстень 3" className="w-full h-32 object-cover rounded-xl shadow-lg" />
                </div>
            </div>
        )
    },
    { 
        id: 'ring2', 
        title: 'Перстень чорної кімнати', 
        price: '400 $', 
        image: '/Jewerly/greyring1.jpeg', 
        description: (
            <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                    Срібний перстень з <strong className="text-slate-900 dark:text-white">місячним каменем</strong> розвиває інтуїцію, захищає від негативу та гармонізує емоційний стан.
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <img src="/Jewerly/greyring2.png" alt="Сірий перстень 2" className="w-full h-32 object-cover rounded-xl shadow-lg" />
                    <img src="/Jewerly/greyring3.jpeg" alt="Сірий перстень 3" className="w-full h-32 object-cover rounded-xl shadow-lg" />
                </div>
            </div>
        )
    },
    { 
        id: 'ring3', 
        title: 'Перстень білої кімнати', 
        price: '400 $', 
        image: '/Jewerly/whitering1.jpeg', 
        description: (
            <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                    Потужний талісман для <strong className="text-slate-900 dark:text-white">воїнів духу</strong>. Додає сміливості, рішучості та допомагає долати перешкоди.
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <img src="/Jewerly/whitering2.jpeg" alt="Білий перстень 2" className="w-full h-32 object-cover rounded-xl shadow-lg" />
                    <img src="/Jewerly/whiteblack.jpg" alt="Білий та чорний" className="w-full h-32 object-cover rounded-xl shadow-lg" />
                </div>
            </div>
        )
    },
    { 
        id: 'ring4', 
        title: 'Перстень Абсолюта', 
        price: '600 $', 
        image: '/Jewerly/fullmaster.png', 
        description: (
            <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                    <strong className="text-indigo-600 dark:text-indigo-400">Королівський перстень</strong> успіху та процвітання. Відкриває шляхи до багатства, мудрості та духовного зростання.
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <img src="/Jewerly/4room.jpg" alt="Кімната майстра" className="w-full h-32 object-cover rounded-xl shadow-lg" />
                    <img src="/Jewerly/absolutwiev.jpg" alt="Абсолютний вигляд" className="w-full h-32 object-cover rounded-xl shadow-lg" />
                </div>
            </div>
        )
    },
];

// Data for Pendants (2 items) with Rich Text descriptions
const PENDANTS_DATA: { id: string; title: string; price: string; image: string; description: React.ReactNode }[] = [
    { 
        id: 'pendant1', 
        title: 'Підвіска бездоганності (для майстрів)', 
        price: '4000 $', 
        image: '/Jewerly/masterkulon.jpeg', 
        description: (
            <div className="space-y-4">
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-2xl border border-cyan-200 dark:border-cyan-800">
                    <p className="text-slate-700 dark:text-slate-300 mb-3">
                        <strong className="text-cyan-700 dark:text-cyan-400">Скорпіон, Телець, Діви, Овен, Козеріг, Близнюки, Стрілець, Лев, Риби, Водолій, Терези, Рак, Змієносець.</strong>
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 mb-3">
                        <strong className="text-indigo-600 dark:text-indigo-400">Юпітер, Нептун, Гея, Марс, Меркурій, Венера, Сатурн, Сонце, Місяць, Уран, Плутон.</strong>
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                        Відображення <strong className="text-slate-900 dark:text-white">цілісного геному людини</strong>. При носінні підвіски активізується складний комплекс біологічних процесів.<br/>
                        <span className="text-sm text-slate-500 dark:text-slate-400">Срібло, золото, дорогоцінне каміння, діамант.</span>
                    </p>
                </div>
                
                <p className="text-slate-700 dark:text-slate-300">
                    Вмикає у власника <strong className="text-slate-900 dark:text-white">всю генетичну матрицю</strong> та фіксує її у <strong className="text-indigo-600 dark:text-indigo-400">правильному стані</strong>. Також підвіска бездоганності синхронізує носія із першоджерелом <strong className="text-fuchsia-600 dark:text-fuchsia-400">(8 чакра)</strong>.
                </p>
                
                <p className="text-slate-700 dark:text-slate-300">
                    Таким чином, носій підвіски бездоганності постійно пов'язаний із первинними силами, які запаковуються у його генетичну матрицю <strong className="text-slate-900 dark:text-white">в міру необхідності</strong>. Зодіакальні символи впорядковують <strong className="text-amber-600 dark:text-amber-400">первинні сили, ініціюючи в енергетиці володаря еволюційні цикли</strong>.
                </p>
                
                <div className="bg-gradient-to-r from-indigo-50 to-fuchsia-50 dark:from-indigo-900/20 dark:to-fuchsia-900/20 p-4 rounded-2xl border-l-4 border-indigo-400">
                    <p className="text-slate-700 dark:text-slate-300">
                        Важливою властивістю підвіски бездоганності є те, що вона засвічує <strong className="text-indigo-600 dark:text-indigo-400">повний набір якостей</strong> у правильній послідовності.
                    </p>
                </div>
            </div>
        )
    },
    { 
        id: 'pendant2', 
        title: 'Кулон кола архетипів (для учнів)', 
        price: 'ціна договірна', 
        image: '/Jewerly/kulonstuden.png', 
        description: (
            <div className="space-y-4">
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-2xl border border-cyan-200 dark:border-cyan-800">
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                        <strong className="text-slate-900 dark:text-white">Ювелірний виріб.</strong><br/>
                        Символізує зв'язок із джерелом досконалих сил та принципів.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                        <strong className="text-cyan-700 dark:text-cyan-400">М'який зв'язок</strong> - вказує на можливість прояву бездоганності в людях та ситуаціях.<br/>
                        <strong className="text-cyan-700 dark:text-cyan-400">Жорсткий зв'язок</strong> - поєднує причини та наслідки бездоганним способом.<br/>
                        <strong className="text-indigo-600 dark:text-indigo-400">Бездоганність</strong> - це гармонія людської натури.
                    </p>
                </div>
                
                <p className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Кулон можна придбати учням, які пройшли програму 1-го та 2-го курсів.</strong> Він символізує повний набір якостей людини щодо процесів світу людей:
                </p>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl border-l-4 border-amber-400">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-1">
                        <span className="text-amber-500">✦</span>
                        Повний набір якостей в <strong className="text-slate-900 dark:text-white">інтимній сфері</strong>.
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <span className="text-amber-500">✦</span>
                        Повний набір якостей у <strong className="text-slate-900 dark:text-white">соціальних відносинах</strong>.
                    </div>
                </div>
                
                <p className="text-slate-700 dark:text-slate-300">
                    Кулон є маяком, що вказує на те, до чого має привести практика - стан майстра сили. А також являє собою точку опори для просунутих містичних практик:
                </p>
                <ul className="space-y-1 pl-4 text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                        <span className="text-indigo-500 mt-1">-</span>
                        <span>для виконання <strong className="text-indigo-600 dark:text-indigo-400">системної функції майстра</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-indigo-500 mt-1">-</span>
                        <span>для мистецтва <strong className="text-fuchsia-600 dark:text-fuchsia-400">підкорення сил</strong></span>
                    </li>
                </ul>
            </div>
        )
    },
];

// Data for Seals (6 items) with Rich Text descriptions
const SEALS_DATA: { id: string; title: string; price: string; image: string; imagePosition?: string; description: React.ReactNode }[] = [
    { 
        id: 'seal1', 
        title: 'Традиційна печатка', 
        price: '6500 грн', 
        image: '/sigil/traditionslsigil.jpg', 
        description: (
            <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Традиційна печатка на орган</strong> - це збір цілісності органу через проекцію <strong className="text-amber-600 dark:text-amber-400">12х сил</strong> на цей орган організму.
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                    Кожен прошарок є прояв <strong className="text-indigo-600 dark:text-indigo-400">зодіакальної якості</strong>. Кожен прошарок <strong>посилюється астрологічною силою</strong>. Вона наповнює зодіакальну якість.
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border-l-4 border-emerald-400">
                    <p className="text-slate-700 dark:text-slate-300">
                        <strong>Кожні 3 прошарка</strong> виникає сутність що схожа на <strong className="text-emerald-600 dark:text-emerald-400">змію або дракона</strong>, яка втілює розум стихії.
                    </p>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border-l-4 border-rose-400">
                    <p className="text-slate-700 dark:text-slate-300">
                        <strong>Після збірки 12 прошарків у органі виникає сутність Змієносця. Як вікно у потойбіччя.</strong>
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">(сутність Змієносця традиційно це символ Георгія Змієборця)</p>
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                    Всі ці сили використовуються для відновлення цілісної гармонії обраного органу.
                </p>
                
                {/* Organ seals by element */}
                <div className="space-y-3 mt-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            Печатка <strong className="text-emerald-700 dark:text-emerald-400">Скорпіона</strong> - Хребет.<br/>
                            Печатка <strong className="text-emerald-700 dark:text-emerald-400">Тельця</strong> - Тазові кістки та ноги.<br/>
                            Печатка <strong className="text-emerald-700 dark:text-emerald-400">Діви</strong> - сечостатева система.
                        </p>
                    </div>
                    <div className="bg-rose-50 dark:bg-rose-900/20 p-3 rounded-2xl border border-rose-200 dark:border-rose-800">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            Печатка <strong className="text-rose-700 dark:text-rose-400">Овна</strong> - Кишечник.<br/>
                            Печатка <strong className="text-rose-700 dark:text-rose-400">Козерога</strong> - органи травлення та сонячне сплетіння.<br/>
                            Печатка <strong className="text-rose-700 dark:text-rose-400">Близнюків</strong> - грудна клітина, серце та легені.
                        </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-2xl border border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            Печатка <strong className="text-amber-700 dark:text-amber-400">Стрільця</strong> - органи шиї, трахея та щитова залоза.<br/>
                            Печатка <strong className="text-amber-700 dark:text-amber-400">Лева</strong> - нижня щелепа, ротова порожнина та язик.<br/>
                            Печатка <strong className="text-amber-700 dark:text-amber-400">Риб</strong> - кістки черепу.
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-fuchsia-50 to-violet-50 dark:from-fuchsia-900/20 dark:to-violet-900/20 p-3 rounded-2xl border border-fuchsia-200 dark:border-fuchsia-800">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            Печатка <strong className="text-fuchsia-700 dark:text-fuchsia-400">Водолія</strong> - великі півкулі мозку<br/>
                            Печатка <strong className="text-fuchsia-700 dark:text-fuchsia-400">Терезів</strong> - таламус та нейромережі мозку<br/>
                            Печатка <strong className="text-fuchsia-700 dark:text-fuchsia-400">Рака</strong> - Зона моста, що поєднує головний та спинний мозок.
                        </p>
                    </div>
                </div>
                
            </div>
        )
    },
    { 
        id: 'seal2', 
        title: 'Загальна печатка', 
        price: '6500 грн', 
        image: '/sigil/sigil.jpg',
        imagePosition: 'object-[center_35%]',
        description: (
            <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                    <strong className="text-slate-900 dark:text-white">Є похідною від традиційної печатки майстра.</strong><br/>
                    <strong className="text-indigo-600 dark:text-indigo-400">Загальна печатка на 4 стихії</strong> - це скорочений збір цілісності енергетики людини.
                </p>
                
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 p-4 rounded-2xl border-l-4 border-rose-300">
                    <p className="font-bold text-rose-700 dark:text-rose-400 mb-2">Заповнюються:</p>
                    <ul className="space-y-2 pl-2">
                        <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                            Навички особистих стосунків.
                        </li>
                        <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                            Навички суспільного життя.
                        </li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-2xl border-l-4 border-amber-300">
                    <p className="font-bold text-amber-700 dark:text-amber-400 mb-2">Якщо людині вистачає особистих якостей печатка поширюється на простір життя:</p>
                    <ul className="space-y-2 pl-2">
                        <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            <em>Покращуються особисті стосунки у житті.</em>
                        </li>
                        <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            <em>Покращуються суспільні стосунки та бізнес справи</em>
                        </li>
                    </ul>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 text-center italic text-lg">
                    Ця печатка має мету <strong className="text-slate-900 dark:text-white">лікування суспільного життя людини</strong>.
                </p>
            </div>
        )
    },
    { 
        id: 'seal3', 
        title: 'Печатка Змієносця', 
        price: '6500грн', 
        image: '/sigil/snakesigil3.jpeg', 
        description: (
            <div className="space-y-4">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                    Є найскладнішим варіантом печатки майстра
                </p>
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-2xl border border-cyan-200 dark:border-cyan-800">
                    <p className="text-slate-700 dark:text-slate-300">
                        <strong className="text-cyan-700 dark:text-cyan-400">Печатка змієносця</strong> полягає у прямому впливі на <strong>8му чакру</strong>. Вплинути на 8му чакру можна лише <strong className="text-slate-900 dark:text-white">спрямувавши на неї бездоганні сили - астрологічні планети (алхімічні константи)</strong>.
                    </p>
                </div>
                <div className="space-y-3">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            На <strong className="text-indigo-700 dark:text-indigo-400">1 рівні практики</strong> це <strong>4 бездоганні першооснови</strong> - <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Юпітер, Марс, Сатурн, Пустотність</span>.
                        </p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            На <strong className="text-emerald-700 dark:text-emerald-400">2 рівні практики</strong> це <strong>4 ключі гармонії</strong> - <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Нептун, Меркурій, Сонце, Уран</span>.
                        </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-2xl border border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            На <strong className="text-amber-700 dark:text-amber-400">3 рівні практики</strong> це <strong>4 вікна бездоганності</strong> - <span className="text-amber-600 dark:text-amber-400 font-semibold">Гея, Венера, Місяць, Плутон</span>.
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-fuchsia-50 to-violet-50 dark:from-fuchsia-900/20 dark:to-violet-900/20 p-3 rounded-2xl border border-fuchsia-200 dark:border-fuchsia-800">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            На <strong className="text-fuchsia-700 dark:text-fuchsia-400">4 рівні практики</strong> у <strong>8му чакру проектуються всі бездоганні сили</strong>, як <span className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">цілісний набір</span>.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg" alt="The Magician" className="w-full h-40 object-cover rounded-xl shadow-lg" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Пам%27ятник_Юрію_Змієборцю_у_Львові.jpg/440px-Пам%27ятник_Юрію_Змієборцю_у_Львові.jpg" alt="Пам'ятник Юрію Змієборцю" className="w-full h-40 object-cover rounded-xl shadow-lg" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center">
                    Св. Георгій Змієборець — традиційний символ сутності Змієносця
                </p>
            </div>
        )
    },
    { 
        id: 'seal4', 
        title: 'Печатка на день народження', 
        price: '6500 грн', 
        image: '/sigil/birthdaysigil.jpeg', 
        description: (
            <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                    На день народження людини відкривається її <strong className="text-indigo-600 dark:text-indigo-400">канал матеріалізації</strong>. <strong className="text-slate-900 dark:text-white">Астрологічні сили</strong> стають у таке положення, яке близьке до моменту <strong>народження людини</strong>.
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                    Через канал народження людини стає доступним <strong className="text-slate-900 dark:text-white">осередок у світі духів із якого душа прийшла у матеріальну дійсність</strong>.<br/>
                    <strong className="text-cyan-600 dark:text-cyan-400">У той самий осередок душа повернеться після смерті.</strong>
                </p>
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-2xl border-2 border-cyan-300 dark:border-cyan-700">
                    <p className="font-bold text-cyan-700 dark:text-cyan-300 mb-2">🌟 Що формує печатка:</p>
                    <p className="text-slate-700 dark:text-slate-300">
                        <strong>Цілісність якостей реінкарнуючої душі людини</strong>.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 mt-2">
                        Ця печатка посилює <strong className="text-slate-900 dark:text-white">зв'язок із осередком у світі духів та канал матеріалізації через який матеріалізуються усі блага та події життя</strong>.
                    </p>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                    Печатка на день народження створює <strong className="text-slate-900 dark:text-white">глибокі духовні перетворення людини</strong>.
                </p>
                <div className="bg-gradient-to-r from-indigo-50 to-fuchsia-50 dark:from-indigo-900/20 dark:to-fuchsia-900/20 p-4 rounded-xl">
                    <p className="text-slate-700 dark:text-slate-300">
                        Застосування <strong className="text-indigo-600 dark:text-indigo-400">архетипів</strong> та <strong className="text-fuchsia-600 dark:text-fuchsia-400">бездоганних сил (сил астрології)</strong> переносить гармонію на матрицю душі за правилом безумовного благодіяння.
                    </p>
                </div>
            </div>
        )
    },
    { 
        id: 'seal5', 
        title: 'Печатка егрегора достатку', 
        price: '6500 грн', 
        image: '/sigil/moneysigil.jpeg', 
        description: (
            <div className="space-y-3">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-800">
                    <p className="font-bold text-amber-700 dark:text-amber-300 mb-2 uppercase tracking-wider text-sm">💰 Магічний інструмент достатку</p>
                    <p className="text-slate-700 dark:text-slate-300">
                        Печатка пов'язана із <strong className="text-amber-600 dark:text-amber-400">егрегором достатку</strong> та відкриває грошові потоки.
                    </p>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                        <span className="text-xl">🔓</span>
                        <p className="text-sm text-slate-700 dark:text-slate-300">Відкриває <strong>фінансові можливості</strong></p>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                        <span className="text-xl">🌊</span>
                        <p className="text-sm text-slate-700 dark:text-slate-300">Активує <strong>грошові потоки</strong></p>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                        <span className="text-xl">⚖️</span>
                        <p className="text-sm text-slate-700 dark:text-slate-300">Балансує <strong>матеріальну енергію</strong></p>
                    </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center">
                    Працює через виправлення деформацій монади у сфері достатку
                </p>
            </div>
        )
    },
    { 
        id: 'seal6', 
        title: 'Печатка 4х стихій', 
        price: '6500 грн', 
        image: '/sigil/4roomsigil.jpg', 
        description: (
            <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                    Ця печатка повторює процедуру <strong className="text-indigo-600 dark:text-indigo-400">екзаменацій навчання</strong>.
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                    Те що на екзаменації ми проходимо впродовж <strong>4х та більше зустрічей</strong>, виконується у пришвидшеному варіанті.<br/>
                    Майстер проектує на вас властивості еліти стихії - <strong className="text-slate-900 dark:text-white">Валета, Лицаря, Дами та Короля</strong>.
                </p>
                <div className="bg-gradient-to-r from-cyan-50 to-fuchsia-50 dark:from-cyan-900/20 dark:to-fuchsia-900/20 p-4 rounded-2xl border border-cyan-200 dark:border-cyan-800">
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                        <strong className="text-slate-900 dark:text-white">Поєднання еліти у групу створює у вашій природі складний зв'язок із стихією.</strong>
                    </p>
                </div>
                <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></span>
                        <p className="text-slate-700 dark:text-slate-300">
                            Має значення ваш природній зв'язок із стихією - <strong className="text-indigo-600 dark:text-indigo-400">ваш знак зодіаку</strong>.
                        </p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <span className="w-2 h-2 rounded-full bg-fuchsia-500 mt-2 flex-shrink-0"></span>
                        <p className="text-slate-700 dark:text-slate-300">
                            Має значення поточні обставини життя - <strong className="text-fuchsia-600 dark:text-fuchsia-400">печатка упорядковує стихію у вашому житті</strong> та упорядковує події життя.
                        </p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></span>
                        <p className="text-slate-700 dark:text-slate-300">
                            Має значення ваші особисті зусилля - <strong className="text-amber-600 dark:text-amber-400">чим більше навичок взаємодії зі стихією ви маєте, тим більше матеріалу печатки ви можете засвоїти</strong>.
                        </p>
                    </div>
                </div>
            </div>
        )
    },
];

// Data for Procedures (4 items)
const PROCEDURES_DATA = [
    { id: 'proc1', title: 'НАРОДЖЕННЯ', season: 'Весна', image: 'https://picsum.photos/400/400?random=40', description: 'Ритуал очищення від зимової стагнації. Пробуджує життєві сили та готує до нового циклу зростання.' },
    { id: 'proc2', title: 'ПРОБУДЖЕННЯ', season: 'Літо', image: 'https://picsum.photos/400/400?random=41', description: 'Процедура накопичення сонячної енергії. Максимально заряджає на весь рік вперед.' },
    { id: 'proc3', title: 'ПРОСВІТЛЕННЯ', season: 'Осінь', image: 'https://picsum.photos/400/400?random=42', description: 'Ритуал збору плодів та підготовки до внутрішньої роботи. Час підбиття підсумків.' },
    { id: 'proc4', title: 'ЕВОЛЮЦІЯ', season: 'Зима', image: 'https://picsum.photos/400/400?random=43', description: 'Глибоке занурення у внутрішній світ. Час для рефлексії та планування нового циклу.' },
];

// Data for Coins (12 items - zodiac)
const COINS_DATA = [
    { id: 'coin1', title: 'Монета Овна', zodiac: '♈', price: '1500 грн', image: 'https://picsum.photos/400/400?random=50', description: 'Монета першого знаку зодіаку. Дарує сміливість, ініціативність та енергію для нових починань.' },
    { id: 'coin2', title: 'Монета Тельця', zodiac: '♉', price: '1500 грн', image: 'https://picsum.photos/400/400?random=51', description: 'Монета стабільності та достатку. Притягує матеріальне благополуччя та надійність.' },
    { id: 'coin3', title: 'Монета Близнюків', zodiac: '♊', price: '1500 грн', image: 'https://picsum.photos/400/400?random=52', description: 'Монета комунікації та інтелекту. Покращує навички спілкування та навчання.' },
    { id: 'coin4', title: 'Монета Рака', zodiac: '♋', price: '1500 грн', image: 'https://picsum.photos/400/400?random=53', description: 'Монета дому та родини. Захищає сімейне вогнище та підсилює емоційні зв\'язки.' },
    { id: 'coin5', title: 'Монета Лева', zodiac: '♌', price: '1500 грн', image: 'https://picsum.photos/400/400?random=54', description: 'Монета творчості та самовираження. Дарує впевненість та харизму лідера.' },
    { id: 'coin6', title: 'Монета Діви', zodiac: '♍', price: '1500 грн', image: 'https://picsum.photos/400/400?random=55', description: 'Монета порядку та здоров\'я. Допомагає в організації життя та підтримці тіла.' },
    { id: 'coin7', title: 'Монета Терезів', zodiac: '♎', price: '1500 грн', image: 'https://picsum.photos/400/400?random=56', description: 'Монета гармонії та партнерства. Балансує стосунки та приносить справедливість.' },
    { id: 'coin8', title: 'Монета Скорпіона', zodiac: '♏', price: '1500 грн', image: 'https://picsum.photos/400/400?random=57', description: 'Монета трансформації та глибини. Відкриває таємниці та дарує силу відродження.' },
    { id: 'coin9', title: 'Монета Стрільця', zodiac: '♐', price: '1500 грн', image: 'https://picsum.photos/400/400?random=58', description: 'Монета пригод та мудрості. Розширює горизонти та приносить удачу в подорожах.' },
    { id: 'coin10', title: 'Монета Козерога', zodiac: '♑', price: '1500 грн', image: 'https://picsum.photos/400/400?random=59', description: 'Монета амбіцій та досягнень. Допомагає будувати кар\'єру та досягати цілей.' },
    { id: 'coin11', title: 'Монета Водолія', zodiac: '♒', price: '1500 грн', image: 'https://picsum.photos/400/400?random=60', description: 'Монета інновацій та свободи. Пробуджує оригінальність та незалежність мислення.' },
    { id: 'coin12', title: 'Монета Риб', zodiac: '♓', price: '1500 грн', image: 'https://picsum.photos/400/400?random=61', description: 'Монета інтуїції та духовності. Поглиблює зв\'язок з вищими силами та підсвідомістю.' },
];

export const Workshop: React.FC = () => {
    const location = useLocation();
    const { t } = useLanguage();
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const getLabel = (key: string) => t(key as any);

    // Scroll to top on navigation
    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [location.pathname]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedItem) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [selectedItem]);

    // Determine active category
    const getActiveState = () => {
        const path = location.pathname;
        let category: string | null = null;
        let subCategory: string | null = null;

        if (path.includes('/coins')) category = 'coins';
        else if (path.includes('/procedures')) category = 'procedures';
        else if (path.includes('/seals')) {
            category = 'seals';
            if (path.includes('/traditional')) subCategory = 'seal_trad';
            else if (path.includes('/general')) subCategory = 'seal_gen';
            else if (path.includes('/ophiuchus')) subCategory = 'seal_oph';
            else if (path.includes('/birthday')) subCategory = 'seal_bday';
            else if (path.includes('/wealth')) subCategory = 'seal_wealth';
            else if (path.includes('/elements')) subCategory = 'seal_elem';
            else subCategory = 'seal_trad';
        }
        else if (path.includes('/attributes')) category = 'attributes';
        else if (path.includes('/jewelry')) {
            category = 'jewelry';
            if (path.includes('/rings')) subCategory = 'rings';
            else if (path.includes('/pendants')) subCategory = 'pendants';
            else subCategory = 'rings';
        }
        else if (path.includes('/personal-myth')) category = 'myth';

        return { category, subCategory };
    };

    const { category: activeCategory, subCategory } = getActiveState();

    // Product Card Component - styled like Consultations
    const ProductCard: React.FC<{ item: any; index: number; showPrice?: boolean }> = ({ item, index, showPrice = true }) => (
        <div
            className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden group hover:border-indigo-300 dark:hover:border-indigo-700 h-full relative opacity-0 animate-fade-in card-lift"
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards', boxShadow: '0 8px 30px -5px rgba(129, 140, 248, 0.2)' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 25px 60px -10px rgba(129, 140, 248, 0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px -5px rgba(129, 140, 248, 0.2)'; }}
        >
            {/* Image Section */}
            <div 
                className="aspect-square overflow-hidden relative bg-slate-100 dark:bg-slate-800 cursor-pointer"
                onClick={() => setSelectedItem(item)}
            >
                <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img loading="lazy" src={item.image} alt={item.title} className={`w-full h-full object-cover ${item.imagePosition || 'object-top'} transition-transform duration-700 group-hover:scale-110`} />
                {item.zodiac && (
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 flex items-center justify-center text-amber-900 font-bold text-xl shadow-lg z-20">
                        {item.zodiac}
                    </div>
                )}
                {item.season && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 shadow-lg z-20">
                        {item.season}
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-3 flex-1 flex flex-col items-center text-center">
                <h3 className="text-lg font-bold mb-1 text-slate-800 dark:text-white leading-tight min-h-[2.5rem] flex items-center justify-center">{item.title}</h3>
                
                {showPrice && item.price && (
                    <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600 dark:from-indigo-400 dark:to-fuchsia-400 mb-3">
                        {item.price}
                    </div>
                )}
                
                <div className="mt-auto w-full">
                    <button
                        onClick={() => setSelectedItem(item)}
                        className="w-full py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-600 hover:text-white dark:hover:text-white shadow-lg hover:shadow-indigo-500/30"
                    >
                        ДЕТАЛЬНІШЕ
                    </button>
                </div>
            </div>
        </div>
    );

    // Modal Component - styled like Consultations
    const Modal = () => {
        if (!selectedItem) return null;
        return (
            <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
                onClick={(e) => { if (e.target === e.currentTarget) setSelectedItem(null); }}
            >
                <div className="bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[95vh] rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/20 dark:border-slate-700 relative animate-fade-in">
                    
                    {/* Close Button */}
                    <button 
                        onClick={() => setSelectedItem(null)} 
                        className="absolute top-4 right-4 z-50 p-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-full text-slate-800 dark:text-white hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                        <X size={24} />
                    </button>

                    {/* Modal Image (Left Side) */}
                    <div className="w-full md:w-1/3 h-48 md:h-auto relative hidden md:block group">
                        <img loading="lazy" src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                            <h3 className="text-white text-3xl font-bold mb-3 leading-tight drop-shadow-lg">{selectedItem.title}</h3>
                            {selectedItem.price && <p className="text-indigo-200 text-lg font-medium">{selectedItem.price}</p>}
                            {selectedItem.zodiac && <p className="text-amber-300 text-4xl mt-2">{selectedItem.zodiac}</p>}
                        </div>
                    </div>

                    {/* Modal Content (Right Side) */}
                    <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col relative bg-white dark:bg-slate-900">
                        {/* Mobile Header */}
                        <div className="md:hidden mb-6">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{selectedItem.title}</h2>
                            {selectedItem.price && <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{selectedItem.price}</div>}
                        </div>

                        {/* Description */}
                        <div className="text-slate-600 dark:text-slate-300 mb-8 font-medium text-base leading-relaxed">
                            {selectedItem.description}
                        </div>
                        
                        {/* Footer */}
                        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex-1 w-full">
                                <p className="text-xs text-slate-400">Для замовлення зв'яжіться з майстром через Telegram.</p>
                            </div>
                            <a 
                                href="https://t.me/dobrevk" 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 ring-4 ring-indigo-50 dark:ring-slate-800"
                            >
                                <Send size={18} /> ЗАМОВИТИ
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render Jewelry - all items with section headers
    const renderJewelry = () => (
        <div className="animate-fade-in space-y-12">
            {/* Rings Section */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white uppercase tracking-widest">
                    Перстні сили
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                    {RINGS_DATA.map((item, i) => <ProductCard key={item.id} item={item} index={i} />)}
                </div>
            </div>

            {/* Pendants Section */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white uppercase tracking-widest">
                    Підвіска бездоганності
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {PENDANTS_DATA.map((item, i) => <ProductCard key={item.id} item={item} index={i + 5} />)}
                </div>
            </div>
        </div>
    );

    // Render Seals - only cards, detailed content in modal
    const renderSeals = () => (
        <div className="animate-fade-in space-y-10 max-w-5xl mx-auto">
            {/* Intro content */}
            <div className="space-y-8">
                {/* Section 1 - Main intro with mandala */}
                <div className="flex flex-col md:flex-row gap-8 items-start opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                    <div className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0 mx-auto md:mx-0 rounded-full" style={{ boxShadow: '0 10px 40px -10px rgba(129, 140, 248, 0.3)' }}>
                        <img src="/sigil/sigil1.webp" alt="Мандала" className="w-full h-full object-contain drop-shadow-xl animate-spin-once" />
                    </div>
                    <div className="space-y-4 flex-1">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed opacity-0 animate-fade-in translate-x-4" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                            <strong className="text-slate-900 dark:text-white">Практика печатки майстра - це традиційна практика.</strong><br/>
                            За традицією учень має пройти навчання у майстрів <strong className="text-indigo-600 dark:text-indigo-400">12 сил</strong> та отримати <strong className="text-slate-900 dark:text-white">печатку кожного майстра</strong>. Учень сам стає майстром, коли поєднує всередині себе все те що отримав від учителів.
                        </p>
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl border-l-4 border-amber-400 opacity-0 animate-fade-in" style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}>
                            <p className="text-slate-700 dark:text-slate-300">
                                Даний проект створений <strong className="text-amber-700 dark:text-amber-400">майстром Водолієм</strong>. Який може надавати печатку власної сили - <strong className="text-slate-900 dark:text-white">Пустоти</strong> (асцедент у натальній карті).
                            </p>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                            Кожен майстер вкладає <strong className="text-slate-900 dark:text-white">власне розуміння</strong> у печатку, застосовує <strong className="text-fuchsia-600 dark:text-fuchsia-400">власне мистецтво</strong> та <strong className="text-indigo-600 dark:text-indigo-400">звертається до бездоганних сил</strong>, щоб відтиснути печатку власної сили на іншій людині.<br/>
                            <strong className="text-slate-900 dark:text-white">Майстер може надати силу та сконфігурувати її у печатку.</strong> Але людина має сама <strong className="text-cyan-600 dark:text-cyan-400">навчатися</strong> та <strong className="text-emerald-600 dark:text-emerald-400">упорядковувати містичний досвід</strong>, який отримує. У цьому і полягає власне духовне життя.
                        </p>
                    </div>
                </div>

                {/* Section 2 - 8th chakra with fire mandala */}
                <div className="flex flex-col md:flex-row-reverse gap-8 items-start opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                    <div className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0 mx-auto md:mx-0 rounded-full overflow-hidden shadow-2xl aspect-square" style={{ boxShadow: '0 10px 40px -10px rgba(129, 140, 248, 0.3)' }}>
                        <img src="/sigil/1sigil.jpg" alt="Мандала" className="w-full h-full object-cover scale-110 animate-spin-once" style={{ animationDelay: '400ms' }} />
                    </div>
                    <div className="space-y-4 flex-1">
                        <div className="bg-gradient-to-r from-cyan-50 to-fuchsia-50 dark:from-cyan-900/20 dark:to-fuchsia-900/20 p-5 rounded-2xl border border-cyan-200 dark:border-cyan-800 opacity-0 animate-fade-in" style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                <strong className="text-cyan-700 dark:text-cyan-400">Практика печатки майстра</strong> - це синтез матерії <strong className="text-fuchsia-600 dark:text-fuchsia-400">8ї чакри</strong> у енергетиці іншої людини.<br/>
                                В залежності від <strong className="text-slate-900 dark:text-white">техніки, особливостей людини</strong> та <strong className="text-slate-900 dark:text-white">обставин</strong> - сили відкладають певний матеріал <strong className="text-fuchsia-600 dark:text-fuchsia-400">8ї чакри</strong> та певні властивості.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm opacity-0 animate-fade-in" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
                            <p className="text-slate-700 dark:text-slate-300">
                                <strong className="text-slate-900 dark:text-white">Кожна печатка створює цілісність.</strong><br/>
                                Деякі техніки ініціюють <strong className="text-indigo-600 dark:text-indigo-400">8 чакру</strong>, розкривають та посилюють цілісність людини.
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 p-4 rounded-2xl border-l-4 border-indigo-400 opacity-0 animate-fade-in" style={{ animationDelay: '850ms', animationFillMode: 'forwards' }}>
                            <p className="text-slate-700 dark:text-slate-300">
                                <strong className="text-indigo-700 dark:text-indigo-400">Спрощене мистецтво</strong> - збирає цілісність із <strong>4х стихій</strong>.<br/>
                                <strong className="text-violet-700 dark:text-violet-400">Детальне мистецтво</strong> - збирає цілісність із <strong>12 архетипів</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 3 - Egregors and deformations */}
                <div className="text-center space-y-3 opacity-0 animate-fade-in" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
                    <p className="text-slate-700 dark:text-slate-300 text-lg">
                        Іноді печатку можна пов'язати із егрегором <strong className="text-amber-600 dark:text-amber-400">(егрегор достатку)</strong>.<br/>
                        Іноді через печатку можна виправити складні <strong className="text-rose-600 dark:text-rose-400">деформації монади</strong>.
                    </p>
                </div>

                {/* Section 4 - School examination */}
                <div className="flex flex-col md:flex-row gap-6 items-center opacity-0 animate-fade-in" style={{ animationDelay: '1150ms', animationFillMode: 'forwards' }}>
                    <div className="w-80 h-64 md:w-[28rem] md:h-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl group">
                        <img src="/sigil/examsigil.jpg" alt="Екзаменація" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <p className="text-slate-700 dark:text-slate-300 mb-3">
                            <strong className="text-slate-900 dark:text-white">Екзаменація у Школі Архетипів</strong> - це процедура відтиску печатки відповідного профілю:
                        </p>
                        <ul className="space-y-2 pl-4">
                            <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <strong>Цілісна людина</strong>
                            </li>
                            <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <strong>Герой, суспільний діяч</strong>
                            </li>
                            <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                <strong>Маг стихії</strong>
                            </li>
                            <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <span className="w-2 h-2 rounded-full bg-pink-300"></span>
                                <strong>Майстер сили</strong>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Title before cards */}
                <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 dark:text-white uppercase tracking-widest pt-4 opacity-0 animate-fade-in" style={{ animationDelay: '1300ms', animationFillMode: 'forwards' }}>
                    Види печатки
                </h2>
            </div>

            {/* Seal cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {SEALS_DATA.map((item, i) => <ProductCard key={item.id} item={item} index={i} />)}
            </div>
        </div>
    );

    // Seasonal procedures data with full descriptions
    const seasonalProcedures = [
        {
            id: 'winter',
            date: '19-23 грудня',
            title: 'ЕВОЛЮЦІЯ',
            window: 'четверте вікно бездоганності',
            color: 'from-white to-slate-50 dark:from-slate-800 dark:to-slate-700',
            borderColor: 'border-slate-200 dark:border-slate-600',
            textColor: 'text-slate-700 dark:text-slate-300',
            position: 'top',
            description: 'Зимове сонцестояння відкриває <strong>четверте вікно бездоганності - ЕВОЛЮЦІЯ</strong>. У цей період працює камертон який вмикає <strong>механізми еволюції</strong>. Він штовхає вас до <strong>набору нових якостей</strong>. За допомогою цього камертону ми всі дивимось у наступний рік як на <strong>простір набору нових якостей</strong>.',
        },
        {
            id: 'spring',
            date: '20-23 березня',
            title: 'НАРОДЖЕННЯ',
            window: 'перше вікно бездоганності',
            color: 'from-rose-100 to-orange-100 dark:from-rose-900/30 dark:to-orange-900/30',
            borderColor: 'border-rose-200 dark:border-rose-700',
            textColor: 'text-rose-700 dark:text-rose-300',
            position: 'right',
            description: 'Весняне рівнодення відкриває <strong>перше вікно бездоганності - НАРОДЖЕННЯ</strong>. У цей період працює камертон який вмикає <strong>статеву (червону) енергію</strong> та всі Ваші <strong>генетичні програми</strong>. Він дозволяє Вам реалізувати усі свої особливі властивості та таланти. За допомогою цього камертону ми всі <strong>намагаємося утворити щось нове у своєму житті, що покращить наше життя впродовж всього року</strong>.',
        },
        {
            id: 'autumn',
            date: '20-23 вересня',
            title: 'ПРОСВІТЛЕННЯ',
            window: 'третє вікно бездоганності',
            color: 'from-pink-50 to-violet-50 dark:from-pink-900/20 dark:to-violet-900/20',
            borderColor: 'border-violet-100 dark:border-violet-700',
            textColor: 'text-violet-700 dark:text-violet-300',
            position: 'left',
            description: 'Осіннє рівнодення відкриває <strong>третє вікно бездоганності - ПРОСВІТЛЕННЯ</strong>. У цей період працює камертон який вмикає <strong>розум</strong> та всі Ваші <strong>програми підсвідомості</strong>. Він відчищає програми поведінки та світобачення через які ви взаємодієте із об\'єктивною дійсністю. <strong>За допомогою цього камертону ми збільшуємо прибуток у житті та утворення життєвої сили, що потрібна для повсякденних справ</strong>.',
            note: 'Особливість нашої біосфери вимагає додаткових зусиль для синхронізації із цим камертоном. Тому більшість людей не встигають самостійно синхронізуватись із цим вікном бездоганності. У цей період потрібно більше зусиль майстра на те щоб поєднати Вас із камертоном 3го вікна бездоганності.',
        },
        {
            id: 'summer',
            date: '19-23 червня',
            title: 'ПРОБУДЖЕННЯ',
            window: 'друге вікно бездоганності',
            color: 'from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30',
            borderColor: 'border-emerald-200 dark:border-emerald-700',
            textColor: 'text-emerald-700 dark:text-emerald-300',
            position: 'bottom',
            description: 'Літнє сонцестояння відкриває <strong>друге вікно бездоганності - ПРОБУДЖЕННЯ</strong>. У цей період працює камертон який вмикає <strong>почуття та збільшує глибину ваших взаємодій у суспільстві</strong>. Він збільшує вашу вагу та вплив у суспільстві завдяки вагомості почуттів які є навколо вас та у ваших справах. <strong>За допомогою цього камертону ми збільшуємо добробут у своєму житті що дозволяє нам знайти нові сенси життя (пробудитись та сформувати нові цілі)</strong>.',
        },
    ];

    // State for mandala visibility animation
    const [mandalaVisible, setMandalaVisible] = useState(false);
    const mandalaRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for mandala
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setMandalaVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (mandalaRef.current) {
            observer.observe(mandalaRef.current);
        }

        return () => observer.disconnect();
    }, [activeCategory]);

    // Render Procedures - elegant seasonal layout with mandala center
    const renderProcedures = () => (
        <div>
            {/* Header Section */}
            <div className="max-w-4xl mx-auto mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                    <span className="text-indigo-600 dark:text-indigo-400">ВІКНА БЕЗДОГАННОСТІ</span>
                    <span className="text-slate-300 dark:text-slate-600 mx-3">|</span>
                    <span className="text-slate-600 dark:text-slate-400">КОЛЕСО РОКУ</span>
                </h2>
                
                <div className="space-y-4">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-justify opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                        Традиційно язичницькі культи різних культур святкують <strong className="text-slate-900 dark:text-white">літнє | зимове сонцестояння</strong> та <strong className="text-slate-900 dark:text-white">весняне | осіннє рівнодення</strong>. Сезонні процедури пов'язані саме з цими циклами року. З точки зору <strong className="text-indigo-600 dark:text-indigo-400">західної алхімії</strong> протягом року в біосфері відкривається <strong className="text-slate-900 dark:text-white">4 вікна бездоганності</strong> — в яких виникає <strong className="text-indigo-600 dark:text-indigo-400">камертон гармонії людської натури</strong>.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-justify opacity-0 animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                        Цей камертон <strong className="text-slate-900 dark:text-white">впливає на кожну людину</strong>, але для того щоб вірно запакувати бездоганні сили у Вашу матрицю душі <strong className="text-slate-900 dark:text-white">потрібен майстер</strong> — який синхронізує Вас із камертоном у біосфері. Під час процедури майстер використовує <strong className="text-indigo-600 dark:text-indigo-400">інструменти алхімії</strong> — коло архетипів, карти таро, руни та астрологічні сили — щоб поєднати вас із камертоном людської гармонії та посилити резонанс сил.
                    </p>
                </div>
                
                {/* Scroll down chevrons - показуються поки не прокрутили */}
                <div className={`flex flex-col items-center mt-8 opacity-0 animate-fade-in transition-all duration-500 ${mandalaVisible ? 'hidden' : ''}`} style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
                    <div className="animate-bounce-slow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-24 text-indigo-500 dark:text-indigo-400 animate-chevron-wave" style={{ animationDelay: '0s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-24 text-indigo-500 dark:text-indigo-400 animate-chevron-wave -mt-6" style={{ animationDelay: '0.3s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-24 text-indigo-500 dark:text-indigo-400 animate-chevron-wave -mt-6" style={{ animationDelay: '0.6s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Order Button - з'являється після прокрутки */}
                <div className={`flex flex-col items-center mt-8 transition-all duration-500 ${mandalaVisible ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    <a 
                        href="https://t.me/dobrevk" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500 text-white font-bold rounded-full hover:scale-105 transition-all uppercase tracking-wider text-sm ring-4 ring-indigo-100 dark:ring-indigo-900/50"
                        style={{ boxShadow: '0 10px 40px -5px rgba(129, 140, 248, 0.5), 0 4px 20px -2px rgba(192, 132, 252, 0.4)' }}
                    >
                        <Send size={20} />
                        ЗАМОВИТИ СЕЗОННУ ПРОЦЕДУРУ
                    </a>
                </div>
            </div>

            {/* Desktop Layout - Cross pattern with mandala center */}
            <div ref={mandalaRef} className="hidden lg:block relative max-w-6xl mx-auto mb-32" style={{ minHeight: '1050px' }}>
                {/* Center Mandala */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 z-20 transition-opacity duration-500 ${mandalaVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-full h-full rounded-full snake-border-round overflow-hidden shadow-xl flex items-center justify-center">
                        <img src="/infinity coins/infynityWP.webp" alt="Infinity" className={`w-[105%] h-[105%] object-cover drop-shadow-xl ${mandalaVisible ? 'animate-spin-once' : ''}`} />
                    </div>
                </div>

                {/* Top - Winter (White) */}
                <div className={`absolute top-10 left-1/2 w-[520px] ${mandalaVisible ? 'opacity-0 animate-slide-from-top' : 'opacity-0'}`} style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                    <div className="rounded-3xl gradient-border-winter shadow-lg">
                        <div className={`bg-gradient-to-br ${seasonalProcedures[0].color} rounded-3xl p-8`}>
                            <div className={`text-center font-bold text-sm mb-3 ${seasonalProcedures[0].textColor}`}>{seasonalProcedures[0].date}</div>
                            <div className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: seasonalProcedures[0].description }} />
                        </div>
                    </div>
                    {/* Connector line */}
                    <div className="w-1 h-20 bg-gradient-to-b from-slate-500 to-indigo-400 mx-auto rounded-full"></div>
                </div>

                {/* Right - Spring (Rose-Orange) */}
                <div className={`absolute top-1/2 -right-24 w-[520px] ${mandalaVisible ? 'opacity-0 animate-slide-from-right' : 'opacity-0'}`} style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                    <div className="flex items-center">
                        <div className="w-20 h-1 bg-gradient-to-r from-indigo-400 to-rose-500 rounded-full"></div>
                        <div className="rounded-3xl gradient-border-spring shadow-lg flex-1">
                            <div className={`bg-gradient-to-br ${seasonalProcedures[1].color} rounded-3xl px-8 py-6`}>
                                <div className={`text-center font-bold text-sm mb-2 ${seasonalProcedures[1].textColor}`}>{seasonalProcedures[1].date}</div>
                                <div className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: seasonalProcedures[1].description }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left - Autumn (Pink-Violet) */}
                <div className={`absolute top-1/2 -left-24 w-[520px] ${mandalaVisible ? 'opacity-0 animate-slide-from-left' : 'opacity-0'}`} style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                    <div className="flex items-center">
                        <div className="rounded-3xl gradient-border-autumn shadow-lg flex-1">
                            <div className={`bg-gradient-to-br ${seasonalProcedures[2].color} rounded-3xl px-8 py-3`}>
                                <div className={`text-center font-bold text-sm mb-2 ${seasonalProcedures[2].textColor}`}>{seasonalProcedures[2].date}</div>
                                <div className="text-slate-700 dark:text-slate-200 text-sm leading-snug text-justify" dangerouslySetInnerHTML={{ __html: seasonalProcedures[2].description }} />
                                {seasonalProcedures[2].note && (
                                    <div className="mt-2 pt-2 border-t border-violet-200/50 dark:border-violet-600/50">
                                        <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-snug">{seasonalProcedures[2].note}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-20 h-1 bg-gradient-to-l from-indigo-400 to-violet-500 rounded-full"></div>
                    </div>
                </div>

                {/* Bottom - Summer (Emerald-Cyan) */}
                <div className={`absolute bottom-0 left-1/2 w-[520px] ${mandalaVisible ? 'opacity-0 animate-slide-from-bottom' : 'opacity-0'}`} style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                    {/* Connector line */}
                    <div className="w-1 h-20 bg-gradient-to-t from-emerald-500 to-indigo-400 mx-auto rounded-full"></div>
                    <div className="rounded-3xl gradient-border-summer shadow-lg">
                        <div className={`bg-gradient-to-br ${seasonalProcedures[3].color} rounded-3xl p-8`}>
                            <div className={`text-center font-bold text-sm mb-3 ${seasonalProcedures[3].textColor}`}>{seasonalProcedures[3].date}</div>
                            <div className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: seasonalProcedures[3].description }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet Layout - Vertical stack */}
            <div className="lg:hidden space-y-6 max-w-lg mx-auto">
                {/* Mandala */}
                <div className="flex justify-center mb-8">
                    <div className="w-32 h-32 rounded-full snake-border-round p-2 shadow-xl">
                        <img src="/mandala.png" alt="Mandala" className="w-full h-full object-contain animate-spin-slow" />
                    </div>
                </div>

                {seasonalProcedures.map((proc, i) => (
                    <div 
                        key={proc.id}
                        className={`bg-gradient-to-br ${proc.color} rounded-3xl p-6 border-2 ${proc.borderColor} shadow-lg opacity-0 animate-fade-in`}
                        style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}
                    >
                        <div className={`text-center font-bold text-sm mb-3 ${proc.textColor}`}>{proc.date}</div>
                        <div className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: proc.description }} />
                        {proc.note && (
                            <div className="mt-4 pt-4 border-t border-current/20">
                                <p className="text-xs text-slate-600 dark:text-slate-400 italic">{proc.note}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    // Render Attributes (1 horizontal card with mandala)
    // Render Attributes - горизонтальна картка з мандалою
    const renderAttributes = () => (
        <div className="animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <div
                    className="snake-border-round bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden group card-lift flex flex-col md:flex-row shadow-lg"
                    style={{ boxShadow: '0 8px 30px -5px rgba(129, 140, 248, 0.2)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 25px 60px -10px rgba(129, 140, 248, 0.4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px -5px rgba(129, 140, 248, 0.2)'; }}
                >
                    {/* Mandala Image - Left side */}
                    <div className="w-full md:w-2/5 aspect-square md:aspect-auto overflow-hidden relative bg-gradient-to-br from-indigo-50 to-fuchsia-50 dark:from-slate-800 dark:to-indigo-950 flex items-center justify-center p-10 md:p-12">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-fuchsia-500/5 to-indigo-500/5"></div>
                        <img src="/mandala.png" alt={t('mandala_title')} className="w-full h-full object-contain drop-shadow-2xl max-w-[280px] relative z-10" />
                    </div>
                    {/* Content - Right side */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 dark:text-white">{t('mandala_title')}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-base mb-6 leading-relaxed">
                            {t('mandala_desc')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">2000 {t('currency')}</div>
                            <a href="https://t.me/dobrevk" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-full font-bold shadow-lg hover:shadow-indigo-500/50 hover:scale-105 transition-all uppercase tracking-wider text-sm">
                                <Send size={16} /> {t('order_btn')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render Coins - новий layout з зодіакальним колесом
    const renderCoins = () => {
        // Zodiac symbols for outer ring
        const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
        
        return (
            <div className="animate-fade-in space-y-12">
                {/* Rich Text Description - Техніка медитації */}
                <div className="max-w-5xl mx-auto">
                    {/* Main gradient block */}
                    <div className="bg-gradient-to-r from-cyan-100 via-fuchsia-50 to-amber-100 dark:from-cyan-900/30 dark:via-fuchsia-900/20 dark:to-amber-900/30 rounded-3xl p-8 md:p-10 shadow-lg">
                        {/* Title */}
                        <h3 className="text-center text-lg md:text-xl font-bold mb-6">
                            <span className="text-indigo-600 dark:text-indigo-400">{t('coins_title')}</span>
                            <span className="text-slate-400 mx-2">|</span>
                            <span className="text-slate-700 dark:text-slate-300">{t('coins_meditation')}</span>
                        </h3>

                        {/* Intro paragraph */}
                        <p className="text-center text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                            Медитація на монету нескінченності - створює у середньому мозку <strong className="text-slate-900 dark:text-white">камертон</strong>, що резонує із фізичним принципом (астрологічною планетою). <strong className="text-cyan-700 dark:text-cyan-400">Цей камертон є один із принципів життєдіяльності людини.</strong>
                        </p>

                        {/* Instruction block */}
                        <div className="bg-white/70 dark:bg-slate-800/70 rounded-2xl p-6 mb-6 border border-slate-200/50 dark:border-slate-700/50">
                            <p className="text-center font-bold text-slate-800 dark:text-white mb-4">
                                Ви маєте створити образи великих арканів у великих півкулях головного мозку:
                            </p>
                            <div className="space-y-2 text-center text-slate-700 dark:text-slate-300">
                                <p>
                                    Аркани <strong className="text-indigo-600 dark:text-indigo-400">з 1 по 12 слід</strong> поміщати (проекція) <strong className="text-cyan-600 dark:text-cyan-400">ліву півкулю як причину</strong> архетипічної сили.
                                </p>
                                <p>
                                    Аркани <strong className="text-indigo-600 dark:text-indigo-400">з 22 по 12 слід</strong> поміщати (проекція) у <strong className="text-fuchsia-600 dark:text-fuchsia-400">праву півкулю як наслідок</strong> архетипічної сили.
                                </p>
                            </div>
                        </div>

                        {/* Middle paragraph */}
                        <p className="text-center text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                            Під час медитації ви маєте упорядкувати зміст середнього мозку поки в ньому не утвориться камертон сили відповідної планети. <strong className="text-slate-900 dark:text-white">Камертон відчувається як жива сутність,</strong> оскільки він є принципом життєдіяльності вашого тіла. Він наповнить вашу голову та буде наповнювати органи тіла, відновлюючи в них гармонію.
                        </p>

                        {/* Bottom section title */}
                        <div className="text-center mb-6">
                            <p className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-sm">
                                Камертонну силу що була утворена в середньому мозку можна витрачати на:
                            </p>
                        </div>

                        {/* Three cards */}
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Card 1 */}
                            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/40 dark:to-cyan-800/40 rounded-2xl p-5 border border-cyan-200 dark:border-cyan-700">
                                <h4 className="font-bold text-center text-slate-800 dark:text-white mb-3 text-sm">
                                    Гармонізацію роботи організму
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 text-center leading-relaxed">
                                    Кожна сила пов'язана із певним органом. Але благодійно впливає на усі органи
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-gradient-to-br from-fuchsia-50 to-violet-100 dark:from-fuchsia-900/40 dark:to-violet-800/40 rounded-2xl p-5 border border-fuchsia-200 dark:border-fuchsia-700">
                                <h4 className="font-bold text-center text-slate-800 dark:text-white mb-3 text-sm">
                                    На гармонізацію простору життя
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 text-center leading-relaxed">
                                    Кожна сила пов'язана із певним типом подій. Але благодійно впливає на усі події вашого простору життя.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/40 dark:to-orange-800/40 rounded-2xl p-5 border border-amber-200 dark:border-amber-700">
                                <h4 className="font-bold text-center text-slate-800 dark:text-white mb-3 text-sm">
                                    Архетипічну силу можна застосовувати для духовних практик:
                                </h4>
                                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-0.5">•</span>
                                        <span>Подорожі в астралі</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-0.5">•</span>
                                        <span>Снобачення</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-0.5">•</span>
                                        <span>Взаємодію із містичними сутностями.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Zodiac Wheel Layout */}
                <div className="relative flex items-center justify-center py-8">
                    <div className="relative w-[320px] h-[320px] md:w-[550px] md:h-[550px] lg:w-[650px] lg:h-[650px]">
                        
                        {/* Outer ring - Zodiac Symbols */}
                        <div className="absolute inset-0">
                            {zodiacSymbols.map((symbol, i) => {
                                const angle = i * 30;
                                const radius = 48;
                                const angleRad = (angle - 90) * (Math.PI / 180);
                                const x = 50 + radius * Math.cos(angleRad);
                                const y = 50 + radius * Math.sin(angleRad);
                                return (
                                    <div
                                        key={`symbol-${i}`}
                                        className="absolute w-8 h-8 md:w-10 md:h-10 rounded-lg bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-lg md:text-xl shadow-lg"
                                        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                                    >
                                        {symbol}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Middle ring - Coins with images */}
                        <div className="absolute inset-0">
                            {COINS_DATA.map((coin, i) => {
                                const angle = i * 30;
                                const radius = 35;
                                const angleRad = (angle - 90) * (Math.PI / 180);
                                const x = 50 + radius * Math.cos(angleRad);
                                const y = 50 + radius * Math.sin(angleRad);
                                return (
                                    <div
                                        key={coin.id}
                                        className="absolute w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden shadow-xl cursor-pointer hover:scale-110 transition-transform border-2 border-amber-400"
                                        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', boxShadow: '0 4px 20px rgba(217, 119, 6, 0.4)' }}
                                        onClick={() => setSelectedItem(coin)}
                                    >
                                        <img src={coin.image} alt={coin.title} className="w-full h-full object-cover" />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Center - Mandala with rainbow border and BUY button */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%]">
                            <div className="w-full h-full rounded-full snake-border-round overflow-hidden shadow-2xl flex items-center justify-center relative">
                                <img src="/infinity coins/infynityWP.webp" alt="Infinity Mandala" className="w-full h-full object-cover" />
                                {/* КУПИТИ button overlay */}
                                <a 
                                    href="https://t.me/dobrevk" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors group"
                                >
                                    <span className="px-6 py-3 bg-slate-900 text-white font-bold rounded-full text-sm md:text-base uppercase tracking-wider shadow-lg group-hover:scale-105 transition-transform">
                                        КУПИТИ
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {COINS_DATA.map((item, i) => <ProductCard key={item.id} item={item} index={i} />)}
                </div>
            </div>
        );
    };

    // Landing page content - full width, no sidebar
    const renderLanding = () => (
        <div className="animate-fade-in max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">
                    <span className="text-indigo-600 dark:text-indigo-400">{t('workshop_title')}</span>
                    <span className="text-slate-400 mx-3">|</span>
                    <span className="text-slate-700 dark:text-slate-300">{t('workshop_subtitle')}</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    {t('workshop_desc')}
                </p>
            </div>

            {/* Categories Grid - 3x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((cat, i) => (
                    <Link
                        key={cat.id}
                        to={cat.path}
                        className={`p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 text-center group card-reveal ${cat.id === 'attributes' ? 'snake-border-round' : ''}`}
                        style={{ animationDelay: `${i * 80}ms`, boxShadow: '0 4px 20px -5px rgba(129, 140, 248, 0.15)' }}
                    >
                        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-indigo-50 to-fuchsia-50 dark:from-indigo-900/30 dark:to-fuchsia-900/30 flex items-center justify-center border border-indigo-100 dark:border-indigo-800">
                            <Sparkles className="w-9 h-9 text-indigo-500 dark:text-indigo-400" />
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-widest text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {getLabel(cat.label)}
                        </h3>
                    </Link>
                ))}
            </div>
        </div>
    );

    // Get dynamic page title
    const getPageTitle = () => {
        if (!activeCategory) return t('menu_workshop');
        if (activeCategory === 'coins') return t('coins_title');
        if (activeCategory === 'procedures') return t('procedures_title');
        if (activeCategory === 'seals') return t('seals_title');
        if (activeCategory === 'attributes') return t('attributes_title');
        if (activeCategory === 'jewelry') return t('jewelry_title');
        if (activeCategory === 'myth') return t('myth_title');
        return getLabel(categories.find(c => c.id === activeCategory)?.label || 'menu_workshop');
    };

    // Get subtitle for page
    const getPageSubtitle = () => {
        if (activeCategory === 'coins') return t('coins_subtitle');
        return null;
    };

    // Landing page - full width without sidebar
    if (!activeCategory) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 w-full mx-auto">
                {renderLanding()}
                <Modal />
            </div>
        );
    }

    // Category pages - with horizontal tabs and title
    return (
        <div className="min-h-screen pt-24 pb-12 px-2 md:px-4 w-full mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-2 tracking-widest uppercase">
                <span className="text-slate-800 dark:text-white">{t('workshop_title')}</span>
                <span className="text-slate-400 mx-2">|</span>
                <span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-indigo-600 dark:from-indigo-400 dark:via-fuchsia-400 dark:to-indigo-400 animate-gradient-flow"
                    style={{ backgroundSize: '200% 200%' }}
                >
                    {getPageTitle()}
                </span>
            </h1>
            {getPageSubtitle() && (
                <p className="text-lg md:text-xl font-bold text-center mb-8 text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {getPageSubtitle()}
                </p>
            )}
            {!getPageSubtitle() && <div className="mb-8" />}

            {/* Horizontal Navigation Tabs with underline animation - single row */}
            <div className="flex justify-center gap-8 md:gap-12 mb-10 overflow-x-auto pb-2">
                {categories.map(cat => (
                    <Link
                        key={cat.id}
                        to={cat.path}
                        className="group relative flex items-center py-2 flex-shrink-0"
                    >
                        <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap
                            ${activeCategory === cat.id 
                                ? 'text-indigo-600 dark:text-indigo-400' 
                                : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'}`}
                        >
                            {getLabel(cat.label)}
                        </span>
                        {/* Animated underline */}
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-300 ease-out
                            ${activeCategory === cat.id ? 'w-full' : 'w-0 group-hover:w-full'}`}
                        />
                    </Link>
                ))}
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto">
                {activeCategory === 'coins' && renderCoins()}
                {activeCategory === 'procedures' && renderProcedures()}
                {activeCategory === 'seals' && renderSeals()}
                {activeCategory === 'attributes' && renderAttributes()}
                {activeCategory === 'jewelry' && renderJewelry()}
                {activeCategory === 'myth' && <PersonalMyth />}
            </div>

            <Modal />
        </div>
    );
};
