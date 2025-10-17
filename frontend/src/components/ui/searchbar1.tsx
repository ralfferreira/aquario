import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar1 = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && query.trim() !== "") {
        router.push(`/pesquisar?q=${query}`);
      }
    };
    return (
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 dark:text-zinc-300" />
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-full border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            "dark:border-zinc-300 dark:text-zinc-300 dark:placeholder:text-zinc-300",
            className
          )}
          ref={ref}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          {...props}
        />
      </div>
    );
  }
);
SearchBar1.displayName = "SearchBar1";

export { SearchBar1 };
