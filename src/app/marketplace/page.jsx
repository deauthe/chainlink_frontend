"use client";
import "./marketplace.css";
import React from "react";
import NavBar from "@/components/Navbar/Navbar.jsx";
import Sidebar from "@/components/sidebar/Sidebar";
import MarketPlaceFeed from "@/components/marketplaceFeed/marketPlaceFeed";

const MarketPlace = () => {
	return (
		<div>
			<NavBar />
			<div className="homeContainer">
				<Sidebar />
				<MarketPlaceFeed />
			</div>
		</div>
	);
};

export default MarketPlace;
