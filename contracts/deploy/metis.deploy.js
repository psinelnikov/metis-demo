// Just a standard hardhat-deploy deployment definition file!
const func = async (hre) => {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	const name = 'Metis';
	const symbol = 'MET';

	await deploy('MetisERC721', {
		from: deployer,
		args: [name, symbol],
		log: true,
	});
};

func.tags = ['Metis'];
module.exports = func;
