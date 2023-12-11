import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import React from "react";

// Smart contract Integration
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import abi from "./utils/memeplace.json";
const Abi = abi;
const Address = "0x4dA194bC069bDf5a5ee580632dAF0b986b45287f";
const ChainlinkAddress = "";

export default function Home() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  // React States

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
    //  return items;
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

  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <button className="button" onClick={fetchNFTs}>
          fetcddhNFTs
        </button>
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
