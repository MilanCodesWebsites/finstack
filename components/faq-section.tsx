import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export function FAQSection() {
  const faqs = [
    {
      question: "How do I sign up on Finstack?",
      answer:
        "Getting started is simple! Create your account in under 3 minutes, verify your identity with our secure process, and you can start trading immediately.",
    },
    {
      question: "What currencies and gift cards can I trade?",
      answer:
        "Finstack supports a wide range of popular currencies and gift cards. You can trade major cryptocurrencies, fiat currencies, and gift cards from leading brands and retailers.",
    },
    {
      question: "How does Finstack ensure security?",
      answer:
        "We use bank-level security with end-to-end encryption, multi-factor authentication, and all users go through our comprehensive verification process to ensure a safe trading environment.",
    },
    {
      question: "What are the fees for trading?",
      answer:
        "Finstack uses transparent pricing with competitive rates. Our fees are clearly displayed before each transaction, with no hidden charges or surprise costs.",
    },
    {
      question: "How long do transactions take?",
      answer:
        "Most transactions on Finstack are processed quickly, typically within minutes to a few hours depending on the type of exchange and verification requirements.",
    },
  ]

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Got questions? We've got answers.</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about getting started with Finstack
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-4 text-lg font-semibold">
            Get Started Free
          </Button>
        </div>
      </div>
    </section>
  )
}
