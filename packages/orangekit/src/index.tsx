import "./globals.css"
import OrangeKitProvider from "./context/provider"
export { useOrangeKit } from "./hooks/useOrangeKit"
export { ConnectButton } from "./components"

export { OrangeKitProvider }

declare global {
	interface Window {
		unisat?: any
		ordinalSafe?: any
	}
	interface globalThis {
		unisat: any
		ordinalSafe: any
	}
}
