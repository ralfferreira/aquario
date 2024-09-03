import React from 'react';
import { Inter } from "next/font/google";
import { Monitor } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


// Interface defining the props for the ProfileComponent
interface HeaderProps {
    academicCenter: string;
    courses: string[];
    currentCourse: string;
}

const inter = Inter({ subsets: ["latin"] });

function GradientHeaderComponent({ academicCenter, courses , currentCourse}: HeaderProps) {
    const [selectedCourse, setSelectedCourse] = React.useState(currentCourse
);
    return (
        <div className='flex justify-start items-center w-full h-[100px] mt-[60px] bg-gradient-to-r from-violet-500 to-[#C450DE] dark:bg-gradient-to-r dark:from-violet-500 dark:to-[#C450DE]'>
            <div className='pl-[24px] flex text-white'>
                <Monitor />
                <p className={`text-2xl pl-4 pr-4 ${inter.className}`}>{academicCenter
        }</p>
                <div className='flex flex-col items-center justify-center'>
                    <div className='pl-4 bg-white h-[1px] w-5'></div>
                </div>
                <div className='pl-4'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className={`text-2xl ${inter.className} hover:underline`}>
                            <div className='flex'>
                                {selectedCourse} <ChevronDown />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Cursos</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {courses.map((course, index) => (
                                <DropdownMenuItem key={index} onClick={()=>setSelectedCourse(course)} className={`${inter.className}`}>{course}</DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}

export default GradientHeaderComponent;