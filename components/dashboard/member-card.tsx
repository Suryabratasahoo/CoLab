"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Award, Trash2 } from "lucide-react"
import { FaLinkedin, FaGithub } from "react-icons/fa"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

/* =======================
   PROPS
======================= */

interface MemberCardProps {
  name: string
  role: "Team Leader" | "Developer" | "Designer" | "Member"
  avatar?: string
  email?: string
  skills: string[]
  linkedinUrl?: string
  githubUrl?: string
  isOnline?: boolean

  /** Permissions */
  isOwner?: boolean
  canRemove?: boolean
  onRemove?: () => void
}

/* =======================
   COMPONENT
======================= */

export function MemberCard({
  name,
  role,
  avatar,
  email,
  skills,
  linkedinUrl,
  githubUrl,
  isOnline = false,
  isOwner = false,
  canRemove = false,
  onRemove,
}: MemberCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full"
      >
        {/* GROUP enables hover-based reveal */}
        <Card className="relative overflow-hidden border backdrop-blur-xl h-full group">
          <CardContent className="p-6 flex flex-col h-full space-y-4">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={avatar || "/placeholder.svg"} />
                  <AvatarFallback className="font-bold">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>

              {role === "Team Leader" && (
                <Award className="h-5 w-5 text-teal-400" />
              )}
            </div>

            {/* Name & Role */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-primary">
                {name}
              </h3>
              <Badge className="text-xs">{role}</Badge>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 4).map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-[10px]"
                >
                  {skill}
                </Badge>
              ))}
              {skills.length > 4 && (
                <Badge variant="outline" className="text-[10px]">
                  +{skills.length - 4}
                </Badge>
              )}
            </div>

            {/* Contact */}
            <div className="flex gap-2 mt-auto">
              {email && (
                <Button size="icon" variant="ghost" asChild>
                  <a href={`mailto:${email}`}>
                    <Mail className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {linkedinUrl && (
                <Button size="icon" variant="ghost" asChild>
                  <a href={linkedinUrl} target="_blank">
                    <FaLinkedin />
                  </a>
                </Button>
              )}
              {githubUrl && (
                <Button size="icon" variant="ghost" asChild>
                  <a href={githubUrl} target="_blank">
                    <FaGithub />
                  </a>
                </Button>
              )}
            </div>

            {/* 🚨 Remove Button (hover only) */}
            {isOwner && canRemove && (
              <motion.div
                className="
      mt-4
      opacity-0
      translate-y-2
      pointer-events-none
      transition-all
      duration-300
      group-hover:opacity-100
      group-hover:translate-y-0
      group-hover:pointer-events-auto
    "
              >
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full  cursor-pointer"
                  
                  onClick={() => setOpen(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Member
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* 🔔 Confirmation Modal */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Remove {name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This member will be permanently removed from the team.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
              onClick={() => {
                setOpen(false)
                onRemove?.()
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
