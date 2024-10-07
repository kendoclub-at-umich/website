import { json, type RequestHandler } from '@sveltejs/kit';
import type { WebAppManifest } from 'web-app-manifest';
import any from '$lib/logo/any.svg';
import any192 from '$lib/logo/any-192.png';
import any512 from '$lib/logo/any-512.png';
import maskable from '$lib/logo/maskable.svg';
import maskable512 from '$lib/logo/maskable-512.png';

export const prerender = true;

export const GET: RequestHandler = () => {
	const manifest: WebAppManifest = {
		name: 'Kendo Club at the University of Michigan',
		short_name: 'Kendo at Umich',
		theme_color: '#001b3e',
		icons: [
			{
				src: any,
				type: 'image/svg+xml',
				sizes: 'any',
				purpose: 'any'
			},
			{
				src: any192,
				type: 'image/png',
				sizes: '192x192',
				purpose: 'any'
			},
			{
				src: any512,
				type: 'image/png',
				sizes: '512x512',
				purpose: 'any'
			},
			{
				src: maskable,
				type: 'image/svg+xml',
				sizes: 'any',
				purpose: 'maskable'
			},
			{
				src: maskable512,
				type: 'image/png',
				sizes: '512x512',
				purpose: 'maskable'
			}
		]
	};

	return json(manifest);
};
