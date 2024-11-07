import Image from "next/image";
import { Monitor } from 'lucide-react';

import { Card } from "@/components/ui/card";
import TypeBadge from '@/components/Shared/Badges';

interface User {
  name: string;
  image: string;
  type: "laboratorio" | "pessoa" | "oficial" | "grupo" | "externo";
  type2: "oficial" | "externo";
  url: string;
  funcao: string;
}

interface ProfileCardProps {
  profileUser: User;
  type: "voluntario" | "remunerado";
  url: string;
  funcao: string;
}

export default function VacancyCard({ profileUser, type, url }: ProfileCardProps) {
  const newType = type === "voluntario" ? "Voluntário" : "Remunerado";

  return (
    <Card className="flex flex-row items-center p-4 w-full gap-4 border border-gray-200 rounded-lg shadow-sm cursor-pointer transition-all hover:border-gray-400 group dark:border-gray-400 dark:hover:border-gray-200">
      <div className="flex-shrink-0">
        <Image 
          src={profileUser.image} 
          width={50} 
          height={50} 
          className="rounded-full object-cover w-12 h-12"
          alt={profileUser.name}
        />
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold group-hover:underline">{profileUser.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{profileUser.funcao}</p>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <TypeBadge type={profileUser.type} size="large" />
            
            <div className="flex items-center text-gray-500 text-sm dark:text-gray-400">
              <Monitor className="w-4 h-4 mr-1" />
              <p>{newType}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}