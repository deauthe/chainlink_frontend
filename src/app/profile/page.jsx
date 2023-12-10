"use client";
import "./profile.css";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Rightbar from "@/components/rightbar/Rightbar";
import Share from "@/components/share/Share";
import Feed from "@/components/feed/Feed";
import { Buffer } from "buffer";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Row, Form, Button } from 'react-bootstrap'
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



export default function Profile() {

	



	
	return (
		<>
			<Navbar />
			<div className="profile">
				<Sidebar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								className="profileCoverImg"
								src="assets/post/3.jpeg"
								alt=""
							/>
							<img
								className="profileUserImg"
								src="assets/person/7.jpeg"
								alt=""
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">Safak Kocaoglu</h4>
							<span className="profileInfoDesc">Hello my friends!</span>
							<hr className="divider" />
						</div>
					</div>
					<div className="profileRightBottom">
						<div className="middleSec">
							<Share />
							<Feed />
						</div>

						<Rightbar className="rightbar" />
					</div>
				</div>
			</div>
		</>
	);
}
