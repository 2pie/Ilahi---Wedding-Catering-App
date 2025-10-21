import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';
import EditIcon from '../components/icons/EditIcon';
import type { CartItem } from '../types';

const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const { getActiveEvent, removeFromCart, getTotalPrice } = useOrder();
  const activeEvent = getActiveEvent();

  if (!activeEvent) {
    return (
        <div className="p-6 flex-grow flex flex-col items-center justify-center text-center">
            <p className="text-creamy-white/70">Please select an event first.</p>
            <button onClick={() => navigate('/home')} className="mt-4 px-6 py-2 bg-earthy-gold text-dark-umber font-bold rounded-full transition-transform transform active:scale-95">
                Select Event
            </button>
        </div>
    );
  }

  const totalPrice = getTotalPrice();
  const isPaidEvent = activeEvent.status === 'paid';
  const amountDue = isPaidEvent ? totalPrice - (activeEvent.paidAmount || 0) : totalPrice;


  const handleProceed = () => {
    if (amountDue > 0) {
      navigate('/payment');
    } else {
      alert('Your menu has been updated!');
      navigate(`/past-order/${activeEvent.id}`);
    }
  };

  const handleEditItem = (item: CartItem) => {
    navigate(`/menu/${item.id}`, { 
        state: { 
            isEditing: true, 
            existingItem: item 
        } 
    });
  };

  const handleEditEvent = () => {
    navigate('/create-event', { state: { isEditing: true } });
  };

  const renderCustomization = (item: CartItem) => {
    if (!item.customization) return null;
    
    let levelText = '';
    const levels = item.customization.type === 'spice'
      ? ['Mild', 'Medium', 'Hot', 'Extra Hot', 'Fiery']
      : ['Less Sweet', 'Regular', 'Sweet', 'Extra Sweet', 'Dessert-like'];
      
    levelText = levels[item.customizationLevel - 1] || levels[1];

    return (
        <p className="text-creamy-white/80 text-sm">{item.customization.label}: <span className="font-semibold text-creamy-white">{levelText}</span></p>
    );
  }

  const categoryOrder = [
    'Vegetarian Starters',
    'Non-Vegetarian Starters',
    'Vegetarian Main Course',
    'Non-Vegetarian Main Course',
    'Vegetarian Snacks',
    'Non-Vegetarian Snacks',
    'Beverages',
    'Sweets',
  ];

  const groupedCart = activeEvent.cart.reduce<Record<string, CartItem[]>>((acc, item) => {
      const categoryName = item.category === 'Veg' ? 'Vegetarian' : item.category === 'Non-Veg' ? 'Non-Vegetarian' : item.category;
      let key = '';

      if (item.course === 'Starter') {
          key = `${categoryName} Starters`;
      } else if (item.course === 'Main Course') {
          key = `${categoryName} Main Course`;
      } else if (item.course === 'Snack') {
          key = `${categoryName} Snacks`;
      } else if (item.category === 'Desserts') {
          key = 'Sweets';
      } else if (item.category === 'Beverages') {
          key = 'Beverages';
      }

      if (key) {
           if (!acc[key]) acc[key] = [];
           acc[key].push(item);
      }
      
      return acc;
  }, {});

  return (
    <div className="p-6 pb-24 flex flex-col h-full min-h-screen">
      <h1 className="text-5xl font-sans font-bold text-creamy-white mb-1">Catering Summary</h1>
      <div className="flex items-center mb-6 space-x-3">
        <p className="text-earthy-gold">For: {activeEvent.name}</p>
        <button onClick={handleEditEvent} className="text-earthy-gold hover:text-creamy-white transition-colors">
            <EditIcon />
        </button>
      </div>

      
      {activeEvent.cart.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
            <p className="text-creamy-white/70">Your list is empty.</p>
            <button onClick={() => navigate('/menu')} className="mt-4 px-6 py-2 bg-earthy-gold text-dark-umber font-bold rounded-full transition-transform transform active:scale-95">
                Browse Menu
            </button>
        </div>
      ) : (
        <div className="flex-grow">
          {categoryOrder.map(category => (
            groupedCart[category] && (
              <div key={category}>
                <h2 className="text-xl font-bold text-earthy-gold mt-6 mb-3">{category}</h2>
                <div className="space-y-4">
                  {groupedCart[category].map(item => (
                    <div key={item.id} className="bg-muted-taupe/60 p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-grow cursor-pointer" onClick={() => handleEditItem(item)}>
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-grow">
                          <h3 className="text-creamy-white font-bold">{item.name}</h3>
                          {renderCustomization(item)}
                          <p className="text-earthy-gold font-semibold">Total: ₹{(item.price * activeEvent.plates).toLocaleString()}</p>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400 pl-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}
      
      {activeEvent.cart.length > 0 && (
        <div className="mt-8">
          <button
              onClick={() => navigate('/menu')}
              className="w-full py-3 mb-6 border-2 border-muted-taupe text-creamy-white font-semibold rounded-2xl transition-colors hover:bg-muted-taupe/60 active:scale-95"
          >
              + Add / Edit Menu
          </button>
          <div className="border-t border-muted-taupe pt-4">
            {isPaidEvent && (
              <>
                <div className="flex justify-between items-center text-creamy-white mb-1">
                  <span className="text-lg">Updated Total</span>
                  <span className="text-xl font-semibold text-creamy-white">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-creamy-white/80 mb-2">
                  <span className="text-lg">Already Paid</span>
                  <span className="text-xl font-semibold">- ₹{activeEvent.paidAmount?.toLocaleString()}</span>
                </div>
              </>
            )}
            <div className="flex justify-between items-center text-creamy-white mb-6">
              <span className="text-xl">{isPaidEvent ? 'Amount Due' : 'Grand Total'}</span>
              <span className="text-2xl font-bold text-earthy-gold">₹{amountDue > 0 ? amountDue.toLocaleString() : '0'}</span>
            </div>
            <button
              onClick={handleProceed}
              className="w-full py-4 bg-earthy-gradient text-dark-umber font-bold rounded-2xl shadow-lg transition-transform transform active:scale-95"
            >
              {isPaidEvent 
                ? (amountDue > 0 ? `Pay Difference: ₹${amountDue.toLocaleString()}` : 'Confirm Changes') 
                : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;