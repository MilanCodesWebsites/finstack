"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRightLeft, Star } from "lucide-react"
import { convertCurrency } from "@/lib/mock-api"

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

export default function P2PPage() {
  const [fromCurrency, setFromCurrency] = useState("NGN")
  const [toCurrency, setToCurrency] = useState("USDT")
  const [amount, setAmount] = useState("")

  const convertedAmount = amount ? convertCurrency(Number.parseFloat(amount), fromCurrency, toCurrency) : 0

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className="space-y-6">
      <div className="animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">P2P Trading</h1>
        <p className="text-gray-600">Buy and sell crypto directly with other users</p>
      </div>

      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
          <TabsTrigger value="swap">Swap</TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="space-y-6 mt-6">
          <Card className="p-6 shadow-lg border-gray-200">
            <h3 className="text-lg font-semibold text-foreground mb-4">Buy USDT</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Trader</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Price</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Limits</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Payment</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {traders.map((trader) => (
                    <tr key={trader.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2">
                        <div>
                          <p className="font-medium text-foreground">{trader.name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">
                              {trader.rating} ({trader.trades} trades)
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <p className="font-semibold text-foreground">₦{trader.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">per USDT</p>
                      </td>
                      <td className="py-4 px-2">
                        <p className="text-sm text-gray-600">
                          ₦{trader.min.toLocaleString()} - ₦{trader.max.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex flex-wrap gap-1">
                          {trader.paymentMethods.map((method) => (
                            <span
                              key={method}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full whitespace-nowrap"
                            >
                              {method}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <Button size="sm" className="bg-[#2F67FA] hover:bg-[#2F67FA]/90 text-white">
                          Buy
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 mt-4">
              {traders.map((trader) => (
                <div key={trader.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{trader.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">
                          {trader.rating} ({trader.trades} trades)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">₦{trader.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">per USDT</p>
                    </div>
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
          </Card>
        </TabsContent>

        <TabsContent value="sell" className="space-y-6 mt-6">
          <Card className="p-6 shadow-lg border-gray-200">
            <h3 className="text-lg font-semibold text-foreground mb-4">Sell USDT</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Trader</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Price</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Limits</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Payment</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {traders.map((trader) => (
                    <tr key={trader.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2">
                        <div>
                          <p className="font-medium text-foreground">{trader.name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">
                              {trader.rating} ({trader.trades} trades)
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <p className="font-semibold text-foreground">₦{(trader.price - 10).toLocaleString()}</p>
                        <p className="text-xs text-gray-600">per USDT</p>
                      </td>
                      <td className="py-4 px-2">
                        <p className="text-sm text-gray-600">
                          ₦{trader.min.toLocaleString()} - ₦{trader.max.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex flex-wrap gap-1">
                          {trader.paymentMethods.map((method) => (
                            <span
                              key={method}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full whitespace-nowrap"
                            >
                              {method}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <Button size="sm" className="bg-[#2F67FA] hover:bg-[#2F67FA]/90 text-white">
                          Sell
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 mt-4">
              {traders.map((trader) => (
                <div key={trader.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{trader.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">
                          {trader.rating} ({trader.trades} trades)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">₦{(trader.price - 10).toLocaleString()}</p>
                      <p className="text-xs text-gray-600">per USDT</p>
                    </div>
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
          </Card>
        </TabsContent>

        <TabsContent value="swap" className="space-y-6 mt-6">
          <Card className="max-w-md mx-auto p-6 shadow-lg border-gray-200">
            <h3 className="text-lg font-semibold text-foreground mb-4">Currency Swap</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-amount">From</Label>
                <div className="flex gap-2">
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm font-medium text-foreground"
                  >
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                    <option value="USDT">USDT</option>
                    <option value="GHS">GHS</option>
                  </select>
                  <Input
                    id="from-amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleSwap}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#2F67FA] hover:text-white transition-all duration-200 flex items-center justify-center group"
                >
                  <ArrowRightLeft className="w-5 h-5 transition-transform duration-200 group-hover:rotate-180" />
                </button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to-amount">To</Label>
                <div className="flex gap-2">
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm font-medium text-foreground"
                  >
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                    <option value="USDT">USDT</option>
                    <option value="GHS">GHS</option>
                  </select>
                  <div className="flex-1 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                    <p className="text-sm font-medium text-foreground">
                      {convertedAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-[#2F67FA] hover:bg-[#2F67FA]/90 text-white mt-4">Swap Now</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
