"use client"

import { useState, useEffect } from "react"
import { DashboardTopBar } from "@/components/dashboard/top-bar"
import { RequestCard } from "@/components/dashboard/request-card"
import { SentRequestCard } from "@/components/dashboard/sent-request-card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/useAuthStore"
import { useRequestStore } from "@/stores/useRequestStore"

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("incoming")

  // ✅ Zustand
  const incoming = useRequestStore((s) => s.incoming)
  const sent = useRequestStore((s) => s.sent)
  const updateStatus = useRequestStore((s) => s.updateStatus)
  const hydrateIncoming = useRequestStore((s) => s.hydrateIncoming)
  const hydrateSent = useRequestStore((s) => s.hydrateSent)
  const userId= useAuthStore((s) => s.userId)

  // ✅ Initial fetch
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [incomingRes, sentRes] = await Promise.all([
          fetch("/api/requests?type=incoming"),
          fetch("/api/requests?type=sent"),
        ])

        const incomingData = await incomingRes.json()
        const sentData = await sentRes.json()

        hydrateIncoming(incomingData.requests || [])
        hydrateSent(sentData.requests || [])
      } catch {
        toast.error("Failed to load requests")
      }
    }

    fetchRequests()
  }, [hydrateIncoming, hydrateSent])

  const handleAccept = async (requestId: string) => {
    try {
      const res = await fetch(`/api/requests/${requestId}/accept`, {
        method: "PUT",
      })

      if (!res.ok) throw new Error()

      updateStatus(requestId, "accepted")
      toast.success("Request accepted")
    } catch {
      toast.error("Failed to accept request")
    }
  }

  const handleReject = async (requestId: string) => {
    try {
      const res = await fetch(`/api/requests/${requestId}/reject`, {
        method: "PUT",
      })

      if (!res.ok) throw new Error()

      updateStatus(requestId, "rejected")
      toast.success("Request rejected")
    } catch {
      toast.error("Failed to reject request")
    }
  }

  const pendingIncomingCount = incoming.filter(
    (r) => r.status === "pending"
  ).length

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA]">
      <DashboardTopBar title="Requests" subtitle="Manage team join requests" />

      <div className="flex-1 overflow-y-auto scrollbar-hide px-8 py-12 md:px-12 lg:px-16">
        <div className="max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#1A1F36] mb-2">
              Manage Your Requests
            </h1>
            <p className="text-gray-500">
              Review incoming join requests and track the status of teams you've applied to.
            </p>
          </div>

          {/* ✅ Tabs (My Teams Style) */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-white border border-[#E3E8EE] p-1 rounded-xl h-auto inline-flex">
              {/* Incoming */}
              <TabsTrigger
                value="incoming"
                className="
                  rounded-lg px-6 py-2.5
                  data-[state=active]:bg-[#1A1F36]
                  data-[state=active]:text-white
                  transition-all
                  flex items-center gap-2
                "
              >
                Incoming Requests
                {pendingIncomingCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-md bg-[#00D4FF] text-[#1A1F36] text-[10px] font-bold">
                    {pendingIncomingCount}
                  </span>
                )}
              </TabsTrigger>

              {/* Sent */}
              <TabsTrigger
                value="sent"
                className="
                  rounded-lg px-6 py-2.5
                  data-[state=active]:bg-[#1A1F36]
                  data-[state=active]:text-white
                  transition-all
                  flex items-center gap-2
                "
              >
                Sent Requests
                {sent.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-md bg-[#E3E8EE] text-[#1A1F36] text-[10px] font-bold">
                    {sent.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* 🔔 Incoming */}
            <TabsContent value="incoming" className="outline-none">
              {incoming.filter((r) => r.status === "pending").length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {incoming
                      .filter((r) => r.status === "pending")
                      .map((request, index) => (
                        <motion.div
                          key={request._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <RequestCard
                            id={request._id}
                            requester={{
                              ...request.requester,
                              socials: request.requester.socials || {},
                            }}
                            title={request.post.title}
                            description={request.message}
                            onAccept={() => handleAccept(request._id)}
                            onReject={() => handleReject(request._id)}
                          />
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              ) : (
                /* 🌱 Empty State */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="mb-6 w-20 h-20 rounded-full bg-[#F4F7FE] flex items-center justify-center">
                    {/* Inbox / Users Icon */}
                    <svg
                      className="w-10 h-10 text-[#A3AED0]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 13V5a2 2 0 00-2-2H6a2 2 0 00-2 2v8m16 0l-4 6H8l-4-6m16 0H4"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1F36] mb-2">
                    No incoming requests yet
                  </h3>

                  <p className="text-gray-500 max-w-md mb-8">
                    When someone applies to join your team, their request will appear here.
                  </p>

                  <div className="flex gap-3">
                    <Button variant="outline" className="font-semibold">
                      Share Your Post
                    </Button>
                    <Button className="bg-[#0D8B8B] text-white font-semibold">
                      Edit Post
                    </Button>
                  </div>
                </motion.div>
              )}
            </TabsContent>

            {/* 📤 Sent */}
            <TabsContent value="sent" className="outline-none">
              <AnimatePresence mode="popLayout">
                {sent.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sent.map((request) => (
                      <SentRequestCard
                        key={request._id}
                        id={request._id}
                        teamName={request.post?.title}
                        category={request.post?.category}
                        status={request.status}
                        sentDate={new Date(request.createdAt).toLocaleDateString()}
                        onViewDetails={() =>
                          toast.info("Details coming soon")
                        }
                        onCancel={async () => {
                          useRequestStore.getState().removeSent(request._id)
                          try {
                            const res = await fetch(`/api/requests/${request._id}`, {
                              method: "DELETE",
                            })
                            if (!res.ok) throw new Error()
                            toast.success("Request cancelled")
                          } catch {
                            toast.error("Failed to cancel request")
                            window.location.reload()
                          }
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24">
                    <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-[#F4F7FE] flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-[#A3AED0]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l9 6 9-6M3 8l9-6 9 6M3 8v8l9 6 9-6V8"
                        />
                      </svg>
                    </div>

                    <h3 className="text-xl font-bold text-[#1A1F36] mb-2">
                      No sent requests yet
                    </h3>

                    <p className="text-gray-500 max-w-md mx-auto mb-8">
                      Browse teams and send requests to collaborate.
                      Your sent requests will appear here.
                    </p>

                    <Link href="/dashboard/find-teams">
                      <Button className="bg-[#0D8B8B] text-white font-bold px-8">
                        Find Teams
                      </Button>
                    </Link>
                  </div>

                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
