"use client"

import { useEffect } from "react"
import { ConnectButton, useOrangeKit } from "orangekit"
import { ModeToggle } from "@/components/ui/mode-toggle"

export default function Home() {
	const { account, signBip322, verifyBip322 } = useOrangeKit()
	useEffect(() => {
		console.log(account)
	}, [account])
	return (
		<div>
			<div className="absolute m-4 right-0">
				<ModeToggle/>
			</div>
			<div className="h-screen grid place-items-center">
				<div>
					<p className="font-semibold pb-6">OrangeKit Example</p>
					<ConnectButton />
				</div>
			</div>
		</div>
	)
}
