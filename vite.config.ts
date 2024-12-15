import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import virtual from '@rollup/plugin-virtual';
import { readFileSync } from 'node:fs';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		virtual({ 'license-copyright': `export default ${JSON.stringify(getCopyright())};` })
	],
	build: {
		sourcemap: true,
		assetsInlineLimit: (file) => {
			if (file.includes('/lib/logo/')) {
				return false;
			}
		}
	}
});

function getCopyright(): string {
	const license = readFileSync('./LICENSE', { encoding: 'utf8' });
	const copyright = /Copyright \(c\) ([0-9]{4}( [A-Z]?[a-z]+)+)/.exec(license)?.[1];
	if (typeof copyright != 'string') {
		throw new Error('Unable to find copyright declaration in LICENSE file');
	}
	return copyright;
}
