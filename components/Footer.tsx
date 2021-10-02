import React from 'react';

import Container from 'react-bootstrap/Container';

export default function Footer() {
	return (
		<footer className="footer mt-auto py-4 text-center bg-dark text-light">
			<Container>
				Page Layout and Functionality created by{' '}
				<a href="https://github.com/pavelsinelnikov">Pavel Sinelnikov</a>{' '}
				using <a href="https://getbootstrap.com">Bootstrap</a> and{' '}
				<a href="https://nextjs.org">Next.js</a>
			</Container>
		</footer>
	);
}
