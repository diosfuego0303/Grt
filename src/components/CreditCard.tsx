import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';

interface CreditCardProps {
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardType: string;
}

const CreditCard: React.FC<CreditCardProps> = ({
  cardNumber,
  cardName,
  cardExpiry,
  cardType,
}) => {
  const { theme } = useFormContext();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  const formatCardNumber = (num: string) => {
    if (!num) return '•••• •••• •••• ••••';
    const formatted = num.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    return formatted || '•••• •••• •••• ••••';
  };

  return (
    <div 
      className="w-full max-w-[400px] mx-auto my-8 perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`
          card-container relative w-full pt-[56.25%] transition-all duration-500 transform-style-3d
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
        style={{
          transform: isFlipped 
            ? 'rotateY(180deg)' 
            : `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          transition: 'transform 0.5s ease'
        }}
        onMouseMove={!isFlipped ? handleMouseMove : undefined}
        onMouseLeave={handleMouseLeave}
      >
        {/* Front of card */}
        <div className={`
          absolute inset-0 rounded-2xl p-6 backface-hidden
          ${theme === 'light' 
            ? 'bg-gradient-to-br from-slate-100 to-slate-200 text-gray-800' 
            : 'bg-gradient-to-br from-gray-900 to-black text-white'}
          border border-white/20 shadow-xl
        `}>
          <div className="h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 opacity-80"></div>
              <div className="text-right">
                <p className="text-xs opacity-70 uppercase">{cardType || 'TARJETA'}</p>
              </div>
            </div>
            
            <div className="mt-auto">
              <p className="text-lg md:text-xl tracking-widest mb-4 font-mono">
                {formatCardNumber(cardNumber)}
              </p>
              
              <div className="flex justify-between items-end">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-xs opacity-70 mb-1">TITULAR</p>
                  <p className="font-medium text-sm md:text-base truncate uppercase">
                    {cardName || 'TU NOMBRE'}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs opacity-70 mb-1">VENCE</p>
                  <p className="font-medium text-sm md:text-base">{cardExpiry || 'MM/AA'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className={`
          absolute inset-0 rounded-2xl backface-hidden rotate-y-180
          ${theme === 'light' 
            ? 'bg-gradient-to-br from-slate-100 to-slate-200 text-gray-800' 
            : 'bg-gradient-to-br from-gray-900 to-black text-white'}
          border border-white/20 shadow-xl
        `}>
          <div className="h-full flex flex-col">
            <div className="w-full h-12 bg-gray-800 mt-6"></div>
            
            <div className="px-6 py-4">
              <div className="bg-gray-100 h-10 rounded flex items-center px-3">
                <div className="ml-auto bg-white/40 backdrop-blur px-3 py-1 rounded mr-3">
                  <span className="text-gray-800 font-mono tracking-wider text-sm">CVV</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto px-6 pb-6">
              <div className="flex justify-between items-end">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 opacity-80"></div>
                <p className="text-xs opacity-70 text-right">
                  Esta tarjeta es propiedad de CrediArg.<br />
                  Uso autorizado únicamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};