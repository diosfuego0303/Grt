import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import GlassMorphismCard from '../components/GlassMorphismCard';
import Input from '../components/Input';
import FormStepper from '../components/FormStepper';
import { Car as IdCard } from 'lucide-react';

const Step4Dni: React.FC = () => {
  const { formData, updateFormData, theme } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateDni = (dni: string) => {
    // Remove non-numeric characters
    const cleanDni = dni.replace(/\D/g, '');
    
    // Check if it's between 7 and 8 digits (common for Argentine DNI)
    return cleanDni.length >= 7 && cleanDni.length <= 8;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    // Format DNI with dots (for visual display)
    const cleanDni = value.replace(/\D/g, '');
    
    updateFormData({ dni: cleanDni });
    
    if (!validateDni(cleanDni) && cleanDni.length > 0) {
      setErrors({ dni: 'El DNI debe tener entre 7 y 8 dígitos' });
    } else {
      setErrors({});
    }
  };

  const isValid = validateDni(formData.dni);

  return (
    <div className="max-w-xl mx-auto">
      <GlassMorphismCard>
        <div className="flex items-center mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'light' ? 'bg-violet-100' : 'bg-violet-900/30'}`}>
            <IdCard className={`w-5 h-5 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Documento de identidad
          </h2>
        </div>
        
        <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Por favor ingresa tu número de DNI. Este dato es necesario para verificar tu identidad.
        </p>
        
        <Input
          type="text"
          name="dni"
          label="Número de DNI"
          placeholder="Ingresa tu número de DNI"
          value={formData.dni}
          onChange={handleChange}
          error={errors.dni}
          required
        />
        
        <FormStepper canProceed={isValid} />
      </GlassMorphismCard>
    </div>
  );
};

export default Step4Dni;