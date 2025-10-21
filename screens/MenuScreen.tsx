import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MENU_ITEMS } from '../constants';
import { useOrder } from '../hooks/useOrder';
import type { MenuItem } from '../types';
import EditIcon from '../components/icons/EditIcon';

const categories = ['All', 'Veg', 'Non-Veg', 'Beverages', 'Desserts'];

const MenuScreen: React.FC = () => {
  const navigate = useNavigate();
  const { getActiveEvent, getTotalPrice } = useOrder();
  const [activeCategory, setActiveCategory] = useState('All');

  const activeEvent = getActiveEvent();
  const totalPrice = getTotalPrice();
  const cartItemCount = activeEvent?.cart.length || 0;

  const filteredItems = activeCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);
    
  const handleItemClick = (item: MenuItem) => {
    navigate(`/menu/${item.id}`);
  };
  
  const handleEditEvent = () => {
    navigate('/create-event', { state: { isEditing: true } });
  };

  if (!activeEvent) {
     return (
        <div className="p-6 text-center text-creamy-white flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
            <p>Please create or select an event first.</p>
            <button onClick={() => navigate('/home')} className="mt-4 px-6 py-2 bg-earthy-gold text-dark-umber font-bold rounded-full transition-transform transform active:scale-95">Go to Home</button>
        </div>
     )
  }

  return (
    <div className="p-6 pb-24">
      <h1 className="text-5xl font-sans font-bold text-creamy-white mb-2">Choose Your Menu</h1>

      <div className="flex items-center mb-6 space-x-3">
        <p className="text-earthy-gold">For: {activeEvent.name}</p>
        <button onClick={handleEditEvent} className="text-earthy-gold hover:text-creamy-white transition-colors">
            <EditIcon />
        </button>
      </div>

      <div className="flex space-x-2 overflow-x-auto mb-4 hide-scrollbar">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${activeCategory === category ? 'bg-earthy-gold text-dark-umber' : 'bg-muted-taupe/80 text-creamy-white'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredItems.map(item => {
          const isInCart = activeEvent.cart.some(cartItem => cartItem.id === item.id);
          return (
            <div key={item.id} className="bg-muted-taupe/60 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <img src={item.image} alt={item.name} className="w-full h-24 object-cover" />
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-creamy-white font-bold text-sm flex-grow">{item.name}</h3>
                <p className="text-creamy-white/70 text-xs mt-1">₹{item.price} per plate</p>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`mt-3 w-full py-1.5 text-xs font-bold rounded-lg transition-all transform active:scale-95 ${
                    isInCart 
                      ? 'border border-earthy-gold text-earthy-gold' 
                      : 'bg-earthy-gradient text-dark-umber'
                  }`}
                >
                  {isInCart ? 'Added' : 'Add'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {cartItemCount > 0 && (
         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md mx-auto z-20">
            <button 
                onClick={() => navigate('/cart')}
                className="w-full flex justify-between items-center p-4 bg-earthy-gradient text-dark-umber font-bold rounded-2xl shadow-lg transition-transform transform active:scale-95"
            >
                <span>{cartItemCount} Item{cartItemCount > 1 ? 's' : ''} in List</span>
                <span>View List (₹{totalPrice.toLocaleString()})</span>
            </button>
         </div>
      )}
    </div>
  );
};

export default MenuScreen;