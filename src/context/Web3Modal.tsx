import {
	createWeb3Modal,
	defaultConfig,
	useWeb3Modal,
	useWeb3ModalEvents,
	useWeb3ModalState,
	useWeb3ModalTheme,
} from "@web3modal/ethers5/react";
import "./Web3Modal.css";

// 1. Get projectId
const projectId = "2fd657a4f9b9da4b73ccec4ae4a7fd34";

// 2. Set chains
const chains = [
	{
		chainId: 1,
		name: "Ethereum",
		currency: "ETH",
		explorerUrl: "https://etherscan.io",
		rpcUrl: "https://cloudflare-eth.com",
	},
	{
		chainId: 42161,
		name: "Arbitrum",
		currency: "ETH",
		explorerUrl: "https://arbiscan.io",
		rpcUrl: "https://arb1.arbitrum.io/rpc",
	},
	{
		chainId: 11155111,
		name: "Sepholia Testnet",
		currency: "ETH",
		explorerUrl: "https://sepolia.etherscan.io",
		rpcUrl:
			"https://eth-sepolia.g.alchemy.com/v2/krl0-5ciMiV-VlEW789JBg_XH4hvJ1R5",
	},
];

const ethersConfig = defaultConfig({
	metadata: {
		name: "Web3Modal",
		description: "Web3Modal Laboratory",
		url: "https://web3modal.com",
		icons: ["https://avatars.githubusercontent.com/u/37784886"],
	},
	defaultChainId: 1,
	rpcUrl: "https://cloudflare-eth.com",
});

createWeb3Modal({
	ethersConfig,

	chains,
	projectId,
	enableAnalytics: true,
});

export default function Web3Wallet() {
	// 4. Use modal hook
	const modal = useWeb3Modal();
	const state = useWeb3ModalState();
	const { themeMode, themeVariables, setThemeMode } = useWeb3ModalTheme();
	const events = useWeb3ModalEvents();

	return (
		<div>
			<w3m-button />
			<w3m-network-button />
			{/* <w3m-connect-button /> */}
			{/* <w3m-account-button /> */}

			{/* <button onClick={() => modal.open()}>Connect Wallet</button> */}
			{/* <button onClick={() => modal.open({ view: 'Networks' })}>Choose Network</button> */}
			{/* <button onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}>
          Toggle Theme Mode
        </button> */}
			{/* <pre>{JSON.stringify(state, null, 2)}</pre>
        <pre>{JSON.stringify({ themeMode, themeVariables }, null, 2)}</pre>
        <pre>{JSON.stringify(events, null, 2)}</pre> */}
		</div>
	);
}
