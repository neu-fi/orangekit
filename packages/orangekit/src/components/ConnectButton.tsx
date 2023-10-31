import { Button } from "../components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../components/ui/tooltip"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { useOrangeKit } from "../hooks/useOrangeKit"
import { shorthandAddress } from "../lib/utils"
import { CopyClipboard } from "./ui/copy-clipboard"
import { WalletContext } from "../context/wallet/walletContext"
import { IWalletContext } from "../types/wallet"
import { useContext, useEffect, useState } from "react"
import { AccountContext } from "../context/account/accountContext"
import { Account, IAccountContext } from "../types/account"
import WalletUI from "./WalletUI"

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

function DisconnectedButton({ account }: { account: Account }) {
	const { wallets } = useContext(WalletContext) as IWalletContext
	const [open, setOpen] = useState(false)

	// Close the modal once connected
	useEffect(() => {
		if (account?.connected) {
			setOpen(false)
		}
	}, [account?.connected])

	return (
		<div className="flex items-center justify-center gap-2">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant={"orange"}
						onClick={() => {
							setOpen(true)
						}}
					>
						Connect Wallet
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Choose a wallet</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						{wallets.map((wallet) => (
							<div key={wallet.metaData.name}>
								{<WalletUI wallet={wallet}></WalletUI>}
							</div>
						))}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

function ConnectedButton({ account }: { account: Account }) {
	const { wallets } = useContext(WalletContext) as IWalletContext
	const { disconnect } = useContext(AccountContext) as IAccountContext
	const [open, setOpen] = useState(false)
	{
		/*
		<div className="flex gap-1">
				<CopyClipboard text={account?.address!}>
					{shorthandAddress(account?.address!)}
				</CopyClipboard>
			</div>
			*/
	}
	return (
		<div className="flex items-center justify-center gap-2">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant={"orange"}
						onClick={() => {
							setOpen(true)
						}}
					>
						{shorthandAddress(account?.address!)}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle></DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="flex flex-col gap-2 items-center justify-center">
							<div className="rounded-full h-20 w-20 bg-[#808080]"></div>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="font-bold">
										{shorthandAddress(account.address!)}
									</TooltipTrigger>
									<TooltipContent>
										<p>{account.address}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<div className="grid grid-flow-col gap-4">
							<CopyClipboard text={account?.address!}>
								Copy Address
							</CopyClipboard>
							<Button
								variant="default"
								onClick={async () => {
									await disconnect()
									setOpen(false)
								}}
								className="h-full"
							>
								<div className="flex flex-col gap-1 items-center jusitfy-center">
									{<ArrowRightOnRectangular />}
									Disconnect
								</div>
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default function ConnectButton() {
	const { account } = useOrangeKit()

	if (account?.connected) {
		return <ConnectedButton account={account} />
	} else {
		return <DisconnectedButton account={account} />
	}
}
