import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center -space-x-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-16 h-16 rounded-full bg-primary/20 border-4 border-white"></div>
            ))}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Trusted by thousands worldwide.</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From everyday users to growing businesses, people rely on Finstack to move money securely and without
            hassle. Our community makes trust the standard.
          </p>
        </div>

        {/* App Screenshots Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="relative h-96">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">📱</span>
                </div>
                <p className="text-muted-foreground text-sm">App Screenshot 1</p>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">📱</span>
                </div>
                <p className="text-muted-foreground text-sm">App Screenshot 2</p>
              </div>
            </div>
          </div>
          <div className="relative h-96 md:col-span-2 lg:col-span-1">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">📱</span>
                </div>
                <p className="text-muted-foreground text-sm">App Screenshot 3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              rating: 5,
              text: "Finstack has completely transformed how I trade currencies. The platform is incredibly secure and user-friendly.",
              author: "Sarah Chen",
              role: "Digital Nomad",
            },
            {
              rating: 5,
              text: "I've tried many exchange platforms, but Finstack's verification process and community trust make it stand out.",
              author: "Michael Rodriguez",
              role: "Business Owner",
            },
            {
              rating: 5,
              text: "The real-time market insights and transparent pricing have helped me make better trading decisions.",
              author: "Emily Johnson",
              role: "Freelancer",
            },
          ].map((review, index) => (
            <Card key={index} className="p-6 bg-white border-0 shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 text-pretty">"{review.text}"</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                <div>
                  <div className="font-semibold text-foreground">{review.author}</div>
                  <div className="text-sm text-muted-foreground">{review.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
