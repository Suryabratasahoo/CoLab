"use client"

import { X, Users, Calendar, Zap, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import { useRequestStore } from "@/stores/useRequestStore"
import { nanoid } from "nanoid"

interface TeamDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  team: {
    ownerId: string
    id: string
    category: "Hackathon" | "Group Project" | "Startup"
    title: string
    description: string
    skillsRequired: string[]
    teamSize: string
    commitmentLevel: string
    eventDate?: string
  } | null
}

const categoryColors = {
  Hackathon: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "Group Project": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Startup: "bg-gray-500/10 text-gray-400 border-gray-500/20",
}

const categoryGradients = {
  Hackathon: "from-teal-500/20 to-teal-600/5",
  "Group Project": "from-blue-500/20 to-blue-600/5",
  Startup: "from-gray-500/20 to-gray-600/5",
}

export function TeamDetailsModal({ isOpen, onClose, team }: TeamDetailsModalProps) {
  const [intro, setIntro] = useState("")
  const [isSending, setIsSending] = useState(false)
  const addSent = useRequestStore((s) => s.addSent)
  // const removeOptimistic = useRequestStore((s) => s.removeOptimistic)
  const updateStatus = useRequestStore((s) => s.updateStatus)
  const maxChars = 500

  const handleSendRequest = async () => {
    if (!team?.id) return

    if (intro.length < 50) {
      toast.error("Please write at least 50 characters")
      return
    }

    const tempId = nanoid()

    const optimisticRequest = {
      _id: tempId,
      postId: team.id,
      requester:{
        id:"me",
        name:"You",
        regNo:"00000",
        socials:{
          github:"github.com",
          linkedin:"linkedin.com"
        }
      },
      ownerId: team.ownerId,
      message: intro,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    // ✅ Optimistic add
    addSent(optimisticRequest)
    setIsSending(true)

    try {
      const response = await fetch("/api/requests/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: team.id,
          message: intro,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to send request")
      }

      // ✅ Replace optimistic request with real one
      useRequestStore.getState().confirmOptimistic(tempId, data.request)

      toast.success("Request sent successfully!")
      setIntro("")
      onClose()
    } catch (error: any) {
      // ❌ Rollback optimistic UI
      useRequestStore.getState().rollbackOptimistic(tempId)

      toast.error(error.message || "An error occurred. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  if (!team) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] w-full bg-[#0a0a0a] border-white/10 p-0 gap-0 overflow-hidden shadow-2xl">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-full p-2 bg-white/5 hover:bg-white/10 transition-all z-50 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              <span className="sr-only">Close</span>
            </motion.button>

            <div className="grid grid-cols-1 md:grid-cols-[65%_35%] lg:grid-cols-[70%_30%] gap-0 max-h-[90vh] md:max-h-[85vh]">
              {/* Left Side - Details */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={`p-6 sm:p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/5 bg-gradient-to-br ${categoryGradients[team.category]} overflow-y-auto scrollbar-hide`}
              >
                <DialogHeader className="mb-6 sm:mb-8">
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Badge
                      className={`${categoryColors[team.category]} border px-4 py-1.5 text-sm font-semibold mb-4 shadow-lg`}
                    >
                      {team.category}
                    </Badge>
                  </motion.div>
                  <DialogTitle className="text-2xl sm:text-3xl font-bold text-white leading-tight pr-8 sm:pr-12">
                    {team.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 sm:space-y-8">
                  {/* Description */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/10 shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-6 bg-primary rounded-full" />
                      <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">Description</h4>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{team.description}</p>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Team Size */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1.5 sm:p-2 bg-primary/20 rounded-lg">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">Team Size</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground ml-9 sm:ml-11">{team.teamSize}</p>
                    </motion.div>

                    {/* Commitment Level */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1.5 sm:p-2 bg-orange-500/20 rounded-lg">
                          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">Commitment</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground ml-9 sm:ml-11">{team.commitmentLevel}</p>
                    </motion.div>
                  </div>

                  {/* Event Date */}
                  {team.eventDate && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/10 shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg">
                          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">Event Date</h4>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground ml-9 sm:ml-11">{new Date(team.eventDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}</p>
                    </motion.div>
                  )}

                  {/* Skills Required */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-green-500 rounded-full" />
                      <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                        Skills Required
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {team.skillsRequired.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <Badge
                            variant="outline"
                            className="text-sm sm:text-base px-4 py-1.5 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm font-medium"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side - Join Request */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-6 sm:p-8 bg-[#0f0f0f]/80 backdrop-blur-xl flex flex-col overflow-y-auto scrollbar-hide"
              >
                <div className="space-y-4 sm:space-y-6 flex-1">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Introduce Yourself</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Tell the team why you'd be a great fit</p>
                  </div>

                  <div className="space-y-3">
                    <Textarea
                      value={intro}
                      onChange={(e) => setIntro(e.target.value.slice(0, maxChars))}
                      placeholder="Share your skills, experience, and what excites you about this project..."
                      className="min-h-[150px] md:min-h-[300px] bg-[#1a1a1a] border-white/10 text-white placeholder:text-muted-foreground resize-none focus:border-primary transition-colors text-sm"
                    />

                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className={intro.length === maxChars ? "text-red-400" : "text-muted-foreground"}>
                        {intro.length}/{maxChars} characters
                      </span>
                      {intro.length > maxChars * 0.9 && (
                        <span className="text-orange-400 animate-pulse">Almost at limit!</span>
                      )}
                    </div>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    disabled={intro.length < 50 || isSending}
                    onClick={handleSendRequest}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-10 sm:h-12 shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed mt-4 sm:mt-6 text-sm"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Join Request
                  </Button>
                </motion.div>

                {intro.length < 50 && (
                  <p className="text-xs sm:text-sm text-muted-foreground text-center mt-3 sm:mt-4">
                    Write at least 50 characters to send your request
                  </p>
                )}
              </motion.div>
            </div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}
