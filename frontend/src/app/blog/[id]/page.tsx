'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';

// Tipos
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
  criadoEm: string;
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Publicacao | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`http://localhost:3001/publicacoes/${params.id}`);
          if (!response.ok) {
            throw new Error('Falha ao buscar a publicação');
          }
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [params.id]);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names.map((n) => n[0]).join('');
    return initials.toUpperCase().slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl p-4 pt-24">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="flex items-center space-x-4 mb-8">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (!post) {
    return <div className="container mx-auto p-4 pt-24 text-center">Post não encontrado.</div>;
  }

  return (
    <main className="container mx-auto max-w-3xl p-4 pt-24">
      <article className="prose dark:prose-invert lg:prose-xl">
        <h1>{post.titulo}</h1>
        
        <div className="flex items-center space-x-4 my-8 not-prose">
          <Avatar className="h-16 w-16">
            <AvatarImage src={post.autor.urlFotoPerfil || ''} alt={post.autor.nome} />
            <AvatarFallback className="text-xl">{getInitials(post.autor.nome)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg">{post.autor.nome}</p>
            <p className="text-sm text-muted-foreground">
              Publicado em {new Date(post.criadoEm).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        <ReactMarkdown>{post.conteudo}</ReactMarkdown>
      </article>
    </main>
  );
}
