import "./rightbar.css";
import { Users } from "../dummyData";
import Online from "../online/Online";

export default function Rightbar({ profile }) {
	const HomeRightbar = () => {
		return (
			<>
				<h2>Ads</h2>
				<h4 className="rightbarTitle">Other Creators</h4>
				<div className="rightbarFollowings">
					<div className="rightbarFollowing">
						<img
							src="assets/person/1.jpeg"
							alt=""
							className="rightbarFollowingImg"
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
					<div className="rightbarFollowing">
						<img
							src="assets/person/2.jpeg"
							alt=""
							className="rightbarFollowingImg"
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
					<div className="rightbarFollowing">
						<img
							src="assets/person/3.jpeg"
							alt=""
							className="rightbarFollowingImg"
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
					<div className="rightbarFollowing">
						<img
							src="assets/person/4.jpeg"
							alt=""
							className="rightbarFollowingImg"
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
					<div className="rightbarFollowing">
						<img
							src="assets/person/5.jpeg"
							alt=""
							className="rightbarFollowingImg"
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
					<div className="rightbarFollowing">
						<img
							src="assets/person/6.jpeg"
							alt=""
							className="rightbarFollowingImg"
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
				</div>
			</>
		);
	};

	const ProfileRightbar = () => {
		return (
			<>
				<h4 className="rightbarTitle">Other Creators</h4>
				<div className="rightbarFollowings">
					<div className="rightbarFollowing">
						<img
							src="assets/person/1.jpeg"
							alt=""
							className="rightbarFollowingImg"
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
					<div className="rightbarFollowing">
						<img
							src="assets/person/2.jpeg"
							alt=""
							className="rightbarFollowingImg"
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
					<div className="rightbarFollowing">
						<img
							src="assets/person/3.jpeg"
							alt=""
							className="rightbarFollowingImg"
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
					<div className="rightbarFollowing">
						<img
							src="assets/person/4.jpeg"
							alt=""
							className="rightbarFollowingImg"
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
					<div className="rightbarFollowing">
						<img
							src="assets/person/5.jpeg"
							alt=""
							className="rightbarFollowingImg"
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
					<div className="rightbarFollowing">
						<img
							src="assets/person/6.jpeg"
							alt=""
							className="rightbarFollowingImg"
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
				</div>
			</>
		);
	};
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				{profile ? <ProfileRightbar /> : <HomeRightbar />}
			</div>
		</div>
	);
}
