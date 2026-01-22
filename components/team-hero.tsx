"use client"

export function TeamHero() {
  return (
    <section className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium text-primary border border-border">
          Meet Our Team
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
          Talented Minds, Exceptional Results
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
          We're a diverse team of innovators, designers, and engineers passionate about creating the best collaboration
          experience. Each member brings unique expertise and creativity to everything we build.
        </p>

        <div className="flex justify-center gap-4">
          <button className="px-8 py-2.5 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors">
            Join Our Team
          </button>
          <button className="px-8 py-2.5 border border-border rounded font-medium hover:bg-muted transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
