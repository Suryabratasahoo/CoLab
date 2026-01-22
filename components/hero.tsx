"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Hero() {
  const router = useRouter()
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-24 bg-grid">
      <div className="container relative mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="inline-block h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden"
              >
                <img
                  src={`/avatar${i}.png`}
                  alt={`Student ${i}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-orange-400 font-medium text-sm">{"{ Trusted by 5M+ developers }"}</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800">Learn, Build, and Ship Projects with Colab</h2>

        <h1 className="mx-auto max-w-5xl text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl leading-[1.1]">
          Bored of Theory? <br />
          <span className="text-primary tracking-tight">Find Your Team. Build Something Real.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-600 md:text-xl leading-relaxed">
          Join a growing community building real projects, winning hackathons, and creating startups.<br />
          <span className="hidden md:inline">
            Start with Colab — learn by doing, collaborating, and shipping.
          </span>
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={()=>router.push("/login")} size="lg"  className="cursor-pointer h-14 px-8 text-lg font-bold gap-3 rounded-md bg-primary hover:bg-primary/90">
            <img src="/vitaplogo.png" alt="Google" className="w-5 h-5 bg-white rounded-full p-0.5" />
            Sign in
          </Button>
          <Button
            onClick={() => router.push("/login")}
            size="lg"
            variant="outline"
            className="cursor-pointer h-14 px-8 text-lg font-bold rounded-md border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
          >
            Explore Teams
          </Button>
        </div>

        {/* Floating image reference to the difficulty cards from provided image */}
        <div className="mt-16 relative mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-card border rounded-2xl shadow-2xl bg-white/50 backdrop-blur-sm">
            <div className="flex flex-col gap-4">
              <div className="h-12 w-full bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary">
                Hackathons
              </div>
              <div className="h-40 w-full bg-slate-100 rounded-lg relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-full bg-green-400/60" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-12 w-full bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary">
                Projects
              </div>
              <div className="h-40 w-full bg-slate-100 rounded-lg relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-full bg-blue-400/60" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-12 w-full bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary">
                Startups
              </div>
              <div className="h-40 w-full bg-slate-100 rounded-lg relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-full bg-red-400/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
