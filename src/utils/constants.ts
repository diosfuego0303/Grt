// Define constants used across the application

// Labels for each employment status
export const statusLabels: Record<string, string> = {
  'employed': 'Empleado',
  'self-employed': 'Monotributista',
  'employer': 'Empleador',
  'unemployed': 'Desempleado',
  'retired': 'Jubilado',
  'pensioned': 'Pensionado',
  'student': 'Estudiante'
};

// Questions for different employment statuses
export const employmentQuestions: Record<string, Array<{ id: string; label: string; type: string }>> = {
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