import React from 'react';

const MehndiIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M18 8c0-2.21-1.79-4-4-4s-4 1.79-4 4v10.5a2.5 2.5 0 0 1-5 0V11c0-2.21-1.79-4-4-4"/>
    <path d="M14 11.5a2.5 2.5 0 0 0-5 0V20c0 1.1.9 2 2 2h1c1.1 0 2-.9 2-2v-8.5Z"/>
  </svg>
);

export default MehndiIcon;