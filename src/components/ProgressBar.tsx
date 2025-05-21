import React from 'react';
import { useFormContext } from '../context/FormContext';

const ProgressBar: React.FC = () => {
  const { currentStep, theme } = useFormContext();
  const totalSteps = 11;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-1 relative mt-2 mb-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
      <div
        className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-violet-600 to-blue-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;