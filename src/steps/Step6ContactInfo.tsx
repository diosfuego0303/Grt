import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import GlassMorphismCard from '../components/GlassMorphismCard';
import Input from '../components/Input';
import FormStepper from '../components/FormStepper';
import { Mail, Phone } from 'lucide-react';

const Step6ContactInfo: React.FC = () => {
  const { formData, updateFormData, theme } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    // Validate input fields
    if (name === 'email' && value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Ingresa un correo electrónico válido' }));
    } else if (name === 'phone' && value && !validatePhone(value)) {
      setErrors(prev => ({ ...prev, phone: 'Ingresa un número de teléfono válido (10-15 dígitos)' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const isValid = 
    validateEmail(formData.email) && 
    validatePhone(formData.phone) && 
    Object.keys(errors).length === 0;

  return (
    <div className="max-w-xl mx-auto">
      <GlassMorphismCard>
        <div className="flex items-center mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'light' ? 'bg-violet-100' : 'bg-violet-900/30'}`}>
            <Mail className={`w-5 h-5 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Información de contacto
          </h2>
        </div>
        
        <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Por favor proporciona tus datos de contacto. Te enviaremos actualizaciones sobre tu solicitud.
        </p>
        
        <div className="space-y-3">
          <Input
            type="email"
            name="email"
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          
          <Input
            type="tel"
            name="phone"
            label="Número de teléfono"
            placeholder="Ej. 1123456789"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
        </div>
        
        <FormStepper canProceed={isValid} />
      </GlassMorphismCard>
    </div>
  );
};

export default Step6ContactInfo;