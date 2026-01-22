"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Users, PlusCircle, UsersRound, Inbox, User, HelpCircle, LogOut, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/useAuthStore"
import { useLogout } from "@/hooks/useLogout"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Find Teams", href: "/dashboard/find-teams", icon: Users },
  { name: "Create Post", href: "/dashboard/create-post", icon: PlusCircle },
  { name: "My Teams", href: "/dashboard/my-teams", icon: UsersRound },
  { name: "Requests", href: "/dashboard/requests", icon: Inbox },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Profile", href: "/dashboard/profile", icon: User },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const router=useRouter()
  const clearUser=useAuthStore((s)=>s.clearUser)

  const handleLogout=useLogout()

  return (
    <div className="flex h-screen w-20 flex-col items-center border-r border-gray-100 bg-white py-8 z-50">
      {/* Logo */}
      <Link href="/dashboard" className="mb-12">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-teal-500 text-white font-bold text-xl shadow-lg shadow-teal-500/20">
          C
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300",
                isActive
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600",
              )}
              title={item.name}
            >
              <item.icon className="h-6 w-6" />
              {/* Tooltip hint or active indicator could go here */}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-6 mt-auto pt-6 border-t border-gray-100 w-full">
        <button onClick={handleLogout} className="cursor-pointer flex h-12 w-12 items-center justify-center rounded-2xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
