import { request } from 'undici';

(async () => {
	const { statusCode, headers, trailers, body } = await request('https://google.com/');

	console.log('response received', statusCode);
	console.log('headers', headers);
	console.log('data', await body.json());
	console.log('trailers', trailers);
})();
