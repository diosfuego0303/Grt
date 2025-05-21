import React, { InputHTMLAttributes } from 'react';
import { useFormContext } from '../context/FormContext';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  const { theme } = useFormContext();
  
  return (
    <div className="mb-4">
      <label 
        className={`block text-sm font-medium mb-1 ${
          theme === 'light' ? 'text-gray-700' : 'text-gray-200'
        }`}
      >
        {label}
      </label>
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
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;