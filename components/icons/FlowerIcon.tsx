
import React from 'react';

const FlowerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="150" 
        height="150" 
        viewBox="0 0 100 100" 
        className={className}
    >
        <defs>
            <g id="petal-outer">
                <path d="M50 0 C 40 20, 40 30, 50 50 C 60 30, 60 20, 50 0 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </g>
            <g id="petal-mid">
                <path d="M50 7 C 43 23, 43 30, 50 43 C 57 30, 57 23, 50 7 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </g>
            <g id="petal-inner">
                <path d="M50 14 C 46 26, 46 30, 50 36 C 54 30, 54 26, 50 14 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </g>
            <g id="dot-cluster">
                <circle cx="50" cy="12" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="50" cy="7" r="1" fill="currentColor" stroke="none" />
                <circle cx="50" cy="3" r="0.5" fill="currentColor" stroke="none" />
            </g>
             <g id="dot-single">
                <circle cx="50" cy="18" r="0.75" fill="currentColor" stroke="none" />
            </g>
        </defs>

        <g transform="translate(50 50)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                <g key={angle} transform={`rotate(${angle})`}>
                    <use href="#petal-outer" />
                    <use href="#petal-mid" />
                    <use href="#petal-inner" />
                    <use href="#dot-cluster" transform="translate(0 -35)"/>
                </g>
            ))}
             {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(angle => (
                <g key={angle} transform={`rotate(${angle})`}>
                    <use href="#dot-single" transform="translate(0 -22)"/>
                </g>
            ))}
        </g>
    </svg>
);

export default FlowerIcon;
