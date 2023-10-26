import { Signer } from "bip322-js"

const sign = async (
	message: string,
	type?: "bip322-simple" | "ecdsa"
): Promise<string> => {
	return ""
}

const requestAccounts = async (): Promise<string[]> => {
	return [localStorage.getItem("localAddress") || ""]
}

const getBalance = async (): Promise<number> => {
	return 0
}

export { sign, requestAccounts, getBalance }
