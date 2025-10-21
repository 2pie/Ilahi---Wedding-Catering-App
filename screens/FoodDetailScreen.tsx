import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from '../constants';
import { useOrder } from '../hooks/useOrder';
import ChiliIcon from '../components/icons/ChiliIcon';
import SugarIcon from '../components/icons/SugarIcon';
import type { MenuItem } from '../types';

const getPlaceholderText = (item: MenuItem): string => {
    switch (item.id) {
        // Veg
        case 3: // Paneer Tikka
            return "e.g., extra chutney, make it spicier, no onion";
        case 9: // Dal Makhani
            return "e.g., less butter, no cream, add ginger";
        case 10: // Malai Kofta
            return "e.g., less sweet gravy, garnish with coriander";
        case 1: // Aloo Tikki Chaat
            return "e.g., extra yogurt, make it tangy, no sev";
        // Non-Veg
        case 2: // Butter Chicken
            return "e.g., boneless pieces, make it spicy, less cream";
        case 6: // Mutton Biryani
            return "e.g., extra raita, more crispy onions, less oil";
        case 11: // Tandoori Fish Tikka
            return "e.g., add lemon wedge, no food color, well done";
        case 12: // Chicken Korma
            return "e.g., less nuts, more gravy, mild spice";
        // Beverages
        case 8: // Masala Chai
            return "e.g., strong ginger, less sugar, use almond milk";
        case 13: // Sweet Lassi
            return "e.g., add rose water, no sugar, make it thick";
        case 4: // Masala Shikanji
            return "e.g., extra mint, no black salt, more ice";
        // Desserts
        case 7: // Gulab Jamun
            return "e.g., serve warm, less syrup, garnish with almonds";
        case 5: // Ras Malai
            return "e.g., extra saffron, chilled, more pistachios";
        case 14: // Gajar ka Halwa
            return "e.g., without khoya, less ghee, add cashews";
        default:
            return "e.g., any special requests?";
    }
};

const FoodDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, updateCartItem, getActiveEvent } = useOrder();
  
  const isEditing = location.state?.isEditing || false;
  const existingItem = location.state?.existingItem;

  const activeEvent = getActiveEvent();
  const item = MENU_ITEMS.find(i => i.id === Number(id));

  const [customizationLevel, setCustomizationLevel] = useState(1);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isEditing && existingItem) {
      setCustomizationLevel(existingItem.customizationLevel || 1);
      setNote(existingItem.note || '');
    }
  }, [isEditing, existingItem]);

  if (!activeEvent) {
     return (
        <div className="p-6 text-center text-creamy-white">
            <p>Please select an event first.</p>
            <button onClick={() => navigate('/home')} className="mt-4 px-6 py-2 bg-earthy-gold text-dark-umber font-bold rounded-full transition-transform transform active:scale-95">Go to Home</button>
        </div>
     )
  }

  if (!item) {
    return <div className="p-6 text-center text-creamy-white">Item not found.</div>;
  }

  const handleAction = () => {
    if (isEditing) {
        updateCartItem(item.id, { customizationLevel, note });
        navigate('/cart');
    } else {
        addToCart(item, customizationLevel, note);
        navigate('/menu');
    }
  };

  const totalPrice = item.price * activeEvent.plates;

  const renderCustomizationControl = () => {
    if (!item.customization) return null;

    const icons = Array.from({ length: 5 }, (_, i) => i + 1).map(level => {
        if (item.customization?.type === 'spice') {
            return <ChiliIcon key={level} filled={level <= customizationLevel} onClick={() => setCustomizationLevel(level)} />;
        }
        if (item.customization?.type === 'sweetness') {
            return <SugarIcon key={level} filled={level <= customizationLevel} onClick={() => setCustomizationLevel(level)} />;
        }
        return null;
    });

    return (
        <div>
            <h2 className="font-bold text-lg mb-2">{item.customization.label}</h2>
            <div className="flex space-x-2">
                {icons}
            </div>
        </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 h-1/3 z-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-umber via-dark-umber/80 to-transparent"></div>
      </div>
      <div className="relative z-10 p-6 pt-32 text-creamy-white">
        <h1 className="text-5xl font-sans font-bold">{item.name}</h1>
        <p className="text-xl text-earthy-gold mt-2">₹{item.price} per plate</p>
        
        <div className="mt-8 space-y-6">
          <div>
            <h2 className="font-bold text-lg mb-2">Description</h2>
            <p className="text-creamy-white/80 text-sm">{item.description}</p>
          </div>
          
          {renderCustomizationControl()}

          <div>
            <h2 className="font-bold text-lg mb-2">Add a Note</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={getPlaceholderText(item)}
              className="w-full p-3 bg-muted-taupe/80 text-creamy-white rounded-lg border-2 border-transparent focus:border-earthy-gold focus:outline-none resize-none h-20"
            ></textarea>
          </div>

          <div className="pt-4">
            <p className="text-lg font-bold">Price summary</p>
            <p className="text-creamy-white/80">Total: <span className="text-earthy-gold text-2xl font-bold">₹{totalPrice.toLocaleString()}</span></p>
             <p className="text-xs text-muted-taupe">({activeEvent.plates} plates x ₹{item.price})</p>
          </div>

          <button
            onClick={handleAction}
            className="w-full mt-8 py-4 bg-earthy-gradient text-dark-umber font-bold rounded-2xl shadow-lg transition-transform transform active:scale-95"
          >
            {isEditing ? 'Update Item' : 'Add to List'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailScreen;