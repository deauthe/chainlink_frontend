import "./sidebar.css";
import { RssFeed, Chat, Bookmark, Event } from "@material-ui/icons";
import { Users } from "../dummyData";

export default function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				<ul className="sidebarList">
					<li className="sidebarListItem">
						<RssFeed className="sidebarIcon" />
						<span className="sidebarListItemText">Memes</span>
					</li>
					<li className="sidebarListItem">
						<Chat className="sidebarIcon" />
						<span className="sidebarListItemText">Discussions</span>
					</li>

					<li className="sidebarListItem">
						<Bookmark className="sidebarIcon" />
						<span className="sidebarListItemText">Bookmarks</span>
					</li>

					<li className="sidebarListItem">
						<Event className="sidebarIcon" />
						<span className="sidebarListItemText">Contests</span>
					</li>
				</ul>
				<hr className="sidebarHr" />
			</div>
		</div>
	);
}
