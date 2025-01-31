"use client";

import PostCardTitle from "@/components/Shared/ProjectCardTitle";
import SearchFilters from "@/components/Shared/SearchFilters";
import Banner from "@/components/Shared/Banner";

interface User {
  name: string;
  image: string;
  type: "laboratorio" | "pessoa" | "oficial" | "grupo" | "externo";
}

interface PostCardTitleProps {
  postTitle: string;
  numVotes: number;
  numMinutes: number;
  numComments: number;
  postUser: User;
}

const postCardTitles: PostCardTitleProps[] = [
  {
    postTitle: "Introduction to AI",
    numVotes: 24,
    numMinutes: 5,
    numComments: 12,
    postUser: { name: "Alice", image: "https://picsum.photos/50?random=1", type: "pessoa" },
  },
  {
    postTitle: "Understanding Data Structures",
    numVotes: 15,
    numMinutes: 10,
    numComments: 8,
    postUser: { name: "Bob", image: "https://picsum.photos/50?random=2", type: "laboratorio" },
  },
  {
    postTitle: "The Future of Quantum Computing",
    numVotes: 32,
    numMinutes: 7,
    numComments: 22,
    postUser: { name: "Carlos", image: "https://picsum.photos/50?random=3", type: "oficial" },
  },
  {
    postTitle: "Exploring Neural Networks",
    numVotes: 40,
    numMinutes: 12,
    numComments: 30,
    postUser: { name: "Diana", image: "https://picsum.photos/50?random=4", type: "grupo" },
  },
  {
    postTitle: "Blockchain Basics",
    numVotes: 18,
    numMinutes: 6,
    numComments: 15,
    postUser: { name: "Evelyn", image: "https://picsum.photos/50?random=5", type: "externo" },
  },
];

export default function Blog() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="space-y-6 flex flex-col">
        <div className="pt-28">
          <Banner
            title="Explore o que as pessoas, laboratórios e grupos do CI estão falando"
            description="Nosso blog é feito para que todos possamcomunicar notícias, dúvidas e tutoriais para todosos alunos e colaboradores do Centro de Informática"
            buttonText="Fazer uma postagem"
          />
        </div>
        <SearchFilters />
        <div className="space-y-6 min-h-screen flex flex-col w-full gap-6 ">
        {postCardTitles.map((post, index) => (
          <PostCardTitle
            key={index}
            postTitle={post.postTitle}
            numVotes={post.numVotes}
            numMinutes={post.numMinutes}
            numComments={post.numComments}
            postUser={post.postUser}
          />
        ))}
      </div>
      </div>
    </main>
  );
}
