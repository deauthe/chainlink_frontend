import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { Buffer } from "buffer";
import { create as ipfsHttpClient } from "ipfs-http-client";


// Smart contract Integration
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import abi from "./utils/memeplace.json";
const Abi = abi.abi;
const Address = '0x4dA194bC069bDf5a5ee580632dAF0b986b45287f';


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
    const contract = new ethers.Contract(Address, abi, signer);
    return contract;
  }

  







  const listingPrice=async()=>{
	const contract = await getContract();
	if(!contract){
		alert("Error! , Submit Query");
		return;
	}
	const listingPrice = await  contract.getListingPrice();
	return listingPrice;
  }

//   upload to Ipfs 

const projectId = "2ONjCGu7UlrPOzmZ3hqy8WlN2GC";
const projectSecretKey = "43cc6a424bd74fd70d8a175972fbba87";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
	"base64"
  )}`;
  const subdomain = "https://uniqo-marketplace.infura-ipfs.io";
  const client = ipfsHttpClient({
	host: "infura-ipfs.io",
	port: 5001,
	protocol: "https",
	headers: {
	  authorization: auth,
	},
  });

  const uploadToIpfs = async ()=>{


  }



  const createNFT= async()=>{
	const contract = await getContract();
	if(!contract){
		alert("Error! , Submit Query");
		return;
	}
    
	const priceListing= await listingPrice();

	


	

  }

  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
