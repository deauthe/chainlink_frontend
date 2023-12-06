import "./sellingCard.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../components/dummyData";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";

export default function Post({ post }) {
	const [like, setLike] = useState(post.like);
	const [isLiked, setIsLiked] = useState(false);
	// const router = useRouter();

	const likeHandler = () => {
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};

	const handleBuy = async () => {
		//unlist the post
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
						<FavoriteIcon className="likeIcon" onClick={likeHandler} />

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
