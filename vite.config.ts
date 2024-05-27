import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

const license = readFileSync('./LICENSE', { encoding: 'utf8' });
const copyright = /Copyright \(c\) ([0-9]{4}( [A-Z]?[a-z]+)+)/.exec(license)![1];

export default defineConfig({
	plugins: [sveltekit()],
	define: { __LICENSE_COPYRIGHT__: JSON.stringify(copyright) }
});
