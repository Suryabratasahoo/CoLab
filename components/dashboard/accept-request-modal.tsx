"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface AcceptRequestModalProps {
  open: boolean
  userName: string
  onConfirm: () => void
  onCancel: () => void
}

export function AcceptRequestModal({ open, userName, onConfirm, onCancel }: AcceptRequestModalProps) {
  const [isConfirming, setIsConfirming] = useState(false)

  const handleConfirm = () => {
    setIsConfirming(true)
    setTimeout(() => {
      onConfirm()
      setIsConfirming(false)
    }, 600)
  }

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="bg-white border-0 shadow-xl rounded-[2rem] max-w-md">
        <DialogHeader className="text-center space-y-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full">
              <div className="text-3xl">✓</div>
            </div>
          </motion.div>
          <DialogTitle className="text-2xl font-bold text-[#1A1F36] text-center">Confirm Request</DialogTitle>
        </DialogHeader>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="text-center text-[#4F5B76] leading-relaxed">
            By accepting the request, you are letting <span className="font-bold text-[#1A1F36]">{userName}</span> be a
            part of your team.
          </p>
        </motion.div>

        <DialogFooter className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isConfirming}
            className="flex-1 rounded-xl border-2 border-[#E3E8EE] text-[#1A1F36] hover:bg-gray-50 font-semibold bg-transparent"
          >
            No
          </Button>
          <motion.div className="flex-1" whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleConfirm}
              disabled={isConfirming}
              className="w-full bg-[#0D8B8B] hover:bg-[#0A6B6B] text-white rounded-xl font-semibold transition-all"
            >
              {isConfirming ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: 0 }}>
                  ✓
                </motion.div>
              ) : (
                "Yes"
              )}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
