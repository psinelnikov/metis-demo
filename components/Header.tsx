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

export default function Header({ user }: any) {
	const { pathname } = useRouter();

	async function web3Connect() {
		window.ethereum.request({ method: 'eth_requestAccounts' });

		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x1B3' }],
			});
		} catch (switchError) {
			// This error code indicates that the chain has not been added to MetaMask.
			if (switchError.code === 4902) {
				try {
					await window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [
							{
								chainId: '0x1E8',
								chainName: 'Metis Dev Testnet',
								nativeCurrency: {
									name: 'Metis',
									symbol: 'METIS',
									decimals: 18,
								},
								rpcUrls: ['https://dragonfire.metis.io/?owner=488'],
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

	async function login() {
		let oauth2Client = new Oauth2Client();
		oauth2Client.startOauth2(
			process.env.NEXT_PUBLIC_APP_ID || '',
			`${process.env.NEXT_PUBLIC_URL}${pathname}`
		);
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
						<Nav className="me-auto">
							<NavDropdown title="Projects" id="project-dropdown">
								<Link href="/projects/erc-721">
									<a>
										<NavDropdown.Item as="div">
											ERC-721
										</NavDropdown.Item>
									</a>
								</Link>
								<Link href="/projects/polis-erc-721">
									<a>
										<NavDropdown.Item as="div">
											Polis ERC-721
										</NavDropdown.Item>
									</a>
								</Link>
								<Link href="https://testswap.metis.io/#/faucet">
									<a>
										<NavDropdown.Item as="div">
											Faucet
										</NavDropdown.Item>
									</a>
								</Link>
							</NavDropdown>
						</Nav>
						<Nav>
							<Nav.Item className="px-2">
								<Button onClick={web3Connect} variant="secondary">
									Activate Metamask
								</Button>
							</Nav.Item>
							<Nav.Item className="px-2">
								{user ? (
									<h3 className="text-light">
										Hello, {user.username}
									</h3>
								) : (
									<Button onClick={login} variant="secondary">
										Metis Login
									</Button>
								)}
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
