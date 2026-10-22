import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'whatsapp' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white shadow-md shadow-blue-900/20 active:scale-[0.98]',
  secondary:
    'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 active:scale-[0.98]',
  ghost:
    'bg-transparent hover:bg-slate-100 text-slate-700 active:scale-[0.98]',
  outline:
    'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-[0.98]',
  whatsapp:
    'bg-[#25d366] hover:bg-[#20bd5a] text-white shadow-md shadow-emerald-950/20 active:scale-[0.98]',
  danger:
    'bg-rose-600 hover:bg-rose-700 text-white shadow-sm active:scale-[0.98]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-xs sm:text-sm rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-sm sm:text-base rounded-xl gap-2.5 font-bold',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
          fullWidth ? 'w-full' : ''
        } ${className}`.trim()}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && icon && iconPosition === 'left' && (
          <span className="shrink-0">{icon}</span>
        )}
        {children != null && <span>{children}</span>}
        {!isLoading && icon && iconPosition === 'right' && (
          <span className="shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
