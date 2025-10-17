import React from 'react';
import { Button } from "@/components/ui/button" // Importing from SHADCN

const ComponentWithShadcn: React.FC = () => {
  return (
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Component With Shadcn</h1>
        <p className="mt-2">This component uses Shadcn for additional styling.</p>
        <Button className="mt-4">Shadcn Button</Button>
      </div>
  );
};

export default ComponentWithShadcn;
