import React from 'react';

// Interface defining the props for the ProfileComponent
interface ProfileProps {
  name: string;
  age: number;
  occupation: string;
}

function ProfileComponent({ name, age, occupation }: ProfileProps) {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-gray-600">Age: {age}</p>
      <p className="text-gray-600">Occupation: {occupation}</p>
    </div>
  );
}

export default ProfileComponent;
