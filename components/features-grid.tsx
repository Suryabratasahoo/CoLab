import { Sparkles, GraduationCap, FileCode, Trophy, Award, Target } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Teammate Matching(future updates)",
    description: "Get smart recommendations to find the right teammates for your idea.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: GraduationCap,
    title: "Mentor & Expert Guidance",
    description: "Get advice from experienced builders, mentors, and industry experts.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: FileCode,
    title: "Project & Startup Collaboration",
    description: "Form teams to build real-world projects and startup ideas.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Trophy,
    title: "Hackathons & Competitions",
    description: "Discover and participate in hackathons with your team.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Award,
    title: "Verified Profiles & Achievements",
    description: "Showcase your skills, projects, and hackathon wins.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Target,
    title: "Goal-Oriented Team Building",
    description: "Find collaborators based on skills, goals, and interests.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
]


export function FeaturesGrid() {
  return (
    <section className="py-1 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16 relative">
          <div className="flex items-start gap-4">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Key Features & Benefits
            </p>
            <svg
              className="w-12 h-12 text-indigo-400 opacity-60 -mt-2"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 6C24 6 30 12 36 18C36 18 30 24 24 30C24 30 18 24 12 18C12 18 18 12 24 6Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M20 28C20 28 24 32 24 36M28 28C28 28 24 32 24 36"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-10 bg-background hover:bg-accent/50 transition-colors group"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className={`${feature.bgColor} rounded-2xl p-4 shrink-0`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
