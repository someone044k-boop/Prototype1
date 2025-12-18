import React, { useEffect, useState, useRef } from 'react';
import { PRODUCTS } from '../constants';
import { ShoppingBag, Star, Send, ChevronRight, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PersonalMyth } from './PersonalMyth';

const categories = [
  { id: 'coins', label: 'sub_coins', path: '/workshop/coins' },
  { id: 'procedures', label: 'sub_proc', path: '/workshop/procedures' },
  { id: 'seals', label: "sub_seals", path: '/workshop/seals' }, 
  { id: 'attributes', label: 'sub_attr', path: '/workshop/attributes' },
  { id: 'jewelry', label: 'sub_jewel', path: '/workshop/jewelry' },
  { id: 'myth', label: 'sub_myth', path: '/workshop/personal-myth' },
];

const sealTypes = [
    { id: 'seal_trad', path: '/workshop/seals/traditional' },
    { id: 'seal_gen', path: '/workshop/seals/general' },
    { id: 'seal_oph', path: '/workshop/seals/ophiuchus' },
    { id: 'seal_bday', path: '/workshop/seals/birthday' },
    { id: 'seal_wealth', path: '/workshop/seals/wealth' },
    { id: 'seal_elem', path: '/workshop/seals/elements' }
];

export const Workshop: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Helper for translations
  const getLabel = (key: string) => t(key as any);

  // Determine active category and specific Seal type based on URL
  const getActiveState = () => {
      const path = location.pathname;
      let category = 'coins';
      let specificSeal = null;

      if (path.includes('/coins')) category = 'coins';
      else if (path.includes('/procedures')) category = 'procedures';
      else if (path.includes('/seals')) {
          category = 'seals';
          if (path.includes('/traditional')) specificSeal = 'seal_trad';
          else if (path.includes('/general')) specificSeal = 'seal_gen';
          else if (path.includes('/ophiuchus')) specificSeal = 'seal_oph';
          else if (path.includes('/birthday')) specificSeal = 'seal_bday';
          else if (path.includes('/wealth')) specificSeal = 'seal_wealth';
          else if (path.includes('/elements')) specificSeal = 'seal_elem';
          else specificSeal = 'seal_trad'; // Default seal
      }
      else if (path.includes('/attributes')) category = 'attributes';
      else if (path.includes('/jewelry')) category = 'jewelry';
      else if (path.includes('/personal-myth')) category = 'myth';
      
      return { category, specificSeal };
  };

  const { category: activeCategory, specificSeal } = getActiveState();
  const filteredProducts = PRODUCTS.filter(p => p.category === activeCategory);

  // Get active label for mobile dropdown button
  let activeLabelKey = categories.find(c => c.id === activeCategory)?.label || '';
  if (activeCategory === 'seals' && specificSeal) {
      activeLabelKey = sealTypes.find(s => s.id === specificSeal)?.id || activeLabelKey;
  }
  const activeLabel = getLabel(activeLabelKey);

  // Specific render for Seals
  const renderSeals = () => (
      <div className="animate-fade-in space-y-8">
          {/* Header Description for Specific Seal */}
          <div className="text-center mb-8 bg-white/30 dark:bg-slate-900/30 p-6 rounded-3xl border border-white/20 backdrop-blur-sm">
            <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600 dark:from-indigo-400 dark:to-fuchsia-400 mb-2">{getLabel(specificSeal || 'seal_trad')}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Унікальний магічний інструмент, створений для корекції долі та підсилення природного потенціалу.</p>
          </div>
          
          {/* Content Block 1 */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 group">
                  <img src="https://picsum.photos/600/400?random=1" alt="Seal 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="glass-panel p-6 rounded-3xl text-justify text-slate-700 dark:text-slate-300 shadow-lg">
                  <h3 className="font-bold text-lg mb-3 text-indigo-600 dark:text-indigo-400">Сакральна геометрія</h3>
                  <p className="leading-relaxed text-sm">Опис магічних властивостей печаток та їх вплив на долю власника. Глибоке розуміння символіки, закладеної в кожну лінію та вигин.</p>
              </div>
          </div>

          {/* Content Block 2 */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="glass-panel p-6 rounded-3xl text-justify text-slate-700 dark:text-slate-300 shadow-lg order-2 md:order-1">
                  <h3 className="font-bold text-lg mb-3 text-fuchsia-600 dark:text-fuchsia-400">Енергетичний заряд</h3>
                  <p className="leading-relaxed text-sm">Кожна печатка виготовляється індивідуально та заряджається під конкретний запит майстром. Це не просто прикраса, а інструмент впливу.</p>
              </div>
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 order-1 md:order-2 group">
                  <img src="https://picsum.photos/600/400?random=2" alt="Seal 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
          </div>

          {/* Type Specific Description & CTA */}
          <div className="bg-gradient-to-br from-indigo-50 to-fuchsia-50 dark:from-slate-900 dark:to-indigo-950 p-6 rounded-[2.5rem] shadow-inner border border-white/50 dark:border-white/5">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 text-slate-600 dark:text-slate-300 text-base leading-relaxed space-y-3">
                      <p>Це детальний опис для обраного типу печатки ({getLabel(specificSeal || '')}).</p>
                      <p>Тут розкривається суть цього артефакту, кому він підходить найкраще і які задачі вирішує.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm marker:text-indigo-500">
                          <li>Підсилення особистої волі</li>
                          <li>Захист від негативних впливів</li>
                          <li>Гармонізація внутрішнього стану</li>
                      </ul>
                  </div>
                  <div className="w-48 h-48 rounded-full bg-white dark:bg-slate-800 shadow-2xl p-1.5 border-4 border-indigo-100 dark:border-indigo-900 flex-shrink-0 animate-pulse-slow">
                      <img src="https://picsum.photos/300/300?random=3" alt="Seal Type" className="w-full h-full object-cover rounded-full" />
                  </div>
              </div>
              
              <div className="mt-6 text-center">
                   <a href="https://t.me/dobrevk" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-full font-bold shadow-lg hover:shadow-indigo-500/50 hover:scale-105 transition-all uppercase tracking-wider text-sm">
                       <Send size={16} /> ЗАМОВИТИ У МАЙСТРА
                   </a>
              </div>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-2 md:px-4 w-full mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-center mb-10 text-slate-800 dark:text-white tracking-widest uppercase">
            {t('menu_workshop')}
        </h1>

        {/* Mobile Dropdown Menu */}
        <div className="lg:hidden relative mb-8 z-40" ref={menuRef}>
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full flex items-center justify-between p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-md border border-white/40 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider text-sm"
            >
                <span>{activeLabel}</span>
                <ChevronDown size={20} className={`transition-transform duration-300 ${mobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`absolute top-full left-0 right-0 mt-2 transition-all duration-300 origin-top z-50 ${mobileMenuOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-2">
                    {categories.map(cat => (
                        <div key={cat.id}>
                            <Link
                                to={cat.path}
                                className={`block w-full text-left px-4 py-3 rounded-lg font-bold text-xs tracking-wide uppercase transition-colors ${(activeCategory === cat.id && cat.id !== 'seals') ? 'bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                            >
                                {getLabel(cat.label)}
                            </Link>
                            {cat.id === 'seals' && (
                                <div className={`pl-4 my-1 space-y-1 border-l-2 transition-all duration-300 ${activeCategory === 'seals' ? 'border-indigo-200 dark:border-slate-600' : 'border-slate-200 dark:border-slate-700'}`}>
                                    {sealTypes.map(type => (
                                        <Link
                                            key={type.id}
                                            to={type.path}
                                            className={`block py-2 px-2 text-[10px] font-bold uppercase tracking-wider transition-colors rounded-md ${specificSeal === type.id ? 'text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-900/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                        >
                                            {getLabel(type.id)}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        {/* Main Grid: Sidebar for Desktop + Content */}
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:sticky lg:top-28 lg:h-fit z-30">
                <div className="flex flex-col gap-3">
                    {categories.map(cat => (
                        <div key={cat.id}>
                            <Link 
                                to={cat.path} 
                                className={`block w-full text-left px-5 py-3 rounded-2xl font-bold text-xs tracking-wide transition-all duration-300 ease-in-out uppercase flex justify-between items-center group
                                ${activeCategory === cat.id 
                                    ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30' 
                                    : 'bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}
                                `}
                            >
                                <span className="group-hover:tracking-wider transition-all duration-300">{getLabel(cat.label)}</span>
                                {activeCategory === cat.id && <ChevronRight size={14} />}
                            </Link>

                            {cat.id === 'seals' && activeCategory === 'seals' && (
                                <div className="ml-4 mt-2 space-y-1 border-l-2 border-indigo-200 dark:border-slate-700 pl-3 animate-fade-in">
                                    {sealTypes.map(type => (
                                        <Link 
                                            key={type.id}
                                            to={type.path} 
                                            className={`block py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors
                                            ${specificSeal === type.id 
                                                ? 'text-fuchsia-600 dark:text-fuchsia-400' 
                                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}
                                            `}
                                        >
                                            {getLabel(type.id)}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-w-0">
                {activeCategory === 'myth' ? (
                    <PersonalMyth />
                ) : activeCategory === 'seals' ? (
                    renderSeals()
                ) : (
                    <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div key={product.id} className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                            <button className="px-5 py-2 bg-white text-indigo-900 font-bold rounded-full text-[10px] uppercase tracking-wide shadow-xl transform scale-90 group-hover:scale-100 transition-transform">Переглянути</button>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-serif font-bold text-base mb-1 text-slate-800 dark:text-slate-100">{product.name}</h3>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
                                        <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                                            <span className="font-bold text-fuchsia-600 dark:text-fuchsia-400 text-base">{product.price} грн</span>
                                            <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full hover:bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:text-white transition-all shadow-sm hover:shadow-lg">
                                                <ShoppingBag size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 text-slate-400 italic bg-white/30 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold mb-3">{getLabel(categories.find(c => c.id === activeCategory)?.label || '')}</h3>
                                <p className="mb-6">Колекція оновлюється магічними артефактами.</p>
                                {activeCategory === 'jewelry' && (
                                    <div className="mt-4 animate-fade-in">
                                        <p className="mb-4 font-bold text-lg text-slate-700 dark:text-slate-200">Перстні Сили (5 шт) - 16400 грн</p>
                                        <a href="https://t.me/dobrevk" target="_blank" rel="noreferrer" className="inline-block bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-8 py-3 rounded-full text-sm font-bold uppercase hover:shadow-lg hover:scale-105 transition-all">Замовити</a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};