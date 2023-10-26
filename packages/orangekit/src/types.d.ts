import { IWallet } from "../components/wallets/ordinalSafe/types"

declare global {
	interface Window {
		unisat: any
		ordinalSafe: IWallet
	}
	interface globalThis {
		unisat: any
		ordinalSafe: IWallet
	}
}
