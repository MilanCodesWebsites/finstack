import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Finstack</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Finstack is revolutionizing the way people transfer money globally. We believe that sending money across
              borders should be as simple as sending a text message.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Founded with a mission to make international money transfers accessible, affordable, and instant, we
              leverage cutting-edge technology to provide bank-grade security with lightning-fast transaction speeds.
            </p>
            <p className="text-lg text-muted-foreground">
              Our platform serves thousands of users worldwide, helping them stay connected with their loved ones and
              manage their finances across borders with confidence.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
