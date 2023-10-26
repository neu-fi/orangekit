import { useContext, useEffect, useState } from "react"
import { useTabActive } from "../../../hooks"
import { Button } from "../../ui/button"
import { Badge } from "../../../components/ui/badge"
import { AccountContext } from "../../../context/account/accountContext"
import { IAccountContext } from "../../../types/account"
import { WalletContext } from "../../../context/wallet/walletContext"
import { IWalletContext } from "../../../types/wallet"
import Unisat from "../../../components/wallets/unisat"
import UnisatLogo from "../../../assets/unisat_logo.svg"

export default function UnisatRenderer() {
	const { account, connect } = useContext(AccountContext) as IAccountContext
	const { connectedWallet } = useContext(WalletContext) as IWalletContext

	const [isUnisatInjected, setUnisatInjected] = useState<boolean>(false)
	const [isUnisatDownloadOpened, setUnisatDownloadOpened] =
		useState<boolean>(false)

	const isTabActive = useTabActive()

	useEffect(() => {
		if (isTabActive && isUnisatDownloadOpened) {
			window.location.reload()
		}
		if (typeof window.unisat !== "undefined") {
			setUnisatInjected(true)
		} else {
			setUnisatInjected(false)
		}
		const interval = setInterval(() => {
			if (typeof window.unisat !== "undefined") {
				setUnisatInjected(true)
			} else {
				setUnisatInjected(false)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [isTabActive])

	const handleClick = async () => {
		if (isUnisatInjected) {
			try {
				await connect(Unisat)
			} catch (error) {
				console.log(error)
			}
		} else {
			window.open("https://unisat.io/", "_blank")
			setUnisatDownloadOpened(true)
		}
	}

	return (
		<>
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
		</>
	)
}
