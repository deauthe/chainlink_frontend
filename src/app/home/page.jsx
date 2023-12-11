import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import React from "react";

const Home = () => {
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
};

export default Home;
