import { response } from 'super-sitemap';
import type { RequestHandler } from './$types';
import { URL } from '$env/static/private';

export const prerender = true;

export const GET: RequestHandler = async () => {
	return await response({ origin: URL });
};
