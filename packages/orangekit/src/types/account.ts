import { Wallet } from "./wallet"

export type Account = {
	connected: boolean
	address: string | null
}

export interface IAccountContext {
	connect: (wallet: Wallet) => Promise<void>
	disconnect: () => Promise<void>
	account: Account
}
