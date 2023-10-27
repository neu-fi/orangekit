import { AccountContext } from "../context/account/accountContext"
import { IAccountContext } from "../types/account"
import { useContext } from "react"
import { WalletContext } from "../context/wallet/walletContext"
import { IWalletContext } from "../types/wallet"

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

	return {
		account,
		signBip322,
	}
}
