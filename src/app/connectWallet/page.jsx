"use client";
import "./connectWallet.css";
import React from "react";
import Web3ConnectButton from "@/components/web3ConnectButton/web3ConnectButton";
const ConnectWallet = () => {
	return (
		<div className="root">
			<Web3ConnectButton />
		</div>
	);
};

export default ConnectWallet;
