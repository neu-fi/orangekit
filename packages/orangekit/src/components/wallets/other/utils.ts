import { Signer } from "bip322-js"

const sign = async (message: string): Promise<string> => {
	return ""
}

const requestAccounts = async (): Promise<string[]> => {
	return [localStorage.getItem("localAddress") || ""]
}

export { sign, requestAccounts }
