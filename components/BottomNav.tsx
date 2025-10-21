import React from 'react';
import { NavLink } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';
import HomeIcon from './icons/HomeIcon';
import CutleryIcon from './icons/CutleryIcon';
import MenuIcon from './icons/MenuIcon';
import ProfileIcon from './icons/ProfileIcon';

const BottomNav: React.FC = () => {
  const { getActiveEvent } = useOrder();
  const activeEvent = getActiveEvent();
  const cartItemCount = activeEvent?.cart.length || 0;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center space-y-1 transition-colors ${
      isActive ? 'text-earthy-gold' : 'text-muted-taupe hover:text-creamy-white'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-dark-umber/80 backdrop-blur-sm border-t border-muted-taupe/50 flex justify-around items-center z-50">
      <NavLink to="/home" className={navLinkClass}>
        <HomeIcon />
        <span className="text-xs font-bold">Home</span>
      </NavLink>
      <NavLink to="/menu" className={navLinkClass}>
        <CutleryIcon />
        <span className="text-xs font-bold">Menu</span>
      </NavLink>
      <NavLink to="/cart" className={navLinkClass}>
        <div className="relative">
          {cartItemCount > 0 && (
            <div className="absolute -top-2 -right-3.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {cartItemCount}
            </div>
          )}
          <MenuIcon />
        </div>
        <span className="text-xs font-bold">List</span>
      </NavLink>
       <NavLink to="/profile" className={navLinkClass}>
        <ProfileIcon />
        <span className="text-xs font-bold">Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;