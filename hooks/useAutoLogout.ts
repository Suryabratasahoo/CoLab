// hooks/useAutoLogout.ts
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/useAuthStore"

export function useAutoLogout() {
  const router = useRouter()
  const clearUser = useAuthStore((s) => s.clearUser)

  useEffect(() => {
    let interval: NodeJS.Timeout

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        })

        if (res.status === 401) {
          clearUser()
          router.replace("/")
        }
      } catch {
        clearUser()
        router.replace("/")
      }
    }

    // 🔁 Check every 30 seconds
    interval = setInterval(checkAuth, 30_000)

    return () => clearInterval(interval)
  }, [clearUser, router])
}
