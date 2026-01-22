"use client"

import { Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ActivityPanel() {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-sm font-bold text-white uppercase tracking-wider px-1">Active Modules</h2>

      <Card className="border-none bg-[#DDE0FF] text-[#1E1B4B] overflow-hidden">
        <CardContent className="flex flex-col items-center justify-center py-10 px-6 text-center">
          <div className="mb-6 relative">
            {/* Briefcase Illustration Placeholder */}
            <div className="relative z-10">
              <Briefcase className="h-16 w-16 text-[#1E1B4B]/80" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-6 w-8 bg-[#1E1B4B]/10 rounded rotate-12" />
          </div>

          <h3 className="mb-3 text-lg font-bold leading-tight">You have no active modules. Ready to start learning?</h3>

          <p className="text-xs font-medium text-[#1E1B4B]/60 leading-relaxed max-w-[200px]">
            Browse our tutorials, interview preps, or mock assessments to begin your learning journey.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
