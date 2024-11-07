import React, { useState } from "react";
import { useTheme } from "next-themes"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchFilters() {
  const { theme } = useTheme(); 
  const [activeButton, setActiveButton] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollaborators, setSelectedCollaborators] = useState("");

  const isActive = (button: string) => activeButton === button;

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handleClear = () => {
    setSelectedCollaborators(""); 
  };

  // Determine os ícones de acordo com o tema
  const searchIcon = theme === "dark" ? "lupa_Dark.png" : "lupa.png";
  const filterIcon = theme === "dark" ? "list-filter_Dark.png" : "list-filter.png";

  return (
    <>
      <div className="flex flex-row justify-between text-neutral-800 items-center">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative w-68">
            <span className="absolute inset-y-0 flex items-center pl-3">
              <img src={searchIcon} alt="icon search" className="h-4 w-4 text-gray-400" />
            </span>
            <Input
              className="pl-10 text-xs h-8 bg-gray-50 border-[1.3px] border-gray-400 dark:bg-black dark:text-gray-200"
              type="text"
              placeholder="Pesquisar"
            />
          </div>

          <Button
            variant="outline"
            className={`rounded-full w-24 h-8 text-xs ${isActive("Todos") ? "bg-gray-200" : "bg-transparent border-transparent dark:text-gray-200 "}`}
            onClick={() => setActiveButton("Todos")}>
            Todos
          </Button>

          <Button
            variant="outline"
            className={`rounded-full w-28 h-8 text-xs ${isActive("Pessoais") ? "bg-gray-200" : "bg-transparent  dark:text-gray-200 border-transparent"}`}
            onClick={() => setActiveButton("Pessoais")}>
            Pessoais
          </Button>

          <Button
            variant="outline"
            className={`rounded-full w-32 h-8 text-xs ${isActive("Laboratórios") ? "bg-gray-200" : "bg-transparent dark:text-gray-200 border-transparent"}`}
            onClick={() => setActiveButton("Laboratórios")}>
            Laboratórios
          </Button>

          <Button
            variant="outline"
            className={`rounded-full w-32 h-8 text-xs ${isActive("Grupos e Ligas") ? "bg-gray-200" : "bg-transparent dark:text-gray-200 border-transparent"}`}
            onClick={() => setActiveButton("Grupos e Ligas")}>
            Grupos e Ligas
          </Button>
        </div>

        <Button
          variant="outline" 
          className="bg-gray-50 w-24 h-8 flex gap-2 text-xs rounded-full border-gray-400 dark:bg-black dark:text-gray-200 dark:hover:bg-neutral-800"
          onClick={toggleFilters}>
          <img src={filterIcon} alt="icon filter" className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div
        className={`mt-4 rounded-lg transition-shadow delay-100 ease-in-out ${
          showFilters ? 'translate-y-2' : '-translate-y-2'}`}>

        {showFilters && (
          <div className="flex flex-row gap-3">
            <div className="relative h-8">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <img src={searchIcon} alt="icon search" className="h-4 w-4 text-gray-400" />
              </span>
              <Input id="tag" type="text" placeholder="Pesquise por Tag" className="pl-10 text-xs h-8 bg-gray-50 border-[1.3px] border-gray-400 w-46 dark:bg-black dark:text-gray-200"/>
            </div>
            <div>
              <Select value={selectedCollaborators} onValueChange={setSelectedCollaborators}>
                <SelectTrigger className="text-xs text-gray-500 h-8 bg-gray-50 border-gray-400 w-46 dark:bg-black dark:text-gray-200">
                  <SelectValue placeholder="Número de colaboradores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1" className="text-xs">1</SelectItem>
                  <SelectItem value="2" className="text-xs">2</SelectItem>
                  <SelectItem value="3" className="text-xs">3</SelectItem>
                  <SelectItem value="4" className="text-xs">4</SelectItem>
                  <SelectItem value="5" className="text-xs">5+</SelectItem>
                  <SelectItem value="10" className="text-xs">10+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button onClick={handleClear} className="rounded-full w-28 h-8 text-xs bg-gray-200 text-gray-900 hover:bg-gray-100 hover:border dark:border dark:bg-black dark:text-gray-200 dark:hover:bg-neutral-800">
                Limpar
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
