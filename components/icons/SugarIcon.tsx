import React from 'react';

interface SugarIconProps {
  filled: boolean;
  onClick: () => void;
}

const SugarIcon: React.FC<SugarIconProps> = ({ filled, onClick }) => (
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
    <path d="M20 15.38V8.62a2 2 0 0 0-1-1.73l-6-3.46a2 2 0 0 0-2 0l-6 3.46a2 2 0 0 0-1 1.73v6.76a2 2 0 0 0 1 1.73l6 3.46a2 2 0 0 0 2 0l6-3.46a2 2 0 0 0 1-1.73z"></path>
  </svg>
);

export default SugarIcon;