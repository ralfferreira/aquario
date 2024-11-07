// OutraPagina.tsx
"use client";
import LabHeader from "@/components/Pages/Users/labCard";
import PostCard from "@/components/Shared/PostCard";
import UserCard from "@/components/Shared/UserCard";
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import { CalendarCog } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Globe } from 'lucide-react';
import PostCardTitle from "@/components/Shared/PostCardTitle";


export default function Perfil() {
    const [activeTab, setActiveTab] = useState<'Projetos' | 'Pessoas' | 'Sobre' | 'Publicações'>('Projetos');
    const [activeTab2, setActiveTab2] = useState<'Alunos' | 'Professores'>('Alunos');
    const users = [{ name: "TRIL", image: "/lab.jpg", type: "laboratorio" as const, website: "tril.ci.ufpb.br", room: "CI - 307", foundDate: "08/2015" }];

    const especializacoes = [
      "Carbono",
      "LLM",
      "ChatBots",
      "IA Generativa",
      "Pesquisa",
      "Matemática",
      "Física"
  ];

    const description = `Bro ipsum dolor sit amet aCL pipe steed, death cookies groomer moguls back country clean over the bars frontside fatty gaper gorby. Betty dirtbag groomer north shore face plant caballerial crank misty piste laps bonk flow. Wheelie yard sale gondy chain ring stoked. Brain bucket 360 dope bail, stoked line travel huck Whistler ride twister 180 stunt.

Rip bear trap steed, whip free ride apres pow pow white room Whistler shred. Derailleur phat dope bomb hole bro whip. Endo saddle wheelie drop pow pow poaching switch. Epic Whistler ollie, huck liftie yard sale bunny slope yard sale groomer greasy hero schwag stomp brain bucket. Fatty heli dirt afterbang pillow popping face plant, backside chowder chillax Whistler backside.

Glades bunny slope deck 180 glades freshies over the bars north shore bowl spread eagle. Slash flow face shots grip tape free ride ACL first tracks pow pow. Brain bucket method gnar steed rail frontside hot dogging back country endo free ride giblets grind taco glove face shots huckfest. Dirtbag slash titanium brain bucket sucker hole ripper line face shots. Snowboard ripper death cookies, steed yard sale core shot cork. Grunt clipless groomer death cookies wheelie schwag T-bar. Bomb hole dust on crust huck, table top dirt flow snake bite hardtail acro berm.`;
    
    const professores = [
        { name: "Moisés", image: "/ian.jpeg" },
        { name: "Gustavo", image: "/fotoTiago.jpeg" }
    ];

    const alunos = [
        { name: "Ian", image: "/ian.jpeg" },
        { name: "Tiago", image: "/fotoTiago.jpeg" },
        { name: "João", image: "/ian.jpeg" },
        { name: "Ana", image: "/fotoTiago.jpeg" }
    ];

    const posts = [
        { title: "Teste", votes: 10, minutes: 5, comments: 3, user: users[0] },
        { title: "Teste 2", votes: 5, minutes: 10, comments: 2, user: users[0] },
        { title: "Teste 3", votes: 15, minutes: 15, comments: 5, user: users[0] },
        { title: "Teste 4", votes: 20, minutes: 20, comments: 10, user: users[0] }
    ];

    const projetos = [
        { name: "Projeto Trilzada", image: "/fotoTiago.jpeg" },
        { name: "Projeto Tril", image: "/ian.jpeg" },
        { name: "Projeto Trilha", image: "/fotoTiago.jpeg" },
        { name: "Davi Nasiasene", image: "/ian.jpeg" }
    ];

    return (
        <div className="mt-20">
            <div className="">
                <LabHeader
                    nome="TRIL"
                    subnome="Technology, Research and Innovation Laboratory"
                    imagemPerfil="/git.jpeg"
                    imagemLaboratorio="/lab.jpg"
                    numeroProjetos={5}
                    numeroProjetosAtivos={3}
                    numeroColaboradores={10}
                    numeroColaboradoresAtivos={7}
                    website="https://tril.ci.ufpb.br"
                />
            </div>
            <div className="flex">
                <div className="w-full h-[10vh] pl-12 flex gap-12 justify-start items-center pt-5">
                    <div
                        className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${
                          activeTab === 'Projetos' ? 'bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]'
                      }`} 
                        onClick={() => setActiveTab('Projetos')}>
                        <p>Projetos</p>
                    </div>
                    <div
                        className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${
                          activeTab === 'Pessoas' ? 'bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]'
                      }`} 
                        onClick={() => setActiveTab('Pessoas')}>
                        <p>Pessoas</p>
                    </div>
                    <div
                        className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${
                          activeTab === 'Sobre' ? 'bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]'
                      }`} 
                        onClick={() => setActiveTab('Sobre')}>
                        <p>Sobre</p>
                    </div>
                    <div
                        className={`transition-all duration-200 py-2 px-10 rounded-full flex items-center cursor-pointer ${
                          activeTab === 'Publicações' ? 'bg-neutral-200 dark:bg-neutral-800 border-neutral-400 border-[1px]' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800  hover:border-neutral-300 border-transparent border-[1px]'
                      }`} 
                        onClick={() => setActiveTab('Publicações')}>
                        <p>Publicações</p>
                    </div>
                </div>
            </div>

            <div className="w-full h-[1px] bg-slate-400 opacity-40"></div>

            <div className="h-[85vh]">
                {activeTab === 'Projetos' && (
                    <div className="mx-12 pt-12">
                      <p className="pl-10 text-3xl font-semibold">Projetos</p>
                      <div className="flex gap-10 justify-center items-center pt-10">
                      {projetos.map((projeto, index) => (
                                        <PostCard projectName={projeto.name} projectImage={projeto.image} users={users} />
                                    ))}
                      </div> 
                    </div>
                )}

                {activeTab === 'Pessoas' && (
                    <div className="mx-12 pt-12">
                        <div className="flex"> 
                            <div
                                className="py-2 px-10 flex items-center cursor-pointer relative"
                                onClick={() => setActiveTab2('Alunos')}
                            >
                                <p className={`text-3xl hover:text-neutral-800 hover:underline transition-all duration-150 relative ${
                                      activeTab2 === 'Alunos' ? 'underline font-bold' : ''}`} >
                                    Alunos
                                </p>
                            </div>  
                            <div
                                className="py-2 px-10 rounded-full flex items-center cursor-pointer"
                                onClick={() => setActiveTab2('Professores')}
                            >
                                <p className={`text-3xl hover:text-neutral-800 hover:underline transition-all duration-150 relative ${
                                      activeTab2 === 'Professores' ? 'underline font-bold' : ''}`} >
                                    Professores
                                </p>
                            </div> 
                        </div>

                        {activeTab2 === 'Alunos' && (
                            <div className="flex flex-wrap gap-4 items-center justify-center mx-12 pt-10">
                                    {alunos.map((aluno, index) => (
                                      <div className="flex justify-center items-center">
                                        <UserCard
                                            key={index}
                                            name={aluno.name}
                                            profilePicture={aluno.image}
                                            major="Aluno"
                                            type="pessoa"
                                            site=""
                                        />
                                      </div> 
                                    ))}            
                            </div>
                        )}
                        {activeTab2 === 'Professores' && (
                            <div className="flex flex-wrap gap-4 items-center justify-center mx-12 pt-10">
                                    {professores.map((professor, index) => (
                                      <div className="flex justify-center items-center">
                                        <UserCard
                                            key={index}
                                            name={professor.name}
                                            profilePicture={professor.image}
                                            major="Professor"
                                            type="pessoa"
                                            site=""
                                        />
                                      </div>
                                    ))}              
                            </div>
                        )}


                    </div>
                )}

                {activeTab === 'Sobre' && (
                    <div className="mx-[225px] pt-12">
                        <div className="w-full h-[70vh] flex">
                          <div className="flex flex-col w-4/6 h-full">
                            <p className="text-2xl">Descrição</p>
                            <p style={{ whiteSpace: "pre-line" }} className="text-xl font-light pt-2">{description}</p>
                            
                          
                            <div className="mt-auto flex-col items-center  h-auto w-full pt-4">
                              <p className="text-2xl">Especializações</p>
                              <div className="flex flex-wrap items-center gap-4 pt-6">
                                {especializacoes.map((especializacao, index) => (
                                  <div key={index} className="bg-neutral-200 dark:bg-neutral-800 rounded-full py-2 px-6 transition-colors duration-300 ease-[ease] hover:bg-gray-300 dark:hover:bg-gray-800">
                                    <p className="text-xs">{especializacao}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col w-2/6 h-full pl-10">
                            <div className="flex flex-col gap-6 pt-10">
                                <p className="font-light inline-flex items-center gap-4"> <MapPin className="w-5 h-5" /> {users[0].room}</p>
                                <p className="font-light inline-flex items-center gap-4"><CalendarDays className="w-5 h-5"/> Fundado em {users[0].foundDate}</p>
                                <p className="font-light inline-flex items-center gap-4"><CalendarCog className="w-5 h-5"/> Cadastrado em 10/2024</p>
                            </div>

                            <div className="mt-auto flex flex-col gap-4">
                                <p className="text-xl">Mídia</p>
                                <p className="font-light inline-flex items-center gap-4"><Globe className="w-5 h-5"/>{users[0].website}</p>
                                <p className="font-light inline-flex items-center gap-4"><Linkedin className="w-5 h-5"/>Linkedin</p>
                                <p className="font-light inline-flex items-center gap-4"><Instagram className="w-5 h-5"/>Instagram</p>
                            </div>
                          </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Publicações' && (
                    <div className="mx-12 pt-12">
                      <p className="pl-10 text-3xl font-semibold">Publicações</p>
                        <div className="flex flex-col gap-10 justify-center items-center h-auto w-full pt-10">
                          {posts.map((post, index) => (
                            <div className="border-neutral-100 dark:border-neutral-800 rounded-xl border-[1px] px-5 py-2 pt-3 shadow-md">
                              <PostCardTitle
                                  key={index}
                                  postTitle={post.title}
                                  numVotes={post.votes}
                                  numMinutes={post.minutes}
                                  numComments={post.comments}
                                  postUser={post.user}
                              />
                            </div>
                        ))}
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
}
