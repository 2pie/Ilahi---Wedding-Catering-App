import { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import type { OrderContextType } from '../types';

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};