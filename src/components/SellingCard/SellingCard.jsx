import "./sellingCard.css";
import { useRouter } from "next/router";
import { Users } from "../../components/dummyData";
import { useState } from "react";
import { FcLike } from "react-icons/fc";

export default function Post({ post }) {
	const router = useRouter()
	const [like, setLike] = useState(post.like);
	const [isLiked, setIsLiked] = useState(false);
	// const router = useRouter();

	const likeHandler = () => {
	
		router.push("https://www.reddit.com/r/memes/comments/18f59sx/yes_she_actually_said_all_of_that/")
	};

	const handleBuy = async () => {
		//unlist the postS
		// route to the buy page
		// add the post to the new owner
		console.log(post);
	};

	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<img
							className="postProfileImg"
							src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
							alt=""
						/>
						<span className="postUsername">
							{Users.filter((u) => u.id === post?.userId)[0].username}
						</span>
						<span className="postDate">{post.date}</span>
					</div>
					<div className="postTopRight">{post.price}</div>
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
						{post.isListed ? (
							<button className="buyButton" onClick={handleBuy}>
								Buy
							</button>
						) : (
							<button>Buy</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
