'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { ModeToggle } from "./mode-toggle";

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
              href="/guias"
              className="text-sm hover:underline dark:text-dark-text"
            >
              GUIAS
            </Link>
          </div>
          <div className="flex space-x-4 gap-5 justify-center items-center">
            <Link
              href="/test"
              className="text-sm hover:underline dark:text-dark-text"
            >
              TESTES
            </Link>
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