import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'outline' | 'purple';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'purple', children, className }) => {
  const variants = {
    purple: 'bg-purple-950/80 text-purple-300 border-purple-800/80 shadow-[0_0_10px_rgba(168,85,247,0.15)]',
    default: 'bg-slate-900 text-slate-200 border-slate-700',
    success: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80',
    warning: 'bg-amber-950/80 text-amber-300 border-amber-800/80',
    info: 'bg-fuchsia-950/80 text-fuchsia-300 border-fuchsia-800/80',
    outline: 'bg-transparent text-purple-200 border-purple-500/40',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
