"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LayoutGrid, Users, PlusCircle, UsersRound, Inbox, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState,useEffect } from "react"
import { connectSocket } from "@/lib/socket"

const dashboardCards = [
  {
    title: "Dashboard",
    description: "See what's happening at your teams!",
    href: "/dashboard/find-teams",
    icon: LayoutGrid,
    color: "teal",
    variant: "primary",
  },
  {
    title: "My Teams",
    description: "Manage your team, view team reports",
    href: "/dashboard/my-teams",
    icon: UsersRound,
    color: "amber",
    variant: "light",
  },
  {
    title: "Requests",
    description: "Manage requests, view user reports",
    href: "/dashboard/requests",
    icon: Inbox,
    color: "rose",
    variant: "light",
  },
  {
    title: "Find Teams",
    description: "See what teams are available right now",
    href: "/dashboard/find-teams",
    icon: Users,
    color: "violet",
    variant: "light",
  },
  {
    title: "Create Post",
    description: "Start a new collaboration or team",
    href: "/dashboard/create-post",
    icon: PlusCircle,
    color: "blue",
    variant: "light",
  },
  {
    title: "Profile",
    description: "Manage your profile and preferences",
    href: "/dashboard/profile",
    icon: User,
    color: "orange",
    variant: "light",
  },
]


export default function DashboardPage() {
  const [name, setName] = useState<string | null>(null)
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me")
      if (res.ok) {
        const data = await res.json()
        setName(data.user?.name ?? null)
        connectSocket(data.user?.id)
        console.log(data)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F9FA] pl-8 pr-8 py-12 md:pl-12 md:pr-12 lg:pl-16 lg:pr-16">
      <div className="max-w-7xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Good Morning{ name ? `, ${name}!` : "!" }</h1>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboardCards.map((card, idx) => (
            <Link key={card.title} href={card.href} className="block group">
              <Card
                className={cn(
                  "relative h-80 overflow-hidden border-0 shadow-md transition-all duration-300 rounded-4xl hover:shadow-xl hover:-translate-y-1",
                  card.variant === "primary" ? "bg-linear-to-br from-teal-500 to-teal-700" : "bg-white",
                )}
              >
                <CardContent className="p-8 h-full flex flex-col relative z-10">
                  {/* Icon & Title */}
                  <div className="mb-auto">
                    <div
                      className={cn(
                        "mb-6 flex h-12 w-12 items-center justify-center rounded-xl",
                        card.variant === "primary" ? "bg-white/20 text-white" : "text-gray-400",
                      )}
                    >
                      <card.icon className="h-6 w-6" />
                    </div>
                    <h3
                      className={cn(
                        "text-2xl font-bold mb-3",
                        card.variant === "primary" ? "text-white" : "text-gray-900",
                      )}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={cn(
                        "text-base leading-relaxed max-w-[200px]",
                        card.variant === "primary" ? "text-teal-50/80" : "text-gray-500",
                      )}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="mt-4">
                    <ArrowRight
                      className={cn(
                        "h-6 w-6 transition-transform group-hover:translate-x-2",
                        card.variant === "primary" ? "text-white" : "text-gray-900",
                      )}
                    />
                  </div>
                </CardContent>

                {/* Abstract Geometric Decorations */}
                {card.variant === "primary" ? (
                  <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden opacity-40">
                    <div className="absolute top-8 right-8 w-24 h-24 border-4 border-white/20 rounded-xl rotate-12" />
                    <div className="absolute bottom-12 right-12 w-32 h-32 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/5 rounded-3xl rotate-45" />
                  </div>
                ) : (
                  <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none select-none">
                    {/* Render different abstract shapes based on card color/index */}
                    {idx === 1 && (
                      <div className="relative w-full h-full">
                        <div className="absolute bottom-6 right-6 w-24 h-24 bg-amber-400/20 rounded-t-full rotate-[-45deg]" />
                        <div className="absolute bottom-12 right-12 w-16 h-16 bg-amber-500/30 rounded-lg rotate-12" />
                      </div>
                    )}
                    {idx === 2 && (
                      <div className="relative w-full h-full">
                        <div className="absolute bottom-8 right-8 w-20 h-20 bg-rose-500/20 rounded-full" />
                        <div className="absolute bottom-12 right-16 w-16 h-8 bg-rose-400/30 rounded-full rotate-45" />
                      </div>
                    )}
                    {idx === 3 && (
                      <div className="relative w-full h-full">
                        <div className="absolute bottom-6 right-10 w-24 h-24 bg-violet-500/20 rounded-full" />
                        <div className="absolute bottom-16 right-6 w-12 h-12 bg-violet-400/30 rounded-xl rotate-[-15deg]" />
                      </div>
                    )}
                    {idx === 4 && (
                      <div className="relative w-full h-full">
                        <div className="absolute bottom-10 right-10 w-20 h-20 border-[12px] border-blue-500/20 rounded-full" />
                        <div className="absolute bottom-16 right-16 w-16 h-16 bg-blue-400/20 rounded-lg rotate-45" />
                      </div>
                    )}
                    {idx === 5 && (
                      <div className="relative w-full h-full">
                        <div className="absolute bottom-6 right-6 w-32 h-8 bg-orange-500/20 rounded-full rotate-[-30deg]" />
                        <div className="absolute bottom-12 right-12 w-16 h-16 bg-orange-400/30 rounded-full" />
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
