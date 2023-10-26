const sign = async (
	message: string,
	type?: "ecdsa" | "bip322-simple"
): Promise<string> => {
	return new Promise((resolve, reject) => {
		try {
			window.unisat
				.signMessage(message, type || "bip322-simple")
				.then((signature: string) => {
					resolve(signature)
				})
		} catch (e) {
			reject(e)
		}
	})
}

const requestAccounts = async (): Promise<string[]> => {
	const accounts = await window.unisat.requestAccounts()
	return accounts
}

const getBalance = async (): Promise<number> => {
	const balance = await window.unisat.getBalance()
	return balance.total
}

export { sign, requestAccounts, getBalance }
