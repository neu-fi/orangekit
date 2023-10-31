import { AccountContext } from "../context/account/accountContext"
import { IAccountContext } from "../types/account"
import { useContext, useEffect } from "react"
import { WalletContext } from "../context/wallet/walletContext"
import { IWalletContext } from "../types/wallet"
import { Verifier } from "bip322-js"
import { unisat, ordinalSafe, xverse } from "../lib/integrations"

export function useOrangeKit() {
	const { account } = useContext(AccountContext) as IAccountContext

	const { connectedWallet } = useContext(WalletContext) as IWalletContext

	const signBip322 = async (message: string) => {
		if (!connectedWallet || connectedWallet.metaData.name === "manual") {
			throw new Error("There is no connected wallet that is able to sign.")
		}
		let signature: string
		signature = await connectedWallet.sign(message)

		return signature
	}

	const verifyBip322 = async (message: string, signature: string) => {
		if (!account) throw new Error("There is no account to verify with.")
		return Verifier.verifySignature(account.address!, message, signature)
	}

	return {
		account,
		signBip322,
		verifyBip322,
	}
}
