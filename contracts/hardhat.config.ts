import * as dotenv from 'dotenv';
import '@metis.io/hardhat-mvm';
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
			url: `https://rocketfuel.metis.io/?owner=435`,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
			gasPrice: 15000000,
			ovm: true,
			ignoreRxList: ['openzeppelin4/*'],
		},
		localmetis: {
			url: `http://localhost:9545`,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
			gasPrice: 0,
			ovm: true,
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
		solcVersion: '0.7.6', // Currently, we only support 0.5.16, 0.6.12, and 0.7.6 of the Solidity compiler
		optimizer: true,
		runs: 20,
	},
	namedAccounts: {
		deployer: 0,
	},
};
