import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our form data
export interface FormData {
  // Loan details
  loanAmount: number;
  loanTerm: number;
  
  // Personal information
  firstName: string;
  lastName: string;
  dni: string;
  province: string;
  email: string;
  phone: string;
  
  // Employment status
  employmentStatus: string;
  
  // Employment specific questions (will be populated based on selection)
  employmentQuestions: Record<string, string>;
  
  // Payment information
  cardType: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  
  // Consent
  agreeToTerms: boolean;
}

interface FormContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  calculateMonthlyPayment: () => number;
  totalPayment: () => number;
  totalInterest: () => number;
}

// Create context with default values
const FormContext = createContext<FormContextType | undefined>(undefined);

// Define default form data
const defaultFormData: FormData = {
  loanAmount: 50000,
  loanTerm: 12,
  firstName: '',
  lastName: '',
  dni: '',
  province: '',
  email: '',
  phone: '',
  employmentStatus: '',
  employmentQuestions: {},
  cardType: '',
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvv: '',
  agreeToTerms: false
};

// Create provider component
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Update form data
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = formData.loanAmount;
    const interestRate = 0.029; // 2.9% monthly interest rate
    const termMonths = formData.loanTerm;
    
    const monthlyRate = interestRate;
    const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
    
    return payment;
  };

  // Calculate total payment
  const totalPayment = () => {
    return calculateMonthlyPayment() * formData.loanTerm;
  };

  // Calculate total interest
  const totalInterest = () => {
    return totalPayment() - formData.loanAmount;
  };

  return (
    <FormContext.Provider 
      value={{
        currentStep,
        setCurrentStep,
        formData,
        updateFormData,
        isLoading,
        setIsLoading,
        theme,
        toggleTheme,
        calculateMonthlyPayment,
        totalPayment,
        totalInterest
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};