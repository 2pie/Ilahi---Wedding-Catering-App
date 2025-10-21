import React from 'react';

const EngagementIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/>
    <path d="m10.5 12-2 4h7l-2-4"/>
    <path d="m10.5 12 1.5-3 1.5 3"/>
    <path d="m10.5 12-1.5-3h4.5"/>
  </svg>
);

export default EngagementIcon;