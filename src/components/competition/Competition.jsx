import React, { useState } from "react";
import { Competitions } from "./data.js";
import CompetitionCard from "./competitionCard2.jsx";
import "./Competition.css";

const Competition = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const filteredCompetitions = Competitions.filter((competition) =>
		competition.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="feed">
			<h1 className="pageHeading">All Competitions</h1>
			<div className="searchBar">
				<input
					className="searchBarInput"
					type="text"
					placeholder="Search competitions..."
					value={searchTerm}
					onChange={handleSearch}
				/>
			</div>
			<div className="feedWrapper ">
				<div className="wrapper">
					<div className="competitionTable">
						<div className="competitionColumn">
							{filteredCompetitions.map((competition) => (
								<div key={competition.id} className="competitionCardWrapper">
									<CompetitionCard
										avatar="M"
										title={competition.title}
										subheader={competition.subheader}
										image={competition.image}
										description={competition.description}
										method={competition.method}
										participants={competition.participants}
										id={competition.id}
									/>
								</div>
							))}
						</div>
						{/* <div className="memeColumn">
              <h2 className="columnHeading">Memes</h2>
              <div className="memeRow">
                <MemeComponent1 />
                <MemeComponent1 />
              </div>
              <div className="memeRow">
                <MemeComponent1 />
                <MemeComponent1 />
              </div>
            </div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Competition;
