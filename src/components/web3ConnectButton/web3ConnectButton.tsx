import { Inter } from "next/font/google";
import { ethers } from "ethers";
import { useState } from "react";

import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon];
const projectId = "2fd657a4f9b9da4b73ccec4ae4a7fd34";

const providerOptions = {};

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [walletAddress, setWalletAddress] = useState("");

	const { publicClient } = configureChains(chains, [
		w3mProvider({ projectId }),
	]);
	const wagmiConfig = createConfig({
		autoConnect: true,
		connectors: w3mConnectors({ projectId, chains }),
		publicClient,
	});
	const ethereumClient = new EthereumClient(wagmiConfig, chains);

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<WagmiConfig config={wagmiConfig}>
				<Web3Button />
			</WagmiConfig>

			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
		</main>
	);
}
