export type WalletMetaData = {
	name: string
	logoPath: string
	dowloadLink: string
	description?: string
}

export interface OrdinalSafe {
	sign: (message: string) => Promise<string>
	requestAccounts: () => Promise<string[]>
	isInjected: () => boolean
	metaData: WalletMetaData
}

export interface Unisat {
	sign: (message: string) => Promise<string>
	requestAccounts: () => Promise<string[]>
	isInjected: () => boolean
	metaData: WalletMetaData
}

export interface Xverse {
	sign: (message: string) => Promise<string>
	requestAccounts: () => Promise<string[]>
	isInjected: () => boolean
	metaData: WalletMetaData
}

export type Wallet = OrdinalSafe | Unisat | Xverse

export interface IWalletContext {
	wallets: Wallet[]
	connectedWallet: Wallet | null
	connectWallet: (wallet: Wallet) => Promise<void>
	disconnectWallet: () => Promise<void>
}
