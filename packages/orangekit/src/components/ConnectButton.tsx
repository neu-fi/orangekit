import { Button } from "../components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog"
import { useBitcoinKit } from "../hooks/useBitcoinKit"
import { shorthandAddress } from "../lib/utils"
import { CopyClipboard } from "./ui/copy-clipboard"
import { WalletContext } from "../context/wallet/walletContext"
import { IWalletContext } from "../types/wallet"
import { useContext, useEffect, useState } from "react"
import { AccountContext } from "../context/account/accountContext"
import { IAccountContext } from "../types/account"

const ArrowRightOnRectangular = () => {
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
				/>
			</svg>
		</>
	)
}

export default function ConnectButton() {
	const { account } = useBitcoinKit()
	const { wallets } = useContext(WalletContext) as IWalletContext
	const { disconnect } = useContext(AccountContext) as IAccountContext
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (account?.connected) {
			setOpen(false)
		}
	}, [account?.connected])

	return (
		<div className="flex items-center justify-center gap-2">
			{account?.connected && (
				<div className="flex gap-1">
					<CopyClipboard text={account?.address!}>
						{shorthandAddress(account?.address!)}
					</CopyClipboard>
				</div>
			)}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant={account?.connected ? "destructive" : "default"}
						onClick={() => {
							setOpen(true)
						}}
					>
						{account?.connected ? <ArrowRightOnRectangular /> : "Connect"}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{account?.connected
								? "Disconnect your account"
								: "Choose a wallet"}
						</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						{wallets.map((wallet) => (
							<div key={wallet.name}>{wallet.render()}</div>
						))}
						{account?.connected && (
							<Button
								variant="default"
								onClick={async () => {
									await disconnect()
									setOpen(false)
								}}
							>
								Disconnect
							</Button>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
