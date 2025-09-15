'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PostCardTitle from "@/components/Shared/ProjectCardTitle";
import SearchFilters from "@/components/Shared/SearchFilters";
import Banner from "@/components/Shared/Banner";
import { Skeleton } from '@/components/ui/skeleton';

// Tipos que correspondem à API do backend
interface Autor {
  id: string;
  nome: string;
  urlFotoPerfil?: string | null;
}

interface Publicacao {
  id: string;
  titulo: string;
  conteudo: string;
  autor: Autor;
  centroId: string;
  criadoEm: string; // A data virá como string ISO
  atualizadoEm: string;
}

export default function Blog() {
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublicacoes = async () => {
      try {
        const response = await fetch('http://localhost:3001/publicacoes');
        if (!response.ok) {
          throw new Error('Falha ao buscar publicações');
        }
        const data = await response.json();
        setPublicacoes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicacoes();
  }, []);

  const calculateMinutesAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    return Math.floor(diffInMs / (1000 * 60));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="w-full max-w-4xl space-y-6">
        <div className="pt-12">
          <Banner
            title="Explore o que as pessoas, laboratórios e grupos do CI estão falando"
            description="Nosso blog é feito para que todos possam comunicar notícias, dúvidas e tutoriais para todos os alunos e colaboradores do Centro de Informática"
            buttonText="Fazer uma postagem"
          />
        </div>
        <SearchFilters />
        <div className="space-y-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))
            : publicacoes
              .filter((post) => post.autor)
              .map((post) => (
                <Link href={`/blog/${post.id}`} key={post.id} className="block hover:bg-muted/50 rounded-lg transition-colors">
                  <div className="p-4">
                    <PostCardTitle
                      postTitle={post.titulo}
                      numVotes={0} // TODO: Mockado
                      numMinutes={calculateMinutesAgo(post.criadoEm)}
                      numComments={0} // TODO: Mockado
                      postUser={{
                        name: post.autor.nome,
                        image: post.autor.urlFotoPerfil || 'https://picsum.photos/50',
                        type: 'pessoa', // TODO: Mockado
                      }}
                    />
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </main>
  );
}
