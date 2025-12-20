/* eslint-disable @typescript-eslint/no-require-imports -- to match cjs syntax used in lighthouse-ci documentations for readability */
'use strict';

const fs = require('node:fs');

const sitemap = fs.readFileSync('build/sitemap.xml', { encoding: 'utf-8' });
const urls = Array.from(sitemap.matchAll(/<loc>(?<url>.*)<\/loc>/g)).map(
	(match) => match.groups.url
);

module.exports = {
	ci: {
		collect: {
			startServerCommand: 'npm run preview',
			startServerReadyPattern: 'localhost',
			url: urls
		},
		assert: {
			assertions: {
				'categories:performance': 'error',
				'categories:accessibility': 'error',
				'categories:best-practices': 'error',
				'categories:seo': 'error'
			}
		}
	}
};
