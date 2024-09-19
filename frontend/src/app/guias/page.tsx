import Image from "next/image";
import CourseCard from "@/components/Pages/Guias/cousersCard";
import InfoCardsComponent from "@/components/Pages/Guias/infoCard"
import { FileText, GitFork } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center p-4 mt-14 mx-20 lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="flex flex-col space-y-4 w-full lg:w-1/3 mr-20">
        <CourseCard iconName="gear">
          Engenharia da Computação
        </CourseCard>

        <CourseCard iconName="monitor">
          Ciência da Computação
        </CourseCard>

        <CourseCard iconName="lightbulb">
          Ciência de Dados e Inteligencia Artificial
        </CourseCard>
      </div>
      <div className="flex flex-col space-y-4 w-full lg:w-2/3 mr-20">
        <InfoCardsComponent icon={FileText}>
          <span>Documentação</span>
          <span>Veja guias, perguntas frequentes e documentos importantes acerca do curso.</span>
        </InfoCardsComponent>

        <InfoCardsComponent icon={GitFork}>
          <span>Seletor de Cadeiras</span>
          <span>O seletor de cadeiras utiliza de grafos para permitir uma melhor visualização das suas cadeiras, os pré-requisito e a ementa do curso.</span>
        </InfoCardsComponent>
      </div>
    </div>
  );
}