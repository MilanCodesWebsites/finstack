"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stepper } from "@/components/dashboard/stepper"
import { OTPInput } from "@/components/dashboard/otp-input"
import { Copy, Check, ArrowLeft, Sparkles } from "lucide-react"
import { convertCurrency } from "@/lib/mock-api"

const steps = [
  { number: 1, title: "Select Wallet" },
  { number: 2, title: "Payment Details" },
  { number: 3, title: "Enter Amount" },
  { number: 4, title: "Verify OTP" },
  { number: 5, title: "Complete" },
]

export default function DepositPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedWallet, setSelectedWallet] = useState<"NGN" | "USDT" | null>(null)
  const [amount, setAmount] = useState("")
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOTPComplete = (otp: string) => {
    console.log("[v0] OTP entered:", otp)
    setTimeout(() => setCurrentStep(5), 1000)
  }

  const ngnAccountNumber = "1234567890"
  const usdtWalletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
        {currentStep > 1 && currentStep < 5 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Deposit Funds</h1>
          <p className="text-gray-600">Add money to your wallet</p>
        </div>
      </div>

      <Stepper steps={steps} currentStep={currentStep} />

      <Card className="max-w-2xl mx-auto p-6 shadow-lg border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Step 1: Select Wallet */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Select Wallet</h2>
              <p className="text-gray-600">Choose which wallet you want to deposit into</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setSelectedWallet("NGN")
                  setCurrentStep(2)
                }}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#2F67FA] hover:bg-[#2F67FA]/5 transition-all duration-200 text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#2F67FA]/10 flex items-center justify-center group-hover:bg-[#2F67FA] transition-colors">
                    <span className="text-xl font-bold text-[#2F67FA] group-hover:text-white">₦</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">NGN Wallet</h3>
                <p className="text-sm text-gray-600">Deposit Nigerian Naira</p>
              </button>

              <button
                onClick={() => {
                  setSelectedWallet("USDT")
                  setCurrentStep(2)
                }}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#2F67FA] hover:bg-[#2F67FA]/5 transition-all duration-200 text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#2F67FA]/10 flex items-center justify-center group-hover:bg-[#2F67FA] transition-colors">
                    <span className="text-xl font-bold text-[#2F67FA] group-hover:text-white">$</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">USDT Wallet</h3>
                <p className="text-sm text-gray-600">Deposit Tether (USDT)</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Details */}
        {currentStep === 2 && selectedWallet && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Payment Details</h2>
              <p className="text-gray-600">
                {selectedWallet === "NGN"
                  ? "Transfer to this 9PSB account number"
                  : "Send USDT to this Blockradar wallet address"}
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  {selectedWallet === "NGN" ? "Account Number" : "Wallet Address"}
                </Label>
                <div className="flex items-center gap-2 mt-2 p-3 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm font-mono text-foreground flex-1 truncate">
                    {selectedWallet === "NGN" ? ngnAccountNumber : usdtWalletAddress}
                  </p>
                  <button
                    onClick={() => handleCopy(selectedWallet === "NGN" ? ngnAccountNumber : usdtWalletAddress)}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors group"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600 group-hover:text-[#2F67FA]" />
                    )}
                  </button>
                </div>
              </div>

              {selectedWallet === "NGN" && (
                <>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Bank Name</Label>
                    <p className="text-sm font-medium text-foreground mt-1">9 Payment Service Bank</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Account Name</Label>
                    <p className="text-sm font-medium text-foreground mt-1">Finstack - Your Name</p>
                  </div>
                </>
              )}

              {selectedWallet === "USDT" && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Network</Label>
                  <p className="text-sm font-medium text-foreground mt-1">TRC20 (Tron)</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Important:</strong> After making the transfer, click "Continue" to enter the amount and verify
                your deposit.
              </p>
            </div>

            <Button onClick={() => setCurrentStep(3)} className="w-full bg-[#2F67FA] hover:bg-[#2F67FA]/90 text-white">
              Continue
            </Button>
          </div>
        )}

        {/* Step 3: Enter Amount */}
        {currentStep === 3 && selectedWallet && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Enter Amount</h2>
              <p className="text-gray-600">How much did you transfer?</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount ({selectedWallet})</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg"
                />
              </div>

              {amount && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Equivalent Amount</p>
                  <p className="text-lg font-semibold text-foreground">
                    {selectedWallet === "NGN"
                      ? `$${convertCurrency(Number.parseFloat(amount), "NGN", "USD").toFixed(2)}`
                      : `₦${convertCurrency(Number.parseFloat(amount), "USDT", "NGN").toFixed(2)}`}
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={() => setCurrentStep(4)}
              disabled={!amount || Number.parseFloat(amount) <= 0}
              className="w-full bg-[#2F67FA] hover:bg-[#2F67FA]/90 text-white"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 4: Verify OTP */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Verify OTP</h2>
              <p className="text-gray-600">Enter the 6-digit code sent to your email</p>
            </div>

            <OTPInput onComplete={handleOTPComplete} />

            <div className="text-center">
              <button className="text-sm text-[#2F67FA] hover:text-[#2F67FA]/80 font-medium">Resend Code</button>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {currentStep === 5 && (
          <div className="space-y-6 text-center py-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto animate-in zoom-in duration-500">
              <Sparkles className="w-10 h-10 text-green-600" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Deposit Successful!</h2>
              <p className="text-gray-600">
                Your deposit of {selectedWallet === "NGN" ? "₦" : "$"}
                {amount} has been processed successfully.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Transaction Reference</p>
              <p className="text-sm font-mono font-medium text-foreground">TXN-{Date.now()}</p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setCurrentStep(1)
                  setSelectedWallet(null)
                  setAmount("")
                }}
                variant="outline"
                className="flex-1"
              >
                Make Another Deposit
              </Button>
              <Button asChild className="flex-1 bg-[#2F67FA] hover:bg-[#2F67FA]/90 text-white">
                <a href="/dashboard">Go to Dashboard</a>
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
