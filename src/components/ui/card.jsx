import React from 'react';

export function Card({ children, className, ...props }) {
  return (
    <div className={`rounded-lg border border-gray-800 bg-black/40 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
} 