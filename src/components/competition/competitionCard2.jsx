import "./competitionCard.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Users } from "../dummyData";
import { useState } from "react";
import { FcLike } from "react-icons/fc";
import { GrDislike } from "react-icons/gr";
import Link from "next/link";

export default function CompetitionCard({
	avatar,
	title,
	subheader,
	image,
	description,
	method,
	participants,
	id,
}) {
	return (
		<div className="post">
			<div className="postWrapper">
				<Link href={`/competition/${id}`}>
					<div className="postTop">
						<div className="postHeading">{title}</div>
						<div className="postTopLeft">
							<Link href="./profile">
								<img className="postProfileImg" src={avatar} alt="" />
							</Link>
							<span className="postUsername">Anonymus</span>
							<span className="postDate">{subheader}</span>
						</div>
						<div className="postTopRight">
							<BsThreeDotsVertical />
						</div>
					</div>
					<div className="postCenter">
						<span className="postText">{description}</span>
						<img className="postImg" src={image} alt="" />
					</div>
					<div className="postBottom"></div>
				</Link>
			</div>
		</div>
	);
}
