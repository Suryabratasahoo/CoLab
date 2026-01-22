"use client"

import { ArrowLeft, Plus, Settings, Share2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MemberCard } from "@/components/dashboard/member-card"
import { motion } from "framer-motion"
import Link from "next/link"

const TEAM_MEMBERS = [
  {
    name: "Alex Johnson",
    role: "Team Leader" as const,
    skills: ["Next.js", "TypeScript", "Tailwind"],
    email: "alex@example.com",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Sarah Chen",
    role: "Designer" as const,
    skills: ["Figma", "React", "Animations"],
    email: "sarah@example.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Marcus Miller",
    role: "Developer" as const,
    skills: ["Node.js", "PostgreSQL", "Docker"],
    email: "marcus@example.com",
    githubUrl: "https://github.com",
  },
  {
    name: "Elena Rodriguez",
    role: "Member" as const,
    skills: ["Agile", "Strategy", "Comm"],
    email: "elena@example.com",
  },
]


export default function ViewTeamPage() {
  return (
    <div className="container max-w-7xl py-8 px-4 sm:px-6">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
        <Link href="/dashboard/my-teams">
          <Button variant="ghost" className="text-muted-foreground hover:text-white -ml-4 flex gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to My Teams
          </Button>
        </Link>
      </motion.div>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-3 py-1">Active Team</Badge>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Users className="w-4 h-4" />
              <span>4 Members</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black leading-tight">
            AI Innovation Hub <span className="text-muted-foreground/30">/</span> NextGen Hackathon
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Building a decentralized AI agent orchestration platform for the upcoming Global Hackathon. We are focused
            on low-latency inference and secure multi-agent communication.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 w-full lg:w-auto"
        >
          <Button variant="outline" className="flex-1 lg:flex-none border-white/10 bg-primary hover:bg-primary/90">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" className="flex-1 lg:flex-none border-white/10 bg-primary hover:bg-primary/90">
            <Settings className="w-4 h-4 mr-2" />
            Manage
          </Button>
          {/* <Button className="flex-1 lg:flex-none bg-white text-black hover:bg-white/90 font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Invite
          </Button> */}
        </motion.div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black">Core Members</h2>
          <div className="h-px flex-1 bg-white/5 mx-6 hidden sm:block" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <MemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  )
}
