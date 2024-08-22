import React, { ReactNode } from 'react';

// Interface defining the props for the WrapperComponent
interface WrapperProps {
  children: ReactNode;
}

function WrapperComponent({ children }: WrapperProps) {
  return (
    <div className="p-4 border rounded-lg bg-gray-100">
      {children}
    </div>
  );
}

export default WrapperComponent;
