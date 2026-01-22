"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Users,
  Calendar,
  Target,
  Settings,
  UserPlus,
  MessageSquare,
  TrendingUp,
  Clock,
  Share2,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MemberCard } from "@/components/dashboard/member-card"
import Link from "next/link"
import { DashboardTopBar } from "@/components/dashboard/top-bar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data - replace with actual data fetching
const teamData = {
  id: "1",
  name: "AI Healthcare Innovation",
  category: "Hackathon" as const,
  description:
    "Building an AI-powered diagnostic assistant to help healthcare professionals make faster, more accurate decisions. Participating in MedTech Hackathon 2025.",
  status: "Active",
  memberCount: 6,
  createdDate: "Jan 2025",
  eventDate: "March 15-17, 2025",
  projectProgress: 65,
  members: [
    {
      name: "Sarah Chen",
      role: "Team Leader" as const,
      avatar: "/placeholder.svg?height=64&width=64&text=SC",
      email: "sarah.chen@university.edu",
      location: "San Francisco, CA",
      skills: ["Python", "TensorFlow", "Healthcare Tech", "Project Management"],
      linkedinUrl: "https://linkedin.com",
      githubUrl: "https://github.com",
      isOnline: true,
      joinedDate: "Jan 2025",
    },
    {
      name: "Alex Kumar",
      role: "Developer" as const,
      avatar: "/placeholder.svg?height=64&width=64&text=AK",
      email: "alex.k@university.edu",
      location: "Boston, MA",
      skills: ["React", "Node.js", "ML Integration", "API Design"],
      linkedinUrl: "https://linkedin.com",
      githubUrl: "https://github.com",
      isOnline: true,
      joinedDate: "Jan 2025",
    },
    {
      name: "Emily Rodriguez",
      role: "Designer" as const,
      avatar: "/placeholder.svg?height=64&width=64&text=ER",
      email: "emily.r@university.edu",
      location: "Austin, TX",
      skills: ["UI/UX", "Figma", "Prototyping", "User Research"],
      linkedinUrl: "https://linkedin.com",
      githubUrl: "https://github.com",
      isOnline: false,
      joinedDate: "Jan 2025",
    },
    {
      name: "Michael Zhang",
      role: "Developer" as const,
      avatar: "/placeholder.svg?height=64&width=64&text=MZ",
      email: "michael.z@university.edu",
      location: "Seattle, WA",
      skills: ["Python", "FastAPI", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com",
      isOnline: true,
      joinedDate: "Jan 2025",
    },
    {
      name: "Priya Patel",
      role: "Member" as const,
      avatar: "/placeholder.svg?height=64&width=64&text=PP",
      email: "priya.p@university.edu",
      location: "New York, NY",
      skills: ["Data Science", "Healthcare Analytics", "Research"],
      linkedinUrl: "https://linkedin.com",
      isOnline: false,
      joinedDate: "Jan 2025",
    },
    {
      name: "James Wilson",
      role: "Member" as const,
      avatar: "/placeholder.svg?height=64&width=64&text=JW",
      location: "Chicago, IL",
      skills: ["Medical Knowledge", "Testing", "Documentation"],
      isOnline: true,
      joinedDate: "Jan 2025",
    },
  ],
}

export default function ViewTeamPage() {
  const [activeTab, setActiveTab] = useState<"members" | "activity">("members")

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <DashboardTopBar
        title="Team Details"
        subtitle="View and manage your team"
        userName="Student"
        userEmail="student@college.edu"
      />

      <div className="pl-8 pr-8 py-12 md:pl-12 md:pr-12 lg:pl-16 lg:pr-16 max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/dashboard/my-teams">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-white/5 text-muted-foreground hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to My Teams
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-gray-200 hover:bg-gray-100 bg-white"
            >
              <Share2 className="h-4 w-4 text-[#1A1F36]" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-gray-200 hover:bg-gray-100 bg-white"
                >
                  <MoreVertical className="h-4 w-4 text-[#1A1F36]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white">
                <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">Edit Team Info</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">Manage Roles</DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:bg-red-400/10 cursor-pointer">
                  Leave Team
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-0 bg-white shadow-sm rounded-[2.5rem] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-teal-500" />
            <CardContent className="p-6 sm:p-8 md:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                <div className="flex-1 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="bg-teal-50 text-teal-600 border-teal-100 px-3 py-1 text-xs font-semibold">
                      {teamData.category}
                    </Badge>
                    <Badge className="bg-teal-50 text-teal-600 border-teal-100 px-3 py-1 text-xs font-semibold">
                      {teamData.status}
                    </Badge>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1F36] tracking-tight">
                    {teamData.name}
                  </h1>

                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-3xl">{teamData.description}</p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 rounded-full border border-teal-100">
                      <Users className="h-3.5 w-3.5 text-teal-600" />
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                        {teamData.memberCount} Members
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 rounded-full border border-teal-100">
                      <Calendar className="h-3.5 w-3.5 text-teal-600" />
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                        {teamData.eventDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 rounded-full border border-teal-100">
                      <TrendingUp className="h-3.5 w-3.5 text-teal-600" />
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                        {teamData.projectProgress}% Complete
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 rounded-full border border-teal-100">
                      <Clock className="h-3.5 w-3.5 text-teal-600" />
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                        Created {teamData.createdDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full sm:w-auto bg-teal-500 text-white font-semibold gap-2">
                      <UserPlus className="h-4 w-4" />
                      Invite Members
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-teal-100 hover:bg-teal-100 gap-2 bg-white"
                    >
                      <MessageSquare className="h-4 w-4 text-teal-600" />
                      Team Chat
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-teal-100 hover:bg-teal-100 gap-2 bg-white"
                    >
                      <Settings className="h-4 w-4 text-teal-600" />
                      Settings
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex gap-2 border-b border-teal-100">
          <button
            onClick={() => setActiveTab("members")}
            className={`px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === "members" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-teal-600"
            }`}
          >
            <Users className="h-4 w-4 inline mr-2 text-teal-600" />
            Team Members
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === "activity"
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-500 hover:text-teal-600"
            }`}
          >
            <Target className="h-4 w-4 inline mr-2 text-teal-600" />
            Activity & Progress
          </button>
        </div>

        {activeTab === "members" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {teamData.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MemberCard {...member} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "activity" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card className="border-0 bg-white/[0.03] backdrop-blur-xl p-12 text-center">
              <Target className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-teal-600 mb-2">Activity Coming Soon</h3>
              <p className="text-gray-500">
                Team activity timeline and project progress tracking will be available here.
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
