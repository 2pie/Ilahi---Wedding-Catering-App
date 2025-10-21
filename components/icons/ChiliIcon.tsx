import React from 'react';

interface ChiliIconProps {
  filled: boolean;
  onClick: () => void;
}

const ChiliIcon: React.FC<ChiliIconProps> = ({ filled, onClick }) => (
  <svg 
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg" 
    width="28" 
    height="28" 
    viewBox="0 0 24 24" 
    fill={filled ? "#C77D55" : "none"} 
    stroke={filled ? "#C77D55" : "#6D5D5A"}
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="cursor-pointer transition-colors duration-200"
  >
    <path d="M12 2c-4.5 0-8 3-8 6.5C4 12.5 8 16 12 22c4-6 8-9.5 8-13.5C20 5 16.5 2 12 2z"></path>
    <path d="M14.5 6.5c0-1.5-1-3-2.5-3"></path>
  </svg>
);

export default ChiliIcon;