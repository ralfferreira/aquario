import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="container mx-auto p-4 pt-24">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-6xl font-bold tracking-tight">Bem-vindo ao Aquário</h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Seu hub de oportunidades, projetos e conexões no Centro de Informática da UFPB.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/guias">Começar com os Guias</Link>
          </Button>
        </div>
      </section>

      {/* Project Status Section */}
      <section className="text-center py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Projeto em Desenvolvimento</h2>
          <p className="text-lg text-muted-foreground mb-8">
            O Aquário é um projeto em constante evolução. Em breve, teremos mais páginas e
            funcionalidades disponíveis.
          </p>
          <div className="bg-muted/50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Para Estudantes que Precisam de Ajuda</h3>
            <p className="text-muted-foreground mb-6">
              Nossos guias são o melhor lugar para começar! Encontre orientações, dicas e recursos
              que vão te ajudar em sua jornada acadêmica no Centro de Informática.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="/guias">Explorar Guias</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
