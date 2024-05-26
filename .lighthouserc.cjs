module.exports = {
	ci: {
		collect: {
			staticDistDir: './build'
		},
		assert: {
			preset: 'lighthouse:recommended'
		}
	}
};
