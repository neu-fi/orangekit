import { AccountContext } from "../context/account/accountContext"
import { Button } from "./ui/button"
import { useBitcoinKit } from "../hooks/useBitcoinKit"
import { useContext, useEffect } from "react"
import { IAccountContext } from "../types/account"

export default function AuthenticateButton({
	messageWillBeSigned,
}: {
	messageWillBeSigned: string
}) {
	const { authenticateWithBip322 } = useBitcoinKit()
	const { authenticated } = (useContext(AccountContext) as IAccountContext)
		.account

	return (
		<Button
			onClick={async () => {
				authenticateWithBip322(messageWillBeSigned)
			}}
		>
			{authenticated ? "Authenticated" : "Authenticate"}
		</Button>
	)
}
