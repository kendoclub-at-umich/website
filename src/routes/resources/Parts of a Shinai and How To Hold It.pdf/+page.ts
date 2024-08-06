import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = false;
export const load: PageLoad = () => {
	redirect(301, '/resources/parts-of-a-shinai-and-how-to-hold-it');
};
