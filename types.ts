import type { Dispatch, SetStateAction } from 'react';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'Veg' | 'Non-Veg' | 'Beverages' | 'Desserts';
  course?: 'Starter' | 'Main Course' | 'Snack';
  customization?: {
    type: 'spice' | 'sweetness';
    label: string;
  };
}

export interface CartItem extends MenuItem {
  quantity: number;
  customizationLevel: number;
  note: string;
}

export interface Event {
  id: string;
  name:string;
  eventType: string;
  plates: number;
  date: string;
  cart: CartItem[];
  status: 'planning' | 'paid';
  paidAmount?: number;
}

export interface OrderContextType {
  events: Event[];
  activeEventId: string | null;
  setActiveEventId: Dispatch<SetStateAction<string | null>>;
  addEvent: (newEventData: Omit<Event, 'id' | 'cart' | 'status'>) => void;
  getActiveEvent: () => Event | undefined;
  addToCart: (item: MenuItem, customizationLevel: number, note: string) => void;
  removeFromCart: (itemId: number) => void;
  updateCartItem: (itemId: number, updates: Partial<CartItem>) => void;
  confirmPaymentForActiveEvent: () => void;
  getTotalPrice: () => number;
  getAmountDue: () => number;
  updateEvent: (updates: Omit<Event, 'id' | 'cart' | 'status' | 'paidAmount'>) => void;
}