import React from 'react';

interface HomePageProps {
  onNavigate: (sectionId: string) => void;
}

const SpecialtyCard: React.FC<{ title: string; description: string; gradient: string }> = ({ title, description, gradient }) => (
    <div className="bg-card-background rounded-2xl border border-border-color shadow-subtle hover:shadow-medium hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-fadeInUp">
        <div className={`h-40 ${gradient}`}></div>
        <div className="p-6">
            <h3 className="font-heading text-2xl font-semibold text-text-primary mb-2">{title}</h3>
            <p>{description}</p>
        </div>
    </div>
);

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <>
      <section className="hero bg-background-alt text-center py-32 bg-[radial-gradient(circle_at_1%_1%,_rgba(200,200,255,0.1)_0%,_transparent_50%)]">
        <div className="container mx-auto px-5">
          <h1 className="font-heading text-6xl md:text-7xl font-semibold text-text-primary leading-tight mb-6" style={{textShadow: 'var(--shadow-lifted-text)'}}>
            Psiquiatria potencializada por IA
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10">
            Tratamentos personalizados para TDAH, TEA, ansiedade e depressão que unem rigor científico, IA avançada e escuta empática.
          </p>
          <div className="flex justify-center gap-6 flex-col sm:flex-row">
            <button className="btn-primary" onClick={() => onNavigate('guarulhos')}>
              Agendar consulta
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('guarulhos')}>
              Conheça o método
            </button>
          </div>
        </div>
      </section>

      <section className="specialties py-24">
        <div className="container mx-auto px-5">
          <h2 className="section-title">Nossas Especialidades</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SpecialtyCard 
                title="TDAH" 
                description="Diagnóstico e tratamento do Transtorno de Déficit de Atenção e Hiperatividade."
                gradient="bg-gradient-to-br from-pink-200 to-blue-200"
            />
            <SpecialtyCard 
                title="TEA" 
                description="Apoio e manejo para pessoas no Espectro Autista, com foco na qualidade de vida."
                gradient="bg-gradient-to-br from-yellow-200 to-red-300"
            />
             <SpecialtyCard 
                title="Ansiedade" 
                description="Estratégias personalizadas para gerenciar e superar os transtornos de ansiedade."
                gradient="bg-gradient-to-br from-cyan-200 to-indigo-300"
            />
            <SpecialtyCard 
                title="Depressão" 
                description="Cuidado integral para o tratamento da depressão, buscando a remissão dos sintomas."
                gradient="bg-gradient-to-br from-rose-200 to-purple-300"
            />
          </div>
        </div>
      </section>
    </>
  );
};

const CtaButton: React.FC<{ children: React.ReactNode, onClick: () => void, primary?: boolean }> = ({ children, onClick, primary = false }) => {
    const baseClasses = "font-body text-base font-medium py-3.5 px-8 rounded-lg cursor-pointer transition-all duration-300 inline-block no-underline";
    const primaryClasses = "bg-primary-accent text-white hover:bg-primary-accent-hover hover:-translate-y-0.5";
    const secondaryClasses = "bg-background text-text-secondary border border-border-color hover:text-text-primary hover:border-text-primary hover:-translate-y-0.5";

    return (
        <button onClick={onClick} className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`}>
            {children}
        </button>
    );
};
