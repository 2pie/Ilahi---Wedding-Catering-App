import React, { useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';

import AppLayout from './components/AppLayout';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import MenuScreen from './screens/MenuScreen';
import FoodDetailScreen from './screens/FoodDetailScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import ProfileScreen from './screens/ProfileScreen';
import PastOrderScreen from './screens/PastOrderScreen';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // This effect now uses a ref to ensure its logic runs only once on initial app load.
    // If it's the first render and the app is on a deep link, it redirects to the root.
    // On subsequent navigations (e.g., from splash to home), the ref prevents the redirect from firing again.
    if (isInitialLoad.current && window.location.hash !== '' && window.location.hash !== '#/') {
      navigate('/', { replace: true });
    }
    isInitialLoad.current = false;
  }, [navigate]);

  return (
    <div 
      className="bg-dark-umber text-creamy-white font-sans min-h-screen w-full max-w-md mx-auto relative overflow-x-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1569032123930-18451b6a7c39?q=80&w=1887&auto=format&fit=crop)`}}
    >
      <div className="absolute inset-0 bg-dark-umber/80 backdrop-blur-xl"></div>
      <div className="relative z-10">
        <Routes>
          {/* Routes without the main header */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/confirmation" element={<ConfirmationScreen />} />
          <Route path="/past-order/:id" element={<PastOrderScreen />} />


          {/* Routes with the main AppLayout (Header) */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/create-event" element={<CreateEventScreen />} />
            <Route path="/menu" element={<MenuScreen />} />
            <Route path="/menu/:id" element={<FoodDetailScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <OrderProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </OrderProvider>
  );
};

export default App;