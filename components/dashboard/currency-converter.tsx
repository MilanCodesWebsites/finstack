"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft, TrendingUp } from "lucide-react"
import { convertCurrency } from "@/lib/mock-api"

const currencies = [
  { value: "NGN", label: "Nigerian Naira (NGN)", symbol: "₦" },
  { value: "USD", label: "US Dollar (USD)", symbol: "$" },
  { value: "GHS", label: "Ghanaian Cedi (GHS)", symbol: "₵" },
  { value: "RMB", label: "Chinese Yuan (RMB)", symbol: "¥" },
  { value: "USDT", label: "Tether (USDT)", symbol: "$" },
]

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("NGN")
  const [toCurrency, setToCurrency] = useState("USD")
  const [amount, setAmount] = useState("1000")
  const [convertedAmount, setConvertedAmount] = useState(0)

  useEffect(() => {
    const numAmount = Number.parseFloat(amount) || 0
    const result = convertCurrency(numAmount, fromCurrency, toCurrency)
    setConvertedAmount(result)
  }, [amount, fromCurrency, toCurrency])

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const fromSymbol = currencies.find((c) => c.value === fromCurrency)?.symbol || ""
  const toSymbol = currencies.find((c) => c.value === toCurrency)?.symbol || ""

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />

      <div className="relative p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm md:text-base font-semibold text-white">Currency Converter</h3>
            <p className="text-xs text-blue-100 mt-0.5">Real-time exchange rates</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-white/15 backdrop-blur-sm rounded-full">
            <TrendingUp className="h-3 w-3 text-white" />
            <span className="text-xs font-medium text-white">Live</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* From Currency */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
            <label className="text-xs font-medium text-blue-100 mb-1.5 block">You Send</label>
            <div className="flex items-center gap-2">
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-[90px] md:w-[110px] bg-white/15 border-white/25 text-white text-xs h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value} className="text-xs">
                      {currency.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-transparent border-0 text-white placeholder:text-blue-200 text-sm md:text-base font-semibold focus-visible:ring-0 h-9 px-2"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-1.5">
            <button
              onClick={handleSwap}
              className="w-9 h-9 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 flex items-center justify-center group"
            >
              <ArrowRightLeft className="w-4 h-4 text-blue-600 transition-transform duration-200 group-hover:rotate-180" />
            </button>
          </div>

          {/* To Currency */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
            <label className="text-xs font-medium text-blue-100 mb-1.5 block">You Receive</label>
            <div className="flex items-center gap-2">
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-[90px] md:w-[110px] bg-white/15 border-white/25 text-white text-xs h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value} className="text-xs">
                      {currency.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-1 text-white text-sm md:text-base font-semibold px-2">
                {convertedAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="mt-3 pt-3 border-t border-white/15">
          <p className="text-xs text-blue-100 text-center">
            1 {fromCurrency} = {(convertedAmount / (Number.parseFloat(amount) || 1)).toFixed(4)} {toCurrency}
          </p>
        </div>
      </div>
    </Card>
  )
}
