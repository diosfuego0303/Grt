import React, { ButtonHTMLAttributes } from 'react';
import { useFormContext } from '../context/FormContext';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const { theme } = useFormContext();
  
  const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm flex items-center justify-center";
  
  const variantClasses = {
    primary: theme === 'light'
      ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:shadow-lg hover:from-violet-700 hover:to-blue-600'
      : 'bg-gradient-to-r from-violet-700 to-blue-600 text-white hover:shadow-lg hover:from-violet-800 hover:to-blue-700',
    secondary: theme === 'light'
      ? 'bg-white/40 hover:bg-white/60 border border-white/20 text-gray-800'
      : 'bg-white/10 hover:bg-white/20 border border-white/10 text-white',
    outline: theme === 'light'
      ? 'border border-gray-300 text-gray-800 hover:bg-gray-100'
      : 'border border-gray-700 text-white hover:bg-white/10'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;