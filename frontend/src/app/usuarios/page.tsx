"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import UserCardProjects from '@/components/Shared/UserCardProjects';


export default function Usuarios() {

  const [activeTab, setActiveTab] = useState<'Laboratórios' | 'Grupos e Ligas' | 'Pessoas' >('Laboratórios');

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
            <div className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${
                        activeTab === 'Laboratórios' ? 'bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]'}`} 
                        onClick={() => setActiveTab('Laboratórios')}>
                        <p>Laboratórios</p>
                    </div>
            <div className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${
                        activeTab === 'Grupos e Ligas' ? 'bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent  border-[1px]'}`} 
                        onClick={() => setActiveTab('Grupos e Ligas')}>
                        <p>Grupos e Ligas</p>
                    </div>
            <div className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${
                        activeTab === 'Pessoas' ? 'bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]'}`} 
                        onClick={() => setActiveTab('Pessoas')}>
                        <p>Pessoas</p>
                    </div>
          </div>
          <div className="w-[500px] h-[10vh]"></div>
        </div>
        
        <div className=" w-full h-[50vh] flex flex-col gap-10">
          <p className="text-5xl"> Card depois</p>
          <UserCardProjects name="Nome" profilePicture="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fpt-br%2Fbusca%2Ffoto%2520de%2520perfil%2F&psig=AOvVaw3z8Xv2v3Y7l1qI1Qv5J7b9&ust=1635361771303000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNjg2J6WzvMCFQAAAAAdAAAAABAD" major="Major" type="pessoa" site="https://www.google.com" />
        </div>
      </div>
    );
  }
  