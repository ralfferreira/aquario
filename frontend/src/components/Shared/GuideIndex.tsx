import * as React from "react";
import { Inter } from "next/font/google";


interface Page {
  nomedapagina: string;
  id: number;
}

interface Section {
  [key: string]: Page[];
}

interface GuideIndexProps {
  data: Section[]; 
}

const inter = Inter({ subsets: ["latin"] });

export const GuideIndex: React.FC<GuideIndexProps> = ({ data }) => {
  return (
    <div className="flex h-[100vh] overflow-y-auto ">
        <div className={`space-y-4 w-full top-0 left-0 p-4 ${inter.className}`}>
        {data.map((section, sectionIndex) => {
            return (
            Object.keys(section).map((sectionName) => (
                <div key={sectionName + sectionIndex}>
                <p className="text-sm mb-1 ml-6 text-gray-500">{sectionName}</p>
                    {section[sectionName].map((page) => (
                    <a href="https://google.com"><p key={page.id} className="ml-6 py-1.5 hover:underline">{page.nomedapagina}</p></a>
                    ))}
                    <div key={sectionName + sectionIndex + '1'} className="h-[1.5px] w-full rounded bg-gray-500 opacity-30 mt-2 ml-2"></div>
                </div>
            ))
            );
        })}
        </div>
        
    </div>
    
  );
};

export default GuideIndex;