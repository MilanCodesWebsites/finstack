import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Move money without borders.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
                Finstack makes global transfers simple, instant, and stress-free. Send money across countries at unbeatable
                rates with security you can trust.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-4 text-lg font-semibold flex items-center gap-2">
                <ArrowRight size={20} />
                Get Started
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 py-4 text-lg font-semibold flex items-center gap-2 bg-transparent"
              >
                About Us
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto w-64 h-96 md:w-80 md:h-[500px]">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/20 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">📱</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Mobile App Mockup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
