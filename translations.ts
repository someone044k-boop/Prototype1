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

    // Seal Types
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
    
    hero_desc_title: 'Школа Архетипів',
    hero_desc_p1: 'В школі Архетипів пропонується <b>авторська інтерпретація Великого Діяння</b>, заснована не на трактатах минулого, а на <b>власному багаторічному досвіді</b> практик з Архетипами та практиках реінкарнації і занурення у глибини підсвідомості.',
    hero_desc_p2: 'Ми поділяємо життя людини на 4 сфери: <b>особисте життя, суспільне життя, професійна діяльність</b> та <b>духовна практика</b>. Людина завжди проявлена у всіх 4х сферах. Але <b>людина завжди створює домінанту однієї із сфер</b>. Якщо ці сфери збалансовані у відповідності до архетипу, життя людини гармонійне та цікаве. Тому ми можемо продіагностувати людину, з\'ясувавши як вона себе почуває у 4х сферах життя. Ми також можемо <b>зцілити людину</b>, якщо відновимо баланс 4х сфер у відповідності до архетипу.',
    hero_desc_p3: 'При народженні всесвіт дає нам <b>знак зодіаку</b>, ми Вам пропонуємо <b>набір карт ТАРО до кожного Архетипу</b>. Розуміння архетипів змінить ваше життя на краще, воно відновить гармонію вашого життя та познайомить з <b>бездоганними (містичними) силами алхімії</b>.',
    
    btn_about_master: 'ПРО МАЙСТРА',
    
    // Training Page
    training_title: 'ШКОЛА АРХЕТИПІВ',
    training_subtitle: 'Повна програма навчання',
    course1_title: '1й КУРС | ІНІЦІАЦІЯ ЯКОСТЕЙ',
    course1_subtitle: 'ЗБІР ЦІЛІСНОСТІ',
    course2_title: '2й КУРС | ПРАКТИКА ГЕРОЯ',
    course2_subtitle: 'ПРАКТИКА АРХЕТИПІВ У СУСПІЛЬСТВІ',
    course3_title: '3й КУРС | МАГІЯ СТИХІЙ',
    course4_title: '4й КУРС | ПІДКОРЕННЯ СИЛ',
    coming_soon: 'НЕЗАБАРОМ',
    
    // Course 1 Tabs
    tab_archetypes: 'ЗНАЙОМСТВО З АРХЕТИПАМИ',
    tab_meditation: 'МЕДИТАЦІЇ ІНІЦІАЦІЇ ЯКОСТЕЙ',
    tab_exam: 'ЕКЗАМЕНАЦІЯ',
    tab_space_deeds: 'ПРОСТІР ПОДВИГІВ',
    tab_heroes_power: 'ГЕРОЇ ТА ЇХ СИЛА',
    tab_own_weight: 'ВЛАСНА ВАГА',
    tab_environment: 'ВПЛИВ НА СЕРЕДОВИЩЕ',
    tab_examination: 'ЕКЗАМЕНАЦІЯ',
    
    // Course Content
    theoretical_module: 'ТЕОРЕТИЧНИЙ МОДУЛЬ',
    practical_module: 'ПРАКТИЧНИЙ МОДУЛЬ',
    window_impeccability: 'ВІКНО БЕЗДОГАННОСТІ',
    course_program: 'Програма курсу',
    module_program: 'Програма модуля',
    buy_course: 'ПРИДБАТИ КУРС',
    video_lessons: 'відео-уроків',
    practical_tasks: 'Практичні завдання',
    meditations: 'медитації',
    audio_support: 'Аудіо-супровід',
    pass_exam: 'ПРОЙТИ ЕКЗАМЕНАЦІЮ',
    archetype_definition: 'Архетипи — це універсальні первинні образи та патерни поведінки, що існують у колективному несвідомому людства.',
    definition: 'Визначення',
    
    // Workshop Page
    workshop_title: 'МАЙСТЕРНЯ',
    workshop_subtitle: 'МАГІЧНІ АРТЕФАКТИ',
    workshop_desc: 'Унікальні предмети сили, створені майстром для вашого духовного розвитку та захисту.',
    
    // Coins
    coins_title: 'INFINITY COINS',
    coins_subtitle: 'МОНЕТИ ДЖЕРЕЛА АСТРОЛОГІЧНИХ СИЛ',
    coins_meditation: 'ТЕХНІКА МЕДИТАЦІЇ З МОНЕТОЮ',
    coins_desc: 'Монети Infinity Coins — це інструменти для медитації та з\'єднання з архетипічними силами зодіаку.',
    coins_meditation_p1: 'Медитація на монету нескінченності - створює у середньому мозку <b>камертон</b>, що резонує із фізичним принципом (астрологічною планетою). <span class="text-fuchsia-600">Цей камертон є один із принципів життєдіяльності людини.</span>',
    coins_meditation_p2: 'Ви маєте створити образи великих арканів у великих півкулях головного мозку:',
    coins_arcana_1_12: 'Аркани <u>з 1 по 12 слід</u> поміщати (проекція) <span class="text-fuchsia-600">ліву півкулю як причину</span> архетипічної сили.',
    coins_arcana_22_12: 'Аркани <u>з 22 по 12 слід</u> поміщати (проекція) у <span class="text-fuchsia-600">праву півкулю як наслідок</span> архетипічної сили.',
    coins_meditation_p3: 'Під час медитації ви маєте упорядкувати зміст середнього мозку поки в ньому не утвориться камертон сили відповідної планети. <b>Камертон відчувається як жива сутність,</b> оскільки він є принципом життєдіяльності вашого тіла. Він наповнить вашу голову та буде наповнювати органи тіла, відновлюючи в них гармонію.',
    order_btn: 'ЗАМОВИТИ',
    order_procedure: 'ЗАМОВИТИ СЕЗОННУ ПРОЦЕДУРУ',
    
    // Procedures
    procedures_title: 'СЕЗОННІ ПРОЦЕДУРИ',
    procedures_desc: 'Ритуальні практики для гармонізації з природними циклами.',
    
    // Seals
    seals_title: 'ПЕЧАТКИ МАЙСТРА',
    seals_desc: 'Персональні печатки для захисту та посилення енергії.',
    
    // Attributes
    attributes_title: 'АТРИБУТИКА',
    mandala_title: 'Мандала Архетипів',
    mandala_desc: 'Сакральний символ для медитації та духовної практики. Мандала допомагає зосередитись на внутрішньому світі та гармонізувати енергетичні потоки.',
    
    // Jewelry
    jewelry_title: 'ЮВЕЛІРНІ ПРИКРАСИ',
    rings_title: 'Перстні сили',
    pendants_title: 'Підвіска бездоганності',
    
    // Personal Myth
    myth_title: 'ПЕРСОНАЛЬНИЙ МІФ',
    myth_subtitle: 'Розрахунок вашого унікального архетипічного профілю',
    myth_desc: 'Дізнайтеся свій персональний міф на основі дати народження.',
    birth_date: 'Дата народження',
    birth_time: 'Час народження',
    birth_place: 'Місце народження',
    calculate: 'РОЗРАХУВАТИ',
    
    // Consultations
    consult_title: 'КОНСУЛЬТАЦІЇ',
    consult_subtitle: 'Індивідуальна робота з майстром',
    consult_desc: 'Персональні консультації для глибокого розуміння вашого архетипу.',
    book_consult: 'ЗАПИСАТИСЯ',
    
    // Master Page
    master_title: 'МАЙСТЕР',
    master_name: 'Костянтин Добрев',
    master_desc: 'Засновник школи Архетипів, практик з багаторічним досвідом.',
    reviews_title: 'ВІДГУКИ УЧНІВ',
    
    // Knowledge Base
    knowledge_title: 'БАЗА ЗНАНЬ',
    faq_title: 'ТЕРМІНОЛОГІЯ',
    nav_title: 'НАВІГАЦІЯ ПО САЙТУ',
    
    // Navigation Page
    nav_welcome: 'Ласкаво просимо',
    nav_register: 'Зареєструйтесь для повного доступу',
    nav_access_list: 'Що ви отримаєте',
    nav_school: 'Школа Архетипів',
    nav_free_materials: 'Безкоштовні матеріали',
    nav_calculator: 'Алхімічний калькулятор',
    nav_workshop: 'Майстерня',
    nav_artifacts: 'Артефакти',
    nav_services: 'Послуги',
    nav_contact: 'Зв\'язатися',
    nav_telegram: 'Написати в Telegram',
    nav_youtube: 'YouTube канал',
    nav_questions: 'Залишились питання?',
    
    // Dashboard
    dashboard_title: 'Особистий кабінет',
    my_courses: 'Мої курси',
    notifications: 'Сповіщення',
    messages: 'Особисті повідомлення',
    settings: 'Налаштування',
    logout: 'Вийти',
    no_courses: 'У вас ще немає курсів',
    buy_course_prompt: 'Придбайте курс, щоб почати навчання',
    view_courses: 'Переглянути курси',
    continue_learning: 'Продовжити навчання',
    write_master: 'Написати майстру',
    new_orders: 'Нові замовлення',
    users: 'Користувачі',
    profile: 'Профіль',
    
    // Auth
    login: 'Вхід',
    register: 'Реєстрація',
    welcome: 'Вітаємо!',
    create_account: 'Створити акаунт',
    email: 'Email',
    password: 'Пароль',
    name: 'Ім\'я',
    forgot_password: 'Забули пароль?',
    no_account: 'Немає акаунту?',
    have_account: 'Вже є акаунт?',
    
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
    currency: 'грн',
    close: 'Закрити',
    open: 'Відкрити',
    search: 'Пошук',
    
    // Footer
    footer_school: 'Школа Архетипів',
    footer_desc: 'Авторська система духовних практик та самопізнання.',
    footer_links: 'Посилання',
    footer_contact: 'Контакти',
  },
  EN: {
    // Menu
    menu_home: 'HOME',
    menu_knowledge: 'KNOWLEDGE BASE',
    menu_training: 'TRAINING',
    menu_master: 'MASTER',
    menu_consultations: 'CONSULTATIONS',
    menu_workshop: 'WORKSHOP',
    menu_login: 'LOGIN | SIGN UP',
    
    // Submenu - Knowledge
    sub_faq: 'Terminology',
    sub_nav: 'Site Navigation',
    sub_youtube: 'YOUTUBE Channel',
    sub_city: '"City of Gods" Technology',

    // Submenu - Training
    sub_year1: 'Year 1 – Initiation of Qualities',
    sub_year2: 'Year 2 – Hero Practice',
    sub_year3: 'Year 3 – Elemental Magic with Tarot',
    sub_year4: 'Year 4 – Conquering Forces',
    sub_roadmap: 'Full Curriculum',

    // Submenu - Master
    sub_about: 'About the Master',
    sub_ask: 'Ask the Master',
    sub_lessons: 'Individual Lessons',

    // Submenu - Workshop
    sub_coins: 'INFINITY COINS',
    sub_proc: 'Seasonal Procedures',
    sub_seals: 'Master Seals',
    sub_attr: 'Attributes',
    sub_jewel: 'Jewelry',
    sub_myth: 'Personal Myth Calculation',

    // Seal Types
    seal_trad: 'Traditional Seal',
    seal_gen: 'General Seal',
    seal_oph: 'Ophiuchus Seal',
    seal_bday: 'Birthday Seal',
    seal_wealth: 'Wealth Egregor Seal',
    seal_elem: '4 Elements Seal',

    // Theme Toggle
    theme_dark: 'night magic',
    theme_light: 'day magic',

    // Home Page
    hero_title: 'Dobrev Opus Zodiac',
    hero_subtitle: 'Author\'s System of Spiritual Practices',
    btn_courses: 'TRAINING COURSES',
    btn_consult: 'CONSULTATION',
    btn_shop: 'WORKSHOP',
    btn_knowledge: 'ARCHETYPES (ZODIACS)',
    
    hero_desc_title: 'School of Archetypes',
    hero_desc_p1: 'The School of Archetypes offers an <b>author\'s interpretation of the Great Work</b>, based not on treatises of the past, but on <b>years of personal experience</b> with Archetypes and practices of reincarnation and immersion into the depths of the subconscious.',
    hero_desc_p2: 'We divide human life into 4 spheres: <b>personal life, social life, professional activity</b> and <b>spiritual practice</b>. A person is always manifested in all 4 spheres. But <b>a person always creates a dominance of one sphere</b>. If these spheres are balanced according to the archetype, life is harmonious and interesting. Therefore, we can diagnose a person by finding out how they feel in the 4 spheres of life. We can also <b>heal a person</b> by restoring the balance of the 4 spheres according to the archetype.',
    hero_desc_p3: 'At birth, the universe gives us a <b>zodiac sign</b>, we offer you a <b>set of TAROT cards for each Archetype</b>. Understanding archetypes will change your life for the better, it will restore the harmony of your life and introduce you to the <b>impeccable (mystical) forces of alchemy</b>.',
    
    btn_about_master: 'ABOUT THE MASTER',
    
    // Training Page
    training_title: 'SCHOOL OF ARCHETYPES',
    training_subtitle: 'Full Training Program',
    course1_title: '1st COURSE | INITIATION OF QUALITIES',
    course1_subtitle: 'GATHERING INTEGRITY',
    course2_title: '2nd COURSE | HERO PRACTICE',
    course2_subtitle: 'ARCHETYPE PRACTICE IN SOCIETY',
    course3_title: '3rd COURSE | ELEMENTAL MAGIC',
    course4_title: '4th COURSE | CONQUERING FORCES',
    coming_soon: 'COMING SOON',
    
    // Course Tabs
    tab_archetypes: 'INTRODUCTION TO ARCHETYPES',
    tab_meditation: 'QUALITY INITIATION MEDITATIONS',
    tab_exam: 'EXAMINATION',
    tab_space_deeds: 'SPACE OF DEEDS',
    tab_heroes_power: 'HEROES AND THEIR POWER',
    tab_own_weight: 'OWN WEIGHT',
    tab_environment: 'ENVIRONMENTAL IMPACT',
    tab_examination: 'EXAMINATION',
    
    // Course Content
    theoretical_module: 'THEORETICAL MODULE',
    practical_module: 'PRACTICAL MODULE',
    window_impeccability: 'WINDOW OF IMPECCABILITY',
    course_program: 'Course Program',
    module_program: 'Module Program',
    buy_course: 'BUY COURSE',
    video_lessons: 'video lessons',
    practical_tasks: 'Practical tasks',
    meditations: 'meditations',
    audio_support: 'Audio support',
    pass_exam: 'PASS EXAMINATION',
    archetype_definition: 'Archetypes are universal primary images and behavior patterns that exist in the collective unconscious of humanity.',
    definition: 'Definition',
    
    // Workshop Page
    workshop_title: 'WORKSHOP',
    workshop_subtitle: 'MAGICAL ARTIFACTS',
    workshop_desc: 'Unique items of power, created by the master for your spiritual development and protection.',
    
    // Coins
    coins_title: 'INFINITY COINS',
    coins_subtitle: 'COINS OF ASTROLOGICAL FORCES SOURCE',
    coins_meditation: 'COIN MEDITATION TECHNIQUE',
    coins_desc: 'Infinity Coins are tools for meditation and connection with the archetypal forces of the zodiac.',
    coins_meditation_p1: 'Meditation on the infinity coin - creates a <b>tuning fork</b> in the midbrain that resonates with the physical principle (astrological planet). <span class="text-fuchsia-600">This tuning fork is one of the principles of human life.</span>',
    coins_meditation_p2: 'You need to create images of major arcana in the cerebral hemispheres:',
    coins_arcana_1_12: 'Arcana <u>from 1 to 12 should</u> be placed (projection) in the <span class="text-fuchsia-600">left hemisphere as the cause</span> of archetypal force.',
    coins_arcana_22_12: 'Arcana <u>from 22 to 12 should</u> be placed (projection) in the <span class="text-fuchsia-600">right hemisphere as the effect</span> of archetypal force.',
    coins_meditation_p3: 'During meditation, you need to organize the content of the midbrain until a tuning fork of the corresponding planet\'s force is formed. <b>The tuning fork feels like a living entity,</b> because it is a principle of your body\'s vital activity. It will fill your head and will fill the organs of the body, restoring harmony in them.',
    order_btn: 'ORDER',
    order_procedure: 'ORDER SEASONAL PROCEDURE',
    
    // Procedures
    procedures_title: 'SEASONAL PROCEDURES',
    procedures_desc: 'Ritual practices for harmonization with natural cycles.',
    
    // Seals
    seals_title: 'MASTER SEALS',
    seals_desc: 'Personal seals for protection and energy enhancement.',
    
    // Attributes
    attributes_title: 'ATTRIBUTES',
    mandala_title: 'Mandala of Archetypes',
    mandala_desc: 'A sacred symbol for meditation and spiritual practice. The mandala helps focus on the inner world and harmonize energy flows.',
    
    // Jewelry
    jewelry_title: 'JEWELRY',
    rings_title: 'Power Rings',
    pendants_title: 'Impeccability Pendant',
    
    // Personal Myth
    myth_title: 'PERSONAL MYTH',
    myth_subtitle: 'Calculation of your unique archetypal profile',
    myth_desc: 'Discover your personal myth based on your birth date.',
    birth_date: 'Birth Date',
    birth_time: 'Birth Time',
    birth_place: 'Birth Place',
    calculate: 'CALCULATE',
    
    // Consultations
    consult_title: 'CONSULTATIONS',
    consult_subtitle: 'Individual work with the master',
    consult_desc: 'Personal consultations for deep understanding of your archetype.',
    book_consult: 'BOOK NOW',
    
    // Master Page
    master_title: 'MASTER',
    master_name: 'Konstantin Dobrev',
    master_desc: 'Founder of the School of Archetypes, practitioner with many years of experience.',
    reviews_title: 'STUDENT REVIEWS',
    
    // Knowledge Base
    knowledge_title: 'KNOWLEDGE BASE',
    faq_title: 'TERMINOLOGY',
    nav_title: 'SITE NAVIGATION',
    
    // Navigation Page
    nav_welcome: 'Welcome',
    nav_register: 'Register for full access',
    nav_access_list: 'What you will get',
    nav_school: 'School of Archetypes',
    nav_free_materials: 'Free Materials',
    nav_calculator: 'Alchemy Calculator',
    nav_workshop: 'Workshop',
    nav_artifacts: 'Artifacts',
    nav_services: 'Services',
    nav_contact: 'Contact',
    nav_telegram: 'Write on Telegram',
    nav_youtube: 'YouTube Channel',
    nav_questions: 'Have questions?',
    
    // Dashboard
    dashboard_title: 'Personal Cabinet',
    my_courses: 'My Courses',
    notifications: 'Notifications',
    messages: 'Personal Messages',
    settings: 'Settings',
    logout: 'Logout',
    no_courses: 'You have no courses yet',
    buy_course_prompt: 'Buy a course to start learning',
    view_courses: 'View Courses',
    continue_learning: 'Continue Learning',
    write_master: 'Write to Master',
    new_orders: 'New Orders',
    users: 'Users',
    profile: 'Profile',
    
    // Auth
    login: 'Login',
    register: 'Register',
    welcome: 'Welcome!',
    create_account: 'Create Account',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    forgot_password: 'Forgot password?',
    no_account: 'No account?',
    have_account: 'Already have an account?',
    
    // Common
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
    currency: 'UAH',
    close: 'Close',
    open: 'Open',
    search: 'Search',
    
    // Footer
    footer_school: 'School of Archetypes',
    footer_desc: 'Author\'s system of spiritual practices and self-discovery.',
    footer_links: 'Links',
    footer_contact: 'Contacts',
  },
  RU: {
    // Menu
    menu_home: 'ГЛАВНАЯ',
    menu_knowledge: 'БАЗА ЗНАНИЙ',
    menu_training: 'ОБУЧЕНИЕ',
    menu_master: 'МАСТЕР',
    menu_consultations: 'КОНСУЛЬТАЦИИ',
    menu_workshop: 'МАСТЕРСКАЯ',
    menu_login: 'ВХОД | РЕГИСТРАЦИЯ',
    
    // Submenu - Knowledge
    sub_faq: 'Терминология',
    sub_nav: 'Навигация по сайту',
    sub_youtube: 'YOUTUBE канал',
    sub_city: 'Технология "Город Богов"',

    // Submenu - Training
    sub_year1: '1й курс – Инициация качеств',
    sub_year2: '2й курс – Практика героя',
    sub_year3: '3й курс – Магия стихий с Таро',
    sub_year4: '4й курс – Покорение сил',
    sub_roadmap: 'Полная программа обучения',

    // Submenu - Master
    sub_about: 'О мастере',
    sub_ask: 'Спросить мастера',
    sub_lessons: 'Индивидуальные занятия',

    // Submenu - Workshop
    sub_coins: 'INFINITY COINS',
    sub_proc: 'Сезонные процедуры',
    sub_seals: 'Печати мастера',
    sub_attr: 'Атрибутика',
    sub_jewel: 'Ювелирные украшения',
    sub_myth: 'Расчет личного мифа',

    // Seal Types
    seal_trad: 'Традиционная печать',
    seal_gen: 'Общая печать',
    seal_oph: 'Печать Змееносца',
    seal_bday: 'Печать на День рождения',
    seal_wealth: 'Печать эгрегора достатка',
    seal_elem: 'Печать 4х стихий',

    // Theme Toggle
    theme_dark: 'магия ночи',
    theme_light: 'магия дня',

    // Home Page
    hero_title: 'Dobrev Opus Zodiac',
    hero_subtitle: 'Авторская система духовных практик',
    btn_courses: 'КУРСЫ ОБУЧЕНИЯ',
    btn_consult: 'КОНСУЛЬТАЦИЯ',
    btn_shop: 'МАСТЕРСКАЯ',
    btn_knowledge: 'АРХЕТИПЫ (ЗОДИАКИ)',
    
    hero_desc_title: 'Школа Архетипов',
    hero_desc_p1: 'В школе Архетипов предлагается <b>авторская интерпретация Великого Делания</b>, основанная не на трактатах прошлого, а на <b>собственном многолетнем опыте</b> практик с Архетипами и практиках реинкарнации и погружения в глубины подсознания.',
    hero_desc_p2: 'Мы делим жизнь человека на 4 сферы: <b>личная жизнь, общественная жизнь, профессиональная деятельность</b> и <b>духовная практика</b>. Человек всегда проявлен во всех 4х сферах. Но <b>человек всегда создает доминанту одной из сфер</b>. Если эти сферы сбалансированы в соответствии с архетипом, жизнь гармонична и интересна. Поэтому мы можем продиагностировать человека, выяснив как он себя чувствует в 4х сферах жизни. Мы также можем <b>исцелить человека</b>, если восстановим баланс 4х сфер в соответствии с архетипом.',
    hero_desc_p3: 'При рождении вселенная дает нам <b>знак зодиака</b>, мы Вам предлагаем <b>набор карт ТАРО к каждому Архетипу</b>. Понимание архетипов изменит вашу жизнь к лучшему, оно восстановит гармонию вашей жизни и познакомит с <b>безупречными (мистическими) силами алхимии</b>.',
    
    btn_about_master: 'О МАСТЕРЕ',
    
    // Training Page
    training_title: 'ШКОЛА АРХЕТИПОВ',
    training_subtitle: 'Полная программа обучения',
    course1_title: '1й КУРС | ИНИЦИАЦИЯ КАЧЕСТВ',
    course1_subtitle: 'СБОР ЦЕЛОСТНОСТИ',
    course2_title: '2й КУРС | ПРАКТИКА ГЕРОЯ',
    course2_subtitle: 'ПРАКТИКА АРХЕТИПОВ В ОБЩЕСТВЕ',
    course3_title: '3й КУРС | МАГИЯ СТИХИЙ',
    course4_title: '4й КУРС | ПОКОРЕНИЕ СИЛ',
    coming_soon: 'СКОРО',
    
    // Course Tabs
    tab_archetypes: 'ЗНАКОМСТВО С АРХЕТИПАМИ',
    tab_meditation: 'МЕДИТАЦИИ ИНИЦИАЦИИ КАЧЕСТВ',
    tab_exam: 'ЭКЗАМЕНАЦИЯ',
    tab_space_deeds: 'ПРОСТРАНСТВО ПОДВИГОВ',
    tab_heroes_power: 'ГЕРОИ И ИХ СИЛА',
    tab_own_weight: 'СОБСТВЕННЫЙ ВЕС',
    tab_environment: 'ВЛИЯНИЕ НА СРЕДУ',
    tab_examination: 'ЭКЗАМЕНАЦИЯ',
    
    // Course Content
    theoretical_module: 'ТЕОРЕТИЧЕСКИЙ МОДУЛЬ',
    practical_module: 'ПРАКТИЧЕСКИЙ МОДУЛЬ',
    window_impeccability: 'ОКНО БЕЗУПРЕЧНОСТИ',
    course_program: 'Программа курса',
    module_program: 'Программа модуля',
    buy_course: 'КУПИТЬ КУРС',
    video_lessons: 'видео-уроков',
    practical_tasks: 'Практические задания',
    meditations: 'медитации',
    audio_support: 'Аудио-сопровождение',
    pass_exam: 'ПРОЙТИ ЭКЗАМЕНАЦИЮ',
    archetype_definition: 'Архетипы — это универсальные первичные образы и паттерны поведения, существующие в коллективном бессознательном человечества.',
    definition: 'Определение',
    
    // Workshop Page
    workshop_title: 'МАСТЕРСКАЯ',
    workshop_subtitle: 'МАГИЧЕСКИЕ АРТЕФАКТЫ',
    workshop_desc: 'Уникальные предметы силы, созданные мастером для вашего духовного развития и защиты.',
    
    // Coins
    coins_title: 'INFINITY COINS',
    coins_subtitle: 'МОНЕТЫ ИСТОЧНИКА АСТРОЛОГИЧЕСКИХ СИЛ',
    coins_meditation: 'ТЕХНИКА МЕДИТАЦИИ С МОНЕТОЙ',
    coins_desc: 'Монеты Infinity Coins — это инструменты для медитации и соединения с архетипическими силами зодиака.',
    coins_meditation_p1: 'Медитация на монету бесконечности - создает в среднем мозге <b>камертон</b>, резонирующий с физическим принципом (астрологической планетой). <span class="text-fuchsia-600">Этот камертон является одним из принципов жизнедеятельности человека.</span>',
    coins_meditation_p2: 'Вы должны создать образы великих арканов в больших полушариях головного мозга:',
    coins_arcana_1_12: 'Арканы <u>с 1 по 12 следует</u> помещать (проекция) в <span class="text-fuchsia-600">левое полушарие как причину</span> архетипической силы.',
    coins_arcana_22_12: 'Арканы <u>с 22 по 12 следует</u> помещать (проекция) в <span class="text-fuchsia-600">правое полушарие как следствие</span> архетипической силы.',
    coins_meditation_p3: 'Во время медитации вы должны упорядочить содержимое среднего мозга, пока в нем не образуется камертон силы соответствующей планеты. <b>Камертон ощущается как живая сущность,</b> поскольку он является принципом жизнедеятельности вашего тела. Он наполнит вашу голову и будет наполнять органы тела, восстанавливая в них гармонию.',
    order_btn: 'ЗАКАЗАТЬ',
    order_procedure: 'ЗАКАЗАТЬ СЕЗОННУЮ ПРОЦЕДУРУ',
    
    // Procedures
    procedures_title: 'СЕЗОННЫЕ ПРОЦЕДУРЫ',
    procedures_desc: 'Ритуальные практики для гармонизации с природными циклами.',
    
    // Seals
    seals_title: 'ПЕЧАТИ МАСТЕРА',
    seals_desc: 'Персональные печати для защиты и усиления энергии.',
    
    // Attributes
    attributes_title: 'АТРИБУТИКА',
    mandala_title: 'Мандала Архетипов',
    mandala_desc: 'Сакральный символ для медитации и духовной практики. Мандала помогает сосредоточиться на внутреннем мире и гармонизировать энергетические потоки.',
    
    // Jewelry
    jewelry_title: 'ЮВЕЛИРНЫЕ УКРАШЕНИЯ',
    rings_title: 'Перстни силы',
    pendants_title: 'Подвеска безупречности',
    
    // Personal Myth
    myth_title: 'ПЕРСОНАЛЬНЫЙ МИФ',
    myth_subtitle: 'Расчет вашего уникального архетипического профиля',
    myth_desc: 'Узнайте свой персональный миф на основе даты рождения.',
    birth_date: 'Дата рождения',
    birth_time: 'Время рождения',
    birth_place: 'Место рождения',
    calculate: 'РАССЧИТАТЬ',
    
    // Consultations
    consult_title: 'КОНСУЛЬТАЦИИ',
    consult_subtitle: 'Индивидуальная работа с мастером',
    consult_desc: 'Персональные консультации для глубокого понимания вашего архетипа.',
    book_consult: 'ЗАПИСАТЬСЯ',
    
    // Master Page
    master_title: 'МАСТЕР',
    master_name: 'Константин Добрев',
    master_desc: 'Основатель школы Архетипов, практик с многолетним опытом.',
    reviews_title: 'ОТЗЫВЫ УЧЕНИКОВ',
    
    // Knowledge Base
    knowledge_title: 'БАЗА ЗНАНИЙ',
    faq_title: 'ТЕРМИНОЛОГИЯ',
    nav_title: 'НАВИГАЦИЯ ПО САЙТУ',
    
    // Navigation Page
    nav_welcome: 'Добро пожаловать',
    nav_register: 'Зарегистрируйтесь для полного доступа',
    nav_access_list: 'Что вы получите',
    nav_school: 'Школа Архетипов',
    nav_free_materials: 'Бесплатные материалы',
    nav_calculator: 'Алхимический калькулятор',
    nav_workshop: 'Мастерская',
    nav_artifacts: 'Артефакты',
    nav_services: 'Услуги',
    nav_contact: 'Связаться',
    nav_telegram: 'Написать в Telegram',
    nav_youtube: 'YouTube канал',
    nav_questions: 'Остались вопросы?',
    
    // Dashboard
    dashboard_title: 'Личный кабинет',
    my_courses: 'Мои курсы',
    notifications: 'Уведомления',
    messages: 'Личные сообщения',
    settings: 'Настройки',
    logout: 'Выйти',
    no_courses: 'У вас пока нет курсов',
    buy_course_prompt: 'Купите курс, чтобы начать обучение',
    view_courses: 'Посмотреть курсы',
    continue_learning: 'Продолжить обучение',
    write_master: 'Написать мастеру',
    new_orders: 'Новые заказы',
    users: 'Пользователи',
    profile: 'Профиль',
    
    // Auth
    login: 'Вход',
    register: 'Регистрация',
    welcome: 'Добро пожаловать!',
    create_account: 'Создать аккаунт',
    email: 'Email',
    password: 'Пароль',
    name: 'Имя',
    forgot_password: 'Забыли пароль?',
    no_account: 'Нет аккаунта?',
    have_account: 'Уже есть аккаунт?',
    
    // Common
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
    currency: 'грн',
    close: 'Закрыть',
    open: 'Открыть',
    search: 'Поиск',
    
    // Footer
    footer_school: 'Школа Архетипов',
    footer_desc: 'Авторская система духовных практик и самопознания.',
    footer_links: 'Ссылки',
    footer_contact: 'Контакты',
  }
};
