"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/useAuthStore"
import { toast } from "react-hot-toast"

export function useLogout() {
  const router = useRouter()
  const clearUser = useAuthStore((s) => s.clearUser)

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!res.ok) throw new Error()

      clearUser()              // 🧹 clear Zustand
      router.replace("/login")      // 🔁 redirect to home
      toast.success("Logged out successfully")
    } catch {
      toast.error("Logout failed")
    }
  }

  return logout
}
