import React from 'react';
import type { Location } from '../types';
import { MicIcon, RhythmIcon, DocIcon } from './Icons';
import { AnimatedSection } from './AnimatedSection';

interface MainContentProps {
  location: Location;
}

const SpecialtyCard: React.FC<{ title: string; description: string; gradient: string }> = ({ title, description, gradient }) => (
    <div className="bg-surface-solid rounded-2xl border border-black/5 shadow-subtle hover:shadow-medium hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <div className={`h-2 ${gradient}`}></div>
        <div className="p-6">
            <h3 className="font-heading text-2xl font-semibold text-text-primary mb-2">{title}</h3>
            <p className="text-text-secondary">{description}</p>
        </div>
    </div>
);

const TimelineItem: React.FC<{ icon: React.ReactNode, title: string, description: string, colorClass: string }> = ({ icon, title, description, colorClass }) => (
  <div className="flex items-start gap-6 group">
    <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-glass-bg/80 backdrop-blur-lg border border-glass-border shadow-glass shadow-glass-inset z-10 transition-all duration-300 group-hover:shadow-glow group-hover:border-white/80 ${colorClass}`}>
      {icon}
    </div>
    <div className="bg-surface-solid p-6 rounded-xl border border-black/5 flex-grow shadow-subtle">
      <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  </div>
);

export const MainContent: React.FC<MainContentProps> = ({ location }) => {
    const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = document.querySelector('header')?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <main>
      <AnimatedSection
        id="top"
        className="location-hero py-28"
        staggerIndex={0}
      >
        <div className="container mx-auto px-5 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-primary-accent/10 to-pink-500/10 rounded-full blur-3xl opacity-70 animate-aurora [animation-duration:20s]"></div>
           <div className="relative z-10 p-8 md:p-12 bg-glass-bg/80 backdrop-blur-2xl border border-glass-border-darker rounded-2xl text-center shadow-glass shadow-glass-inset">
            <h1 className="font-heading text-5xl md:text-6xl font-semibold text-text-primary leading-tight mb-6" style={{ textShadow: 'var(--lifted-text)' }}>
                Atendimento em {location.name}
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-text-secondary mb-8">
                Cuidado psiquiátrico online, moderno e humano, disponível para {location.serviceArea}.
            </p>
            <button 
                onClick={() => handleScrollTo('contact')}
                className="font-body text-base font-medium py-3.5 px-8 rounded-lg cursor-pointer transition-all duration-300 inline-block no-underline bg-primary-accent text-white shadow-medium hover:bg-primary-accent-hover hover:shadow-glow hover:-translate-y-1"
            >
                Agendar Consulta
            </button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        id="specialties"
        className="specialties py-24"
        staggerIndex={1}
      >
        <div className="container mx-auto px-5">
          <h2 className="text-center font-heading text-4xl font-semibold text-text-primary mb-12">Nossas Especialidades</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SpecialtyCard 
                title="TDAH" 
                description="Diagnóstico e tratamento do Transtorno de Déficit de Atenção e Hiperatividade."
                gradient="bg-gradient-to-r from-pink-500 to-blue-500"
            />
            <SpecialtyCard 
                title="TEA" 
                description="Apoio e manejo para pessoas no Espectro Autista, com foco na qualidade de vida."
                gradient="bg-gradient-to-r from-yellow-500 to-red-500"
            />
             <SpecialtyCard 
                title="Ansiedade" 
                description="Estratégias personalizadas para gerenciar e superar os transtornos de ansiedade."
                gradient="bg-gradient-to-r from-cyan-500 to-indigo-500"
            />
            <SpecialtyCard 
                title="Depressão" 
                description="Cuidado integral para o tratamento da depressão, buscando a remissão dos sintomas."
                gradient="bg-gradient-to-r from-rose-500 to-purple-500"
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        id="method"
        className="how-it-works py-24"
        staggerIndex={2}
      >
        <div className="container mx-auto px-5">
          <h2 className="text-center font-heading text-4xl font-semibold text-text-primary mb-16">Uma Nova Abordagem de Cuidado</h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-black/10" aria-hidden="true"></div>
            <div className="space-y-10">
              <TimelineItem 
                icon={<MicIcon />} 
                title="Você Fala." 
                description="Sessões de 2 horas com escuta ativa em um espaço seguro e sem julgamentos para você compartilhar sua história."
                colorClass="text-pink-500"
              />
              <TimelineItem 
                icon={<RhythmIcon />} 
                title="Análise e Ritmo." 
                description="Utilizamos tecnologia de IA para identificar padrões comportamentais e otimizar o tratamento de forma contínua."
                colorClass="text-purple-500"
              />
              <TimelineItem 
                icon={<DocIcon />} 
                title="Tratamento e Tradução." 
                description="Criamos um plano personalizado e uma documentação narrativa, um registro detalhado da sua jornada, construído em conjunto."
                colorClass="text-blue-500"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        id="contact"
        className="contact py-24"
        staggerIndex={3}
      >
        <div className="container mx-auto px-5">
          <h2 className="text-center font-heading text-4xl font-semibold text-text-primary mb-12">Entre em contato</h2>
          <div className="max-w-2xl mx-auto p-8 md:p-12 bg-glass-bg/80 backdrop-blur-2xl border border-glass-border-darker rounded-2xl text-center shadow-glass shadow-glass-inset">
            <h3 className="font-heading text-3xl font-semibold text-text-primary mb-4">Agende sua consulta online</h3>
            <p className="text-lg mb-6 text-text-secondary">Consultas online para {location.serviceArea}.</p>
            <p className="mb-8 text-lg text-text-secondary">
              <strong>WhatsApp:</strong>{" "}
              <a href={location.whatsappLink} className="font-accent font-medium text-text-primary hover:text-primary-accent" target="_blank" rel="noopener noreferrer">
                {location.whatsapp}
              </a>
            </p>
            <a href={location.whatsappLink} className="font-body text-base font-medium py-3.5 px-8 rounded-lg cursor-pointer transition-all duration-300 inline-block no-underline bg-primary-accent text-white shadow-medium hover:bg-primary-accent-hover hover:shadow-glow hover:-translate-y-1" target="_blank" rel="noopener noreferrer">
              Contatar via WhatsApp
            </a>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};