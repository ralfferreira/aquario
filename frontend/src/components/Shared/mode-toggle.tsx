"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()


  if (!theme) {
    setTheme('light')
  }

  if (theme === 'dark') {
    return (
      <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
          <Moon className="text-white absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Mudar o tema</span>
      </Button>
    )
  } else {
    return (
      <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">Mudar o tema</span>
      </Button>
    )
  }

}
