import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Monitor, BarChart3, Users } from "lucide-react"

export function GrowMoneySection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Tools built for your growth.</h2>

          {/* Navigation Arrows */}
          
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* One Dashboard, Total Control */}
          <Card className="p-8 bg-white border-0 shadow-sm">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Monitor className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  One Dashboard,
                  <br />
                  Total Control
                </h3>
                <p className="text-muted-foreground">
                  Manage all your exchanges from a single, clean, browser-based dashboard.
                </p>
              </div>
            </div>
          </Card>

          {/* Live Market Insights */}
          <Card className="p-8 bg-white border-0 shadow-sm">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Live Market
                  <br />
                  Insights
                </h3>
                <p className="text-muted-foreground">
                  Access transparent pricing and real-time updates to trade smarter.
                </p>
              </div>
            </div>
          </Card>

          {/* Community You Can Trust */}
          <Card className="p-8 bg-white border-0 shadow-sm">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Community You
                  <br />
                  Can Trust
                </h3>
                <p className="text-muted-foreground">
                  Every buyer and seller on Finstack is verified—so you can trade with confidence.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Money Illustration */}
        <div className="mt-16 text-center">
          <div className="relative inline-block">
            <div className="w-80 h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center">
                  <span className="text-primary font-bold text-2xl">💰</span>
                </div>
                <p className="text-muted-foreground text-sm">Money Growth Illustration</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Testimonials */}
        <div className="mt-16 flex justify-center">
          <div className="flex -space-x-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-12 h-12 rounded-full bg-primary/20 border-4 border-white"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
