"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import UserCard from "@/components/shared/user-card";
import LabHeader from "@/components/pages/usuarios/lab-card";
import ProjectCard, { Projeto } from "@/components/shared/project-card";
import PostCardTitle from "@/components/shared/project-card-title";

type Membro = {
  id: string;
  papel: "ADMIN" | "MEMBRO";
  usuario: {
    id: string;
    nome: string;
    urlFotoPerfil?: string | null;
    papel: "DOCENTE" | "DISCENTE";
    curso?: { nome: string } | null;
    periodo?: number | null;
  };
};

type Publicacao = {
  id: string;
  titulo: string;
  criadoEm: string;
  autor: {
    nome: string;
    urlFotoPerfil?: string | null;
  };
};

type Entidade = {
  id: string;
  nome: string;
  descricao?: string | null;
  tipo: string;
  urlFoto?: string | null;
  membros: Membro[];
  projetos: Projeto[];
  publicacoes: Publicacao[];
};

export default function EntidadeProfilePage({ params }: { params: { id: string } }) {
  const [entidade, setEntidade] = useState<Entidade | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Sobre" | "Membros" | "Projetos" | "Publicações">(
    "Sobre"
  );

  useEffect(() => {
    if (params.id) {
      const fetchEntidade = async () => {
        try {
          const response = await fetch(`http://localhost:3001/entidades/${params.id}`);
          if (!response.ok) {
            throw new Error("Entidade não encontrada");
          }
          const data = await response.json();
          setEntidade(data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Ocorreu um erro desconhecido");
          }
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
    return (
      <div className="container mx-auto p-4 pt-24 text-center text-red-500">
        {error || "Entidade não encontrada."}
      </div>
    );
  }

  const admins = entidade.membros.filter(m => m.papel === "ADMIN");
  const membros = entidade.membros.filter(m => m.papel === "MEMBRO");

  return (
    <div className="mt-20">
      <LabHeader entidade={entidade} />

      <div className="flex">
        <div className="w-full h-[10vh] pl-12 flex gap-12 justify-start items-center pt-5">
          <div
            className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${activeTab === "Sobre" ? "bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]" : "hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]"}`}
            onClick={() => setActiveTab("Sobre")}
          >
            Sobre
          </div>
          <div
            className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${activeTab === "Membros" ? "bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]" : "hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]"}`}
            onClick={() => setActiveTab("Membros")}
          >
            Membros
          </div>
          <div
            className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${activeTab === "Projetos" ? "bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]" : "hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]"}`}
            onClick={() => setActiveTab("Projetos")}
          >
            Projetos
          </div>
          <div
            className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${activeTab === "Publicações" ? "bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]" : "hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]"}`}
            onClick={() => setActiveTab("Publicações")}
          >
            Publicações
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-slate-400 opacity-40"></div>

      <div className="h-auto p-12">
        {activeTab === "Sobre" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Descrição</h2>
            <p className="text-muted-foreground">
              {entidade.descricao || "Nenhuma descrição fornecida."}
            </p>
          </div>
        )}
        {activeTab === "Membros" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Administradores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {admins.map(m => (
                <UserCard key={m.id} user={m.usuario} />
              ))}
            </div>
            <h2 className="text-2xl font-semibold mb-4">Membros</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {membros.map(m => (
                <UserCard key={m.id} user={m.usuario} />
              ))}
            </div>
          </div>
        )}
        {activeTab === "Projetos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {entidade.projetos.length > 0 ? (
              entidade.projetos.map(projeto => <ProjectCard key={projeto.id} projeto={projeto} />)
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                Nenhum projeto encontrado.
              </p>
            )}
          </div>
        )}
        {activeTab === "Publicações" && (
          <div className="space-y-6">
            {entidade.publicacoes.length > 0 ? (
              entidade.publicacoes.map(post => (
                <div key={post.id} className="border-b pb-4">
                  <PostCardTitle
                    postTitle={post.titulo}
                    numVotes={0} // Mocked
                    numMinutes={Math.floor(
                      (new Date().getTime() - new Date(post.criadoEm).getTime()) / 60000
                    )}
                    numComments={0} // Mocked
                    postUser={{
                      name: post.autor.nome,
                      image: post.autor.urlFotoPerfil || "",
                      type: "pessoa",
                    }}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">Nenhuma publicação encontrada.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
