import React, { useEffect, useState } from 'react';

export const Mandala: React.FC<{ size?: string }> = ({ size = 'w-64 h-64' }) => {
  const [phase, setPhase] = useState<'spin' | 'pulse'>('spin');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('pulse');
    }, 1000); // 1s spin then switch to pulse
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${size} relative flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full text-magic-500 dark:text-magic-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]
          ${phase === 'spin' ? 'animate-spin-once' : 'animate-pulse-slow'}
        `}
        style={{ animationDelay: phase === 'pulse' ? '3s' : '0s' }}
      >
        {/* Simple geometric mandala representation */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M50 2 L50 98 M2 50 L98 50" stroke="currentColor" strokeWidth="0.5" />
        <path d="M16 16 L84 84 M84 16 L16 84" stroke="currentColor" strokeWidth="0.5" />
        <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 50 50)" />
        <circle cx="50" cy="50" r="10" fill="currentColor" className="opacity-20" />
      </svg>
    </div>
  );
};