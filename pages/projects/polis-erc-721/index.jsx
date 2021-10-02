import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import TokenMetadata from '../../../components/TokenMetadata';
import MetisCreateNFTModal from '../../../components/modals/MetisCreateNFTModal';

export default function ViewAllNFTs({ user, httpClient }) {
	const [list, setList] = useState([]);
	const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');
	const [senderAddress, setSenderAddress] = useState('');
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const name = await httpClient.sendTxAsync(
					process.env.NEXT_PUBLIC_CONTRACT_NAME,
					parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
					'name',
					[]
				);
				const symbol = await httpClient.sendTxAsync(
					process.env.NEXT_PUBLIC_CONTRACT_NAME,
					parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
					'symbol',
					[]
				);

				setTokenName(name.result);
				setTokenSymbol(symbol.result);

				const totalSupply = await httpClient.sendTxAsync(
					process.env.NEXT_PUBLIC_CONTRACT_NAME,
					parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
					'totalSupply',
					[]
				);

				const arr = [];

				for (let i = 0; i < totalSupply.result; i++) {
					const rawURI = await httpClient.sendTxAsync(
						process.env.NEXT_PUBLIC_CONTRACT_NAME,
						parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
						'tokenURI',
						[i]
					);

					const owner = await httpClient.sendTxAsync(
						process.env.NEXT_PUBLIC_CONTRACT_NAME,
						parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
						'ownerOf',
						[i]
					);

					if (rawURI.result) {
						const convertedURI = JSON.parse(rawURI.result);
						arr.push({
							tokenId: i,
							name: convertedURI.properties.name.description,
							owner: owner.result,
						});
					}
				}

				setSenderAddress(user?.eth_address);
				setList(arr);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();

		window.ethereum.on('accountsChanged', fetchData);
		window.ethereum.on('chainChanged', fetchData);

		return () => {
			window.ethereum.removeListener('accountsChanged', fetchData);
			window.ethereum.removeListener('chainChanged', fetchData);
		};
	}, [user?.eth_address, httpClient]);

	function activateCreateNFTModal() {
		setModalShow(true);
	}

	return (
		<>
			<Head>
				<title>Metis ERC-721</title>
				<meta name="description" content="Metis ERC721" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<TokenMetadata tokenName={tokenName} tokenSymbol={tokenSymbol} />

			<Row>
				<Col>
					{user && (
						<Button
							className="float-end"
							onClick={activateCreateNFTModal}
						>
							Create NFT
						</Button>
					)}
				</Col>
			</Row>

			<Row>
				<Col>
					<Table responsive>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th className="d-none d-sm-table-cell">Owner</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{list.map((listItem) => (
								<tr key={listItem.tokenId}>
									<td>{listItem.tokenId}</td>
									<td>{listItem.name}</td>
									<td className="d-none d-sm-table-cell">
										{listItem.owner}
									</td>
									<td>
										<Link
											href={`polis-erc-721/view/${listItem.tokenId}`}
											passHref
										>
											<Button className="float-end" size="sm">
												View
											</Button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>

			<MetisCreateNFTModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				httpClient={httpClient}
				senderAddress={senderAddress}
			/>
		</>
	);
}
