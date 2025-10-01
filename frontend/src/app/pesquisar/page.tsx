'use client'

import { useSearchParams } from 'next/navigation';
import SearchPage from '@/components/Shared/SearchPage';

export default function Pesquisar() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <main className="container mx-auto">
      <SearchPage query={query} />
    </main>
  );
}
