// Definição das props
interface LabHeaderProps {
    nome: string;
    subnome: string;
    imagemPerfil: string;
    imagemLaboratorio: string;
    numeroProjetos: number;
    numeroProjetosAtivos: number;
    numeroColaboradores: number;
    numeroColaboradoresAtivos: number;
    website: string;
  }
  
  export default function LabHeader({
    nome,
    subnome,
    imagemPerfil,
    imagemLaboratorio,
    numeroProjetos,
    numeroProjetosAtivos,
    numeroColaboradores,
    numeroColaboradoresAtivos,
    website,
  }: LabHeaderProps) {
    return (
      <div className="flex w-full justify-between h-[50vh] my-20 pt-5 px-[100px] items-center">
          <div className="flex flex-col max-w-[300px] gap-5 pt-[50px]">
              <img className="w-[8rem] h-[8rem] rounded-full object-cover" src={imagemPerfil} alt="Imagem de Perfil do Laboratório" />
              <p className="text-4xl font-bold">{nome}</p>
              <p className="text-3xl font-semibold">{subnome}</p>
              <div>
                <div className="flex gap-10 pb-2"> 
                    <p className="text-sm">{numeroProjetos} Projetos</p>
                    <p className="text-sm">{numeroProjetosAtivos} Projetos Ativos</p>
                </div>
                <div className="flex gap-10">
                    <p className="text-sm">{numeroColaboradores} Colaboradores</p>
                    <p className="text-sm">{numeroColaboradoresAtivos} Colaboradores Ativos</p>
                </div>
              </div>
              <div className="pt-5">
                    <div className="bg-black dark:bg-white dark:hover:bg-neutral-300 hover:bg-neutral-800 transition-all duration-200 py-2 w-32 flex justify-center rounded-full cursor-pointer">
                            <a href={website} className="text-xl text-white dark:text-black">Site</a>
                    </div> 
              </div>
          </div>
          <div className="flex items-center justify-center">
              <img className="w-[500px] rounded-xl" src={imagemLaboratorio} alt="Imagem do Laboratório" />
          </div>
      </div>
    );
  }