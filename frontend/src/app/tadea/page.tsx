import TadeaComponent from "@/components/Pages/Tadea/tadea";

export default function Tadea() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TadeaComponent
          index={1}
          title="Achados e Perdidos (garrafa)"
          message="Estes itens foram encontrados e estão à disposição na sala das Coordenações dos Cursos."
          timePostedInMinutes={30}
          images={["/ian.jpeg"]}
        />
        <TadeaComponent
          index={2}
          title="Achados e Perdidos (garrafa e carregador)"
          message="Estes itens foram encontrados e estão à disposição na sala das Coordenações dos Cursos."
          timePostedInMinutes={60}
          images={["/ian.jpeg", "/ian.jpeg"]}
        />
        <TadeaComponent
          index={3}
          title="Achados e Perdidos (garrafa, carregador, casaco)"
          message="Estes itens foram encontrados e estão à disposição na sala das Coordenações dos Cursos."
          timePostedInMinutes={100}
          images={["/ian.jpeg", "/ian.jpeg", "/ian.jpeg"]}
        />
      </main>
    );
  }
  