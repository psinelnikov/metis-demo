import * as dotenv from 'dotenv';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';

dotenv.config();

module.exports = {
	networks: {
		hardhat: {
			accounts: {
				mnemonic:
					'test test test test test test test test test test test junk',
			},
		},
		ropsten: {
			url: `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
		},
		metis: {
			url: `https://stardust.metis.io/?owner=588`,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
			gasPrice: 1000000000,
		},
		localmetis: {
			url: `http://localhost:9545`,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
			gasPrice: 0,
			ovm: true,
			chainId: 435,
			ignoreRxList: ['openzeppelin4/*'],
		},
	},
	solidity: {
		compilers: [
			{
				version: '0.7.6',
			},
			{
				version: '0.8.6',
			},
		],
	},
	ovm: {
		solcVersion: '0.7.6+commit.3b061308', // Currently, we only support 0.5.16, 0.6.12, and 0.7.6 of the Solidity compiler
		optimizer: true,
		runs: 20,
	},
	namedAccounts: {
		deployer: 0,
	},
};
