'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Share2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Transaction {
  id: string;
  date: string;
  type: "Deposit" | "Withdraw" | "P2P";
  wallet: "NGN" | "USDT" | "RMB";
  amount: number;
  status: "Pending" | "Completed" | "Failed";
  reference: string;
}

interface TransactionReceiptModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionReceiptModal({ transaction, isOpen, onClose }: TransactionReceiptModalProps) {
  const [isExporting, setIsExporting] = useState(false);

  if (!transaction) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "Pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Failed":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <Check className="w-4 h-4" />;
      case "Failed":
        return <X className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "NGN":
        return "₦";
      case "USDT":
        return "$";
      case "RMB":
        return "¥";
      default:
        return "";
    }
  };

  const exportAsPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('receipt-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`finstack-receipt-${transaction.reference}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsImage = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('receipt-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `finstack-receipt-${transaction.reference}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 bg-transparent border-0 shadow-none">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <DialogHeader className="p-4 bg-gradient-to-r from-[#2F67FA] to-[#4a7bff] text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                  <img 
                    src="/logo.png" 
                    alt="Finstack logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Finstack</h2>
                  <p className="text-sm text-blue-100">Transaction Receipt</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Receipt Content */}
          <div id="receipt-content" className="p-6 bg-white">
            {/* Logo and Branding */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2F67FA] to-[#4a7bff] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-2xl">F</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Finstack</h1>
              <p className="text-sm text-gray-600">Digital Financial Services</p>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2F67FA] to-transparent mt-3"></div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-4">
              {/* Status */}
              <div className="text-center">
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium",
                  getStatusColor(transaction.status)
                )}>
                  {getStatusIcon(transaction.status)}
                  <span>{transaction.status}</span>
                </div>
              </div>

              {/* Amount */}
              <div className="text-center py-4">
                <p className="text-sm text-gray-600 mb-1">Amount</p>
                <p className="text-3xl font-bold text-gray-900">
                  {getCurrencySymbol(transaction.wallet)}
                  {transaction.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-sm text-gray-500">{transaction.wallet} Wallet</p>
              </div>

              {/* Transaction Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Transaction Type</span>
                  <span className="text-sm font-medium text-gray-900">{transaction.type}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Reference</span>
                  <span className="text-sm font-mono font-medium text-gray-900">{transaction.reference}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Date & Time</span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Wallet</span>
                  <span className="text-sm font-medium text-gray-900">{transaction.wallet}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="border-l-4 border-[#2F67FA] bg-blue-50 p-3 rounded-r-lg">
                <p className="text-xs text-blue-800">
                  <span className="font-medium">Security Notice:</span> This receipt is digitally generated and serves as proof of your transaction. Keep it for your records.
                </p>
              </div>

              {/* Footer */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Finstack - Your trusted financial partner
                </p>
                <div className="flex justify-center mt-2">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#2F67FA] to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Export Actions */}
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex gap-3">
              <Button
                onClick={exportAsPDF}
                disabled={isExporting}
                className="flex-1 bg-[#2F67FA] hover:bg-[#2F67FA]/90 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </Button>
              <Button
                onClick={exportAsImage}
                disabled={isExporting}
                variant="outline"
                className="flex-1 border-[#2F67FA] text-[#2F67FA] hover:bg-[#2F67FA]/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export Image'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}