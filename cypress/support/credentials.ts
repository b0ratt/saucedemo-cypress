export const credentials = {
	username: [
		Cypress.env('LOGIN'),
		Cypress.env('LOCKED_USER'),
		Cypress.env('PROBLEM_USER'),
		Cypress.env('GLITCH_USER'),
	],
	password: Cypress.env('PASSWORD'),
};
