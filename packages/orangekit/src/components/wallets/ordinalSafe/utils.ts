const sign = async (
	message: string,
	type?: "bip322-simple" | "ecdsa"
): Promise<string> => {
	return new Promise((resolve, reject) => {
		try {
			window.ordinalSafe.signMessage(message).then((signature: string) => {
				resolve(signature)
			})
		} catch (e) {
			reject(e)
		}
	})
}

const requestAccounts = async (): Promise<string[]> => {
	const accounts = await window.ordinalSafe.requestAccounts()
	return accounts
}

const getBalance = async (): Promise<number> => {
	const balance = await window.ordinalSafe.getBalance()
	return balance
}

export { sign, requestAccounts, getBalance }
