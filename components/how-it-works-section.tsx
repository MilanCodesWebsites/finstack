import { Button } from "@/components/ui/button"
import { CheckCircle, Search, TrendingUp } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Create & Verify",
      description: "Sign up in minutes, verify once, and unlock the marketplace.",
      icon: CheckCircle,
    },
    {
      number: "2",
      title: "Browse & Compare",
      description: "Explore live offers, check rates, and choose what works for you.",
      icon: Search,
    },
    {
      number: "3",
      title: "Exchange & Grow",
      description: "Trade securely, track transactions, and grow your digital value with ease.",
      icon: TrendingUp,
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Three simple steps. Endless opportunities.
          </h2>
        </div>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <div key={step.number} className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-3xl font-bold text-foreground text-balance">{step.title}</h3>

                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">{step.description}</p>

                <Button variant="outline" className="rounded-full bg-transparent">
                  Get Started Today →
                </Button>
              </div>

              <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="relative mx-auto w-64 h-[500px]">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/20 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center">
                        <span className="text-primary font-bold text-xl">📱</span>
                      </div>
                      <p className="text-muted-foreground text-sm">Step {step.number} Mockup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
