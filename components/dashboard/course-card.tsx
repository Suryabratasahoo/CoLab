import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface CourseCardProps {
  title: string
  image: string
  enrollment: string
  difficulty: "Easy" | "Medium" | "Hard"
  duration: string
  isPremium?: boolean
}

export function CourseCard({ title, image, enrollment, difficulty, duration, isPremium = true }: CourseCardProps) {
  return (
    <Card className="overflow-hidden border-white/5 bg-white/[0.03] backdrop-blur-xl group cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg?height=225&width=400&query=coding+course"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className="bg-indigo-600 text-white border-none px-2 py-0.5 text-[10px] font-bold shadow-lg">
            Course
          </Badge>
        </div>
        {isPremium && (
          <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
            <Badge className="bg-amber-500 text-black border-none px-2 py-0.5 text-[10px] font-bold shadow-lg">
              Premium
            </Badge>
            <div className="flex h-7 w-11 items-center justify-center rounded-md bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              <span className="text-[10px] font-black text-white uppercase tracking-tighter">aws</span>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-4">
        <h3 className="line-clamp-2 text-[15px] font-bold text-white group-hover:text-primary transition-colors min-h-[44px] leading-tight">
          {title}
        </h3>

        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
          <div className="flex items-center gap-1.5">
            <UserRound className="h-3.5 w-3.5 text-primary/80" />
            <span>{enrollment}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5 text-primary/80" />
            <span>{difficulty}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary/80" />
            <span>{duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper icons for the card footer (matching image metadata icons)
function UserRound(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 20a6 6 0 0 0-12 0" />
      <circle cx="12" cy="10" r="4" />
    </svg>
  )
}

function BarChart3(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  )
}
