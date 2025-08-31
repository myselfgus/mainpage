import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  staggerIndex?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, id, staggerIndex = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const style = isVisible ? { animationDelay: `${staggerIndex * 150}ms` } : {};

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${className} ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
      style={style}
    >
      {children}
    </section>
  );
};
