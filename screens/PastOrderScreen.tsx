import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';
import BackIcon from '../components/icons/BackIcon';
import type { CartItem } from '../types';

const PastOrderScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, setActiveEventId } = useOrder();

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="p-6 text-center text-creamy-white flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-sans font-bold">Order not found.</h1>
        <button onClick={() => navigate('/home')} className="mt-4 px-6 py-2 bg-earthy-gold text-dark-umber font-bold rounded-full transition-transform transform active:scale-95">Go to Dashboard</button>
      </div>
    );
  }
  
  const totalPrice = event.cart.reduce((total, item) => total + item.price * event.plates, 0);
  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isFinished = eventDate < today;

  const handleEditMenu = () => {
    setActiveEventId(event.id);
    navigate('/menu');
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
    'Vegetarian Starters', 'Non-Vegetarian Starters',
    'Vegetarian Main Course', 'Non-Vegetarian Main Course',
    'Vegetarian Snacks', 'Non-Vegetarian Snacks',
    'Beverages', 'Sweets',
  ];

  const groupedCart = event.cart.reduce<Record<string, CartItem[]>>((acc, item) => {
    const categoryName = item.category === 'Veg' ? 'Vegetarian' : item.category === 'Non-Veg' ? 'Non-Vegetarian' : item.category;
    let key = '';

    if (item.course === 'Starter') key = `${categoryName} Starters`;
    else if (item.course === 'Main Course') key = `${categoryName} Main Course`;
    else if (item.course === 'Snack') key = `${categoryName} Snacks`;
    else if (item.category === 'Desserts') key = 'Sweets';
    else if (item.category === 'Beverages') key = 'Beverages';

    if (key) {
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
    }
    return acc;
  }, {});


  return (
    <div className="p-6 pb-24 flex flex-col h-full min-h-screen">
       <header className="fixed top-0 left-0 right-0 max-w-md mx-auto h-20 bg-dark-umber/80 backdrop-blur-sm flex items-center px-6 z-50">
          <button onClick={() => navigate(-1)} className="text-creamy-white hover:text-earthy-gold transition-colors">
            <BackIcon />
          </button>
          <h1 className="text-xl font-bold text-creamy-white text-center flex-grow -ml-7">Order Details</h1>
      </header>
      
      <main className="pt-20">
          <div className="bg-muted-taupe/60 p-4 rounded-2xl mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-xl text-creamy-white">{event.name}</h2>
                 <span className={`px-3 py-1 text-sm font-semibold rounded-full text-white ${isFinished ? 'bg-muted-taupe' : 'bg-green-600'}`}>
                    {isFinished ? 'Finished' : 'Ongoing'}
                </span>
              </div>
              <p className="text-md text-creamy-white/80">{event.eventType}</p>
              <div className="border-t border-muted-taupe/50 my-2"></div>
              <div className="flex justify-between text-sm">
                  <p className="text-creamy-white/80">Date: <span className="font-semibold text-creamy-white">{event.date}</span></p>
                  <p className="text-creamy-white/80">Plates: <span className="font-semibold text-creamy-white">{event.plates}</span></p>
              </div>
          </div>

          <div className="flex-grow">
          {categoryOrder.map(category => (
            groupedCart[category] && (
              <div key={category}>
                <h2 className="text-xl font-bold text-earthy-gold mt-6 mb-3">{category}</h2>
                <div className="space-y-4">
                  {groupedCart[category].map(item => (
                    <div key={item.id} className="bg-muted-taupe/60 p-4 rounded-2xl flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-grow">
                          <h3 className="text-creamy-white font-bold">{item.name}</h3>
                          {renderCustomization(item)}
                          <p className="text-earthy-gold font-semibold">Total: ₹{(item.price * event.plates).toLocaleString()}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
          </div>
          
          <div className="mt-8 border-t border-muted-taupe pt-4">
              <div className="flex justify-between items-center text-creamy-white">
                <span className="text-xl">Grand Total Paid</span>
                <span className="text-2xl font-bold text-earthy-gold">₹{event.paidAmount?.toLocaleString() ?? totalPrice.toLocaleString()}</span>
              </div>
          </div>

          {!isFinished && (
            <div className="mt-6">
                <button
                    onClick={handleEditMenu}
                    className="w-full py-4 bg-earthy-gradient text-dark-umber font-bold rounded-2xl shadow-lg transition-transform transform active:scale-95"
                >
                    Edit Menu
                </button>
            </div>
          )}
      </main>
    </div>
  );
};

export default PastOrderScreen;