module.exports = {
	ci: {
		collect: {
			staticDistDir: './build'
		},
		assert: {
			preset: 'lighthouse:no-pwa',
			assertions: { 'csp-xss': 'off' }
		}
	}
};
