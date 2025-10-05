'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsData {
  totalTransactionVolume: number;
  totalActiveUsers: number;
  totalSuspendedAccounts: number;
  pendingKYC: number;
  totalWalletBalance: number;
}

interface StatsCardsProps {
  data: StatsData;
}

export function StatsCards({ data }: StatsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const stats = [
    { 
      title: 'Total Transaction Volume', 
      value: formatCurrency(data.totalTransactionVolume), 
      change: '+12.5%',
      trending: 'up' as const
    },
    { 
      title: 'Total Active Users', 
      value: formatNumber(data.totalActiveUsers), 
      change: '+8.2%',
      trending: 'up' as const
    },
    { 
      title: 'Suspended Accounts', 
      value: formatNumber(data.totalSuspendedAccounts), 
      change: '-2.1%',
      trending: 'down' as const
    },
    { 
      title: 'Pending KYC', 
      value: formatNumber(data.pendingKYC), 
      change: '+15.3%',
      trending: 'up' as const
    },
    { 
      title: 'Total Wallet Balance', 
      value: formatCurrency(data.totalWalletBalance), 
      change: '+5.7%',
      trending: 'up' as const
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.title}</h3>
          <p className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</p>
          <div className="flex items-center">
            {stat.trending === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
            )}
            <p className={`text-sm ${
              stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}