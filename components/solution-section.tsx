import { Users, Zap, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SolutionSection() {
  const solutions = [
    {
      title: "Find Teams",
      description:
        "Browse curated team posts by specific skills, roles, and project goals. No more searching in dark corners.",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Build Better Teams",
      description:
        "View verified student profiles, previous projects, and GitHub links to ensure high-quality collaboration.",
      icon: Zap,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Campus-Only Trust",
      description: "Every user is verified via their .edu email. No strangers, no spam—just your actual college peers.",
      icon: ShieldCheck,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ]

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How Colab Helps</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We built the platform we wished we had as students. Simple, fast, and secure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((item, i) => (
            <Card key={i} className="border-2 hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <CardTitle className="text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
