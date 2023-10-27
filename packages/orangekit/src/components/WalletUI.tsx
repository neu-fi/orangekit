import { useContext, useEffect, useState } from "react"
import { AccountContext } from "../context/account/accountContext"
import { IAccountContext } from "../types/account"
import { IWalletContext, Wallet as WalletType } from "../types/wallet"
import { WalletContext } from "../context/wallet/walletContext"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export default function WalletUI({ wallet }: { wallet: WalletType }) {
	const { account, connect } = useContext(AccountContext) as IAccountContext
	const { connectedWallet } = useContext(WalletContext) as IWalletContext

	const [isWalletInjected, setIsWalletInjected] = useState<boolean>(false)

	useEffect(() => {
		setIsWalletInjected(wallet.isInjected)
		const interval = setInterval(() => {
			setIsWalletInjected(wallet.isInjected())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const handleClick = async () => {
		if (isWalletInjected) {
			try {
				await connect(wallet)
			} catch (error) {
				console.log(error)
			}
		} else {
			window.open(wallet.metaData.dowloadLink, "_blank")
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
					<img
						src={wallet.metaData.logoPath}
						width={28}
						height={28}
						alt={wallet.metaData.name.toLowerCase()}
					/>
					{wallet.metaData.name}
				</div>
				<Badge
					variant={
						account.connected &&
						connectedWallet?.metaData.name === wallet.metaData.name
							? "default"
							: isWalletInjected
							? "secondary"
							: "outline"
					}
				>
					{account.connected &&
					connectedWallet?.metaData.name === wallet.metaData.name
						? "Connected"
						: isWalletInjected
						? "Installed"
						: "Install"}
				</Badge>
			</Button>
		</div>
	)
}
