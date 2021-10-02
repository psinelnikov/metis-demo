// SPDX-License-Identifier: MIT
// @unsupported: evm
pragma solidity ^0.7.0;

import "openzeppelin3/token/ERC721/ERC721.sol";

contract MetisERC721 is ERC721 {
	uint256 private _tokenIds;

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
}
