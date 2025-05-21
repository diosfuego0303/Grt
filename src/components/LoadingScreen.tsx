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
      <div className="text-center relative">
        {/* Animated circles background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-64 h-64 rounded-full opacity-20 animate-pulse bg-gradient-to-r from-violet-600 to-blue-500" 
               style={{ transform: 'translate(-30%, -30%)' }} />
          <div className="absolute w-64 h-64 rounded-full opacity-20 animate-pulse bg-gradient-to-r from-blue-500 to-violet-600"
               style={{ transform: 'translate(30%, 30%)', animationDelay: '0.5s' }} />
        </div>
        
        {/* Main logo animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute w-full h-full rounded-full opacity-75 animate-ping bg-gradient-to-r from-violet-600 to-blue-500"></div>
          <div className="absolute w-full h-full rounded-full animate-pulse bg-gradient-to-r from-violet-600 to-blue-500"></div>
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-violet-600 to-blue-500">
            <span className="text-4xl font-bold text-white">CA</span>
          </div>
        </div>
        
        {/* Loading text */}
        <h2 className={`text-3xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-500 animate-pulse`}>
          CrediArg
        </h2>
        
        {/* Loading dots */}
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        {/* Loading progress bar */}
        <div className="mt-6 w-48 h-1 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-violet-600 to-blue-500 animate-loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;