"use client"

import { useEffect } from "react"
import { ConnectButton, useBitcoinKit } from "orangekit"

export default function Home() {
	const { account } = useBitcoinKit()
	useEffect(() => {
		console.log(account)
	}, [account])
	return <ConnectButton />
}
