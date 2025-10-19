"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import GradientHeaderComponent from "@/components/shared/gradient-header";
import { GuideIndex } from "@/components/shared/guide-index";
import MarkdownRenderer from "@/components/shared/markdown-renderer";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type GuiaDTO = {
  id: string;
  titulo: string;
  slug: string;
  descricao?: string | null;
  status: string;
  cursoId?: string | null;
  tags: string[];
};

type SecaoDTO = {
  id: string;
  guiaId: string;
  titulo: string;
  slug: string;
  ordem: number;
  conteudo?: string | null;
  status: string;
};

type SubSecaoDTO = {
  id: string;
  secaoId: string;
  titulo: string;
  slug: string;
  ordem: number;
  conteudo?: string | null;
  status: string;
};

export default function GuiasCursoPage() {
  const params = useParams<{ curso: string; parts?: string[] }>();
  const router = useRouter();
  const cursoSlug = params?.curso;
  const parts = params?.parts as string[] | undefined;

  const [_cursoId, setCursoId] = useState<string | null>(null);
  const [guias, setGuias] = useState<GuiaDTO[]>([]);
  const [secoesByGuia, setSecoesByGuia] = useState<Record<string, SecaoDTO[]>>({});
  const [subsecoesBySecao, setSubsecoesBySecao] = useState<Record<string, SubSecaoDTO[]>>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For now, map fixed curso slugs to names the seed created. In the future, query backend.
  const cursoSlugToNome = useMemo(
    () => ({
      "ciencia-da-computacao": "Ciência da Computação",
      "engenharia-da-computacao": "Engenharia da Computação",
      "ciencias-de-dados-e-inteligencia-artificial": "Ciências de Dados e Inteligência Artificial",
    }),
    []
  );

  const handleCourseChange = (courseName: string) => {
    // Map course name back to slug
    const courseSlugMap: Record<string, string> = {
      "Ciência da Computação": "ciencia-da-computacao",
      "Engenharia da Computação": "engenharia-da-computacao",
      "Ciências de Dados e Inteligência Artificial": "ciencias-de-dados-e-inteligencia-artificial",
    };
    const newSlug = courseSlugMap[courseName];
    if (newSlug) {
      router.push(`/guias/${newSlug}`);
    }
  };

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        // Resolve cursoId by listing centros->cursos and picking the fixed one (CI only)
        const centrosRes = await fetch(`${API_URL}/centros`);
        const centros = await centrosRes.json();
        const ci = Array.isArray(centros)
          ? centros.find((c: { sigla: string }) => c.sigla === "CI")
          : null;
        if (!ci) {
          throw new Error("Centro CI não encontrado");
        }

        const cursosRes = await fetch(`${API_URL}/centros/${ci.id}/cursos`);
        const cursos = await cursosRes.json();
        const curso = cursos.find(
          (c: { nome: string }) =>
            c.nome === cursoSlugToNome[cursoSlug as keyof typeof cursoSlugToNome]
        );
        if (!curso) {
          throw new Error("Curso não encontrado");
        }
        setCursoId(curso.id);

        const guiasRes = await fetch(`${API_URL}/guias?cursoId=${curso.id}`);
        const guiasData: GuiaDTO[] = await guiasRes.json();
        setGuias(guiasData);

        const secoesMap: Record<string, SecaoDTO[]> = {};
        const subsecoesMap: Record<string, SubSecaoDTO[]> = {};
        for (const guia of guiasData) {
          const secoesRes = await fetch(`${API_URL}/guias/${guia.id}/secoes?guiaId=${guia.id}`);
          const secoes: SecaoDTO[] = await secoesRes.json();
          secoesMap[guia.id] = secoes;
          for (const sec of secoes) {
            const subRes = await fetch(
              `${API_URL}/guias/secoes/${sec.id}/subsecoes?secaoId=${sec.id}`
            );
            const subs: SubSecaoDTO[] = await subRes.json();
            subsecoesMap[sec.id] = subs;
          }
        }
        setSecoesByGuia(secoesMap);
        setSubsecoesBySecao(subsecoesMap);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Erro ao carregar guias");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [cursoSlug, cursoSlugToNome]);

  const guiaTree = useMemo(() => {
    return guias.map(g => ({
      titulo: g.titulo,
      slug: g.slug,
      secoes: (secoesByGuia[g.id] || []).map(s => ({
        titulo: s.titulo,
        slug: s.slug,
        subsecoes: (subsecoesBySecao[s.id] || []).map(sub => ({
          titulo: sub.titulo,
          slug: sub.slug,
        })),
      })),
    }));
  }, [guias, secoesByGuia, subsecoesBySecao]);

  const currentContent = useMemo(() => {
    if (!parts || parts.length === 0) {
      return "# Selecione uma seção à esquerda";
    }
    const [secaoSlug, subSlug] = parts;
    const allSecoes = Object.values(secoesByGuia).flat();
    const sec = allSecoes.find(s => s.slug === secaoSlug);
    if (!sec) {
      return "# Seção não encontrada";
    }
    if (!subSlug) {
      return sec.conteudo || "";
    }
    const subs = subsecoesBySecao[sec.id] || [];
    const sub = subs.find(s => s.slug === subSlug);
    return sub?.conteudo || "# Sub-seção não encontrada";
  }, [parts, secoesByGuia, subsecoesBySecao]);

  const currentTitle = useMemo(() => {
    const partsList = parts || [];
    return [cursoSlug, ...partsList].join(" / ").replace(/-/g, " ");
  }, [cursoSlug, parts]);

  if (loading) {
    return <div className="p-8">Carregando…</div>;
  }
  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <GradientHeaderComponent
        academicCenter="Centro de Informática"
        courses={[
          "Ciência da Computação",
          "Engenharia da Computação",
          "Ciências de Dados e Inteligência Artificial",
        ]}
        currentCourse={cursoSlugToNome[cursoSlug as keyof typeof cursoSlugToNome] || "Curso"}
        onCourseChange={handleCourseChange}
      />

      <div className="flex md:flex-row w-full flex-col">
        <div className="relative w-[300px] hidden md:block">
          <GuideIndex cursoSlug={cursoSlug} guias={guiaTree} />
        </div>
        <div className="md:hidden pl-4 pt-4 pb-4">
          <Sheet key={"left"}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <AlignJustify size={12} />
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle className="pb-4">O que procura?</SheetTitle>
              </SheetHeader>
              <GuideIndex cursoSlug={cursoSlug} guias={guiaTree} />
            </SheetContent>
          </Sheet>
        </div>
        <div className="w-[1.5px] min-h-full bg-gray-500 opacity-30"></div>
        <div className="px-8 w-full overscroll-contain ">
          <MarkdownRenderer content={currentContent} title={currentTitle} />
        </div>
      </div>
    </div>
  );
}
