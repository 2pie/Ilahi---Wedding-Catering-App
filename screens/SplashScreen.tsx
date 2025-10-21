import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';
import WelcomeScreen from './WelcomeScreen';

const SplashScreen: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();
  const { events } = useOrder();

  useEffect(() => {
    const timer = setTimeout(() => {
      // If the user has existing events, they are a returning user.
      // Navigate them directly to their dashboard for a faster experience.
      if (events && events.length > 0) {
        navigate('/home', { replace: true });
      } else {
        // If they are a new user, show the full welcome screen.
        setShowWelcome(true);
      }
    }, 2000); // Splash animation duration

    return () => clearTimeout(timer);
  }, [events, navigate]);

  if (!showWelcome) {
    // Phase 1: Show the animated ILAHI logo.
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-transparent animate-fadeIn">
        <h1 className="text-7xl font-black text-creamy-white tracking-[1.5rem]">
          ILAHI
        </h1>
      </div>
    );
  }

  // Phase 2: Show the welcome content.
  return <WelcomeScreen />;
};

export default SplashScreen;