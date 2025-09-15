"use client";

import SearchFilters from "@/components/Shared/SearchFilters";
import Banner from "@/components/Shared/Banner";
import ProjectCard, { Projeto } from '@/components/Shared/ProjectCard';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';


export default function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await fetch('http://localhost:3001/projetos');
        if (!response.ok) throw new Error('Falha ao buscar projetos');
        const data = await response.json();
        setProjetos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjetos();
  }, []);
  return (
    <main className="px-[10%]">
      <div className="space-y-6 flex flex-col">
        <div className="pt-28">
          <Banner
            title="Explore os projetos do Centro de Informática"
            description="Nosso mural de projetos permite visualizar projetos de qualquer pessoa ou laboratório."
            buttonText="Divulgar um projeto"
            buttonHref="/projetos/novo"
            showButton={!!user}
          />
        </div>
        <SearchFilters />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="h-64 w-full" />)
          : projetos.map((projeto) => (
              <Link href={`/projetos/${projeto.id}`} key={projeto.id}>
                <ProjectCard projeto={projeto} />
              </Link>
            ))}
      </div>
    </main>
  );
}
