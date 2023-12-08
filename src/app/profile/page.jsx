"use client";
import "./profile.css";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Feed from "@/components/feed/Feed";
import Rightbar from "@/components/rightbar/Rightbar";
import Share from "@/components/share/Share";

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
            </div>
          </div>
          <div className="profileRightBottom">
            {/* <Feed /> */}
            <Share />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
