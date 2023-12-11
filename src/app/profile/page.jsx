"use client";
import "./profile.css";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Rightbar from "@/components/rightbar/Rightbar";
import Share from "@/components/share/Share";
import Feed from "@/components/feed/Feed";

export default function Profile() {
	return (
		<>
			<Navbar />
			<div className="profile">
				<Sidebar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img className="profileCoverImg" src="assets/post/3.jpg" alt="" />
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
							<Feed mode="profile" />
						</div>

						<Rightbar className="rightbar" />
					</div>
				</div>
			</div>
		</>
	);
}
