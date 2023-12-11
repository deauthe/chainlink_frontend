import "./post.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Users } from "../dummyData";
import { useState } from "react";
import { FcLike } from "react-icons/fc";
import Link from "next/link";

import axios from "axios";

// Smart contract Integration
import {
	useWeb3ModalProvider,
	useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import abi from "../feed/utils/memeplace.json";
const Abi = abi;
const Address = "0x4dA194bC069bDf5a5ee580632dAF0b986b45287f";

export default function Post({ post }) {
	const { address, chainId, isConnected } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();

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
	const buyNFT = async (nft) => {
		const contract = getContract();
		const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
		const transaction = await contract.createMarketSale(nft.tokenId, {
			value: price,
		});
	};
	const [like, setLike] = useState(2000);
	const [isLiked, setIsLiked] = useState(false);

	const likeHandler = () => {
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};

	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<span className="postUsername">{post?.seller}</span>

						<span className="postText">description: {post?.description}</span>
					</div>
					<div className="postTopRight">{post.price}</div>
				</div>
				<div className="postCenter">
					<img className="postImg" src={post.image} alt="" />
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<FcLike className="likeIcon" onClick={likeHandler} />

						<span className="postLikeCounter">{like} people like it</span>
					</div>
					<div className="postBottomRight">
						<button
							className="buyButton"
							onClick={() => {
								buyNFT(post);
							}}
						>
							Buy
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
