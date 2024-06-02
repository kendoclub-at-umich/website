import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import virtual from '@rollup/plugin-virtual';
import { readFileSync } from 'node:fs';

const license = readFileSync('./LICENSE', { encoding: 'utf8' });
const copyright = /Copyright \(c\) ([0-9]{4}( [A-Z]?[a-z]+)+)/.exec(license)![1];

export default defineConfig({
	plugins: [
		sveltekit(),
		virtual({ 'license-copyright': `export default ${JSON.stringify(copyright)};` })
	],
	build: { sourcemap: true }
});
