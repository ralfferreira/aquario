import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SobrePage() {
  return (
    <main className="container mx-auto max-w-6xl p-4 pt-24">
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Logo do Aquário"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <h1 className="text-5xl font-bold tracking-tight">Sobre o Aquário</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Um projeto open source focado em centralizar informações relevantes para os alunos do Centro de Informática (CI) da UFPB.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/guias">Começar com os Guias</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://github.com/ralfferreira/aquario" target="_blank" rel="noopener noreferrer">
                Ver no GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Problem Statement */}
        <section className="bg-muted/50 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">O Problema que Resolvemos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-destructive">Antes do Aquário</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Falta de informação centralizada</li>
                <li>• Excesso de locais para buscar informações</li>
                <li>• Dificuldade de comunicação entre alunos, professores e laboratórios</li>
                <li>• Vagas perdidas em e-mails</li>
                <li>• Projetos sem visibilidade</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">Com o Aquário</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Informações centralizadas em um só lugar</li>
                <li>• Comunicação eficiente e organizada</li>
                <li>• Facilidade de acesso a oportunidades</li>
                <li>• Melhor organização de vagas e projetos</li>
                <li>• Comunidade conectada e colaborativa</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Funcionalidades</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="relative">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="text-xs">🚧 Em Desenvolvimento</Badge>
              </div>
              <CardHeader className="opacity-40">
                <CardTitle className="flex items-center gap-2">
                  📝 Blog & Publicações
                </CardTitle>
                <CardDescription>
                  Compartilhamento de conhecimento e informações
                </CardDescription>
              </CardHeader>
              <CardContent className="opacity-40">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Posts de usuários cadastrados</li>
                  <li>• Informações de centros acadêmicos</li>
                  <li>• Projetos pessoais e de laboratórios</li>
                  <li>• Dicas de veteranos e professores</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="text-xs">🚧 Em Desenvolvimento</Badge>
              </div>
              <CardHeader className="opacity-40">
                <CardTitle className="flex items-center gap-2">
                  🧪 Laboratórios & Projetos
                </CardTitle>
                <CardDescription>
                  Banco de dados de laboratórios verificados
                </CardDescription>
              </CardHeader>
              <CardContent className="opacity-40">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Contas verificadas de laboratórios</li>
                  <li>• Publicações de projetos detalhadas</li>
                  <li>• Informações de membros e tecnologias</li>
                  <li>• Casos de uso e soluções</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="text-xs">🚧 Em Desenvolvimento</Badge>
              </div>
              <CardHeader className="opacity-40">
                <CardTitle className="flex items-center gap-2">
                  💼 Vagas & Oportunidades
                </CardTitle>
                <CardDescription>
                  Central de vagas de estágio e emprego
                </CardDescription>
              </CardHeader>
              <CardContent className="opacity-40">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Vagas de estágio e monitoria</li>
                  <li>• Projetos voluntários</li>
                  <li>• Iniciação científica</li>
                  <li>• Redução de spam de e-mails</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="text-xs">🚧 Em Desenvolvimento</Badge>
              </div>
              <CardHeader className="opacity-40">
                <CardTitle className="flex items-center gap-2">
                  🔍 Achados e Perdidos
                </CardTitle>
                <CardDescription>
                  Sistema automatizado e manual
                </CardDescription>
              </CardHeader>
              <CardContent className="opacity-40">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Scraping automático de e-mails</li>
                  <li>• Adições manuais de itens</li>
                  <li>• Perfil oficial da Tadea</li>
                  <li>• Organização eficiente</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="default" className="text-xs bg-green-600 hover:bg-green-700">✅ Disponível</Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ❓ FAQ & Guias
                </CardTitle>
                <CardDescription>
                  Orientações para alunos iniciantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Guias sobre diversos assuntos</li>
                  <li>• Dúvidas e respostas frequentes</li>
                  <li>• Documentos importantes</li>
                  <li>• Orientações para períodos iniciais</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="text-xs">🚧 Em Desenvolvimento</Badge>
              </div>
              <CardHeader className="opacity-40">
                <CardTitle className="flex items-center gap-2">
                  🔗 Centralização
                </CardTitle>
                <CardDescription>
                  Tudo em um só lugar
                </CardDescription>
              </CardHeader>
              <CardContent className="opacity-40">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Informações do CI centralizadas</li>
                  <li>• Comunicação eficiente</li>
                  <li>• Facilidade de acesso</li>
                  <li>• Comunidade conectada</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Objective Section */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Objetivo</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            O objetivo do projeto Aquário é centralizar as informações do CI e oferecer uma solução eficiente para problemas de comunicação e disseminação de informações, facilitando o acesso e o compartilhamento de informações importantes entre todos os membros da comunidade acadêmica.
          </p>
        </section>

        {/* Open Source Section */}
        <section className="bg-muted/50 rounded-xl p-8 text-center space-y-6">
          <h2 className="text-3xl font-bold">Projeto Open Source</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            O Aquário é um projeto open source e as contribuições são muito bem-vindas! 
            Este projeto está licenciado sob a Licença MIT.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <a href="https://github.com/ralfferreira/aquario" target="_blank" rel="noopener noreferrer">
                Contribuir no GitHub
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="mailto:ralf.ferreira@academico.ufpb.br">
                Entrar em Contato
              </a>
            </Button>
          </div>
        </section>

        {/* Status Badge */}
        <div className="text-center">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            🚧 Projeto em Desenvolvimento - Mais funcionalidades em breve!
          </Badge>
        </div>
      </div>
    </main>
  );
}