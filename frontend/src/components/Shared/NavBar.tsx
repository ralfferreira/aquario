'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchBar1 } from "@/components/ui/searchbar1"

import { ModeToggle } from "./mode-toggle";
import { IMAGES_MANIFEST } from "next/dist/shared/lib/constants";

export default function NavBar() {

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full text-light-text flex justify-between flex-col h-[60px]"
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <div className="flex space-x-4 gap-5 justify-center items-center">
            <Link
              href="/blog"
              className="text-sm hover:underline dark:text-dark-text"
            >
              BLOG
            </Link>
            <Link
              href="/usuarios"
              className="text-sm hover:underline dark:text-dark-text"
            >
              USUÁRIOS
            </Link>
            <Link
              href="/projetos"
              className="text-sm hover:underline dark:text-dark-text"
            >
              PROJETOS
            </Link>
            <Link
              href="/tadea"
              className="text-sm hover:underline dark:text-dark-text"
            >
              TADEA
            </Link>
            <Link
              href="/faq"
              className="text-sm hover:underline dark:text-dark-text"
            >
              FAQ
            </Link>
          </div>

          <div className="flex space-x-4 gap-5 justify-center items-center">
            <Image className="basis-20" src="/Image Card.png" width={75} height={75}></Image>
          </div>

          <div className="flex space-x-4 gap-5 justify-center items-center">
            <SearchBar1 type="search" placeholder="Pesquisar"/>
            <Link
              href="/sobre"
              className="text-sm hover:underline dark:text-dark-text"
            >
              SOBRE
            </Link>
            <Link
              href="/login"
              className="text-sm hover:underline dark:text-dark-text"
            >
              LOGIN
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}