import { Wallet, WalletMetaData } from "../../types/wallet"
const unisat_logo = require("../../assets/unisat_logo.svg")

const sign = async (message: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		try {
			window.unisat
				.signMessage(message, "bip322-simple")
				.then((signature: string) => {
					resolve(signature)
				})
		} catch (e) {
			reject(e)
		}
	})
}

const requestAccounts = async (): Promise<string[]> => {
	const accounts = await window.unisat.requestAccounts()
	return accounts
}

const isInjected = (): boolean => {
	if (typeof window !== "undefined") {
		return typeof window.unisat !== "undefined"
	}
	return false
}

const metaData: WalletMetaData = {
	name: "Unisat",
	logoPath: unisat_logo,
	dowloadLink: "https://unisat.io/download",
}

const subscribeAccountsChanged = (callback: (accounts: string[]) => void) => {
	window.unisat.on("accountsChanged", callback)
}

const unsubscribeAccountsChanged = (callback: (accounts: string[]) => void) => {
	window.unisat.removeListener("accountsChanged", callback)
}

const unisat: Wallet = {
	sign,
	requestAccounts,
	isInjected,
	metaData,
	subscribeAccountsChanged,
	unsubscribeAccountsChanged,
}

export default unisat
