"use client"

import { Bell, Edit, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState,useEffect
 } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useLogout } from "@/hooks/useLogout"

interface TopBarProps {
  title: string
  subtitle?: string
}

export function DashboardTopBar({ title, subtitle }: TopBarProps) {
  const [name, setName] = useState<string | null>(null)
  const [email,setEmail]=useState<string|null>(null)

  const handleLogout = useLogout()
    useEffect(() => {
      const fetchUser = async () => {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const data = await res.json()
          setName(data.user?.name ?? null)
          setEmail(data.user?.email ?? null)
          console.log(data)
        }
      }
      fetchUser()
    }, [])
  return (
    <div className="flex h-16 items-center justify-between bg-white border-b border-gray-100 px-8 md:px-12 lg:px-16">
      <div className="flex items-baseline gap-4">
        <h1 className="text-2xl font-bold text-[#1A1F36]">{title}</h1>
        {subtitle && (
          <>
            <div className="h-6 w-[1px] bg-border/50 mx-1 self-center" />
            <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>
          </>
        )}
      </div>

      <div className="flex items-center gap-6">
        <Link href="/dashboard/notifications">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#1A1F36] relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 border-2 border-background" />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 w-10 p-0 rounded-full hover:ring-2 hover:ring-emerald-500/30 transition-all outline-none"
            >
              <Avatar className="h-9 w-9 border border-white/10">
                <AvatarFallback className="bg-emerald-600 text-white text-sm font-bold">{name ? name.charAt(0).toUpperCase() : ""}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-[#1a1a1a] border-white/10 p-2 shadow-2xl">
            <DropdownMenuLabel className="px-2 py-3">
              <div className="flex flex-col space-y-1.5">
                <p className="text-sm font-semibold leading-none text-white">{name}</p>
                <p className="text-xs leading-none text-muted-foreground">{email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <div className="py-1">
              <DropdownMenuItem className="flex items-center px-2 py-2.5 text-sm text-zinc-400 focus:bg-white/10 focus:text-white cursor-pointer rounded-md">
                <Edit className="mr-3 h-4 w-4" />
                <Link href="/dashboard/profile">
                  <span>Edit Profile</span>
                </Link>
                
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center px-2 py-2.5 text-sm text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer rounded-md">
              <LogOut className="mr-3 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
