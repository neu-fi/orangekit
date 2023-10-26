import {
	ConnectButton,
	AuthenticateButton,
	AuthenticateModal,
} from "./components"

export default function App() {
	return (
		<div className="h-screen w-screen flex items-center justify-center gap-12">
			<ConnectButton />
			<AuthenticateButton messageWillBeSigned="test" />
			<AuthenticateModal messageWillBeVerified="test message" />
		</div>
	)
}
