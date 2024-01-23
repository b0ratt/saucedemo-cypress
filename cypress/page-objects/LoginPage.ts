import { credentials } from '../support/credentials';
import Chainable = Cypress.Chainable;

export class LoginPage {
  URL = '';

  visit(): this {
    cy.visit(this.URL);
    return this;
  }

  fillUsernameInput(username: string): this {
    this.getUsernameInput().should('be.visible').type(username);
    return this;
  }

  fillPasswordInput(password: string): this {
    this.getPasswordInput().should('be.visible').type(password);
    return this;
  }

  clickLoginButton(): this {
    this.getLoginBtn().should('be.visible').click();
    return this;
  }

  assertCookieAfterLogin(username: string): this {
    cy.getCookie('session-username')
      .should('exist')
      .and('have.property', 'value', username);
    return this;
  }

  assertLoginPageHeader(): this {
    this.getWebsiteLogo().should('be.visible').and('have.text', 'Swag Labs');
    return this;
  }

  assertAuthenticationForm(): this {
    const loginFormSelectors = ['username', 'password', 'login_button'];

    this.getLoginForm().within(() => {
      loginFormSelectors.forEach((selector) => {
        cy.dataCy(selector).should('be.visible').and('not.be.disabled');
      });
    });
    return this;
  }

  assertTestingCredentials(): this {
    this.getLoginCredentials()
      .within(() => {
        cy.get('h4').should('have.text', 'Accepted usernames are:');
      })
      .then((element) => {
        credentials.username.forEach((username) => {
          expect(element).to.contain(username);
        });
      });

    this.getLoginPassword()
      .within(() => {
        cy.get('h4').should('have.text', 'Password for all users:');
      })
      .then((element) => {
        expect(element).to.contain(credentials.password);
      });

    return this;
  }

  assertErrorMessageVisible(message?: string): this {
    this.getErrorMessage().should('be.visible');

    if (message) {
      this.getErrorMessage().should('contain', message);
    }

    return this;
  }

  assertErrorMessageNotExist(): this {
    this.getErrorMessage().should('not.exist');
    return this;
  }

  private getUsernameInput(): Chainable {
    return cy.dataCy('username');
  }

  private getPasswordInput(): Chainable {
    return cy.dataCy('password');
  }

  private getLoginBtn(): Chainable {
    return cy.dataCy('login_button');
  }

  private getWebsiteLogo(): Chainable {
    return cy.dataCy('logo');
  }

  private getLoginForm(): Chainable {
    return cy.dataCy('login_container');
  }

  private getLoginCredentials(): Chainable {
    return cy.dataCy('login_credentials');
  }

  private getLoginPassword(): Chainable {
    return cy.dataCy('login_password');
  }

  private getErrorMessage(): Chainable {
    return cy.dataCy('error_message');
  }
}
