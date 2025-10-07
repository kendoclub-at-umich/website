module.exports = {
	ci: {
		collect: {
			staticDistDir: './build',
			autodiscoverUrlBlocklist: 'calendar.html',
			maxAutodiscoverUrls: 0
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
