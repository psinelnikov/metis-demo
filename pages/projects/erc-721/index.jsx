import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import TokenMetadata from '../../../components/TokenMetadata';
import CreateNFTModal from '../../../components/modals/CreateNFTModal';

import useContract from '../../../services/useContract';

export default function ViewAllNFTs() {
	const { contract, signerAddress } = useContract('ERC721');
	const [list, setList] = useState([]);
	const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (contract) {
					setTokenName(await contract.name());
					setTokenSymbol(await contract.symbol());

					const totalSupply = await contract.totalSupply();
					const arr = [];
					for (let i = 0; i < totalSupply; i++) {
						const value = await contract.tokenURI(i);
						const owner = await contract.ownerOf(i);

						if (value) {
							const object = JSON.parse(value);
							arr.push({
								tokenId: i,
								name: object.properties.name.description,
								owner,
							});
						}
					}

					setList(arr);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [contract]);

	function activateCreateNFTModal() {
		setModalShow(true);
	}

	return (
		<>
			<Head>
				<title>ERC-721</title>
				<meta name="description" content="ERC721" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<TokenMetadata tokenName={tokenName} tokenSymbol={tokenSymbol} />

			<Row>
				<Col>
					<Button className="float-end" onClick={activateCreateNFTModal}>
						Create NFT
					</Button>
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
											href={`erc-721/view/${listItem.tokenId}`}
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
			<CreateNFTModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				contract={contract}
				senderAddress={signerAddress}
			/>
		</>
	);
}
