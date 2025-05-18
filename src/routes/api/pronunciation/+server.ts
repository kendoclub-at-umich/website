import { error, type RequestHandler } from '@sveltejs/kit';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import {
	GOOGLE_TTS_SERVICE_ACCOUNT_KEY_CLIENT_EMAIL,
	GOOGLE_TTS_SERVICE_ACCOUNT_KEY_PRIVATE_KEY
} from '$env/static/private';

const useGoogleTts =
	GOOGLE_TTS_SERVICE_ACCOUNT_KEY_CLIENT_EMAIL !== '' &&
	GOOGLE_TTS_SERVICE_ACCOUNT_KEY_PRIVATE_KEY !== '';

const googleTtsClient = new TextToSpeechClient({
	credentials: {
		client_email: GOOGLE_TTS_SERVICE_ACCOUNT_KEY_CLIENT_EMAIL,
		private_key: GOOGLE_TTS_SERVICE_ACCOUNT_KEY_PRIVATE_KEY
	}
});

export const GET: RequestHandler = async ({ url }) => {
	const text = url.searchParams.get('text');
	if (text === null || text === '') {
		error(400, 'text is required');
	}

	const mp3Audio = useGoogleTts
		? await GenerateAudioWithGoogleTts(text)
		: await GenerateAudioWithGoogleTranslate(text);

	return new Response(mp3Audio, {
		headers: {
			'Content-Type': 'audio/mpeg',
			'Cache-Control': 'public, max-age=86400000',
			'Netlify-CDN-Cache-Control': 'public, max-age=31536000, immutable, durable',
			'Netlify-Vary': 'query',
			'Kendo-TTS-Source': useGoogleTts ? 'Google TTS' : 'Google Translate'
		}
	});
};

async function GenerateAudioWithGoogleTranslate(text: string): Promise<Uint8Array> {
	if (text.length > 100) {
		error(400, 'text must be less than 100 characters');
	}

	const googleTranslateUrl = new URL('http://translate.google.com/translate_tts');
	googleTranslateUrl.searchParams.set('ie', 'UTF-8');
	googleTranslateUrl.searchParams.set('client', 'tw-ob');
	googleTranslateUrl.searchParams.set('tl', 'ja');
	googleTranslateUrl.searchParams.set('q', text);

	const response = await fetch(googleTranslateUrl);

	if (!response.ok) {
		error(500, 'an error occurred while requesting from Google Translate');
	}

	return await response.bytes();
}

async function GenerateAudioWithGoogleTts(text: string): Promise<Uint8Array> {
	const [response] = await googleTtsClient.synthesizeSpeech({
		input: { text: text },
		voice: { languageCode: 'ja-JP', ssmlGender: 'NEUTRAL' },
		audioConfig: { audioEncoding: 'MP3' }
	});

	if (!(response.audioContent instanceof Uint8Array)) {
		throw new Error('audioContent is not a Uint8Array');
	}

	return response.audioContent;
}
