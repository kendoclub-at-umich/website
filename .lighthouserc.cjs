module.exports = {
	ci: {
		collect: {
			staticDistDir: './build',
			autodiscoverUrlBlocklist: 'calendar.html'
		},
		assert: {
			preset: 'lighthouse:no-pwa',
			assertions: {
				'csp-xss': 'off',
				'meta-description': 'warn' // TODO: remove this as part of #115
			}
		}
	}
};
