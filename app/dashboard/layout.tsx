"use client"

import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { useEffect } from "react"
import { connectSocket } from "@/lib/socket"
import { useRequestSocket } from "@/hooks/useRequestSocket"
import { useAuthStore } from "@/stores/useAuthStore"
import { useAutoLogout } from "@/hooks/useAutoLogout"



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const setUserId = useAuthStore((s) => s.setUserId)

  useAutoLogout()
  useEffect(() => {
      const fetchUser = async () => {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const data = await res.json()
          setUserId(data.user.id)
          connectSocket(data.user?.id)
        }
      }
      fetchUser()
    }, [])
    useRequestSocket()
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto scrollbar-hide">{children}</main>
    </div>
  )
}
