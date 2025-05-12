import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url }) => {
	const text = url.searchParams.get('text');
	if (text === null || text === '') {
		error(400, 'text is required');
	}
	if (text.length > 100) {
		error(400, 'text must be less than 100 characters');
	}

	const googleTranslateUrl = new URL('http://translate.google.com/translate_tts');
	googleTranslateUrl.searchParams.set('ie', 'UTF-8');
	googleTranslateUrl.searchParams.set('client', 'tw-ob');
	googleTranslateUrl.searchParams.set('tl', 'ja');
	googleTranslateUrl.searchParams.set('q', text);
	googleTranslateUrl.searchParams.set('textLen', text.length.toString());

	const response = await fetch(googleTranslateUrl, {
		headers: {
			'Accept-Encoding': 'identity;q=1, *;q=0',
			Range: 'bytes=0-'
		}
	});

	const mp3Audio = await response.bytes();

	return new Response(mp3Audio, {
		headers: {
			'Content-Type': 'audio/mpeg',
			'Cache-Control': 'public, max-age=86400000',
			'Netlify-CDN-Cache-Control': 'public, max-age=31536000, immutable, durable',
			'Netlify-Vary': 'query'
		}
	});
};
