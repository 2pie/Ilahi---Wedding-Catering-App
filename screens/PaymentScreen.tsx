import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';

const PaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const { getActiveEvent, getTotalPrice, getAmountDue } = useOrder();
  const [paymentOption, setPaymentOption] = useState<'half' | 'full'>('full');
  
  const activeEvent = getActiveEvent();
  const isPaidEvent = activeEvent?.status === 'paid';
  const totalPrice = getTotalPrice();
  const additionalAmountDue = getAmountDue();

  const amountToPay = isPaidEvent 
    ? additionalAmountDue
    : (paymentOption === 'half' ? totalPrice / 2 : totalPrice);


  const handlePayment = () => {
    // Placeholder for payment logic
    console.log(`Processing payment of ₹${amountToPay}`);
    navigate('/confirmation');
  };
  
  const handleUpiPayment = () => {
    // Placeholder for UPI payment logic
    console.log(`Processing UPI payment of ₹${amountToPay}`);
    // This would typically open a UPI app or show a QR code
    alert("UPI Payment integration is in progress.");
  };


  return (
    <div className="p-6 flex flex-col h-screen">
      <h1 className="text-5xl font-sans font-bold text-creamy-white">Payment</h1>
      <p className="text-creamy-white/80 mt-2 mb-8">Secure your booking with our trusted vendor.</p>

      {!isPaidEvent && (
        <div className="space-y-4 mb-8">
          <div onClick={() => setPaymentOption('half')} className={`p-4 rounded-2xl border-2 cursor-pointer transition-colors ${paymentOption === 'half' ? 'border-earthy-gold bg-muted-taupe/60' : 'border-muted-taupe/50 bg-muted-taupe/30'}`}>
            <h3 className="text-creamy-white font-bold">Pay Half Now</h3>
            <p className="text-earthy-gold text-lg font-semibold">₹{(totalPrice / 2).toLocaleString()}</p>
            <p className="text-xs text-creamy-white/60 mt-1">Pay the rest on the event day.</p>
          </div>
          <div onClick={() => setPaymentOption('full')} className={`p-4 rounded-2xl border-2 cursor-pointer transition-colors ${paymentOption === 'full' ? 'border-earthy-gold bg-muted-taupe/60' : 'border-muted-taupe/50 bg-muted-taupe/30'}`}>
            <h3 className="text-creamy-white font-bold">Pay Full Amount</h3>
            <p className="text-earthy-gold text-lg font-semibold">₹{totalPrice.toLocaleString()}</p>
            <p className="text-xs text-creamy-white/60 mt-1">Settle the payment now and relax.</p>
          </div>
        </div>
      )}

      <div className="bg-muted-taupe/60 backdrop-blur-sm p-6 rounded-2xl space-y-4 flex-grow">
        <h2 className="text-creamy-white text-xl font-bold">Payment Details</h2>
        <div>
          <label className="text-creamy-white/80 text-sm">Card Number</label>
          <input type="text" placeholder="**** **** **** ****" className="w-full mt-1 p-2 bg-dark-slate/80 rounded-md text-creamy-white" />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="text-creamy-white/80 text-sm">Expiry</label>
            <input type="text" placeholder="MM/YY" className="w-full mt-1 p-2 bg-dark-slate/80 rounded-md text-creamy-white" />
          </div>
          <div className="flex-1">
            <label className="text-creamy-white/80 text-sm">CVV</label>
            <input type="text" placeholder="***" className="w-full mt-1 p-2 bg-dark-slate/80 rounded-md text-creamy-white" />
          </div>
        </div>
        <p className="text-center text-creamy-white/60 my-4">OR</p>
        <button onClick={handleUpiPayment} className="w-full py-3 bg-muted-taupe rounded-lg font-semibold transition-transform transform active:scale-95">Pay with UPI</button>
      </div>

      <button
        onClick={handlePayment}
        className="w-full mt-8 py-4 bg-earthy-gradient text-dark-umber font-bold rounded-2xl shadow-lg transition-transform transform active:scale-95"
      >
        Pay ₹{amountToPay.toLocaleString()}
      </button>
    </div>
  );
};

export default PaymentScreen;