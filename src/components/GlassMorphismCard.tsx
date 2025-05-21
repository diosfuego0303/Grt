import React, { ReactNode } from 'react';
import { useFormContext } from '../context/FormContext';

interface GlassMorphismCardProps {
  children: ReactNode;
  className?: string;
}

const GlassMorphismCard: React.FC<GlassMorphismCardProps> = ({ children, className = '' }) => {
  const { theme } = useFormContext();

  return (
    <div 
      className={`
        rounded-2xl p-6 md:p-8 
        backdrop-blur-md 
        transition-all duration-300 
        shadow-lg 
        border border-white/10
        ${theme === 'light' 
          ? 'bg-white/70 text-gray-800' 
          : 'bg-black/30 text-white'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassMorphismCard;