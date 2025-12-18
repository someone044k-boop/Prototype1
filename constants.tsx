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
      { label: 'sub_ask', path: '/master/ask' },
      { label: 'sub_lessons', path: '/master/lessons' },
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
  { id: '1', category: 'General', title: '8-ма Чакра', content: '8-ма чакра з\'єднує нас з універсальною сіткою...' },
  { id: '2', category: 'General', title: 'Алхімічні константи', content: 'Сірка, Ртуть та Сіль як психологічні примітиви...' },
  { id: '3', category: 'General', title: 'DobrevOpusZodiac', content: 'Основна методологія нашої школи...' },
  { id: '4', category: 'General', title: 'Шлях Героя', content: 'Етапи становлення особистості...' },
  { id: '5', category: 'General', title: 'Архетипи', content: 'Універсальні вроджені психічні структури...' },
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
  { id: 'p1', category: 'coins', name: 'Монета Фортуни', price: 500, description: 'Притягує удачу.', imageUrl: 'https://picsum.photos/200' },
  { id: 'p2', category: 'seals', name: 'Печатка Змієносця', price: 1200, description: 'Прихована сила зодіаку.', imageUrl: 'https://picsum.photos/200' },
  { id: 'p3', category: 'jewelry', name: 'Перстень Сили', price: 16400, description: 'Срібло та Золото.', imageUrl: 'https://picsum.photos/200' },
];