"use client"

import { useEffect } from "react"
import { ConnectButton, useOrangeKit } from "orangekit"

export default function Home() {
	const { account, signBip322, verifyBip322 } = useOrangeKit()
	useEffect(() => {
		console.log(account)
	}, [account])
	return (
		<div className="flex flex-col gap-2">
			<ConnectButton />
			<button
				className="h-10 w-12"
				onClick={async () => {
					const signature = await signBip322("hello world")
				}}
			>
				Sign Message
			</button>
		</div>
	)
}
