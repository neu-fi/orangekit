import { Wallet } from "../types/wallet"
import AccountProvider from "./account/accountContext"
import WalletProvider from "./wallet/walletContext"
import { Toaster } from "../components/ui/toaster"
import { ordinalSafe, unisat, xverse } from "../lib/integrations"

export const wallets: Wallet[] = [unisat, ordinalSafe, xverse]

export default function OrangeKitProvider({
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
