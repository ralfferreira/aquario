import React from 'react';
import Image from 'next/image';

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"


// Interface defining the props for the ProfileComponent
interface PostProps {
  title: string;
  photo: string;
  name: string;
  votes: number;
  minutes: number;
  comments: number;
  type: string;
}

function PostComponent({ title, photo, name, votes, minutes, comments, type }: PostProps) {
  var text;
  if(minutes < 60) {
    if(minutes > 1){
      text = "Postado " + minutes + " minutos atrás";
    }
    else{
      text = "Postado " + minutes + " minuto atrás";
    }
  }
  else if(minutes < 1440) {
    var hours = Math.floor(minutes/60);
    if(hours > 1){
      text = "Postado " + hours + " horas atrás";
    }
    else{
      text = "Postado " + hours + " hora atrás";
    }
  }
  else {
    var days = Math.floor(minutes/1440);
    if(days > 1){
      text = "Postado " + days + " dias atrás";
    }
    else{
      text = "Postado " + days + " dia atrás";
    }
  }
  return (
    <div className="flex flex-col justify-around w-[500px]">
      <h3 className="h-4 mb-4 font-medium">{title}</h3>
      <div className="flex justify-between items-center">
        <Image className="object-none h-8 w-8 rounded-full" src={photo} width={30} height={30} alt={"Post Imagem"}/>
        <h4 className="text-md font-medium">{name}</h4>
        <Badge variant="default" className="h-5 bg-blue-600 hover:bg-blue-700">{type}</Badge>
        <p className="text-gray-600 text-sm">• {votes} votos</p>
        <p className="text-gray-600 text-sm">• {comments} comentários</p>
        <p className="text-gray-600 text-sm">• {text}</p>
      </div>
    </div>
  );
}

export default PostComponent;
