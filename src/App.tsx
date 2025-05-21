import React from 'react';
import { FormProvider, useFormContext } from './context/FormContext';
import LoadingScreen from './components/LoadingScreen';
import ThemeToggle from './components/ThemeToggle';
import GradientBackground from './components/background/GradientBackground';

// Import steps
import Step1Welcome from './steps/Step1Welcome';
import Step2LoanDetails from './steps/Step2LoanDetails';
import Step3PersonalInfo from './steps/Step3PersonalInfo';
import Step4Dni from './steps/Step4Dni';
import Step5Province from './steps/Step5Province';
import Step6ContactInfo from './steps/Step6ContactInfo';
import Step7EmploymentStatus from './steps/Step7EmploymentStatus';
import Step8EmploymentQuestions from './steps/Step8EmploymentQuestions';
import Step9CardDetails from './steps/Step9CardDetails';
import Step10Summary from './steps/Step10Summary';

const FormStepContent: React.FC = () => {
  const { currentStep, isLoading, theme } = useFormContext();
  
  // If loading is true, show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  // Render the appropriate step based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome />;
      case 2:
        return <Step2LoanDetails />;
      case 3:
        return <Step3PersonalInfo />;
      case 4:
        return <Step4Dni />;
      case 5:
        return <Step5Province />;
      case 6:
        return <Step6ContactInfo />;
      case 7:
        return <Step7EmploymentStatus />;
      case 8:
        return <Step8EmploymentQuestions />;
      case 9:
        return <Step9CardDetails />;
      case 10:
      case 11: // Final step (summary and submit)
        return <Step10Summary />;
      default:
        return <Step1Welcome />;
    }
  };
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
      {/* Theme toggle button */}
      <ThemeToggle />
      
      {/* Main content */}
      <main className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="w-full max-w-5xl">
          {renderStep()}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  );
}

const AppContent: React.FC = () => {
  const { theme } = useFormContext();
  
  return (
    <div className={theme === 'light' ? 'light' : 'dark'}>
      <GradientBackground />
      <FormStepContent />
    </div>
  );
};

export default App;