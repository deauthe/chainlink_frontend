// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//openzeppelin imports
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract MemePlace is ERC721URIStorage, ERC721, Ownable {
    uint256 private _tokenIds;
    uint256 private _itemSold;
    uint256 private listingPrice = 0.0025 ether;
    address payable owner;

    // mapping in the contract
    mapping(uint256 => MarketItem) private idMarketItem;

    struct MarketItem {
        uint256 tokneId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event MarketItemCreated(
        uint indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "only Owner can change the listing price");
        _;
    }

    constructor() ERC721("MEME", "MB") {
        owner == payable(msg.sender);
    }

    function updateListingPrice(uint _listingPrice) public payable onlyOwner {
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // create nft token function

    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        uint256 newTokenIdtokenId = _tokenIds++;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    // @notice create market item function

    function createMarketItem(uint256 _tokenId, uint256 price) private {
        require(price > 0, "Price must be atleast 1");
        require(
            msg.value == listingPrice,
            "price must be equal to listing price"
        );
        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    // @notice function for for reSell

    function reSellToken(uint256 tokenId, uint256 _price) public payable {
        require(
            idMarketItem[tokenId].owner == msg.sender,
            "only item owner can perform this perchage"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = _price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owne = payable(address(this));
        _itemSold--;
        _transfer(msg.sender, address(this), tokenId);
    }

    // @notice market sale function

    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idMarketItem[tokenId].price;

        require(
            msg.value == price,
            "Please submit the asking price in order to complet the purchage "
        );
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].seller = payable(address(0));
        _itemSold++;
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    // getting unsold NFT DATA
    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds;
        uint256 unSoldItemCount = _tokenIds - _itemSold;
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unSoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentitem;
                currentIndex += 1;
            }
        }

        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner = msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem memory items = new MarketItem[](itemCount);
        for(uint256 i=0; i<totalCount;i++){
            if(idMarketItem[i+1].owner == msg.sender){
                uint256 currentId = i+1;
                MarketItem storage currentItem  = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex +=1;
            }
        }
    }
}
