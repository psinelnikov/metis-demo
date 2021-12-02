import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import TokenMetadata from '../../components/TokenMetadata';
import SendNFTModal from '../../components/modals/SendNFTModal';

import useContract from '../../services/useContract';

export default function ViewNFT() {
	const { contract, signerAddress } = useContract('ERC721');
	const router = useRouter();
	const [tokenId, setTokenId] = useState(-1);
	const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [owner, setOwner] = useState('');
	const [url, setUrl] = useState('');

	const [modalShow, setModalShow] = useState(false);

	const fetchContractData = useCallback(async () => {
		try {
			const { id } = router.query;
			if (contract && id) {
				const value = await contract.tokenURI(id);
				const object = JSON.parse(value);

				setName(object.properties.name.description);
				setDescription(object.properties.description.description);
				setUrl(object.properties.image.description);

				setTokenName(await contract.name());
				setTokenSymbol(await contract.symbol());

				const owner = await contract.ownerOf(id);

				setOwner(owner);
				setTokenId(id);
			}
		} catch (error) {
			console.error(error);
		}
	}, [contract, router.query]);

	useEffect(() => {
		fetchContractData();

		window.ethereum.on('chainChanged', fetchContractData);

		return () => {
			window.ethereum.removeListener('chainChanged', fetchContractData);
		};
	}, [router.query, contract, fetchContractData]);

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
					{owner && signerAddress === owner && (
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
					controlId="formPlaintextImage"
				>
					<Form.Label column sm="2">
						Image
					</Form.Label>
					<Col sm="10">
						<Image src={url} alt="An NFT Image" rounded fluid />
					</Col>
				</Form.Group>
			</Form>
			<SendNFTModal
				show={modalShow}
				onHide={() => {
					setModalShow(false);
					// This is a poor implementation, better to implement an event listener
					fetchContractData();
				}}
				contract={contract}
				senderAddress={signerAddress}
				tokenId={tokenId}
			/>
		</>
	);
}
