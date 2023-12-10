import "./sidebar.css";
import Link from "next/link";
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
						<Link href="/" className="sidebarListItemText">
							Feed
						</Link>
					</li>
					<li className="sidebarListItem">
						<IoMdChatboxes className="sidebarIcon" />
						<Link href="/profile" className="sidebarListItemText">
							Discussion
						</Link>
					</li>

					<li className="sidebarListItem">
						<FaBookmark className="sidebarIcon" />
						<Link href="/" className="sidebarListItemText">
							BookMarks
						</Link>
					</li>

					<li className="sidebarListItem">
						<MdEmojiEvents className="sidebarIcon" />
						<Link href="/competition" className="sidebarListItemText">
							Contests
						</Link>
					</li>
				</ul>
				<hr className="sidebarHr" />
			</div>
		</div>
	);
}
