import { Other } from "../../../types/wallet"
import render from "./renderer"
import { sign, requestAccounts } from "./utils"

export default {
	render: render,
	sign: sign,
	requestAccounts: requestAccounts,
	name: "other",
	isInjected: true,
} as Other
