import { defineConfig } from 'cypress';

export default defineConfig({
	reporter: 'mochawesome',
	screenshotsFolder: 'cypress/mochawesome-report/screenshots',
	videosFolder: 'cypress/mochawesome-report/videos',
	reporterOptions: {
		useInlineDiffs: true,
		embeddedScreenshots: true,
		reportDir: 'cypress/results/mochawesome',
		reportFilename: '[name].html',
		overwrite: true,
		html: true,
		json: true,
	},
	e2e: {
		baseUrl: 'http://localhost:3000',
		viewportHeight: 1080,
		viewportWidth: 1920,
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
