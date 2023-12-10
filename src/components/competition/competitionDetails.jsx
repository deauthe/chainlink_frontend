import { useRouter } from "next/router";

const CompetitionDetails = () => {
  const router = useRouter();
  const { competitionId } = router.query;

  return (
    <div>
      <h2>Competition Details</h2>
      <p>Competition ID: {competitionId}</p>
    </div>
  );
};

export default CompetitionDetails;
