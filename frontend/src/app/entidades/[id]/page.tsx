'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import UserCard from '@/components/Shared/UserCard';

// Tipos
interface Membro {
  id: string;
  papel: 'ADMIN' | 'MEMBRO';
  usuario: {
    id: string;
    nome: string;
    urlFotoPerfil?: string | null;
    curso?: { nome: string } | null;
    periodo?: number | null;
  };
}

interface Entidade {
  id: string;
  nome: string;
  descricao?: string | null;
  tipo: string;
  urlFoto?: string | null;
  membros: Membro[];
}

export default function EntidadeProfilePage({ params }: { params: { id: string } }) {
  const [entidade, setEntidade] = useState<Entidade | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      const fetchEntidade = async () => {
        try {
          const response = await fetch(`http://localhost:3001/entidades/${params.id}`);
          if (!response.ok) throw new Error('Entidade não encontrada');
          const data = await response.json();
          setEntidade(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchEntidade();
    }
  }, [params.id]);

  if (isLoading) {
    return <Skeleton className="h-screen w-full" />;
  }

  if (error || !entidade) {
    return <div className="container mx-auto p-4 pt-24 text-center text-red-500">{error || 'Entidade não encontrada.'}</div>;
  }

  const admins = entidade.membros.filter(m => m.papel === 'ADMIN');
  const membros = entidade.membros.filter(m => m.papel === 'MEMBRO');

  return (
    <main className="container mx-auto max-w-6xl p-4 pt-24">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <Avatar className="w-40 h-40 border-4 border-background shadow-lg">
          <AvatarImage src={entidade.urlFoto || ''} alt={entidade.nome} />
          <AvatarFallback className="text-6xl">{entidade.nome.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-5xl font-bold">{entidade.nome}</h1>
          <Badge className="mt-2 text-md">{entidade.tipo.replace('_', ' ')}</Badge>
        </div>
        {entidade.descricao && <p className="text-lg text-muted-foreground max-w-3xl">{entidade.descricao}</p>}
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Administradores</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {admins.map(m => <UserCard key={m.id} user={m.usuario} />)}
          </div>
        </div>

        {membros.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center">Membros</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {membros.map(m => <UserCard key={m.id} user={m.usuario} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
