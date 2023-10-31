"use client"

import { useEffect } from "react"
import { ConnectButton, useOrangeKit } from "orangekit"

export default function Home() {
	const { account, signBip322, verifyBip322 } = useOrangeKit()
	useEffect(() => {
		console.log(account)
	}, [account])
	return (
		<div className="h-screen grid place-items-center">
			<div>
				<p className="font-semibold pb-6">OrangeKit Example</p>
				<ConnectButton />
			</div>
		</div>
	)
}
