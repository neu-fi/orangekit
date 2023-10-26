import { useContext, useEffect, useState } from "react"
import { useTabActive } from "../../../hooks"
import { Button } from "../../ui/button"
import { Badge } from "../../../components/ui/badge"
import { AccountContext } from "../../../context/account/accountContext"
import { IAccountContext } from "../../../types/account"
import { WalletContext } from "../../../context/wallet/walletContext"
import { IWalletContext } from "../../../types/wallet"
import OrdinalSafe from "../../../components/wallets/ordinalSafe"
import OrdinalSafeLogo from "../../../assets/ordinalsafe_logo.webp"

export default function OrdinalSafeRenderer() {
	const { account, connect } = useContext(AccountContext) as IAccountContext
	const { connectedWallet } = useContext(WalletContext) as IWalletContext

	const [isOrdinalSafeInjected, setOrdinalSafeInjected] =
		useState<boolean>(false)
	const [isOrdinalSafeDownloadOpened, setOrdinalSafeDownloadOpened] =
		useState<boolean>(false)

	const isTabActive = useTabActive()

	useEffect(() => {
		if (isTabActive && isOrdinalSafeDownloadOpened) {
			window.location.reload()
		}
		if (typeof window.ordinalSafe !== "undefined") {
			setOrdinalSafeInjected(true)
		} else {
			setOrdinalSafeInjected(false)
		}
		const interval = setInterval(() => {
			if (typeof window.ordinalSafe !== "undefined") {
				setOrdinalSafeInjected(true)
			} else {
				setOrdinalSafeInjected(false)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [isTabActive])

	const handleClick = async () => {
		if (isOrdinalSafeInjected) {
			try {
				await connect(OrdinalSafe)
			} catch (error) {
				console.log(error)
			}
		} else {
			window.open(
				"https://chrome.google.com/webstore/detail/ordinalsafe/coefgobimbelhfmhkpndlddjhkphgnep",
				"_blank"
			)
			setOrdinalSafeDownloadOpened(true)
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
						<img
							src={OrdinalSafeLogo}
							width={28}
							height={28}
							alt="OrdinalSafe"
						/>
						OrdinalSafe
					</div>
					<Badge
						variant={
							account?.connected && connectedWallet?.name === "ordinalSafe"
								? "default"
								: isOrdinalSafeInjected
								? "secondary"
								: "outline"
						}
					>
						{account?.connected && connectedWallet?.name === "ordinalSafe"
							? "Connected"
							: isOrdinalSafeInjected
							? "Installed"
							: "Install"}
					</Badge>
				</Button>
			</div>
		</>
	)
}
