# 🍊 OrangeKit

OrangeKit is a React library built for web applications, designed to seamlessly integrate them with Bitcoin wallets.

## 📌 Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
  - [App](#app)
  - [ConnectButton](#connectbutton)
- [API Reference](#-reference)
  - [OrangeKitProvider](#orangekitprovider)
  - [ConnectButton](#connectbutton-1)
  - [useOrangeKit Hook](#useorangekit-hook)
  - [Account Type](#account-type)
- [Contribution Guidelines](#-contribution-guidelines)
- [Support and Questions](#-support-and-questions)
- [License](#-license)

## 🚀 Features

OrangeKit currently provides the following:

- A "Connect Wallet" button component that supports signing in with:
  - Xverse
  - Unisat
  - OrdinalSafe
  - Other (Via manual message signing)
- Read connected wallet address
- BIP322 utilities:
  - Signing
  - Verify

## 🛠 Installation
```bash
npm install orangekit
# or
pnpm install orangekit
# or
yarn add orangekit
# or
bun install orangekit
```

## 🖥 Usage
### App
```javascript
import React from "react";
import { OrangeKitProvider } from "orangekit";
import "orangekit/dist/index.css";

export default function App() {
    return (
        <OrangeKitProvider>
            <YourApp />
        </OrangeKitProvider>
    );
}

```

### ConnectButton
```javascript
import { ConnectButton } from "orangekit";

export default function YourApp() {
    return <ConnectButton />;
}
```

## 📚 Reference
### OrangeKitProvider
**Properties**:

- **children**: The components to render inside the provider.
- **options**:
wallets: An array of wallet objects which the user can connect.
Available wallets: {ordinalSafe, unisat, xverse, other} from "orangekit"

```javascript
OrangeKitProvider({ children, options }: {
    children: React.ReactNode;
    options?: {
        wallets?: Wallet[];
    };
}):

```

### ConnectButton
A component that triggers wallet connection.

### useOrangeKit Hook
A custom hook that returns an object with various wallet functions and properties.

#### Methods & Properties:

- **account**: An object of type Account.
- **signBip322**: A function to sign a message using BIP322.

```javascript
useOrangeKit(): {
	account: Account;
	signBip322: (message: string) => Promise<string>;
	};
```

### Account Type

**Properties**:

- **connected:** A boolean to check if a wallet is connected.
- **address:** The wallet address or null.
- **balance:** The balance of the wallet.
- **network:** Either 'livenet', 'testnet', or null.
authenticated: A boolean to check if the account has been authenticated.
```javascript
type Account = {
	connected: boolean;
	address: string | null;
	balance: number;
	network: "livenet" | "testnet" | null;
	isAuthenticated: boolean;
};
```

## 🤝 Contribution Guidelines
We welcome all contributors to OrangeKit. Check out our `CONTRIBUTING.md` for guidelines on how to contribute to this project.

## ❓ Support and Questions
For any questions or support, please open an issue in this repository.

## 📜 License
OrangeKit is licensed under the MIT License.

