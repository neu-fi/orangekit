import {
	AddressPurpose,
	BitcoinNetworkType,
	getAddress,
	signMessage,
} from "sats-connect"
import { Wallet, WalletMetaData } from "../../types/wallet"
const xverse_logo = require("../../assets/xverse_logo.png")

const sign = async (message: string): Promise<string> => {
	let signature: string = ""
	const addresses = await requestAccounts()
	const signMessageOptions = {
		payload: {
			network: {
				type: BitcoinNetworkType.Mainnet,
			},
			address: addresses[0],
			message: message,
		},
		onFinish: (response: any) => {
			signature = response
		},
		onCancel: () => {
			alert("Canceled")
		},
	}
	await signMessage(signMessageOptions)
	return signature
}

const requestAccounts = async (): Promise<string[]> => {
	let addresses: string[] = []
	await getAddress({
		payload: {
			purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
			message: "Sign in to XVerse",
			network: {
				type: BitcoinNetworkType.Mainnet,
			},
		},
		onFinish: (response: any) => {
			addresses = response.addresses.map((address: any) => address.address)
		},
		onCancel: () => alert("Request canceled"),
	})
	return addresses
}

const isInjected = (): boolean => {
	if (typeof window !== "undefined") {
		return typeof window.BitcoinProvider !== "undefined"
	}
	return false
}

const metaData: WalletMetaData = {
	name: "Xverse",
	logoPath: xverse_logo,
	dowloadLink: "https://www.xverse.app/download",
}

const xverse: Wallet = {
	sign,
	requestAccounts,
	isInjected,
	metaData,
}

export default xverse
