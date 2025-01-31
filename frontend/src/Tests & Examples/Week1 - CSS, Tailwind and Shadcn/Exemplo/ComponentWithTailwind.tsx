import React from 'react';

const ComponentWithTailwind: React.FC = () => {
  return (
    <div className="flex flex-col bg-blue-500 text-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Component With Tailwind</h1>
      <p className="mt-2 mb-2">This component is styled using Tailwind CSS.</p>
      <div className="flex justify-center items-center rounded-md h-[40px] w-[130px] bg-neutral-950 hover:bg-neutral-900 cursor-pointer text-sm">Tailwind Button</div>
    </div>
  );
};

export default ComponentWithTailwind;
