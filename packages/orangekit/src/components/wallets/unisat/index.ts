import render from "./renderer"
import { sign, requestAccounts, getBalance } from "./utils"
import { Unisat } from "../../../types/wallet"

export default {
	render: render,
	sign: sign,
	requestAccounts: requestAccounts,
	getBalance: getBalance,
	name: "unisat",
} as Unisat
