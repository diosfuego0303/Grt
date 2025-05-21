import React from 'react';
import { useFormContext } from '../context/FormContext';
import ProgressBar from './ProgressBar';
import Button from './Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface FormStepperProps {
  canProceed: boolean;
  showBackButton?: boolean;
}

const FormStepper: React.FC<FormStepperProps> = ({ 
  canProceed, 
  showBackButton = true 
}) => {
  const { currentStep, setCurrentStep } = useFormContext();

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="mt-8">
      <ProgressBar />
      
      <div className="flex justify-between">
        {showBackButton && currentStep > 1 ? (
          <Button
            variant="outline"
            onClick={handleBack}
            className="px-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Anterior
          </Button>
        ) : <div /> /* Empty div for spacing */}
        
        {currentStep < 11 && (
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="px-4"
          >
            Siguiente <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormStepper;