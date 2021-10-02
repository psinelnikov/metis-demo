import React, { useState, useEffect } from 'react';
import { Oauth2Client, HttpClient } from '@metis.io/middleware-client';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import axios from 'axios';

import Layout from '../components/Layout';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	const { query } = useRouter();
	const [httpClient, setHttpClient] = useState<HttpClient>();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			let accessToken;
			let refreshToken;
			let expiresIn;

			try {
				if (!query.code) {
					console.log('error code');
					return;
				}

				const res = await axios.get(
					`${process.env.NEXT_PUBLIC_URL}/api/metis?code=${query.code}`
				);

				console.log(res);
				if (res.status === 200 && res.data && res.data.code === 200) {
					accessToken = res.data.data.access_token;
					refreshToken = res.data.data.refresh_token;
					expiresIn = res.data.data.expires_in;

					const httpClient = new HttpClient(
						process.env.NEXT_PUBLIC_APP_ID || '',
						accessToken,
						refreshToken,
						expiresIn
					);

					setHttpClient(httpClient);

					const oauth2Client = new Oauth2Client();
					setUser(await oauth2Client.getUserInfoAsync(accessToken));
				} else if (res.status === 200 && res.data) {
					console.log(res.data.msg);
				} else {
					console.log('code error');
					console.log(res);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [query.code]);

	return (
		<Layout user={user}>
			<Component httpClient={httpClient} user={user} {...pageProps} />
		</Layout>
	);
}
