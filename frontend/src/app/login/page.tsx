import React from 'react';
import { LoginForm } from '@/components/ui/login-form';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen p-2 bg-gray-50 dark:bg-transparent ">
      <div className="grid w-full max-w-7xl h-[85vh] gap-0 lg:grid-cols-2 border border-gray-200 dark:border-gray-700 dark:bg-transparent rounded-lg overflow-hidden mt-12">
        <div className="relative hidden lg:flex items-center justify-center bg-sky-300 dark:bg-sky-800">
          <img
            src="logo_removebg.png"
            alt="Logo"
            className="absolute top-6 left-6 w-24 h-24 object-contain"
          />
        </div>

        {/* Formulário de Login */}
        <div className="flex items-center justify-center p-6 md:p-8 bg-white dark:bg-transparent">
          <div className="w-full max-w-md space-y-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">Faça seu login</h1>
            <p className="text-center text-sm text-muted-foreground dark:text-muted-foreground">
              Insira as mesmas credenciais do SIGAA
            </p>
            <div className="space-y-4 w-full flex flex-col items-center">
              <input
                type="text"
                placeholder="Usuário"
                className="w-full max-w-xs px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 hover:ring-2 hover:ring-sky-500/50 dark:bg-transparent dark:text-white dark:border-gray-600 dark:focus:ring-sky-400 transition duration-300 ease-in-out"
              />
              <input
                type="password"
                placeholder="Senha"
                className="w-full max-w-xs px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 hover:ring-2 hover:ring-sky-500/50  dark:bg-transparent dark:text-white dark:border-gray-600 dark:focus:ring-sky-400 transition duration-300 ease-in-out"
              />
              <button className="w-full max-w-xs px-4 py-2 text-sm font-medium text-white bg-sky-500 dark:bg-sky-800 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
