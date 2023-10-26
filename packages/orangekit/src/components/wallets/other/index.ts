import { Other } from "../../../types/wallet"
import render from "./renderer"
import { sign, requestAccounts, getBalance } from "./utils"

export default {
	render: render,
	sign: sign,
	requestAccounts: requestAccounts,
	getBalance: getBalance,
	name: "other",
} as Other
