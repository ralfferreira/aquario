'use client';

import Image from 'next/image';

export default function SobrePage() {
  return (
    <main className="container mx-auto max-w-4xl p-4 pt-24">
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight">Sobre o Aquário</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Conectando talentos e oportunidades no Centro de Informática da UFPB.
          </p>
        </div>

        <div className="relative h-96 w-full">
          <Image
            src="/lab.jpg" // Placeholder image
            alt="Laboratório do Centro de Informática"
            layout="fill"
            objectFit="cover"
            className="rounded-xl border"
          />
        </div>

        <div className="prose dark:prose-invert max-w-none text-lg">
          <h2>Nossa Missão</h2>
          <p>
            O Aquário é uma plataforma criada por e para a comunidade do Centro de Informática (CI) da Universidade Federal da Paraíba (UFPB). Nossa missão é centralizar e dar visibilidade às diversas oportunidades de desenvolvimento acadêmico e profissional que surgem no nosso centro, desde vagas de estágio e pesquisa até projetos inovadores e publicações científicas.
          </p>

          <h2>O Que Oferecemos?</h2>
          <ul>
            <li>
              <strong>Mural de Vagas:</strong> Um espaço para que laboratórios, grupos de pesquisa e empresas parceiras possam divulgar vagas de estágio, bolsas e oportunidades de trabalho para os nossos alunos.
            </li>
            <li>
              <strong>Vitrine de Projetos:</strong> Uma galeria para que alunos e professores possam exibir seus projetos, compartilhar conhecimento e encontrar novos colaboradores.
            </li>
            <li>
              <strong>Feed de Notícias:</strong> Mantenha-se atualizado com as últimas publicações, eventos e novidades do CI.
            </li>
          </ul>

          <h2>Para a Comunidade</h2>
          <p>
            Acreditamos no potencial da nossa comunidade. O Aquário é uma ferramenta para fortalecer nossos laços, estimular a colaboração e impulsionar o crescimento de todos. Explore, conecte-se e mergulhe nas oportunidades que o CI tem a oferecer.
          </p>
        </div>
      </div>
    </main>
  );
}