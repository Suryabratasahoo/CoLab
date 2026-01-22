import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const categoryStyles = {
  hackathon: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  project: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  startup: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  research: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
}

const recentPosts = [
  {
    id: "1",
    title: "Seeking iOS Developer for EdTech App",
    category: "project" as const,
    timeAgo: "2 hours ago",
  },
  {
    id: "2",
    title: "Cybersecurity Research Team Formation",
    category: "research" as const,
    timeAgo: "4 hours ago",
  },
  {
    id: "3",
    title: "Web3 Gaming Hackathon - Smart Contract Dev Needed",
    category: "hackathon" as const,
    timeAgo: "6 hours ago",
  },
  {
    id: "4",
    title: "SaaS Startup Co-founder Search",
    category: "startup" as const,
    timeAgo: "8 hours ago",
  },
]

export function RecentPosts() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Recently Created Team Posts</h2>
        <p className="text-sm text-muted-foreground">Fresh opportunities from the platform</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {recentPosts.map((post) => (
          <Card
            key={post.id}
            className="cursor-pointer transition-all hover:border-indigo-200 hover:shadow-md dark:hover:border-indigo-800"
          >
            <CardContent className="flex items-start gap-3 p-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={cn("text-xs capitalize", categoryStyles[post.category])}>{post.category}</Badge>
                </div>
                <p className="line-clamp-2 text-sm font-medium text-foreground">{post.title}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {post.timeAgo}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
