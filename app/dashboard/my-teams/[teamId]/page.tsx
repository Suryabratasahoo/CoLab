"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Users, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MemberCard } from "@/components/dashboard/member-card"
import { motion } from "framer-motion"
import Link from "next/link"
import toast from "react-hot-toast"
import { useAuthStore } from "@/stores/useAuthStore"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

/* =======================
   TYPES
======================= */

type TeamMember = {
  id: string
  name: string
  email?: string
  role: "owner" | "member"
  skills: string[]
  linkedin?: string
  github?: string
  joinedAt: string
}

type Team = {
  _id: string
  status: "active" | "completed"
  ownerId: string
  post: {
    title: string
    category: string
    description: string
  }
  members: TeamMember[]
}

/* =======================
   PAGE
======================= */

export default function ViewTeamPage() {
  const { teamId } = useParams()
  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)

  const [openComplete, setOpenComplete] = useState(false)
  const [openDispose, setOpenDispose] = useState(false)
  const [openLeave, setOpenLeave] = useState(false)

  const loggedInUserId = useAuthStore((s) => s.userId)
  const isOwner = team?.ownerId === loggedInUserId

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`/api/teams/${teamId}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setTeam(data.team)
      } catch {
        toast.error("Unable to load team")
      } finally {
        setLoading(false)
      }
    }
    fetchTeam()
  }, [teamId])

  if (loading || !team) return null

  /* =======================
     ACTION HANDLERS
  ======================= */

  const handleCompleteTeam = async () => {
    try {
      const res = await fetch(`/api/teams/${team._id}`, {
        method: "PUT"
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Failed to complete team")
      }
      toast.success("Team Completed successfully")
      window.location.href = "/dashboard/my-teams"
    } catch (error: any) {
      toast.error(error.message || "Failed to complete team")
    }
  }

  const handleDisposeTeam = async () => {
    try {
      const res = await fetch(`/api/teams/${team._id}`, {
        method: "DELETE"
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Failed to dispose team")
      }
      toast.success("Team disposed successfully")
      window.location.href = "/dashboard/my-teams"
    } catch (error: any) {
      toast.error(error.message || "Failed to dispose team")
    }

  }

  const handleLeaveTeam = async (memberId: string, teamId: string) => {
    try {
      const res = await fetch(`/api/teams/${teamId}/members/${memberId}`, {
        method: "PUT"
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Failed to remove member")
      }
      setTeam((prev) =>
        prev
          ? {
            ...prev,
            members: prev.members.filter((m) => m.id !== memberId),
          }
          : prev
      )
      toast.success("Left Team Successfully")
      window.location.href = "/dashboard/my-teams"
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const removeMember = async (memberId: string) => {
    try {
      const res = await fetch(`/api/teams/${team._id}/members/${memberId}`, {
        method: "DELETE"
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Failed to remove member")
      }
      setTeam((prev) =>
        prev
          ? {
            ...prev,
            members: prev.members.filter((m) => m.id !== memberId),
          }
          : prev
      )
      toast.success("Member removed successfully")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="container max-w-7xl py-8 px-4 sm:px-6">
      {/* Back */}
      <Link href="/dashboard/my-teams">
        <Button variant="ghost" className="mb-8 flex gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge>
              {team.status === "active" ? "Active Team" : "Completed"}
            </Badge>
            <span className="text-sm flex items-center gap-1">
              <Users className="w-4 h-4" />
              {team.members.length} Members
            </span>
          </div>

          <h1 className="text-4xl font-extrabold">{team.post.title}</h1>
          <p className="text-muted-foreground max-w-3xl">
            {team.post.description}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          {isOwner ? (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  onClick={() => setOpenComplete(true)}
                  className="bg-gradient-to-r cursor-pointer from-green-500 to-emerald-600 text-white flex gap-2"
                >
                  <Users className="w-4 h-4" />
                  Mark Completed
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  onClick={() => setOpenDispose(true)}
                  className="bg-gradient-to-r cursor-pointer from-red-500 to-rose-600 text-white flex gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Dispose Team
                </Button>
              </motion.div>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                onClick={() => setOpenLeave(true)}
                className="bg-gradient-to-r cursor-pointer from-red-500 to-orange-500 text-white flex gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Leave Team
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* MEMBERS */}
      <h2 className="text-2xl font-bold mb-6">Core Members</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.members.map((m) => (
          <MemberCard
            key={m.id}
            name={m.name}
            role={m.role === "owner" ? "Team Leader" : "Member"}
            skills={m.skills}
            email={m.email}
            linkedinUrl={m.linkedin}
            githubUrl={m.github}
            isOwner={isOwner}
            canRemove={m.id !== team.ownerId}
            onRemove={() => removeMember(m.id)}
          />
        ))}
      </div>

      {/* =======================
         MODALS
      ======================= */}

      {/* COMPLETE */}
      <AlertDialog open={openComplete} onOpenChange={setOpenComplete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark team as completed?</AlertDialogTitle>
            <AlertDialogDescription>
              This will move the team to completed state.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCompleteTeam}
              className="bg-green-600 cursor-pointer"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* DISPOSE */}
      <AlertDialog open={openDispose} onOpenChange={setOpenDispose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 cursor-pointer">
              Dispose this team?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisposeTeam}
              className="bg-red-600 cursor-pointer"
            >
              Dispose
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* LEAVE */}
      <AlertDialog open={openLeave} onOpenChange={setOpenLeave}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave this team?</AlertDialogTitle>
            <AlertDialogDescription>
              You will lose access to this team.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleLeaveTeam(loggedInUserId!,team._id)}
              className="bg-orange-600 cursor-pointer"
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
