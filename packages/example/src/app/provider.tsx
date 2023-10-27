"use client"

import React from "react"
import { OrangeKitProvider } from "orangekit"

export default function RootProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return <OrangeKitProvider options={{}}>{children}</OrangeKitProvider>
}
