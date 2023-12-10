// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTContest is ERC721URIStorage, Ownable {
    uint256 public constant CONTEST_DURATION = 1 hours;
    uint256 totalContests;
    uint256 private listingPrice = 0.0025 ether;
    uint256 private _tokenIds;
    uint256 public totalSupply;



    // mapping used in contract 

    mapping(uint256 => ContestStruct) private raisedContests;
    mapping(address => uint256[]) private votes;
    mapping(uint256 => VotedStruct[]) private votedOn;
    mapping(address => uint256) public contributors;
    mapping(uint256 => NFTs) private idToNFTs;



    struct ContestStruct {
        uint256 id;
        string name;
        string sponsor;
        string topic;
        uint256 startTime;
        uint256 endTime;
        uint256[] nftIds;
        uint256 upvotes;
        uint256 downvotes;
        bool passed;
        address payable winner;
        address contestCreator;
       uint256 duration;
    }

    struct VotedStruct {
        address voter;
        uint256 timestamp;
        bool choosen;
    }

    struct NFTs{
        uint256 tokenId;
        address payable owner;
        address payable  seller;
        bool status;
    }

    event ContestCreated(uint256 contestId, string name, string sponsor, string topic);
    event NFTCreated(uint256 tokenId, address creator, string metadataURI);
    event LikesUpdated(uint256 contestId, uint256 upvotes, uint256 downvotes);

    modifier contestCreatorOnly() {
        require(msg.sender == owner(), "Unauthorized: not a contest creator");
        _;
    }
    
    constructor() ERC721("NFTContest", "NFTC") Ownable(payable(msg.sender)) {}



    function createContest(string memory _name, string memory _sponsor, string memory _topic) external contestCreatorOnly returns(ContestStruct memory) {


       uint256 contestId = totalContests++;

        ContestStruct storage contest = raisedContests[contestId];
        

        contest.id = contestId;
        contest.name = _name;
        contest.sponsor = _sponsor;
        contest.topic = _topic;
        contest.duration = block.timestamp + CONTEST_DURATION;

        // event;

        return proposal;

    }




    function uploadImageAndCreateNFT(string memory _metadataURI) external {
        require(contributors[msg.sender] > 0, "Denied: User is not a contributor"); 
        uint256 tokenId = nextTokenId();
         _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _metadataURI);
        idToNFTs[tokenId] = NFTs(
            tokenId,
            msg.sender,
            address(this),
            false
        ) 
        // Add the NFT to the current contest
        uint256 currentContestId = totalContests - 1;
        contests[currentContestId].nftIds.push(tokenId);
        emit NFTCreated(tokenId, msg.sender, _metadataURI);
    }

    function voteForNFT(uint256 _contestId, bool choosen) external returns(VotedStruct memory) {
        require(block.timestamp < contests[_contestId].endTime, "Contest has ended");

        Contest storage contest = contests[_contestId];

        if (choosen) {
            contest.upvotes++;
        } else {
            contest.downvotes++;
        }
        emit LikesUpdated(_contestId, contest.upvotes, contest.downvotes);

    }

  

    function determineWinner(uint256 _contestId) external contestCreatorOnly {
        require(block.timestamp >= contests[_contestId].endTime, "Contest is still ongoing");

        Contest storage contest = contests[_contestId];
        uint256[] memory nftIds = contest.nftIds;

        address winner;
        uint256 maxVotes = 0;

        for (uint256 i = 0; i < nftIds.length; i++) {
            uint256 tokenId = nftIds[i];
            uint256 votes = getVotesForNFT(_contestId, tokenId);

            if (votes > maxVotes) {
                maxVotes = votes;
                winner = ownerOf(tokenId);
            }
        }

        // Reward the winner based on the USD value of NFT (assumes Ether is used as the reward)
        if (winner != address(0)) {
            uint256 nftValueInUSD = getNFTValueInUSD();
            payTo(winner, nftValueInUSD);
        }
    }

    function getVotesForNFT(uint256 _contestId, uint256 _tokenId) public view returns (uint256) {
        Contest storage contest = contests[_contestId];
        uint256 votes = contest.upvotes - contest.downvotes;
        return votes;
    }

    function nextTokenId() public view returns (uint256) {
        return totalSupply + 1;
    }

    function getNFTValueInUSD() internal view returns (uint256) {
        // Implement your own logic to get the USD value of NFT
        // (e.g., using Chainlink price feeds)
        return 0; // Placeholder, update with actual logic
    }

    function fetchContests() internal view returns (Contest[] memory) {
        Contest[] memory contestList = new Contest[](nextContestId);
        for (uint256 i = 0; i < nextContestId; i++) {
            contestList[i] = Contest({
                name: contests[i].name,
                sponsor: contests[i].sponsor,
                topic: contests[i].topic,
                startTime: contests[i].startTime,
                endTime: contests[i].endTime,
                nftIds: contests[i].nftIds,
                upvotes: contests[i].upvotes,
                downvotes: contests[i].downvotes
            });
        }
        return contestList;
    }

    function fetchContributors() external view returns (address[] memory, uint256[] memory) {
        uint256 totalContributors = 0;
        for (uint256 i = 0; i < nextContestId; i++) {
            totalContributors += contributors[contests[i].sponsor];
        }

        address[] memory contributorList = new address[](totalContributors);
        uint256[] memory contributionAmounts = new uint256[](totalContributors);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < nextContestId; i++) {
            address sponsor = contests[i].sponsor;
            uint256 amount = contributors[sponsor];
            
            contributorList[currentIndex] = sponsor;
            contributionAmounts[currentIndex] = amount;
            currentIndex++;
        }

        return (contributorList, contributionAmounts);
    }

    function payTo(address to, uint256 amount) internal returns (bool) {
        (bool success,) = payable(to).call{value: amount}("");
        require(success, "Payment failed");
        return true;
    }
}
