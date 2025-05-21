import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import GlassMorphismCard from '../components/GlassMorphismCard';
import Input from '../components/Input';
import FormStepper from '../components/FormStepper';
import { Briefcase, User, Building, Users, GraduationCap, Heart } from 'lucide-react';

// Questions for different employment statuses
const employmentQuestions: Record<string, Array<{ id: string; label: string; type: string }>> = {
  'employed': [
    { id: 'company', label: '¿En qué empresa trabajas?', type: 'text' },
    { id: 'position', label: '¿Cuál es tu cargo?', type: 'text' },
    { id: 'yearsEmployed', label: '¿Cuántos años llevas en la empresa?', type: 'number' },
    { id: 'monthlyIncome', label: '¿Cuál es tu ingreso mensual aproximado?', type: 'number' }
  ],
  'self-employed': [
    { id: 'activity', label: '¿Cuál es tu actividad principal?', type: 'text' },
    { id: 'category', label: '¿Categoría de monotributo?', type: 'text' },
    { id: 'yearsActivity', label: '¿Cuántos años llevas en esta actividad?', type: 'number' },
    { id: 'monthlyIncome', label: '¿Cuál es tu ingreso mensual aproximado?', type: 'number' }
  ],
  'employer': [
    { id: 'company', label: '¿Nombre de tu empresa?', type: 'text' },
    { id: 'employees', label: '¿Cuántos empleados tienes?', type: 'number' },
    { id: 'yearsActivity', label: '¿Cuántos años de antigüedad tiene la empresa?', type: 'number' },
    { id: 'monthlyIncome', label: '¿Cuál es tu ingreso mensual aproximado?', type: 'number' }
  ],
  'unemployed': [
    { id: 'lastJob', label: '¿Cuál fue tu último trabajo?', type: 'text' },
    { id: 'timeUnemployed', label: '¿Hace cuántos meses estás sin empleo?', type: 'number' },
    { id: 'lookingForJob', label: '¿Estás buscando trabajo actualmente?', type: 'text' },
    { id: 'alternativeIncome', label: '¿Tienes alguna fuente de ingresos alternativa?', type: 'text' }
  ],
  'retired': [
    { id: 'previousJob', label: '¿Cuál fue tu ocupación anterior?', type: 'text' },
    { id: 'yearsRetired', label: '¿Cuántos años llevas jubilado?', type: 'number' },
    { id: 'pensionAmount', label: '¿Cuánto percibes mensualmente?', type: 'number' },
    { id: 'additionalIncome', label: '¿Tienes ingresos adicionales?', type: 'text' }
  ],
  'pensioned': [
    { id: 'pensionType', label: '¿Qué tipo de pensión recibes?', type: 'text' },
    { id: 'yearsPensioned', label: '¿Desde hace cuántos años?', type: 'number' },
    { id: 'pensionAmount', label: '¿Cuánto percibes mensualmente?', type: 'number' },
    { id: 'additionalIncome', label: '¿Tienes ingresos adicionales?', type: 'text' }
  ],
  'student': [
    { id: 'institution', label: '¿En qué institución estudias?', type: 'text' },
    { id: 'career', label: '¿Qué carrera estás cursando?', type: 'text' },
    { id: 'yearStudying', label: '¿En qué año estás?', type: 'number' },
    { id: 'incomeSource', label: '¿Cuál es tu fuente de ingresos?', type: 'text' }
  ]
};

// Icons for each employment status
const statusIcons: Record<string, React.ReactNode> = {
  'employed': <Briefcase />,
  'self-employed': <User />,
  'employer': <Building />,
  'unemployed': <User />,
  'retired': <Heart />,
  'pensioned': <Users />,
  'student': <GraduationCap />
};

// Labels for each employment status
const statusLabels: Record<string, string> = {
  'employed': 'Empleado',
  'self-employed': 'Monotributista',
  'employer': 'Empleador',
  'unemployed': 'Desempleado',
  'retired': 'Jubilado',
  'pensioned': 'Pensionado',
  'student': 'Estudiante'
};

const Step8EmploymentQuestions: React.FC = () => {
  const { formData, updateFormData, theme } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Get questions for the selected employment status
  const questions = employmentQuestions[formData.employmentStatus] || [];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    updateFormData({
      employmentQuestions: {
        ...formData.employmentQuestions,
        [name]: value
      }
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate if all questions are answered
  const isValid = questions.every(q => 
    formData.employmentQuestions[q.id] && 
    formData.employmentQuestions[q.id].trim() !== ''
  );

  const statusIcon = statusIcons[formData.employmentStatus];
  const statusLabel = statusLabels[formData.employmentStatus];

  return (
    <div className="max-w-xl mx-auto">
      <GlassMorphismCard>
        <div className="flex items-center mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'light' ? 'bg-violet-100' : 'bg-violet-900/30'}`}>
            <span className={`${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`}>
              {statusIcon}
            </span>
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Información como {statusLabel}
          </h2>
        </div>
        
        <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Por favor responde las siguientes preguntas relacionadas con tu situación como {statusLabel.toLowerCase()}.
        </p>
        
        <div className="space-y-4">
          {questions.map((question) => (
            <Input
              key={question.id}
              type={question.type}
              name={question.id}
              label={question.label}
              value={formData.employmentQuestions[question.id] || ''}
              onChange={handleChange}
              error={errors[question.id]}
              required
            />
          ))}
        </div>
        
        <FormStepper canProceed={isValid} />
      </GlassMorphismCard>
    </div>
  );
};

export default Step8EmploymentQuestions;