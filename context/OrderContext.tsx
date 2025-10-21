import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { OrderContextType, MenuItem, CartItem, Event } from '../types';

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

const initialEvents: Event[] = [];

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem('ilahi-events');
    return savedEvents ? JSON.parse(savedEvents) : initialEvents;
  });
  const [activeEventId, setActiveEventId] = useState<string | null>(() => {
     const savedActiveId = localStorage.getItem('ilahi-activeEventId');
     return savedActiveId ? JSON.parse(savedActiveId) : null;
  });
  
  useEffect(() => {
    localStorage.setItem('ilahi-events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('ilahi-activeEventId', JSON.stringify(activeEventId));
  }, [activeEventId]);

  const getActiveEvent = useCallback(() => {
    return events.find(e => e.id === activeEventId);
  }, [events, activeEventId]);

  const addEvent = useCallback((newEventData: Omit<Event, 'id' | 'cart' | 'status' | 'paidAmount'>) => {
    const newEvent: Event = {
      ...newEventData,
      id: Date.now().toString(),
      cart: [],
      status: 'planning',
    };
    setEvents(prev => [...prev, newEvent]);
    setActiveEventId(newEvent.id);
  }, []);
  
  const updateEvent = useCallback((updates: Omit<Event, 'id' | 'cart' | 'status' | 'paidAmount'>) => {
    if (!activeEventId) return;
    setEvents(prev =>
      prev.map(event =>
        event.id === activeEventId ? { ...event, ...updates } : event
      )
    );
  }, [activeEventId]);

  const modifyActiveEvent = (updater: (event: Event) => Event) => {
    if (!activeEventId) return;
    setEvents(prev =>
      prev.map(event =>
        event.id === activeEventId ? updater(event) : event
      )
    );
  };
  
  const addToCart = useCallback((item: MenuItem, customizationLevel: number, note: string) => {
    modifyActiveEvent(event => {
      const existingItem = event.cart.find(cartItem => cartItem.id === item.id);
      let newCart;
      if (existingItem) {
        newCart = event.cart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1, customizationLevel, note }
            : cartItem
        );
      } else {
        newCart = [...event.cart, { ...item, quantity: 1, customizationLevel, note }];
      }
      return { ...event, cart: newCart };
    });
  }, [activeEventId]);

  const removeFromCart = useCallback((itemId: number) => {
    modifyActiveEvent(event => ({
      ...event,
      cart: event.cart.filter(item => item.id !== itemId),
    }));
  }, [activeEventId]);

  const updateCartItem = useCallback((itemId: number, updates: Partial<CartItem>) => {
     modifyActiveEvent(event => ({
      ...event,
      cart: event.cart.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      ),
    }));
  }, [activeEventId]);

  const confirmPaymentForActiveEvent = useCallback(() => {
    if (!activeEventId) return;
    const activeEvent = getActiveEvent();
    if (!activeEvent) return;

    const currentTotal = activeEvent.cart.reduce((total, item) => total + item.price * activeEvent.plates, 0);

    setEvents(prev =>
      prev.map(event =>
        event.id === activeEventId 
          ? { 
              ...event, 
              status: 'paid' as const,
              paidAmount: currentTotal 
            } 
          : event
      )
    );
    setActiveEventId(null);
  }, [activeEventId, getActiveEvent]);


  const getTotalPrice = useCallback(() => {
    const activeEvent = getActiveEvent();
    if (!activeEvent) return 0;
    return activeEvent.cart.reduce((total, item) => total + item.price * activeEvent.plates, 0);
  }, [getActiveEvent]);

  const getAmountDue = useCallback(() => {
    const activeEvent = getActiveEvent();
    if (!activeEvent) return 0;
    const currentTotal = activeEvent.cart.reduce((total, item) => total + item.price * activeEvent.plates, 0);
    const amountDue = currentTotal - (activeEvent.paidAmount || 0);
    return amountDue > 0 ? amountDue : 0;
  }, [getActiveEvent]);

  const value = {
    events,
    activeEventId,
    setActiveEventId,
    addEvent,
    getActiveEvent,
    addToCart,
    removeFromCart,
    updateCartItem,
    confirmPaymentForActiveEvent,
    getTotalPrice,
    getAmountDue,
    updateEvent,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};