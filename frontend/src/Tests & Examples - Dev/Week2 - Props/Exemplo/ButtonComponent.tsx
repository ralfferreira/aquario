import React from 'react';

// Interface defining the props for the ButtonComponent
interface ButtonProps {
  label: string;
  onClick: () => void; // Function type that returns void
}

function ButtonComponent({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
    >
      {label}
    </button>
  );
}

export default ButtonComponent;
