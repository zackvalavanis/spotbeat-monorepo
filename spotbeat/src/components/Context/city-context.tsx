// src/context/CityContext.ts
import { createContext } from 'react';

export interface CityContextType {
  city: string;
  setCity: (city: string) => void;
}

// Only export the context here, no components
export const CityContext = createContext<CityContextType | undefined>(undefined);
