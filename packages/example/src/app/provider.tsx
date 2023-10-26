"use client"

import React from "react"
import { BitcoinKitProvider } from "orangekit"

export default function RootProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return <BitcoinKitProvider options={{}}>{children}</BitcoinKitProvider>
}
