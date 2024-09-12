"use client"


import GradientHeaderComponent from "@/components/Shared/gradient-header";
import TypeBadge from "@/components/Shared/Badges";
import UserCard from "@/components/Shared/UserCard";

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
      <UserCard
        name="Tiago Trindade de Oliveira"
        profilePicture= "/fotoTiago.jpeg" 
        major="Ciência da Computação"
        type="pessoa"
        site="site" 
      />
      
      <div>
        <div className="flex gap-10 m-2">
          <TypeBadge type="laboratorio" size="small" /> 
          <TypeBadge type="laboratorio" size="large" />
        </div>

        <div className="flex gap-10 m-2">
          <TypeBadge type="pessoa" size="small" />
          <TypeBadge type="pessoa" size="large" />
        </div>  
        
        <div className="flex gap-10 m-2">
          <TypeBadge type="oficial" size="small" />
          <TypeBadge type="oficial" size="large" />
        </div>
          
        <div className="flex gap-10 m-2">
          <TypeBadge type="grupo" size="small" />
          <TypeBadge type="grupo" size="large" />
        </div>
        
        <div className="flex gap-10 m-2">
          <TypeBadge type="externo" size="small" />
          <TypeBadge type="externo" size="large" />
        </div>

      </div> 

      </div>
  
      
    );
}
  