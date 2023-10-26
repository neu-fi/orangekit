import { BitcoinNetworkType, getAddress, AddressPurpose } from "sats-connect"
import { signMessage } from "sats-connect"

const sign = async (
	message: string,
	address: string,
	type?: "bip322-simple" | "ecdsa"
): Promise<string> => {
	let signature: string = ""
	const signMessageOptions = {
		payload: {
			network: {
				type: BitcoinNetworkType.Mainnet,
			},
			address: address,
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

const getBalance = async (): Promise<number> => {
	return 0
}

export { sign, requestAccounts, getBalance }
