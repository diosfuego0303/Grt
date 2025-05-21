import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import GlassMorphismCard from '../components/GlassMorphismCard';
import RangeSlider from '../components/RangeSlider';
import FormStepper from '../components/FormStepper';
import { PieChart, Calendar, DollarSign } from 'lucide-react';

const Step2LoanDetails: React.FC = () => {
  const { formData, updateFormData, calculateMonthlyPayment, totalPayment, totalInterest, theme } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Format currency function
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAmountChange = (amount: number) => {
    updateFormData({ loanAmount: amount });
  };

  const handleTermChange = (term: number) => {
    updateFormData({ loanTerm: term });
  };

  // Payment details
  const monthlyPayment = calculateMonthlyPayment();
  const total = totalPayment();
  const interest = totalInterest();

  return (
    <div className="max-w-2xl mx-auto">
      <GlassMorphismCard>
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          Personaliza tu préstamo
        </h2>
        
        <div className="space-y-8">
          <RangeSlider
            min={50000}
            max={2500000}
            step={10000}
            value={formData.loanAmount}
            onChange={handleAmountChange}
            formatValue={formatCurrency}
            label="Monto del préstamo"
          />
          
          <RangeSlider
            min={3}
            max={60}
            step={1}
            value={formData.loanTerm}
            onChange={handleTermChange}
            formatValue={(value) => value.toString()}
            label="Plazo en meses"
            unit=" meses"
          />
        </div>
        
        <div className="mt-8 mb-4">
          <h3 className={`text-lg font-medium mb-4 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
            Resumen del préstamo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl ${theme === 'light' ? 'bg-white/50' : 'bg-white/5'}`}>
              <div className="flex items-center mb-2">
                <Calendar className={`w-5 h-5 mr-2 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
                <span className="text-sm font-medium">Cuota mensual</span>
              </div>
              <div className="text-xl font-bold">{formatCurrency(monthlyPayment)}</div>
            </div>
            
            <div className={`p-4 rounded-xl ${theme === 'light' ? 'bg-white/50' : 'bg-white/5'}`}>
              <div className="flex items-center mb-2">
                <DollarSign className={`w-5 h-5 mr-2 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
                <span className="text-sm font-medium">Total a pagar</span>
              </div>
              <div className="text-xl font-bold">{formatCurrency(total)}</div>
            </div>
            
            <div className={`p-4 rounded-xl ${theme === 'light' ? 'bg-white/50' : 'bg-white/5'}`}>
              <div className="flex items-center mb-2">
                <PieChart className={`w-5 h-5 mr-2 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
                <span className="text-sm font-medium">Intereses</span>
              </div>
              <div className="text-xl font-bold">{formatCurrency(interest)}</div>
            </div>
          </div>
        </div>
        
        <FormStepper canProceed={true} showBackButton={true} />
      </GlassMorphismCard>
    </div>
  );
};

export default Step2LoanDetails;