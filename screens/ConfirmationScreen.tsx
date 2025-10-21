import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';

const ConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { getActiveEvent, getTotalPrice, confirmPaymentForActiveEvent } = useOrder();
  const activeEvent = getActiveEvent();

  const handleBackHome = () => {
    confirmPaymentForActiveEvent();
    navigate('/home');
  };
  
  if (!activeEvent) {
    return (
        <div className="p-8 flex flex-col justify-center items-center h-screen text-center">
             <h1 className="text-3xl font-sans font-bold text-creamy-white">No active event found.</h1>
              <button
                onClick={() => navigate('/home')}
                className="mt-8 w-full max-w-sm py-4 bg-earthy-gradient text-dark-umber font-bold rounded-2xl shadow-lg transition-transform transform active:scale-95"
              >
                Go to Home
              </button>
        </div>
    )
  }

  return (
    <div className="p-8 flex flex-col justify-between items-center h-screen text-center">
      <div></div>
      <div>
        <div className="w-24 h-24 rounded-full bg-earthy-gold flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3D2C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h1 className="text-4xl font-sans font-bold text-creamy-white">Thank you for choosing ILAHI!</h1>
        <p className="text-md text-creamy-white/80 mt-4">Congratulations! Your booking is confirmed, and our team is ready to make your celebration unforgettable.</p>
        
        <div className="bg-muted-taupe/60 text-left p-4 rounded-2xl mt-8 w-full max-w-sm mx-auto">
          <p className="text-creamy-white/80"><strong>Event Name:</strong> <span className="text-creamy-white">{activeEvent.name}</span></p>
          <p className="text-creamy-white/80"><strong>Event Type:</strong> <span className="text-creamy-white">{activeEvent.eventType}</span></p>
          <p className="text-creamy-white/80"><strong>Date:</strong> <span className="text-creamy-white">{activeEvent.date}</span></p>
          <p className="text-creamy-white/80"><strong>Plates:</strong> <span className="text-creamy-white">{activeEvent.plates}</span></p>
          <p className="text-creamy-white/80"><strong>Total Amount:</strong> <span className="text-earthy-gold font-bold">₹{getTotalPrice().toLocaleString()}</span></p>
        </div>
      </div>
      
      <button
        onClick={handleBackHome}
        className="w-full py-4 bg-earthy-gradient text-dark-umber font-bold rounded-2xl shadow-lg transition-transform transform active:scale-95"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ConfirmationScreen;