import { XCircle } from "lucide-react"

export function ProblemSection() {
  const painPoints = [
    "Friends not interested in the same niche as you",
    "WhatsApp groups are noisy, unorganized, and full of spam",
    "Hard to find people with the specific tech stack you need",
  ]

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-balance md:text-4xl">
              Ever skipped an event because you had no team?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Finding the right collaborators shouldn't be harder than the project itself. We've all been there—the
              frustration of missing out because your network didn't match your ambition.
            </p>
            <ul className="space-y-4">
              {painPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-lg font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square bg-white border-2 border-dashed border-primary/20 rounded-3xl flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🤝?</div>
                <p className="text-xl font-bold text-muted-foreground">Looking for teammates...</p>
              </div>
            </div>
            {/* Decorative elements inspired by Vercel/Next.js lines */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
