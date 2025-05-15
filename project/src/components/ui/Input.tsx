import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    const id = props.id || props.name || Math.random().toString(36).substring(2, 9);
    
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'input',
              icon && 'pl-10',
              error && 'border-error-500 focus:ring-error-500',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-error-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;