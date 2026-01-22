'use client'
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function CTASection() {
  const router=useRouter()
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Ready to Find Your Next Team?
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              Join thousands of students who are already building projects, winning hackathons, and landing internships
              with Colab.
            </p>
            <Link href="/signup">
              <Button onClick={()=>router.push('/signup')} size="lg" className="h-14 px-10 text-lg font-bold cursor-pointer gap-2 bg-teal-600 hover:bg-teal-700">
                <Mail className="w-5 h-5" />
                Get Started with College Email
              </Button>

            </Link>

          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[4/3]">
              <Image
                src="/teamwork.jpg"
                alt="Student collaborating on Colab"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
