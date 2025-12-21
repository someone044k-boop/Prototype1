import React, { useEffect, useState, useRef } from 'react';
import { Mandala } from '../components/Mandala';
import { Link } from 'react-router-dom';
import { Send, BookOpen, MessageCircle, Gem, Eye, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TelegramPost {
  id: number;
  text: string;
  date: string;
}

// Scroll reveal hook
const useScrollReveal = () => {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const observerRef = useRef<IntersectionObserver | null>(null);
    const elementsRef = useRef<Map<string, HTMLElement>>(new Map());

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-reveal');
                        if (id) {
                            setVisibleSections(prev => new Set([...prev, id]));
                            observerRef.current?.unobserve(entry.target);
                        }
                    }
                });
            },
            { threshold: 0.15, rootMargin: '50px' }
        );

        elementsRef.current.forEach((el) => {
            observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, []);

    const registerElement = (id: string, el: HTMLElement | null) => {
        if (el && !elementsRef.current.has(id)) {
            elementsRef.current.set(id, el);
            observerRef.current?.observe(el);
        }
    };

    const isVisible = (id: string) => visibleSections.has(id);

    return { registerElement, isVisible };
};

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<TelegramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { registerElement, isVisible } = useScrollReveal();

  const [loadingMore, setLoadingMore] = useState(false);
  const [beforeId, setBeforeId] = useState('');
  const [hasMore, setHasMore] = useState(true);

  // Animation helpers
  const fadeUp = (id: string) => 
    `transition-[opacity,transform] duration-[800ms] ease-out ${isVisible(id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;
  
  const fadeLeft = (id: string) => 
    `transition-[opacity,transform] duration-[800ms] ease-out ${isVisible(id) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`;
  
  const fadeRight = (id: string) => 
    `transition-[opacity,transform] duration-[800ms] ease-out ${isVisible(id) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`;
  
  const scaleIn = (id: string) => 
    `transition-[opacity,transform] duration-[800ms] ease-out ${isVisible(id) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;

  const fetchTelegramPage = async (before: string = '') => {
    try {
      const url = before 
        ? `https://t.me/s/EliteArchetypes?before=${before}`
        : 'https://t.me/s/EliteArchetypes';
      
      const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url));
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const messageWrappers = doc.querySelectorAll('.tgme_widget_message_wrap');
      
      if (messageWrappers.length === 0) {
        setHasMore(false);
        return { posts: [], firstId: '' };
      }
      
      const pagePosts: TelegramPost[] = [];
      let firstMsgId = '';
      
      messageWrappers.forEach((wrapper, idx) => {
        if (wrapper.querySelector('.tgme_widget_message_service_icon')) return;
        if (wrapper.classList.contains('js-widget_message_pinned')) return;
        if (wrapper.querySelector('.tgme_widget_message_forwarded_from')) return;
        
        const msgEl = wrapper.querySelector('.tgme_widget_message');
        if (msgEl?.classList.contains('pinned')) return;
        const msgId = msgEl?.getAttribute('data-post')?.split('/')[1] || '';
        
        if (idx === 0 && msgId) firstMsgId = msgId;
        
        const textEl = wrapper.querySelector('.tgme_widget_message_text');
        const dateEl = wrapper.querySelector('.tgme_widget_message_date time');
        
        if (textEl) {
          const htmlContent = textEl.innerHTML || '';
          const textContent = textEl.textContent?.trim() || '';
          
          if (textContent.length > 10) {
            pagePosts.push({
              id: parseInt(msgId) || Date.now(),
              text: htmlContent,
              date: dateEl?.getAttribute('datetime')?.split('T')[0] || ''
            });
          }
        }
      });
      
      return { posts: pagePosts, firstId: firstMsgId };
    } catch {
      return { posts: [], firstId: '' };
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      const { posts: initialPosts, firstId } = await fetchTelegramPage();
      if (initialPosts.length > 0) {
        initialPosts.sort((a, b) => b.id - a.id);
        setPosts(initialPosts);
        setBeforeId(firstId);
      }
      setLoading(false);
    };
    loadInitial();
  }, []);

  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    
    if (nearBottom && hasMore && !loadingMore && beforeId) {
      setLoadingMore(true);
      const { posts: morePosts, firstId } = await fetchTelegramPage(beforeId);
      
      if (morePosts.length > 0 && firstId !== beforeId) {
        setPosts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newPosts = morePosts.filter(p => !existingIds.has(p.id));
          return [...prev, ...newPosts].sort((a, b) => b.id - a.id);
        });
        setBeforeId(firstId);
      } else {
        setHasMore(false);
      }
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen pb-10 overflow-hidden" style={{ paddingTop: 'calc(var(--vw-unit) * 5)' }}>
      {/* 1.1 Hero Section with Mandala */}
      <div className="flex flex-col items-center justify-center relative" style={{ marginBottom: 'var(--space-lg)' }}>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"
          style={{ width: 'calc(var(--vw-unit) * 35)', height: 'calc(var(--vw-unit) * 35)' }}
        ></div>
        
        {/* Mandala with entrance animation */}
        <div className="animate-fade-in" style={{ animationDuration: '1s', marginTop: 'var(--space-lg)' }}>
          <Mandala size="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96" />
        </div>
        
        {/* Title - drops from mandala with running gradient */}
        <h1 
            className="font-bold tracking-wider sm:tracking-widest drop-shadow-sm text-center relative z-10 opacity-0 animate-drop-in"
            style={{ 
              animationDelay: '500ms', 
              animationFillMode: 'forwards',
              marginTop: 'var(--space-md)',
              fontSize: 'var(--text-5xl)',
              paddingLeft: 'var(--space-lg)',
              paddingRight: 'var(--space-lg)'
            }}
        >
            <span 
              className="bg-clip-text text-transparent animate-text-shimmer"
              style={{
                backgroundImage: 'linear-gradient(90deg, #4f46e5, #7c3aed, #c026d3, #db2777, #c026d3, #7c3aed, #4f46e5)',
                backgroundSize: '200% auto',
                animation: 'text-shimmer 3s linear infinite'
              }}
            >
              {t('hero_title')}
            </span>
        </h1>
        
        <style>{`
          @keyframes text-shimmer {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}</style>
        
        {/* Subtitle - drops from mandala */}
        <p 
            className="text-slate-900 dark:text-white font-medium text-center relative z-10 opacity-0 animate-drop-in"
            style={{ 
              animationDelay: '650ms', 
              animationFillMode: 'forwards',
              marginTop: 'var(--space-sm)',
              fontSize: 'var(--text-xl)',
              paddingLeft: 'var(--space-lg)',
              paddingRight: 'var(--space-lg)'
            }}
        >
            {t('hero_subtitle')}
        </p>

        {/* Buttons - drop from mandala */}
        <div 
            className="flex flex-wrap justify-center relative z-10 opacity-0 animate-drop-in"
            style={{ 
              animationDelay: '800ms', 
              animationFillMode: 'forwards',
              marginTop: 'var(--space-xl)',
              gap: 'var(--space-md)',
              paddingLeft: 'var(--space-sm)',
              paddingRight: 'var(--space-sm)'
            }}
        >
            {[
                { label: t('btn_courses'), path: '/training', icon: BookOpen },
                { label: t('btn_consult'), path: '/consultations', icon: MessageCircle },
                { label: t('btn_shop'), path: '/workshop', icon: Gem },
                { label: t('btn_knowledge'), path: '/knowledge', icon: Eye }
            ].map((btn) => (
                <Link 
                    key={btn.label}
                    to={btn.path}
                    className="flex items-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold tracking-wider sm:tracking-widest hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-500 hover:text-white dark:hover:text-white transition-all uppercase shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/40 hover:-translate-y-1"
                    style={{ 
                      gap: 'var(--space-sm)', 
                      padding: 'var(--space-md) var(--space-xl)',
                      fontSize: 'var(--text-xs)'
                    }}
                >
                    <btn.icon style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }} />
                    {btn.label}
                </Link>
            ))}
        </div>
      </div>

      {/* 1.4 Picture + Rich Text - Scroll triggered */}
      <div 
        ref={(el) => registerElement('about', el)}
        data-reveal="about"
        className={`w-full grid md:grid-cols-2 items-start ${fadeUp('about')}`}
        style={{ padding: 'var(--space-xl) var(--container-padding)', gap: 'var(--space-xl)' }}
      >
        <div 
          className={`relative overflow-hidden ${scaleIn('about')}`}
          style={{ transitionDelay: '100ms', borderRadius: 'var(--radius-3xl)', marginTop: 'var(--space-2xl)' }}
        >
            <img loading="lazy" src="/logo.png" alt="Dobrev Opus Zodiac" className="w-full h-auto" />
        </div>
        <div className={`${fadeLeft('about')}`} style={{ transitionDelay: '200ms' }}>
            <h2 
              className="font-bold text-slate-800 dark:text-white relative inline-block"
              style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-xl)' }}
            >
                {t('hero_desc_title')}
                <div 
                  className="absolute left-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full"
                  style={{ bottom: 'calc(var(--vw-unit) * -0.5)', width: 'calc(var(--vw-unit) * 5)', height: 'calc(var(--vw-unit) * 0.25)' }}
                ></div>
            </h2>
            <div 
              className="text-slate-700 dark:text-slate-300 leading-relaxed text-justify font-medium [&_b]:font-bold [&_i]:italic [&_br]:block [&_p]:mb-3"
              style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-lg)' }}
              dangerouslySetInnerHTML={{ __html: t('hero_desc_p1') }}
            />
            <div 
              className="text-slate-700 dark:text-slate-300 leading-relaxed text-justify font-medium [&_b]:font-bold [&_i]:italic [&_br]:block [&_p]:mb-3"
              style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-lg)' }}
              dangerouslySetInnerHTML={{ __html: t('hero_desc_p2') }}
            />
            <div 
              className="text-slate-700 dark:text-slate-300 leading-relaxed text-justify font-medium [&_b]:font-bold [&_i]:italic [&_br]:block [&_p]:mb-3"
              style={{ fontSize: 'var(--text-base)' }}
              dangerouslySetInnerHTML={{ __html: t('hero_desc_p3') }}
            />
        </div>
      </div>

      {/* 1.5 Video - Scroll triggered */}
      <div 
        ref={(el) => registerElement('video', el)}
        data-reveal="video"
        className={`max-w-5xl mx-auto ${fadeUp('video')}`}
        style={{ padding: 'var(--space-xl) var(--container-padding)' }}
      >
        <div 
          className={`aspect-video w-full overflow-hidden snake-border ${scaleIn('video')}`} 
          style={{ transitionDelay: '150ms', borderRadius: 'var(--radius-3xl)' }}
        >
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/watch?v=i10Snd9se2Q" 
                title="Intro Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            ></iframe>
        </div>
        {/* About Master Button */}
        <div className={`text-center ${fadeUp('video')}`} style={{ transitionDelay: '300ms', marginTop: 'var(--space-xl)' }}>
            <Link 
              to="/master/about" 
              className="inline-block rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-wider sm:tracking-widest hover:scale-105 transition-transform shadow-xl"
              style={{ padding: 'var(--space-md) var(--space-2xl)', fontSize: 'var(--text-sm)' }}
            >
                {t('btn_about_master')}
            </Link>
        </div>
      </div>

      {/* 1.7 Telegram Channel - Scroll triggered */}
      <div 
        ref={(el) => registerElement('telegram', el)}
        data-reveal="telegram"
        className={`max-w-2xl mx-auto ${fadeUp('telegram')}`}
        style={{ padding: 'var(--space-xl) var(--container-padding)', marginBottom: 'var(--space-2xl)' }}
      >
          <div 
            className={`glass-panel dark:bg-slate-900/70 snake-border ${scaleIn('telegram')}`} 
            style={{ transitionDelay: '150ms', borderRadius: 'var(--radius-3xl)', padding: 'var(--space-xl)' }}
          >
             {/* Header */}
             <div 
               className="flex items-center border-b border-slate-200/50 dark:border-slate-700/50"
               style={{ gap: 'var(--space-md)', marginBottom: 'var(--space-xl)', paddingBottom: 'var(--space-lg)' }}
             >
               <div 
                 className="rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg"
                 style={{ width: 'calc(var(--vw-unit) * 3)', height: 'calc(var(--vw-unit) * 3)' }}
               >
                 <Send style={{ width: 'var(--size-icon-md)', height: 'var(--size-icon-md)' }} />
               </div>
               <div>
                 <h3 className="font-bold text-slate-800 dark:text-white" style={{ fontSize: 'var(--text-base)' }}>Elite Archetypes</h3>
                 <span className="text-slate-500" style={{ fontSize: 'var(--text-xs)' }}>@EliteArchetypes • Telegram</span>
               </div>
               <a 
                 href="https://t.me/EliteArchetypes" 
                 target="_blank" 
                 rel="noreferrer" 
                 className="ml-auto rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold hover:scale-105 transition-transform shadow-md"
                 style={{ padding: 'var(--space-sm) var(--space-lg)', fontSize: 'var(--text-xs)' }}
               >
                 Підписатися
               </a>
             </div>
             
             {/* Posts */}
             <div 
               className="overflow-y-auto custom-scrollbar" 
               style={{ height: 'calc(var(--vw-unit) * 30)', paddingRight: 'var(--space-sm)' }}
               onScroll={handleScroll}
             >
                 <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                   {loading ? (
                     <div className="flex items-center justify-center h-full">
                       <Loader2 className="animate-spin text-indigo-500" style={{ width: 'var(--size-icon-lg)', height: 'var(--size-icon-lg)' }} />
                     </div>
                   ) : posts.length > 0 ? (
                     <>
                       {posts.map((post) => (
                         <div 
                           key={post.id} 
                           className="bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-shadow"
                           style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-xl)' }}
                         >
                           <div 
                             className="font-sans text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-wrap break-words [&_a]:text-indigo-500 [&_a]:underline [&_b]:font-bold [&_i]:italic"
                             style={{ fontSize: 'var(--text-sm)' }}
                             dangerouslySetInnerHTML={{ __html: post.text }}
                           />
                           <span className="text-slate-400 block" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-md)' }}>{post.date}</span>
                         </div>
                       ))}
                       {loadingMore && (
                         <div className="flex justify-center" style={{ padding: 'var(--space-lg)' }}>
                           <Loader2 className="animate-spin text-indigo-500" style={{ width: 'var(--size-icon-md)', height: 'var(--size-icon-md)' }} />
                         </div>
                       )}
                     </>
                   ) : (
                     <div className="flex flex-col items-center justify-center h-full text-slate-400">
                       <Send className="opacity-30" style={{ width: 'calc(var(--vw-unit) * 2.5)', height: 'calc(var(--vw-unit) * 2.5)', marginBottom: 'var(--space-md)' }} />
                       <p style={{ fontSize: 'var(--text-sm)' }}>Перейдіть в канал для перегляду постів</p>
                     </div>
                   )}
                 </div>
             </div>
          </div>
      </div>

    </div>
  );
};
