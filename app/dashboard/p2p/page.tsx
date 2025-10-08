"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRightLeft, Info, Star } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { convertCurrency } from "@/lib/mock-api"
import { cn } from "@/lib/utils"

const traders = [
  {
    id: 1,
    name: "John Doe",
    rating: 4.8,
    trades: 234,
    price: 1650,
    currency: "NGN",
    min: 10000,
    max: 500000,
    paymentMethods: ["Bank Transfer", "Mobile Money"],
  },
  {
    id: 2,
    name: "Sarah Chen",
    rating: 4.9,
    trades: 456,
    price: 1645,
    currency: "NGN",
    min: 20000,
    max: 1000000,
    paymentMethods: ["Bank Transfer"],
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 4.7,
    trades: 189,
    price: 1655,
    currency: "NGN",
    min: 5000,
    max: 300000,
    paymentMethods: ["Bank Transfer", "Mobile Money", "Cash"],
  },
]

const currencies = [
  { 
    value: "NGN", 
    label: "Nigerian Naira", 
    symbol: "₦", 
    logo: "https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/f0f01069-7e35-4291-8664-af625c9c9623-nigeria-logo.png"
  },
  { 
    value: "RMB", 
    label: "Chinese Yuan", 
    symbol: "¥", 
    logo: "https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/a0e173f8-1f7d-4317-bead-1182d677213c-rmb.png"
  },
  { 
    value: "USDT", 
    label: "Tether", 
    symbol: "$", 
    logo: "https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/ef95eebe-7923-4b32-87a6-d755b8caba30-usdt%20logo.png"
  },
]

