"use client"

import { useEffect } from "react"
import { ConnectButton, useOrangeKit } from "orangekit"

export default function Home() {
	const { account } = useOrangeKit()
	useEffect(() => {
		console.log(account)
	}, [account])
	return <ConnectButton />
}
