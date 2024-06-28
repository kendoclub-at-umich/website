module.exports = {
	ci: {
		collect: {
			staticDistDir: './build'
		},
		assert: {
			preset: 'lighthouse:no-pwa',
			assertions: {
				'csp-xss': 'off',
				'meta-description': 'warn', // TODO: remove this as part of #115
				'unsized-images': 'warn' // TODO: remove this when #63 is fixed
			}
		}
	}
};
