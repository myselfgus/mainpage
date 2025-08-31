import React, { useState } from 'react';
import { locationData } from '../constants';
import type { Location } from '../types';

interface CitySelectorProps {
  onSelect: (location: Location) => void;
}

export const CitySelector: React.FC<CitySelectorProps> = ({ onSelect }) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleSelect = (location: Location) => {
        setIsExiting(true);
        setTimeout(() => {
            onSelect(location);
        }, 500); // duration of fadeOut animation
    };

    return (
        <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 bg-transparent ${isExiting ? 'animate-fadeOut' : 'animate-fadeIn'}`}
        style={{ WebkitBackfaceVisibility: 'hidden', MozBackfaceVisibility: 'hidden', transform: 'translate3d(0, 0, 0)'}} // GPU acceleration hint
        >
            <div className="text-center mb-12">
                 <h1 className="font-heading text-5xl md:text-6xl font-semibold text-text-primary leading-tight mb-4" style={{textShadow: '0 4px 20px rgba(0,0,0,0.1)'}}>
                    Bem-vindo
                 </h1>
                 <p className="text-lg max-w-xl mx-auto text-text-secondary">
                    Selecione a sua cidade para um atendimento personalizado.
                 </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                {Object.values(locationData).map((location) => (
                    <button
                        key={location.id}
                        onClick={() => handleSelect(location)}
                        className="group w-72 h-80 rounded-3xl p-8 flex flex-col justify-end text-left relative overflow-hidden transition-all duration-500 bg-glass-bg backdrop-blur-2xl border border-glass-border shadow-glass shadow-glass-inset hover:shadow-glow hover:-translate-y-2 hover:border-white"
                    >
                        <div className={`absolute -inset-16 opacity-10 group-hover:opacity-20 transition-opacity duration-500 ${location.id === 'guarulhos' ? 'bg-gradient-to-br from-pink-400 to-blue-400' : 'bg-gradient-to-br from-yellow-400 to-red-400'}`}></div>
                        <div className="relative z-10">
                             <h2 className="font-heading text-4xl font-semibold text-text-primary mb-2" style={{textShadow: '0 2px 10px rgba(0,0,0,0.2)'}}>{location.name}</h2>
                             <p className="font-body text-text-secondary">Atendimento para {location.serviceArea}.</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}