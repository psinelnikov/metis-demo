import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UseFormInput from '../UseFormInput';

export default function MetisSendNFTModal({
	show,
	onHide,
	httpClient,
	senderAddress,
	tokenId,
}) {
	const [receiverAddress, receiverAddressInput] = UseFormInput({
		type: 'text',
		placeholder: 'Address',
	});

	async function sendNFT() {
		const result = await httpClient.sendTxAsync(
			process.env.NEXT_PUBLIC_CONTRACT_NAME,
			parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
			'transferFrom',
			[senderAddress, receiverAddress, tokenId]
		);

		console.log(result);
	}

	return (
		<Modal
			show={show}
			onHide={onHide}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Send NFT
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="show-grid">
				<Form>
					<Form.Group className="mb-3" controlId="formGroupName">
						<Form.Label>Receiver Address</Form.Label>
						{receiverAddressInput}
					</Form.Group>
					<div className="d-grid">
						<Button variant="primary" onClick={sendNFT}>
							Send NFT
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
