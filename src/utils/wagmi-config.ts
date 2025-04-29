import { QueryClient } from "@tanstack/react-query";
import { http, createConfig } from "wagmi";
import { metaMask } from "wagmi/connectors";

// Debug the MetaMask connector
const connector = metaMask();
console.log("MetaMask connector created:", connector);

// Create custom chain definition with proper RPC URL
const rootstockTestnet = {
  id: 31, // Rootstock testnet chain ID
  name: 'Rootstock Testnet',
  nativeCurrency: {
    name: 'Rootstock Bitcoin',
    symbol: 'tRBTC',
    decimals: 18
  },
  rpcUrls: {
    default: { http: ['https://public-node.testnet.rsk.co'] },
    public: { http: ['https://public-node.testnet.rsk.co'] },
  },
  blockExplorers: {
    default: { name: 'RSK Explorer', url: 'https://explorer.testnet.rootstock.io' },
  },
};

export const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  ssr: true,
  chains: [rootstockTestnet],
  connectors: [connector],
  transports: {
    [rootstockTestnet.id]: http(),
  },
});

// Debug the created config
console.log("Wagmi config created with chains:", wagmiConfig.chains);
console.log("Wagmi config connectors:", wagmiConfig.connectors);