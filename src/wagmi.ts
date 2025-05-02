import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { coreDao, coreTestnet1, coreTestnet2 } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [coreDao, coreTestnet1, coreTestnet2],
  ssr: true,
});
