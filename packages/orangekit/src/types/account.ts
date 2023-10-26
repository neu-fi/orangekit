import { Wallet } from "./wallet"

export type Account = {
	connected: boolean
	address: string | null
	balance: number
	network: "livenet" | "testnet" | null
	authenticated: boolean
}

export interface IAccountContext {
	connect: (wallet: Wallet) => Promise<void>
	disconnect: () => Promise<void>
	account: Account
	authenticate: () => Promise<void>
}
