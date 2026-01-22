"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  href?: string
  gradient: string
  iconBg: string
  buttonGradient: string
  buttonTextColor: string
  decorativeShapes?: React.ReactNode
  actionIcon?: LucideIcon
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href = "#",
  gradient,
  iconBg,
  buttonGradient,
  buttonTextColor,
  decorativeShapes,
  actionIcon: ActionIcon,
}: FeatureCardProps) {
  const content = (
    <Card
      className={`h-full ${gradient} border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden relative`}
    >
      <CardContent className="p-8 relative z-10">
        <div className="mb-4">
          <div className={`inline-block p-3 ${iconBg} rounded-lg`}>
            <Icon className="h-6 w-6 text-inherit" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 text-sm">{description}</p>
        <div className="mt-6">
          <Button className={`${buttonGradient} ${buttonTextColor} hover:shadow-lg rounded-full p-3 h-10 w-10`}>
            {ActionIcon ? <ActionIcon className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
          </Button>
        </div>
      </CardContent>
      {decorativeShapes}
    </Card>
  )

  return href && href !== "#" ? <Link href={href}>{content}</Link> : content
}
