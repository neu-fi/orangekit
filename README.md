# OrangeKit

> The easiest way to connect a bitcoin wallet

OrangeKit is a React library that makes it easy to connect your dapp with
bitcoin network.

## Features

OrangeKit currently provides the following:

- A "Connect Wallet" button component that supports signing in with:
  - Xverse
  - Unisat
  - OrdinalSafe
  - Other (Via manual message signing)
- Read connected wallet address
- BIP322 utilities
  - Signing
  - Verify

## Installation

```
npm install orangekit
# or
pnpm install orangekit
# or
yarn add orangekit
#or
bun install orangekit
```

## Usage

### App

```
// "use client" if you are using next.js
import React from "react"
import { OrangeKitProvider } from "orangekit"
import "orangekit/dist/index.css"

export default function App() {
return (
	<OrangeKitProvider>
		<YourApp />
	</OrangeKitProvider>
	)
}
```

### ConnectButton

```
// "use client" if you are using next.js
import { ConnectButton } from "orangekit"

export default function YourApp() {
	return <ConnectButton />
}
```

## Reference

### OrangeKitProvider

#### Wallet Options

Available wallets: {ordinalSafe, unisat, xverse, other} from "orangekit"

```
OrangeKitProvider({ children, options }: {
    children: React.ReactNode;
    options?: {
        wallets?: Wallet[];
    };
}):
```

### ConnectButton

A React button component for connecting bitcoin wallets.

### useOrangeKit Hook

```
useOrangeKit(): {
	account: Account;
	signBip322: (message: string) => Promise<string>;
	verifyBip322: (message: string, signature: string, address: string) => Promise<boolean>;
	authenticateWithBip322: (message: string) => Promise<boolean>;
	authenticateWithGivenSignature: (message: string, signature: string, address: string) => Promise<boolean>;
};
```

### Account Type

```
type Account = {
	connected: boolean;
	address: string | null;
	balance: number;
	network: "livenet" | "testnet" | null;
	authenticated: boolean;
};
```
