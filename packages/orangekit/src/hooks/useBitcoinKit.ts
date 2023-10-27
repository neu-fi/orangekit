import { AccountContext } from "../context/account/accountContext"
import { IAccountContext } from "../types/account"
import { useContext } from "react"
import { Verifier } from "bip322-js"
import { WalletContext } from "../context/wallet/walletContext"
import { IWalletContext } from "../types/wallet"

export function useBitcoinKit() {
	const { account } = useContext(AccountContext) as IAccountContext

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
		return signature
	}

	const verifyBip322 = async (
		message: string,
		signature: string,
		address: string
	) => {
		return await Verifier.verifySignature(address, message, signature)
	}

	return {
		account,
		signBip322,
		verifyBip322,
	}
}
