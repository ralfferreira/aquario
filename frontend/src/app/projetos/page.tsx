"use client";

import SearchFilters from "@/components/Shared/SearchFilters";
import Banner from "@/components/Shared/Banner";
import PostCard from "@/components/Shared/ProjectCard";

interface User {
  name: string;
  image: string;
  type: "laboratorio" | "pessoa" | "oficial" | "grupo" | "externo";
}

interface ProjectCardProps {
  projectName: string;
  projectImage: string;
  users: User[];
}

const fakeProjects: ProjectCardProps[] = [
  {
    projectName: "Projeto IA em Saúde",
    projectImage: "https://picsum.photos/200/300?random=1",
    users: [
      { name: "Alice", image: "https://picsum.photos/100?random=1", type: "laboratorio" },
      { name: "Bob", image: "https://picsum.photos/100?random=2", type: "pessoa" },
    ],
  },
  {
    projectName: "Sistema de Gestão Acadêmica",
    projectImage: "https://picsum.photos/200/300?random=2",
    users: [
      { name: "Carlos", image: "https://picsum.photos/100?random=3", type: "grupo" },
    ],
  },
  {
    projectName: "Plataforma de E-commerce",
    projectImage: "https://picsum.photos/200/300?random=3",
    users: [
      { name: "Diana", image: "https://picsum.photos/100?random=4", type: "oficial" },
      { name: "Evelyn", image: "https://picsum.photos/100?random=5", type: "pessoa" },
    ],
  },
  {
    projectName: "Aplicação de Monitoramento Ambiental",
    projectImage: "https://picsum.photos/200/300?random=4",
    users: [
      { name: "Fernando", image: "https://picsum.photos/100?random=6", type: "externo" },
    ],
  },
  {
    projectName: "Ferramenta de Análise de Redes Sociais",
    projectImage: "https://picsum.photos/200/300?random=5",
    users: [
      { name: "Gabriel", image: "https://picsum.photos/100?random=7", type: "pessoa" },
      { name: "Helena", image: "https://picsum.photos/100?random=8", type: "laboratorio" },
    ],
  },
  {
    projectName: "App para Organização de Tarefas",
    projectImage: "https://picsum.photos/200/300?random=6",
    users: [
      { name: "Igor", image: "https://picsum.photos/100?random=9", type: "grupo" },
    ],
  },
  {
    projectName: "Sistema de Segurança em Nuvem",
    projectImage: "https://picsum.photos/200/300?random=7",
    users: [
      { name: "Julia", image: "https://picsum.photos/100?random=10", type: "oficial" },
      { name: "Kevin", image: "https://picsum.photos/100?random=11", type: "externo" },
    ],
  },
  {
    projectName: "Plataforma de Ensino a Distância",
    projectImage: "https://picsum.photos/200/300?random=8",
    users: [
      { name: "Laura", image: "https://picsum.photos/100?random=12", type: "laboratorio" },
      { name: "Marcos", image: "https://picsum.photos/100?random=13", type: "pessoa" },
    ],
  },
  {
    projectName: "Sistema de Gerenciamento de Finanças",
    projectImage: "https://picsum.photos/200/300?random=9",
    users: [
      { name: "Nina", image: "https://picsum.photos/100?random=14", type: "externo" },
    ],
  },
  {
    projectName: "Ferramenta de Colaboração Online",
    projectImage: "https://picsum.photos/200/300?random=10",
    users: [
      { name: "Oscar", image: "https://picsum.photos/100?random=15", type: "grupo" },
      { name: "Paula", image: "https://picsum.photos/100?random=16", type: "oficial" },
    ],
  },
];


export default function Projetos() {
  return (
    <main className="px-[10%]">
      <div className="space-y-6 flex flex-col">
        <div className="pt-28">
          <Banner
            title="Explore os projetos do Centro de Informática"
            description="Nosso mural de projetos permite visualizar projetos de qualquer pessoa ou laboratório."
            buttonText="Divulgar um projeto"
          />
        </div>
        <SearchFilters />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        {fakeProjects.map((project, index) => (
          <PostCard
            key={index}
            projectName={project.projectName}
            projectImage={project.projectImage}
            users={project.users}
          />
        ))}
      </div>
    </main>
  );
}
