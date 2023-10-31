import * as React from "react"

import { Account, IAccountContext } from "../../types/account"
import { IWalletContext, Wallet } from "../../types/wallet"
import { useToast } from "../../components/ui/use-toast"
import { WalletContext } from "../wallet/walletContext"

export const AccountContext = React.createContext<IAccountContext | null>(null)

const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { connectedWallet, disconnectWallet, connectWallet } = React.useContext(
		WalletContext
	) as IWalletContext

	const [account, setAccount] = React.useState<Account>({
		connected: false,
		address: null,
	})

	const { toast } = useToast()

	const connect = async (wallet: Wallet) => {
		try {
			const accounts = await wallet.requestAccounts()
			if (!accounts[0]) {
				toast({
					variant: "destructive",
					title: "Connection failed",
					description: `Error: ${"No account found"}`,
				})
				return
			}
			await connectWallet(wallet)
			setAccount({
				connected: true,
				address: accounts[0],
			})
			window.localStorage.setItem(
				"account",
				JSON.stringify({
					connected: true,
					address: accounts[0],
				})
			)
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Connection failed",
				description: `Error: ${error.message ? error.message : error}`,
			})
			console.log(error)
		}
	}

	const disconnect = async () => {
		try {
			if (!connectedWallet) {
				toast({
					variant: "destructive",
					title: "Disconnect failed",
					description: "No wallet connected",
				})
				return
			}
			disconnectWallet()
			setAccount({
				connected: false,
				address: null,
			})
			window.localStorage.setItem(
				"account",
				JSON.stringify({
					connected: false,
					address: null,
				})
			)
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		setAccount(
			window.localStorage.getItem("account")
				? JSON.parse(localStorage.getItem("account") as string)
				: {
						connected: false,
						address: null,
				  }
		)
	}, [])

	React.useEffect(() => {
		const handler = (accounts: string[]) => {
			setAccount({
				connected: true,
				address: accounts[0],
			})
			window.localStorage.setItem(
				"account",
				JSON.stringify({
					connected: true,
					address: accounts[0],
				})
			)
			toast({
				variant: "default",
				title: "Account changed",
				description: `New account: ${accounts[0]}`,
			})
		}
		if (!connectedWallet) return
		if (connectedWallet.subscribeAccountsChanged) {
			connectedWallet.subscribeAccountsChanged(handler)
		}

		return () => {
			if (connectedWallet.unsubscribeAccountsChanged) {
				connectedWallet.unsubscribeAccountsChanged(handler)
			}
		}
	}, [connectedWallet])

	return (
		<AccountContext.Provider
			value={{
				connect,
				disconnect,
				account,
			}}
		>
			{children}
		</AccountContext.Provider>
	)
}

export default AccountProvider
