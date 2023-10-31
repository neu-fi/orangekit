import { Wallet, WalletMetaData } from "../../types/wallet"
const ordinalsafe_logo = require("../../assets/ordinalsafe_logo.webp")

const sign = async (message: string): Promise<string> => {
	if (!isInjected) {
		throw new Error("Ordinal Safe is not injected.")
	}
	return new Promise((resolve, reject) => {
		try {
			window.ordinalSafe.signMessage(message).then((signature: string) => {
				resolve(signature)
			})
		} catch (e) {
			reject(e)
		}
	})
}

const requestAccounts = async (): Promise<string[]> => {
	const accounts = await window.ordinalSafe.requestAccounts()
	return accounts
}

const isInjected = (): boolean => {
	if (typeof window !== "undefined") {
		return typeof window.ordinalSafe !== "undefined"
	}
	return false
}

const metaData: WalletMetaData = {
	name: "OrdinalSafe",
	logoPath: ordinalsafe_logo,
	dowloadLink: "https://ordinalsafe.xyz/",
}

const ordinalSafe: Wallet = {
	sign,
	requestAccounts,
	isInjected,
	metaData,
}

export default ordinalSafe
