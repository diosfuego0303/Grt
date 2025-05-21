import React, { InputHTMLAttributes, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { Check } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showValidation?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '', 
  showValidation = true,
  value,
  ...props 
}) => {
  const { theme } = useFormContext();
  const [isTouched, setIsTouched] = useState(false);
  
  const isValid = showValidation && isTouched && value && !error;
  
  return (
    <div className="mb-4 relative">
      <label 
        className={`block text-sm font-medium mb-1 ${
          theme === 'light' ? 'text-gray-700' : 'text-gray-200'
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`
            w-full px-4 py-3 rounded-xl 
            backdrop-blur-sm 
            transition-all duration-200
            outline-none focus:ring-2
            ${theme === 'light' 
              ? 'bg-white/80 border border-gray-200 text-gray-800 focus:ring-violet-500' 
              : 'bg-white/10 border border-white/10 text-white focus:ring-blue-500'
            }
            ${error ? 'border-red-500' : ''}
            ${isValid ? 'pr-10' : ''}
            ${className}
          `}
          onBlur={() => setIsTouched(true)}
          value={value}
          {...props}
        />
        {isValid && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-checkmark">
            <Check className="w-5 h-5 text-green-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;