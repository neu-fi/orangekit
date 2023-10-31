# Contributing to OrangeKit

First off, thank you for considering contributing to OrangeKit! It's people like
you that make OrangeKit such a great tool. This document provides guidelines for
contributing to the project to ensure a smooth process for both contributors and
maintainers.

## How Can I Contribute?

### Reporting Bugs

1. **Ensure the bug was not already reported** by searching on GitHub under
   [Issues](LINK_TO_ISSUES).
2. If you're unable to find an open issue addressing the problem,
   [open a new one](LINK_TO_NEW_ISSUE). Be sure to include a title and clear
   description, as much relevant information as possible, and a code sample or
   an executable test case demonstrating the expected behavior that is not
   occurring.

### Suggesting Enhancements

1. **Ensure the enhancement was not already suggested** by searching on GitHub
   under [Issues](LINK_TO_ISSUES).
2. Open a new issue and provide the relevant information about the enhancement,
   including a clear and detailed explanation of the problem you're aiming to
   solve.

### Integrate a New Wallet

1. **Ensure the wallet was not already integrated** by checking the
   [lib/integrations](https://github.com/neu-fi/orangekit/blob/main/packages/orangekit/src/lib/integrations/index.ts)
2. Create a new branch: `git checkout -b NEW_WALLET_"EXAMPLE_WALLET_NAME"`
3. Create a new file under
   [lib/integrations](https://github.com/neu-fi/orangekit/blob/main/packages/orangekit/src/lib/integrations)
   with the name exampleWalletName.ts (name your wallet according to camelCase)
4. Implement required functions and write your wallet's metadata according to
   given interface below. see
   [unisat.ts](https://github.com/neu-fi/orangekit/blob/main/packages/orangekit/src/lib/integrations/unisat.ts)
   as example

```javascript
type WalletMetaData = {
	name: string
	logoPath: string
	dowloadLink: string
	description?: string
}

interface Wallet = {
	sign: (message: string) => Promise<string>
	requestAccounts: () => Promise<string[]>
	isInjected: () => boolean
	metaData: WalletMetaData
	subscribeAccountsChanged?: (callback: (accounts: string[]) => void) => void
	unsubscribeAccountsChanged?: (callback: (accounts: string[]) => void) => void
}
```

5. Export your wallet from
   [lib/integrations/index.ts](https://github.com/neu-fi/orangekit/blob/main/packages/orangekit/src/lib/integrations/index.ts)
6. Create a pull request by following the
   [Pull Requests guideline](#pull-requests) below

### Pull Requests

1. Ensure any install or build dependencies are removed before the end of the
   layer when doing a build.
2. Update the README.md with details of changes, including new dependencies,
   architecture changes, etc.
3. Increase the version numbers in any examples files and the README.md to the
   new version that this Pull Request would represent.
4. Ensure your code adheres to the existing style to maintain consistency.
5. Submit a pull request to the `main` branch. Be sure to reference any relevant
   issues in your PR description.

## Setup and Local Development

1. Fork the repo on GitHub.
2. Clone your fork locally:
   `git clone https://github.com/YOUR_USERNAME/OrangeKit.git`
3. Install dependencies: `npm install`
4. Create a branch for your feature or bugfix:
   `git checkout -b FEATURE_OR_BUGFIX`
5. Make your changes.
6. Test your changes locally.
7. Commit your changes: `git commit -m 'Add some feature or fix some bug'`
8. Push to your fork: `git push origin FEATURE_OR_BUGFIX`
9. Create a new pull request from your forked repository to the main OrangeKit
   repo.

## Coding Style

- Use semicolons.
- 2-space indentation.
- Stick to the existing style as much as possible.
- Always comment your code where necessary.

## Additional Notes

Your contributions are always welcome and appreciated. Following the guidelines
above helps to communicate that you respect the time of the developers managing
and developing this open-source project. In return, they should reciprocate that
respect in addressing your issue, assessing changes, and helping finalize your
pull requests.
