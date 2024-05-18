// @ts-check
/// <reference types="node" />

import chroma from 'chroma-js';

import { promises as fs } from 'node:fs';

const MAIZE = chroma('#FFCB05');
const BLUE = chroma('#00274C');
const FILE_PATH = 'node_modules/@picocss/pico/scss/colors/_index.scss';

const colors = /** @type {const} */ {
	amber: chroma
		.scale([MAIZE.brighten(0.5), MAIZE, MAIZE.darken(2).saturate()])
		.mode('lch')
		.correctLightness()
		.colors(19),
	slate: chroma
		.scale([BLUE.brighten(4.5), BLUE.brighten(2).saturate(2), BLUE, BLUE.darken(0.5)])
		.mode('lch')
		.correctLightness()
		.colors(19)
};

let contents = await fs.readFile(FILE_PATH, { encoding: 'utf8' });

for (const [name, stops] of Object.entries(colors)) {
	for (const [i, stop] of stops.entries()) {
		const colorName = `${name}-${(i + 1) * 50}`;
		contents = contents.replace(
			new RegExp(`\\$${colorName}: #[0-9a-fA-F]+;`),
			`$${colorName}: ${stop};`
		);
	}
}

await fs.writeFile(FILE_PATH, contents, { encoding: 'utf8' });
