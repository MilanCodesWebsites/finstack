'use client';

import { useEffect, useState } from 'react';
import { TransactionsTable } from '@/components/admin/TransactionsTable';
import { TransactionsFilter } from '@/components/admin/TransactionsFilter';

interface Transaction {
  id: string;
  user: string;
  userEmail: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  reference: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    type: 'all',
    currency: 'all',
    status: 'all'
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/admin/transactions');
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
          setFilteredTransactions(data);
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    let filtered = transactions;

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(txn => txn.type === filters.type);
    }

    if (filters.currency && filters.currency !== 'all') {
      filtered = filtered.filter(txn => txn.currency === filters.currency);
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(txn => txn.status === filters.status);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(txn => 
        new Date(txn.date) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(txn => 
        new Date(txn.date) <= new Date(filters.dateTo)
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, filters]);

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'User', 'Email', 'Type', 'Amount', 'Currency', 'Status', 'Date', 'Reference'],
      ...filteredTransactions.map(txn => [
        txn.id,
        txn.user,
        txn.userEmail,
        txn.type,
        txn.amount.toString(),
        txn.currency,
        txn.status,
        new Date(txn.date).toISOString(),
        txn.reference
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Transactions</h1>
        <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Transactions</h1>
        <div className="text-xs md:text-sm text-gray-600">
          {filteredTransactions.length} of {transactions.length} transactions
        </div>
      </div>
      
      <TransactionsFilter 
        filters={filters} 
        onFiltersChange={setFilters}
        onExport={exportToCSV}
      />
      <TransactionsTable transactions={filteredTransactions} />
    </div>
  );
}