module.exports = {
	ci: {
		collect: {
			staticDistDir: './build',
			autodiscoverUrlBlocklist: 'calendar.html',
			maxAutodiscoverUrls: 0
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
