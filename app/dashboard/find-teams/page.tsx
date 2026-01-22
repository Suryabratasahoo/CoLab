"use client"

import { useState, useEffect } from "react"
import { DashboardTopBar } from "@/components/dashboard/top-bar"
import { TeamPostCard } from "@/components/dashboard/team-post-card"
import { TeamDetailsModal } from "@/components/dashboard/team-details-modal"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"

type FilterType = "Hackathon" | "Group Project" | "Startup"

type TeamPost = {
  _id: string
  category: FilterType
  eventName: string
  description: string
  skills: string[]
  teamSize: string
  commitmentLevel: "Low" | "Medium" | "High"
  eventDate?: string
  ownerId: string
  isOwner?: boolean
  isActive?: boolean
}

const emptyStateContent: Record<
  FilterType,
  { title: string; description: string; cta: string }
> = {
  Hackathon: {
    title: "No Hackathon Teams Yet",
    description:
      "Looks like no one has posted a hackathon team yet. Be the first to start one and find teammates.",
    cta: "Create Hackathon Team",
  },
  "Group Project": {
    title: "No Group Projects Found",
    description:
      "Start a group project and invite your classmates to collaborate.",
    cta: "Create Group Project",
  },
  Startup: {
    title: "No Startup Teams Available",
    description:
      "Got a startup idea? Post it here and build your founding team.",
    cta: "Create Startup Team",
  },
}

function TeamCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border animate-pulse">
      <div className="h-5 w-2/3 bg-gray-200 rounded mb-4" />
      <div className="h-4 w-1/3 bg-gray-200 rounded mb-6" />

      <div className="flex gap-2 mb-6">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-14 bg-gray-200 rounded-full" />
      </div>

      <div className="h-4 w-full bg-gray-200 rounded mb-2" />
      <div className="h-4 w-5/6 bg-gray-200 rounded" />
    </div>
  )
}


export default function FindTeamsPage() {
  const [activeFilter, setActiveFilter] =
    useState<FilterType>("Hackathon")
  const [posts, setPosts] = useState<TeamPost[]>([])
  const [selectedTeam, setSelectedTeam] =
    useState<TeamPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCardClick = (team: TeamPost) => {
    setSelectedTeam(team)
    setIsModalOpen(true)
  }

  const handleDelete = async (postId: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error()

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, isActive: false }
            : post
        )
      )

      toast.success("Post deactivated successfully")
    } catch {
      toast.error("Failed to delete post")
    }
  }

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/posts?category=${activeFilter}`
        )
        const data = await res.json()
        setPosts(data.posts || [])
      } catch {
        console.error("Failed to fetch teams")
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [activeFilter])

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA]">
      <DashboardTopBar
        title="Find Teams"
        subtitle="Browse teams looking for collaborators"
      />

      <div className="flex-1 overflow-y-auto pl-8 pr-8 py-12 md:pl-12 md:pr-12 lg:pl-16 lg:pr-16">
        <div className="max-w-7xl space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-[#1A1F36] mb-2">
              Discover Amazing Teams
            </h1>
            <p className="text-gray-500 max-w-2xl">
              Find opportunities that match your skills and passion.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 p-1 bg-gray-100 rounded-[1.25rem] w-fit">
            {(["Hackathon", "Group Project", "Startup"] as FilterType[]).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-8 py-3 text-sm font-bold rounded-[1.125rem] transition-all",
                    activeFilter === filter
                      ? "bg-white text-[#1A1F36] shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  {filter}
                </button>
              )
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading && Array.from({ length: 6 }).map((_, i) => (
              <TeamCardSkeleton key={i} />
            ))}

            {!loading && posts.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center text-center py-20 px-6 bg-white rounded-2xl border border-dashed">
                <img
                  src="/team.png"
                  alt="No teams"
                  className="w-48 mb-6 opacity-80"
                />

                <h3 className="text-xl font-semibold text-[#1A1F36] mb-2">
                  {emptyStateContent[activeFilter].title}
                </h3>

                <p className="text-gray-500 max-w-md mb-6">
                  {emptyStateContent[activeFilter].description}
                </p>

                <button
                  onClick={() =>
                  (window.location.href =
                    "/dashboard/create-team")
                  }
                  className="px-6 py-3 rounded-xl bg-teal-500 text-white text-sm font-semibold hover:opacity-90 transition cursor-pointer"
                >
                  {emptyStateContent[activeFilter].cta}
                </button>
              </div>
            )}

            {!loading &&
              posts.map((post) => (
                <TeamPostCard
                  key={post._id}
                  id={post._id}
                  title={post.eventName}
                  location="Your College"
                  date={
                    post.eventDate
                      ? {
                        month: new Date(post.eventDate)
                          .toLocaleString("en-US", {
                            month: "short",
                          })
                          .toUpperCase(),
                        day: new Date(
                          post.eventDate
                        ).getDate().toString(),
                        dayName: new Date(
                          post.eventDate
                        )
                          .toLocaleString("en-US", {
                            weekday: "short",
                          })
                          .toUpperCase(),
                      }
                      : {
                        month: "TBA",
                        day: "TBA",
                        dayName: "TBA",
                      }
                  }
                  time="Flexible"
                  timezone=""
                  isOwner={post.isOwner || false}
                  isActive={post.isActive}
                  onClick={() => handleCardClick(post)}
                  onDelete={() => handleDelete(post._id)}
                />
              ))}
          </div>
        </div>
      </div>

      <TeamDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        team={
          selectedTeam
            ? {
              ownerId: selectedTeam.ownerId,
              id: selectedTeam._id,
              category: selectedTeam.category,
              title: selectedTeam.eventName,
              description: selectedTeam.description,
              skillsRequired: selectedTeam.skills,
              teamSize: selectedTeam.teamSize,
              commitmentLevel:
                selectedTeam.commitmentLevel,
              eventDate: selectedTeam.eventDate,
            }
            : null
        }
      />
    </div>
  )
}
