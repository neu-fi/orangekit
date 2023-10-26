import { useContext, useEffect, useState } from "react"
import { useTabActive } from "../../../hooks"
import { Button } from "../../ui/button"
import { Badge } from "../../../components/ui/badge"
import { AccountContext } from "../../../context/account/accountContext"
import { IAccountContext } from "../../../types/account"
import { WalletContext } from "../../../context/wallet/walletContext"
import { IWalletContext } from "../../../types/wallet"
import Xverse from "../../../components/wallets/xverse"
import XverseLogo from "../../../assets/xverse_logo.png"

export default function XverseRenderer() {
	const { account, connect } = useContext(AccountContext) as IAccountContext
	const { connectedWallet } = useContext(WalletContext) as IWalletContext

	const [isXverseInjected, setXverseInjected] = useState<boolean>(false)
	const [isXverseDownloadOpened, setXverseDownloadOpened] =
		useState<boolean>(false)

	const isTabActive = useTabActive()

	useEffect(() => {
		if (isTabActive && isXverseDownloadOpened) {
			window.location.reload()
		}
		if (typeof window.BitcoinProvider !== "undefined") {
			setXverseInjected(true)
		} else {
			setXverseInjected(false)
		}
		const interval = setInterval(() => {
			if (typeof window.BitcoinProvider !== "undefined") {
				setXverseInjected(true)
			} else {
				setXverseInjected(false)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [isTabActive])

	const handleClick = async () => {
		if (isXverseInjected) {
			try {
				await connect(Xverse)
			} catch (error) {
				console.log(error)
			}
		} else {
			window.open("https://www.xverse.app/download", "_blank")
			setXverseDownloadOpened(true)
		}
	}

	return (
		<>
			<div className="w-full">
				<Button
					variant="outline"
					className="w-full flex item-start justify-between gap-2 text-lg"
					onClick={handleClick}
					disabled={account?.connected}
				>
					<div className="flex gap-2 w-fit">
						<img src={XverseLogo} width={28} height={28} alt="Xverse" />
						Xverse
					</div>
					<Badge
						variant={
							account?.connected && connectedWallet?.name === "xverse"
								? "default"
								: isXverseInjected
								? "secondary"
								: "outline"
						}
					>
						{account?.connected && connectedWallet?.name === "xverse"
							? "Connected"
							: isXverseInjected
							? "Installed"
							: "Install"}
					</Badge>
				</Button>
			</div>
		</>
	)
}
