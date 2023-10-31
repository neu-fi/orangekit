export type WalletMetaData = {
	name: string
	logoPath: string
	dowloadLink: string
	description?: string
}

export type Wallet = {
	sign: (message: string) => Promise<string>
	requestAccounts: () => Promise<string[]>
	isInjected: () => boolean
	metaData: WalletMetaData
	subscribeAccountsChanged?: (callback: (accounts: string[]) => void) => void
	unsubscribeAccountsChanged?: (callback: (accounts: string[]) => void) => void
}

export interface IWalletContext {
	wallets: Wallet[]
	connectedWallet: Wallet | null
	connectWallet: (wallet: Wallet) => Promise<void>
	disconnectWallet: () => Promise<void>
}
