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
		goerli: {
			url: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
		},
		metis: {
			url: `https://goerli.gateway.metisdevops.link`,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
		},
	},
	solidity: {
		compilers: [
			{
				version: '0.8.6',
			},
		],
	},
	namedAccounts: {
		deployer: 0,
	},
};
