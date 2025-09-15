'use client';

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha no login');
      }

      const data = await response.json();
      login(data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2 bg-gray-50 dark:bg-transparent">
      <div className="grid w-full max-w-7xl h-[85vh] gap-0 lg:grid-cols-2 border border-gray-200 dark:border-gray-700 dark:bg-transparent rounded-lg overflow-hidden mt-12">
        <div className="relative hidden lg:flex items-center justify-center bg-sky-300 dark:bg-sky-800">
          <Image
            src="/logo_removebg.png"
            alt="Logo"
            width={96}
            height={96}
            className="absolute top-6 left-6 object-contain"
          />
        </div>

        <div className="flex items-center justify-center p-6 md:p-8 bg-white dark:bg-transparent">
          <form onSubmit={handleLogin} className="w-full max-w-md space-y-6 flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Faça seu login</h1>
              {/* <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                Insira as mesmas credenciais do SIGAA
              </p> */}
            </div>

            <div className="space-y-4 w-full max-w-xs">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@academico.ufpb.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>

            <p className="text-center text-sm">
              Não tem uma conta?{' '}
              <a href="/registro" className="font-semibold text-sky-500 hover:underline">
                Registre-se
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
