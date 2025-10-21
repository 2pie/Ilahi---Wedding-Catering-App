import React from 'react';

const ReceptionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 2h8"/>
    <path d="M12 2v2"/>
    <path d="M12 12L8 22h8L12 12z"/>
    <path d="M6 12H2l2 10h4"/>
    <path d="M18 12h4l-2 10h-4"/>
  </svg>
);

export default ReceptionIcon;