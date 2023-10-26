import * as React from "react"

import { Wallet, IWalletContext } from "../../types/wallet"

export const WalletContext = React.createContext<IWalletContext | null>(null)

const WalletProvider: React.FC<{
	children: React.ReactNode
	supportedWallets: Wallet[]
}> = ({ children, supportedWallets }) => {
	const [connectedWallet, setConnectedWallet] = React.useState<Wallet | null>(
		null
	)

	const disconnectWallet = async () => {
		try {
			setConnectedWallet(null)
			window.localStorage.setItem("wallet", "")
		} catch (error) {
			console.log(error)
		}
	}

	const connectWallet = async (wallet: Wallet) => {
		try {
			setConnectedWallet(wallet)
			window.localStorage.setItem("wallet", JSON.stringify(wallet))
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		if (!window.localStorage.getItem("wallet")) return
		const previousConnected = JSON.parse(
			window.localStorage.getItem("wallet") as string
		)

		supportedWallets.forEach((wallet) => {
			if (wallet.name === previousConnected.name) {
				setConnectedWallet(wallet)
			}
		})
	}, [])

	return (
		<WalletContext.Provider
			value={{
				wallets: supportedWallets,
				connectedWallet,
				connectWallet,
				disconnectWallet,
			}}
		>
			{children}
		</WalletContext.Provider>
	)
}

export default WalletProvider
