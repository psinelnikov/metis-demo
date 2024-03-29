import React from 'react';
import type { AppProps } from 'next/app';

import Layout from '../components/Layout';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
