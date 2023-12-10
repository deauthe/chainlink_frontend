import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "@mui/material/Link";
import Badge from "@mui/material/Badge";

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

const CompetitionCard = ({
	avatar,
	title,
	subheader,
	image,
	description,
	method,
	participants,
	id,
}) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: grey[800] }} aria-label="recipe">
						{avatar}
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={title}
				subheader={subheader}
			/>
			<CardMedia component="img" height="194" image={image} alt={title} />
			<CardContent>
				<hr className="separator"></hr>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
			<CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
				<div>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
					<Link href={`/competition/${id}`} underline="none">
						<Typography variant="body2" color="primary">
							View Details
						</Typography>
					</Link>
				</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<Badge
						badgeContent={participants}
						color="primary"
						sx={{ marginRight: 1 }}
					>
						<Typography variant="body2" color="text.secondary">
							Participants
						</Typography>
					</Badge>
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				</div>
			</CardActions>

			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Description:</Typography>
					<Typography paragraph>{method}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

CompetitionCard.propTypes = {
	avatar: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subheader: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	method: PropTypes.string.isRequired,
	participants: PropTypes.number.isRequired,
};

export default CompetitionCard;
