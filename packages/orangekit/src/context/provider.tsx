import { Wallet } from "../types/wallet"
import AccountProvider from "./account/accountContext"
import WalletProvider from "./wallet/walletContext"
import { Toaster } from "../components/ui/toaster"
import Unisat from "../components/wallets/unisat"
import OrdinalSafe from "../components/wallets/ordinalSafe"
import Xverse from "../components/wallets/xverse"
import Other from "../components/wallets/other"

export const wallets: Wallet[] = [Unisat, OrdinalSafe, Xverse, Other]

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
