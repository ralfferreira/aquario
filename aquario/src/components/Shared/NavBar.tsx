'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";

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
              className="text-sm hover:underline"
            >
              BLOG
            </Link>
            <Link
              href="/usuarios"
              className="text-sm hover:underline"
            >
              USUÁRIOS
            </Link>
            <Link
              href="/projetos"
              className="text-sm hover:underline"
            >
              PROJETOS
            </Link>
            <Link
              href="/tadea"
              className="text-sm hover:underline"
            >
              TADEA
            </Link>
            <Link
              href="/guias"
              className="text-sm hover:underline"
            >
              GUIAS
            </Link>
          </div>
          <div className="flex space-x-4 gap-5 justify-center items-center">
            <Link
              href="/test"
              className="text-sm hover:underline"
            >
              TESTES
            </Link>
            <Link
              href="/sobre"
              className="text-sm hover:underline"
            >
              SOBRE
            </Link>
            <Link
              href="/login"
              className="text-sm hover:underline"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}