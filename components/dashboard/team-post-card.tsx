"use client"

import { useState, useMemo } from "react"
import { Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
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
import { cn } from "@/lib/utils"

interface TeamPostCardProps {
  id: string
  title: string
  location: string
  date: {
    month: string
    day: string
    dayName: string
  }
  time: string
  timezone: string

  isOwner?: boolean
  isActive?: boolean
  onDelete?: () => void
  onClick?: () => void
}

/* 🎨 Gradient Pool (scale this to 100 easily) */
const COLOR_POOL = [
  "from-[#1E3A8A] via-[#1E40AF] to-[#0F172A]",
  "from-[#064E3B] via-[#065F46] to-[#022C22]",
  "from-[#312E81] via-[#4338CA] to-[#1E1B4B]",
  "from-[#7C2D12] via-[#9A3412] to-[#431407]",
  "from-[#831843] via-[#9D174D] to-[#4A044E]",
  "from-[#14532D] via-[#166534] to-[#052E16]",
  "from-[#1F2937] via-[#111827] to-[#020617]",
  "from-[#0C4A6E] via-[#075985] to-[#082F49]",
  "from-[#4C1D95] via-[#5B21B6] to-[#2E1065]",
  "from-[#78350F] via-[#92400E] to-[#451A03]",
]

export function TeamPostCard({
  title,
  location,
  date,
  time,
  timezone,
  isOwner = false,
  isActive = true,
  onDelete,
  onClick,
}: TeamPostCardProps) {
  const [open, setOpen] = useState(false)

  /* 🎲 Pick random gradient ONCE per refresh */
  const randomGradient = useMemo(() => {
    const index = Math.floor(Math.random() * COLOR_POOL.length)
    return COLOR_POOL[index]
  }, [])

  const handleCardClick = () => {
    if (!isActive) {
      toast.error("This post is no longer recruiting members")
      return
    }
    onClick?.()
  }

  return (
    <>
      <Card
        onClick={handleCardClick}
        className={cn(
          `
            group relative h-[450px] w-full overflow-hidden
            border-none rounded-[2rem] shadow-xl transition-all
          `,
          isActive
            ? "cursor-pointer"
            : "opacity-50 grayscale cursor-not-allowed"
        )}
      >
        {/* 🎨 Random Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${randomGradient}`}
        />

        {/* 🗑️ Delete Button */}
        {isOwner && isActive && (
          <div
            className="
              absolute top-4 right-4 z-20
              opacity-0 pointer-events-none
              group-hover:opacity-100
              group-hover:pointer-events-auto
              transition-all duration-300
            "
          >
            <Button
              variant="destructive"
              size="icon"
              className="rounded-full shadow-lg"
              onClick={(e) => {
                e.stopPropagation()
                setOpen(true)
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}

        <CardContent className="absolute inset-0 p-8 flex flex-col justify-end text-white">
          <h3 className="text-[2.5rem] font-bold leading-[1.1] mb-8 pr-12">
            {title}
          </h3>

          <div className="flex items-end justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center bg-white rounded-2xl p-2 min-w-[70px] text-center shadow-lg">
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  {date.month}
                </span>
                <span className="text-2xl font-black text-gray-800">
                  {date.day}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  {date.dayName}
                </span>
              </div>

              <div>
                <p className="text-sm font-bold">{location.split(",")[0]}</p>
                <p className="text-[10px] opacity-70">{location}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-base font-bold">{time}</p>
              <p className="text-[10px] opacity-60">{timezone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ❗ Confirm Delete Modal */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent. The post and its team will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                setOpen(false)
                onDelete?.()
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
