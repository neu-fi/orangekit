import { useContext, useEffect, useState } from "react"
import { AccountContext } from "../../context/account/accountContext"
import { IAccountContext } from "../../types/account"
import { IWalletContext, Xverse } from "../../types/wallet"
import { WalletContext } from "../../context/wallet/walletContext"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
const XverseLogo = require("../../assets/xverse_logo.png")

import {
	AddressPurpose,
	BitcoinNetworkType,
	getAddress,
	signMessage,
} from "sats-connect"

const sign = async (message: string, address: string): Promise<string> => {
	let signature: string = ""
	const signMessageOptions = {
		payload: {
			network: {
				type: BitcoinNetworkType.Mainnet,
			},
			address: address,
			message: message,
		},
		onFinish: (response: any) => {
			signature = response
		},
		onCancel: () => {
			alert("Canceled")
		},
	}
	await signMessage(signMessageOptions)
	return signature
}

const requestAccounts = async (): Promise<string[]> => {
	let addresses: string[] = []
	await getAddress({
		payload: {
			purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
			message: "Sign in to XVerse",
			network: {
				type: BitcoinNetworkType.Mainnet,
			},
		},
		onFinish: (response: any) => {
			addresses = response.addresses.map((address: any) => address.address)
		},
		onCancel: () => alert("Request canceled"),
	})
	return addresses
}

const isInjected = (): boolean => {
	if (typeof window !== "undefined") {
		return typeof window.BitcoinProvider !== "undefined"
	}
	return false
}

function renderer() {
	const { account, connect } = useContext(AccountContext) as IAccountContext
	const { connectedWallet } = useContext(WalletContext) as IWalletContext

	const [isXverseInjected, setXverseInjected] = useState<boolean>(false)

	useEffect(() => {
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
	}, [])

	const handleClick = async () => {
		if (isXverseInjected) {
			try {
				await connect(xverse)
			} catch (error) {
				console.log(error)
			}
		} else {
			window.open("https://www.xverse.app/download", "_blank")
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
					<img src={XverseLogo} width={28} height={28} alt="xverse" />
					Xverse
				</div>
				<Badge
					variant={
						account.connected && connectedWallet?.name === "xverse"
							? "default"
							: isXverseInjected
							? "secondary"
							: "outline"
					}
				>
					{account.connected && connectedWallet?.name === "xverse"
						? "Connected"
						: isXverseInjected
						? "Installed"
						: "Install"}
				</Badge>
			</Button>
		</div>
	)
}

const xverse: Xverse = {
	name: "xverse",
	render: renderer,
	sign: sign,
	requestAccounts: requestAccounts,
	isInjected: isInjected(),
}

export default xverse
