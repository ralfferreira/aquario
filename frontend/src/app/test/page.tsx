"use client"


import GradientHeaderComponent from "@/components/Shared/gradient-header";



export default function Test() {
    const handleButtonClick = () => {
      alert('Button clicked!');
    };

    return (
      <div className="space-y-6 bg-gray-50 dark:bg-black min-h-screen flex flex-col">

      <GradientHeaderComponent 
          academicCenter="Centro de Informática" 
          courses={["Ciência da Computação", "Engenharia da Computação", "Ciências de Dados e Inteligência Artificial"]} 
          currentCourse="Ciência da Computação"
      />      
      </div>
    );
}
  