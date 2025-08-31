import React, { useState } from 'react';
import { MenuIcon, CloseIcon } from './Icons';
import type { Location } from '../types';

interface HeaderProps {
  selectedCity: Location;
  onCityChange: () => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedCity, onCityChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = document.querySelector('header')?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  
  const navLinks = [
      { id: 'specialties', label: 'Especialidades' },
      { id: 'method', label: 'O Método' },
      { id: 'contact', label: 'Contato' },
  ];

  const NavButtons: React.FC<{isMobile?: boolean}> = ({ isMobile = false }) => (
    <>
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleScrollTo(link.id)}
            className={`font-body font-medium transition-colors duration-300 ${isMobile ? 'text-lg w-full py-4 text-text-secondary' : 'text-base text-text-secondary hover:text-text-primary'}`}
          >
            {link.label}
          </button>
        ))}
        <button onClick={onCityChange} className={`font-body font-medium transition-colors duration-300 ${isMobile ? 'text-lg w-full py-4 text-primary-accent' : 'text-base text-primary-accent hover:text-primary-accent-hover'}`}>
            Trocar Cidade
        </button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-glass-bg/80 backdrop-blur-xl border-b border-glass-border-darker shadow-glass-inset">
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center py-5">
          <div
            className="font-heading font-semibold text-xl text-text-primary cursor-pointer"
            onClick={() => handleScrollTo('top')}
            aria-label="Voltar para o topo da página"
          >
            Dr. Gustavo Mendes e Silva <span className="font-normal text-text-secondary hidden sm:inline">| {selectedCity.name}</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <NavButtons />
          </nav>
          <button
            className="md:hidden z-50 text-text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        {isMenuOpen && (
           <nav className="md:hidden absolute top-full left-0 right-0 bg-glass-bg/95 backdrop-blur-xl border-b border-glass-border-darker shadow-glass flex flex-col items-center py-4 transition-transform duration-300 ease-in-out transform">
             <NavButtons isMobile />
          </nav>
        )}
      </div>
    </header>
  );
};