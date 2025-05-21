import React, { useEffect } from 'react';
import { useFormContext } from '../context/FormContext';

const LoadingScreen: React.FC = () => {
  const { setIsLoading, theme } = useFormContext();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [setIsLoading]);
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute w-full h-full rounded-full opacity-75 animate-ping bg-gradient-to-r from-violet-600 to-blue-500"></div>
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-violet-600 to-blue-500">
            <span className="text-3xl font-bold text-white">CA</span>
          </div>
        </div>
        <h2 className={`text-2xl font-semibold mt-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          Cargando
        </h2>
        <div className="mt-3 flex justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;