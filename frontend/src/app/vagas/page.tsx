import { Button } from "@/components/ui/button";
import VagaProfileCard from "@/components/Shared/VagaProfileCard";

export default function Vagas() {
  const user = {
    name: "Mauro",
    image: "/ian.jpeg",
    type: "laboratorio",
    type2: "oficial",
    url: "https://www.google.com"
  };

  const VagaprofileCardProps = {
    type: "voluntario",
    date: "2021-10-10",
    url: "https://www.google.com",
  }

  const post = {
    title: "UX/UI Designer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Sed nec sodales nisl. Donec vestibulum, ex et varius aliquet, mi justo tempor nulla, eget tincidunt dui nisl ut est. Sed sit amet semper tortor."
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Button className="self-start mb-6">Voltar</Button>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
        <div className="md:col-span-5">
          <p className="text-gray-500 text-sm mb-2">Detalhes</p>
          <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{post.description}</p>
        </div>
        
        <div className="md:col-span-3 flex flex-col items-center">
          <VagaProfileCard profileUser={user} type={VagaprofileCardProps.type} date={VagaprofileCardProps.date} url={VagaprofileCardProps.url}/>
        </div>
      </div>
    </main>
  );
}

// export default function Vagas() {
//     return (
//       <main className="flex min-h-screen flex-col items-center justify-between p-24">
//         <p>Vagas Page</p>
//         <Button>Voltar</Button>
//       </main>
//     );
//   }
  