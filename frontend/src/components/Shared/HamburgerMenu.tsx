"use client";

import { useState } from "react";

import Image from "next/image";
import LinkHover from "@/components/Shared/LinkHover"

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
          // className="fixed top-0 left-0 w-full text-light-text flex justify-between flex-col h-[60px]"
          className="fixed w-full text-light-text flex justify-between flex-col h-[60px]"
        >
          <div className="container mx-auto flex items-center justify-around h-full">
            
            <div className="flex space-x-4 gap-5 justify-center items-center">
              <Image className="w-20" src="/Image Card.png" width={75} height={75} alt="Aquario's logo"></Image>
            </div>
            
            <div className="relative">
              {/* Icone do Hamburger */}
              <button
                className="flex flex-col space-y-2 focus:outline-none"
                onClick={toggleMenu}
              >
                <span
                  className={`block w-8 h-1 bg-neutral-800 dark:bg-neutral-50 transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block w-8 h-1 bg-neutral-800 dark:bg-neutral-50 transition-opacity duration-300 ease-in-out ${
                    isOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-8 h-1 bg-neutral-800 dark:bg-neutral-50 transition-transform duration-300 ease-in-out ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </button>

              {/* Menu */}
              <div
                className={`absolute top-12 left-0 bg-white dark:bg-neutral-800 shadow-md dark:shadow-neutral-400 rounded-md w-48 transition-all duration-300 ease-in-out ${
                  isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <ul className="flex flex-col p-4 space-y-2">
                  <li>
                    <LinkHover href="/blog">BLOG</LinkHover>
                  </li>
                  <li>
                    <LinkHover href="/usuarios">USUÁRIOS</LinkHover>
                  </li>
                  <li>
                    <LinkHover href="/projetos">PROJETOS</LinkHover>
                  </li>
                  <li>
                    <LinkHover href="/tadea">TADEA</LinkHover>
                  </li>
                  <li>
                    <LinkHover href="/faq">FAQ</LinkHover>
                  </li>
                  <li>
                    <LinkHover href="/sobre">SOBRE</LinkHover>
                  </li>
                  <li>
                    <LinkHover href="/login">LOGIN</LinkHover>
                  </li>
                  {/* Pesquisar?? */}
                </ul>
              </div>
            </div>
        </div>
      </nav>
    </>
  );
}
