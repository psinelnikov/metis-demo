import axios from 'axios';

export default async function handler(req: any, res: any) {
	const { method } = req;

	switch (method) {
		case 'GET':
			const code = req.query.code;
			const { data } = await axios.get(
				`https://polis.metis.io/api/v1/oauth2/access_token?app_id=${process.env.APP_ID}&app_key=${process.env.APP_SECRET}&code=${code}`
			);
			res.send(data);
			break;
		default:
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
