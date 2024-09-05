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
              className="relative text-sm dark:text-dark-text hover:text-blue-500 group transition duration-300"
            >
              BLOG
              {/* <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-blue-500"></span> */}
              <span className="block absolute left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-blue-500 dark:bg-white dark:bg-white"></span>
            </Link>
            <Link
              href="/usuarios"
              className="relative text-sm dark:text-dark-text hover:text-blue-500 group transition duration-300"
            >
              USUÁRIOS
              <span className="block absolute left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-blue-500 dark:bg-white"></span>
            </Link>
            <Link
              href="/projetos"
              className="relative text-sm dark:text-dark-text hover:text-blue-500 group transition duration-300"
            >
              PROJETOS
              <span className="block absolute left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-blue-500 dark:bg-white"></span>
            </Link>
            <Link
              href="/tadea"
              className="relative text-sm dark:text-dark-text hover:text-blue-500 group transition duration-300"
            >
              TADEA
              <span className="block absolute left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-blue-500 dark:bg-white"></span>
            </Link>
            <Link
              href="/faq"
              className="relative text-sm dark:text-dark-text hover:text-blue-500 group transition duration-300"
            >
              FAQ
              <span className="block absolute left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-blue-500 dark:bg-white"></span>
            </Link>
          </div>

          <div className="flex space-x-4 gap-5 justify-center items-center">
            <Image className="w-20" src="/Image Card.png" width={75} height={75} alt="Aquario's logo"></Image>
          </div>

          <div className="flex space-x-4 gap-5 justify-center items-center">
            <SearchBar1 type="search" placeholder="Pesquisar"/>
            <Link
              href="/sobre"
              className="relative text-sm dark:text-dark-text hover:text-blue-500 group transition duration-300"
            >
              SOBRE
              <span className="block absolute left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-blue-500 dark:bg-white"></span>
            </Link>
            <Link
              href="/login"
              className="relative text-sm dark:text-dark-text hover:text-blue-500 group transition duration-300"
            >
              LOGIN
              <span className="block absolute left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-blue-500 dark:bg-white"></span>
            </Link>
            <ModeToggle/>
          </div>
        </div>
      </nav>
    </>
  );
}