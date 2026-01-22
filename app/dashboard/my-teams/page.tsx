"use client"

import { useState, useEffect } from "react"
import { DashboardTopBar } from "@/components/dashboard/top-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Bookmark, MapPin } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useAuthStore } from "@/stores/useAuthStore"
import Link from "next/link"
import { useTeamStore } from "@/stores/useTeamStore"

/* ================= SKELETON ================= */
const AVATAR_GRADIENTS = [
  "from-[#1E3A8A] to-[#1E40AF]",
  "from-[#064E3B] to-[#065F46]",
  "from-[#312E81] to-[#4338CA]",
  "from-[#7C2D12] to-[#9A3412]",
  "from-[#831843] to-[#9D174D]",
  "from-[#14532D] to-[#166534]",
  "from-[#0C4A6E] to-[#075985]",
  "from-[#4C1D95] to-[#5B21B6]",
]

const avatarGradient =
  AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)]


function TeamCardSkeleton() {
  

  return (
    <Card className="rounded-[2.5rem] border-0 bg-white shadow animate-pulse">
      <CardContent className="p-8">
        <div className="flex justify-between mb-6">
          <div className="w-14 h-14 rounded-full bg-gray-200" />
          <div className="w-10 h-10 rounded-xl bg-gray-200" />
        </div>

        <div className="space-y-3 mb-6">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-6 w-24 bg-gray-200 rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded-lg" />
            <div className="h-6 w-24 bg-gray-200 rounded-lg" />
          </div>
        </div>

        <div className="h-[1px] bg-gray-200 w-full mb-6" />

        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
          <div className="h-10 w-28 bg-gray-200 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  )
}

/* ================= PAGE ================= */

export default function MyTeamsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [loading, setLoading] = useState(true)

  const activeTeams = useTeamStore((s) => s.activeTeams)
  const completedTeams = useTeamStore((s) => s.completedTeams)
  const hydrateTeams = useTeamStore((s) => s.hydrateTeams)
  const leaveTeam = useTeamStore((s) => s.leaveTeam)
  const myUserId = useAuthStore((s) => s.userId)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/teams/my")
        const data = await res.json()
        hydrateTeams(data.teams || [])
      } catch {
        toast.error("Failed to fetch teams")
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [hydrateTeams])

  const handleLeaveTeam = async (teamId: string) => {
    try {
      leaveTeam(teamId, "me")
      await fetch(`/api/teams/${teamId}/leave`, { method: "POST" })
      toast.success("You left the team")
    } catch {
      toast.error("Failed to leave team")
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA]">
      <DashboardTopBar
        title="My Teams"
        subtitle="Manage your team collaborations"
      />

      <div className="flex-1 overflow-y-auto pl-8 pr-8 py-12 md:pl-12 md:pr-12 lg:pl-16 lg:pr-16">
        <div className="max-w-7xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#1A1F36] mb-2">
              Manage Your Teams
            </h1>
            <p className="text-[#4F5B76]">
              View and manage all your active and completed collaborations.
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="bg-white border rounded-xl h-14">
              <TabsTrigger
                value="active"
                className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#1A1F36] data-[state=active]:text-white"
              >
                Active Teams
                {activeTeams.length > 0 && !loading && (
                  <span className="ml-2 px-1.5 py-0.5 rounded-md bg-[#00D4FF] text-[#1A1F36] text-[10px] font-bold">
                    {activeTeams.length}
                  </span>
                )}
              </TabsTrigger>

              <TabsTrigger
                value="completed"
                className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#1A1F36] data-[state=active]:text-white"
              >
                Completed
              </TabsTrigger>
            </TabsList>

            {/* ================= ACTIVE ================= */}
            <TabsContent value="active" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {loading &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <TeamCardSkeleton key={i} />
                  ))}

                {!loading && activeTeams.length > 0 &&
                  activeTeams.map((team, index) => {
                    const myMember = team.members.find(
                      (m) => m.user.id === myUserId
                    )

                    return (
                      <motion.div
                        key={team._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="rounded-[2.5rem] bg-white shadow">
                          <CardContent className="p-8">
                            <div className="flex justify-between mb-6">
                              <div
  className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center`}
>
  
</div>

                              <Button variant="ghost" size="icon">
                                <Bookmark className="h-5 w-5" />
                              </Button>
                            </div>

                            <h3 className="text-xl font-bold mb-2">
                              {myMember?.role === "owner" ? "Owner" : "Member"}
                            </h3>

                            <div className="flex gap-2 mb-6">
                              <Badge>{team.post.category}</Badge>
                              <Badge>{team.members.length} Members</Badge>
                            </div>

                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-bold">Active</div>
                                <div className="flex items-center gap-1 text-xs">
                                  <MapPin className="h-3 w-3" /> Online
                                </div>
                              </div>

                              <Link href={`/dashboard/my-teams/${team._id}`}>
                                <Button className="bg-[#1A1F36] text-white rounded-xl px-6">
                                  View Team
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}

                {!loading && activeTeams.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <Users className="mx-auto h-10 w-10 text-gray-400" />
                    <h3 className="text-xl font-bold mt-4">
                      No active teams
                    </h3>
                  </div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* ================= COMPLETED ================= */}
            <TabsContent value="completed" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading &&
                Array.from({ length: 2 }).map((_, i) => (
                  <TeamCardSkeleton key={i} />
                ))}

              {!loading && completedTeams.length > 0 &&
                completedTeams.map((team) => (
                  <Card key={team._id} className="rounded-[2.5rem] bg-white opacity-70">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-bold">
                        {team.post.title}
                      </h3>
                      <Badge className="mt-2">
                        {team.post.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}

              {!loading && completedTeams.length === 0 && (
                <div className="col-span-full py-20 text-center opacity-60">
                  Your completed projects will appear here.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
