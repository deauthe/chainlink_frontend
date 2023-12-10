import "./post.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Users } from "../dummyData";
import { useState } from "react";
import { FcLike } from "react-icons/fc";
import Link from "next/link";

export default function Post({ post }) {
	const [like, setLike] = useState(post.like);
	const [isLiked, setIsLiked] = useState(false);

	const likeHandler = () => {
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link href="./profile">
							<img
								className="postProfileImg"
								src={
									Users.filter((u) => u.id === post?.userId)[0].profilePicture
								}
								alt=""
							/>
						</Link>
						<span className="postUsername">
							{Users.filter((u) => u.id === post?.userId)[0].username}
						</span>
						<span className="postDate">{post.date}</span>
					</div>
					<div className="postTopRight">
						<BsThreeDotsVertical />
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post?.desc}</span>
					<img className="postImg" src={post.photo} alt="" />
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<FcLike className="likeIcon" onClick={likeHandler} />

						<span className="postLikeCounter">{like} people like it</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">{post.comment} comments</span>
					</div>
				</div>
			</div>
		</div>
	);
}
