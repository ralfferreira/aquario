import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";

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
  if(type === "voluntario")
    type = "Voluntário";
  else if(type === "remunerado")
    type = "Remunerado"
  return (
    <Card>
      <CardHeader className="flex flex-col items-center">
        <CardTitle>
          <Image src={profileUser.image} width={100} height={100}></Image>
          <div className="flex justify-around">
            <h1>{profileUser.name}</h1>
            <TypeBadge type={profileUser.type} size="small"></TypeBadge>
          </div>
        </CardTitle>
        <a href={profileUser.url}target="blank"><CardDescription>Visitar perfil</CardDescription></a>
        <p>Oficial</p>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <p>{type}</p>
        <p>Postado em {date}</p>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <a href={url} target="blank"><Button>Aplicar</Button></a>
      </CardFooter>
    </Card>
  );
}