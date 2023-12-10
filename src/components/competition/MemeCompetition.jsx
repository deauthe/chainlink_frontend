import React, { useEffect, useState } from "react";
import { Competitions } from "./data.js";
import { AiFillLike as ThumbUpIcon } from "react-icons/ai";
import { GrDislike as ThumbDownIcon } from "react-icons/gr";
import "./MemeCompetition.css"; // Import your CSS file

const MemeCompetition = () => {
	const [competition, setCompetition] = useState(null);

	useEffect(() => {
		const pathSegments = window.location.pathname.split("/");
		const id = parseInt(pathSegments[pathSegments.length - 1]);

		const foundCompetition = Competitions.find((comp) => comp.id === id);

		setCompetition(foundCompetition);
	}, []);

	if (!competition) {
		return <div className="competition-not-found">Competition not found</div>;
	}

	const participantsData = [
		{ id: 1, name: "Participant 1", email: "participant1@example.com" },
		{ id: 2, name: "Participant 2", email: "participant2@example.com" },
		{ id: 3, name: "Participant 3", email: "participant3@example.com" },
	];

	const submissionsData = [
		{
			id: 1,
			participant: "Participant 1",
			submission: "Submission 1",
			votes: 0,
			imageUrl: "/assets/Memex.jpeg",
		},
		{
			id: 2,
			participant: "Participant 2",
			submission: "Submission 2",
			votes: 4,
			imageUrl: "/assets/Memex.jpeg",
		},
		{
			id: 3,
			participant: "Participant 3",
			submission: "Submission 3",
			votes: 0,
			imageUrl: "/assets/Memex.jpeg",
		},
	];

	const handleVote = (submissionId, isUpvote) => {
		// Add logic for handling votes here
		console.log(
			`Submission ${submissionId} ${isUpvote ? "upvoted" : "downvoted"}`
		);
	};

	return (
		<div className="meme-competition-container">
			<div className="competition-image">
				<img src={competition.image} alt={competition.title} height="200" />
			</div>
			<div className="competition-details">
				<h4>{competition.title}</h4>
				<p className="participants-info">
					Number of Participants: {competition.participants}
				</p>
				<p>{competition.description}</p>
				<div className="competition-method">
					<h6>Competition Details:</h6>
					<p>{competition.method}</p>
				</div>
				<button className="participate-button" onClick={() => {}}>
					Participate
				</button>
			</div>
			<div className="participants-table">
				<h5>Participants</h5>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						{participantsData.map((participant) => (
							<tr key={participant.id}>
								<td>{participant.id}</td>
								<td>{participant.name}</td>
								<td>{participant.email}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="submissions-grid">
				<h5>Submissions</h5>
				<div className="submissions-container">
					{submissionsData.map((submission) => (
						<div key={submission.id} className="submission-card">
							<img
								src={submission.imageUrl}
								alt={`Submission by ${submission.participant}`}
								height="200"
							/>
							<p>{submission.submission}</p>
							<div className="voteButtons">
								<button
									className="vote-button"
									onClick={() => handleVote(submission.id, true)}
								>
									Upvote <ThumbUpIcon />
								</button>
								<button
									className="vote-button"
									onClick={() => handleVote(submission.id, false)}
								>
									Downvote <ThumbDownIcon />
								</button>
							</div>
							<p className="votes-info">Votes: {submission.votes}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MemeCompetition;
