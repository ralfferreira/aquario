import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"

export default function Login() {
  return (
    <div className="flex h-screen p-28">

      <div className="relative w-1/2 bg-sky-300 border-t-2 border-l-2 border-b-2 border-gray-200 rounded-l-2xl">
        <img 
          src="logo_removebg.png" 
          alt="Logo" 
          className="absolute top-0 left-0 m-4 w-20 h-20 object-contain"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center border-t-2 border-r-2 border-b-2 border-gray-200 rounded-r-2xl">
        <div className="max-w-md w-full space-y-6">
          <h1 className='text-4xl font-inter text-center font-bold	'>Faça seu login</h1>
          <p className='font-inter text-center'>Insira as mesmas credencias do Sigaa</p>

          <form className="flex flex-col items-center w-full">
  
            <div className="flex flex-col items-start w-96">
              <Label htmlFor="Nome">Usuário</Label>
              <Input className="mt-2 w-full" type="text" id="nome-de-usuario" placeholder="Usuário" />
            </div>

            <div className="flex flex-col items-start w-96 mt-4">
              <Label htmlFor="email">Senha</Label>
              <Input className="mt-2 w-full" type="password" id="senha" placeholder="Senha" />
            </div>

            <div className="flex justify-center w-full mt-6">
              <Button
                variant="outline"
                className="w-[100px] bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                >
                Entrar
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
