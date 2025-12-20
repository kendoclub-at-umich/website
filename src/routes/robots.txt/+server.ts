import { PUBLIC_BASE_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

export const prerender = true;

const body = `
	User-agent: *
	Allow: /

	Sitemap: ${PUBLIC_BASE_URL}/sitemap.xml
`;

export const GET: RequestHandler = () => {
	return new Response(body);
};
