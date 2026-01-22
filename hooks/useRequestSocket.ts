"use client"

import { useEffect } from "react"
import { getSocket } from "@/lib/socket"
import { useRequestStore } from "@/stores/useRequestStore"
import type { JoinRequest } from "@/stores/useRequestStore"

export const useRequestSocket = () => {
  const addIncoming = useRequestStore((s) => s.addIncoming)
  const updateStatus = useRequestStore((s) => s.updateStatus)

  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    // 🟢 New request → owner
    socket.on("request:new", (request: JoinRequest) => {
      addIncoming(request)
    })

    // 🔴 Rejected → requester
    socket.on(
      "request:rejected",
      ({ requestId }: { requestId: string }) => {
        updateStatus(requestId, "rejected")
      }
    )

    // 🟢 Accepted → requester
    socket.on(
      "request:accepted",
      ({ requestId }: { requestId: string }) => {
        updateStatus(requestId, "accepted")
      }
    )

    return () => {
      socket.off("request:new")
      socket.off("request:rejected")
      socket.off("request:accepted")
    }
  }, [addIncoming, updateStatus])
}
