import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] relative overflow-hidden';

    const variants = {
      primary:
        'bg-gradient-to-r from-purple-700 via-violet-600 to-fuchsia-600 text-white hover:from-purple-600 hover:via-violet-500 hover:to-fuchsia-500 shadow-lg shadow-purple-900/40 hover:shadow-purple-600/50 border border-purple-400/30',
      neon:
        'bg-fuchsia-600 text-white hover:bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.5)] border border-fuchsia-300/40 font-bold',
      secondary:
        'bg-purple-950/80 text-purple-200 border border-purple-800/60 hover:bg-purple-900/90 hover:text-white hover:border-purple-600',
      outline:
        'border border-purple-500/40 bg-purple-950/20 text-purple-200 hover:bg-purple-900/40 hover:border-purple-400 hover:text-white',
      ghost:
        'bg-transparent text-purple-300 hover:bg-purple-950/50 hover:text-white',
      destructive:
        'bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-500 shadow-md',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3.5 text-base font-semibold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
