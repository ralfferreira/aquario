import React from 'react';
import TypeBadge from './Badges';
import PostCard from './PostCard';

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
    return (
        <div className="bg-white dark:bg-transparent dark:border-neutral-800 rounded-lg p-5 h-auto w-full shadow-md border-neutral-100 border-[1px]">
            <div className="flex-row justify-between pt-6 px-6 h-[375px]">
                <div className="flex flex-row gap-3 items-center">
                    <img className="w-24 h-24 object-cover rounded-full" src={profilePicture} alt="profile picture" />
                    <div className="pl-4">
                        <div className="flex flex-row gap-2 items-center pb-1">
                            <p className="text-3xl font-inter">{name}</p>
                            <TypeBadge type={type} size="small" /> 
                        </div>
                        <p className="text-lg text-neutral-500 font-inter">{description}</p>
                    </div>
                </div>
                <div className='flex pt-10'>
                    {projects.slice(0, 4).map((project, index) => (
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
