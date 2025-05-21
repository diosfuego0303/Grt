import React, { useState, useEffect } from 'react';
import { useFormContext } from '../context/FormContext';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  label: string;
  unit?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  formatValue = (val) => val.toString(),
  label,
  unit = '',
}) => {
  const { theme } = useFormContext();
  const [isDragging, setIsDragging] = useState(false);
  
  const percentage = ((value - min) / (max - min)) * 100;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
          {label}
        </label>
        <span 
          className={`
            text-lg font-bold px-3 py-1 rounded-full
            ${theme === 'light' ? 'bg-violet-100 text-violet-800' : 'bg-violet-900/30 text-violet-300'}
            transition-all duration-300 transform ${isDragging ? 'scale-110' : ''}
          `}
        >
          {formatValue(value)}{unit}
        </span>
      </div>
      
      <div className="relative h-12">
        <div 
          className={`
            absolute h-2 top-1/2 -translate-y-1/2 left-0 right-0 rounded-full 
            ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}
          `}
        ></div>
        
        <div 
          className="absolute h-2 top-1/2 -translate-y-1/2 left-0 rounded-full bg-gradient-to-r from-violet-600 to-blue-500"
          style={{ width: `${percentage}%` }}
        ></div>
        
        <div 
          className="absolute top-0 left-0 right-0"
          style={{ padding: '0.25rem 0' }}
        >
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="w-full absolute inset-0 appearance-none bg-transparent cursor-pointer z-10"
            style={{ height: '100%' }}
          />
          
          <div 
            className={`
              absolute w-6 h-6 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full shadow-lg border-2
              transition-all duration-200 
              ${isDragging ? 'scale-125' : ''}
              ${theme === 'light' 
                ? 'bg-white border-violet-500' 
                : 'bg-gray-100 border-blue-400'}
            `}
            style={{ left: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between mt-1">
        <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          {formatValue(min)}{unit}
        </span>
        <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          {formatValue(max)}{unit}
        </span>
      </div>
    </div>
  );
};

export default RangeSlider;