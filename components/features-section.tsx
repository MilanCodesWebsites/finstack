import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Star, ArrowRight, Users, TrendingUp, Zap } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="py-12 md:py-20 px-4 bg-gray-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <span className="text-lg md:text-xl lg:text-2xl">🏆</span>
            <span className="text-gray-300 font-medium text-xs md:text-sm lg:text-base">
              No. 1 Investment App in the US
            </span>
            <span className="text-lg md:text-xl lg:text-2xl">🇺🇸</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 text-balance leading-tight">
                Not just features—
                <br />
                your edge in global transfers.
              </h2>
            </div>
            <div className="lg:pt-4">
              <p className="text-sm md:text-lg lg:text-xl text-gray-300 text-pretty leading-relaxed">
                From real-time exchange rates to lightning-fast delivery, every feature is designed to make sending
                money across borders simple, secure, and cost-effective.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6 h-auto w-full">
          {/* Left Column - Users and Stats */}
          <div className="lg:col-span-4 space-y-3 md:space-y-4 lg:space-y-6 w-full">
            {/* Users Card */}
            <Card className="p-4 md:p-6 lg:p-8 bg-gray-800 border-gray-700 shadow-sm min-h-[200px] md:min-h-[240px] lg:min-h-[280px] flex flex-col justify-between w-full">
              <div>
                <div className="flex items-center space-x-2 mb-3 md:mb-4 lg:mb-6">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-primary mr-1 md:mr-2" />
                  <div className="flex -space-x-1 md:-space-x-2 lg:-space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-gray-800 shadow-sm"></div>
                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-gray-800 shadow-sm"></div>
                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-gray-800 shadow-sm"></div>
                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-gray-800 shadow-sm"></div>
                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-gray-800 shadow-sm"></div>
                  </div>
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2">25,000+</div>
                <p className="text-gray-300 font-medium text-xs md:text-sm lg:text-base">Users worldwide</p>
                <p className="text-gray-400 text-xs md:text-sm mt-2">
                  People across the globe trust Finstack to send money quickly and securely, no matter where they are.
                </p>
              </div>

              {/* Transfer Stats */}
              <div className="space-y-2 md:space-y-3 mt-4 md:mt-6 lg:mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs md:text-sm">Seamless Transfers</span>
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-primary rounded-full flex items-center justify-center">
                      <TrendingUp size={10} className="text-white md:w-3 md:h-3" />
                    </div>
                    <span className="font-bold text-white text-xs md:text-sm lg:text-base">$12,440.17</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs md:text-sm">Received</span>
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-primary rounded-full flex items-center justify-center">
                      <TrendingUp size={10} className="text-white md:w-3 md:h-3" />
                    </div>
                    <span className="font-bold text-white text-xs md:text-sm lg:text-base">€11,790.55</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 90% Stats Card */}
            <Card className="p-4 md:p-6 lg:p-8 bg-gray-800 border-gray-700 shadow-sm w-full">
              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-8 items-center">
                <div>
                  <div className="flex items-center gap-1 md:gap-2 mb-2">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary" />
                    <div className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-white">90%</div>
                  </div>
                  <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white mb-2">
                    Transfers completed in minutes
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm">
                    Over 90% of Finstack transfers arrive within minutes, giving you speed and peace of mind.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-16 h-24 md:w-20 md:h-32 lg:w-24 lg:h-36 bg-gray-700 rounded-2xl shadow-lg border border-gray-600 flex items-center justify-center">
                    <div className="text-center space-y-1 md:space-y-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-primary/20 rounded-xl mx-auto flex items-center justify-center">
                        <div className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-primary rounded-lg"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1 md:h-1.5 bg-gray-600 rounded w-6 md:w-8 lg:w-10 mx-auto"></div>
                        <div className="h-1 md:h-1.5 bg-gray-600 rounded w-4 md:w-6 lg:w-8 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Center Column - Phone Mockup */}
          <div className="lg:col-span-2 flex justify-center items-center order-last lg:order-none">
            <div className="relative">
              <div className="w-24 h-48 md:w-32 md:h-64 lg:w-40 lg:h-80 bg-gray-800 rounded-3xl border border-gray-600 shadow-2xl flex items-center justify-center">
                <div className="text-center space-y-1 md:space-y-2">
                  <div className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center">
                    <span className="text-primary font-bold text-sm md:text-lg lg:text-xl">📱</span>
                  </div>
                  <p className="text-gray-400 text-xs">Transfer App</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Security Card - Increased width */}
          <div className="lg:col-span-6 w-full">
            <Card className="p-4 md:p-6 lg:p-8 bg-gray-800 text-white border-gray-700 shadow-sm h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex flex-col justify-between w-full">
              <div>
                <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6">
                  <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-primary/20 rounded-2xl">
                    <Shield className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-primary" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-2 md:mb-4">
                  Bank-Grade
                </div>
                <div className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 lg:mb-6">Security</div>

                <p className="text-gray-300 mb-4 md:mb-6 lg:mb-8 text-xs md:text-sm lg:text-base">
                  Your money and data are always protected with multi-layer encryption and international compliance
                  standards.
                </p>

                <blockquote className="text-sm md:text-base lg:text-lg text-gray-300 mb-4 md:mb-6 lg:mb-8 italic">
                  "Finally, a transfer app that makes sending money globally simple. Real-time rates and instant
                  delivery—exactly what I needed."
                </blockquote>
              </div>

              <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold py-2 md:py-3 lg:py-4 text-sm md:text-base lg:text-lg rounded-xl flex items-center justify-center gap-2">
                <ArrowRight size={16} className="md:w-4 md:h-4 lg:w-5 lg:h-5" />
                Get Started - It's FREE
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
