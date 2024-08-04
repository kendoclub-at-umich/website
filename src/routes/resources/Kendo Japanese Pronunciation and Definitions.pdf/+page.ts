import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = false;
export const load: PageLoad = () => {
	redirect(301, '/resources/kendo-japanese-pronunciations-and-definitions');
};
