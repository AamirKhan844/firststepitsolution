import React, { forwardRef, useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      fullWidth = true,
      className = '',
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const customDescribedBy = props['aria-describedby'];
    const defaultDescribedBy = error ? errorId : helperText ? helperId : undefined;
    const combinedDescribedBy =
      [defaultDescribedBy, customDescribedBy].filter(Boolean).join(' ') || undefined;

    return (
      <div className={`${fullWidth ? 'w-full' : 'inline-block'} space-y-1.5`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold text-slate-700 tracking-tight"
          >
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            className={`w-full py-2.5 text-xs sm:text-sm rounded-xl border bg-white text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${
              icon ? 'pl-10 pr-3.5' : 'px-3.5'
            } ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20'
            } ${className}`.trim()}
            {...props}
            aria-describedby={combinedDescribedBy}
          />
        </div>


        {error && (
          <p id={errorId} role="alert" className="text-[11px] font-semibold text-rose-600 mt-1">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-[11px] text-slate-500 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
