import { MenuItem, Course, VideoItem, Product, FaqItem } from './types';
import React from 'react';

// Using translation keys for labels. 
// Keys must match those in translations.ts
export const MENU_STRUCTURE: MenuItem[] = [
  { label: 'menu_home', path: '/' },
  {
    label: 'menu_knowledge',
    path: '/knowledge',
    subItems: [
      { label: 'sub_faq', path: '/knowledge/faq' },
      { label: 'sub_nav', path: '/knowledge/nav' },
      { label: 'sub_youtube', path: '/knowledge/youtube' },
      { label: 'sub_city', path: '/knowledge/city-of-gods' },
    ],
  },
  {
    label: 'menu_training',
    path: '/training',
    subItems: [
      { label: 'sub_year1', path: '/training/year-1' },
      { label: 'sub_year2', path: '/training/year-2' },
      { label: 'sub_year3', path: '/training/year-3' },
      { label: 'sub_year4', path: '/training/year-4' },
      { label: 'sub_roadmap', path: '/training/map' },
    ],
  },
  {
    label: 'menu_master',
    path: '/master',
    subItems: [
      { label: 'sub_about', path: '/master/about' },
      { label: 'sub_lessons', path: '/master/lessons' },
      { label: 'sub_ask', path: '/master/ask' },
    ],
  },
  { label: 'menu_consultations', path: '/consultations' },
  {
    label: 'menu_workshop',
    path: '/workshop',
    subItems: [
      { label: 'sub_coins', path: '/workshop/coins' },
      { label: 'sub_proc', path: '/workshop/procedures' },
      { 
        label: 'sub_seals', 
        path: '/workshop/seals',
        subItems: [
            { label: 'seal_trad', path: '/workshop/seals/traditional' },
            { label: 'seal_gen', path: '/workshop/seals/general' },
            { label: 'seal_oph', path: '/workshop/seals/ophiuchus' },
            { label: 'seal_bday', path: '/workshop/seals/birthday' },
            { label: 'seal_wealth', path: '/workshop/seals/wealth' },
            { label: 'seal_elem', path: '/workshop/seals/elements' },
        ]
      },
      { label: 'sub_attr', path: '/workshop/attributes' },
      { label: 'sub_jewel', path: '/workshop/jewelry' },
      { label: 'sub_myth', path: '/workshop/personal-myth' },
    ],
  },
];

export const MOCK_VIDEOS: VideoItem[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `vid-${i}`,
  title: `Архетипічний Інсайт #${i + 1}`,
  thumbnail: `https://picsum.photos/300/200?random=${i}`,
  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  description: 'Глибоке занурення у символічну мову всесвіту.',
}));

