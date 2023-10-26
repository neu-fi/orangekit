import { AccountContext } from "../context/account/accountContext"
import { IAccountContext } from "../types/account"
import { useContext } from "react"
import { Verifier } from "bip322-js"
import { WalletContext } from "../context/wallet/walletContext"
import { IWalletContext } from "../types/wallet"

export function useBitcoinKit() {
	const { account, authenticate } = useContext(
		AccountContext
	) as IAccountContext

	const { connectedWallet } = useContext(WalletContext) as IWalletContext

	const signBip322 = async (message: string) => {
		if (!connectedWallet) {
			throw new Error("No connected wallet")
		}
		let signature: string
		if (connectedWallet.name === "xverse") {
			signature = await connectedWallet.sign(message, account?.address!)
		} else {
			signature = await connectedWallet.sign(message)
		}
		console.log(signature)
		return signature
	}

	const verifyBip322 = async (
		message: string,
		signature: string,
		address: string
	) => {
		return await Verifier.verifySignature(address, message, signature)
	}
	const authenticateWithGivenSignature = async (
		message: string,
		signature: string,
		address: string
	) => {
		const isVerified = await verifyBip322(message, signature, address)

		if (isVerified) {
			await authenticate()
		}

		return isVerified
	}

	const authenticateWithBip322 = async (message: string) => {
		const signature = await signBip322(message)
		const address = account?.address
		const isAuthenticated = await verifyBip322(message, signature, address!)
		if (isAuthenticated) {
			await authenticate()
		}

		return isAuthenticated
	}

	return {
		account,
		signBip322,
		verifyBip322,
		authenticateWithBip322,
		authenticateWithGivenSignature,
	}
}
