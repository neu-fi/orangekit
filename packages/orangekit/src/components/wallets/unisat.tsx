import { useContext, useEffect, useState } from "react"
import { AccountContext } from "../../context/account/accountContext"
import { IAccountContext } from "../../types/account"
import { IWalletContext, Unisat } from "../../types/wallet"
import { WalletContext } from "../../context/wallet/walletContext"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
const UnisatLogo = require("../../assets/unisat_logo.svg")

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

function renderer() {
	const { account, connect } = useContext(AccountContext) as IAccountContext
	const { connectedWallet } = useContext(WalletContext) as IWalletContext
	const [isUnisatInjected, setUnisatInjected] = useState<boolean>(false)

	useEffect(() => {
		setUnisatInjected(isInjected())
		const interval = setInterval(() => {
			setUnisatInjected(isInjected())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const handleClick = async () => {
		if (isUnisatInjected) {
			try {
				await connect(unisat)
			} catch (error) {
				console.log(error)
			}
		} else {
			window.open("https://unisat.io/", "_blank")
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
					<img src={UnisatLogo} width={28} height={28} alt="Unisat" />
					Unisat
				</div>
				<Badge
					variant={
						account.connected && connectedWallet?.name === "unisat"
							? "default"
							: isUnisatInjected
							? "secondary"
							: "outline"
					}
				>
					{account.connected && connectedWallet?.name === "unisat"
						? "Connected"
						: isUnisatInjected
						? "Installed"
						: "Install"}
				</Badge>
			</Button>
		</div>
	)
}

const unisat: Unisat = {
	name: "unisat",
	render: renderer,
	sign: sign,
	requestAccounts: requestAccounts,
	isInjected: isInjected(),
}

export default unisat
