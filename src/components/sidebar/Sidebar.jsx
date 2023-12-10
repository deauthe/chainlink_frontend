import "./sidebar.css";
import { FaRss, FaBookmark } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { MdEmojiEvents } from "react-icons/md";

export default function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				<ul className="sidebarList">
					<li className="sidebarListItem">
						<FaRss className="sidebarIcon" />
						<span className="sidebarListItemText">Memes</span>
					</li>
					<li className="sidebarListItem">
						<IoMdChatboxes className="sidebarIcon" />
						<span className="sidebarListItemText">Discussions</span>
					</li>

					<li className="sidebarListItem">
						<FaBookmark className="sidebarIcon" />
						<span className="sidebarListItemText">Bookmarks</span>
					</li>

					<li className="sidebarListItem">
						<MdEmojiEvents className="sidebarIcon" />
						<span className="sidebarListItemText">Contests</span>
					</li>
				</ul>
				<hr className="sidebarHr" />
			</div>
		</div>
	);
}
