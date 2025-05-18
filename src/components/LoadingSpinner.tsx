import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: 'h-6 w-6 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-t-2 border-b-2',
  xl: 'h-16 w-16 border-t-2 border-b-2',
};

export default function LoadingSpinner({ 
  size = 'lg',
  className = '' 
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${size === 'lg' || size === 'xl' ? 'min-h-screen' : ''} ${className}`}>
      <div 
        className={`
          animate-spin rounded-full border-blue-500
          ${sizeMap[size]}
        `}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
