import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import GlassMorphismCard from '../components/GlassMorphismCard';
import FormStepper from '../components/FormStepper';
import { MapPin } from 'lucide-react';

// List of Argentine provinces
const provinces = [
  'Buenos Aires',
  'CABA',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán'
];

const Step5Province: React.FC = () => {
  const { formData, updateFormData, theme } = useFormContext();
  
  const handleProvinceSelect = (province: string) => {
    updateFormData({ province });
  };

  return (
    <div className="max-w-xl mx-auto">
      <GlassMorphismCard>
        <div className="flex items-center mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'light' ? 'bg-violet-100' : 'bg-violet-900/30'}`}>
            <MapPin className={`w-5 h-5 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Provincia de residencia
          </h2>
        </div>
        
        <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Selecciona la provincia donde resides actualmente.
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {provinces.map((province) => (
            <button
              key={province}
              className={`
                p-3 rounded-xl text-left 
                transition-all duration-200
                ${formData.province === province 
                  ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-md' 
                  : theme === 'light'
                    ? 'bg-white/50 text-gray-800 hover:bg-white/80 border border-gray-200'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }
              `}
              onClick={() => handleProvinceSelect(province)}
            >
              {province}
            </button>
          ))}
        </div>
        
        <FormStepper canProceed={formData.province !== ''} />
      </GlassMorphismCard>
    </div>
  );
};

export default Step5Province;