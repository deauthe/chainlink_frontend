import React, { useEffect, useState } from "react";
import { Competitions } from "./data.js";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const MemeCompetition = () => {
  const [competition, setCompetition] = useState(null);

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const id = parseInt(pathSegments[pathSegments.length - 1]);

    const foundCompetition = Competitions.find((comp) => comp.id === id);

    setCompetition(foundCompetition);
  }, []);

  if (!competition) {
    return <div>Competition not found</div>;
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
    // Add logic for handling votes here abhishekoo
    console.log(
      `Submission ${submissionId} ${isUpvote ? "upvoted" : "downvoted"}`
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image={competition.image}
            alt={competition.title}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {competition.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Number of Participants: {competition.participants}
            </Typography>
            <Typography variant="body1" paragraph>
              {competition.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Competition Details:
            </Typography>
            <Typography variant="body2" paragraph>
              {competition.method}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={() => {}}>
              Participate
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Participants
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participantsData.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.id}</TableCell>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Submissions
        </Typography>
        <Grid container spacing={2}>
          {submissionsData.map((submission) => (
            <Grid item key={submission.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 400, marginBottom: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={submission.imageUrl}
                  alt={`Submission by ${submission.participant}`}
                />
                <CardContent>
                  <Typography variant="body1">
                    {submission.submission}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ThumbUpIcon />}
                    onClick={() => handleVote(submission.id, true)}
                  >
                    Upvote
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ThumbDownIcon />}
                    onClick={() => handleVote(submission.id, false)}
                  >
                    Downvote
                  </Button>
                  <Typography sx={{ marginLeft: "auto" }}>
                    Votes: {submission.votes}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MemeCompetition;
