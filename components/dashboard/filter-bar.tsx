"use client"

import { Search, ChevronDown, ListFilter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function FilterBar() {
  return (
    <div className="flex items-center gap-3 bg-background px-8 py-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-border bg-card/50 text-xs font-bold text-white hover:bg-card">
            Difficulty <ChevronDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48 bg-card border-border">
          <DropdownMenuItem className="text-xs text-white">Easy</DropdownMenuItem>
          <DropdownMenuItem className="text-xs text-white">Medium</DropdownMenuItem>
          <DropdownMenuItem className="text-xs text-white">Hard</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-border bg-card/50 text-xs font-bold text-white hover:bg-card">
            Access <ChevronDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48 bg-card border-border">
          <DropdownMenuItem className="text-xs text-white">Free</DropdownMenuItem>
          <DropdownMenuItem className="text-xs text-white">Premium</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-border bg-card/50 text-xs font-bold text-white hover:bg-card">
            Duration <ChevronDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48 bg-card border-border">
          <DropdownMenuItem className="text-xs text-white">Short (&lt; 10h)</DropdownMenuItem>
          <DropdownMenuItem className="text-xs text-white">Medium (10-50h)</DropdownMenuItem>
          <DropdownMenuItem className="text-xs text-white">Long (&gt; 50h)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search Tutorials"
          className="h-10 border-border bg-card/50 pl-10 text-xs font-medium text-white placeholder:text-muted-foreground focus-visible:ring-primary/30"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="outline"
          className="h-10 border-border bg-card/50 px-4 text-xs font-bold text-white hover:bg-card"
        >
          <ListFilter className="mr-2 h-4 w-4 rotate-180" />
          Sort
        </Button>
      </div>
    </div>
  )
}
