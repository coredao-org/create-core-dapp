import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import TokenTransfer from "./TokenTransfer";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <div className={styles.container}>
      <Head>
        <title>Core Token Transfer Dapp</title>
        <meta
          content="A decentralized application for transferring Core Protocol tokens securely using Rainbow kit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <RainbowKitProvider showRecentTransactions={true}>
          <ConnectButton />
          {isConnected && <TokenTransfer />}
        </RainbowKitProvider>
      </main>
    </div>
  );
};

export default Home;
