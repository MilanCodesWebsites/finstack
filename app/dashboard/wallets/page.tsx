import { WalletCard } from "@/components/dashboard/wallet-card"
import { getWallets } from "@/lib/mock-api"

export default async function WalletsPage() {
  const wallets = await getWallets()

  return (
    <div className="space-y-6">
      <div className="animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">My Wallets</h1>
        <p className="text-gray-600">Manage your NGN and USDT wallets</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        {wallets.map((wallet) => (
          <WalletCard key={wallet.type} wallet={wallet} />
        ))}
      </div>
    </div>
  )
}
