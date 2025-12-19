export type Language = 'UA' | 'EN' | 'RU';

export const translations = {
  UA: {
    // Menu
    menu_home: 'ГОЛОВНА',
    menu_knowledge: 'БАЗА ЗНАНЬ',
    menu_training: 'НАВЧАННЯ',
    menu_master: 'МАЙСТЕР',
    menu_consultations: 'КОНСУЛЬТАЦІЇ',
    menu_workshop: 'МАЙСТЕРНЯ',
    menu_login: 'ВХІД | РЕЄСТРАЦІЯ',
    
    // Submenu - Knowledge
    sub_faq: 'Термінологія',
    sub_nav: 'Навігація по сайту',
    sub_youtube: 'YOUTUBE канал',
    sub_city: 'Технологія "Місто Богів"',

    // Submenu - Training
    sub_year1: '1й курс – Ініціація якостей',
    sub_year2: '2й курс – Практика героя',
    sub_year3: '3й курс – Магія стихій з Таро',
    sub_year4: '4й курс – Підкорення сил',
    sub_roadmap: 'Повна програма навчання',

    // Submenu - Master
    sub_about: 'Про майстра',
    sub_ask: 'Спитати майстра',
    sub_lessons: 'Індивідуальні заняття',

    // Submenu - Workshop
    sub_coins: 'INFINITY COINS',
    sub_proc: 'Сезонні процедури',
    sub_seals: 'Печатки майстра',
    sub_attr: 'Атрибутика',
    sub_jewel: 'Ювелірні прикраси',
    sub_myth: 'Розрахунок особистого міфу',

    // Seal Types (Nested)
    seal_trad: 'Традиційна печатка',
    seal_gen: 'Загальна печатка',
    seal_oph: 'Печатка Змієносця',
    seal_bday: 'Печатка на День народження',
    seal_wealth: 'Печатка егрегора достатку',
    seal_elem: 'Печатка 4х стихій',

    // Theme Toggle
    theme_dark: 'магія ночі',
    theme_light: 'магія дня',

    // Home Page
    hero_title: 'Dobrev Opus Zodiac',
    hero_subtitle: 'Авторська система духовних практик',
    btn_courses: 'КУРСИ НАВЧАННЯ',
    btn_consult: 'КОНСУЛЬТАЦІЯ',
    btn_shop: 'МАЙСТЕРНЯ',
    btn_knowledge: 'АРХЕТИПИ (ЗОДІАКИ)',
    
    hero_desc_title: 'Герметична традиція',
    hero_desc_p1: 'В школі Архетипів пропонується <b>авторська інтерпретація Великого Діяння</b>, заснована не на трактатах минулого, а на <b>власному багаторічному досвіді</b> практик з Архетипами та практиках реінкарнації і занурення у глибини підсвідомості.',
    hero_desc_p2: 'Ми поділяємо життя людини на 4 сфери: <b>особисте життя, суспільне життя, професійна діяльність</b> та <b>духовна практика</b>. Людина завжди проявлена у всіх 4х сферах. Але <b>людина завжди створює домінанту однієї із сфер</b>. Якщо ці сфери збалансовані у відповідності до архетипу, життя людини гармонійне та цікаве. Тому ми можемо продіагностувати людину, з\'ясувавши як вона себе почуває у 4х сферах життя. Ми також можемо <b>зцілити людину</b>, якщо відновимо баланс 4х сфер у відповідності до архетипу.<br><br>При народженні всесвіт дає нам <b>знак зодіаку</b>, ми Вам пропонуємо <b>набір карт ТАРО до кожного Архетипу</b>. Розуміння архетипів змінить ваше життя на краще, воно відновить гармонію вашого життя та познайомить з <b>бездоганними (містичними) силами алхімії</b>.',
    
    btn_about_master: 'ПРО МАЙСТРА',
    
    // Classroom & Access
    btn_start_learning: 'ПОЧАТИ НАВЧАННЯ',
    btn_buy_course: 'ПРИДБАТИ КУРС',
    access_denied_title: 'ДОСТУП ОБМЕЖЕНО',
    access_denied_desc: 'Цей курс доступний тільки після оплати. Будь ласка, придбайте курс або увійдіть у свій обліковий запис.',
    lesson_progress: 'Прогрес курса',
    slide_materials: 'СЛАЙД МАТЕРІАЛИ',
    
    // Common
    rights_reserved: 'Всі права захищені.',
    offer_agreement: 'Договір оферти',
    payment_delivery: 'Оплата і Доставка',
    read_more: 'Читати далі',
    back: 'Назад',
    next: 'Далі',
    send: 'Відправити',
    loading: 'Завантаження...',
    soon: 'Скоро',
    price: 'Ціна',
  },
  EN: {
    menu_home: 'HOME',
    menu_knowledge: 'KNOWLEDGE BASE',
    menu_training: 'TRAINING',
    menu_master: 'MASTER',
    menu_consultations: 'CONSULTATIONS',
    menu_workshop: 'WORKSHOP',
    menu_login: 'LOGIN | SIGN UP',

    sub_faq: 'FAQ | Terminology',
    sub_nav: 'Site Navigation',
    sub_youtube: 'YOUTUBE Channel',
    sub_city: '"City of Gods" Technology',
    sub_year1: 'Year 1 – Initiation of Qualities',
    sub_year2: 'Year 2 – Hero Practice',
    sub_year3: 'Year 3 – Elemental Magic with Tarot',
    sub_year4: 'Year 4 – Conquering Forces',
    sub_roadmap: 'Full Curriculum',
    sub_about: 'About the Master',
    sub_ask: 'Ask the Master',
    sub_lessons: 'Individual Lessons',
    sub_coins: 'INFINITY COINS',
    sub_proc: 'SEASONAL PROCEDURES',
    sub_seals: 'MASTER SEALS',
    sub_attr: 'ATTRIBUTES',
    sub_jewel: 'JEWELRY',
    sub_myth: 'PERSONAL MYTH | Calculation',

    seal_trad: 'Traditional Seal',
    seal_gen: 'General Seal',
    seal_oph: 'Ophiuchus Seal',
    seal_bday: 'Birthday Seal',
    seal_wealth: 'Wealth Egregor Seal',
    seal_elem: '4 Elements Seal',

    theme_dark: 'night magic',
    theme_light: 'day magic',

    hero_title: 'Dobrev Opus Zodiac',
    hero_subtitle: 'Author\'s System of Spiritual Practices',
    btn_courses: 'COURSES',
    btn_consult: 'CONSULTATION',
    btn_shop: 'WORKSHOP',
    btn_knowledge: 'ARCHETYPES (ZODIACS)',

    hero_desc_title: 'Hermetic Tradition',
    hero_desc_p1: 'The School of Archetypes offers an <b>author\'s interpretation of the Great Work</b>, based not on treatises of the past, but on <b>years of personal experience</b> with Archetypes and practices of reincarnation and immersion into the depths of the subconscious.',
    hero_desc_p2: 'We divide human life into 4 spheres: <b>personal life, social life, professional activity</b> and <b>spiritual practice</b>. A person is always manifested in all 4 spheres. But <b>a person always creates a dominance of one sphere</b>. If these spheres are balanced according to the archetype, a person\'s life is harmonious and interesting. Therefore, we can diagnose a person by finding out how they feel in the 4 spheres of life. We can also <b>heal a person</b> if we restore the balance of 4 spheres according to the archetype.<br><br>At birth, the universe gives us a <b>zodiac sign</b>, we offer you a <b>set of TAROT cards for each Archetype</b>. Understanding archetypes will change your life for the better, it will restore harmony to your life and introduce you to the <b>impeccable (mystical) forces of alchemy</b>.',

    btn_about_master: 'ABOUT THE MASTER',
    
    btn_start_learning: 'START LEARNING',
    btn_buy_course: 'BUY COURSE',
    access_denied_title: 'ACCESS DENIED',
    access_denied_desc: 'This course is only available after purchase. Please buy the course or log in to your account.',
    lesson_progress: 'Course Progress',
    slide_materials: 'SLIDE MATERIALS',

    rights_reserved: 'All rights reserved.',
    offer_agreement: 'Offer Agreement',
    payment_delivery: 'Payment and Delivery',
    read_more: 'Read More',
    back: 'Back',
    next: 'Next',
    send: 'Send',
    loading: 'Loading...',
    soon: 'Coming Soon',
    price: 'Price',
  },
  RU: {
    menu_home: 'ГЛАВНАЯ',
    menu_knowledge: 'БАЗА ЗНАНИЙ',
    menu_training: 'ОБУЧЕНИЕ',
    menu_master: 'МАСТЕР',
    menu_consultations: 'КОНСУЛЬТАЦИИ',
    menu_workshop: 'МАСТЕРСКАЯ',
    menu_login: 'ВХОД | РЕГИСТРАЦИЯ',

    sub_faq: 'FAQ | Терминология',
    sub_nav: 'Навигация по сайту',
    sub_youtube: 'YOUTUBE канал',
    sub_city: 'Технология "Город Богов"',
    sub_year1: '1й курс – Инициация качеств',
    sub_year2: '2й курс – Практика героя',
    sub_year3: '3й курс – Магия стихий с Таро',
    sub_year4: '4й курс – Покорение сил',
    sub_roadmap: 'Полная программа',
    sub_about: 'О мастере',
    sub_ask: 'Спросить мастера',
    sub_lessons: 'Индивидуальные занятия',
    sub_coins: 'INFINITY COINS',
    sub_proc: 'СЕЗОННЫЕ ПРОЦЕДУРЫ',
    sub_seals: 'ПЕЧАТИ МАСТЕРА',
    sub_attr: 'АТРИБУТИКА',
    sub_jewel: 'ЮВЕЛИРНЫЕ УКРАШЕНИЯ',
    sub_myth: 'ЛИЧНЫЙ МИФ | Расчет',

    seal_trad: 'Традиционная печать',
    seal_gen: 'Общая печать',
    seal_oph: 'Печать Змееносца',
    seal_bday: 'Печать на День рождения',
    seal_wealth: 'Печать эгрегора достатка',
    seal_elem: 'Печать 4х стихий',

    theme_dark: 'магия ночи',
    theme_light: 'магия дня',

    hero_title: 'Dobrev Opus Zodiac',
    hero_subtitle: 'Авторская система духовних практик',
    btn_courses: 'КУРСЫ ОБУЧЕНИЯ',
    btn_consult: 'КОНСУЛЬТАЦИЯ',
    btn_shop: 'МАСТЕРСКАЯ',
    btn_knowledge: 'АРХЕТИПЫ (ЗОДИАКИ)',

    hero_desc_title: 'Герметическая традиция',
    hero_desc_p1: 'В школе Архетипов предлагается <b>авторская интерпретация Великого Делания</b>, основанная не на трактатах прошлого, а на <b>собственном многолетнем опыте</b> практик с Архетипами и практиках реинкарнации и погружения в глубины подсознания.',
    hero_desc_p2: 'Мы делим жизнь человека на 4 сферы: <b>личная жизнь, общественная жизнь, профессиональная деятельность</b> и <b>духовная практика</b>. Человек всегда проявлен во всех 4х сферах. Но <b>человек всегда создает доминанту одной из сфер</b>. Если эти сферы сбалансированы в соответствии с архетипом, жизнь человека гармонична и интересна. Поэтому мы можем продиагностировать человека, выяснив как он себя чувствует в 4х сферах жизни. Мы также можем <b>исцелить человека</b>, если восстановим баланс 4х сфер в соответствии с архетипом.<br><br>При рождении вселенная дает нам <b>знак зодиака</b>, мы Вам предлагаем <b>набор карт ТАРО к каждому Архетипу</b>. Понимание архетипов изменит вашу жизнь к лучшему, оно восстановит гармонию вашей жизни и познакомит с <b>безупречными (мистическими) силами алхимии</b>.',

    btn_about_master: 'О МАСТЕРЕ',

    btn_start_learning: 'НАЧАТЬ ОБУЧЕНИЕ',
    btn_buy_course: 'КУПИТЬ КУРС',
    access_denied_title: 'ДОСТУП ОГРАНИЧЕН',
    access_denied_desc: 'Этот курс доступен только после оплаты. Пожалуйста, купите курс или войдите в свой аккаунт.',
    lesson_progress: 'Прогресс курса',
    slide_materials: 'СЛАЙД МАТЕРИАЛЫ',

    rights_reserved: 'Все права защищены.',
    offer_agreement: 'Договор оферты',
    payment_delivery: 'Оплата и Доставка',
    read_more: 'Читать далее',
    back: 'Назад',
    next: 'Далее',
    send: 'Отправить',
    loading: 'Загрузка...',
    soon: 'Скоро',
    price: 'Цена',
  }
};