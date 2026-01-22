import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturesGrid } from "@/components/features-grid"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { FAQ } from "@/components/faq"
import { UseCases } from "@/components/use-cases"
import { CTASection } from "@/components/cta-section"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans selection:bg-teal-100">
      <Navbar />

      <div className="relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-150 h-150 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-100 h-100 bg-blue-500/5 rounded-full blur-3xl" />

        <Hero />

        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-20 text-center">
              <h2 className="text-sm font-bold tracking-[0.2em] text-teal-600 uppercase mb-4">Features</h2>
              <p className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                The new standard for collaboration.
              </p>
            </header>
            <FeaturesGrid />
          </div>
        </section>

        <HowItWorks />
        <UseCases/>
        <CTASection/>
        <FAQ/>
        
      </div>

      <Footer />
    </main>
  )
}
