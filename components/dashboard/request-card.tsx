"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dribbble, Instagram, Twitter, Linkedin, Facebook, Bean as Behance, Trash2, Github } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AcceptRequestModal } from "./accept-request-modal"
import Link from "next/link"

interface RequestCardProps {
  id: string
  requester: {
    name: string
    regNo: string
    id: string
    socials: {
      linkedin?: string
      github?: string
    }
  }
  title: string
  description: string
  avatarUrl?: string
  isPro?: boolean
  onAccept?: () => void
  onReject?: () => void
}

export function RequestCard({
  id,
  requester,
  title,
  description,
  avatarUrl,
  isPro = true,
  onAccept,
  onReject,
}: RequestCardProps) {
  const [isRejecting, setIsRejecting] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)

  const handleReject = () => {
    setIsRejecting(true)
    setTimeout(() => {
      onReject?.()
    }, 600)
  }

  const handleAcceptConfirm = () => {
    onAccept?.()
    setShowAcceptModal(false)
  }

  return (
    <>
      <AcceptRequestModal
        open={showAcceptModal}
        userName={requester.name}
        onConfirm={handleAcceptConfirm}
        onCancel={() => setShowAcceptModal(false)}
      />

      <AnimatePresence>
        {!isRejecting && (
          <motion.div
            initial={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, rotate: -15 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          >
            <Card className="w-full max-w-sm mx-auto overflow-hidden border-none shadow-xl rounded-[2.5rem] bg-white text-center p-8 h-[600px] flex flex-col">
              <CardContent className="p-0 flex flex-col items-center h-full">
                {/* Avatar */}
                <div className="relative mb-6 shrink-0">
                  <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
                    <AvatarImage src={avatarUrl || "/placeholder-user.jpg"} />
                    <AvatarFallback className="bg-teal-50 text-teal-600 text-2xl font-bold">
                      {requester.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Pro Badge */}
                {isPro && (
                  <Badge className="mb-4 bg-teal-50 text-teal-700 hover:bg-teal-100 border-none px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex-shrink-0">
                    PRO
                  </Badge>
                )}

                {/* Name and Title */}
                <h3 className="text-xl font-bold text-[#1A1F36] mb-1 flex-shrink-0">{requester.name}</h3>
                <p className="text-sm text-gray-500 mb-6 font-medium flex-shrink-0">{title}</p>

                {/* Description - truncated for fixed height */}
                <p className="text-sm text-gray-400 leading-relaxed mb-8 px-4 line-clamp-3 flex-shrink-0">
                  {description}
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-6 mb-10 text-gray-400 flex-shrink-0">
                  <Link href={requester.socials.linkedin || "#"}><Linkedin className="h-5 w-5 hover:text-teal-500 transition-colors cursor-pointer" /></Link>
                  <Link href={requester.socials.github || "#"}><Github className="h-5 w-5 hover:text-teal-500 transition-colors cursor-pointer" /></Link>

                </div>

                {/* Buttons - pushed to bottom */}
                <div className="flex w-full gap-4 mt-auto flex-shrink-0">
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleReject}
                      className="w-full h-14 rounded-[1.25rem] border-2 border-red-200 text-red-600 font-bold text-base hover:bg-red-50 bg-white transition-all relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-red-50"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative flex items-center justify-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        Reject
                      </span>
                    </Button>
                  </motion.div>
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={() => setShowAcceptModal(true)}
                      className="w-full h-14 rounded-[1.25rem] bg-[#0D8B8B] hover:bg-[#0A6B6B] text-white font-bold text-base shadow-lg shadow-teal-200 transition-all"
                    >
                      Accept
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
