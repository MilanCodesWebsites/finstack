"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const allTransactions = [
  {
    id: 1,
    type: "Deposit",
    amount: 50000,
    wallet: "NGN",
    status: "Completed",
    date: "2025-01-15T10:30:00",
    reference: "TXN-1234567890",
  },
  {
    id: 2,
    type: "Withdrawal",
    amount: 100,
    wallet: "USDT",
    status: "Pending",
    date: "2025-01-14T15:45:00",
    reference: "TXN-0987654321",
  },
  {
    id: 3,
    type: "P2P Trade",
    amount: 25000,
    wallet: "NGN",
    status: "Completed",
    date: "2025-01-13T09:20:00",
    reference: "TXN-1122334455",
  },
  {
    id: 4,
    type: "Deposit",
    amount: 200,
    wallet: "USDT",
    status: "Completed",
    date: "2025-01-12T14:10:00",
    reference: "TXN-5544332211",
  },
  {
    id: 5,
    type: "Withdrawal",
    amount: 75000,
    wallet: "NGN",
    status: "Failed",
    date: "2025-01-11T11:30:00",
    reference: "TXN-9988776655",
  },
  {
    id: 6,
    type: "P2P Trade",
    amount: 150,
    wallet: "USDT",
    status: "Completed",
    date: "2025-01-10T16:00:00",
    reference: "TXN-6677889900",
  },
  {
    id: 7,
    type: "Deposit",
    amount: 100000,
    wallet: "NGN",
    status: "Completed",
    date: "2025-01-09T08:45:00",
    reference: "TXN-1357924680",
  },
  {
    id: 8,
    type: "Withdrawal",
    amount: 50,
    wallet: "USDT",
    status: "Completed",
    date: "2025-01-08T13:20:00",
    reference: "TXN-2468013579",
  },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "All" || transaction.type === filterType
    const matchesStatus = filterStatus === "All" || transaction.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-50"
      case "Pending":
        return "text-yellow-600 bg-yellow-50"
      case "Failed":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const handleExport = (format: "pdf" | "csv") => {
    console.log(`[v0] Exporting transactions as ${format}`)
  }

  return (
    <div className="space-y-6">
      <div className="animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Transaction History</h1>
        <p className="text-gray-600">View and manage all your transactions</p>
      </div>

      <Card className="p-6 shadow-lg border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by reference or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm font-medium text-foreground"
            >
              <option value="All">All Types</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdrawal">Withdrawal</option>
              <option value="P2P Trade">P2P Trade</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm font-medium text-foreground"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleExport("pdf")}
              className="text-gray-600 hover:text-[#2F67FA] hover:border-[#2F67FA]"
            >
              <Download className="w-4 h-4 mr-1" />
              PDF
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleExport("csv")}
              className="text-gray-600 hover:text-[#2F67FA] hover:border-[#2F67FA]"
            >
              <Download className="w-4 h-4 mr-1" />
              CSV
            </Button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Reference</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Wallet</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-2 text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                    <br />
                    <span className="text-xs text-gray-400">{new Date(transaction.date).toLocaleTimeString()}</span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="font-medium text-foreground">{transaction.type}</span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-sm font-mono text-gray-600">{transaction.reference}</span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="font-semibold text-foreground">
                      {transaction.wallet === "NGN" ? "₦" : "$"}
                      {transaction.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-sm text-gray-600">{transaction.wallet}</span>
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className={cn("text-xs px-2 py-1 rounded-full font-medium", getStatusColor(transaction.status))}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {paginatedTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{transaction.type}</p>
                  <p className="text-xs text-gray-600 mt-1">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <span className={cn("text-xs px-2 py-1 rounded-full font-medium", getStatusColor(transaction.status))}>
                  {transaction.status}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Amount</p>
                  <p className="font-semibold text-foreground">
                    {transaction.wallet === "NGN" ? "₦" : "$"}
                    {transaction.amount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 mb-1">Reference</p>
                  <p className="text-xs font-mono text-gray-600">{transaction.reference}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of{" "}
              {filteredTransactions.length} transactions
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-gray-600 hover:text-[#2F67FA] hover:border-[#2F67FA]"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    size="sm"
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-[#2F67FA] hover:bg-[#2F67FA]/90 text-white"
                        : "text-gray-600 hover:text-[#2F67FA] hover:border-[#2F67FA]"
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-gray-600 hover:text-[#2F67FA] hover:border-[#2F67FA]"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
