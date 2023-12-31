import { ThemeProvider } from "@/components/theme-provider"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "orangekit/dist/index.css"
import RootProvider from "./provider"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "OrangeKit Example"
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<RootProvider>
						{children}
					</RootProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
