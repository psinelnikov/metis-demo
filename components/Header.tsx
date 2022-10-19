import React from 'react';
import { Oauth2Client } from '@metis.io/middleware-client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

declare let window: any;

export default function Header() {
	async function web3Connect() {
		window.ethereum.request({ method: 'eth_requestAccounts' });

		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x24C' }],
			});
		} catch (switchError: any) {
			// This error code indicates that the chain has not been added to MetaMask.
			if (switchError.code === 4902) {
				try {
					await window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [
							{
								chainId: '0x257',
								chainName: 'Metis Goerli Testnet',
								nativeCurrency: {
									name: 'Metis Goerli',
									symbol: 'METIS',
									decimals: 18,
								},
								rpcUrls: ['https://goerli.gateway.metisdevops.link'],
							},
						],
					});
				} catch (addError) {
					// handle "add" error
					console.log(addError);
				}
			}
			// handle other "switch" errors
		}
	}

	return (
		<header className="mb-5">
			<Navbar className="py-4" bg="dark" expand="lg" variant="dark">
				<Container>
					<Link href="/">
						<a>
							<Navbar.Brand>Metis Network Demo</Navbar.Brand>
						</a>
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse>
						<Nav className="me-auto"></Nav>
						<Nav>
							<Nav.Item className="px-2">
								<Button onClick={web3Connect} variant="secondary">
									Add Network
								</Button>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
