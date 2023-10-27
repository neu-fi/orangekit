import { Wallet } from "../types/wallet"
import AccountProvider from "./account/accountContext"
import WalletProvider from "./wallet/walletContext"
import { Toaster } from "../components/ui/toaster"
import { unisat, ordinalSafe, xverse, other } from "../components"

export const wallets: Wallet[] = [unisat, ordinalSafe, xverse, other]

export default function BitcoinKitProvider({
	children,
	options,
}: {
	children: React.ReactNode
	options?: { wallets?: Wallet[] }
}) {
	return (
		<WalletProvider
			supportedWallets={options?.wallets ? options.wallets : wallets}
		>
			<AccountProvider>
				{children}
				<Toaster />
			</AccountProvider>
		</WalletProvider>
	)
}
