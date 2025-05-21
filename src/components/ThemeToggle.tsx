import React from 'react';
import { useFormContext } from '../context/FormContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useFormContext();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 absolute top-4 right-4 z-10 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-800" />
      ) : (
        <Sun className="w-5 h-5 text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;