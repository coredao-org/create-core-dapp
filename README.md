# create-core-dapp

> A lightweight, developer-friendly full-stack starter kit for building DApps on Core. Preconfigured with Hardhat, Next.js, and RainbowKit, it offers a seamless developer experience from testing and deploying smart contracts to frontend connectivity.

[![npm version](https://img.shields.io/npm/v/create-dapp-template.svg)](https://www.npmjs.com/package/create-core-dapp)
[![npm downloads](https://img.shields.io/npm/dt/create-dapp-template.svg)](https://www.npmjs.com/package/create-core-dapp)

## 🚀 Quick Start

Spin up your DApp with just one command:

```bash
# Full-stack DApp (Next.js + Hardhat)
npx create-core-dapp your-dapp-name

# Hardhat-only project
npx create-core-dapp your-dapp-name --hardhat
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
# Full-stack DApp
npx create-core-dapp@latest your-dapp-name

# Hardhat-only project
npx create-core-dapp@latest your-dapp-name --hardhat
```

### Using yarn

```bash
# Full-stack DApp
yarn create-core-dapp your-dapp-name

# Hardhat-only project
yarn create-core-dapp your-dapp-name --hardhat
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

## 📋 Project Types

### Full-Stack DApp (Default)

Creates a complete DApp with both frontend and smart contract development capabilities:

- Next.js frontend with RainbowKit wallet integration
- Hardhat for smart contract development
- Pre-configured for Core Mainnet and Testnet
- Auto-synced ABIs between contracts and frontend

### Hardhat-Only Project

Creates a minimal project focused solely on smart contract development:

- Hardhat configuration for Core networks
- Smart contract templates and deployment scripts
- No frontend dependencies
- Perfect for contract-only development or when you want to use a different frontend framework

## ▶️ Usage

### For Full-Stack Projects

```bash
# Navigate to the created dApp folder
cd your-dapp-name

# Install dependencies
npm install

# Start development server
npm run dev
# or
yarn dev
```

### For Hardhat-Only Projects

```bash
# Navigate to the created project folder
cd your-dapp-name

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Compile contracts
npm run compile
```

## 🔧 Configuration

### For Full-Stack Projects

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
PRIVETKEY=your_private_key
```

### For Hardhat-Only Projects

Copy the `.env.example` file to `.env` and fill in your values:

```bash
PRIVATEKEY=your_private_key_here
CORE_TEST2_SCAN_KEY=your_api_key
CORE_MAIN_SCAN_KEY=your_api_key
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
import { coreDao, coreTestnet2 } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Core Quickstart",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [coreDao, coreTestnet2],
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
   import { useReadContract } from 'wagmi';

   export function YourComponent() {
     const { data } = useReadContract({
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
