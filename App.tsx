import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MainContent } from './components/MainContent';
import { CitySelector } from './components/CitySelector';
import { ChatWidget } from './components/ChatWidget';
import { ChatIcon } from './components/Icons';
import type { Location } from './types';

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<Location | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-aurora animate-aurora -z-10 opacity-50"></div>
      {!selectedCity ? (
        <CitySelector onSelect={setSelectedCity} />
      ) : (
        <div className="flex flex-col min-h-screen animate-fadeIn bg-transparent">
          <Header onCityChange={() => setSelectedCity(null)} selectedCity={selectedCity} />
          <MainContent location={selectedCity} />
          <Footer />
        </div>
      )}
      
      {selectedCity && (
        <button
          className={`fixed bottom-8 right-8 w-16 h-16 rounded-full bg-glass-bg text-primary-accent flex items-center justify-center shadow-glass z-[1000] transition-all duration-300 backdrop-blur-lg border border-glass-border hover:shadow-glow hover:bg-white/60 ${isChatOpen ? 'rotate-90 scale-110' : 'rotate-0'}`}
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label={isChatOpen ? "Fechar chat" : "Abrir chat com assistente virtual"}
        >
          <ChatIcon />
        </button>
      )}
      <ChatWidget isVisible={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default App;