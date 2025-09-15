"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  urlFoto?: string | null;
}

interface ProjectCardProps {
  projeto: Projeto;
}

const stripHtml = (html: string) => {
  if (typeof window !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }
  return html;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ projeto }) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={projeto.urlFoto || '/lab.jpg'}
          alt={projeto.titulo}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="truncate">{projeto.titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{stripHtml(projeto.descricao)}</p>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;