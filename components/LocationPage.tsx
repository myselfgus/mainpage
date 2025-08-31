import React from 'react';
import type { Location } from '../types';
import { MicIcon, RhythmIcon, DocIcon } from './Icons';

interface LocationPageProps {
  location: Location;
}

const TimelineItem: React.FC<{ icon: React.ReactNode, title: string, description: string, colorClass: string }> = ({ icon, title, description, colorClass }) => (
  <div className="flex items-start gap-6 animate-fadeInUp">
    <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-white border-4 border-background-alt shadow-subtle z-10 ${colorClass}`}>
      {icon}
    </div>
    <div className="bg-card-background p-6 rounded-xl border border-border-color flex-grow">
      <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

export const LocationPage: React.FC<LocationPageProps> = ({ location }) => {
  return (
    <div id={location.id}>
      <section className="location-hero bg-background-alt text-center py-28 bg-[radial-gradient(circle_at_99%_1%,_rgba(200,200,255,0.1)_0%,_transparent_50%)]">
        <div className="container mx-auto px-5">
          <h1 className="font-heading text-5xl md:text-6xl font-semibold text-text-primary leading-tight mb-6" style={{ textShadow: 'var(--shadow-lifted-text)' }}>
            Atendimento em {location.name}
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Cuidado psiquiátrico online, moderno e humano, disponível para {location.serviceArea}.
          </p>
        </div>
      </section>

      <section className="how-it-works bg-background-alt py-24">
        <div className="container mx-auto px-5">
          <h2 className="section-title">Uma Nova Abordagem de Cuidado</h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border-color" aria-hidden="true"></div>
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
                colorClass="text-purple-600"
              />
              <TimelineItem 
                icon={<DocIcon />} 
                title="Tratamento e Tradução." 
                description="Criamos um plano personalizado e uma documentação narrativa, um registro detalhado da sua jornada, construído em conjunto."
                colorClass="text-blue-600"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="contact py-24">
        <div className="container mx-auto px-5">
          <h2 className="section-title">Entre em contato</h2>
          <div className="max-w-2xl mx-auto p-8 md:p-12 bg-card-background rounded-2xl border border-border-color text-center shadow-medium animate-fadeInUp">
            <h3 className="font-heading text-3xl font-semibold text-text-primary mb-4">Agende sua consulta online</h3>
            <p className="text-lg mb-6">Consultas online para {location.serviceArea}.</p>
            <p className="mb-8 text-lg">
              <strong>WhatsApp:</strong>{" "}
              <a href={location.whatsappLink} className="font-accent font-medium text-text-primary hover:text-primary-accent" target="_blank" rel="noopener noreferrer">
                {location.whatsapp}
              </a>
            </p>
            <a href={location.whatsappLink} className="btn-primary" target="_blank" rel="noopener noreferrer">
              Contatar via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
