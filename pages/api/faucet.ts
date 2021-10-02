import { ethers } from 'ethers';
import { Transaction } from 'ethereumjs-tx';

export default async function handler(req: any, res: any) {
	const provider = new ethers.providers.JsonRpcProvider(
		'https://www.sinelnikov.ca/ganache'
	);

	const { method } = req;

	switch (method) {
		case 'GET':
			const accounts = await provider.listAccounts();
			const accountsWithBalance = [];
			for (let i = 0; i < accounts.length; i++) {
				const bnBalance = await provider.getBalance(accounts[i]);
				const balance = ethers.utils.formatEther(bnBalance);

				accountsWithBalance.push({
					account: accounts[i],
					balance,
				});
			}
			res.send(accountsWithBalance);
			break;
		case 'POST':
			// Update or create data in your database
			const { senderAddress, receiverAddress } = req.body;
			if (
				ethers.utils.isAddress(senderAddress) &&
				ethers.utils.isAddress(receiverAddress)
			) {
				const keys: { [key: string]: string } = {
					'0xA545f42da3fB84F3746a89D66e6Bd7Cbc14A1E38':
						'02d7f36e2c823d0b75fe46121123969561e1be2f00bb109510f1c31bc6ee102b',
					'0x56A0969ddF871BF171Ae1a30480736624aED73d0':
						'7069f6543f243de5c74631c1b562f75fe17a702b82121cec774e273b68234106',
					'0x51005B8bA4b719CAef259D10788DB939503051E5':
						'88c22f5e3e5ffd2cbc8c11b608544a0211d303fe375e9f888e2b975e979e9c4a',
					'0xdEc61Caf1C8b1F26C62777D7007cCD1E65053F90':
						'd3af2cf57a3798bb2244b05fb875a7fd78cb0a62ff187193936f1775b34c202b',
					'0x91832F4f74CF1fa3caa149B001936CC63796aF57':
						'9ffb24a8423f8061b7414ecd1c1cbdc2bf78b2eb916e00ea44050362da342379',
					'0x973E75F2CC9A7e9ec90e5b9D6afE6F33dE7A6a43':
						'aa20ffd882a3f1b08c70750fabd6b87f2d06c025dd54fd3a0140e57d3a538a07',
					'0x0b2e1d84E6d40E8957537731f2683Fe50Daf2F19':
						'c8e669fdf6e4a3fbf62a22e1474e5927ab48420f652d2c14b3c805da9cc67981',
					'0x2cFF5d7F780E47EE5ac01ff5A8C5eE0E35f9b545':
						'd680f298fe04bc678adfb266c9e56dbb4d215f128fb083646ce212f9d099710d',
					'0x6a8011884f9840C0603e20f9402Ea45ab114DD31':
						'e4d35ab7628f0a7f3334c00251c6e1ef90b26c47956357dfcc13c13be079e038',
					'0xAC2444B1e48b6024f6d11c2a67584fe706C4FF9B':
						'66957c694c0ff3661f6716a5befa7ba2466f159fa2b4a040780dfa263a90e96e',
				};

				// Make a transaction to commit to the contract
				const txCount = await provider.getTransactionCount(senderAddress);
				// build the transaction
				const tx = new Transaction({
					nonce: ethers.utils.hexlify(txCount),
					to: receiverAddress,
					value: ethers.utils.parseEther('1').toHexString(),
					gasLimit: ethers.utils.hexlify(21000),
				});

				// sign the transaction
				tx.sign(Buffer.from(keys[senderAddress], 'hex'));
				// send the transaction
				const { hash } = await provider.sendTransaction(
					'0x' + tx.serialize().toString('hex')
				);
				await provider.waitForTransaction(hash);

				res.send(hash);
			} else {
				res.status(500).send({
					result: 'Invalid address, enter a valid address',
				});
			}
			break;
		default:
			res.setHeader('Allow', ['GET', 'POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

// let allowedOrigins = [
// 	'https://pavelsinelnikov.duckdns.org',
// 	'https://sinelnikov.ca',
// 	'https://www.sinelnikov.ca',
// ];

// app.use(
// 	cors({
// 		origin: function (origin, callback) {
// 			// allow requests with no origin
// 			// (like mobile apps or curl requests)
// 			if (!origin) return callback(null, true);
// 			if (allowedOrigins.indexOf(origin) === -1) {
// 				var msg =
// 					'The CORS policy for this site does not ' +
// 					'allow access from the specified Origin.';
// 				return callback(new Error(msg), false);
// 			}
// 			return callback(null, true);
// 		},
// 	})
// );

// app.post('/api', async (req, res) => {

// });

// app.get('/api/accounts', async (req, res) => {

// });

// export default async function handler(req, res) {
// 	const result = await fetch('http://192.168.2.169:5000/api/accounts');
// 	// Get data from your database
// 	res.status(200).json(users);
// }
