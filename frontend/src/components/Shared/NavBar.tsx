'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { SearchBar1 } from "@/components/ui/searchbar1"
import LinkHover from "@/components/Shared/LinkHover"

import { ModeToggle } from "./mode-toggle";

export default function NavBar() {

  return (
    <>
      <nav
        className="fixed top-2 left-0 w-full text-light-text flex justify-between flex-col h-[60px]"
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <div className="flex space-x-4 gap-5 justify-center items-center">
            <LinkHover href="/blog">BLOG</LinkHover>
            <LinkHover href="/usuarios">USUÁRIOS</LinkHover>
            <LinkHover href="/projetos">PROJETOS</LinkHover>
            <LinkHover href="/tadea">TADEA</LinkHover>
            <LinkHover href="/faq">FAQ</LinkHover>
            <LinkHover href="/vagas">VAGAS</LinkHover>
          </div>

          <div className="flex space-x-4 gap-5 justify-center items-center">
            <Image className="w-20" src="/Image Card.png" width={75} height={75} alt="Aquario's logo"></Image>
          </div>

          <div className="flex space-x-4 gap-5 justify-center items-center">
            <SearchBar1 type="search" placeholder="Pesquisar"/>
            <LinkHover href="/sobre">SOBRE</LinkHover>
            <LinkHover href="/login">LOGIN</LinkHover>
            <ModeToggle/>
          </div>
        </div>
      </nav>
    </>
  );
}