// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MetisERC721 is ERC721 {
	uint256 private _tokenIds;
	mapping(uint256 => string) private _tokenURIs;

	constructor(string memory name, string memory symbol)
		ERC721(name, symbol)
	{}

	function claimToken(address _claimer, string memory _tokenURI)
		public
		returns (uint256)
	{
		_mint(_claimer, _tokenIds);
		_setTokenURI(_tokenIds, _tokenURI);

		_tokenIds++;

		return _tokenIds;
	}

	function _setTokenURI(uint256 tokenId, string memory _tokenURI)
		internal
		virtual
	{
		require(
			_exists(tokenId),
			"ERC721Metadata: URI set of nonexistent token"
		);
		_tokenURIs[tokenId] = _tokenURI;
	}

	function tokenURI(uint256 tokenId)
		public
		view
		virtual
		override
		returns (string memory)
	{
		require(
			_exists(tokenId),
			"ERC721Metadata: URI query for nonexistent token"
		);

		return _tokenURIs[tokenId];
	}

	function totalSupply() public view returns (uint256) {
		return _tokenIds;
	}
}