export const FAQ_ITEMS: FaqItem[] = [
  { id: '1', category: 'Езотерика', title: '8 чакра', content: `<div class="space-y-6">
    <div class="bg-gradient-to-r from-indigo-50 to-fuchsia-50 dark:from-indigo-900/30 dark:to-fuchsia-900/30 p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800">
      <p class="text-lg"><strong class="text-indigo-600 dark:text-indigo-400">8 чакра</strong> — точка накопичення матерії особистого <strong>Абсолюту (золото Алхіміків)</strong>. Вона є невиразною сутністю.</p>
    </div>
    
    <p>Під час практик Вона сприймається як <strong>дзеркало</strong> у якому відображається все що стосується людини. Накопичення матерії особистого Абсолюту у 8й чакрі відбувається під час <strong class="text-fuchsia-600 dark:text-fuchsia-400">перетворень стихії у вікнах бездоганності</strong>.</p>
    
    <p>За 8ю чакрою знаходиться <strong>потойбіччя</strong>, звідки Деміурги можуть контактувати із практикуючим. Чим більше накопичення матеріалу у 8й чакрі, тим більше уваги звертають Деміурги на практикуючого.</p>
    
    <p>Під час навчання ми відкриваємо у тілі <strong>вікна бездоганності</strong>. Та це відображається у 8й чакрі. <strong class="text-indigo-600 dark:text-indigo-400">Виконання практичних вправ за програмою навчання накопичує матеріал 8і чакри.</strong></p>
    
    <p>У 8й чакрі <strong>слід послідовно відкрити всі 4 вікна бездоганності</strong> задля того щоб упорядкувати накопичений матеріал та покращити свій вихід у потойбіччя.</p>
    
    <div class="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-200 dark:border-amber-800 mt-4">
      <h4 class="font-bold text-amber-700 dark:text-amber-400 mb-2">Ритуал 1 аркана.</h4>
      <p>Ритуал 1 аркана полягає у <strong class="text-fuchsia-600 dark:text-fuchsia-400">перетинанні 4х стихій та утворенні бездоганної сили</strong> (жезл в руці мага).</p>
    </div>
    
    <div class="mt-6">
      <p class="mb-4"><strong>Бездоганна сила подібна до сили астрологічної планети.</strong> Із повного набору астрологічних планет формується активна частина 8і чакри. Пасивна частина 8і чакри це 12 знаків зодіаку.</p>
      
      <div class="bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl">
        <p class="mb-3">Бездоганна сила залежить від співвідношення стихій у перетині:</p>
        <ul class="space-y-2">
          <li><strong class="text-cyan-600 dark:text-cyan-400">Більше мечів</strong> — створює Юпітер, Нептун та Гею</li>
          <li><strong class="text-red-600 dark:text-red-400">Більше чаш</strong> — створює Марс, Меркурій та Венеру</li>
          <li><strong class="text-amber-600 dark:text-amber-400">Більше пентаклів</strong> — створює Сатурн, Сонце та Місяць</li>
          <li><strong class="text-violet-600 dark:text-violet-400">Більше жезлів</strong> — створює Пустотність, Уран та Плутон</li>
        </ul>
      </div>
    </div>
    
    <p class="mt-4">Магічне мистецтво полягає у тому, щоб перетинати 4х стихії та створювати бездоганні сили, які впливають на дійсність. Це накопичує матеріал 8і чакри у майстра та дозволяє майстру формувати правила авторської дійсності.</p>
    
    <div class="bg-gradient-to-r from-fuchsia-100 to-violet-100 dark:from-fuchsia-900/30 dark:to-violet-900/30 p-5 rounded-2xl border-l-4 border-fuchsia-500 mt-4">
      <p><strong>Адже жодна людина не може протидіяти бездоганній силі, що утворена як перетин 4х стихій.</strong> Ця сила штовхає людину на поведінку Блазня (22 аркана).</p>
    </div>
  </div>` },
  { id: '2', category: 'Алхімія', title: 'Алхімічні константи', content: `
  <div class="space-y-8">
    <!-- Header -->
    <div class="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
      <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-4">Алхімічна константа — є синонім фізичного принципу на мові архетипів.</h2>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Традиційні науки не вказують те, як фізична планета впливає на властивості життя людини. <strong class="text-slate-900 dark:text-white">Алхімія</strong> частково вивчає ці фізичні принципи які прямо стосуються властивостей життя людини — <span class="text-indigo-600 dark:text-indigo-400 font-semibold">алхімічні константи</span>. Асоціюючи їх з астрологічними планетами та світилами.
      </p>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Астрологічні планети та світила впливають на людину як об'єктивні сутності найближчого космосу (Сонце має найбільший вплив). Можемо сучасних наук вони вимірюються та, як фізичний принцип себе проявляє. <strong class="text-slate-900 dark:text-white">Властивість життя людини чутлива до подібних випромінювань.</strong>
      </p>
      <p class="text-slate-600 dark:text-slate-400 text-sm italic">
        Мова архетипів дозволяє описати те як людина взаємодіє із фізичним принципом (мова наук цього не дозволяє) через міф та легенду. Астрологічний прогноз має використовувати мову архетипів та створювати міфологічну історію. Те як фізичні сили впливають на людину, те як людина підлаштовує їх особливим перетворенням, які називають об'єктивні фізичні принципи.
      </p>
    </div>

    <!-- Section 1: Дрібних частинок -->
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl px-6 py-3 text-center">
        <h3 class="font-bold uppercase tracking-wider">Фізичні принципи дрібних частинок</h3>
        <p class="text-sm opacity-90">Принципи відчуття існуючості людини</p>
      </div>
      
      <div class="grid gap-4">
        <!-- Jupiter -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">♃</div>
          <div>
            <h4 class="font-bold text-amber-600 dark:text-amber-400">Юпітер</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Фізичний принцип закономірності. Пов'язаний із властивістю імунітета людини.</p>
          </div>
        </div>

        <!-- Neptune -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">♆</div>
          <div>
            <h4 class="font-bold text-blue-600 dark:text-blue-400">Нептун</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Фізичний принцип тяжіння частинок протилежного заряду. Пов'язаний із відчуттям відповідності людини.</p>
          </div>
        </div>

        <!-- Leo/Sun -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">☉</div>
          <div>
            <h4 class="font-bold text-orange-600 dark:text-orange-400">Лев</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Фізичний принцип симетрії. Пов'язаний із відчуттям цілісності та завершеності людини.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: Форм та маси -->
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-fuchsia-400 to-pink-500 text-white rounded-xl px-6 py-3 text-center">
        <h3 class="font-bold uppercase tracking-wider">Фізичні принципи форм та маси</h3>
        <p class="text-sm opacity-90">Принципи почуття людини</p>
      </div>
      
      <div class="grid gap-4">
        <!-- Mars -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">♂</div>
          <div>
            <h4 class="font-bold text-red-600 dark:text-red-400">Марс</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Фізичний принцип тяжіння (гравітації). Пов'язаний із властивістю волі та дисципліни людини.</p>
          </div>
        </div>

        <!-- Mercury -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">☿</div>
          <div>
            <h4 class="font-bold text-slate-600 dark:text-slate-400">Меркурій</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Фізичний принцип механічних перетворень. Пов'язаний із відчуттям емоційної пластичності людини.</p>
          </div>
        </div>

        <!-- Venus -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-yellow-400 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">♀</div>
          <div>
            <h4 class="font-bold text-amber-600 dark:text-amber-400">Венера</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Фізичний принцип електростатичного заряду. Пов'язаний із відчуттям емпатії людини.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 3: Розуму -->
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-xl px-6 py-3 text-center">
        <h3 class="font-bold uppercase tracking-wider">Фізичні принципи розуму</h3>
        <p class="text-sm opacity-90">Принципи розуму людини</p>
      </div>
      
      <div class="grid gap-4">
        <!-- Saturn -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">♄</div>
          <div>
            <h4 class="font-bold text-amber-600 dark:text-amber-400">Сатурн</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Фізичний принцип електромагнетизму. Пов'язаний з ідентичністю людини та відчуттям вертикальних.</p>
          </div>
        </div>

        <!-- Sun -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">☀️</div>
          <div>
            <h4 class="font-bold text-yellow-600 dark:text-yellow-400">Сонце</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Фізичний принцип ядра електромагнітного поля. Пов'язаний із відчуттям егоцентризму людини.</p>
          </div>
        </div>

        <!-- Moon -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">☽</div>
          <div>
            <h4 class="font-bold text-slate-600 dark:text-slate-400">Місяць</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Фізичний принцип структурності електромагнітного поля. Пов'язаний із відчуттям системності дійсності в людини.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 4: Випромінювання -->
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-violet-400 to-purple-500 text-white rounded-xl px-6 py-3 text-center">
        <h3 class="font-bold uppercase tracking-wider">Фізичні принципи випромінювання</h3>
        <p class="text-sm opacity-90">Принципи життєдіяльності людини</p>
      </div>
      
      <div class="grid gap-4">
        <!-- Void/Emptiness -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-2xl shadow-lg flex-shrink-0 text-white">✧</div>
          <div>
            <h4 class="font-bold text-slate-700 dark:text-slate-300">Пустотність (всесвіт)</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Фізичний принцип властивості квітів. Пов'язаний із конфігурацією властивості життя в людині.</p>
          </div>
        </div>

        <!-- Uranus -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-300 to-teal-500 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">♅</div>
          <div>
            <h4 class="font-bold text-cyan-600 dark:text-cyan-400">Уран</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Фізичний принцип фонового радіоактивного випромінювання. Пов'язаний із відчуттям потенціалу життєвої сили людини.</p>
          </div>
        </div>

        <!-- Pluto -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">♇</div>
          <div>
            <h4 class="font-bold text-amber-700 dark:text-amber-400">Плутон</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Фізичний принцип джерела радіоактивного випромінювання. Пов'язаний із відчуттям зони життєдіяльності людини.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div class="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6">
      <div class="grid grid-cols-3 md:grid-cols-6 gap-3 text-center">
        <div class="p-2">
          <div class="text-2xl mb-1">♃</div>
          <div class="text-xs text-slate-500">Юпітер</div>
        </div>
        <div class="p-2">
          <div class="text-2xl mb-1">♄</div>
          <div class="text-xs text-slate-500">Сатурн</div>
        </div>
        <div class="p-2">
          <div class="text-2xl mb-1">♂</div>
          <div class="text-xs text-slate-500">Марс</div>
        </div>
        <div class="p-2">
          <div class="text-2xl mb-1">♀</div>
          <div class="text-xs text-slate-500">Венера</div>
        </div>
        <div class="p-2">
          <div class="text-2xl mb-1">☿</div>
          <div class="text-xs text-slate-500">Меркурій</div>
        </div>
        <div class="p-2">
          <div class="text-2xl mb-1">☽</div>
          <div class="text-xs text-slate-500">Місяць</div>
        </div>
      </div>
    </div>
  </div>
  ` },
  { id: '3', category: 'Методологія', title: 'DobrevOpusZodiac', content: `<div class="space-y-6">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-3">Dobrev Opus Zodiac</h2>
      <p class="text-slate-600 dark:text-slate-400">Авторська система духовних практик <strong class="text-slate-800 dark:text-white">Костянтина Добрева</strong> базується на ключах <strong class="text-indigo-600 dark:text-indigo-400">західної алхімії</strong></p>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-cyan-900/20 dark:to-indigo-900/20 p-6 border border-cyan-200/50 dark:border-cyan-800/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all">
        <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-bl-full"></div>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-2xl">♈</span>
          <h4 class="font-bold text-slate-800 dark:text-white">Знаки Зодіаку</h4>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">Ми використовуємо <strong class="text-cyan-600 dark:text-cyan-400">знаки зодіаку</strong> як архетипи.</p>
        <div class="bg-white/60 dark:bg-slate-800/60 rounded-xl p-3 text-sm">
          <p class="text-slate-700 dark:text-slate-300">Це дозволяє кожній людині асоціювати себе із архетипами. Та <strong>бачити архетипічні прояви</strong> у інших людях.</p>
        </div>
      </div>
      
      <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 p-6 border border-violet-200/50 dark:border-violet-800/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all">
        <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-400/20 to-transparent rounded-bl-full"></div>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-2xl">📚</span>
          <h4 class="font-bold text-slate-800 dark:text-white">Програма Навчання</h4>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">Ми сформували <strong class="text-violet-600 dark:text-violet-400">програму навчання</strong>.</p>
        <div class="bg-white/60 dark:bg-slate-800/60 rounded-xl p-3 text-sm">
          <p class="text-slate-700 dark:text-slate-300">Це система послідовного розвитку людини через архетипічні форми. Виконуючи <strong>медитативні практики</strong> ви набуваєте цілісності та наближаєтесь до власного архетипу.</p>
        </div>
      </div>
      
      <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 border border-amber-200/50 dark:border-amber-800/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all">
        <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-transparent rounded-bl-full"></div>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-2xl">🃏</span>
          <h4 class="font-bold text-slate-800 dark:text-white">Карти ТАРО</h4>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">Ми дослідили відповідність <strong class="text-amber-600 dark:text-amber-400">карт ТАРО</strong> до шляху героя.</p>
        <div class="bg-white/60 dark:bg-slate-800/60 rounded-xl p-3 text-sm">
          <p class="text-slate-700 dark:text-slate-300">Це надало <strong>визначення архетипів через карти ТАРО</strong>. Та дозволило звертатись до архетипів через містичну практику.</p>
        </div>
      </div>
      
      <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
        <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-bl-full"></div>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-2xl">🧠</span>
          <h4 class="font-bold text-slate-800 dark:text-white">Термінологія Гештальту</h4>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">Ми використовуємо <strong class="text-emerald-600 dark:text-emerald-400">термінологію гештальту</strong>.</p>
        <div class="bg-white/60 dark:bg-slate-800/60 rounded-xl p-3 text-sm">
          <p class="text-slate-700 dark:text-slate-300">Це поглиблює розуміння архетипів. Та дозволяє виявляти їх прояв у повсякденному житті. <em class="text-slate-500">(Через гештальт зручно виявляти викривлення архетипів)</em></p>
        </div>
      </div>
    </div>
    
    <div class="mt-6 p-5 bg-gradient-to-r from-indigo-100 via-violet-100 to-fuchsia-100 dark:from-indigo-900/30 dark:via-violet-900/30 dark:to-fuchsia-900/30 rounded-2xl border border-indigo-200/50 dark:border-indigo-700/50 text-center">
      <p class="text-slate-700 dark:text-slate-300"><strong class="text-indigo-600 dark:text-indigo-400">4 стовпи методології:</strong> Зодіакальні архетипи • Структурована програма • Карти ТАРО • Гештальт-підхід</p>
    </div>
  </div>` },
  { id: '4', category: 'Архетипи', title: 'Шлях Героя', content: `<div class="space-y-6">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-3">ШЛЯХ ГЕРОЯ</h2>
      <p class="text-slate-600 dark:text-slate-400">Це архетиповий сценарій подій, який забезпечує зростання людини.<br/>В школі архетипів ми поділяємо шлях героя на <strong class="text-indigo-600 dark:text-indigo-400">4 чверті</strong>:</p>
    </div>
    
    <div class="grid md:grid-cols-4 gap-4">
      <div class="relative group">
        <div class="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
        <div class="relative bg-white dark:bg-slate-800 rounded-2xl p-5 border border-pink-200 dark:border-pink-800 h-full">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-xl mb-3 mx-auto">♥</div>
          <h4 class="font-bold text-center text-slate-800 dark:text-white mb-2">Особисті стосунки</h4>
          <p class="text-xs text-slate-600 dark:text-slate-400 text-center">Простір який допомагає нам усвідомлювати свої потреби</p>
          <p class="text-[10px] text-pink-500 text-center mt-2 font-medium">(стихія мечів)</p>
        </div>
      </div>
      
      <div class="relative group">
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
        <div class="relative bg-white dark:bg-slate-800 rounded-2xl p-5 border border-cyan-200 dark:border-cyan-800 h-full">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xl mb-3 mx-auto">🏆</div>
          <h4 class="font-bold text-center text-slate-800 dark:text-white mb-2">Суспільні стосунки</h4>
          <p class="text-xs text-slate-600 dark:text-slate-400 text-center">Простір який допомагає нам підтримувати контакт із потребою</p>
          <p class="text-[10px] text-cyan-500 text-center mt-2 font-medium">(стихія чаш)</p>
        </div>
      </div>
      
      <div class="relative group">
        <div class="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
        <div class="relative bg-white dark:bg-slate-800 rounded-2xl p-5 border border-amber-200 dark:border-amber-800 h-full">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl mb-3 mx-auto">💼</div>
          <h4 class="font-bold text-center text-slate-800 dark:text-white mb-2">Професійна діяльність</h4>
          <p class="text-xs text-slate-600 dark:text-slate-400 text-center">Простір який допомагає нам створити поведінку задоволення потреби</p>
          <p class="text-[10px] text-amber-500 text-center mt-2 font-medium">(стихія пентаклів)</p>
        </div>
      </div>
      
      <div class="relative group">
        <div class="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
        <div class="relative bg-white dark:bg-slate-800 rounded-2xl p-5 border border-violet-200 dark:border-violet-800 h-full">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-xl mb-3 mx-auto">✨</div>
          <h4 class="font-bold text-center text-slate-800 dark:text-white mb-2">Відновлення гармонії</h4>
          <p class="text-xs text-slate-600 dark:text-slate-400 text-center">Простір який допомагає нам засвоїти досвід відбувшихся подій</p>
          <p class="text-[10px] text-violet-500 text-center mt-2 font-medium">(стихія жезлів)</p>
        </div>
      </div>
    </div>
    
    <div class="bg-gradient-to-r from-indigo-50 to-fuchsia-50 dark:from-indigo-900/20 dark:to-fuchsia-900/20 rounded-2xl p-6 mt-6">
      <p class="text-center mb-4">В <strong class="text-indigo-600 dark:text-indigo-400">школі архетипів</strong> ми визначаємо 12 архетипів як 12 етапів шляху героя.</p>
      <p class="text-center text-slate-700 dark:text-slate-300"><strong>Шлях героя</strong> — це архетипічний цикл життєдіяльності людини. Кожен цикл шляху героя надає людині особисте зростання.</p>
    </div>
    
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <h4 class="font-bold text-slate-800 dark:text-white mb-4 text-center">Цикл контакту з потребою:</h4>
      <div class="grid md:grid-cols-2 gap-3">
        <div class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
          <span class="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold">1</span>
          <p class="text-sm text-slate-700 dark:text-slate-300">Людина має <strong class="text-pink-600 dark:text-pink-400">усвідомити</strong> свою потребу.</p>
        </div>
        <div class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
          <span class="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold">2</span>
          <p class="text-sm text-slate-700 dark:text-slate-300">Людина має <strong class="text-cyan-600 dark:text-cyan-400">контактувати</strong> із тим що потребує.</p>
        </div>
        <div class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
          <span class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">3</span>
          <p class="text-sm text-slate-700 dark:text-slate-300">Людина має <strong class="text-amber-600 dark:text-amber-400">задовольнити</strong> свою потребу.</p>
        </div>
        <div class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
          <span class="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-violet-600 dark:text-violet-400 font-bold">4</span>
          <p class="text-sm text-slate-700 dark:text-slate-300">Людина має <strong class="text-violet-600 dark:text-violet-400">засвоїти</strong> отриманий досвід.</p>
        </div>
      </div>
    </div>
  </div>` },
  { id: '5', category: 'Психологія', title: 'Архетипи', content: `
  <div class="space-y-8">
    <!-- Header -->
    <div class="bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 rounded-2xl p-6 border border-indigo-300 dark:border-indigo-700">
      <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-4 text-center">ІЄРОГЛІФІЧНЕ ПИСЬМО | ВИЗНАЧЕННЯ 12 АРХЕТИПІВ (ЗОДІАК)</h2>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        В школі архетипів ми визначаємо із шляху героя 12 архетипів як етапи шляху. Ми <strong class="text-indigo-600 dark:text-indigo-400">асоціюємо етапи шляху героя із архетипами</strong> як знаками зодіаку. Це дозволяє кожній людині пов'язати себе із певним архетипом та духовною практикою.
      </p>
    </div>

    <!-- 12 Archetypes Grid -->
    <div class="space-y-6">
      
      <!-- Scorpio -->
      <div class="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-800">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">♏</div>
          <div class="flex-1">
            <h3 class="font-bold text-rose-700 dark:text-rose-400 text-lg mb-2">СКОРПІОН</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Архетип початку нового шляху. Людина починає робити те, що ніколи не робила.</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Гліф знаходиться у 1му секторі на колі архетипів. Він являє собою весь сектор, у якому відкриваються <strong class="text-slate-900 dark:text-white">три лінії, вигин та стрілка</strong>. Це зона початку нового шляху.
            </p>
            <div class="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              <strong>Гліф читається:</strong> Свідомість всього сектору позначає, що для початку нового шляху необхідна повна присутність у об'єктивній дійсності.
            </div>
          </div>
        </div>
      </div>

      <!-- Taurus -->
      <div class="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">♉</div>
          <div class="flex-1">
            <h3 class="font-bold text-emerald-700 dark:text-emerald-400 text-lg mb-2">ТЕЛЕЦЬ</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Архетип руху за новим шляхом. Людина продовжує робити не зупиняючись.</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Гліф знаходиться у 2му секторі на колі архетипів. Він являє собою <strong class="text-slate-900 dark:text-white">коло в яке одна лінія входить та з якого виходить інша лінія</strong>. Це зона руху за шляхом.
            </p>
            <div class="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              <strong>Гліф читається:</strong> Для підтримки руху за шляхом необхідно позначити зону, у якій відбувається активна динаміка. У цю зону має бути вхід ресурсів, із цієї зони має бути вихід ресурсів.
            </div>
          </div>
        </div>
      </div>

      <!-- Virgo -->
      <div class="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-violet-200 dark:border-violet-800">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">♍</div>
          <div class="flex-1">
            <h3 class="font-bold text-violet-700 dark:text-violet-400 text-lg mb-2">ДІВА</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Архетип дива та алхімії. З людиною трапляється диво, вона отримує результат від того, що робить (наче народжується дитина).</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Гліф знаходиться у 3му секторі на колі архетипів. Він являє собою <strong class="text-slate-900 dark:text-white">дві вигнуті лінії та одну пряму</strong>. Це зона дива на шляху.
            </p>
            <div class="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              <strong>Гліф читається:</strong> На вигнутих лініях акумулюються позитивний та негативний заряди, що вільно присутні у просторі. На прямій лінії відбувається об'єднання накопичених зарядів.
            </div>
          </div>
        </div>
      </div>

      <!-- Aries -->
      <div class="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">♈</div>
          <div class="flex-1">
            <h3 class="font-bold text-orange-700 dark:text-orange-400 text-lg mb-2">ОВЕН</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Архетип відокремлення ворогів та союзників на шляху. Людина відрізняє всі люди їй допомагають, а всі заважають.</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Гліф знаходиться у 4му секторі на колі архетипів. Він являє собою <strong class="text-slate-900 dark:text-white">лінію, яка утворює петлю (перетин 2х ліній)</strong>. Це зона відокремлення ворогів від союзників на шляху.
            </p>
            <div class="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              <strong>Гліф читається:</strong> Для визначення ворогів та союзників на шляху необхідно створити штучну напругу. Тоді ті, що не витримає напруги, виявляться ворогами та будуть відокремлені.
            </div>
          </div>
        </div>
      </div>

      <!-- Capricorn -->
      <div class="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800/50 dark:to-gray-800/50 rounded-2xl p-6 border border-slate-300 dark:border-slate-600">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">♑</div>
          <div class="flex-1">
            <h3 class="font-bold text-slate-700 dark:text-slate-300 text-lg mb-2">КОЗЕРІГ</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Архетип долання очікуваних випробувань (кустільні навантаження). Людина розуміє що має зробити та робить це.</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Гліф знаходиться у 5му секторі на колі архетипів. Він являє собою <strong class="text-slate-900 dark:text-white">лінію, що складається з 3х вигинів та утворюють петлю</strong>. Це зона долання очікуваних випробувань на шляху.
            </p>
            <div class="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              <strong>Гліф читається:</strong> Долання очікуваних випробувань на шляху складається із 3 етапів — виклик, дуель, кардинальна зміна подій після дуелі.
            </div>
          </div>
        </div>
      </div>

      <!-- Gemini -->
      <div class="bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">♊</div>
          <div class="flex-1">
            <h3 class="font-bold text-cyan-700 dark:text-cyan-400 text-lg mb-2">БЛИЗНЮКИ</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Архетип перебування напризволі зрозумілого шляху (набуття добробуту). Людина вже зробила все, що мала зробити.</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Гліф знаходиться у 6му секторі на колі архетипів. Він являє собою <strong class="text-slate-900 dark:text-white">набір 4х ліній 2 вертикальні та 2 горизонтальні</strong>. Це зона кінця зрозумілого шляху.
            </p>
            <div class="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              <strong>Гліф читається:</strong> Кінець зрозумілого шляху виходить у тому випадку, коли людина виявляється заблокована обставинами, що склалися. Обставини блокують будь-який рух сили.
            </div>
          </div>
        </div>
      </div>

      <!-- Sagittarius -->
      <div class="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">♐</div>
          <div class="flex-1">
            <h3 class="font-bold text-indigo-700 dark:text-indigo-400 text-lg mb-2">СТРІЛЕЦЬ</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Архетип нових цілей на шляху. Людина створює розуміння себе щоб рухатись у житті.</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Гліф знаходиться у 7му секторі на колі архетипів. Він являє собою <strong class="text-slate-900 dark:text-white">одну пряму та одну діагональну лінію</strong>. Це зона встановлення нових цілей на шляху.
            </p>
            <div class="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              <strong>Гліф читається:</strong> Необхідно визначити найкоротший шлях до мети та на тлі цього шляху знайти найкоротший. Конструкція з прямого та короткого шляхів створює образ нової мети.
            </div>
          </div>
        </div>
      </div>

      <!-- Leo -->
      <div class="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">♌</div>
          <div class="flex-1">
            <h3 class="font-bold text-amber-700 dark:text-amber-400 text-lg mb-2">ЛЕВ</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Архетип отримання нових ресурсів на шляху (керування людьми, лідерський ресурс). Людина створює розуміння інших людей щоб отримати ресурси.</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Гліф знаходиться у 8му секторі на колі архетипів. Він являє собою <strong class="text-slate-900 dark:text-white">лінію, вигнутою малим та великим колом</strong>. Це зона отримання нових ресурсів на шляху.
            </p>
            <div class="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              <strong>Гліф читається:</strong> Нові ресурси на шляху це <strong>приєднування тих ресурсів</strong>, які є. Необхідно влучно та лагідно повторювати тих процеси, які вже діють, результат та урахуванням пастки, що витікають із сфери.
            </div>
            <div class="mt-2 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              Таким чином підвищується ефективність (<strong>оптимізація</strong>) того, що вже відбувається та надаються нові ресурси на шляху.
            </div>
          </div>
        </div>
      </div>

      <!-- Pisces -->
      <div class="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-teal-200 dark:border-teal-800">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">♓</div>
          <div class="flex-1">
            <h3 class="font-bold text-teal-700 dark:text-teal-400 text-lg mb-2">РИБИ</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Архетип долання несподіваних випробувань на шляху (професійна діяльність). Людина створює стандартні моделі поведінки, які допомагають долати нестандартні події.</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Гліф знаходиться у 9му секторі на колі архетипів. Він являє собою <strong class="text-slate-900 dark:text-white">дві півколи, об'єднані однією лінією</strong>. Це зона подолання несподіваних випробувань на шляху.
            </p>
            <div class="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              <strong>Гліф читається:</strong> Дія позначає півсферу із Сонцем. Реакція на дію позначає півсферу з Місяцем. Дія та реакція на дію звикнуті в єдиним цілим — напередбачене випробування.
            </div>
          </div>
        </div>
      </div>

      <!-- Aquarius -->
      <div class="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-sky-200 dark:border-sky-800">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">♒</div>
          <div class="flex-1">
            <h3 class="font-bold text-sky-700 dark:text-sky-400 text-lg mb-2">ВОДОЛІЙ</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Архетип пошуку нового шляху. Людина творче ставиться до життя щоб знайти гармонію.</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Гліф знаходиться у 10му секторі на колі архетипів. Він являє собою <strong class="text-slate-900 dark:text-white">весь сектор, заповнений 12 «кольоровими» точками та обмежений хвилястими лініями</strong>. Це зона пошуку нового шляху.
            </p>
            <div class="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              <strong>Гліф читається:</strong> Хвилясті лінії позначають, що простір пошуку нового шляху відбувається у <strong>хаотичному середовищі</strong>.
            </div>
            <div class="mt-2 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              У зоні все, що міняється є хибним. <strong>Кольорові точки</strong> позначають правильні рішення, які не змінюються у хаотичному середовищі.
            </div>
            <div class="mt-2 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              Пошук нового шляху це постійна перевірка на істинність та множинність. Коли знайдено 12 правильних та стійких рішень, знайдено новий шлях.
            </div>
          </div>
        </div>
      </div>

      <!-- Libra -->
      <div class="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-6 border border-pink-200 dark:border-pink-800">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">♎</div>
          <div class="flex-1">
            <h3 class="font-bold text-pink-700 dark:text-pink-400 text-lg mb-2">ТЕРЕЗИ</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Архетип руху за новим невідомим шляхом (здорові принципи). Людина керується принципами, щоб рухатись з невідомим та подіями.</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Гліф знаходиться у 11му секторі на колі архетипів. Він являє собою <strong class="text-slate-900 dark:text-white">весь сектор, з якого виступає півколо</strong>. Це зона руху за новим (невідомим) шляхом.
            </p>
            <div class="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              <strong>Гліф читається:</strong> Сектор, відділений рівними лініями, означає, що в наслу <strong>підкорені всі сили</strong>.
            </div>
            <div class="mt-2 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              Півколо, що в мене сектор, означає повну силу, тому не підлягає контролю. <strong>Вона визначає характер руху новим шляхом.</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Cancer -->
      <div class="bg-gradient-to-r from-fuchsia-50 to-purple-50 dark:from-fuchsia-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-fuchsia-200 dark:border-fuchsia-800">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">♋</div>
          <div class="flex-1">
            <h3 class="font-bold text-fuchsia-700 dark:text-fuchsia-400 text-lg mb-2">РАК</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Архетип кінця шляху та перебування вдома (вміння досягнути до себе). Людина живе у тому просторі який сама створює.</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Гліф знаходиться у 12му секторі на колі архетипів. Він являє собою <strong class="text-slate-900 dark:text-white">весь сектор, розділений на дві частини. У кожній із частин зображено коло та вигнута лінія (знак Інь-Янь)</strong>. Це зона закінчення шляху, перебування вдома.
            </p>
            <div class="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              <strong>Гліф читається:</strong> Поділ сектору означає, що простір кінця шляху (Дому) це простір у якому поєднуються всі можливі дуальності, їх причини так і наслідки.
            </div>
            <div class="mt-2 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              Кружечки з вигнутою лінією (знак Інь-Янь) виражають механізм зв'язку дуальних сутностей. Дуальні сутності об'єднуються через взаємне проникнення одна в одну за рахунок вічного співвідношення частин.
            </div>
            <div class="mt-2 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              Коли всі дуальні сутності у просторі життя взаємно проникають одна в одну та перебувають у вічному співвідношенні, виникає кінець шляху, перебування вдома.
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  \` },
  { id: '6', category: 'Основи', title: 'Базові визначення', content: \`
  <div class="space-y-8">
    <!-- Top Yellow Block - Objective Reality -->
    <div class="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700 space-y-4">
      <div>
        <p class="text-slate-700 dark:text-slate-300">
          <strong class="text-slate-900 dark:text-white">Об'єктивна дійсність</strong> — те що вивчають традиційні науки.
        </p>
        <p class="text-slate-700 dark:text-slate-300">
          <strong class="text-slate-900 dark:text-white">Відчуття дійсності</strong> — те як об'єктивна дійсність сприймається людиною через її когнітивні системи.
        </p>
      </div>
      
      <div class="pl-6 border-l-4 border-yellow-400 space-y-3">
        <p class="text-slate-700 dark:text-slate-300">
          <strong class="text-indigo-600 dark:text-indigo-400">Авторський простір</strong> — зона об'єктивної дійсності яку майстер упорядкував містичними силами. Така зона упорядковується за сценарієм одного або декількох архетипів (набір з 6 карт таро). Чим більше архетипічних сценаріїв містить авторський простір, тим більше він схожий на релігійний храм.
        </p>
        <p class="text-slate-700 dark:text-slate-300">
          <strong class="text-fuchsia-600 dark:text-fuchsia-400">Накопичення Абсолюту</strong> — життєдіяльність авторського простору майстер дозволяє накопичувати йому матерію сутності Абсолюту. Збільшувати свій прояв у потойбіччі та контакт із Деміургами.
        </p>
      </div>
    </div>

    <!-- Primary Myth Section -->
    <div class="bg-gradient-to-r from-cyan-50 to-sky-100 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800 space-y-4">
      <div class="space-y-3">
        <p class="text-slate-700 dark:text-slate-300">
          <strong class="text-slate-900 dark:text-white">Первісний міф</strong> — це міф, відтворення якого проявляє силу архетипу як алхімічну константу, астрологічну планету та фізичний принцип об'єктивної дійсності.
        </p>
        <p class="text-slate-700 dark:text-slate-300">
          <strong class="text-slate-900 dark:text-white">Сценарій первісного міфу</strong> — складається з 4х карт малих арканів, чотирьох стихій. Що відповідає колу шляху героя.
        </p>
        <p class="text-slate-700 dark:text-slate-300">
          <strong class="text-slate-900 dark:text-white">Причина первісного міфу</strong> — є великий аркан із 1 по 12й, що ініціює у суспільстві сценарій первісного міфу.
        </p>
        <p class="text-slate-700 dark:text-slate-300">
          <strong class="text-slate-900 dark:text-white">Наслідок первісного міфу</strong> — є великий аркан із 22 по 12й, що дозволяє суспільству засвоїти наслідок первісного міфу.
        </p>
      </div>
    </div>

    <!-- Gestalt Cycle - Central Mandala -->
    <div class="relative">
      <!-- 4 Corner Blocks -->
      <div class="grid grid-cols-2 gap-4 md:gap-8">
        <!-- Top Left - Засвоєння досвіду -->
        <div class="bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-2xl p-4 border border-amber-300 dark:border-amber-700">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-amber-200 dark:bg-amber-800 flex items-center justify-center text-xl">⏳</div>
            <div>
              <h4 class="font-bold text-amber-700 dark:text-amber-400 text-sm">Засвоєння досвіду</h4>
              <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">Людина має засвоїти досвід подій що відбулись та утворити життєву силу.</p>
            </div>
          </div>
        </div>

        <!-- Top Right - Усвідомлення потреби -->
        <div class="bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-2xl p-4 border border-rose-300 dark:border-rose-700">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-rose-200 dark:bg-rose-800 flex items-center justify-center text-xl">💡</div>
            <div>
              <h4 class="font-bold text-rose-700 dark:text-rose-400 text-sm">Усвідомлення потреби</h4>
              <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">Людина має усвідомити що вона щось потребує та сформулювати що саме.</p>
            </div>
          </div>
        </div>

        <!-- Bottom Left - Задоволення потреби -->
        <div class="bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl p-4 border border-emerald-300 dark:border-emerald-700">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center text-xl">✅</div>
            <div>
              <h4 class="font-bold text-emerald-700 dark:text-emerald-400 text-sm">Задоволення потреби</h4>
              <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">Людина має сформувати поведінку того як її потреба задовольняється.</p>
            </div>
          </div>
        </div>

        <!-- Bottom Right - Контактування з потребою -->
        <div class="bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl p-4 border border-violet-300 dark:border-violet-700">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-violet-200 dark:bg-violet-800 flex items-center justify-center text-xl">🤝</div>
            <div>
              <h4 class="font-bold text-violet-700 dark:text-violet-400 text-sm">Контактування з потребою</h4>
              <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">Людина має підтримувати контакт з тим що потребує.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Definitions List -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
      <div class="space-y-3">
        <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
          <p class="text-slate-700 dark:text-slate-300">
            <strong class="text-indigo-600 dark:text-indigo-400">Рефлексія</strong> — реакції тіла на середовище.<br/>
            <span class="text-sm text-slate-500">Ваше тіло розуміє що для вас добре, та воно не може обманювати. Тіло реагує на події циклу гештальта теплими почуттями або біллю.</span>
          </p>
        </div>
        
        <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
          <p class="text-slate-700 dark:text-slate-300">
            <strong class="text-indigo-600 dark:text-indigo-400">Керування тілом</strong> — гімнастика у подіях.<br/>
            <span class="text-sm text-slate-500">Ви користе діями тіла коли з вами відбуваються події гештальта.</span>
          </p>
        </div>
        
        <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
          <p class="text-slate-700 dark:text-slate-300">
            <strong class="text-indigo-600 dark:text-indigo-400">Розуміння</strong> — думки які ви склали.<br/>
            <span class="text-sm text-slate-500">Ви маєте докладати зусиль щоб скласти повне розуміння себе та подій циклу гештальту.</span>
          </p>
        </div>
        
        <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
          <p class="text-slate-700 dark:text-slate-300">
            <strong class="text-fuchsia-600 dark:text-fuchsia-400">Ідентичність</strong> — ваша внутрішня сутність.<br/>
            <span class="text-sm text-slate-500">Валет — практика дослідження ідентичності</span>
          </p>
        </div>
        
        <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
          <p class="text-slate-700 dark:text-slate-300">
            <strong class="text-fuchsia-600 dark:text-fuchsia-400">Персоналіті</strong> — ваш прояв у житті.<br/>
            <span class="text-sm text-slate-500">Лицар — практика прояву персоналіті</span>
          </p>
        </div>
        
        <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
          <p class="text-slate-700 dark:text-slate-300">
            <strong class="text-fuchsia-600 dark:text-fuchsia-400">Еготизм</strong> — ваша здібність структурувати поле життя.<br/>
            <span class="text-sm text-slate-500">Дама — практика керування власним полем життя</span>
          </p>
        </div>
        
        <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
          <p class="text-slate-700 dark:text-slate-300">
            <strong class="text-amber-600 dark:text-amber-400">Поле життя</strong> — те що поєднує людей у суспільство.<br/>
            <span class="text-sm text-slate-500">Король — практика керування загальним полем життя людей.</span>
          </p>
        </div>
        
        <div>
          <p class="text-slate-700 dark:text-slate-300">
            <strong class="text-amber-600 dark:text-amber-400">Туз</strong> — єдина сутність яка утворена з багатьох малих сутностей.
          </p>
        </div>
      </div>
    </div>
  </div>
  ` },
  { id: '7', category: 'Практика', title: 'Практика 4х Королів', content: `
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center space-y-3">
      <h2 class="text-2xl font-bold text-slate-800 dark:text-white">ПРАКТИКА КОРОЛЯ</h2>
      <p class="text-slate-600 dark:text-slate-400">
        Ця практика завжди пов'язана із <strong class="text-indigo-600 dark:text-indigo-400">2ма</strong> та <strong class="text-fuchsia-600 dark:text-fuchsia-400">Тузом</strong> стихій
      </p>
    </div>

    <!-- Main Description -->
    <div class="bg-gradient-to-r from-indigo-50 to-fuchsia-50 dark:from-indigo-900/20 dark:to-fuchsia-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-center">
        Через <strong class="text-slate-800 dark:text-white">2 стихії</strong> Король, виявляє найдрібніші прояви стихії.<br/>
        Звертаючись до <strong class="text-indigo-600 dark:text-indigo-400">Туза стихії</strong> — Король об'єднує всі прояви стихії у сутність старшого масштабу. <span class="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">Егрегор</span> (район міста, місто, біосфера).<br/>
        Спираючись на Туза стихії Король може дрібнити стихію, тобто переводити у <strong class="text-slate-800 dark:text-white">2ма</strong>.
      </p>
    </div>

    <!-- 4 Kings Grid -->
    <div class="grid md:grid-cols-2 gap-6">
      
      <!-- King of Swords - Aries -->
      <div class="bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/30 rounded-2xl p-6 border border-cyan-300 dark:border-cyan-700">
        <div class="flex items-start gap-4">
          <div class="w-16 h-24 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center text-3xl border-2 border-cyan-400">
            ⚔️
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-cyan-700 dark:text-cyan-400 mb-2">
              <span class="text-lg">♈</span> Овен — король стихії мечів
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Дрібнить <strong class="text-slate-800 dark:text-white">бажання</strong> людей навколо себе (2мечів) та поєднує бажання людей для посилення колективного простору (Туз мечів).
            </p>
          </div>
          <div class="w-12 h-18 bg-white dark:bg-slate-800 rounded-lg shadow flex items-center justify-center text-2xl border border-cyan-300">
            🗡️
          </div>
        </div>
        <div class="mt-3 text-xs text-cyan-600 dark:text-cyan-500 uppercase tracking-wider text-center">
          Повітря • Бажання • Колективний простір
        </div>
      </div>

      <!-- King of Cups - Sagittarius -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-6 border border-blue-300 dark:border-blue-700">
        <div class="flex items-start gap-4">
          <div class="w-16 h-24 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center text-3xl border-2 border-blue-400">
            🏆
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-blue-700 dark:text-blue-400 mb-2">
              <span class="text-lg">♐</span> Стрілець — король стихії чаш
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Дрібнить <strong class="text-slate-800 dark:text-white">почуття</strong> людей навколо себе (2чаш) та поєднує почуття людей для посилення колективного добробуту (Туз чаш).
            </p>
          </div>
          <div class="w-12 h-18 bg-white dark:bg-slate-800 rounded-lg shadow flex items-center justify-center text-2xl border border-blue-300">
            🍷
          </div>
        </div>
        <div class="mt-3 text-xs text-blue-600 dark:text-blue-500 uppercase tracking-wider text-center">
          Вода • Почуття • Колективний добробут
        </div>
      </div>

      <!-- King of Pentacles - Aquarius -->
      <div class="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl p-6 border border-emerald-300 dark:border-emerald-700">
        <div class="flex items-start gap-4">
          <div class="w-16 h-24 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center text-3xl border-2 border-emerald-400">
            👑
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-emerald-700 dark:text-emerald-400 mb-2">
              <span class="text-lg">♒</span> Водолій — король стихії пентаклів
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Дрібнить <strong class="text-slate-800 dark:text-white">знання</strong> людей навколо себе (2пентаклів) та поєднує знання людей для посилення колективної професійної діяльності (Туз пентаклів).
            </p>
          </div>
          <div class="w-12 h-18 bg-white dark:bg-slate-800 rounded-lg shadow flex items-center justify-center text-2xl border border-emerald-300">
            ⭐
          </div>
        </div>
        <div class="mt-3 text-xs text-emerald-600 dark:text-emerald-500 uppercase tracking-wider text-center">
          Земля • Знання • Професійна діяльність
        </div>
      </div>

      <!-- King of Wands - Scorpio -->
      <div class="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-2xl p-6 border border-orange-300 dark:border-orange-700">
        <div class="flex items-start gap-4">
          <div class="w-16 h-24 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center text-3xl border-2 border-orange-400">
            🔥
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-orange-700 dark:text-orange-400 mb-2">
              <span class="text-lg">♏</span> Скорпіон — король стихії жезлів
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Дрібнить <strong class="text-slate-800 dark:text-white">увагу</strong> людей навколо себе (2жезлів) та поєднує увагу людей для посилення зони життєдіяльності (Туз жезлів).
            </p>
          </div>
          <div class="w-12 h-18 bg-white dark:bg-slate-800 rounded-lg shadow flex items-center justify-center text-2xl border border-orange-300">
            🪄
          </div>
        </div>
        <div class="mt-3 text-xs text-orange-600 dark:text-orange-500 uppercase tracking-wider text-center">
          Вогонь • Увага • Зона життєдіяльності
        </div>
      </div>

    </div>

    <!-- Summary Table -->
    <div class="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6">
      <h4 class="font-bold text-slate-800 dark:text-white mb-4 text-center">Структура практики</h4>
      <div class="grid grid-cols-4 gap-2 text-center text-xs">
        <div class="bg-cyan-100 dark:bg-cyan-900/50 p-3 rounded-xl">
          <div class="text-2xl mb-1">⚔️</div>
          <div class="font-bold text-cyan-700 dark:text-cyan-400">Мечі</div>
          <div class="text-slate-500">Повітря</div>
        </div>
        <div class="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl">
          <div class="text-2xl mb-1">🏆</div>
          <div class="font-bold text-blue-700 dark:text-blue-400">Чаші</div>
          <div class="text-slate-500">Вода</div>
        </div>
        <div class="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-xl">
          <div class="text-2xl mb-1">⭐</div>
          <div class="font-bold text-emerald-700 dark:text-emerald-400">Пентаклі</div>
          <div class="text-slate-500">Земля</div>
        </div>
        <div class="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-xl">
          <div class="text-2xl mb-1">🔥</div>
          <div class="font-bold text-orange-700 dark:text-orange-400">Жезли</div>
          <div class="text-slate-500">Вогонь</div>
        </div>
      </div>
    </div>
  </div>
  ` },
  { id: '8', category: 'Астрологія', title: 'Чорний місяць', content: `
  <div class="space-y-8">
    <!-- Header with Lilith symbol -->
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <div class="flex-1 space-y-4">
        <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
          Положення чорного місяця в натальній карті <strong class="text-slate-800 dark:text-white">позначає що в людині відповідна зодіакальна якість застрягла на 1й стадії розвитку</strong> — стадія прийняття себе. Це руйнівна стадія архетипу, коли архетип проявляє себе у <span class="text-red-500 font-semibold">деструктивний спосіб</span>.
        </p>
        <p class="text-sm text-indigo-600 dark:text-indigo-400">
          Зі стадіями розвитку архетипів можна ознайомитись на 1му курсі Школи архетипів.
        </p>
      </div>
      
      <!-- Lilith Symbol Circle -->
      <div class="flex-shrink-0 w-48 h-48 relative">
        <div class="absolute inset-0 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center">
          <div class="text-center">
            <div class="text-5xl font-bold text-slate-800 dark:text-white mb-1">☾</div>
            <div class="text-xs uppercase tracking-widest text-slate-500">LILITH</div>
          </div>
        </div>
        <!-- Zodiac symbols around -->
        <div class="absolute -top-2 left-1/2 -translate-x-1/2 text-lg">♈</div>
        <div class="absolute top-4 right-2 text-lg">♉</div>
        <div class="absolute top-1/3 -right-2 text-lg">♊</div>
        <div class="absolute bottom-1/3 -right-2 text-lg">♋</div>
        <div class="absolute bottom-4 right-2 text-lg">♌</div>
        <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 text-lg">♍</div>
        <div class="absolute bottom-4 left-2 text-lg">♎</div>
        <div class="absolute bottom-1/3 -left-2 text-lg">♏</div>
        <div class="absolute top-1/3 -left-2 text-lg">♐</div>
        <div class="absolute top-4 left-2 text-lg">♑</div>
      </div>
    </div>

    <!-- Red Warning Block -->
    <div class="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-l-4 border-red-500 rounded-r-2xl p-6">
      <p class="font-bold text-red-700 dark:text-red-400 mb-4">
        Людина <span class="underline">руйнує у своєму житті ті принципи</span>, які мали би посилюватись цим зодіаком.
      </p>
      <ul class="space-y-3 text-slate-700 dark:text-slate-300">
        <li class="flex items-start gap-2">
          <span class="text-red-500 mt-1">•</span>
          <span><strong class="text-amber-600 dark:text-amber-400">У дитинстві</strong> положення Чорного Місяця впливає на обставини статевого дозрівання.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-red-500 mt-1">•</span>
          <span><strong class="text-green-600 dark:text-green-400">У зрілому віці</strong> положення Чорного Місяця впливає на причетність до суспільства та рівень добробуту.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-red-500 mt-1">•</span>
          <span><strong class="text-blue-600 dark:text-blue-400">У похилому віці</strong> положення Чорного Місяця впливає на картину дійсності.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-red-500 mt-1">•</span>
          <span><strong class="text-purple-600 dark:text-purple-400">У духовному житті</strong> положення Чорного Місяця вказує на зв'язок людини із темними силами.</span>
        </li>
      </ul>
    </div>

    <!-- Spiritual Practice Block -->
    <div class="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Силами які зобов'язують людину до певних <strong class="text-slate-800 dark:text-white">духовних практик — відпрацювання кармічних боргів та напрацювання нової карми</strong>. Практикуючий має <span class="text-indigo-600 dark:text-indigo-400 font-semibold">прийняти наявність прогалини</span> у власній натурі та ставитись до неї як до <strong class="text-slate-800 dark:text-white">1го рівня розвитку архетипу</strong>.
      </p>
    </div>

    <!-- Development Levels -->
    <div class="bg-gradient-to-r from-indigo-50 via-purple-50 to-fuchsia-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-fuchsia-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Досвід інших знаків та набуття цілісності власної натури. <strong class="text-slate-800 dark:text-white">Дозволить закрити 1й рівень розвитку зодіаку</strong>, який пов'язаний із чорним місяцем в натальній карті. Та перейти на <span class="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">2й рівень розвитку — сприйняття світу</span>. Що можна вважати закриттям прогалини Чорного місяця.
      </p>
    </div>

    <!-- Moon Phases Visual -->
    <div class="flex justify-center gap-2 py-4">
      <div class="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-200"></div>
      <div class="w-6 h-6 rounded-full bg-gradient-to-r from-slate-800 to-transparent dark:from-slate-200"></div>
      <div class="w-6 h-6 rounded-full border-2 border-slate-400 bg-transparent"></div>
      <div class="w-6 h-6 rounded-full bg-gradient-to-l from-slate-800 to-transparent dark:from-slate-200"></div>
      <div class="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-200"></div>
      <div class="w-6 h-6 rounded-full bg-gradient-to-r from-slate-800 to-transparent dark:from-slate-200"></div>
      <div class="w-6 h-6 rounded-full border-2 border-slate-400 bg-transparent"></div>
      <div class="w-6 h-6 rounded-full bg-gradient-to-l from-slate-800 to-transparent dark:from-slate-200"></div>
      <div class="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-200"></div>
    </div>

    <!-- Summary -->
    <div class="text-center p-4 bg-slate-900 dark:bg-slate-950 rounded-2xl">
      <p class="text-slate-300 text-sm">
        <span class="text-2xl">☾</span> Ліліт — точка апогею місячної орбіти, символ тіньових аспектів особистості
      </p>
    </div>
  </div>
  ` },
  { id: '9', category: 'Теорія', title: 'Визначення Архетипів через гештальт', content: `
  <div class="space-y-8">
    <!-- Header -->
    <div class="bg-gradient-to-r from-cyan-50 to-sky-100 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
      <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-4 text-center">ПОРІВНЯННЯ ГЕШТАЛЬТУ ІЗ КОЛОМ АРХЕТИПІВ</h2>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Ієрогліфічне письмо є базовим елементом алхімії, використовуючи який майстер може відобразити усі можливі властивості людської натури. Воно дозволяє відтворити будь яку алхімічну практику, але за традицією практикуючий <strong class="text-slate-900 dark:text-white">майстер має дотримуватись вимогів актуальної культури</strong>, щоб його практики набували вплив та вагу у об'єктивній дійсності. За цієї тези прагнемо увагу тлумаченню архетипів, відповідно до інструментів актуальної культури, а саме <span class="text-indigo-600 dark:text-indigo-400 font-semibold">філософії гештальту</span>.
      </p>
      <p class="text-slate-600 dark:text-slate-400 text-sm">
        Співвідношенням філософії гештальту та практики алхімії є природним, оскільки цикл гештальту буквально відповідає до логіки кола архетипів. Таке відповідність дозволяє вважати методологію гештальту близькою до архетипічної.
      </p>
    </div>

    <!-- Main Statement -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-center">
      <p class="text-lg text-slate-800 dark:text-white font-semibold">
        Повний цикл гештальту відповідає до повного кола архетипів. А <strong class="text-indigo-600 dark:text-indigo-400">4 фази гештальту</strong> відповідають до <strong class="text-fuchsia-600 dark:text-fuchsia-400">4х чвертей кола архетипів</strong>, та 4х стихій.
      </p>
    </div>

    <!-- 4 Quarters Diagram -->
    <div class="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl p-6">
      <div class="grid grid-cols-2 gap-4">
        <!-- Quarter 4 - Top Left -->
        <div class="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 border border-green-300 dark:border-green-700">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">4</span>
            <span class="font-bold text-green-700 dark:text-green-400">4а чверть, жезли</span>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            <strong>Водолій, Терези, Рак</strong> — відповідають до фази засвоєння досвіду та утворення життєвої сили.
          </p>
        </div>

        <!-- Quarter 1 - Top Right -->
        <div class="bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-xl p-4 border border-rose-300 dark:border-rose-700">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold">1</span>
            <span class="font-bold text-rose-700 dark:text-rose-400">1а чверть, мечі</span>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            <strong>Скорпіон, Тілець, Діва</strong> — відповідають до фази усвідомлення потреби.
          </p>
        </div>

        <!-- Quarter 3 - Bottom Left -->
        <div class="bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-xl p-4 border border-amber-300 dark:border-amber-700">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">3</span>
            <span class="font-bold text-amber-700 dark:text-amber-400">3а чверть, пентаклі</span>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            <strong>Стрілець, Лев, Риби</strong> — відповідають до фази задоволення потреби.
          </p>
        </div>

        <!-- Quarter 2 - Bottom Right -->
        <div class="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</span>
            <span class="font-bold text-blue-700 dark:text-blue-400">2а чверть, чаші</span>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            <strong>Овен, Козеріг, Близнюки</strong> — відповідають до фази контактування із потребою.
          </p>
        </div>
      </div>
    </div>

    <!-- Segments Explanation -->
    <div class="bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-cyan-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Коло архетипів додатково поділяє кожну чверть на <strong class="text-slate-900 dark:text-white">3 сегменти</strong>. Якщо висловлювати ці сегменти через філософію гештальту, слід поділити кожну фазу гештальту на слідуючі частини:
      </p>
      <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span><strong class="text-slate-800 dark:text-white">усвідомлення себе</strong> на відповідній фазі</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span><strong class="text-slate-800 dark:text-white">підбір способів активності</strong> на відповідній фазі</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span><strong class="text-slate-800 dark:text-white">систематизація активності</strong> усвідомлення задля здійснення дії на фазі</span>
        </li>
      </ul>
    </div>

    <!-- Small Gestalt Phases -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Ці три додаткові частини мають фрактальну відповідність до звичайного гештальт циклу. Вони відбуваються всередині кожної фази звичайного гештальту, та їх можна називати <strong class="text-indigo-600 dark:text-indigo-400">малими гештальтами</strong>. А саме:
      </p>
      <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li class="flex items-start gap-2">
          <span class="text-fuchsia-500 mt-1">•</span>
          <span>усвідомлення себе на фазі відповідає <strong class="text-slate-800 dark:text-white">1і фазі гештальту</strong> — усвідомлення потреби</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-fuchsia-500 mt-1">•</span>
          <span>підбір способів активності відповідає <strong class="text-slate-800 dark:text-white">2і фазі гештальту</strong> — контактування із потребою</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-fuchsia-500 mt-1">•</span>
          <span>систематизація активності усвідомлення відповідає <strong class="text-slate-800 dark:text-white">3і фазі гештальту</strong> — задоволення потреби</span>
        </li>
      </ul>
    </div>

    <!-- 4th Phase Explanation -->
    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Четверта фаза малого гештальту обов'язково переводить людину у наступну фазу звичайного циклу гештальту. Тобто засвоєння досвіду на малому циклі гештальту відбувається у зв'язку із переходом до іншої фази звичайного гештальту та оглядання та усвідомлення себе на новій фазі.
      </p>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Таке властивість 4і фази стає важливою, а точно зору кола архетипів та кола героя. Оскільки архетипи, які знаходяться на 4і чверті кола архетипів (<strong class="text-indigo-600 dark:text-indigo-400">Водолій, Терези та Рак</strong>) створюють пошук нового шляху, рушить за новим, невідомим шляхом, та знаходження вдома задля набування сміливості перед тим щоб свідомо вирушити у новий шлях.
      </p>
    </div>

    <!-- Human Behavior in 4th Phase -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        На 4і фазі гештальту <strong class="text-slate-900 dark:text-white">людина може безболісно помилятись</strong>, робити паузи та змінювати свої рішення. Але після того як вона виходить у 1і стадію нового циклу, вона має постійно діяти відповідно до обставин (фази гештальту) у яких знаходиться.
      </p>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Тривалення кола гештальту, накопичення у досвід книги, вказує на те, що <strong class="text-indigo-600 dark:text-indigo-400">4 фаза гештальту відповідає до стихії жезлів</strong>. Суть цієї стихії у керуванні увагою, створенні образів гармонії, та збудження жаги до життя.
      </p>
    </div>

    <!-- Life Force Block -->
    <div class="bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-fuchsia-200 dark:border-fuchsia-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        <strong class="text-fuchsia-600 dark:text-fuchsia-400">Сама стихія жезлів (4 фаза гештальту)</strong> є ключовою у життєдіяльності людини та інші 3 стихії (інші 3 фази гештальту) мають бути спрямовані на її якісний прояв. Оскільки стихія жезлів являє власне життя та волевиявлення на те що породжується нашої волею. Те, скільки життєвої сили людина може утворити на 4і фазі гештальту, визначає життєву силу, яку людина використовує на слідуючих циклах гештальту. <strong class="text-slate-900 dark:text-white">Чим більше життєвої сили тим Інтенсивніші взаємодії доступні людині.</strong>
      </p>
    </div>

    <!-- Small and Big Gestalt Cycles -->
    <div class="bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 rounded-2xl p-6 border border-indigo-300 dark:border-indigo-700">
      <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-4 text-center">МАЛИЙ І ЗВИЧАЙНИЙ І ВЕЛИКИЙ ЦИКЛИ ГЕШТАЛЬТУ</h3>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Оскільки було сказано за малий та звичайний цикли гештальту, слід наголосити на існуванні ще й <strong class="text-indigo-600 dark:text-indigo-400">великого (більшого) циклу гештальту</strong>. Та пояснити як ці цикли між собою пов'язані.
      </p>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Як було зауважено вище, малий цикл гештальту відбувається та, як людина долає фази звичайного гештальту. Додамо, що для долання малого циклу гештальту людина має спиратись на властивості свого тіла.
      </p>
    </div>

    <!-- 4 Body Properties -->
    <div class="grid md:grid-cols-2 gap-4">
      <div class="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
        <h4 class="font-bold text-amber-700 dark:text-amber-400 mb-2">Задля засвоєння досвіду</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Створення життєвої сили та переходу на наступну фазу звичайного циклу гештальту — потрібен <strong class="text-slate-800 dark:text-white">певний баланс життєдіяльності організму</strong>.
        </p>
      </div>
      
      <div class="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-rose-200 dark:border-rose-700">
        <h4 class="font-bold text-rose-700 dark:text-rose-400 mb-2">Задля усвідомлення себе на фазі</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Потрібна <strong class="text-slate-800 dark:text-white">енергія та тонус організму</strong>.
        </p>
      </div>
      
      <div class="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700">
        <h4 class="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Задля систематизації активності</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Усвідомлень потрібна <strong class="text-slate-800 dark:text-white">цілість гормональних програм</strong> в організмі.
        </p>
      </div>
      
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Задля підбору способів активності</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Потрібне <strong class="text-slate-800 dark:text-white">дотримання форми та пластики організму</strong>.
        </p>
      </div>
    </div>

    <!-- Temperaments Section -->
    <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Тобто проходження малого циклу гештальту залежить від того як <strong class="text-slate-900 dark:text-white">організм людини поріється з навантаженнями</strong>. Ідентифікуємо ці 4 типи навантажень розумінь як прояв <strong class="text-indigo-600 dark:text-indigo-400">4 типів темпераменту</strong>. Але дана робота дозволяє тлумачити ці навантаження людям крізь призму <span class="text-fuchsia-600 dark:text-fuchsia-400">малих арканів таро</span>, що є архетипічним образом побутового досвіду людини, тобто досвіду малого циклу гештальту.
      </p>
    </div>

    <!-- Small Gestalt Cycles -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-4 text-center">ЦИКЛИ МАЛИХ ГЕШТАЛЬТІВ ВІДРІЗНЯЮТЬСЯ ОДНЕ ВІД ОДНОГО</h3>
      <ul class="space-y-3 text-slate-700 dark:text-slate-300">
        <li class="flex items-start gap-2">
          <span class="text-rose-500 mt-1">•</span>
          <span>Під час <strong>усвідомлення потреби</strong> на звичайному циклі гештальту відбувається малий цикл гештальту із великою потребою тонусу організму та прояви <strong class="text-rose-600 dark:text-rose-400">темпераменту холерика</strong>.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-blue-500 mt-1">•</span>
          <span>Під час <strong>контактування з потребою</strong> на звичайному циклі гештальту відбувається малий цикл гештальту із великою потребою у пластиці організму та у прояві <strong class="text-blue-600 dark:text-blue-400">темпераменту меланхоліка</strong>.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-amber-500 mt-1">•</span>
          <span>Під час <strong>задоволення потреби</strong> на звичайному циклі гештальту відбувається малий цикл гештальту із великою потребою цілості гормональних програм та у прояві <strong class="text-amber-600 dark:text-amber-400">темпераменту флегматика</strong>.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500 mt-1">•</span>
          <span>Під час <strong>засвоєння досвіду</strong> на звичайному циклі гештальту відбувається малий цикл гештальту із великою потребою збалансованої життєдіяльності та у прояві <strong class="text-green-600 dark:text-green-400">темпераменту сангвініка</strong>.</span>
        </li>
      </ul>
    </div>

    <!-- 4 Elements in Body -->
    <div class="bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Тільки завдяки проходженню малих циклів гештальту такого типу людина може перевірити повний цикл звичайного гештальту. Духовні традиції минулого роблять великий акцент на повсякденні стану тіла, та його вдосконаленні. Саме через та що <strong class="text-indigo-600 dark:text-indigo-400">прояв 4х стихій у тілі збільшують ефективність людини</strong> у старших категоріях реальності — категорії особистості, суспільства, релігії... подієва. Так само як духовні традиції минулого, сучасна філософія гештальту, має запропонувати сучасній людині способи тренування тіла, що дозволить долати цикл звичайного гештальту.
      </p>
    </div>

    <!-- Social Norms -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        При проходженні звичайного циклу гештальту людина має відтворювати свідому поведінку. <strong class="text-slate-900 dark:text-white">Людина має діяти відповідно до суспільних норм</strong> та орієнтуватись на користь свого інтересу.
      </p>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Задля проходження звичайного циклу гештальту людина має свідомо моніторити свій стан, та користуватись можливостями суспільства (колективного поля).
      </p>
      <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400 pl-4">
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span>Задля <strong>усвідомлення потреб</strong> — взаємодіяти із матеріальним середовищем.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span>Задля <strong>контактування із потребами</strong> — формувати суспільні стосунки.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span>Задля <strong>задоволення потреб</strong> — застосовувати професійні знання.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span>Задля <strong>засвоєння досвіду</strong> та утворення життєвої сили — створювати власну відповідність до духовних принципів гармонії.</span>
        </li>
      </ul>
    </div>

    <!-- Big Gestalt Cycle -->
    <div class="bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-fuchsia-200 dark:border-fuchsia-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Наголосимо на тому що звичайний цикл гештальту залежить від малого циклу та впливає на великий (цикл гештальту суспільства). Тобто людина у площині звичайного гештальту залежить від стану свого тіла, а її дії мають бути спрямовані на отримання суспільного ефекту. Все інше що робить людина, проходячи звичайний цикл гештальту є відгалуженням від норми (архетипу) життєдіяльності людини.
      </p>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        <strong class="text-fuchsia-600 dark:text-fuchsia-400">Відповідно великий цикл гештальту відображає цикл життєдіяльності який переживає спільнота.</strong> Слід казати про що таке суспільного життя, та зв'язок людини із певною спільнотою (спільнота сім'ї та роду є базовими), є також самою природною властивістю людини як здатність ходити. Але ця властивість людини не досліджується суспільством. Тому сучасна людина є принципі не розуміє що саме у суспільстві існує сенс <strong class="text-slate-900 dark:text-white">здоров'я</strong>, а слід казати відповідальність.
      </p>
    </div>

    <!-- Actual Culture -->
    <div class="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl p-6 border border-slate-300 dark:border-slate-600">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        <strong class="text-slate-900 dark:text-white">Актуальна культура</strong>, не маючи системного розуміння суспільних процесів, як великого (суспільного) циклу гештальту, <strong class="text-indigo-600 dark:text-indigo-400">віддає процес суспільних перетворень на природне само балансування</strong>. Що призводить до деградації частіше ніж до збільшення добробуту.
      </p>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Для того що володар елементом алхімії вознаходив що життєдіяльність колективних простору групи людей відбувається за певних законів та відповідно до певної механіки сил. Оскільки майстри алхімії прямо пізнають об'єктивну дійсність та сприймають як поводить себе першосутність, що відбудовує суспільство.
      </p>
    </div>

    <!-- Optimal Community -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Досвід звичайного циклу гештальту надає людині мінімальний ефект, <strong class="text-slate-900 dark:text-white">якщо він не спілка із причинами та нормами певної спільноти</strong>. Тобто без співпадіння із циклами великого гештальту, малий гештальт створює мінімальний ефект. Цикл великого гештальту, тобто <strong class="text-indigo-600 dark:text-indigo-400">життєдіяльність спільноти</strong>, визначає для кожного члена спільноти оптимальні потреби, спосіб контактування із потребами, поведінку задоволення потреб та гармонію яка дозволяє засвоювати досвід, та утворювати життєву силу.
      </p>
    </div>

    <!-- Positive Experience -->
    <div class="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Тому <strong class="text-emerald-600 dark:text-emerald-400">позитивний досвід людини</strong> у звичайному циклі гештальту пов'язана із <strong class="text-slate-900 dark:text-white">дотриманням норм та правил спільноти</strong>, як елементів великого гештальту. А кожен вдалий цикл звичайного гештальту є кроком спільноти у великому циклі гештальту.
      </p>
    </div>

    <!-- Big Gestalt Phases -->
    <div class="bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 rounded-2xl p-6 border border-indigo-300 dark:border-indigo-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        <strong class="text-indigo-600 dark:text-indigo-400">Фази великого цикла відбуваються за правилом накопичення.</strong> Зусилля багатьох людей, які повторюються в одній манері, впливають на середовище спільноти. А коли зміни набувають великих масштабів, вони переводять спільноту у наступну фазу.
      </p>
    </div>

    <!-- 4 Types of Community -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Для прикладу ідеального укладу. З ідеальною версією життєдіяльності спільноти, 8 великий цикл гештальту, пов'язані та тим що <strong class="text-slate-900 dark:text-white">члени спільноти проходять 4 типи звичайних гештальтів</strong>. А сам член спільноти обирається зручний для нього тип практики, тобто одноманітно атипічно один із 4х типів звичайних гештальтів.
      </p>
    </div>

    <!-- Big Gestalt 4 Phases -->
    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
      <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-4 text-center">ВЕЛИКИЙ ЦИКЛ ГЕШТАЛЬТУ МОЖНА ПОДІЛИТИ НА 4 ФАЗИ:</h3>
      <ul class="space-y-3 text-slate-700 dark:text-slate-300">
        <li class="flex items-start gap-2">
          <span class="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
          <span><strong class="text-rose-600 dark:text-rose-400">1 фаза</strong> — визначення інструментів членів спільноти по взаємодії із матеріальним середовищем.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
          <span><strong class="text-blue-600 dark:text-blue-400">2 фаза</strong> — оптимізація ресурсів наявних у спільноті задля створення комфортних умов роботи членам спільноти.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
          <span><strong class="text-amber-600 dark:text-amber-400">3 фаза</strong> — оптимізація інструкцій поведінки для членів спільноти задля отримання спільнотою здобутків.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
          <span><strong class="text-green-600 dark:text-green-400">4 фаза</strong> — визначення вузлових центрів спільноти, які надають зростання усієї спільноті. Та керування спільнотою задля поширення вузлів зростання.</span>
        </li>
      </ul>
    </div>

    <!-- Archetypal Ideal -->
    <div class="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-violet-200 dark:border-violet-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Така послідовність фаз великого гештальту спільноти є <strong class="text-violet-600 dark:text-violet-400">архетипічним ідеалом</strong>. На практиці, люди які несвідомо поєднуються у спільноту втілюють ці фази у хаотичному порядку. За умови що у кожну фазу було вкладено достатньо ресурсів, великий цикл гештальту закривається навіть якщо втілюється у хаотичному порядку. Оскільки 4 фази великого гештальту спільноти відрізняються одна від одної та створюють різні навантаження на людей, люди природно розподіляють ролі у спільноті. Відповідно до власних здібностей люди ненавмисно залучаються до дотичних дій у спільноті щоб були здійснені та збільшували просування циклу великого гештальту.
      </p>
    </div>

    <!-- Roles Classification -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-4 text-center">СПРОБУЄМО КЛАСИФІКУВАТИ РОЛІ ЛЮДЕЙ У СПІЛЬНОТІ</h3>
      <ul class="space-y-2 text-slate-700 dark:text-slate-300">
        <li class="flex items-start gap-2">
          <span class="text-rose-500 mt-1">•</span>
          <span>Вплив на матеріальне середовище — представники <strong class="text-rose-600 dark:text-rose-400">1і касти</strong> у спільноті.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-blue-500 mt-1">•</span>
          <span>Керування матеріальними ресурсами — представники <strong class="text-blue-600 dark:text-blue-400">2і касти</strong> у спільноті.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-amber-500 mt-1">•</span>
          <span>Оптимізація інструкцій поведінки — представники <strong class="text-amber-600 dark:text-amber-400">3і касти</strong> у спільноті.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500 mt-1">•</span>
          <span>Визначення вузлових центрів життєдіяльності — представники <strong class="text-green-600 dark:text-green-400">4і касти</strong> у спільноті.</span>
        </li>
      </ul>
    </div>

    <!-- 4 Castes Visual Grid -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 border border-green-300 dark:border-green-700 text-center">
        <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">4</div>
        <p class="text-sm text-slate-600 dark:text-slate-400">Мудреці</p>
      </div>
      <div class="bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-xl p-4 border border-rose-300 dark:border-rose-700 text-center">
        <div class="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2">1</div>
        <p class="text-sm text-slate-600 dark:text-slate-400">Ремісники</p>
      </div>
      <div class="bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-xl p-4 border border-amber-300 dark:border-amber-700 text-center">
        <div class="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">3</div>
        <p class="text-sm text-slate-600 dark:text-slate-400">Воїни</p>
      </div>
      <div class="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 text-center">
        <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">2</div>
        <p class="text-sm text-slate-600 dark:text-slate-400">Купці</p>
      </div>
    </div>

    <!-- 5th Type -->
    <div class="bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-fuchsia-200 dark:border-fuchsia-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        <strong class="text-fuchsia-600 dark:text-fuchsia-400">Традиція алхімії</strong>, яка розуміє ключі за яких відбувається життєдіяльність спільноти, має посилатись на <strong class="text-slate-900 dark:text-white">5й тип людей</strong> у спільноті — це люди які поєднують роботу усіх попередніх. Ці категорія людей поєднує усіх представників спільноти та забезпечує таким чином втілення великого циклу гештальту. Але 5й тип представників спільноти це так само є представники 1, 2, 3 або 4і касти. В залежності від того, представники якої касти будуть поєднувати роботу усіх членів спільноти, визначають тип самої спільноти.
      </p>
      <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span>Представники <strong class="text-rose-600 dark:text-rose-400">1 касти</strong> об'єднують зусилля усіх 4х каст щоб створити <strong>спільноту ремісників</strong>.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span>Представники <strong class="text-blue-600 dark:text-blue-400">2 касти</strong> об'єднують зусилля усіх 4х каст щоб створити <strong>спільноту купців</strong>.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span>Представники <strong class="text-amber-600 dark:text-amber-400">3і касти</strong> об'єднують зусилля усіх 4х каст щоб створити <strong>спільноту воїнів (аристократів)</strong>.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span>Представники <strong class="text-green-600 dark:text-green-400">4і касти</strong> об'єднують зусилля усіх 4х каст щоб створити <strong>спільноту мудреців</strong>.</span>
        </li>
      </ul>
    </div>

    <!-- Modern Gestalt Philosophy -->
    <div class="bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Сучасні філософії гештальту мають досліджувати тему та поширювати розуміння циклів гештальту у сучасній культурі. Це дослідження того як <strong class="text-cyan-600 dark:text-cyan-400">утворюється цілісний образ із певних частин</strong>. І це дослідження невідворотно призведе дослідників до <strong class="text-slate-900 dark:text-white">технології міста Богів</strong>.
      </p>
    </div>

    <!-- City of Gods -->
    <div class="bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 rounded-2xl p-6 border border-indigo-300 dark:border-indigo-700">
      <div class="flex flex-col md:flex-row gap-6 items-center">
        <div class="flex-1">
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Міста у якому спроектована життєдіяльність людей таким чином, щоб <strong class="text-indigo-600 dark:text-indigo-400">кожна спільнота в ньому набувала проходження великого циклу гештальту</strong>, та сукупна життєдіяльність спільнот спроектувала цикл життєдіяльності міста (цикл гештальту міста).
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
            Ця тема є традиційною в алхімії. Створення <strong class="text-slate-900 dark:text-white">міста Богів</strong> алхіміками в усі часи позначає вихід актуальної культури на новий рівень розвитку. Оскільки ідея створення міста Богів вимагає створення багатьох суспільно-культурних явищ, які природно переносяться та розповсюджуються у суспільстві, як образи ефективності.
          </p>
        </div>
        <div class="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-4xl shadow-xl">
          🏛️
        </div>
      </div>
    </div>

    <!-- Mont Saint-Michel Reference -->
    <div class="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-4 text-center">
      <p class="text-sm text-slate-500 dark:text-slate-400 italic">
        Аббатство Мон-Сен-Мішель — приклад архітектурного втілення ідеї міста Богів
      </p>
    </div>

    <!-- Minor Arcana Section -->
    <div class="bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 rounded-2xl p-6 border border-indigo-300 dark:border-indigo-700 mt-8">
      <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-4 text-center">МАЛІ АРКАНИ У ПРОЕКЦІЇ НА ЦИКЛ ГЕШТАЛЬТУ</h2>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Задля того щоб перетворити гештальт філософію у містичну практику слід пов'язати фази гештальту із стихіями. Оскільки саме стихії дозволять майстру застосовувати мистецтво та виступають гарантією що практика відбувається у <strong class="text-indigo-600 dark:text-indigo-400">об'єктивному всесвіті</strong>, а не в уяві практикуючого.
      </p>
    </div>

    <!-- Alchemy Elements Correspondence -->
    <div class="bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
      <h3 class="font-bold text-slate-800 dark:text-white mb-4">НАДАМО ВІДПОВІДНІСТЬ АЛХІМІЧНИХ СТИХІЙ ДО ЦИКЛУ ГЕШТАЛЬТУ</h3>
      <ul class="space-y-2 text-slate-700 dark:text-slate-300">
        <li class="flex items-start gap-2">
          <span class="text-rose-500 mt-1">•</span>
          <span>1а стадія гештальту це прояв <strong class="text-rose-600 dark:text-rose-400">стихії мечів</strong></span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-blue-500 mt-1">•</span>
          <span>2а стадія гештальту це прояв <strong class="text-blue-600 dark:text-blue-400">стихії чаш</strong></span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-amber-500 mt-1">•</span>
          <span>3а стадія гештальту це прояв <strong class="text-amber-600 dark:text-amber-400">стихії пентаклів</strong></span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500 mt-1">•</span>
          <span>4а стадія гештальту це прояв <strong class="text-green-600 dark:text-green-400">стихії жезлів</strong></span>
        </li>
      </ul>
    </div>

    <!-- Masters of Magic -->
    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        <strong class="text-amber-600 dark:text-amber-400">Майстри магії</strong> які вже підкорили стихії можуть використовувати цю здібність для містичного впливу на фази гештальту. Без особливих умінь у гештальті, а тільки через спрямування стихій, вони можуть не дозволяти іншим людям так і завжати їм набувати життєвий досвід. Ступінь майстерності в мистецтві визначає наскільки <strong class="text-slate-900 dark:text-white">майстер наближений до безумовного благодіяння</strong> у своєму впливу на дійсність.
      </p>
    </div>

    <!-- Gestalt Types -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Щоб упорядкувати магічне мистецтво та розвивати його як навичку слід ставитись до <strong class="text-slate-900 dark:text-white">магії як до професійної діяльності</strong>. Практикуючий може звернутись до базової професії магії, яка відповідають базовим проявам стихій, та вдосконалювати своє мистецтво, впливаючи на гештальт інших людей:
      </p>
      <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span>Гештальт, який допомагає <strong class="text-slate-800 dark:text-white">здобути нові навички</strong>.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span>Гештальт, який допомагає <strong class="text-slate-800 dark:text-white">застосувати наявні навички</strong>.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span>Гештальт, який допомагає <strong class="text-slate-800 dark:text-white">оптимізувати наявну поведінку</strong>.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span>Гештальт, який допомагає <strong class="text-slate-800 dark:text-white">відкрити красу людської натури</strong>.</span>
        </li>
      </ul>
    </div>

    <!-- Hero's Journey -->
    <div class="bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-fuchsia-200 dark:border-fuchsia-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        <strong class="text-fuchsia-600 dark:text-fuchsia-400">Майстри алхімії</strong> за визначенням поєднують 4 стихії. Та вони здатні створювати для людей гештальт, як виконання усіх 4х стихій. Це відбувається природньо, якщо майстер вирішив життям долати повного шляху героя та втілювати на базовому об'єктивному світі. Але для практикуючих, мистецтво алхімії слід відокремлювати <strong class="text-slate-900 dark:text-white">кожну стихію та вважати тип гештальту</strong>.
      </p>
    </div>

    <!-- Gestalt Therapists -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Люди далекі від мистецтва алхімії, а саме <strong class="text-indigo-600 dark:text-indigo-400">досвідчені гештальт терапевти</strong> могли би використовувати базові навички стихій задля збільшення ефективності своєї практики. Щонайменше вони могли б діагностувати прояв людини на кожному із фаз циклу гештальту:
      </p>
      <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li class="flex items-start gap-2">
          <span class="text-rose-500 mt-1">•</span>
          <span>Діагностувати <strong class="text-rose-600 dark:text-rose-400">стихію мечів</strong> та темперамент холерика — діагностувати потреби та бажання людини.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-blue-500 mt-1">•</span>
          <span>Діагностувати <strong class="text-blue-600 dark:text-blue-400">стихію чаш</strong> та темперамент меланхоліка — діагностувати почуття та суспільні стосунки людини.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-amber-500 mt-1">•</span>
          <span>Діагностувати <strong class="text-amber-600 dark:text-amber-400">стихію пентаклів</strong> та темперамент флегматика — діагностувати знання та психосоматичний стан людини.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500 mt-1">•</span>
          <span>Діагностувати <strong class="text-green-600 dark:text-green-400">стихію жезлів</strong> та темперамент сангвініка — діагностувати життєву силу та внутрішню гармонію людини.</span>
        </li>
      </ul>
    </div>

    <!-- 56 Minor Arcana -->
    <div class="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-violet-200 dark:border-violet-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Використовуючи <strong class="text-violet-600 dark:text-violet-400">56 карт малих арканів</strong> практикуючий терапевт могли би впливати на властивості людини виходячи із свого академічного розуміння правильної життєдіяльності (циклу гештальту). Такого роду вплив можна розуміти як коригуючи втручання та коригуюче всенаправ травматичних зон свідомості. Хоча цього втручання у свідомість інших людей може мати негативні наслідки.
      </p>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        <strong class="text-slate-900 dark:text-white">Цей досвід ніяк не може бути замінений академічним розумінням та атестацією.</strong>
      </p>
    </div>

    <!-- Arcana and Gestalt -->
    <div class="bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-cyan-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Так чи інакше малі аркани таро у проекції на гештальт відображають архетипічні сцени різних фаз (відповідно до стихії) циклу гештальту.
      </p>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        <strong class="text-indigo-600 dark:text-indigo-400">Цифра малого аркану</strong> відображає обсяг стихії яка втілюється людиною на відповідній фазі гештальту. А карти двору — <strong class="text-slate-900 dark:text-white">Валета, Лицаря, Дами та Короля</strong> відображають здібність людини свідомо впливати на колективне поле.
      </p>
    </div>

    <!-- Cards 2, 3, 4 -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <h3 class="font-bold text-slate-800 dark:text-white mb-4 text-center">ЕНЕРГЕТИКИ КАРТ 2, 3 ТА 4 ДОСТАТНЬО ДЛЯ ВІДОБРАЖЕННЯ РЕФЛЕКСІЇ В СЕРЕДИНІ ЛЮДСЬКОГО ТІЛА</h3>
      <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span><strong class="text-slate-800 dark:text-white">2 ма</strong> — пасивна рефлексія тіла на навколишнє середовище</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span><strong class="text-slate-800 dark:text-white">3 ма</strong> — активна рефлексія тіла на навколишнє середовище</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-500 mt-1">•</span>
          <span><strong class="text-slate-800 dark:text-white">4 ма</strong> — систематизація рефлексії тіла на навколишнє середовище</span>
        </li>
      </ul>
    </div>

    <!-- Cards 5, 6, 7 -->
    <div class="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
      <h3 class="font-bold text-slate-800 dark:text-white mb-4 text-center">ЕНЕРГЕТИКИ КАРТ 5, 6 ТА 7 ДОСТАТНЬО ДЛЯ ТОГО ЩОБ ТІЛО МОГЛО ВЗАЄМОДІЯТИ ІЗ НАВКОЛИШНІМ СЕРЕДОВИЩЕМ</h3>
      <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li class="flex items-start gap-2">
          <span class="text-emerald-500 mt-1">•</span>
          <span><strong class="text-slate-800 dark:text-white">5 ма</strong> — пасивна взаємодія із навколишнім середовищем</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-emerald-500 mt-1">•</span>
          <span><strong class="text-slate-800 dark:text-white">6 ма</strong> — активна взаємодія із навколишнім середовищем</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-emerald-500 mt-1">•</span>
          <span><strong class="text-slate-800 dark:text-white">7 ма</strong> — систематизація взаємодії із навколишнім середовищем</span>
        </li>
      </ul>
    </div>

    <!-- Cards 8, 9, 10 -->
    <div class="bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-fuchsia-200 dark:border-fuchsia-800">
      <h3 class="font-bold text-slate-800 dark:text-white mb-4 text-center">ЕНЕРГЕТИКИ КАРТ 8, 9 ТА 10 ДОСТАТНЬО ДЛЯ УТВОРЕННЯ ПОВЕДІНКИ ЯК СВІДОМУ ПОСЛІДОВНІСТЬ ДІЙ У ОБ'ЄКТИВНІЙ ДІЙСНОСТІ</h3>
      <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li class="flex items-start gap-2">
          <span class="text-fuchsia-500 mt-1">•</span>
          <span><strong class="text-slate-800 dark:text-white">8 ма</strong> — пасивна присутність у об'єктивній дійсності</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-fuchsia-500 mt-1">•</span>
          <span><strong class="text-slate-800 dark:text-white">9 ма</strong> — активна присутність у об'єктивній дійсності</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-fuchsia-500 mt-1">•</span>
          <span><strong class="text-slate-800 dark:text-white">10 ма</strong> — системна присутність у об'єктивній дійсності</span>
        </li>
      </ul>
    </div>

    <!-- Court Cards -->
    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
      <h3 class="font-bold text-slate-800 dark:text-white mb-4 text-center">ЕНЕРГЕТИКА КАРТ ВАЛЕТ, ЛИЦАР ТА ДАМА ДОСТАТНЬО ДЛЯ ОСОБИСТОЇ ПРАКТИКИ ВПЛИВУ НА ІНШИХ ЛЮДЕЙ. ЦЯ ПРАКТИКА ПЕРЕДАЄ ІНШИМ ЛЮДЯМ ЕНЕРГІЮ 2-10 МАЛИХ АРКАНІВ</h3>
      <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li class="flex items-start gap-2">
          <span class="text-amber-500 mt-1">•</span>
          <span><strong class="text-amber-600 dark:text-amber-400">Валет</strong> — передає людям ідентичність, як стан малого аркана 2-10</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-amber-500 mt-1">•</span>
          <span><strong class="text-amber-600 dark:text-amber-400">Лицар</strong> — пропонує людям прояв персоналіті, як активність малих арканів 2-10</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-amber-500 mt-1">•</span>
          <span><strong class="text-amber-600 dark:text-amber-400">Дама</strong> — систематизує діяльність людей, як комбінації малих арканів 2-10</span>
        </li>
      </ul>
    </div>

    <!-- King Card -->
    <div class="bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 rounded-2xl p-6 border border-indigo-300 dark:border-indigo-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Енергетики карти <strong class="text-indigo-600 dark:text-indigo-400">Короля</strong> достатньо для того щоб людина мала відповідність до сутності старшого масштабу (Туза) — колективного простору, спільноти, егрегору, зони життєдіяльності. (співпадала із фазою великого гештальту спільноти)
      </p>
    </div>

    <!-- Combinations -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        При збереженні послідовності — мечі, чаші, пентаклі, жезли, будь-який набір карт малих арканів <strong class="text-slate-900 dark:text-white">відтворить повний цикл гештальту</strong>. Така властивість створює різноманіття людського досвіду життєдіяльності та широкий простір для магічного мистецтва. Але тільки канонічні <strong class="text-indigo-600 dark:text-indigo-400">комбінації</strong>, які будуть наведені у наступній главі, відповідають до практики алхімії по утворенню архетипів та бездоганних сил під час життєдіяльності людини. Такі комбінації утворюють <strong class="text-fuchsia-600 dark:text-fuchsia-400">бездоганні сили</strong> та виводять людину у над стан — стан архетипу, стан язичницького Божества (людини, що максимально наближена до камертонів людської гармонії).
      </p>
    </div>

    <!-- 12 Types of Gestalt -->
    <div class="bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        <strong class="text-cyan-600 dark:text-cyan-400">Коло архетипів вказує на 12 типів гештальту</strong>, які відповідають життєдіяльності <strong class="text-slate-900 dark:text-white">12х язичницьких Богів</strong>. Карти малих арканів інтерпретують язичницьких Богів як Валетів, Лицарів та Дам 4х стихій. <strong class="text-indigo-600 dark:text-indigo-400">Король</strong> малого аркана це особливий ракурс людини, у якому людина поєднується та сутністю старшого масштабу у відповідності до стихії — колективними полем, спільнотою, егрегором, або зоною життєдіяльності.
      </p>
    </div>

    <!-- Page Archetype -->
    <div class="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-800">
      <h4 class="font-bold text-rose-700 dark:text-rose-400 mb-3">Кожен архетип Валета — створює ідентичність у колективному полі.</h4>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Він одноманітно виконує функцію Короля, впливаючи на поле (стихію) попередньої фази. В циклі гештальту Валета обов'язково має бути карта <strong class="text-slate-900 dark:text-white">2ки</strong>, яка позначає пасивну рефлексію тіла, карта <strong class="text-slate-900 dark:text-white">5ки</strong>, яка позначає пасивний стан тіла та карта <strong class="text-slate-900 dark:text-white">8ки</strong>, яка позначає пасивний стан свідомості.
      </p>
    </div>

    <!-- Knight Archetype -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
      <h4 class="font-bold text-blue-700 dark:text-blue-400 mb-3">Кожен архетип Лицаря — проявляє свою персоналіті у колективному полі.</h4>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        В циклі гештальту Лицаря обов'язково має бути карта <strong class="text-slate-900 dark:text-white">3ки</strong>, яка позначає активну рефлексію тіла, карта <strong class="text-slate-900 dark:text-white">6кі</strong>, яка позначає активні дії тілом, та карта <strong class="text-slate-900 dark:text-white">9ки</strong>, яка позначає активну дію розумом.
      </p>
    </div>

    <!-- Queen Archetype -->
    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
      <h4 class="font-bold text-amber-700 dark:text-amber-400 mb-3">Кожен архетип Дами — вибудовує свою зону еготизму у колективному полі.</h4>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        В циклі гештальту Дами обов'язково має бути карта <strong class="text-slate-900 dark:text-white">4ки</strong>, яка позначає системну рефлексію тіла, карта <strong class="text-slate-900 dark:text-white">7ки</strong>, яка позначає системні дії тіла, та карта <strong class="text-slate-900 dark:text-white">10ки</strong>, яка позначає системні дії розуму.
      </p>
    </div>

    <!-- Archetypal Gestalt Cycles -->
    <div class="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Тобто у архетипічних циклах гештальту <strong class="text-indigo-600 dark:text-indigo-400">Валета, Лицаря</strong> та <strong class="text-fuchsia-600 dark:text-fuchsia-400">Дами</strong> є фаза на якій карта еліти виконує свою практику (утворення ідентичності, прояв персоналіті або вибудова еготизму). А на інших фазах гештальту малі аркани балансують ключову діяльність еліти.
      </p>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Цикл гештальту <strong class="text-slate-900 dark:text-white">Валета</strong> може бути розвиненим до циклу гештальту <strong class="text-slate-900 dark:text-white">Короля</strong>. Для цього фаза гештальту із 2кою додатково наповнюється практикою Короля. У такому разі на одному циклі гештальту відбудеться практика 2х еліт — Короля та Валета різних стихій. Що створює свідомий та контрольований перехід від фази Короля до фази Валета.
      </p>
    </div>

    <!-- King Practice -->
    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        <strong class="text-amber-600 dark:text-amber-400">Практика Короля</strong> полягає у поєднанні людей у цілісну сутність старшого масштабу (Туз стихії) — у колективний простір, спільноту, егрегор, зону життєдіяльності. Але досягти такого поєднання Королю вдається за умови що він може <strong class="text-slate-900 dark:text-white">виявити дрібні особливості людей</strong>, через прояви їх рефлексії у 2кі стихії.
      </p>
    </div>

    <!-- Extended Page Practice -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        У розвиненому варіанті <strong class="text-indigo-600 dark:text-indigo-400">практика Валета</strong> так само буде спрямована на створення ідентичності. Однак спираючись на зусилля Короля Валет може побудувати складну ідентичність, пов'язану із сутністю старшого масштабу.
      </p>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Інші малі аркани — <strong class="text-slate-900 dark:text-white">2ка, 5ка та 8ка</strong>, так само будуть балансувати розвинений цикл гештальту, у якому виконується практика Валета та Короля.
      </p>
    </div>

    <!-- King vs Page Practice -->
    <div class="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        <strong class="text-rose-600 dark:text-rose-400">Виконання практики Короля окремо від практики Валета</strong> — поєднання людей із сутність старшого масштабу без утворення ідентичності в цих людях є марнотратством (безумство Валета). Люди сприймають такий досвід як містичне марення після якого вони повертаються до свого базового відчуття дійсності. Саме <strong class="text-slate-900 dark:text-white">вибудова ідентичності</strong> або її зміна дозволяє людині зберегти досвід поєднання із колективним простором, спільнотою, егрегором або зоною життєдіяльності.
      </p>
    </div>

    <!-- Modern Psychology -->
    <div class="bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        У сучасній культурі психологія вважається гуманітарною наукою, через те що не має жодного способу точно виміряти ключі життєдіяльності людини. <strong class="text-cyan-600 dark:text-cyan-400">Езотерична традиція</strong> пропонує аркани таро як образи камертонів для ключів життєдіяльності. А використання правил <strong class="text-slate-900 dark:text-white">кола архетипів</strong> дозволять побудувати системну наукову мову, що системно пояснює механізми життєдіяльності людини (фрактальна мова архетипів).
      </p>
    </div>

    <!-- Culture and Mythology -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Коли культура утворює <strong class="text-indigo-600 dark:text-indigo-400">системну мову на базі кола архетипів (духовну традицію)</strong> вона обов'язково створює власну міфологію. Вона створює власний опис архетипів, їх властивостей та життєдіяльності для актуальних викликів культури. Це робить культуру повноцінною. Така культура залишає відбиток у історії, та впливає на майбутні покоління. <strong class="text-slate-900 dark:text-white">Культури, які не утворили свою міфологію втрачаються у часі.</strong>
      </p>
    </div>

    <!-- Actual Culture -->
    <div class="bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-fuchsia-200 dark:border-fuchsia-800">
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        <strong class="text-fuchsia-600 dark:text-fuchsia-400">Актуальна культура</strong> йде шляхом точних наук, помилково вважаючи його єдино вірним. Допоки цей шлях дійсно допомагає вирішувати сучасні виклики, наукові тези будуть поглиблюватись та поширюватись. А коли людство зіткнеться із викликами іншого типу, вона буде вимушено відмовитись від суто наукового та математично точного мислення, щоб звернутись до інших способів пізнання реальності.
      </p>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
        Відповідно до стихій це <strong class="text-slate-900 dark:text-white">інстинктивний спосіб, емоційний, раціональний</strong> та пізнання реальності як досвіду власних трансформацій.
      </p>
    </div>
  </div>
  ` },
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    year: 1,
    title: 'ІНІЦІАЦІЯ ЯКОСТЕЙ',
    subtitle: 'ЗБІР ЦІЛІСНОСТІ',
    locked: false,
    purchased: true, // This course is paid/accessible
    price: 3500,
    modules: [
      {
        id: 'm1',
        title: 'Визначення Архетипів',
        description: 'Теоретичний Модуль',
        slides: [
          { id: 's1', title: 'Вступ', type: 'theory', content: 'Вітаємо на першому курсі...', audioUrl: 'mock.mp3' },
          { id: 's2', title: 'Скорпіон, Телець та Діва', type: 'theory', content: 'Аналіз фіксованого хреста...', audioUrl: 'mock.mp3' }
        ]
      }
    ]
  },
  {
    id: 'c2',
    year: 2,
    title: 'ПРАКТИКА ГЕРОЯ',
    subtitle: 'ПРАКТИКА АРХЕТИПІВ У СУСПІЛЬСТВІ',
    locked: false,
    purchased: false, // This course is NOT paid
    price: 4500,
    modules: []
  }
];

export const PRODUCTS: Product[] = [
  { id: 'p1', category: 'coins', name: 'Монета Фортуни', price: 500, description: 'Притягує удачу та процвітання.', imageUrl: 'https://picsum.photos/200?random=1' },
  { id: 'p2', category: 'coins', name: 'Монета Достатку', price: 600, description: 'Символ матеріального благополуччя.', imageUrl: 'https://picsum.photos/200?random=2' },
  { id: 'p3', category: 'coins', name: 'Монета Захисту', price: 550, description: 'Оберіг від негативних впливів.', imageUrl: 'https://picsum.photos/200?random=3' },
  { id: 'p4', category: 'seals', name: 'Печатка Змієносця', price: 1200, description: 'Прихована сила зодіаку.', imageUrl: 'https://picsum.photos/200?random=4' },
  { id: 'p5', category: 'jewelry', name: 'Перстень Сили', price: 16400, description: 'Срібло та Золото.', imageUrl: 'https://picsum.photos/200?random=5' },
];