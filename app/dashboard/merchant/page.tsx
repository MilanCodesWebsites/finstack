'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  Settings, 
  Eye, 
  EyeOff,
  Copy,
  Check,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MerchantStats {
  totalTrades: number;
  completedTrades: number;
  totalVolume: number;
  rating: number;
  activeOffers: number;
}

interface WalletBalance {
  NGN: number;
  USDT: number;
}

interface TradeRate {
  id: string;
  type: 'buy' | 'sell';
  currency: 'USDT';
  rate: number;
  minAmount: number;
  maxAmount: number;
  isActive: boolean;
}

export default function MerchantDashboard() {
  const [merchantStats, setMerchantStats] = useState<MerchantStats>({
    totalTrades: 245,
    completedTrades: 238,
    totalVolume: 1250000,
    rating: 4.9,
    activeOffers: 4
  });

  const [walletBalance, setWalletBalance] = useState<WalletBalance>({
    NGN: 2750000,
    USDT: 8500
  });

  const [tradeRates, setTradeRates] = useState<TradeRate[]>([
    {
      id: '1',
      type: 'buy',
      currency: 'USDT',
      rate: 1620,
      minAmount: 10,
      maxAmount: 1000,
      isActive: true
    },
    {
      id: '2',
      type: 'sell',
      currency: 'USDT',
      rate: 1650,
      minAmount: 10,
      maxAmount: 1000,
      isActive: true
    }
  ]);

  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState('');
  const [liveRate, setLiveRate] = useState(1635);

  // Fetch live exchange rate
  useEffect(() => {
    const fetchLiveRate = async () => {
      try {
        // Using exchangerate-api.com (free tier)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        const usdToNgn = data.rates.NGN;
        setLiveRate(usdToNgn);
      } catch (error) {
        console.error('Failed to fetch live rate:', error);
        // Fallback to mock rate
        setLiveRate(1635);
      }
    };

    fetchLiveRate();
    // Update every 5 minutes
    const interval = setInterval(fetchLiveRate, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const updateRate = (id: string, newRate: number) => {
    setTradeRates(prev => prev.map(rate => 
      rate.id === id ? { ...rate, rate: newRate } : rate
    ));
  };

  const toggleRateStatus = (id: string) => {
    setTradeRates(prev => prev.map(rate => 
      rate.id === id ? { ...rate, isActive: !rate.isActive } : rate
    ));
  };

  const completionRate = ((merchantStats.completedTrades / merchantStats.totalTrades) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-2">
          Merchant Dashboard
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Manage your P2P trading business and monitor performance
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-3 md:p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600">Total Trades</p>
              <p className="text-lg md:text-xl font-semibold">{merchantStats.totalTrades}</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600">Completion</p>
              <p className="text-lg md:text-xl font-semibold text-green-600">{completionRate}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600">Volume</p>
              <p className="text-lg md:text-xl font-semibold">₦{(merchantStats.totalVolume / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600">Rating</p>
              <p className="text-lg md:text-xl font-semibold">{merchantStats.rating}/5</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600">Active Offers</p>
              <p className="text-lg md:text-xl font-semibold">{merchantStats.activeOffers}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Wallet Balances */}
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Wallet Balances</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">₦</span>
                </div>
                <div>
                  <p className="font-medium">NGN Wallet</p>
                  <p className="text-sm text-gray-600">Nigerian Naira</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">
                  {showBalance ? `₦${walletBalance.NGN.toLocaleString()}` : '••••••'}
                </p>
                <button
                  onClick={() => handleCopy(walletBalance.NGN.toString(), 'ngn')}
                  className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
                >
                  {copied === 'ngn' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === 'ngn' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">$</span>
                </div>
                <div>
                  <p className="font-medium">USDT Wallet</p>
                  <p className="text-sm text-gray-600">Tether USD</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">
                  {showBalance ? `$${walletBalance.USDT.toLocaleString()}` : '••••••'}
                </p>
                <button
                  onClick={() => handleCopy(walletBalance.USDT.toString(), 'usdt')}
                  className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
                >
                  {copied === 'usdt' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === 'usdt' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Live Exchange Rate */}
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Live Exchange Rate</h3>
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">USD to NGN</p>
            <p className="text-3xl font-bold text-blue-600">₦{liveRate.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Updates every 5 minutes</p>
          </div>
        </Card>
      </div>

      {/* Trading Rates Management */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Your Trading Rates</h3>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Add New Rate
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tradeRates.map((rate) => (
            <div key={rate.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    rate.type === 'buy' 
                      ? "bg-green-100 text-green-800" 
                      : "bg-blue-100 text-blue-800"
                  )}>
                    {rate.type === 'buy' ? 'Buying' : 'Selling'} {rate.currency}
                  </span>
                  <Switch
                    checked={rate.isActive}
                    onCheckedChange={() => toggleRateStatus(rate.id)}
                  />
                </div>
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  rate.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                )}>
                  {rate.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor={`rate-${rate.id}`} className="text-sm">
                    Rate (NGN per {rate.currency})
                  </Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id={`rate-${rate.id}`}
                      type="number"
                      value={rate.rate}
                      onChange={(e) => updateRate(rate.id, parseFloat(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Market rate: ₦{liveRate} (
                    <span className={cn(
                      rate.rate > liveRate ? "text-red-600" : "text-green-600"
                    )}>
                      {rate.rate > liveRate ? '+' : ''}
                      {((rate.rate - liveRate) / liveRate * 100).toFixed(2)}%
                    </span>
                    )
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Min Amount</Label>
                    <Input
                      type="number"
                      value={rate.minAmount}
                      onChange={(e) => {
                        const newRates = [...tradeRates];
                        const index = newRates.findIndex(r => r.id === rate.id);
                        newRates[index].minAmount = parseFloat(e.target.value);
                        setTradeRates(newRates);
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Max Amount</Label>
                    <Input
                      type="number"
                      value={rate.maxAmount}
                      onChange={(e) => {
                        const newRates = [...tradeRates];
                        const index = newRates.findIndex(r => r.id === rate.id);
                        newRates[index].maxAmount = parseFloat(e.target.value);
                        setTradeRates(newRates);
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                >
                  Update Rate
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Trades */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Trades</h3>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {[
            { id: 1, user: 'User123', type: 'buy', amount: 100, rate: 1620, status: 'completed', time: '2 hours ago' },
            { id: 2, user: 'Trader456', type: 'sell', amount: 50, rate: 1650, status: 'pending', time: '5 hours ago' },
            { id: 3, user: 'Crypto789', type: 'buy', amount: 200, rate: 1615, status: 'completed', time: '1 day ago' },
          ].map((trade) => (
            <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                  trade.type === 'buy' ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                )}>
                  {trade.type === 'buy' ? 'B' : 'S'}
                </div>
                <div>
                  <p className="font-medium text-sm">{trade.user}</p>
                  <p className="text-xs text-gray-600">
                    {trade.type === 'buy' ? 'Bought' : 'Sold'} ${trade.amount} USDT
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">₦{trade.rate.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    trade.status === 'completed' 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  )}>
                    {trade.status}
                  </span>
                  <span className="text-xs text-gray-500">{trade.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}