export interface OrdinalSafe {
	sign: (message: string, type?: "bip322-simple" | "ecdsa") => Promise<string>
	requestAccounts: () => Promise<string[]>
	render: () => JSX.Element
	getBalance: () => Promise<number>
	name: "ordinalSafe"
}

export interface Unisat {
	sign: (message: string, type?: "bip322-simple" | "ecdsa") => Promise<string>
	requestAccounts: () => Promise<string[]>
	render: () => JSX.Element
	getBalance: () => Promise<number>
	name: "unisat"
}

export interface Xverse {
	sign: (
		message: string,
		address: string,
		type?: "bip322-simple" | "ecdsa"
	) => Promise<string>
	requestAccounts: () => Promise<string[]>
	render: () => JSX.Element
	getBalance: () => Promise<number>
	name: "xverse"
}

export interface Other {
	sign: (message: string, type?: "bip322-simple" | "ecdsa") => Promise<string>
	requestAccounts: () => Promise<string[]>
	render: () => JSX.Element
	getBalance: () => Promise<number>
	name: "other"
}

export type Wallet = OrdinalSafe | Unisat | Xverse | Other

export interface IWalletContext {
	wallets: Wallet[]
	connectedWallet: Wallet | null
	connectWallet: (wallet: Wallet) => Promise<void>
	disconnectWallet: () => Promise<void>
}
