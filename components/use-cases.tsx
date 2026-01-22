'use client'

import { CheckCircle2, Router, } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function UseCases() {
  const router=useRouter()
  const sections = [
    {
      label: "Compete & Win",
      title: "Dominate Every Campus Hackathon",
      description: "Find the perfect teammates and build winning projects faster than ever.",
      features: [
        "Find teammates with complementary skills.",
        "Share resources and code snippets securely.",
        "Get feedback from campus mentors in real-time.",
      ],
      src: "/hackathon.webp",
      buttonText: "Start Teaming",
      imageQuery: "group of students working on laptops at a hackathon, modern illustration",
      imageBg: "bg-blue-100",
      imagePos: "left",
      labelColor: "text-blue-600",
    },
    {
      label: "Entrepreneurship",
      title: "Turn Your Dorm Room Idea Into Reality",
      description: "Build your startup with the right people and get the traction you need.",
      features: [
        "Validate your MVP with real students.",
        "Build cross-functional founding teams.",
        "Pitch and get initial traction on campus.",
      ],
      src: "/ideas.avif",
      buttonText: "Launch Idea",
      imageQuery: "startup idea brainstorming, students at a whiteboard, yellow theme illustration",
      imageBg: "bg-amber-50",
      imagePos: "right",
      labelColor: "text-amber-600",
    },
    {
      label: "Collaboration",
      title: "Seamless Coordination for Group Projects",
      description: "Stop the chaos of group assignments and start collaborating effectively.",
      features: [
        "Track contributions fairly across the team.",
        "Organize all project files in one shared space.",
        "Communicate without jumping between multiple apps.",
      ],
      src: "/groupproject.jpg",
      buttonText: "Start Project",
      imageQuery: "students collaborating on a group project, pink theme illustration",
      imageBg: "bg-rose-50",
      imagePos: "left",
      labelColor: "text-rose-600",
    },

  ]

  return (
    <section id="use-cases" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold mb-20 text-center">Built for Every Kind of Collaboration</h2>

        <div className="space-y-32">
          {sections.map((section, i) => (
            <div
              key={i}
              className={`flex flex-col ${section.imagePos === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-24`}
            >
              <div className="flex-1 w-full max-w-md">
                <div
                  className={`relative aspect-square ${section.imageBg} rounded-3xl flex items-center justify-center p-8 overflow-hidden`}
                >
                  <img
                    src={section.src}
                    alt={section.title}
                    className="w-full h-full object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <span className={`text-lg font-medium ${section.labelColor}`}>{section.label}</span>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{section.title}</h3>
                <p className="text-lg text-slate-600">{section.description}</p>

                <ul className="space-y-4 pt-2">
                  {section.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6">
                  <Link href="/signup">
                    <Button onClick={()=>router.push('/signup')} size="lg" className="bg-teal-600 cursor-pointer hover:bg-teal-700 px-8 py-6 text-lg rounded-xl">
                      {section.buttonText}
                    </Button>
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
