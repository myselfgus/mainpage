import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-transparent border-t border-black/5 mt-auto">
    <div className="container mx-auto px-5 py-10 text-center">
      <p className="text-text-secondary">
        &copy; {new Date().getFullYear()} Dr. Gustavo Mendes e Silva. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);