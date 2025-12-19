import React, { useState, useEffect } from 'react';

export const Mandala: React.FC<{ size?: string }> = ({ size = 'w-64 h-64' }) => {
  const [spinComplete, setSpinComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpinComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${size} relative flex items-center justify-center`}>
      {/* Soft dark violet glow for dark theme */}
      <div 
        className="absolute rounded-full blur-[60px] opacity-30 dark:opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(99, 78, 150, 0.4) 0%, rgba(67, 56, 117, 0.25) 40%, rgba(30, 27, 75, 0.15) 70%, transparent 100%)',
          width: 'calc(100% + 3cm)',
          height: 'calc(100% + 3cm)',
          top: '-1.5cm',
          left: '-1.5cm'
        }}
      ></div>
      <div 
        className="absolute rounded-full blur-[40px] opacity-25 dark:opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(109, 88, 166, 0.35) 0%, rgba(76, 61, 130, 0.2) 50%, transparent 100%)',
          width: 'calc(100% + 2cm)',
          height: 'calc(100% + 2cm)',
          top: '-1cm',
          left: '-1cm'
        }}
      ></div>
      <div 
        className="absolute rounded-full blur-[25px] opacity-20 dark:opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(129, 108, 186, 0.3) 0%, rgba(88, 71, 145, 0.15) 60%, transparent 100%)',
          width: 'calc(100% + 1cm)',
          height: 'calc(100% + 1cm)',
          top: '-0.5cm',
          left: '-0.5cm'
        }}
      ></div>
      
      {/* Mandala */}
      <img 
        loading="eager"
        src="/mandala.png" 
        alt="Dobrev Opus Zodiac"
        className={`w-full h-full object-contain relative z-10 ${spinComplete ? 'animate-heartbeat' : 'animate-spin-once'}`}
        style={{ transition: 'none' }}
      />
    </div>
  );
};