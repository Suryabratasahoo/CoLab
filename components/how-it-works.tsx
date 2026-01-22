"use client"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Users, MessageSquare, Zap, Rocket } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function HowItWorks() {
  const router=useRouter()
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Sign Up with Your College Email",
      text: "Create your Colab account using your verified college email and a few basic details to keep the community safe and authentic.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Set Up Your Profile",
      text: "Add your skills, interests, experience, and what you’re looking to build — hackathons, projects, or startups.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Create or Discover Teams",
      text: "Post your own team requirements or explore existing teams that match your skills and interests.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: "Request to Join or Invite Members",
      text: "Send join requests to teams you like or invite students to collaborate on your idea.",
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Manage Teams & Requests",
      text: "Accept or reject requests, manage team members, and keep everything organized from one dashboard.",
    },
  ]

  const steps = [
  {
    number: "1",
    text: (
      <>
        Sign up on <strong>Colab</strong> using your college email
      </>
    ),
  },
  {
    number: "2",
    text: (
      <>
        Complete your <strong>profile</strong> with skills, interests, and goals
      </>
    ),
  },
  {
    number: "3",
    text: (
      <>
        Create a <strong>team post</strong> or explore teams that match your interests
      </>
    ),
  },
  {
    number: "4",
    text: (
      <>
        Send or receive <strong>join requests</strong> and connect via built-in chat
      </>
    ),
  },
  {
    number: "5",
    text: (
      <>
        Collaborate, build, and <strong>ship projects</strong> with your team
      </>
    ),
  },
]


  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="mb-16 relative">
          <div className="flex items-start gap-4">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-mono">How it works</p>
            <svg
              className="w-10 h-10 text-indigo-400 opacity-60 mt-[-8px]"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C12 12 18 18 24 24C24 24 30 18 36 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M24 24V40M24 40L18 34M24 40L30 34"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative bg-indigo-50/50 p-8 rounded-2xl border border-indigo-100 hover:border-indigo-200 transition-all duration-300 min-h-[280px] flex flex-col items-center text-center group"
            >
              <p className="text-foreground/80 leading-relaxed text-sm lg:text-base z-10 relative">{step.text}</p>

              {/* Large Number Glyph */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-0">
                <span className="text-8xl font-black text-indigo-600/10 group-hover:text-indigo-600/20 transition-colors select-none">
                  {step.number}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mt-24">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 relative z-10">
            <div className="relative inline-block mb-6">
              <span className="absolute -top-1 -left-2 -right-2 -bottom-1 border-2 border-orange-300 rounded-[100%] rotate-[-2deg] opacity-70" />
              <h2 className="text-4xl md:text-5xl font-bold relative">Process</h2>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">that drives our community</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Colab is built specifically for the college ecosystem. We make it easy to find serious partners for your
              next hackathon or startup.
            </p>
            <Button onClick={()=>router.push('/signup')} size="lg" className="cursor-pointer rounded-md px-8 h-14 text-lg bg-[#5c7cfa] hover:bg-[#4c6ef5] transition-all">
              Get Started
            </Button>

            {/* Hand Image - Positioning inspired by reference
            <div className="mt-20 hidden lg:block">
              <Image
                src="/human-hand-making-ok-sign.jpg"
                alt="Hand Gesture"
                width={200}
                height={200}
                className="opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div> */}
          </div>

          {/* Right Content - Tilted Cards */}
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative md:translate-x-12">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className={`bg-white p-8 rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-105 hover:-translate-y-2
                    ${i === 0 ? "lg:-rotate-6 lg:-translate-y-8" : ""}
                    ${i === 1 ? "lg:rotate-3 lg:translate-y-12" : ""}
                    ${i === 2 ? "lg:-rotate-3 lg:translate-y-0" : ""}
                    ${i === 3 ? "lg:rotate-6 lg:translate-y-16" : ""}
                    ${i === 4 ? "lg:-rotate-2 lg:translate-y-4 md:col-span-2 lg:col-span-1" : ""}
                  `}
                >
                  <div className="bg-primary/5 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
