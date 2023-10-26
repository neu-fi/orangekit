import { OrdinalSafe } from "../../../types/wallet"
import render from "./renderer"
import { sign, requestAccounts, getBalance } from "./utils"

export default {
	render: render,
	sign: sign,
	requestAccounts: requestAccounts,
	getBalance: getBalance,
	name: "ordinalSafe",
} as OrdinalSafe
