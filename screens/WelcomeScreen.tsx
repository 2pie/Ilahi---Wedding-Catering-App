import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 flex flex-col justify-between h-screen text-center">
        <div>
            <h2 className="text-3xl font-sans font-black tracking-wider text-creamy-white/50">ILAHI</h2>
        </div>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-sans font-bold text-creamy-white">Plan Your Perfect Buffet</h1>
        <p className="text-lg text-creamy-white/80 mt-4 font-sans">
          Create events, choose your favorite dishes, and let us handle the rest.
        </p>
      </div>
      <button
        onClick={() => navigate('/home')}
        className="w-full py-4 bg-earthy-gradient text-dark-umber font-bold rounded-2xl shadow-lg transition-transform transform hover:scale-105 active:scale-95"
      >
        Get Started
      </button>
    </div>
  );
};

export default WelcomeScreen;