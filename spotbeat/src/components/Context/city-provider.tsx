// src/context/CityProvider.tsx
import { useState, useEffect } from 'react';
import { CityContext } from './city-context';
import type { ReactNode } from 'react';

export function CityProvider({ children, defaultCity }: { children: ReactNode; defaultCity?: string }) {
  const [city, setCity] = useState(() => {
    // first check localStorage, fallback to defaultCity
    return localStorage.getItem('city') || defaultCity || 'Chicago';
  });

  useEffect(() => {
    // store every update in localStorage
    localStorage.setItem('city', city);
  }, [city]);

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
}
