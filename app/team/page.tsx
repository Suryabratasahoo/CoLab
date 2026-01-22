import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TeamGrid } from "@/components/team-grid"
import { TeamHero } from "@/components/team-hero"

export const metadata = {
  title: "Meet Our Team | Colab",
  description: "Meet the talented team behind Colab, building the future of collaboration.",
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <TeamHero />
      <TeamGrid />
      <Footer />
    </main>
  )
}
