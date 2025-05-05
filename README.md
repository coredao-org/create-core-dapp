# create-core-dapp 🚀

> A lightweight, developer-friendly full-stack starter kit for building DApps on Core. Preconfigured with Hardhat, Next.js, and RainbowKit, it offers a seamless developer experience from testing and deploying smart contracts to frontend connectivity.

[![npm version](https://img.shields.io/npm/v/create-dapp-template.svg)](https://www.npmjs.com/package/create-dapp-template)
[![npm downloads](https://img.shields.io/npm/dt/create-dapp-template.svg)](https://www.npmjs.com/package/create-dapp-template)

## 🚀 Quick Start

Spin up your DApp with just one command:

```bash
npx create-core-dapp your-dapp-name
```

## ✨ Features

- ⚡ **Next.js 15** –Fast, flexible frontend with server-side rendering.
- 🎛️ **Wagmi + Viem** - Modern React hooks and utilities for blockchain interaction.
- 🌈 **RainbowKit** – Pre-integrated with RainbowKit for hassle-free wallet login.
- ✅ **Hardhat** – preconfigured for Core Mainnet and Testnet environments
- 🔔 **React Toastify** – Built-in, minimal toast notifications for better UX
- 📦 **Auto-synced ABIs** – No manual copying—just compile and integrate it in frontend

## 📋 Prerequisites

- **Node.js:** Version 20.x or higher is recommended. You can check your version with:
  ```bash
  node --version
  ```
  Download from [nodejs.org](https://nodejs.org/).

## 📦 Installation

### Using npm (Recommended)

```bash
npx create-core-dapp@latest your-dapp-name
```

### Using yarn

```bash
yarn create-core-dapp your-dapp-name
```

### Clone manually:

You can also clone the repository and run it locally:

```bash
# Clone the repository
git clone https://github.com/your-username/create-core-dapp.git

# Navigate to the project directory
cd create-core-dapp

# Install dependencies
npm install
# or
yarn install

```

## ▶️ Usage

```bash
# Navigate to the created dApp folder
cd your-dapp-name

# Start development server
npm run dev
# or
yarn dev
```

## 🔧 Configuration

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
PRIVETKEY=your_private_key
```

## 🗂️ Project Structure

```
create-dapp-template/
├── artifacts/           # Hardhat compiled contract artifacts
├── cache/              # Hardhat cache
├── contracts/          # Smart contracts
├── scripts/            # Hardhat deployment scripts
├── src/
│   ├── abi/           # Auto-synced ABIsfor frontend usage
│   ├── pages/         # Next.js pages
│   ├── styles/        # CSS styles
│   └── wagmi.ts       # Wallet configuration
├── test/              # Test files
├── package.json       # Project dependencies
├── tsconfig.json      # TypeScript configuration
└── hardhat.config.js  # Hardhat configuration
```

## 🛠️ Compile Contracts

Place them in the `contracts/` folder

Example: Replace `Lock.sol` with your custom .sol file

```bash
npx hardhat compile
```

## ✅ Run Tests

Place them in the `test/` folder

Format: `<contract-name>.test.js`

```bash
npx hardhat test
```

## 🚀 Deploy Contracts

Place your deployment scripts inside the `scripts/` directory (e.g., deploy.js).

Ensure your wallet's private key is added to the .env file, and that the wallet has sufficient funds on the target network.

```bash
npx hardhat run scripts/deploy.js --network <network_name>
```

Replace `<network_name>` with the network you want to deploy to (e.g., `core_testnet2`)

## 🔌 Wallet Setup

```typescript
// src/wagmi.ts
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { coreDao, coreTestnet1, coreTestnet2 } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Core Quickstart",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [coreDao, coreTestnet1, coreTestnet2],
  ssr: true,
});
```

## 🌐 Run the Frontend

After setting up your contracts and installing dependencies, you can start the Next.js frontend development server with:

```bash
npm run dev
```

or

```bash
yarn dev
```

This will start the application at [http://localhost:3000](http://localhost:3000) by default.

## 📁 ABI Usage

After compiling your smart contracts with Hardhat, the ABI (Application Binary Interface) will be automatically copied to the `src/abi` directory by a custom Hardhat task.

**To use the ABI in your frontend:**

1. **Import the ABI in your component:**  
   Use a default import to bring the ABI into your TypeScript/React component:

   ```typescript
   // Example usage in a React component
   import YourContractABI from '../abi/YourContract.json';
   import { useContractRead } from 'wagmi';

   export function YourComponent() {
     const { data } = useContractRead({
       address: 'YOUR_CONTRACT_ADDRESS',
       abi: YourContractABI,
       functionName: 'yourFunction',
     });

     return (
       // Your component JSX
     );
   }
   ```

   > **Note:** If you encounter a TypeScript error when importing the JSON file, ensure your `tsconfig.json` includes `"resolveJsonModule": true` under `compilerOptions`.

2. **Keep ABIs up to date:**  
   Whenever you update and recompile your contracts, the ABI in `src/abi` will be updated automatically.
