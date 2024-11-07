import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';


export default function Usuarios() {
    return (
      <div className="h-[100vh] my-20 mx-36">
        <div className="w-full h-[40vh] flex justify-start items-center"> 
          <p className="pl-10 text-4xl">Procure Laboratórios, grupos acadêmicos, pessoas e outros</p>
          <div className=" w-full h-[40vh]"></div>
        </div>
        <div className="flex">
          <div className=" w-full h-[10vh] pl-10 flex justify-between items-center gap-10">
            <div className="">
              <Input className="w-[250px]" type="search" placeholder=" Pesquisar" />
            </div>
            <div className="hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-200 py-2 px-3 rounded-full flex items-center">
              <p>Laboratórios</p>
            </div>
            <div className="hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-all duration-200 py-2 px-3 rounded-full flex items-center">
              <p>Grupos e Ligas</p>
            </div>
            <div className="hover:bg-neutral-200 dark:hover:bg-neutral-800 ransition-all duration-200 py-2 px-3 rounded-full flex items-center">
                <p>Pessoas</p>
            </div>
          </div>
          <div className="w-[500px] h-[10vh]"></div>
        </div>
        
        <div className=" w-full h-[50vh] flex items-center">
          <p className="text-5xl"> Card depois</p>
        </div>
      </div>
    );
  }
  