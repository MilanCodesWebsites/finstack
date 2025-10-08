"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stepper } from "@/components/dashboard/stepper"
import { Copy, Check, ArrowLeft, Wallet, CreditCard, Sparkles, Loader2 } from "lucide-react"
import { convertCurrency } from "@/lib/mock-api"

const steps = [
  { number: 1, title: "Select Wallet" },
  { number: 2, title: "Deposit Details" },
]

export default function DepositPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedWallet, setSelectedWallet] = useState<"NGN" | "USDT" | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState(false)

  const handleContinue = () => {
    if (!selectedWallet) return
    setCurrentStep(2)
  }

  // Fixed deposit addresses
  const ngnAccountNumber = "123456789"
  const usdtWalletAddress = "TN3W4H6rK5oEKMQmHyFa5qfnHgWtEHtR8r"

  const copyToClipboard = async (text: string, type: 'address' | 'account') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'address') {
        setCopiedAddress(true)
        setTimeout(() => setCopiedAddress(false), 2000)
      } else {
        setCopiedAccount(true)
        setTimeout(() => setCopiedAccount(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
        {currentStep > 1 && (
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
              <p className="text-gray-600">Choose the wallet you want to deposit funds into</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedWallet("NGN")}
                className={`p-6 border-2 rounded-lg transition-all duration-200 text-left group ${
                  selectedWallet === "NGN" 
                    ? "border-[#2F67FA] bg-[#2F67FA]/5" 
                    : "border-gray-200 hover:border-[#2F67FA] hover:bg-[#2F67FA]/5"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    selectedWallet === "NGN"
                      ? "bg-[#2F67FA] text-white"
                      : "bg-[#2F67FA]/10 group-hover:bg-[#2F67FA] text-[#2F67FA] group-hover:text-white"
                  }`}>
                    <img 
                      src="https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/f0f01069-7e35-4291-8664-af625c9c9623-nigeria-logo.png" 
                      alt="Naira" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">NGN Wallet</h3>
                <p className="text-sm text-gray-600">Deposit Nigerian Naira</p>
              </button>

              <button
                onClick={() => setSelectedWallet("USDT")}
                className={`p-6 border-2 rounded-lg transition-all duration-200 text-left group ${
                  selectedWallet === "USDT" 
                    ? "border-[#2F67FA] bg-[#2F67FA]/5" 
                    : "border-gray-200 hover:border-[#2F67FA] hover:bg-[#2F67FA]/5"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    selectedWallet === "USDT"
                      ? "bg-[#2F67FA] text-white"
                      : "bg-[#2F67FA]/10 group-hover:bg-[#2F67FA] text-[#2F67FA] group-hover:text-white"
                  }`}>
                    <img 
                      src="https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/ef95eebe-7923-4b32-87a6-d755b8caba30-usdt%20logo.png" 
                      alt="USDT" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">USDT Wallet</h3>
                <p className="text-sm text-gray-600">Deposit Tether (USDT)</p>
              </button>
            </div>

            {selectedWallet && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Button
                  onClick={handleContinue}
                  className="w-full bg-[#2F67FA] hover:bg-[#2F67FA]/90 text-white"
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Deposit Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#2F67FA]/10 flex items-center justify-center mx-auto mb-4">
                {selectedWallet === "NGN" ? (
                  <CreditCard className="w-8 h-8 text-[#2F67FA]" />
                ) : (
                  <Wallet className="w-8 h-8 text-[#2F67FA]" />
                )}
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {selectedWallet === "NGN" ? "Bank Account Details" : "Wallet Address"}
              </h2>
              <p className="text-gray-600">
                {selectedWallet === "NGN" 
                  ? "Transfer funds to this 9PSB account number"
                  : "Send USDT to this wallet address (TRC20 Network)"
                }
              </p>
            </div>

            <div className="space-y-4">
              {selectedWallet === "NGN" ? (
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Bank Name</Label>
                      <p className="text-lg font-semibold text-foreground">9PSB (9Pay Service Bank)</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Account Number</Label>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 mt-1">
                        <span className="text-lg font-mono font-semibold text-foreground">{ngnAccountNumber}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(ngnAccountNumber, 'account')}
                          className="text-[#2F67FA] hover:bg-[#2F67FA]/10"
                        >
                          {copiedAccount ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Account Name</Label>
                      <p className="text-lg font-semibold text-foreground">John Doe</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Network</Label>
                      <p className="text-lg font-semibold text-foreground">TRC20 (Tron)</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Wallet Address</Label>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 mt-1">
                        <span className="text-sm font-mono font-semibold text-foreground break-all">{usdtWalletAddress}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(usdtWalletAddress, 'address')}
                          className="text-[#2F67FA] hover:bg-[#2F67FA]/10 ml-2 flex-shrink-0"
                        >
                          {copiedAddress ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Important Notes</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {selectedWallet === "NGN" ? (
                        <>
                          <li>• Only send NGN from Nigerian bank accounts</li>
                          <li>• Include your user ID in the transfer description</li>
                          <li>• Deposits are processed within 5-10 minutes</li>
                        </>
                      ) : (
                        <>
                          <li>• Only send USDT on TRC20 network</li>
                          <li>• Do not send other cryptocurrencies to this address</li>
                          <li>• Minimum deposit: 10 USDT</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setCurrentStep(1)
                  setSelectedWallet(null)
                }}
                variant="outline"
                className="flex-1"
              >
                Back to Wallets
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
