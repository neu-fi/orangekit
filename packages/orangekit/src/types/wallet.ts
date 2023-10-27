export interface OrdinalSafe {
	sign: (message: string) => Promise<string>
	requestAccounts: () => Promise<string[]>
	render: () => JSX.Element
	isInjected: boolean
	name: "ordinalSafe"
}

export interface Unisat {
	sign: (message: string) => Promise<string>
	requestAccounts: () => Promise<string[]>
	render: () => JSX.Element
	isInjected: boolean
	name: "unisat"
}

export interface Xverse {
	sign: (message: string, address: string) => Promise<string>
	requestAccounts: () => Promise<string[]>
	render: () => JSX.Element
	isInjected: boolean
	name: "xverse"
}

export interface Other {
	sign: (message: string) => Promise<string>
	requestAccounts: () => Promise<string[]>
	render: () => JSX.Element
	isInjected: boolean
	name: "other"
}

export type Wallet = OrdinalSafe | Unisat | Xverse | Other

export interface IWalletContext {
	wallets: Wallet[]
	connectedWallet: Wallet | null
	connectWallet: (wallet: Wallet) => Promise<void>
	disconnectWallet: () => Promise<void>
}
