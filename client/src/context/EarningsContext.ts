import { createContext, useContext } from 'react';

// Define the type for the earnings data
export interface EarningsData {
  date: string;
  amount: number;
}

// Create the context
export const EarningsContext = createContext<EarningsData[]>([]);

// Custom hook to consume the context
export const useEarnings = () => useContext(EarningsContext);
