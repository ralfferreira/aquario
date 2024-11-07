import React from 'react';
import { Inter } from "next/font/google";
import OverlappingImages from './OverlappingImages';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TypeBadge from './Badges';
import { SquareArrowOutUpRight } from 'lucide-react';
import { Share } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  



interface User {
    name: string;
    image: string;
    type: "laboratorio" | "pessoa" | "oficial" | "grupo" | "externo";
  }
  
  interface ProjectCardProps {
    projectName: string;
    projectImage: string;
    users: User[];
  }

const inter = Inter({ subsets: ["latin"] });

function PostCard({ projectName, projectImage , users}: ProjectCardProps) {
    return (
        
        <div id='OuterCard' className='flexbox pl-5 w-[294px] h-[283.2px]' >
            {/* REMOVER PADDING */}
            <a href="https://google.com">
                <div className='relative'>
                    <div id='projectImage' className='rounded-xl w-full h-[207px] relative'>
                        <img src={projectImage} alt={projectName} className='h-full w-full rounded-xl absolute inset-0 object-cover' />
                    </div>
                    <div id='projectImageHover' className='w-full h-[207px] flex absolute inset-0 rounded-xl opacity-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent transition-opacity duration-300 ease-[ease] hover:opacity-100'>
                     
                        <div id='textHover' className='flex absolute bottom-4 left-4'>
                            <p  className={`text-white ${inter.className}`}>{projectName}</p>
                        </div>

                        <div id='circularTags' className='flex space-x-2 absolute bottom-4 right-4'>
                        <a href="https://google.com.br" target='_blank'>
                            <div className='bg-white rounded-full h-8 w-8 flex items-center justify-center transition-colors duration-300 ease-[ease] hover:bg-gray-300'> 
                                <SquareArrowOutUpRight className="h-4 w-4" />
                            </div>
                        </a>    
                            <div className='bg-white rounded-full h-8 w-8 flex items-center justify-center transition-colors duration-300 ease-[ease] hover:bg-gray-300'>
                            <Share className="h-4 w-4" />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </a>
      
            <div id='projectDetails' className='flex items-center w-full h-[34px] px-1 pt-3 '>
                <div id='leftArea' className='flex items-center'>
                <OverlappingImages users={users}></OverlappingImages>
                {users.length === 1 ? (
                    <Dialog>
                    <DialogTrigger className={`pl-2 text-[12px] ${inter.className}`}>{users[0].name}</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Autor do Projeto:</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                    </Dialog>) 
                :
                 (<Dialog>
                    <DialogTrigger className='pl-4  '>Grupo</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Participantes do Projeto:</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                    </Dialog>
                    )}
                <div className='pl-3 pb-[2px]'>
                        <TypeBadge type={users[0].type} size='small'/>
                    </div>
                </div>
                <div id='rightArea' className='flex items-center ml-auto text-gray-400'>
                    <PeopleAltIcon fontSize='large'/>
                    <p className='ml-1 text-lg'>{users.length}</p>
                </div>
                
            </div>


        </div>
        
    );
}

export default PostCard;