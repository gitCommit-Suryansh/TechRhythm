import React from 'react';

export function Card({ children, className, ...props }) {
  return (
    <div className={`rounded-lg border border-[#39FF14] bg-[#1a1a1a] ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={`p-6 text-[#E0E0E0] ${className}`} {...props}>
      {children}
    </div>
  );
} 