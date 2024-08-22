import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button"
  import Image from 'next/image';
  import ian from "/public/ian.jpeg" // Importing from SHADCN
  
  

const IanWithShadcn: React.FC = () => {
  return (
    <Card className='w-full min-w-[500px]'>
        <CardContent className='p-0'>
            <div className="grid grid-cols-[100px_1fr_200px] w-full">
            {/* image */}
                <div className='flex justify-center items-center'>
                    <Image width={60} height={60} className="w-[60px] h-[60px] rounded-full" src={ian.src} alt="profile picture" />
                </div>
                {/* name */}
                <div className='flex flex-col justify-start items-start'>
                    {/* upperbox */}
                    <div className='flex flex-row justify-end items-end mt-4 font-sans pt-[15px]'>
                        <h2 className="text-2xl font-light pr-[10px]">Ian Rocha Bittencourt</h2>
                        <p className="flex justify-center items-center bg-[#b8b8b8] text-base text-white rounded-lg w-[40px] h-[20px] mb-[3px]">PES</p>
                    </div>
                    {/* lowerbox */}
                    <div className='flex justify-center items-center text-base font-normal text-[#726e6e] font-sans mb-20px'>
                        <p className='mt-[5px] mb-[20px]'>Ciência da Computação</p>
                    </div>
                </div>
                {/* button */}
                <div className='flex justify-center items-center'>
                <Button className='w-[100px] rounded-[1.2rem]'>Site</Button>
                </div>
            </div>
        </CardContent>
    </Card>

  );
};

export default IanWithShadcn;
