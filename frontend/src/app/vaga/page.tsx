import { Button } from "@/components/ui/button";
import VagaProfileCard from "@/components/Shared/VagaProfileCard";

export default function Vagas() {
  const user = {
    name: "Mauro",
    image: "/ian.jpeg",
    type: "laboratorio" as "laboratorio",
    type2: "oficial" as "oficial",
    url: "https://www.google.com"
  };

  const VagaprofileCardProps = {
    type: "voluntario" as "voluntario",
    date: "2021-10-10",
    url: "https://www.google.com",
  }

  const post = {
    title: "UX/UI Designer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Sed nec sodales nisl. Donec vestibulum, ex et varius aliquet, mi justo tempor nulla, eget tincidunt dui nisl ut est. Sed sit amet semper tortor."
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Button className="self-start mb-6 rounded-full">Voltar</Button>

      <div className="flex flex-col md:flex-row md:w-4/5 items-center justify-between">
        <div className="self-start mb-4 md:mb-0 md:mr-6">
          <p className="text-gray-500 text-sm mb-2">Detalhes</p>
          <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{post.description}</p>
        </div>
        
        <div className="">
          <VagaProfileCard profileUser={user} type={VagaprofileCardProps.type} date={VagaprofileCardProps.date} url={VagaprofileCardProps.url}/>
        </div>
      </div>
    </main>
  );
}
