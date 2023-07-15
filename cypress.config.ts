import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		viewportHeight: 1080,
		viewportWidth: 1920,
		reporter: 'cypress-mochawesome-reporter',
		reporterOptions: {
			reportDir: 'cypress/reports',
			overwrite: false,
			html: false,
			json: true,
		},
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
