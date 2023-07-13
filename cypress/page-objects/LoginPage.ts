import { credentials } from '../support/credentials';

export class LoginPage {
	URL = '';

	visit(): this {
		cy.visit(this.URL);
		return this;
	}

	fillUsernameInput(username: string): this {
		cy.get('input[id="user-name"]').should('be.visible').type(username);
		return this;
	}

	fillPasswordInput(password: string): this {
		cy.get('input[id="password"]').should('be.visible').type(password);
		return this;
	}

	clickLoginButton(): this {
		cy.get('input[id="login-button"]').should('be.visible').click();
		return this;
	}

	assertCookieAfterLogin(username: string): this {
		cy.getCookie('session-username')
			.should('exist')
			.and('have.property', 'value', username);
		return this;
	}

	assertLoginPageHeader(): this {
		cy.get('.login_logo').should('be.visible').and('have.text', 'Swag Labs');
		return this;
	}

	assertAuthenticationForm(): this {
		const loginFormSelectors = ['#user-name', '#password', '#login-button'];

		cy.get('.login-box').within(() => {
			loginFormSelectors.forEach((selector) => {
				cy.get(selector).should('be.visible').and('not.be.disabled');
			});
		});
		return this;
	}

	assertTestingCredentials(): this {
		cy.get('.login_credentials_wrap-inner #login_credentials')
			.within(() => {
				cy.get('h4').should('have.text', 'Accepted usernames are:');
			})
			.then((element) => {
				credentials.username.forEach((username) => {
					expect(element).to.contain(username);
				});
			});

		cy.get('.login_credentials_wrap-inner .login_password')
			.within(() => {
				cy.get('h4').should('have.text', 'Password for all users:');
			})
			.then((element) => {
				expect(element).to.contain(credentials.password);
			});
		return this;
	}

	assertErrorMessageNotExist(): this {
		cy.get('h3[data-test="error"]').should('not.exist');
		return this;
	}
}
