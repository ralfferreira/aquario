"use client"


import GradientHeaderComponent from "@/components/Shared/GradientHeader";
import TypeBadge from "@/components/Shared/Badges";
import UserCard from "@/components/Shared/UserCard";
import SearchFilters from "@/components/Shared/SearchFilters";
import Banner from "@/components/Shared/Banner";

export default function Test() {
    const handleButtonClick = () => {
      alert('Button clicked!');
    };  

    return (
      <div className="space-y-6 bg-gray-50 dark:bg-black min-h-screen flex flex-col">
       
      <div className="pt-28">
      <Banner 
        title="Explore vagas de emprego, estágio e de projetos voluntários no CI e afora"
        description="Nosso mural de vagas permite que qualquer pessoa ou laboratório busque alunos interessados em vagas em projetos ou estágios."
        buttonText="Divulgar uma vaga"
         // link do botão
      />
      </div>
      <SearchFilters/>
        
      </div>

      
      
    );
}
  