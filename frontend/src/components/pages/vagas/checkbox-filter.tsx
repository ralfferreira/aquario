"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

type CheckboxProps = {
  data: {
    titulo: string;
    elementos: string[];
  }[];
};

const CheckboxGroup = ({ data }: CheckboxProps) => {
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: { [key: string]: boolean };
  }>({});

  const handleChange = (category: string, element: string) => {
    setSelectedValues(prev => {
      const categoryValues = prev[category] || {}; // Inicializa se não existir
      const newState = {
        ...prev,
        [category]: {
          ...categoryValues,
          [element]: !categoryValues[element], // Inverte o valor do checkbox
        },
      };
      return newState;
    });
  };

  return (
    <Card className="w-full mx-auto">
      <CardContent className="p-5">
        {data.map((group, index) => (
          <div key={index} className="space-y-2">
            {group.titulo !== "None" && <h3 className="text-xl">{group.titulo}</h3>}

            <div className="flex flex-col space-y-2">
              {group.elementos.map((element, idx) => (
                <label
                  key={idx}
                  className="inline-flex items-center space-x-2 pb-1 hover:underline"
                >
                  <Checkbox
                    checked={selectedValues[group.titulo]?.[element] || false} // Garante que o valor exista
                    onClick={() => handleChange(group.titulo, element)} // Muda o estado ao clicar
                  />
                  <span className="text-sm hover:underline cursor-pointer">{element}</span>
                </label>
              ))}
            </div>

            {index !== data.length - 1 && <hr className="my-4 pb-3 border-gray-300" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CheckboxGroup;
