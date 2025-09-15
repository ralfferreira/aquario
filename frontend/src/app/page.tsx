'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/Shared/ProjectCard';
import VacancyCard from '@/components/Pages/Vagas/vacancyCard';
import PostCardTitle from '@/components/Shared/ProjectCardTitle';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [feed, setFeed] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch('http://localhost:3001/feed');
        if (!response.ok) throw new Error('Falha ao buscar o feed');
        const data = await response.json();
        setFeed(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const projetos = feed.filter((item) => item.type === 'projeto').slice(0, 4);
  const vagas = feed.filter((item) => item.type === 'vaga').slice(0, 4);
  const publicacoes = feed.filter((item) => item.type === 'publicacao').slice(0, 4);

  return (
    <main className="container mx-auto p-4 pt-24">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-6xl font-bold tracking-tight">Bem-vindo ao Aquário</h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Seu hub de oportunidades, projetos e conexões no Centro de Informática da UFPB.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/projetos">Explorar Projetos</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/vagas">Ver Vagas</Link>
          </Button>
        </div>
      </section>

      {/* Projetos em Destaque */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Projetos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-72 w-full" />)
            : projetos.map((item) => (
                <Link href={`/projetos/${item.data.id}`} key={`projeto-${item.data.id}`}>
                  <ProjectCard projeto={item.data} />
                </Link>
              ))}
        </div>
      </section>

      {/* Vagas Recentes */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Vagas Recentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-28 w-full" />)
            : vagas.map((item) => (
                <Link href={`/vagas/${item.data.id}`} key={`vaga-${item.data.id}`}>
                  <VacancyCard vaga={item.data} />
                </Link>
              ))}
        </div>
      </section>

      {/* Últimas do Blog */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Últimas do Blog</h2>
        <div className="space-y-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-20 w-full" />)
            : publicacoes.map((item) => (
                <Link href={`/blog/${item.data.id}`} key={`publicacao-${item.data.id}`}>
                  <PostCardTitle
                    postTitle={item.data.titulo}
                    numVotes={0} // Mockado
                    numMinutes={0} // Mockado
                    numComments={0} // Mockado
                    postUser={{
                      name: item.data.autor.nome,
                      image: item.data.autor.urlFotoPerfil ?? '',
                      type: 'pessoa', // Mockado
                    }}
                  />
                </Link>
              ))}
        </div>
      </section>
    </main>
  );
}
