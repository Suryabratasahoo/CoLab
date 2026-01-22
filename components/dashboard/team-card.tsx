import { Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TeamCardProps {
  id: string
  category: "hackathon" | "project" | "startup" | "research"
  title: string
  description: string
  skills: string[]
  teamSize: { current: number; total: number }
  commitmentLevel: "low" | "medium" | "high"
  urgent?: boolean
  popular?: boolean
}

const categoryStyles = {
  hackathon: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  project: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  startup: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  research: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
}

const commitmentStyles = {
  low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  medium: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  high: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
}

export function TeamCard({
  category,
  title,
  description,
  skills,
  teamSize,
  commitmentLevel,
  urgent,
  popular,
}: TeamCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      {/* Gradient background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-indigo-950/20" />

      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-2">
          <Badge className={cn("capitalize", categoryStyles[category])}>{category}</Badge>
          {urgent && (
            <Badge variant="destructive" className="text-xs">
              Urgent
            </Badge>
          )}
          {popular && (
            <Badge variant="secondary" className="text-xs">
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{skills.length - 4}
            </Badge>
          )}
        </div>

        {/* Team Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>
              {teamSize.current} / {teamSize.total}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <Badge className={cn("text-xs capitalize", commitmentStyles[commitmentLevel])} variant="secondary">
              {commitmentLevel}
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative">
        <Button className="w-full" variant="default">
          View Team
        </Button>
      </CardFooter>
    </Card>
  )
}
