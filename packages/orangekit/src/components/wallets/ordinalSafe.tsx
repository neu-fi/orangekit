import { useContext, useEffect, useState } from "react"
import { AccountContext } from "../../context/account/accountContext"
import { IAccountContext } from "../../types/account"
import { IWalletContext, OrdinalSafe } from "../../types/wallet"
import { WalletContext } from "../../context/wallet/walletContext"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
const OrdinalSafeLogo = require("../../assets/ordinalsafe_logo.webp")

const sign = async (message: string): Promise<string> => {
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

function renderer() {
	const { account, connect } = useContext(AccountContext) as IAccountContext
	const { connectedWallet } = useContext(WalletContext) as IWalletContext

	const [isOrdinalSafeInjected, setOrdinalSafeInjected] =
		useState<boolean>(false)

	useEffect(() => {
		setOrdinalSafeInjected(isInjected())
		const interval = setInterval(() => {
			setOrdinalSafeInjected(isInjected())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const handleClick = async () => {
		if (isOrdinalSafeInjected) {
			try {
				await connect(ordinalSafe)
			} catch (error) {
				console.log(error)
			}
		} else {
			window.open(
				"https://chrome.google.com/webstore/detail/ordinalsafe/coefgobimbelhfmhkpndlddjhkphgnep",
				"_blank"
			)
		}
	}

	return (
		<div className="w-full">
			<Button
				variant="outline"
				className="w-full flex item-start justify-between gap-2 text-lg"
				onClick={handleClick}
				disabled={account.connected}
			>
				<div className="flex gap-2 w-fit">
					<img src={OrdinalSafeLogo} width={28} height={28} alt="ordinalSafe" />
					OrdinalSafe
				</div>
				<Badge
					variant={
						account.connected && connectedWallet?.name === "ordinalSafe"
							? "default"
							: isOrdinalSafeInjected
							? "secondary"
							: "outline"
					}
				>
					{account.connected && connectedWallet?.name === "ordinalSafe"
						? "Connected"
						: isOrdinalSafeInjected
						? "Installed"
						: "Install"}
				</Badge>
			</Button>
		</div>
	)
}

const ordinalSafe: OrdinalSafe = {
	name: "ordinalSafe",
	render: renderer,
	sign: sign,
	requestAccounts: requestAccounts,
	isInjected: isInjected(),
}

export default ordinalSafe
