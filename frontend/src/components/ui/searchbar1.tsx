import * as React from "react"

import { cn } from "@/lib/utils"
import { Search } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar1 = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div>

        {/* <div data-v-0ae55bb9="" class="search-bar">
          <div data-v-fadaa809="" data-v-a7a8d95a="" class="input-wrapper">
            <svg data-v-a7a8d95a="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input data-v-fadaa809="" type="search" class="input has-icon input-wrapper" placeholder="Search 1524 icons ...">
          </div>
        </div> */}


        <Search/>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
SearchBar1.displayName = "SearchBar1"

export { SearchBar1 }