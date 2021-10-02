import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';

export default function History({ contract, web3, decimals }) {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			if (contract) {
				let postedTransaction;
				let transactionReceipt;
				let totalCost;
				const events = await contract.getPastEvents('allEvents', {
					fromBlock: 0,
				});

				for (let i = 0; i < events.length; i++) {
					postedTransaction = await web3.eth.getTransaction(
						events[i].transactionHash
					);

					transactionReceipt = await web3.eth.getTransactionReceipt(
						events[i].transactionHash
					);

					totalCost = web3.utils.toBN(transactionReceipt.gasUsed);
					totalCost = totalCost
						.mul(web3.utils.toBN(postedTransaction.gasPrice))
						.toString();

					events[i].totalEthCost = web3.utils.fromWei(
						totalCost,
						'ether'
					);
				}

				setEvents(events);
			}
		};

		fetchData();
	}, [contract, web3]);

	return (
		<Row className="mt-4">
			<h1>History</h1>
			<div>
				<ul>
					{(events || []).map(
						({ id, event, returnValues, totalEthCost }) => (
							<li key={id}>
								<p>
									<b>{event}</b> from{' '}
									<i>
										{returnValues.from ||
											returnValues.owner}
									</i>{' '}
									to{' '}
									<i>
										{returnValues.to ||
											returnValues.spender}
									</i>
									, <b>Value</b>:{' '}
									{returnValues.value /
										Math.pow(10, decimals)}
									, <b>Cost of the Transaction</b>:{' '}
									{totalEthCost} ETH
								</p>
							</li>
						)
					)}
				</ul>
			</div>
		</Row>
	);
}
