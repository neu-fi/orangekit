import { Button } from "../components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { CopyClipboard } from "./ui/copy-clipboard"
import { useState } from "react"
import { useBitcoinKit } from "../hooks/useBitcoinKit"
import { useToast } from "./ui/use-toast"

export default function AuthenticateModal({
	messageWillBeVerified,
}: {
	messageWillBeVerified?: string
}) {
	const [authenticationInfo, setAuthenticationInfo] = useState({
		address: "",
		message: messageWillBeVerified ? messageWillBeVerified : "",
		signature: "",
	})
	const { toast } = useToast()
	const [showModal, setShowModal] = useState(false)

	const { authenticateWithGivenSignature } = useBitcoinKit()

	return (
		<Dialog
			open={showModal}
			onOpenChange={(open) => {
				setShowModal(open)
			}}
		>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					onClick={() => {
						setShowModal(true)
					}}
				>
					Authenticate with signature
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
						{messageWillBeVerified ? (
							<div className="col-span-3 border rounded-md p-2 flex justify-between">
								{messageWillBeVerified}
								<CopyClipboard text={authenticationInfo.message} />
							</div>
						) : (
							<Input
								id="message"
								value={authenticationInfo.message}
								className="col-span-3"
								placeholder="authenticating with bip322"
								onChange={(e) => {
									setAuthenticationInfo({
										...authenticationInfo,
										message: e.target.value,
									})
								}}
							/>
						)}
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
							const isAuthenticated = await authenticateWithGivenSignature(
								authenticationInfo.message,
								authenticationInfo.signature,
								authenticationInfo.address
							)
							if (isAuthenticated) {
								toast({
									variant: "default",
									title: "Authenticated",
									description: `You are authenticated with the address ${authenticationInfo.address}`,
								})
								setShowModal(false)
							} else {
								toast({
									variant: "destructive",
									title: "Authentication failed",
									description: `You are not authenticated with the address ${authenticationInfo.address}`,
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
