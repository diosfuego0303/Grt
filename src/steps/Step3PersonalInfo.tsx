import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import GlassMorphismCard from '../components/GlassMorphismCard';
import Input from '../components/Input';
import FormStepper from '../components/FormStepper';
import { User } from 'lucide-react';

const Step3PersonalInfo: React.FC = () => {
  const { formData, updateFormData, theme } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const isValid = formData.firstName.trim() !== '' && formData.lastName.trim() !== '';

  return (
    <div className="max-w-xl mx-auto">
      <GlassMorphismCard>
        <div className="flex items-center mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'light' ? 'bg-violet-100' : 'bg-violet-900/30'}`}>
            <User className={`w-5 h-5 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Datos personales
          </h2>
        </div>
        
        <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Para comenzar, necesitamos tus datos personales. Toda la información es 
          tratada con la mayor confidencialidad.
        </p>
        
        <div className="space-y-2">
          <Input
            type="text"
            name="firstName"
            label="Nombre"
            placeholder="Ingresa tu nombre"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />
          
          <Input
            type="text"
            name="lastName"
            label="Apellido"
            placeholder="Ingresa tu apellido"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
        </div>
        
        <FormStepper canProceed={isValid} />
      </GlassMorphismCard>
    </div>
  );
};

export default Step3PersonalInfo;