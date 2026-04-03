import React from 'react';
import logoImg from './1.png';

export const Logo = ({ className = "h-12 w-auto", light = false }: { className?: string, light?: boolean }) => (
  <img 
    src={logoImg} 
    alt="Dragonfly Logo" 
    className={`${className} object-contain ${light ? 'brightness-0 invert' : ''}`}
    referrerPolicy="no-referrer"
  />
);
