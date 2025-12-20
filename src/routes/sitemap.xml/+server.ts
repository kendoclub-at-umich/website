import { response } from 'super-sitemap';
import type { RequestHandler } from './$types';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const prerender = true;

export const GET: RequestHandler = () => {
	return response({ origin: PUBLIC_BASE_URL });
};
