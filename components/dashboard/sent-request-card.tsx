"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRequestStore } from "@/stores/useRequestStore"

interface SentRequestCardProps {
  id:string
  teamName: string
  category: string
  status: "pending" | "accepted" | "rejected"
  sentDate: string
  onViewDetails?: () => void
  onCancel?: () => void
}

export function SentRequestCard({
  id,
  teamName,
  category,
  status,
  sentDate,
  onViewDetails,
  onCancel,
}: SentRequestCardProps) {
  const [isCanceling, setIsCanceling] = useState(false)

  const statusConfig = {
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      icon: Clock,
      color: "text-amber-600",
    },
    accepted: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    rejected: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      icon: XCircle,
      color: "text-rose-600",
    },
  }

  const config = statusConfig[status]
  const IconComponent = config.icon

  const categoryColors = {
    Hackathon: "bg-purple-100 text-purple-700 border-purple-200",
    Startup: "bg-orange-100 text-orange-700 border-orange-200",
    "Group Project": "bg-blue-100 text-blue-700 border-blue-200",
  }

  const handleCancel = () => {
    setIsCanceling(true)
    setTimeout(() => {
      onCancel?.()
    }, 600)
  }

  const handleDelete=async()=>{
    useRequestStore.getState().removeSent(id)
    try{
      const res=await fetch(`/api/requests/${id}`,{
        method:"DELETE"
      })
      if(!res.ok) throw new Error("Failed to delete request")
      toast.success("Request deleted successfully")
    }catch(err){
      toast.error("Failed to delete request")
    }
  }

  return (
    <AnimatePresence>
      {!isCanceling && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50, rotate: -10 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        //   exit={{ duration: 0.6, ease: "easeIn" }}
          className="h-[280px] flex flex-col"
        >
          <Card className="w-full border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all rounded-[2.5rem] bg-white overflow-hidden h-full flex flex-col">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="flex items-start justify-between gap-6 flex-shrink-0">
                <div className="flex-1 flex gap-6 items-start">
                  <motion.div
                    className={`p-4 rounded-full flex-shrink-0 ${config.bg}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className={`h-6 w-6 ${config.color}`} />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-[#1A1F36] mb-3 line-clamp-2">{teamName}</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge
                        className={`${categoryColors[category as keyof typeof categoryColors]} text-xs px-3 py-1 border flex-shrink-0`}
                      >
                        {category}
                      </Badge>
                      <span className="text-xs text-gray-500 font-medium flex-shrink-0">· Sent {sentDate}</span>
                    </div>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
                  <Badge
                    className={`${config.bg} ${config.text} border ${config.border} px-6 py-3 font-bold text-sm whitespace-nowrap`}
                  >
                    {status}
                  </Badge>
                </motion.div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex gap-4 flex-shrink-0">
                {status === "accepted" && (
                  <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="flex-1 h-12 rounded-[1.25rem] border-2 border-[#1A1F36] text-[#1A1F36] font-bold hover:bg-gray-50 bg-transparent"
                >
                  Delete Request
                </Button>
                 )} 
                {/* <Button
                  variant="outline"
                  onClick={onViewDetails}
                  className="flex-1 h-12 rounded-[1.25rem] border-2 border-[#1A1F36] text-[#1A1F36] font-bold hover:bg-gray-50 bg-transparent"
                >
                  View Details
                </Button> */}
                {status === "pending" && (
                  <Button
                    variant="ghost"
                    onClick={handleCancel}
                    className="flex-1 h-12 rounded-[1.25rem] text-rose-600 hover:bg-rose-50 font-bold"
                  >
                    Cancel Request
                  </Button>
                 )} 
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