export default function P2PPage() {
  const [fromCurrency, setFromCurrency] = useState("NGN")
  const [toCurrency, setToCurrency] = useState("USDT")
  const [amount, setAmount] = useState("1000")
  const [liveRates, setLiveRates] = useState<{ [key: string]: number }>({})
  const [loadingRates, setLoadingRates] = useState(true)

  // Fetch live exchange rates
  useEffect(() => {
    const fetchLiveRates = async () => {
      try {
        setLoadingRates(true)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
        if (!response.ok) throw new Error('Failed to fetch rates')
        
        const data = await response.json()
        
        // Convert to our currency format
        const rates = {
          'NGN-USDT': 1 / data.rates.NGN, // NGN to USD (USDT)
          'USDT-NGN': data.rates.NGN, // USD (USDT) to NGN
          'RMB-USDT': 1 / data.rates.CNY, // CNY to USD
          'USDT-RMB': data.rates.CNY, // USD to CNY
          'NGN-RMB': data.rates.CNY / data.rates.NGN, // NGN to CNY
          'RMB-NGN': data.rates.NGN / data.rates.CNY, // CNY to NGN
        }
        
        setLiveRates(rates)
      } catch (error) {
        console.error('Failed to fetch live rates:', error)
        // Fallback to mock rates if API fails
        setLiveRates({
          'NGN-USDT': 0.0006,
          'USDT-NGN': 1650,
          'RMB-USDT': 0.14,
          'USDT-RMB': 7.2,
          'NGN-RMB': 0.0043,
          'RMB-NGN': 230,
        })
      } finally {
        setLoadingRates(false)
      }
    }

    fetchLiveRates()
    // Refresh rates every 30 seconds
    const interval = setInterval(fetchLiveRates, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const convertedAmount = amount ? convertCurrencyWithLiveRates(Number.parseFloat(amount), fromCurrency, toCurrency, liveRates) : 0

  function convertCurrencyWithLiveRates(amount: number, from: string, to: string, rates: { [key: string]: number }): number {
    if (from === to) return amount
    
    const rateKey = `${from}-${to}`
    const rate = rates[rateKey]
    
    if (rate) {
      return amount * rate
    }
    
    // Fallback to mock conversion if rate not found
    return convertCurrency(amount, from, to)
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const getBalance = (currency: string) => {
    return "-- " + currency
  }

  const getRate = () => {
    if (loadingRates) return "Loading..."
    const rate = convertedAmount / (Number.parseFloat(amount) || 1)
    return `1 ${fromCurrency} ≈ ${rate.toFixed(6)} ${toCurrency}`
  }

  const getUSDEquivalent = () => {
    if (loadingRates) return "Loading..."
    const usdAmount = convertCurrencyWithLiveRates(Number.parseFloat(amount) || 0, fromCurrency, "USDT", liveRates)
    return `≈ ${usdAmount.toFixed(6)} USDT`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">P2P Trading</h1>
          <p className="text-gray-600">Trade directly with other users</p>
        </div>
      </div>

      <Tabs defaultValue="buy" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
          <TabsTrigger value="swap">Swap</TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="space-y-6 mt-6">
          <Card className="shadow-lg border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Buy USDT</h3>
              <div className="space-y-4">
                {traders.map((trader) => (
                  <div key={trader.id} className="grid md:grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#2F67FA] transition-colors">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Trader</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{trader.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{trader.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{trader.trades} trades</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Price</p>
                      <p className="text-lg font-semibold text-foreground">₦{trader.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">per USDT</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Limits</p>
                      <p className="text-sm text-foreground">
                        ₦{trader.min.toLocaleString()} - ₦{trader.max.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Payment Methods</p>
                      <div className="flex flex-wrap gap-1">
                        {trader.paymentMethods.map((method) => (
                          <span key={method} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full bg-[#2F67FA] hover:bg-[#2F67FA]/90 text-white">Buy</Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sell" className="space-y-6 mt-6">
          <Card className="shadow-lg border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Sell USDT</h3>
              <div className="space-y-4">
                {traders.map((trader) => (
                  <div key={trader.id} className="grid md:grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#2F67FA] transition-colors">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Trader</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{trader.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{trader.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{trader.trades} trades</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Price</p>
                      <p className="text-lg font-semibold text-foreground">₦{trader.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">per USDT</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Limits</p>
                      <p className="text-sm text-foreground">
                        ₦{trader.min.toLocaleString()} - ₦{trader.max.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Payment Methods</p>
                      <div className="flex flex-wrap gap-1">
                        {trader.paymentMethods.map((method) => (
                          <span key={method} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full bg-[#2F67FA] hover:bg-[#2F67FA]/90 text-white">Sell</Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="swap" className="space-y-6 mt-6">
          <Card className="max-w-md mx-auto shadow-lg border-0 bg-white">
            <div className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Currency Converter</h3>
                  <p className="text-gray-600">Real-time exchange rates</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">From</span>
                    <span className="text-sm text-gray-500">Balance: {getBalance(fromCurrency)}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-transparent border-0 text-gray-900 text-xl font-semibold placeholder:text-gray-400 focus-visible:ring-0 p-0 h-auto"
                        placeholder="0"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {getUSDEquivalent()}
                      </div>
                    </div>
                    
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="w-auto bg-white border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-2">
                          <img 
                            src={currencies.find(c => c.value === fromCurrency)?.logo} 
                            alt={fromCurrency}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-medium">{fromCurrency}</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            <div className="flex items-center gap-2">
                              <img 
                                src={currency.logo} 
                                alt={currency.value}
                                className="w-5 h-5 rounded-full object-cover"
                              />
                              <span>{currency.value}</span>
                              <span className="text-gray-500 text-xs">- {currency.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleSwap}
                    className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 flex items-center justify-center group"
                  >
                    <ArrowRightLeft className="w-4 h-4 text-white transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">To</span>
                    <span className="text-sm text-gray-500">Balance: {getBalance(toCurrency)}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex-1">
                      <div className="text-xl font-semibold text-gray-900">
                        {convertedAmount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 6,
                        })}
                      </div>
                    </div>
                    
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="w-auto bg-white border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-2">
                          <img 
                            src={currencies.find(c => c.value === toCurrency)?.logo} 
                            alt={toCurrency}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-medium">{toCurrency}</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            <div className="flex items-center gap-2">
                              <img 
                                src={currency.logo} 
                                alt={currency.value}
                                className="w-5 h-5 rounded-full object-cover"
                              />
                              <span>{currency.value}</span>
                              <span className="text-gray-500 text-xs">- {currency.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Info className="w-4 h-4" />
                  <span>Rate</span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      loadingRates ? "bg-yellow-500 animate-pulse" : "bg-green-500"
                    )} />
                    <span className="font-medium">{getRate()}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {loadingRates ? "Updating rates..." : "Live rates • Updates every 30s"}
                </p>
              </div>

              <div className="mt-6">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg">
                  Convert Now
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}