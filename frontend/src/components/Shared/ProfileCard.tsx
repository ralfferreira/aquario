import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Monitor, CalendarDays } from 'lucide-react';

import TypeBadge from './Badges';

interface User {
  name: string;
  image: string;
  type: "laboratorio" | "pessoa" | "oficial" | "grupo" | "externo";
  url: string;
}

interface ProfileCardProps {
  profileUser: User;
  type: "voluntario" | "remunerado";
  date: string;
  url: string;
}

export default function ProfileCard({profileUser, type, date, url}: ProfileCardProps) {
  var newType;
  if(type === "voluntario")
    newType = "Voluntário";
  else if(type === "remunerado")
    newType = "Remunerado"
  return (
    <Card className="flex flex-col items-center gap-5 w-60">

      <CardHeader className="flex flex-col items-center pb-0">
        <CardTitle className="flex flex-col items-center gap-3">
          <Image src={profileUser.image} width={100} height={100} className="object-none h-16 w-16 rounded-full"/>
          <div className="flex justify-around gap-2">
            <h1>{profileUser.name}</h1>
            <div className="self-center flex justify-start">
              <TypeBadge type={profileUser.type} size="small"/>
            </div>
          </div>
        </CardTitle>
        <a href={profileUser.url} target="blank" className="pb-4">
          <CardDescription className="text-xs">Visitar perfil</CardDescription>
        </a>
        <TypeBadge type="oficial" size="large"/>
        <p className="text-[0.6rem] text-center">Esta vaga é para uma entidade oficial cadastrada no Aquario</p>
      </CardHeader>

      <hr className="w-44"/>

      <CardContent className="flex flex-col items-center pb-0 text-xs">
        <div className="flex justify-between gap-2">
          <Monitor className="w-4"/>
          <p className="self-center">{newType}</p>
        </div>
        <div className="flex justify-between gap-2">
          <CalendarDays className="w-4"/>
          <p className="self-center">Postado em {date}</p>
        </div>
      </CardContent>
      
      <hr className="w-44"/>

      <CardFooter className="flex justify-center">
        <a href={url} target="blank">
          <Button>Aplicar</Button>
        </a>
      </CardFooter>
      
    </Card>
  );
}