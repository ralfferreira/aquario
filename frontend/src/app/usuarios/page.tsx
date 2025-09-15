"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import UserCard, { User } from '@/components/Shared/UserCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Usuarios() {
  const [activeTab, setActiveTab] = useState<'Laboratórios' | 'Grupos e Ligas' | 'Pessoas'>('Pessoas');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    if (activeTab === 'Pessoas') {
      const fetchUsers = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('http://localhost:3001/usuarios');
          if (!response.ok) throw new Error('Falha ao buscar usuários');
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUsers();
    }
  }, [activeTab]);

  return (
    <div className="container mx-auto p-4 pt-24">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">Comunidade</h1>
        <p className="text-xl text-muted-foreground mt-2">Procure por laboratórios, grupos, professores e alunos do Centro de Informática.</p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="w-full max-w-lg">
          <Input type="search" placeholder="Pesquisar na comunidade..." />
        </div>

        <div className="flex items-center justify-center gap-2 p-1 bg-muted rounded-full">
          <button className={`transition-all text-sm duration-200 py-2 px-6 rounded-full ${activeTab === 'Pessoas' ? 'bg-background shadow' : ''}`} onClick={() => setActiveTab('Pessoas')}>Pessoas</button>
          <button className={`transition-all text-sm duration-200 py-2 px-6 rounded-full ${activeTab === 'Laboratórios' ? 'bg-background shadow' : ''}`} onClick={() => setActiveTab('Laboratórios')}>Laboratórios</button>
          <button className={`transition-all text-sm duration-200 py-2 px-6 rounded-full ${activeTab === 'Grupos e Ligas' ? 'bg-background shadow' : ''}`} onClick={() => setActiveTab('Grupos e Ligas')}>Grupos e Ligas</button>
        </div>
      </div>

      <div className="mt-12">
        {activeTab === 'Pessoas' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="space-y-2 flex flex-col items-center">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
                            : users.map((user) => (
                  <Link href={`/usuarios/${user.id}`} key={user.id}>
                    <UserCard user={user} />
                  </Link>
                ))}

          </div>
        )}
        {activeTab === 'Laboratórios' && <div className="text-center text-muted-foreground py-12">Em breve...</div>}
        {activeTab === 'Grupos e Ligas' && <div className="text-center text-muted-foreground py-12">Em breve...</div>}
      </div>
    </div>
  );
}
