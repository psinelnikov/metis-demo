import React from 'react';
import type { AppProps } from 'next/app';

import Layout from '../components/Layout';
import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<SafeProvider>
				<Component {...pageProps} />
			</SafeProvider>
		</Layout>
	);
}
