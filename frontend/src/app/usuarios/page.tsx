"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import UserCardProjects from '@/components/Shared/UserCardProjects';

export default function Usuarios() {
    const [activeTab, setActiveTab] = useState<'Laboratórios' | 'Grupos e Ligas' | 'Pessoas'>('Laboratórios');

    const projects = [
        {
            projectName: "Projeto 1",
            projectImage: "/lab.jpg",
            users: [
                { name: "User1", image: "/ian.jpeg", type: "pessoa" as const },
                { name: "User2", image: "/fotoTiago.jpeg", type: "pessoa" as const }
            ]
        },
        {
            projectName: "Projeto 2",
            projectImage: "/lab.jpg",
            users: [
                { name: "TRIL", image: "/logo-tril.png", type: "laboratorio" as const }
            ]
        },
        {
            projectName: "Projeto 3",
            projectImage: "/lab.jpg",
            users: [
                { name: "Github", image: "/git.jpeg", type: "externo" as const }
            ]
        },
        {
            projectName: "Projeto 4",
            projectImage: "/lab.jpg",
            users: [
                { name: "User5", image: "/fotoTiago.jpeg", type: "oficial" as const },
                { name: "User6", image: "/ian.jpeg", type: "pessoa" as const }
            ]
        }
    ];

    return (
        <div className="h-[100vh] my-20 mx-36">
            <div className="w-full h-[40vh] flex justify-start items-center"> 
                <p className="pl-10 text-4xl">Procure Laboratórios, grupos acadêmicos, pessoas e outros</p>
                <div className="w-full h-[40vh]"></div>
            </div>
            <div className="flex">
                <div className="w-full h-[10vh] pl-10 flex justify-between items-center gap-10">
                    <Input className="w-[250px]" type="search" placeholder="Pesquisar" />
                    <div className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${
                        activeTab === 'Laboratórios' ? 'bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]'
                    }`} onClick={() => setActiveTab('Laboratórios')}>
                        <p>Laboratórios</p>
                    </div>
                    <div className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${
                        activeTab === 'Grupos e Ligas' ? 'bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]'
                    }`} onClick={() => setActiveTab('Grupos e Ligas')}>
                        <p>Grupos e Ligas</p>
                    </div>
                    <div className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${
                        activeTab === 'Pessoas' ? 'bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]'
                    }`} onClick={() => setActiveTab('Pessoas')}>
                        <p>Pessoas</p>
                    </div>
                </div>
                <div className="w-[500px] h-[10vh]"></div>
            </div>
            
            <div className="w-full h-[40vh] flex flex-col gap-10">
              {/*Aqui depois deve fazer um map pra receber mais de um card*/}
              {/*Também depois tem que fazer um activeTab para laboratório, pessoa, etcetc*/}
                <UserCardProjects 
                    name="TRIL" 
                    profilePicture="/ian.jpeg" 
                    description="Technology, Research and Innovation Laboratory" 
                    type="laboratorio" 
                    site="https://www.google.com" 
                    projects={projects}
                />
            </div>
        </div>
    );
}
