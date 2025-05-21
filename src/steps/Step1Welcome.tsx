import React, { useState, useEffect } from 'react';
import { useFormContext } from '../context/FormContext';
import GlassMorphismCard from '../components/GlassMorphismCard';
import Button from '../components/Button';
import { ArrowRight, Clipboard, Clock, CreditCard } from 'lucide-react';

const Step1Welcome: React.FC = () => {
  const { setCurrentStep, theme } = useFormContext();
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-all duration-700 ease-out transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <GlassMorphismCard className="text-center max-w-xl mx-auto">
        <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          Bienvenido a <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-500">CrediArg</span>
        </h1>
        
        <p className={`mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Estamos aquí para ayudarte a obtener el préstamo personal que necesitas de forma rápida y segura. El proceso es simple y solo tomará unos minutos.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${theme === 'light' ? 'bg-white/50' : 'bg-white/5'}`}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-gradient-to-r from-violet-600/10 to-blue-500/10">
              <Clipboard className={`w-6 h-6 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
            </div>
            <h3 className="font-medium mb-1">Completa el formulario</h3>
            <p className="text-sm opacity-70">Datos básicos y verificación de identidad</p>
          </div>
          
          <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${theme === 'light' ? 'bg-white/50' : 'bg-white/5'}`}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-gradient-to-r from-violet-600/10 to-blue-500/10">
              <CreditCard className={`w-6 h-6 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
            </div>
            <h3 className="font-medium mb-1">Verifica tu tarjeta</h3>
            <p className="text-sm opacity-70">Validamos tu información bancaria</p>
          </div>
          
          <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${theme === 'light' ? 'bg-white/50' : 'bg-white/5'}`}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-gradient-to-r from-violet-600/10 to-blue-500/10">
              <Clock className={`w-6 h-6 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
            </div>
            <h3 className="font-medium mb-1">Recibe aprobación</h3>
            <p className="text-sm opacity-70">Aprobación rápida y fondos en tu cuenta</p>
          </div>
        </div>
        
        <Button 
          onClick={() => setCurrentStep(2)}
          className="mx-auto"
        >
          Comenzar <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </GlassMorphismCard>
    </div>
  );
};

export default Step1Welcome;