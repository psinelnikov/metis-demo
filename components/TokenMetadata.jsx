import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TokenMetadata({ tokenName, tokenSymbol }) {
	return (
		<>
			<Row>
				<Col>
					<h1>
						{tokenName} - {tokenSymbol}
					</h1>
				</Col>
			</Row>
		</>
	);
}
