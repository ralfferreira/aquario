import Checkbox from '@/components/Pages/Vagas/CheckBoxFilter';
import VacancyCard from '@/components/Pages/Vagas/VacancyCard';
import { SearchBar1 } from "@/components/ui/SearchBar1"

export default function Blog() {
  const vagas = [
    {
      profileUser: {
        name: "TRIL",
        image: "/ian.jpeg",
        type: "laboratorio",
        type2: "oficial",
        url: "https://tril.com.br",
        funcao: "UX/UI Designer"
      },
      type: "voluntario",
      url: "https://detalhes-da-vaga-tril.com"
    },
    {
      profileUser: {
        name: "Google",
        image: "/ian.jpeg",
        type: "externo",
        type2: "externo",
        url: "https://google.com",
        funcao: "Desenvolvedor"
      },
      type: "remunerado",
      date: "2024-11-01",
      url: "https://detalhes-da-vaga-google.com"
    }
  ];

  const vagasFiltradas = vagas.filter(vaga => {
    return vaga.profileUser.name.toLowerCase();
  });
  
  const data = [
    {
      titulo: 'Entidades',
      elementos: ['Laboratórios', 'Grupos e Ligas', 'UFPB', 'Externo'],
    },
    {
      titulo: 'Áreas',
      elementos: ['FrontEnd', 'BackEnd', 'Dados', 'Infraestrutura', 'Design', 'Pesquisa', 'Robótica', 'Otimização e Algoritmos'],
    },
    {
      titulo: 'None',
      elementos: ['Remunerado', 'Voluntário'],
    },
  ];

  return (
    <div className="flex p-5 gap-6 mt-12">
      <div className="hidden flex-col md:flex w-full md:w-3/4">
        <div className="mb-6 w-full">
          <SearchBar1 type='search' placeholder='Pesquisar' />
        </div>

        <div className="space-y-4 w-full">
          {vagasFiltradas.map((vaga, index) => (
            <VacancyCard 
              key={index} 
              profileUser={vaga.profileUser}
              type={vaga.type}
              url={vaga.url}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:flex w-full md:w-1/4">
        <Checkbox data={data} />
      </div>

      <div className="flex flex-col md:hidden w-full">
        <div className="mb-6 w-full">
          <SearchBar1 type='search' placeholder='Pesquisar' />
        </div>

        <div className="mb-6 w-full">
          <Checkbox data={data} />
        </div>

        <div className="space-y-4 w-full">
          {vagasFiltradas.map((vaga, index) => (
            <VacancyCard 
              key={index} 
              profileUser={vaga.profileUser}
              type={vaga.type}
              date={vaga.date}
              url={vaga.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}