import React, { useState, useEffect } from 'react';
import TypeBadge from './Badges';
import PostCard from './ProjectCard';

interface User {
    name: string;
    image: string;
    type: "laboratorio" | "pessoa" | "oficial" | "grupo" | "externo";
}

interface Project {
    projectName: string;
    projectImage: string;
    users: User[];
}

interface UserCardProjectsProps {
    name: string;
    profilePicture: string;
    description: string;
    type: "laboratorio" | "pessoa" | "oficial" | "grupo" | "externo";
    site: string;
    projects: Project[];
}

const UserCardProjects: React.FC<UserCardProjectsProps> = ({ name, profilePicture, description, type, site, projects }) => {
    const [maxProjects, setMaxProjects] = useState(2);

    useEffect(() => {
        const updateMaxProjects = () => {
            if (window.innerWidth >= 1024) {
                setMaxProjects(3); // até 3 projetos para telas grandes (lg)
            } else if (window.innerWidth >= 768) {
                setMaxProjects(4); // até 4 projetos para telas médias (md)
            } else {
                setMaxProjects(2); // até 2 projetos para telas pequenas (sm)
            }
        };

        updateMaxProjects();
        window.addEventListener("resize", updateMaxProjects);
        return () => window.removeEventListener("resize", updateMaxProjects);
    }, []);

    return (
        <div className="bg-white dark:bg-transparent dark:border-neutral-800 rounded-lg p-5 h-auto w-full shadow-md border-neutral-100 border-[1px]">
            <div className="flex-row justify-between pt-6 px-6">
                <div className="flex flex-row gap-3 items-center">
                    <img className="w-24 h-24 object-cover rounded-full aspect-square" src={profilePicture} alt="profile picture" />
                    <div className="pl-4">
                        <div className="flex flex-row gap-2 items-center pb-1">
                            <p className="text-3xl font-inter">{name}</p>
                            <TypeBadge type={type} size="small" /> 
                        </div>
                        <p className="text-lg text-neutral-500 font-inter">{description}</p>
                    </div>
                </div>
                {/* Falta ainda tornar a grande div toda clicável para levar para a página do usuário*/}
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-10'>
                    {projects.slice(0, maxProjects).map((project, index) => (
                        <PostCard
                            key={index}
                            projectName={project.projectName}
                            projectImage={project.projectImage}
                            users={project.users}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserCardProjects;