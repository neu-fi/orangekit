import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import BitcoinKitProvider from "./context/provider"
import OrdinalSafe from "./components/wallets/ordinalSafe"
import Unisat from "./components/wallets/unisat"
import Xverse from "./components/wallets/xverse"
import Other from "./components/wallets/other"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BitcoinKitProvider
			options={{ wallets: [OrdinalSafe, Unisat, Xverse, Other] }}
		>
			<App />
		</BitcoinKitProvider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
