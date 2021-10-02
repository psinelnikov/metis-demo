import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DescriptionModal(props) {
	return (
		<Modal
			{...props}
			aria-labelledby="contained-modal-title-vcenter"
			size="xl"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Method Mappings
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="show-grid">
				<Table>
					<thead>
						<tr>
							<th>Method</th>
							<th>Mapping</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<b>
									function mint(address account, uint256 amount) public
								</b>
							</td>
							<td className="d-grid">
								<Button variant="primary">Mint Tokens</Button>
							</td>
						</tr>
						<tr>
							<td>
								<b>
									function balanceOf(address account) public view
									override returns (uint256)
								</b>
							</td>
							<td className="d-grid">
								<Button variant="secondary">Check Balance</Button>
							</td>
						</tr>
						<tr>
							<td>
								<b>
									function allowance(address owner, address spender)
									public view override returns (uint256)
								</b>
							</td>
							<td className="d-grid">
								<Button variant="secondary">Check Allowance</Button>
							</td>
						</tr>
						<tr>
							<td>
								<b>
									function transfer(address recipient, uint256 amount)
									public override returns (bool)
								</b>
							</td>
							<td className="d-grid">
								<Button variant="primary">Transfer</Button>
							</td>
						</tr>
						<tr>
							<td>
								<b>
									function approve(address spender, uint256 amount)
									public override returns (bool)
								</b>
							</td>
							<td className="d-grid">
								<Button variant="primary">Approve</Button>
							</td>
						</tr>
						<tr>
							<td>
								<b>
									function transferFrom( address sender, address
									recipient, uint256 amount ) public override returns
									(bool)
								</b>
							</td>
							<td className="d-grid">
								<Button variant="primary">Withdraw</Button>
							</td>
						</tr>

						<tr>
							<td>
								<b>
									event Transfer(address indexed from, address indexed
									to, uint256 value)
								</b>
							</td>
							<td>Internal to the Contract</td>
						</tr>
						<tr>
							<td>
								<b>
									event Approval( address indexed owner, address
									indexed spender, uint256 value )
								</b>
							</td>
							<td>Internal to the Contract</td>
						</tr>
					</tbody>
				</Table>
			</Modal.Body>
		</Modal>
	);
}
