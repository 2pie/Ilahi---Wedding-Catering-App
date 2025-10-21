import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const AppLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;