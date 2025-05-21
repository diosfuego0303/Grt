import React from 'react';
import { useFormContext } from '../context/FormContext';
import GlassMorphismCard from '../components/GlassMorphismCard';
import FormStepper from '../components/FormStepper';
import { Briefcase, User, GraduationCap, Building, Users, Heart } from 'lucide-react';

// Employment status options
const employmentStatuses = [
  { 
    id: 'employed', 
    label: 'Empleado', 
    icon: <Briefcase />,
    description: 'Trabajo en relación de dependencia'
  },
  { 
    id: 'self-employed', 
    label: 'Monotributista', 
    icon: <User />,
    description: 'Trabajo por cuenta propia'
  },
  { 
    id: 'employer', 
    label: 'Empleador', 
    icon: <Building />,
    description: 'Tengo empleados a mi cargo'
  },
  { 
    id: 'retired', 
    label: 'Jubilado', 
    icon: <Heart />,
    description: 'Percibo jubilación'
  },
  { 
    id: 'pensioned', 
    label: 'Pensionado', 
    icon: <Users />,
    description: 'Percibo pensión'
  },
  { 
    id: 'student', 
    label: 'Estudiante', 
    icon: <GraduationCap />,
    description: 'Actualmente estudiando'
  },
  { 
    id: 'unemployed', 
    label: 'Desempleado', 
    icon: <User />,
    description: 'Sin empleo actualmente'
  }
];

const Step7EmploymentStatus: React.FC = () => {
  const { formData, updateFormData, theme } = useFormContext();
  
  const handleStatusSelect = (status: string) => {
    updateFormData({ 
      employmentStatus: status,
      // Reset employment questions when changing status
      employmentQuestions: {} 
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <GlassMorphismCard>
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          ¿Cuál es tu situación laboral?
        </h2>
        
        <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Selecciona la opción que mejor describe tu situación laboral actual.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {employmentStatuses.map((status) => (
            <button
              key={status.id}
              className={`
                p-4 rounded-xl flex items-center
                transition-all duration-200
                ${formData.employmentStatus === status.id 
                  ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-md' 
                  : theme === 'light'
                    ? 'bg-white/50 text-gray-800 hover:bg-white/80 border border-gray-200'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }
              `}
              onClick={() => handleStatusSelect(status.id)}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center mr-3
                ${formData.employmentStatus === status.id
                  ? 'bg-white/20'
                  : theme === 'light' 
                    ? 'bg-violet-100' 
                    : 'bg-violet-900/30'
                }
              `}>
                <span className={`
                  ${formData.employmentStatus === status.id
                    ? 'text-white'
                    : theme === 'light' 
                      ? 'text-violet-600' 
                      : 'text-violet-400'
                  }
                `}>
                  {status.icon}
                </span>
              </div>
              <div className="text-left">
                <div className="font-medium">{status.label}</div>
                <div className="text-sm opacity-80">{status.description}</div>
              </div>
            </button>
          ))}
        </div>
        
        <FormStepper canProceed={formData.employmentStatus !== ''} />
      </GlassMorphismCard>
    </div>
  );
};

export default Step7EmploymentStatus;