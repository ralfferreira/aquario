import React, { ReactNode } from 'react';

// Interface defining the props for the CardComponent
interface CardProps {
  title: string;
  onButtonClick: () => void;
  children: ReactNode;
}

function CardComponent({ title, onButtonClick, children }: CardProps) {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="card-content mb-4">{children}</div>
      <button
        onClick={onButtonClick}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
      >
        Click Me
      </button>
    </div>
  );
}

export default CardComponent;
