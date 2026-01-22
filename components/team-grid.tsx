"use client"

import { useState } from "react"
import { TeamCard } from "@/components/team-card"

const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Co-Founder & CEO",
    bio: "Visionary leader with 10+ years in tech startups. Alex drives our mission to revolutionize collaboration.",
    image: "/professional-headshot-asian-man.jpg",
    skills: ["Strategy", "Leadership", "Innovation"],
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Head of Design",
    bio: "Creative designer obsessed with user experience. Sarah crafts interfaces that delight and inspire.",
    image: "/professional-headshot-woman-designer.jpg",
    skills: ["UX/UI", "Design Systems", "Brand"],
    socials: {
      twitter: "#",
      linkedin: "#",
      dribbble: "#",
    },
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Lead Engineer",
    bio: "Full-stack engineer passionate about scalability. Marcus builds the backbone of our platform.",
    image: "/professional-headshot-black-man-engineer.jpg",
    skills: ["Backend", "DevOps", "Architecture"],
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Product Manager",
    bio: "Strategic thinker focused on solving real problems. Emma connects user needs with product vision.",
    image: "/professional-headshot-latina-woman.jpg",
    skills: ["Product", "Analytics", "User Research"],
    socials: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 5,
    name: "James Park",
    role: "Senior Frontend Engineer",
    bio: "React specialist building responsive, performant interfaces. James ensures pixel-perfect implementations.",
    image: "/professional-headshot-korean-man.jpg",
    skills: ["Frontend", "React", "Performance"],
    socials: {
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: 6,
    name: "Lisa Zhang",
    role: "Marketing Lead",
    bio: "Growth marketer with a data-driven mindset. Lisa builds communities and drives meaningful engagement.",
    image: "/professional-headshot-chinese-woman.jpg",
    skills: ["Growth", "Content", "Community"],
    socials: {
      linkedin: "#",
      twitter: "#",
    },
  },
]

export function TeamGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Diverse talents united by a shared vision to transform how teams collaborate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} onMouseEnter={() => setHoveredId(member.id)} onMouseLeave={() => setHoveredId(null)}>
              <TeamCard member={member} isHovered={hoveredId === member.id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
