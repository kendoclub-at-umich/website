import { URL } from '$env/static/private';
import type { RequestHandler } from './$types';

export const prerender = true;

const body = `
	User-agent: *
	Allow: /

	Sitemap: ${URL}/sitemap.xml
`;

export const GET: RequestHandler = () => {
	return new Response(body);
};
