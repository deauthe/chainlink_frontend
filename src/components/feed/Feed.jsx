import Post from "../post/Post";
import "./feed.css";
import { Posts } from "../dummyData.js";
import { Buffer } from "buffer";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useState, useEffect } from "react";

// Smart contract Integration
import {
	useWeb3ModalProvider,
	useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import abi from "./utils/memeplace.json";
const Abi = abi;
const Address = "0x4dA194bC069bDf5a5ee580632dAF0b986b45287f";

export default function Feed(props) {
	const { address, chainId, isConnected } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();
	const [allPosts, setPosts] = useState(Posts);
	// demo data

	async function getContract() {
		if (!isConnected) {
			alert("Please connect Metamask");
			return;
		}
		const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
		const signer = await ethersProvider.getSigner();
		// The Contract object
		const contract = new ethers.Contract(Address, Abi, signer);
		return contract;
	}

	//   upload to Ipfs

	const fetchNFTs = async () => {
		const contract = await getContract();
		const data = await contract.fetchMarketItem();
		const items = Promise.all(
			data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
				const tokenURI = await contract.tokenURI(tokenId);
				const {
					data: { image, name, description },
				} = await axios.get(tokenURI);
				const price = ethers.utils.formatUnits(
					unformattedPrice.toString(),
					"ether"
				);
				return {
					price,
					tokenId: tokenId.toNumber(),
					seller,
					owner,
					image,
					name,
					description,
					tokenURI,
				};
			})
		);
		console.log(await items);
		setPosts(await items);
	};

	// these are personal nft's
	const fetchUserNFTs = async () => {
		const contract = await getContract();
		const data = await contract.fetchMyNFTs();
		const items = await Promise.all(
			data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
				const tokenURI = await contract.tokenURI(tokenId);
				const {
					data: { image, name, description },
				} = await axios.get(tokenURI);
				const price = ethers.utils.formatUnits(
					unformattedPrice.toString(),
					"ether"
				);
				return {
					price,
					tokenId: tokenId.toNumber(),
					seller,
					owner,
					image,
					name,
					description,
					tokenURI,
				};
			})
		);

		console.log(await items);
		setPosts(await items);
		//  return items;
	};

	// you have to paas nft object getting from the nfts
	const buyNFT = async (nft) => {
		const contract = getContract();
		const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
		const transaction = await contract.createMarketSale(nft.tokenId, {
			value: price,
		});
	};

	const handleRefresh = () => {
		if (props.mode != "profile") {
			fetchNFTs();
		} else {
			fetchUserNFTs();
		}
	};

	return (
		<div className="feed">
			<div className="feedWrapper">
				<button className="refreshButton" onClick={handleRefresh}>
					refresh button
				</button>
				{allPosts.map((p) => (
					<Post key={p.id} post={p} />
				))}
			</div>
		</div>
	);
}
