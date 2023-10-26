import React from "react"
import ReactDOM from "react-dom/client"
import "./globals.css"
import App from "./App"
import BitcoinKitProvider from "./context/provider"
import OrdinalSafe from "./components/wallets/ordinalSafe"
import Unisat from "./components/wallets/unisat"
import Xverse from "./components/wallets/xverse"
import Other from "./components/wallets/other"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BitcoinKitProvider
			options={{ wallets: [OrdinalSafe, Unisat, Xverse, Other] }}
		>
			<App />
		</BitcoinKitProvider>
	</React.StrictMode>
)
