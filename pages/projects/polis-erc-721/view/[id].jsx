import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import TokenMetadata from '../../../../components/TokenMetadata';
import MetisSendNFTModal from '../../../../components/modals/MetisSendNFTModal';

import Button from 'react-bootstrap/Button';

export default function ViewNFT({ user, httpClient }) {
	const { query } = useRouter();
	const [tokenId, setTokenId] = useState(-1);
	const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');
	const [senderAddress, setSenderAddress] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [owner, setOwner] = useState('');
	const [url, setUrl] = useState('');

	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (query.id) {
					const value = await httpClient.sendTxAsync(
						process.env.NEXT_PUBLIC_CONTRACT_NAME,
						parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
						'tokenURI',
						[parseInt(query.id)]
					);
					const object = JSON.parse(value.result);

					setName(object.properties.name.description);
					setDescription(object.properties.description.description);
					setUrl(object.properties.image.description);

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
					const owner = await httpClient.sendTxAsync(
						process.env.NEXT_PUBLIC_CONTRACT_NAME,
						parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
						'ownerOf',
						[query.id]
					);

					setTokenName(name.result);
					setTokenSymbol(symbol.result);
					setOwner(owner.result);
					setTokenId(query.id);
					setSenderAddress(user?.eth_address);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();

		window.ethereum.on('chainChanged', fetchData);

		return () => {
			window.ethereum.removeListener('chainChanged', fetchData);
		};
	}, [query.id, httpClient, user?.eth_address]);

	function activateSendNFTModal() {
		setModalShow(true);
	}

	return (
		<>
			<Head>
				<title>{name}</title>
				<meta name="description" content={name} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<TokenMetadata tokenName={tokenName} tokenSymbol={tokenSymbol} />

			<Row>
				<Col>
					{owner && senderAddress === owner && (
						<Button className="float-end" onClick={activateSendNFTModal}>
							Send NFT
						</Button>
					)}
				</Col>
			</Row>

			<Form>
				<Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
					<Form.Label column sm="2">
						Name
					</Form.Label>
					<Col sm="10">
						<Form.Control plaintext readOnly defaultValue={name} />
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					className="mb-3"
					controlId="formPlaintextDescription"
				>
					<Form.Label column sm="2">
						Description
					</Form.Label>
					<Col sm="10">
						<Form.Control plaintext readOnly defaultValue={description} />
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					className="mb-3"
					controlId="formPlaintextOwner"
				>
					<Form.Label column sm="2">
						Owner
					</Form.Label>
					<Col sm="10">
						<Form.Control plaintext readOnly defaultValue={owner} />
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					className="mb-3"
					controlId="formPlaintextPassword"
				>
					<Form.Label column sm="2">
						Image
					</Form.Label>
					<Col sm="10">
						<Image src={url} alt="An NFT Image" rounded fluid />
					</Col>
				</Form.Group>
			</Form>

			<MetisSendNFTModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				httpClient={httpClient}
				senderAddress={senderAddress}
				tokenId={tokenId}
			/>
		</>
	);
}
