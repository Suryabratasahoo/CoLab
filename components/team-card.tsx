"use client"

import type React from "react"
import { Github, Linkedin, Twitter } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
  skills: string[]
  socials: Record<string, string>
}

interface TeamCardProps {
  member: TeamMember
  isHovered: boolean
}

export function TeamCard({ member, isHovered }: TeamCardProps) {
  const iconMap: Record<string, React.ReactNode> = {
    github: <Github className="w-5 h-5" />,
    linkedin: <Linkedin className="w-5 h-5" />,
    twitter: <Twitter className="w-5 h-5" />,
    dribbble: <Twitter className="w-5 h-5" />,
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-background border border-border transition-all duration-300 ${
        isHovered ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* Image container - clean and simple */}
      <div className="relative h-56 overflow-hidden bg-muted">
        <img
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
      </div>

      {/* Content section */}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-1 text-foreground">{member.name}</h3>
        <p className="text-primary font-medium text-sm mb-3">{member.role.split(" & ")[0]}</p>

        {/* Bio */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{member.bio}</p>

        {/* Skills - minimal tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {member.skills.map((skill) => (
            <span key={skill} className="px-2.5 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">
              {skill}
            </span>
          ))}
        </div>

        {/* Social links - simple icons */}
        <div className="flex gap-2 pt-4 border-t border-border">
          {Object.entries(member.socials).map(([social, url]) => (
            <a
              key={social}
              href={url}
              className="p-2 rounded text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-300"
              aria-label={social}
            >
              {iconMap[social]}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
