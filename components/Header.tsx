import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProfileIcon from './icons/ProfileIcon';
import BackIcon from './icons/BackIcon';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showBackButton = location.pathname !== '/home' && location.pathname !== '/profile';

  const handleBack = () => {
    // This regex matches item detail routes like /menu/1, /menu/12, etc.
    if (/\/menu\/\d+$/.test(location.pathname)) {
      // SCENARIO 2: If viewing an item from the preview menu (cart) to edit...
      if (location.state?.isEditing) {
        // ...the back button should return to the preview menu page (cart).
        navigate('/cart');
      } else {
        // Otherwise, if just browsing from the menu, it returns to the menu.
        navigate('/menu');
      }
    } else if (location.pathname === '/cart') {
      // SCENARIO 1: If on the main preview menu page (cart)...
      // ...the back button should return to the main menu page.
      navigate('/menu');
    }
    else {
      // For all other pages, the default 'back' behavior is appropriate.
      navigate(-1);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 max-w-md mx-auto h-20 bg-dark-umber/80 backdrop-blur-sm border-b border-muted-taupe/50 flex justify-between items-center px-6 z-50">
      <div>
        {showBackButton ? (
          <button onClick={handleBack} className="text-creamy-white hover:text-earthy-gold transition-colors">
            <BackIcon />
          </button>
        ) : (
          <Link to="/home">
            <h1 className="text-3xl font-sans font-black tracking-wider text-earthy-gold">ILAHI</h1>
          </Link>
        )}
      </div>
      <Link to="/profile" className="text-creamy-white hover:text-earthy-gold transition-colors">
        <ProfileIcon />
      </Link>
    </header>
  );
};

export default Header;