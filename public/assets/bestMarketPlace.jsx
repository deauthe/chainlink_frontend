import Post from "../post/Post";
import Share from "../share/Share";
import "./marketPlaceFeed.css";
import { Posts } from "../dummyData.js";
import SellingCard from "@/components/SellingCard/SellingCard";

export default function Feed() {
	const sortedPosts = Posts.sort((a, b) => b.like - a.like);
	const createChunks = (array, chunkSize) => {
		const result = [];

		for (let i = 0; i < array.length; i += chunkSize) {
			const chunk = array.slice(i, i + chunkSize);
			result.push(chunk);
		}

		return result;
	};

	const groupedNfts = createChunks(sortedPosts, 3);
	return (
		<div className="feed">
			<h1 className="pageHeading">Trending MarketPlace</h1>
			<div className="feedWrapper">
				<div className="wrapper">
					{groupedNfts.map((e) =>
						e.map((p) =>
							p.isListed ? (
								<div className="listing">
									{" "}
									<SellingCard key={p.id} post={p} />
								</div>
							) : (
								NaN
							)
						)
					)}
				</div>
			</div>
		</div>
	);
}

