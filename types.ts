import React from 'react';

export type UserRole = 'student' | 'manager' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  progress: Record<string, number>; // courseId -> percentage
}

export interface MenuItem {
  label: string;
  path: string;
  subItems?: MenuItem[];
}

export interface CourseSlide {
  id: string;
  title: string;
  type: 'theory' | 'practice' | 'exam';
  content: string; // Rich text or HTML
  audioUrl?: string;
  imageUrl?: string;
  duration?: number; // seconds
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  slides: CourseSlide[];
}

export interface Course {
  id: string;
  year: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  modules: CourseModule[];
  locked: boolean; // General availability lock
  purchased: boolean; // User specific access
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'coins' | 'procedures' | 'seals' | 'attributes' | 'jewelry';
  price: number;
  description: string;
  imageUrl: string;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  description: string;
}

export interface FaqItem {
  id: string;
  category: string;
  title: string;
  content: React.ReactNode;
}