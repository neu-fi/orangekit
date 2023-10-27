import { Button } from "../ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { CopyClipboard } from "../ui/copy-clipboard"
import { useContext, useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"
import { AccountContext } from "../../context/account/accountContext"
import { IAccountContext } from "../../types/account"
import { WalletContext } from "../../context/wallet/walletContext"
import { IWalletContext, Other } from "../../types/wallet"
import { Verifier } from "bip322-js"

const requestAccounts = async (): Promise<string[]> => {
	return [localStorage.getItem("localAddress") || ""]
}

function renderer() {
	const [authenticationInfo, setAuthenticationInfo] = useState({
		address: "",
		message: `${
			window.location.hostname
		} wants to verify your address, timestamp: ${Number(Date.now())}`,
		signature: "",
	})
	const { toast } = useToast()
	const [showModal, setShowModal] = useState(false)

	const { connect } = useContext(AccountContext) as IAccountContext
	const { connectedWallet } = useContext(WalletContext) as IWalletContext

	useEffect(() => {
		setAuthenticationInfo({
			...authenticationInfo,
			message: `${
				window.location.hostname
			} wants to verify your address, timestamp: ${Number(Date.now())}`,
		})
	}, [showModal])

	return (
		<Dialog
			open={showModal}
			onOpenChange={(open) => {
				setShowModal(open)
			}}
		>
			<DialogTrigger asChild className="w-full">
				<Button
					variant={connectedWallet?.name === "other" ? "default" : "outline"}
					onClick={() => {
						setShowModal(true)
					}}
					className="w-full"
					disabled={connectedWallet !== null}
				>
					{connectedWallet?.name === "other" ? "Authenticated" : "Authenticate"}{" "}
					with signature
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Verify the ownership of your address</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Sign the given message with your wallet and paste the signature below
				</DialogDescription>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="address" className="text-right">
							Address
						</Label>
						<Input
							id="address"
							value={authenticationInfo.address}
							className="col-span-3"
							placeholder="bc1pjn7uaheewsaue7ym7hark9xalkeffzhxw36730mtn78qh726kvls450f0p"
							onChange={(e) => {
								localStorage.setItem("localAddress", e.target.value)
								setAuthenticationInfo({
									...authenticationInfo,
									address: e.target.value,
								})
							}}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="message" className="text-right">
							Message
						</Label>

						<div className="col-span-3 border rounded-md p-2 flex justify-between">
							{authenticationInfo.message}
							<CopyClipboard text={authenticationInfo.message} />
						</div>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="signature" className="text-right">
							Signature
						</Label>
						<Input
							id="signature"
							value={authenticationInfo.signature}
							className="col-span-3 font-mono items-start justify-start h-32 "
							placeholder="3045022100c2b7"
							onChange={(e) => {
								setAuthenticationInfo({
									...authenticationInfo,
									signature: e.target.value,
								})
							}}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						type="submit"
						onClick={async () => {
							const isAuthenticated = Verifier.verifySignature(
								authenticationInfo.address,
								authenticationInfo.message,
								authenticationInfo.signature
							)
							if (isAuthenticated) {
								toast({
									variant: "default",
									title: "Authenticated",
									description: `You are authenticated with the address ${authenticationInfo.address}`,
								})
								setShowModal(false)
								await connect(other)
							} else {
								toast({
									variant: "destructive",
									title: "Authentication failed",
									description: `Invalid signature for the address: ${authenticationInfo.address}`,
								})
							}
						}}
					>
						Authenticate
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const other: Other = {
	name: "other",
	render: renderer,
	requestAccounts: requestAccounts,
	isInjected: true,
}

export default other
