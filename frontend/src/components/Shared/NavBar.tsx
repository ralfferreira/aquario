'use client'

import React from "react";  
import Image from "next/image";

import { SearchBar1 } from "@/components/ui/searchbar1"
import LinkHover from "@/components/Shared/LinkHover"

import { ModeToggle } from "./mode-toggle";
import { ProfileButton } from "./ProfileButton";
import Link from "next/link";

export default function NavBar() {

  return (
    <>
      <nav
        className="fixed left-0 w-full text-light-text flex justify-between flex-col h-[60px] bg-white dark:bg-black z-50"
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <div className="flex space-x-4 gap-5 justify-center items-center">
            <LinkHover href="/blog">BLOG</LinkHover>
            <LinkHover href="/usuarios">USUÁRIOS</LinkHover>
            <LinkHover href="/projetos">PROJETOS</LinkHover>
            <LinkHover href="/tadea">TADEA</LinkHover>
            <LinkHover href="/vagas">VAGAS</LinkHover>
          </div>

          <div className="flex space-x-4 gap-5 justify-center items-center">
            <Link href="/">
              <Image className="w-20 ml-24" src="/Image Card.png" width={75} height={75} alt="Aquario's logo"/>
            </Link>
          </div>

          <div className="flex space-x-4 gap-5 justify-center items-center">
            <SearchBar1 type="search" placeholder="Pesquisar"/>
            <LinkHover href="/sobre">SOBRE</LinkHover>
            <ProfileButton />
            <ModeToggle/>
          </div>
        </div>
      </nav>
    </>
  );
}