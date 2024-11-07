import React from 'react';
import TypeBadge from './Badges';
import { Badge } from '../ui/badge';



interface User {
    name: string;
    profilePicture: string;
    major: string;
    type: "laboratorio" | "pessoa" | "oficial" | "grupo" | "externo";
    site: string;
  }

const  UserCard: React.FC<User> = ({ name, profilePicture, major, type, site }) => {

 return (
    <div className= "bg-gray-50 rounded-lg p-5 w-full border-[1.3px] border-gray-200">
    
        <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3 items-center">
                <img className="w-8 h-8 object-cover rounded-full" src={profilePicture} alt="profile picture" />
                <div>
                    <div className="flex flex-row gap-2 items-center ">
                        <p className="text-sm font-inter">{name}</p>
                        <TypeBadge type={type} size="small" /> 
                    </div>
                    <p className="text-xs text-neutral-700 font-inter">{major}</p>
                </div>
            </div>
            <div className='flex items-center'>
                <Badge className=""><a className="text-[11px] px-4" href={site}>Site</a></Badge>
            </div>
        </div>  
    </div>
 );

}

export default UserCard;
