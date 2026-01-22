import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      q: "How do I get started with Colab?",
      a: "Simply sign up with your verified college email address. You'll instantly be connected to your campus network.",
    },
    {
      q: "Is it really free for students?",
      a: "Yes, Colab is 100% free for students. Our goal is to empower student innovation, not profit from it.",
    },
    {
      q: "Can I find teammates from other colleges?",
      a: "Currently, Colab focuses on intra-campus collaboration to build trust and facilitate in-person meetups, but we're exploring inter-college features.",
    },
    {
      q: "What happens if I don't have a .edu email?",
      a: "To maintain the safety and exclusivity of our student platform, we currently require a valid college email for signup.",
    },
  ]

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-white px-6 border rounded-xl overflow-hidden">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
