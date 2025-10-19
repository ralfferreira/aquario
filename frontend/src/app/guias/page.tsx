"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GuiasPage() {
  const router = useRouter();

  const courses = [
    {
      slug: "ciencia-da-computacao",
      name: "Ciência da Computação",
      description: "Fundamentos de programação, algoritmos e estruturas de dados",
    },
    {
      slug: "engenharia-da-computacao",
      name: "Engenharia da Computação",
      description: "Sistemas digitais, arquitetura de computadores e eletrônica",
    },
    {
      slug: "ciencias-de-dados-e-inteligencia-artificial",
      name: "Ciências de Dados e Inteligência Artificial",
      description: "Análise de dados, machine learning e inteligência artificial",
    },
  ];

  const handleCourseSelect = (courseSlug: string) => {
    router.push(`/guias/${courseSlug}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Guias Acadêmicos</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Selecione seu curso para acessar os guias disponíveis
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {courses.map(course => (
          <Card key={course.slug} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-xl">{course.name}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleCourseSelect(course.slug)}
                className="w-full"
                variant="default"
              >
                Acessar Guias
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
